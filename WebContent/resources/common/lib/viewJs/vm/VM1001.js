// 스크립트 시작 
window.onpageshow = function(event) {
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	if(gfn_checkOnload()){
		// 목록 가져오기
		fn_VM1001getList();
	}
	
	// 로딩 없애기
//	$('#viewLoadingDiv').fadeOut();
};

//헤더에 점포 정보 세팅
function fn_setHeaderCombo(){
	/** 
	 * 필수 태그
	 * <div class="shop_name" id="strDataCombo" ></div>
	 * <input type="hidden" id="hStrCd"/>
	 * <input type="hidden" id="hStrNm"/>
	 * <input type="hidden" id="hBoxVer"/>
	 */
	gfn_getStrDataList();
}

// 점포 상세 정보 팝업
function fn_strInfoPopup(){
	/** 
	 * 필수 태그
	 * <div id="shop_info_popup">
	 * param : V(정보 열람)
	 */
	gfn_strInfoPopup("V");
	$("#shop_info_popup").popup();
}

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

function fn_VM1001getList(){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM1001getList',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var html='';
				var cnt = 0;
				var items = returnJSON.items;
				if( items.length > 0 ){
					for( var i=0; i<items.length; i++ ){
						html += '<li>';
						html += '	<a onclick="javascript:fn_VM1001detailAsClose(\'' + items[i].no + '\');" class="list_text">';
						html += '		<span class="blue">'+items[i].errorType+'</span>';
						html += '		<span class="msg">'+items[i].solveNm+'</span>';
						html += '		<span class="point">처리일 : '+items[i].solveDt+'</span>';
						html +='	</a>';
						html += '</li>';
					}
				} else {
					html += '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
				}
				$('#asCloseList').html(html);
			}
		}
	});
}

// 신규 유지보수 내역 입력
function fn_VM1001newAsClose(){
	var strNm = $("#hStrNm").val();
	var strCd = $("#hStrCd").val();
	
	if(strNm == '' || strCd == ''){
		alert("점포조회를 통해 점포를 선택해주세요.");
		return; 
	}
	
	var paramDataset = new Object();
	paramDataset.mode		= 'new';
	paramDataset.titleTxt	= '신규 유지보수';
	paramDataset.strNm		= strNm;
	paramDataset.strCd		= strCd;
	
	var paramJson = JSON.stringify(paramDataset);
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/VM1002";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
};

// 유지보수 상세 내역 조회&수정
function fn_VM1001detailAsClose( no ){
	var paramDataset = new Object();
	paramDataset.mode		= 'detail';
	paramDataset.no			= no;
	paramDataset.titleTxt	= '유지보수 상세';
	paramDataset.strNm		= $("#hStrNm").val();
	paramDataset.strCd		= $("#hStrCd").val();
	
	var paramJson = JSON.stringify(paramDataset);
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/VM1002";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
};

