// 스크립트 시작 
window.onpageshow = function(event) {
	// 정렬 순서 토글 0: 점포명 1: 최신순
	$("#orderTg").cmToggle(0, function() {
		fn_CM0401Order();
	});
	
	// 자동로그인
	fnAutoLoginChk();
	
	// 한번에 불러올 점포 수
	$('#pagingRowCnt').val(50);
	
	// 점포 검색
	fn_CM0401Search();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
	//abs 사용자 => 초기화면 메뉴 페이지
	if($("#absUserFalg").val() == 'Y'){
		$(".btn_gnb").click();
	}
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	if (urlParams.has("message")) {
	  const message = urlParams.get("message");
	  if(message != null && message != ''){
			alert(message);
		}
	}
	
};

// 점포 조회
function fn_CM0401Search() {
	var records			= "";
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var qStrNm			= $("#qStrNm").val();
	var ordSp			= $("#ordSp").val();
	
	var startRow = Number(moreCnt) * Number(pagingRowCnt);
	var search = {
		startRow		: startRow,
		pagingRowCnt	: pagingRowCnt,
		qStrNm			: qStrNm,
		ordSp			: ordSp,
		menuId			: menuId
	};
	$.ajax({
		type : "POST",
		async : false,
		url : '/CM0401Search',
		data : JSON.stringify(search),
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if (returnJSON.total > 0) {
					$.each(
						returnJSON.data,
						function(i, list) {
							records += '<li>';
							records += '	<span class="list_text">';
							records += '		<span>' + list.remsStartDt + '</span>';
							records += '		<span>' + list.viewStrCd + '</span>';
							records += '		<span class="point">' + list.strNm + '</span>';
							records += '	</span>';
							records += '	<div class="list_text_detail type1 height-transition-hidden">';
							records += '		<input type="hidden" value="' + list.strCd + '" id="pop_strCd"/>';
							records += '		<input type="hidden" value="' + list.strAddInfo + '" id="pop_strAddInfo"/>';
							records += '		<span id="pop_strNm" style="display:none;">' + list.strNm + '</span>';
							records += '		<div class="container_grp">';
							records += '			<div class="address_area">';
							if( list.addr != "내용없음" ) records += '<span class="address">' + list.addr + '</span>';
							else					   records += '<span class="address null">내용없음</span>';
							records += '			</div>';
							records += '			<div class="telephone_area">';
							if( list.telNo != "내용없음" ) records += '<a href="tel:' + list.telNo + '"><span class="telephone">' + list.telNo + '</span></a>';
							else						records += '<a class="null" href="tel:"><span class="telephone">내용없음</span></a>';
							records += '			</div>';
							records += '		</div>';
							records += '		<div class="btn_grp">';
							records += '			<div class="btn_act"><a href="" class="btn_single" onclick="fn_CM0401SetAccordion(\'' + list.strCd + '\',\'' + list.strNm + '\',\'' + list.strAddInfo + '\'); return false;">' + smStr + '확인</a></div>';
							if(returnJSON.data[0].authSp == "M" || $("#authId").val() == "6" || $("#authId").val() == "12"){
								// 냉장비 업체일때만 점검요청 버튼 보임
								records += '			<div class="btn_act"><a href="" class="btn_single" onclick="fn_CM0401SetAccordionToVM1201(\'' + list.strCd + '\',\'' + list.strNm + '\',\'' + list.strAddInfo + '\'); return false;">점검확인/요청</a></div>';
							}
							records += '		</div>';
							records += '	</div>';
							records += '</li>';
					});
					if(returnJSON.total  > ((Number(moreCnt) + 1) * Number(pagingRowCnt))) {
						$("#btn_more").show();
					}
				} else {
					records += '<li class="no_result"><p>조회된 점포가 없습니다.</p></li>';
				}
				var html = "";
				if(returnJSON.total  <= ((Number(moreCnt) + 1) * Number(pagingRowCnt))) {
					html += "<span class='blue'>" + returnJSON.total + "</span>";
					html += "<span> / 총 " + returnJSON.total +"</span>";
					$("#btn_more").hide();
				} else {
					html += "<span class='blue'>" + ((Number(moreCnt) + 1) * Number(pagingRowCnt)) + "</span>";
					html += "<span> / 총 " + returnJSON.total +"</span>";
				}
				$("#countDisplay").html(html);
				if(moreCnt == 0) {
					$("#storeList").html(records);	
				} else {
					$("#storeList").append(records);
				}
				
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
			
			fn_CM0401Accordion();
		}
	});
}

// 아코디언 상세 정보 세팅 
function fn_CM0401SetAccordion(strCd, strNm, strAddInfo){
	$('#hStrCd').val(strCd);
	$('#hStrNm').val(strNm);
	$('#hStrAddInfo').val(strAddInfo);
	$('#pop_strCd').val(strCd);
	$('#pop_strNm').text(strNm);
	$('#pop_strAddInfo').val(strAddInfo);
	gfn_setAllStrCd();
}

//아코디언 상세 정보 세팅 
function fn_CM0401SetAccordionToVM1201(strCd, strNm, strAddInfo){
	$('#hStrCd').val(strCd);
	$('#hStrNm').val(strNm);
	$('#hStrAddInfo').val(strAddInfo);
	$('#pop_strCd').val(strCd);
	$('#pop_strNm').text(strNm);
	$('#pop_strAddInfo').val(strAddInfo);
	$("#ref").val("VM1202");
	gfn_setAllStrCd();
}

// 페이지 이동 정보 가져오기
function fn_getStoreInfo() {
	var ref = $("#ref").val();
	location.href=ref;
}

// 아코디언 상세 정보
function fn_CM0401Accordion(){
	$(".search_list .list li .list_text").off("click");
	$(".search_list .list li span.list_text").on("click", function() {
		var listItem = $(this).parent("li");
		if (listItem.find(".list_text_detail").hasClass("height-transition-hidden")) {
			// 상세화면 열기
			listItem.find(".list_text_detail").slideDownTransition();
			listItem.addClass("open");
		}
		else {
			// 상세화면 닫기
			listItem.find(".list_text_detail").slideUpTransition();	
			listItem.removeClass("open");
		}
	});
	
	// 닫기
	$.fn.slideUpTransition = function() {
		return this.each(function() {
			var $el = $(this);
			$el.css("max-height", "0");
			$el.removeClass("height-transition");
			$el.addClass("height-transition-hidden");
		});
	};
	
	// 열기
	$.fn.slideDownTransition = function() {
		return this.each(function() {
			var $el = $(this);
			// temporarily make visible to get the size
			$el.css("max-height", "none");
			var height = $el.outerHeight();
			$el.removeClass("height-transition-hidden");
			$el.addClass("height-transition");
			
			// reset to 0 then animate with small delay
			$el.css("max-height", "0");
			setTimeout(function() {
				$el.css({"max-height": height});
			}, 1);
		});
	};
}

// 정렬 순서 변경 : S(최신순-기본), L(점포명순)
function fn_CM0401Order(){
	if( $('#orderTg').children().eq(0).hasClass('on') ){
		$("#ordSp").val("L");
	} else {
		$("#ordSp").val("S");
	}
	$("#moreCnt").val("0");
	fn_CM0401Search();
}

// 더보기 클릭
function fn_CM0401More() {
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	fn_CM0401Search();
}

// 새로고침
function fn_CM0401refresh(){
	$("#moreCnt").val("0");
	$("#storeList").html("");
	fn_CM0401Search();
}