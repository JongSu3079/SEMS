//전역변수 
var calendar;
var returnData = null;

$(function(){
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	var calendarEl = document.getElementById('calendar');
	calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		locale: 'ko',
		height: 350,					// 달력 높이
		headerToolbar: {
			left: 'custom1',
			center: 'title',
		},
		dateClick:function(arg){		// 일자 click 이벤트
			$("#srcDate").val(arg.dateStr);
			fn_VM2001changeTab('S');
		},
		events:function(arg, sucCallback){
			var param 		= new Object;
			param.start 	= arg.startStr;
			param.end 		= arg.endStr;
			param.tabCd 	= 'S';
			
			retrieveSignMntncDate(param, sucCallback);
		},
		customButtons: {
			custom1: {
				text: '점포검색',
				click: function() {
					var form = document.movePageVM2002;
					form.action = '/menu/VM2002';
					form.method = "post";
					form.enctype = "application/x-www-form-urlencoded";
					form.submit();
				}
			},
		}
	});
	// 달력 그리기
	calendar.render();
	// 달력 resize
	$(window).resize(function(){
		calendar.updateSize();
	}).resize();
	
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

// 헤더에 점포 정보 세팅
function fn_setHeaderCombo(){
	/** 
	 * 필수 태그
	 * <div class="shop_name" id="strDataCombo" ></div>
	 * <input type="hidden" id="hStrCd"/>
	 * <input type="hidden" id="hStrNm"/>
	 */
	gfn_getStrDataList();
}

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

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

function retrieveSignMntncDate(param, successFunc){
	$.ajax({
		url:'/retrieveSignMntncDate',
		data:param,
		dataType:'json',
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success:function(response){
			var data = (response.items).map(item => ({
				start : item.yyyymmdd,
				end : item.yyyymmdd,
				display : 'background',
				color : '#ff9f89'
			}))
			successFunc(data);
			
			var cDate = calendar.getDate();
			var date = moment(cDate).format('YYYY-MM-DD');
			$("#srcDate").val(date)
			param.date = date;
			fn_VM2001TabClick(param);
		}
	})
}

function fn_VM2001RetrieveMntncList(param){
	param.progStatCd = param.tabCd;
	
	$.ajax({
		type : 'POST',
		url:'/retrieveSignMntncList',
		data:JSON.stringify(param),
		dataType:'json',
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success:function(response){
			$("#selectedDate").text(param.date);
			if(response.success){
				var moreCnt = $("#moreCnt").val();
				var pagingRowCnt = $("#pagingRowCnt").val();
				
				if(response.items != null) {
					var html = "";
					if(response.total > 0) {
						response.items.forEach( (item,i) => {
							html += '<li>';
							html +=  '	<div class="title_area">';
							html +=  '		<span class="branch">[' + item.progStat + '] ' + item.strNm + '</span>';
							html +=  '	</div>';
							html +=  '	<div class="detail_area">';
							if(param.tabCd === 'S'){	// 처리예정일때만 화면이동
								html +=  '		<a href="#" onclick="fn_VM2001PageMoveVM2003('+(i + Number(param.startRow))+'); return false;" >';
							}
							html +=  '			<span class="detail">';
//								html +=  '				점검유형 : 간판<br/>';
							
							html +=  '				담당기사 : '+ item.vendorUserNm + ' ( ' + item.vendorNm +' )<br/>';
							if(item.startTime){
								html += '			처리일시 : ' + item.startTime + ' ~ ' + item.endTime + '<br/>';
							}else{
								html += '			처리일시 : -' + '<br/>';
							}
							html +=  '			</span>';
							if(param.tabCd === 'S'){
								html += '		</a>';
							}
							html += '	</div>';
							html += '</li>';
						})
						
						if(param.tabCd === 'S'){
							$("#mntnc_list").addClass("type2");
							// 페이지 파람 사용 데이터
							if(moreCnt == 0){
								returnData = response.items;
							}else{
								returnData = [
									...returnData,
									...response.items
								]
							}
						}else{
							$("#mntnc_list").removeClass("type2");
						}
						
						// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
						if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
							$("#btn_more").show();
						} else {
							$("#btn_more").hide();
						}
					}else{
						html +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#mntnc_list").removeClass("type2");
					}
				}else {
					html +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
					$("#mntnc_list").removeClass("type2");
				}
				if(moreCnt == 0){
					$("#mntnc_list").html(html);
				}else{
					$("#mntnc_list").append(html);
				}
			}else{
				$("#mntnc_list").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				alert("(조회실패)다시 시도해주세요.");
			}
			
		}
	})
}

function fn_VM2001changeTab(tabCd){
	$("#moreCnt").val( 0 );
	
	$("#tabCd").val(tabCd);
	var param = new Object;
	param.tabCd = tabCd;
	param.date = $("#srcDate").val();
	
	fn_VM2001TabClick(param);
}

function fn_VM2001TabClick(param){
	var records 		= "";
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	if( param.tabCd == 'S' ){			// 처리예정 탭
		$("#tab_1").attr("class", "tab_on");
		$("#tab_2").attr("class", "tab_off");
		$("#tab_3").attr("class", "tab_off");
	} else if( param.tabCd == 'Y' ){	// 처리완료 탭
		$("#tab_1").attr("class", "tab_off");
		$("#tab_2").attr("class", "tab_on");
		$("#tab_3").attr("class", "tab_off");
	} else if( param.tabCd == 'P' ){	// 미결 탭
		$("#tab_1").attr("class", "tab_off");
		$("#tab_2").attr("class", "tab_off");
		$("#tab_3").attr("class", "tab_on");
	}
	
	param.startRow 		= startRow;
	param.pagingRowCnt 	= pagingRowCnt;
	
	fn_VM2001RetrieveMntncList(param);
}

//더보기 클릭
function fn_VM2001showMoreList() {
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	var param = new Object;
	param.tabCd = $("#tabCd").val();
	param.date = $("#srcDate").val();
	fn_VM2001TabClick(param);
}


function fn_VM2001PageMoveVM2003(index){
	var paramData = returnData[index];
	
	$("#movePageParam2").val(JSON.stringify(paramData));
	
	var form = document.movePageVM2003;
	form.action = '/menu/VM2003';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}