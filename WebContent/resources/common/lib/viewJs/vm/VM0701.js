// 전역변수 
var returnJSONData = null;
var methodInfoList = null;

// 스크립트 시작 
window.onpageshow = function(event) {
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// 조치방법 공통코드 조회
	fn_VM0701retrieveCommCd();
	
	// 라디오 버튼 이벤트
	$("input[name='ownerType']:radio").change(function () {
		fn_VM0701refresh();
	});

	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

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

//점포 정보 팝업
function fn_setPopupData( strCd ){
	gfn_setPopupData( strCd );
}

// 새로고침 - 더보기횟수, 리턴받은 점포명이 없을 시 검색창 초기화
function fn_VM0701refresh(){
	var returnStrNm = $('#returnStrNm').val();
	var returntabCd = $('#returnTabCd').val();
	if(returnStrNm != '' || returntabCd != '') {
		$('#qStrNm').val(returnStrNm);
		$("#tabCd").val(returntabCd);
	} else {
		$('#qStrNm').val('');
	}
	fn_VM0701changeTab($("#tabCd").val());
}

//검색
function fn_VM0701search(){
	var tabCd = $("#tabCd").val();
	if(tabCd == '0') {
		fn_VM0701tabProcess();
	} else if(tabCd == '1') {
		fn_VM0701tabResult();
	} else if(tabCd == '2'){
		fn_VM0701tabProcessSpecial();
	} else if(tabCd == '3'){
		fn_VM0701tabRecovery();
	}
}

//탭 변경 - tabCd : 0(미조치), 1(조치완료), 2(복구완료)
function fn_VM0701changeTab(tabCd, click) {
	// 화면에서 클릭시 검색창 초기화
	if(click)
		$('#qStrNm').val('');
	
	$("#tabCd").val(tabCd);
	
	if(tabCd == '0') {
		fn_VM0701tabProcess();
	} else if(tabCd == '1') {
		fn_VM0701tabResult();
	} else if(tabCd == '2'){
		fn_VM0701tabRecovery();
	} 
}

// 미조치 탭 화면
function fn_VM0701tabProcess() {
	$("#tabProcess").attr("class", "tab_on");
	$("#tabProcessSpecial").attr("class", "tab_off");
	$("#tabRecovery").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_off");
	
	var paramInfo = {
		tabCd		: "0",
		qStrNm		: $("#qStrNm").val(),
		ownerType	: $("input[name='ownerType']:checked").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM0701List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					var records = '';
					if(returnJSON.total > 0) {
						returnJSONData = returnJSON.items;
						var items = returnJSON.items;
						for(var i = 0; i < returnJSON.total; i++) {
							records += fn_VM0701ListBodyProcess(items[i], i);
						}
						
						if( returnJSON.data == 'S' ){
							$("#message_list").addClass("type3");
						} else {
							$("#message_list").addClass("type2");
						}
					} else {
						records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
					$("#message_list").html(records);
					
				}
			} else {
				$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				$("#message_list").removeClass("type2");
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 미조치-특수점포 탭 화면
function fn_VM0701tabProcessSpecial() {
	$("#tabProcess").attr("class", "tab_off");
	$("#tabProcessSpecial").attr("class", "tab_on");
	$("#tabRecovery").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_off");
	
	var paramInfo = {
		tabCd	: "2",
		qStrNm	: $("#qStrNm").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM0701List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					var records = '';
					if(returnJSON.total > 0) {
						returnJSONData = returnJSON.items;
						var items = returnJSON.items;
						for(var i = 0; i < returnJSON.total; i++) {
							records += fn_VM0701ListBodyProcess(items[i], i);
						}
						
						if( returnJSON.data == 'S' ){
							$("#message_list").addClass("type3");
						} else {
							$("#message_list").addClass("type2");
						}
					} else {
						records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
					$("#message_list").html(records);
					
				}
			} else {
				$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				$("#message_list").removeClass("type2");
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 복구 탭 화면
function fn_VM0701tabRecovery() {
	$("#tabProcess").attr("class", "tab_off");
	$("#tabProcessSpecial").attr("class", "tab_off");
	$("#tabRecovery").attr("class", "tab_on");
	$("#tabResult").attr("class", "tab_off");
	
	var paramInfo = {
			tabCd		: "2",
			qStrNm		: $("#qStrNm").val(),
			ownerType	: $("input[name='ownerType']:checked").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM0701List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					var records = '';
					if(returnJSON.total > 0) {
						returnJSONData = returnJSON.items;
						var items = returnJSON.items;
						for(var i = 0; i < returnJSON.total; i++) {
							records += fn_VM0701ListBodyProcess(items[i], i);
						}
						
						if( returnJSON.data == 'S' ){
							$("#message_list").addClass("type3");
						} else {
							$("#message_list").addClass("type2");
						}
					} else {
						records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
					$("#message_list").html(records);
					
				}
			} else {
				$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				$("#message_list").removeClass("type2");
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	})
}

// 조치완료 탭 화면
function fn_VM0701tabResult() {
	$("#tabProcess").attr("class", "tab_off");
	$("#tabProcessSpecial").attr("class", "tab_off");
	$("#tabRecovery").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_on");
	
	var paramInfo = {
		tabCd	: "1",
		qStrNm	: $("#qStrNm").val(),
		ownerType	: $("input[name='ownerType']:checked").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM0701List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					var records = '';
					if(returnJSON.total > 0) {
						returnJSONData = returnJSON.items;
						var items = returnJSON.items;
						for(var i = 0; i < returnJSON.total; i++) {
							records += fn_VM0701ListHeader(items[i]);
							
							if( items[i].alarmType != 'B' && items[i].alarmType != 'E' ) {
								records +=  '		<a href="#" title="대시보드 이동" onclick="fn_VM0701goDashboard(\'' + i + '\'); return false;" class="btn_goDashboard">대시보드 이동</a>';
								records +=  '		<a href="#" title="냉장비 이동" onclick="fn_VM0701govm0501(\'' + i + '\'); return false;" class="btn_govm0501">냉장비 이동</a>';
								records +=  '		<a href="#" title="그래프 새창 열기" onclick="fn_VM0701popupGraph(\'' + i + '\'); return false;" class="btn_graph">그래프 열기</a>';
							}
							
							records +=  '	</div>';
							records +=  '	<div class="detail_area">';
							records +=  '		<span class="detail">';
							records +=  '			장비명 : ' + items[i].deviceLoc + '<br />';
							records +=  '			A/S기사 : ' + items[i].asEngineer + '[' + items[i].asVendorNm + ']<br />';
							records +=  '			조치일시: ' + items[i].asDate + '<br />';
							records +=  '			조치방법 : ' + gfn_checkStringNull(methodInfoList[items[i].asMethod], "-") + '<br />';
							records +=  '			조치내용 : ' + items[i].asNote + '<br />';
							records +=  '		</span>';
							records +=  '		</a>';
							records +=  '	</div>';
							records +=  '</li>';
						}
						
					} else {
						records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
					}
					$("#message_list").html(records);
					$("#message_list").removeClass("type2");
				}
			} else {
				$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				$("#message_list").removeClass("type2");
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 알람 목록 html 상단
function fn_VM0701ListHeader(item) {
	var html = '';
	html +=  '<li>';
	html +=  '	<div class="title_area">';
	html +=  '		<a href="#" class="btn_shop_info shop_info_popup_open" onclick="fn_setPopupData(\'' + item.strCd + '\'); return false;">';
	html +=  '			<span class="branch">' + item.ownerType + ' ' + item.strNm + '</span>';
	html +=  '		</a>'
	html +=  '		<span class="notification">해당 알람 반복 횟수[' + item.alarmCnt + ']</span>';
	return html;
}

// 미조치 알람 리스트 공통
function fn_VM0701ListBodyProcess(item, i){
	var html = '';
	html += fn_VM0701ListHeader(item);
	
	if( item.alarmType != 'B' && item.alarmType != 'E' ) {
		html +=  '		<a href="#" title="대시보드 이동" onclick="fn_VM0701goDashboard(\'' + i + '\'); return false;" class="btn_goDashboard">대시보드 이동</a>';
		html +=  '		<a href="#" title="냉장비 이동" onclick="fn_VM0701govm0501(\'' + i + '\'); return false;" class="btn_govm0501">냉장비 이동</a>';
		html +=  '		<a href="#" title="그래프 새창 열기" onclick="fn_VM0701popupGraph(\'' + i + '\'); return false;" class="btn_graph">그래프 열기</a>';
	}
	
	var titleTxt = null;
	if( item.asResult == 'N' ){
		titleTxt = '알람 조치 예정';
	} else if( item.asResult == 'O' ) {
		titleTxt = '알람 조치';
		html +=  '<span class="state blue">조치 중</span>';
	} else if( item.asResult == 'R' ) {
		titleTxt = '복구';
		html +=  '<span class="state blue">복구</span>';
	}
	
	html +=  '	</div>';
	html +=  '	<div class="detail_area">';
	html +=  '		<a href="#" onclick="fn_VM0701goInputForm(' + i + '); return false;" title="' + titleTxt + '">';
	html +=  '			<span class="detail">';
	html +=  '				장비명 : ' + item.deviceLoc + '<br />';
	html +=  '				장애일시 : ' + item.startDate + ' ~ ' + item.endDate + '<br />';
	if( item.message2 != '' ){
		html += '				장애내용 : ' + item.message2;
	} else {
		html +=  '				장애내용 : ' + item.message;
	};
	html +=  '			</span>';
	html +=  '		</a>';
	html +=  '	</div>';
	html +=  '</li>';
	return html;
}

// 조치방법 공통코드 조회
function fn_VM0701retrieveCommCd() {
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : "",
		contentType : "application/text; charset=UTF-8",
		url : '/VM0701CommonCd',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					methodInfoList = new Array();
					var items = returnJSON.items;
					for(var i = 0; i < items.length; i++) {
						methodInfoList[items[i].commCd] = items[i].commCdNm;
					}
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
			fn_VM0701refresh();
		}
	});
}

// 조치예정/조치내역 입력 페이지 이동
function fn_VM0701goInputForm( idx ) {
	var paramDataset = new Object();
	paramDataset = returnJSONData[idx];
	paramDataset.alarmCnt = paramDataset.alarmCnt + "";
	paramDataset.qStrNm = $("#qStrNm").val();
	paramDataset.tabCd = $("#tabCd").val();
	paramDataset.alarmStatus = 'I';
	var paramJson = JSON.stringify(paramDataset);
	
	$("#goDetailParamData").val(paramJson);
	
	var form = document.goDetailFrm;
	form.action = '/VM0702';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

// 그래프 페이지 이동
function fn_VM0701popupGraph( idx ) {
	var paramDataset = new Object();
	paramDataset.strCd		= returnJSONData[idx].strCd;	// 점포코드
	paramDataset.moduleId	= returnJSONData[idx].moduleId;	// ID
	paramDataset.portNo		= returnJSONData[idx].portNo;	// 포트번호
	paramDataset.moduleNm	= returnJSONData[idx].moduleNm;	// SEMS 장비/캐리어허브
	paramDataset.qStrNm 	= $("#qStrNm").val();			// 검색어
	paramDataset.tabCd 		= $("#tabCd").val();			// 미조치, 조치완료 탭 코드
	
	// 그래프 조회 후 이동할 페이지
	paramDataset.fromView = "VM0701";
	
	var paramJson = JSON.stringify(paramDataset);
	
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/CM0501";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

let pageId = '';
//대시보드 페이지 이동
function fn_VM0701goDashboard( idx ) {
	$('#hStrCd').val(returnJSONData[idx].strCd);
	$('#hStrNm').val(returnJSONData[idx].strNm);
	$('#pop_strCd').val(returnJSONData[idx].strCd);
	$('#pop_strNm').text(returnJSONData[idx].strNm);
	
	pageId = 'VM0101';
	gfn_setAllStrCd();
}

//대시보드 페이지 이동
function fn_VM0701govm0501 ( idx ) {
	$('#hStrCd').val(returnJSONData[idx].strCd);
	$('#hStrNm').val(returnJSONData[idx].strNm);
	$('#pop_strCd').val(returnJSONData[idx].strCd);
	$('#pop_strNm').text(returnJSONData[idx].strNm);
	
	pageId = 'VM0501';
	gfn_setAllStrCd();
}

//페이지 이동 정보 가져오기
function fn_getStoreInfo() {
	location.href='/menu/' + pageId;
}
