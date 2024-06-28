var returnJSONData;

$(function(){
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	fn_VM1201refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
});

//점포 상세 정보 팝업
function fn_strInfoPopup(){
	/** 
	 * 필수 태그
	 * <div id="shop_info_popup">
	 * param : V(정보 열람)
	 */
	gfn_strInfoPopup("V");
	$("#shop_info_popup").popup();
}
function fn_VM1201search(){
	var tabCd = $("#tabCd").val();
	if(tabCd == '0'){
		fn_VM1201tabRequired();
	}else if(tabCd == '1'){
		fn_VM1201tabResult();
	}
}

//새로고침
function fn_VM1201refresh(){
	var returnStrNm = $('#returnStrNm').val();
	var returntabCd = $('#returnTabCd').val();
	if(returnStrNm != '' || returntabCd != '') {
		$('#qStrNm').val(returnStrNm);
		$("#tabCd").val(returntabCd);
	} else {
		$('#qStrNm').val('');
	}
	fn_VM1201changeTab($("#tabCd").val());
}

//탭 변경 - tabCd : 0(점검요청), 1(점검완료)
function fn_VM1201changeTab(tabCd, click) {
	// 화면에서 클릭시 검색창 초기화
	if(click)
		$('#qStrNm').val('');
	
	$("#tabCd").val(tabCd);
	
	if(tabCd == '0') {
		fn_VM1201tabRequired();
	} else if(tabCd == '1') {
		fn_VM1201tabResult();
	}
}

//점검 요청 - 탭이동
function fn_VM1201tabRequired(){
	$("#tabRequired").attr("class", "tab_on");
	$("#tabResult").attr("class", "tab_off");
	
	fn_VM1201tabChangeAjax();
}

//점검완료 - 탭이동
function fn_VM1201tabResult(){
	$("#tabRequired").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_on");
	
	fn_VM1201tabChangeAjax();
}

// 탭 변경 ajax
function fn_VM1201tabChangeAjax(){
	var paramInfo = {
			tabCd : $("#tabCd").val(),
			qStrNm	: $("#qStrNm").val(),
	}
	$.ajax({
		type:'POST',
		dataType:'JSON',
		data:JSON.stringify(paramInfo),
		contentType:"application/json; charset=UTF-8",
		url:'/VM1201getList',
		error:function(){
			alert("(오류발생)다시 시도해주세요.");
		},beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},success:function(returnJson){
			if(returnJson.success){
				if(returnJson.items != null){
					var records = '';
					if(returnJson.total > 0){
						returnJSONData = returnJson.items;
						data = returnJson.items;
						for(var i=0; i<returnJson.total;i++){
							records += fn_VM1201ListBodyProcess(data[i],i, data[0].userId, data[0].authSp);
						}
						
						if( returnJson.data == 'S' ){
							$("#message_list").addClass("type3");
						} else {
							$("#message_list").addClass("type2");
						}
					}else{
						records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
				}
				$("#message_list").html(records);
			}
		}
	});
}

//리스트 html 상단 - 점포 명
function fn_VM1201ListHeader(item) {
	var html = '';
	html +=  '<li>';
	html +=  '	<div class="title_area">';
	html +=  '		<a href="#" class="btn_shop_info shop_info_popup_open" onclick="fn_VM1201setPopupData(\'' + item.strCd + '\'); return false;">';
	html +=  '			<span class="branch">' + item.strNm + '</span>';
	html +=  '		</a>';
	html +=  '	</div>';
	return html;
}

//점포 정보 팝업
function fn_VM1201setPopupData( strCd ){
	gfn_setPopupData( strCd );
}

//리스트 공통
function fn_VM1201ListBodyProcess(item, i, userId, authSp){
	var html = '';
	html += fn_VM1201ListHeader(item);
	
	html +=  '	<div class="detail_area">';
	if($("#tabCd").val() == 0){
		if(authSp == 'H'){
			// 점검요청 탭
			// 관리자 권한 조치 페이지 이동
			html +=  '		<a href="#" onclick="fn_VM1201goSolveForm(' + i + '); return false;" title="요청 조치">';
		}else{
			// 업체기사 권한 수정 페이지 이동
			html +=  '		<a href="#" onclick="fn_VM1201goModForm(' + i + '); return false;" title="요청 수정">';
		}
	}else{
		// 조치완료 탭 - 조치 페이지 이동
		html +=  '		<a href="#" onclick="fn_VM1201goSolveForm(' + i + '); return false;" title="요청 조치">';
	}
	
	html +=  '			<span class="detail">';
	html +=  '				요청기사 : ' +item.userNm+' [' + item.vendorNm + '] <br />';
	html +=  '				요청일자 : ' + item.reqDttm + '<br />';
	html += '				요청내용 : [' + item.reqTypeStr +'] '+ item.reqContents;
	html +=  '			</span>';
	html +=  '		</a>';
	html +=  '	</div>';
	html +=  '</li>';
	return html;
}

// 조치페이지 이동 폼 submit
function fn_VM1201goSolveForm(index){
	var paramDataset = new Object();
	paramDataset = returnJSONData[index];
	paramDataset.qStrNm = $("#qStrNm").val();
	paramDataset.tabCd = $("#tabCd").val();
	paramDataset.authSp = returnJSONData[0].authSp;
	paramDataset.userId = returnJSONData[0].userId;
	var paramJson = JSON.stringify(paramDataset);
	
	$("#goPopFormData").val(paramJson);
	
	var form = document.goPopForm;
	form.action = '/VM1203';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

//수정페이지 이동 폼 submit
function fn_VM1201goModForm(index){
	var paramDataset = new Object();
	paramDataset = returnJSONData[index];
	paramDataset.qStrNm = $("#qStrNm").val();
	paramDataset.tabCd = $("#tabCd").val();
	paramDataset.authSp = returnJSONData[0].authSp;
	paramDataset.userId = returnJSONData[0].userId;
	if($("#tabCd").val() == 0){
		paramDataset.mode = "modify";
	}
	var paramJson = JSON.stringify(paramDataset);
	
	$("#goPopFormData").val(paramJson);
	
	var form = document.goPopForm;
	form.action = '/VM1202';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}