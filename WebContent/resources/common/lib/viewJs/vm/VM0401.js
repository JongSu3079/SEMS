// 스크립트 시작 
window.onpageshow = function(event) {
	// 한 번에 보여줄 개수 설정
	$('#pagingRowCnt').val(100);
	
	// 새로고침
	fn_VM0401refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 새로고침 - 더보기횟수, 검색창 초기화
function fn_VM0401refresh(){
	$('#qStrNm').val('');
	$("#moreCnt").val( 0 );
	fn_VM0401changeTab($("#tabCd").val());
}

// 검색 - 더보기횟수 초기화
function fn_VM0401search(){
	$("#moreCnt").val( 0 );
	fn_VM0401tabClicker($("#tabCd").val());
}

// 탭 변경 : 0(온도제어), 1(피크제어)
function fn_VM0401changeTab(tabCd){
	$('#qStrNm').val('');
	$("#moreCnt").val( 0 );
	$("#tabCd").val(tabCd);
	fn_VM0401tabClicker(tabCd);
}

// 탭 화면
function fn_VM0401tabClicker(tabCd) {
	var records			= "";
	var qStrNm			= $("#qStrNm").val();
	var url				= '';
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	if( tabCd == '0' ){			// 온도제어 탭
		$("#tabTempCtrl").attr("class", "tab_on");
		$("#tabPeakCtrl").attr("class", "tab_off");
	} else if( tabCd == '1' ){	// 피크제어 탭
		$("#tabTempCtrl").attr("class", "tab_off");
		$("#tabPeakCtrl").attr("class", "tab_on");
	}
	
	var paramInfo = {
		"tabId"			: tabCd,
		"strNm"			: qStrNm,
		"startRow"		: startRow,
		"pagingRowCnt"	: pagingRowCnt
	}
	
	if( tabCd != '0' ){			// 온도제어 탭 온도제어 해제 2024.03.27
		$.ajax({
			type : 'POST',
			dataType : 'JSON',
			data : JSON.stringify(paramInfo),
			contentType : "application/text; charset=UTF-8",
			url : '/VM0401List',
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
						// 목록 만들기
						if(returnJSON.total > 0) {
							returnJSONData = returnJSON.items;
							var items = returnJSON.items;
							
							if( tabCd == '0' ){			// 온도제어 탭
								records = fn_VM0401tempCtrlList( items );
							} else if( tabCd == '1' ){	// 피크제어 탭
								records = fn_VM0401peakCtrlList( items );
							}
							
							// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
							if(returnJSON.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
								$("#btn_more").show();
							} else {
								$("#btn_more").hide();
							}
						} else {
							records +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						}
						
						if(moreCnt == 0) {
							$("#message_list").html(records);
						} else {
							$("#message_list").append(records);
						}
					}
				} else {
					$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
					alert("(조회실패)다시 시도해주세요.");
				}
			}
		});
	}else{
		$("#message_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
	}
	
}

// 온도제어 탭 리스트 만들기
function fn_VM0401tempCtrlList( items ){
	var records = '';
	
	for( var i=0; i<items.length; i++ ){
		records +='<li>';
		records +='	<div class="list_text">';
		records +='		<span class="blue">' + items[i].ctrlTime + ' </span>';
		records +='		<span class="msg">온도제어 발생</span>';
		records +='		<span class="point">' + items[i].strNm + '</span>';
		records +='	</div>';
		records +='</li>';
	}
	
	return records;
}

// 피크제어 탭 리스트 만들기
function fn_VM0401peakCtrlList( items ){
	var records = '';
	
	for( var i=0; i<items.length; i++ ){
		records +='<li>';
		records +='	<div class="list_text">';
		records +='		<span class="blue">' + items[i].ctrlTime + ' </span>';
		records +='		<span class="msg">피크제어 발생</span>';
		records +='		<span class="point">' + items[i].strNm + '</span>';
		records +='	</div>';
		records +='</li>';
	}
	
	return records;
}

// 더보기 클릭
function fn_VM0401showMoreList() {
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	var tabCd = $("#tabCd").val();
	fn_VM0401tabClicker(tabCd);
}