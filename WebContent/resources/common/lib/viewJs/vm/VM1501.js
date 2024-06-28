// 전역변수 
var returnJSONData = null;

// 스크립트 시작 
window.onpageshow = function(event) {
	// 데이터 로드
	fn_VM1501refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 새로고침 - 더보기횟수, 리턴받은 점포명이 없을 시 검색창 초기화
function fn_VM1501refresh(){
	var returnStrNm = $('#returnStrNm').val();
	var returntabCd = $('#returnTabCd').val();
	if(returnStrNm != '' || returntabCd != '') {
		$('#qStrNm').val(returnStrNm);
		$("#tabCd").val(returntabCd);
	} else {
		$('#qStrNm').val('');
	}
	fn_VM1501changeTab($("#tabCd").val());
}

// 검색
function fn_VM1501search(){
	var tabCd = $("#tabCd").val();
	if(tabCd == '0') {
		fn_VM1501tabProcess();
	} else if(tabCd == '1') {
		fn_VM1501tabRecovery();
	} else if(tabCd == '2') {
		fn_VM1501tabResult();
	}
}

// 탭 변경 - tabCd : 0(미조치), 1(복구알람), 2(조치완료)
function fn_VM1501changeTab(tabCd, click) {
	// 화면에서 클릭시 검색창 초기화
	if(click)
		$('#qStrNm').val('');
	
	$("#tabCd").val(tabCd);
	
	if(tabCd == '0') {
		fn_VM1501tabProcess();
	} else if(tabCd == '1') {
		fn_VM1501tabRecovery();
	} else if(tabCd == '2') {
		fn_VM1501tabResult();
	}
}

// 미조치 탭 화면
function fn_VM1501tabProcess() {
	$("#tabProcess").attr("class", "tab_on");
	$("#tabRecovery").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_off");
	
	var paramInfo = {
		tabCd	: "0",
		qStrNm	: $("#qStrNm").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM1501List',
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
							records += fn_VM1501ListBodyProcess(items[i], i);
						}
						$("#message_list").addClass("type2");
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
function fn_VM1501tabRecovery() {
	$("#tabProcess").attr("class", "tab_off");
	$("#tabRecovery").attr("class", "tab_on");
	$("#tabResult").attr("class", "tab_off");
	
	var paramInfo = {
			tabCd	: "1",
			qStrNm	: $("#qStrNm").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM1501List',
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
							records += fn_VM1501ListBodyProcess(items[i], i);
						}
						$("#message_list").addClass("type2");
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
function fn_VM1501tabResult() {
	$("#tabProcess").attr("class", "tab_off");
	$("#tabRecovery").attr("class", "tab_off");
	$("#tabResult").attr("class", "tab_on");
	
	var paramInfo = {
		tabCd	: "2",
		qStrNm	: $("#qStrNm").val(),
	}
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(paramInfo),
		contentType : "application/json; charset=UTF-8",
		url : '/VM1501List',
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
							records += fn_VM1501ListHeader(items[i]);
							records +=  '	</div>';
							records +=  '	<div class="detail_area">';
							records +=  '		<span class="detail">';
							records +=  '			점포명 : ' + items[i].strNm + '<br />';
							records +=  '			장애내용 : ' + items[i].message + '<br />';
							records +=  '			조치자 : ' + items[i].asEngineer + '<br />';
							records +=  '			조치일시: ' + items[i].asDate + '<br />';
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
function fn_VM1501ListHeader(item) {
	var html = '';
	html +=  '<li>';
	html +=  '	<div class="title_area">';
	html +=  '		<span class="branch">' + item.moduleNm + '</span>';
	html +=  '		<span class="notification">알람[' + item.alarmCnt + ']</span>';
	return html;
}

// 미조치 알람 리스트 공통
function fn_VM1501ListBodyProcess(item, i){
	var html = '';
	html += fn_VM1501ListHeader(item);
	
	var titleTxt = '';
	if( item.asResult == 'N' ){
		titleTxt = '미조치 알람';
	} else if( item.asResult == 'Y' ) {
		titleTxt = '조치 알람';
		html +=  '<span class="state blue">조치 알람</span>';
	} else if( item.asResult == 'R' ) {
		titleTxt = '복구 알람';
		html +=  '<span class="state blue">복구 알람</span>';
	}
	
	html +=  '	</div>';
	html +=  '	<div class="detail_area">';
	html +=  '		<a href="#" onclick="fn_VM1501goInputForm(' + i + '); return false;" title="' + titleTxt + '">';
	html +=  '			<span class="detail">';
	html +=  '				점포명 : ' + item.strNm + '<br />';
	html +=  '				장애일시 : ' + item.startDate + ' ~ ' + item.endDate + '<br />';
	html +=  '				장애내용 : ' + item.message;
	html +=  '			</span>';
	html +=  '		</a>';
	html +=  '	</div>';
	html +=  '</li>';
	return html;
}

// 조치예정/조치내역 입력 페이지 이동
function fn_VM1501goInputForm( idx ) {
	var paramDataset = new Object();
	paramDataset = returnJSONData[idx];
	paramDataset.alarmCnt = paramDataset.alarmCnt + "";
	paramDataset.no = paramDataset.no + "";
	paramDataset.qStrNm = $("#qStrNm").val();
	paramDataset.tabCd = $("#tabCd").val();
	paramDataset.alarmStatus = 'I';
	var paramJson = JSON.stringify(paramDataset);
	$("#goDetailParamData").val(paramJson);
	
	var form = document.goDetailFrm;
	form.action = '/VM1502';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}