// 전역 변수 
var dbDataSetFlag = 0;	// 0:초기값, 1:성공, 2:실패
var dbDataSetFlag2 = 0;	// 0:초기값, 1:성공, 2:실패
var gwDataSetFlag = 0;	// 0:초기값, 1:성공, 2:실패
var vm0101NetStatus = '(통신지연)';
var drCusYn = '';

$(document).ready(function(){
	if (!isMobile.iOS()) {
		$(".today_weather .day_area").find("ul li.ios_weather").hide();
		$(".today_weather .day_area").find("ul li.android_weather").show();
	} else {
		$(".today_weather .day_area").find("ul li.ios_weather").show();
		$(".today_weather .day_area").find("ul li.android_weather").hide();
	}
	
	
});

// 스크립트 시작
window.onpageshow = function(event) {
	// 자동 로그인
	fnAutoLoginChk();
	
	// 현재 시간 세팅
//	gfn_roopFunction( (1000*30) , fn_getToday);	// n초마다 갱신 : 손봐야 됨
	gfn_getToday( setTodayCallBack );
	
	// 월간/일간 토글 - 2019.04.15. 사용 안함: 다시 사용할 수도 있음
//	$("#dayMonthTg").cmToggle(0, function() {
//		fn_VM0101dayMonthTg();
//	});
	
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 냉장비 알람 개수 가져오기
	gfn_getAlarmCnt();

	// 간판 알람 개수 가져오기
	gfn_getSignAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// 새로고침
	if(gfn_checkOnload()){
		fn_VM0101refresh();
	}
//	localStorage.clear();
	emergencyNotiPop();
//	setDimmTbl();
	
	// 디바이스 os가 안드로이드이고 점주 계정이 아닐 경우 캐리어 버튼 표시 - 반영 보류
	//if (!isMobile.iOS() && authSp != 'S') {
	//	$("#carrierBtn").show();
	//}
};


// 현재 시간 표시 콜백 함수
var setTodayCallBack = function fn_VM0101setToday( objDate, ampm ){
	var week = new Array("일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일");
	$( '#year' ).html(	objDate.getFullYear() + "년" );
	$( '#month' ).html(	(objDate.getMonth() + 1) + "월" );
	$( '#day' ).html(	objDate.getDate()+"일" );
	$( '#week' ).html(	week[objDate.getDay()] );
	var ampm = (ampm == 'PM') ? '오후' : '오전';
	var min = ('' + objDate.getMinutes()).length == 1 ? '0' + objDate.getMinutes() : objDate.getMinutes();
	$( '#time' ).html(	ampm + ' ' + objDate.getHours() + ':' + min );
}

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

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

// 경영주 알람 호출시 사용되는 함수(삭제 금지)
// 제목, 내용, 알람번호, 알람대상점포
function fn_VM0101setPushInfo(title, content, pushNo, pushStrCd) {
	$('#alarmNewImg').show();
}

// 새로고침
function fn_VM0101refresh(){
	if($('#hStrCd').val() != "") {
		fn_VM0101dashInfoReset();
		fn_VM0101gwApInfoReset();
		fn_VM0101getGwData();	// GW 정보 가져오기
		fn_VM0101getDbData();	// DB 정보 가져오기
		fn_VM0101getDbData2();	// DB 정보 가져오기(점검 일자)
	}
}

// GW 정보 가져오기
function fn_VM0101getGwData(){

	$.ajax({
		type : 'POST',
		dataType : 'JSON',
//		timeout : 7000,
		contentType : "application/text; charset=UTF-8",
		url : '/VM0101GwData',
		beforeSend : function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				vm0101NetStatus = '(통신정상)';
				gwDataSetFlag = 1;
				
				var data = returnJSON.data.gwApStat;
				
				// 냉난방기 상태 설정
				data.haconOnOff ? $("#HVACSt").attr("class","on") : $("#HVACSt").attr("class","off");
				$("#HVACSt").html(gfn_checkStringNull(data.haconOnOffText, "-"));
				
				// 간판 상태 설정
				data.signOnOff == 0 ? $("#SignSt").attr("class","off") : $("#SignSt").attr("class","on");
				$("#SignSt").html(gfn_checkStringNull(data.signOnOffText, "-"));
			} else {
				gwDataSetFlag = 2;
			}
		},
	  error : function(request,status,error) {
		 console.log(request,status,error);
		 gwDataSetFlag = 2;
	  },
		complete : function(returnJSON){
			let dataFlag = 'GW';
			fn_VM0101GetDataComplete(dataFlag);
			$('#vm0101NetStatus').html(vm0101NetStatus);

		}
	})
}

// DB 정보 가져오기
function fn_VM0101getDbData(){
	var btnCd = $("#btnCd").val();
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : btnCd,
//		timeout : 7000,
		contentType : "application/text; charset=UTF-8",
		url : '/VM0101DbData',
		error : function() {
			dbDataSetFlag = 2;
		},
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(returnJSON){
			let dataFlag = 'DB';
			fn_VM0101GetDataComplete(dataFlag);
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				dbDataSetFlag = 1;

				let lastDayOfPreviousMonth = returnJSON.data.dashboardData.lastDayOfPreviousMonth;
				let nowContPowerDate = "";
				// 데이터 확인 후 처리로 수정
				if( typeof(lastDayOfPreviousMonth) != "undefined" && lastDayOfPreviousMonth != null && lastDayOfPreviousMonth != "") {
					nowContPowerDate = lastDayOfPreviousMonth.substring(0,4) + ',' + lastDayOfPreviousMonth.substring(4,6) + ',' + lastDayOfPreviousMonth.substring(6,8)
				}
				
				let remsStartDt = returnJSON.data.dashboardData.remsStartDt;
				let recomContPowerDate = "";
				// 데이터 확인 후 처리로 수정
				if( typeof(remsStartDt) != "undefined" && remsStartDt != null && remsStartDt != "") {
					recomContPowerDate = remsStartDt.substring(0,4) + ',' + remsStartDt.substring(4,6) + ',' + remsStartDt.substring(6,8);
				}
				
				$("#recomDate2").html(nowContPowerDate + ' 기준');
				$("#recomDate3").html(recomContPowerDate + ' 기준');
				
				let data = returnJSON.data.dashboardData;
				let actual = returnJSON.data.isActual;
				let billResult = returnJSON.data.billResult;
				let fridgeList = returnJSON.data.fridgeList;
				let userVo = returnJSON.data.userVo;


				// 한전 계약전력이 0이 아닌 경우에만 그래프 표기
				if (data.actualContPower != '-') {
					$("#monthDate").show();

					fn_VM0101GetContData(actual);
				}

				let fridgeListHtml = '';

				let normalCnt = 0;
				let errorCnt = 0;

				if (userVo.authId != '4') {
					// 냉장비 목록
					if (fridgeList.length > 0) {
						$("#fridgeCon").show();
						for(let i = 0; i < fridgeList.length; i++ ){
							fridgeListHtml += '<tr>';
							fridgeListHtml += 	'<td style="color: #bbe8bc; font-size: 15px;">' + fridgeList[i].deviceLoc + '</td>';
							if (fridgeList[i].fridgeStat == '이상') {
								fridgeListHtml += 	'<td style="font-size: 15px; color: red;">' + fridgeList[i].fridgeStat + '</td>';
								errorCnt++;
							} else {
								fridgeListHtml += 	'<td style="font-size: 15px; color: #ffffff;">' + fridgeList[i].fridgeStat + '</td>';
								normalCnt++;
							}
							fridgeListHtml += '</tr>';
						}
					}
				}


				let now =  getYyyymmdd('today');

				let expHtml = '<span style="font-weight: bold; font-size: 12px; text-decoration: underline;">예상</span>';
				let actualHtml = '<span style="color: red; font-weight: bold; font-size: 12px;">[한전]</span>';
				let semsHtml = '<span style="color: blue; font-weight: bold; font-size: 12px;">[SEMS]</span>';


				// 전년 동월 날짜 표기 / 확정
				$("#lastYear").html(actualHtml + "전년 동월 요금(" + billResult.lastYear + ")");

				// 지난달 날짜 표기
				$("#lastMonth").html(actualHtml + "최근월 요금(" + billResult.latestMonth + ")");


				// 전년 동월 요금
				// lastYearUsage : 전년 동월 한전 요금
				if(billResult.lastYearUsageActual == '-'){
					$("#vm0101data5Div").hide();
				}else{
					$("#vm0101data5").html(gfn_numberWithCommas(billResult.lastYearUsageActual) + ' <span class="unit">원</span>');
				}
				
				// 지난달 요금
				// lastMonthUsageActual : 지난달 한전 요금
				if(billResult.lastMonthUsageActual == '-'){
					$("#vm0101dataDiv1").hide();
				}else{
					$("#vm0101data1").html(gfn_numberWithCommas(billResult.lastMonthUsageActual) + ' <span class="unit">원</span>');
				}

				// 이번달 예상 요금
				// curPredictUsage : 이번달 한전 날짜 SEMS 집계
				$("#vm0101data3").html(billResult.curPredictUsage == '-' ? "예상요금데이터없음" : gfn_numberWithCommas(billResult.curPredictUsage) + ' <span class="unit">원</span>');

				// 조건별 날짜 설정
				// 한전 데이터가 있는 경우 점포별로 시작일(startDate), 종료일(endDate) 값을 가져온다.
				if (actual != null && !isEmpty(actual)) {

					let startDate = actual.startDate.substring(2, 4) + '.' + actual.startDate.substring(4, 6) + '.' + actual.startDate.substring(6, 8);
					let endDate = actual.endDate.substring(2, 4) + '.' + actual.endDate.substring(4, 6) + '.' + actual.endDate.substring(6, 8);

					// 한전 날짜 (종료일 < 조회일 분류)
					if (actual.endDate < now) {
						$("#nowDate1").html(semsHtml + "이번달 " + expHtml + "요금(" + startDate + '~' + endDate + ")");
					} else {
						$("#nowDate1").html(semsHtml + "이번달 " + expHtml + "요금(" + startDate + "~현재)");
					}

				} else {

					// 이번달 예상 날짜 표기
					$("#nowDate1").html(semsHtml + "이번달 " + expHtml + "요금( 1일 ~ 현재일 )");

				}

				// $("#vm0101data2").html(gfn_numberWithCommas(billResult.curMonthUsage));


				let drYn = data.drYn;
				drCusYn = data.drCusYn;

				let isAccepted = '';

				if (drYn == 'Y') {
					if (drCusYn == 'Y') {
						isAccepted = '적용';
					} else {
						isAccepted = '미적용';
					}

					$("#drYn").html('[DR 대상 - ' + isAccepted + ']');
					$("#drBtn").html('<button style="border: 1px solid black;" onclick="fn_changeDrSet()"><span style="font-size: 10px; margin: 2px 2px 2px 2px;">변경</span></button>');
					$("#drYn").css("color", "red");
				} else {
					$("#drYn").html('[DR 미대상]');
					$("#drYn").css("color", "blue");
				}

				let selTextWeather = null; 
				if($(".today_weather .day_area .ios_weather").css('display') != 'none')
					selTextWeather = $(".today_weather .day_area .ios_weather");
				else
					selTextWeather = $(".today_weather .day_area .android_weather");
				
				// 날씨 이미지, 텍스트 세팅
				var weatherNm = data.weatherNm;
				var weatherAlt = '';
				if( weatherNm != '날씨' ){
					weatherAlt = weatherNm;
//					$('#text_weather').removeClass('nodata');
					selTextWeather.find(".w_text").removeClass('nodata');
				} else {
					weatherAlt = ' 정보없음';
//					$('#text_weather').addClass('nodata');
					selTextWeather.find(".w_text").addClass('nodata');
				}
//				$(".icon_weather > img").attr("src", "/images/icon_weather" + data.weatherCd + "_white.png").attr("alt","날씨" + weatherAlt);
//				$("#text_weather").html( weatherNm );
				selTextWeather.find(".icon_weather > img").attr("src", "/images/icon_weather" + data.weatherCd + "_white.png").attr("alt","날씨" + weatherAlt);
				selTextWeather.find(".w_text").html( weatherNm );
				
				// 실외 온도 세팅
				var forecastTemp = data.forecastTemp;
				if( forecastTemp != '-' ){
					$('#forecastTemp, #forecastTempTxt').removeClass('nodata');
				}
				$("#forecastTemp").html( forecastTemp + "℃");
				
				//실외 체감온도
				if( typeof data.sensibleTemp == "undefined"){
					$("#sensibleTemp").html( '-' + "℃");
				}else{
					$("#sensibleTemp").html( data.sensibleTemp + "℃");
				}
				
				// 티센서 수집 실내 온도 세팅
				var senseTemp = data.senseTemp;
				if( senseTemp != '-' ){
					$('#senseTemp, #senseTempTxt').removeClass('nodata');
				}
				$("#senseTemp").html( data.senseTemp + "℃");
				
				// 미세먼지 정보 세팅
				var pm10txt = data.pm10txt;
				var dustAlt = '';
				if( pm10txt == '미세먼지' ){
					dustAlt = '미세먼지 정보없음';
					$('#dustText').addClass('nodata');
				} else {
					dustAlt = pm10txt;
					$('#dustText').removeClass('nodata');
				}
				$(".icon_findDust > img").attr("src","/" + smCommonImagesPath + "/icon_fineDust" + data.pm10grade + ".png").attr("alt", dustAlt);
				$("#dustText").html(pm10txt);
				
				// // 냉장비 정보 세팅 : 0 이면 정상, 0 이상이면 이상
				// if( data.fridgeStat > 0) {
				// 	$("#fridgeSt").html("이상").attr("class", "off");
				// } else {
				// 	$("#fridgeSt").html("정상").attr("class", "on");
				// }

				$("#fridgeSt").html("정상(" + normalCnt + "개) / 이상(" + errorCnt + "개)" ).attr("style", "font-size: 15px; color: #ffffff;");


				// 하단 전력 정보 세팅
				if(btnCd == "M") {
					if(data.elecKind == 'H'){
						// 고압 점포
						$("#elecKind").html('고압A, 최대피크'); //계약전력 정보(고압)
						
						$("#energyText").html(" - 고압 점포는 요금 별도 확인 필요.");
						
						let vm0101data0Txt = data.actualContPower == 100 ? '고압' : data.actualContPower +' <span class="unit">kW</span>';
						$("#vm0101data0").html(vm0101data0Txt); //실제 계약전력
						$("#vm0101data4").html(vm0101data0Txt);	//추천 계약전력
						
						if(data.actualContPower == '-'){
							$("#recomDate2").html('업데이트 예정입니다.'); //실제 계약전력
							$("#recomDate3").html('업데이트 예정입니다.'); //추천 계약전력
						}
						
						$("#elecInfo").text('현재계약전력, 추천계약전력에 대한 상세 내용은 하단 \'SEMS FAQ\'를 참고해주세요.');
					}else if(data.elecKind == 'L'){
						// 저압 점포
						let elecKindTxt = ''
						if(data.actualContPower == '-'){
							if(data.contPower != 50){
								if(data.contPower >= 20){
									elecKindTxt = '최대피크';
								}else{
									elecKindTxt = '최대사용량';
								}
							}
						}else{
							if(data.actualContPower >= 20){
								elecKindTxt = '최대피크';
							}else{
								elecKindTxt = '최대사용량';
							}
						}
						
						$("#elecKind").html('저압, ' + elecKindTxt); //계약전력 정보(저압)
						
						let vm0101data0Txt = data.actualContPower + ' <span class="unit">kW</span>';
						$("#vm0101data0").html(vm0101data0Txt); //실제 계약전력
						
						if(data.actualContPower == '-'){
							$("#recomDate2").html('업데이트 예정입니다.'); //실제 계약전력
						}
						
						var contPower;
						
						if(data.contPower == 50){		// 계약전력이 50(초기값)이면 '-' 표시
							contPower = '-';
						}else{
							contPower = gfn_checkStringNull(data.contPower, "-");
						}
						
						$("#vm0101data4").html(contPower  +' <span class="unit">kW</span>'); // 추천 계약전력
						if(contPower == '-' ){
							$("#recomDate3").html('업데이트 예정입니다.');
						}
						
						$("#elecInfo").text('현재계약전력, 추천계약전력에 대한 상세 내용은 하단 \'SEMS FAQ\'를 참고해주세요.');
					}else if(data.elecKind == 'E'){
						// 모자 미분리 점포
						$("#elecKind").html('모자미분리'); //계약전력 정보
						$("#elecInfo").text('건물통합청구로 계약전력 관리 미적용 점포입니다.');
						
						$("#energy_list").hide();
						$("#search_time").hide();
					}else if(data.elecKind == 'U'){
						// 미확인 점포
						$("#elecKind").html('미확인'); //계약전력 정보
						$("#elecInfo").text('전력계약 미확인 되어 계약전력 관리 미적용 점포입니다.');
						
						$("#energy_list").hide();
						$("#search_time").hide();
					}
					
					var date = new Date();
					var currMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
					var prevMonth = currMonth.getMonth() == 0 ? "12" : currMonth.getMonth(); 
					
					$("#updateTime").html((currMonth.getMonth() + 1) + "월 업데이트 완료 (" + prevMonth + "월 자료)");
				} else {
					//일별 조회일 경우(지난달,이번달,이번달예측만 변경)
					$("#vm0101data0").html(gfn_checkStringNull(data.contPwPerDay, "-"));
					$("#vm0101data1").html(gfn_checkStringNull(data.yesterdayUse, "-"));
					$("#vm0101data2").html(gfn_checkStringNull(data.todayUse, "-"));
					$("#vm0101data3").html(gfn_checkStringNull(data.variationUse, "-"));
				}
				
				// 하단 데이터 가져온 시간 세팅
				$("#nowTime").html(gfn_checkStringNull(data.nowTime, "-"));					// 현재 시간
				
				// 티센서 위치정보 세팅
				$("#tsensor1Loc").html( data.tsensorLoc1 );
				
				// 온도제어 message 세팅
				if(data.scheduleCtrlYn === 'Y'){
					$("#tempCtrMsg").show();
				}
			} else {
				dbDataSetFlag = 2;
			}
		}
	});
}

//DB 정보 가져오기
function fn_VM0101getDbData2(){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/text; charset=UTF-8",
		url : '/VM0101DbData2',
		error : function() {
			dbDataSetFlag2 = 2;
		},
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(returnJSON){
			let dataFlag = 'DB2';
			fn_VM0101GetDataComplete(dataFlag);
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				dbDataSetFlag2 = 1;
				
				var data = returnJSON.data.dashboardData;

				// 정기점검 안내
				if(data.startDt) {
					$("#main_notice").show();
					var comment = "";
					var start = data.startDt;
					var end = data.endDt;
					
					var type = '';
					switch (data.mntncType){
						case 'N':
							type = '냉장비'; break;
						case 'C':
							type = '커피머신'; break;
						case 'S':
							type = '간판'; break;
					}
					
					if(start != end){
						comment = start + "~" + end + " " + type +" 정기점검 방문 예정입니다." ;
					}else{
						comment = start + " " + type +" 정기점검 방문 예정입니다.";
					}
					comment += "별도 문의사항은 " + data.vendorNm + "(" + data.vendorTelNo + ")로 연락부탁드립니다."
					$("#main_comment").html(comment);
				}

				// DR 안내
				if(data.drStartDttm) {

					$("#dr_notice").show();
					let comment = "";
					let startHour = data.startHour;
					let startMin = data.startMin;
					let endHour = data.endHour;
					let endMin = data.endMin;

					comment += "- 현재 DR 참여로 냉난방기가 제어되었습니다. <br>";

					if (startMin != "00") {
						comment += "- DR 시간 : " + startHour + "시 " + startMin + "분 ~ " + endHour + "시 " + endMin + "분";
					} else {
						comment += "- DR 시간 : " + startHour + "시 ~ " + endHour + "시";
					}

					$("#dr_comment").html(comment);
				}


				//간판 on/off 시간 설정
				$("#onTime").html(data.onTime);
				$("#offTime").html(data.offTime);

				// 간판 구분
				$("#signTypeInfo").html(data.signTypeInfo);
				
				// 냉난방 제어정보 세팅
				$("#remsLastCtrl").html(data.remsLastCtrl);
				
				var html = "";
				
				// 기상특보 정보
				if(data.warn != '-' && data.warn) {
					var warnArr = data.warn.split(',');
					var warnVarArr = data.warnVar.split(',');
					if(data.faqId){
						var faqIdArr = data.faqId.split(',');
					}
					
					html += '[특보]' + data.warnTime + ' / ' + data.areaNm + ' / ';
					for(var i=0;i<warnArr.length;i++){
						html += warnArr[i] + '(<span onclick="fn_VM0101PageMoveToVM0102(\''+warnVarArr[i]+'\')" style="text-decoration:underline; cursor:pointer;">안전안내자료보기</span>';
						if('강풍'.indexOf(warnVarArr[i]) != -1  || '건조'.indexOf(warnVarArr[i]) != -1  || '호우'.indexOf(warnVarArr[i]) != -1 ){
							html += ', <span onclick="fn_VM0101PageMoveToVM1400(\''+faqIdArr[i]+'\')" style="text-decoration:underline; cursor:pointer;">안전안내자료동영상보기</span>)';
						}else{
							html += ')';
						}
					}
				}
				
				// 공지사항 정보
				if(data.noticeTitle){
					if(html != ""){
						html += '<br/>'
					}
					html += data.noticeTitle;
					if(data.noticeFaq){
						html += '(<span onclick="fn_VM0101PageMoveToVM1400(\''+data.noticeFaq+'\')" style="text-decoration:underline; color:red; cursor:pointer;">안전안내자료보기</span>)';
					}
				}
				
				// 공지사항, 기상특보 중 하나라도 있으면 표시
				if(html != ""){
					$("#warn_notice").show();
					$("#warn_comment").html(html);
				}
				
				// 냉장비 상태 표시
				if(authSp != 'S'){
					$("#refrigeratorState").show();
					$("#t-sensorState").show();
				}else{
					// 무인, 하이브리드 점포, 직영점(지원 부문) 점주면 냉장비 상태 표시 - 반영 보류
//					if(data.ownerType === 'U'
//						|| data.ownerType === 'H' 
//							|| data.sector === 9){
//						$("#refrigeratorState").show();
//					}else{
//						$("#refrigeratorState").hide();
//					}
				}
				
			}else {
				dbDataSetFlag2 = 2;
			}
		}
	});
}

// 해줌 DR 적용/미적용 변경
function fn_changeDrSet() {

	let beforeDrCusYnText = '';
	let afterDrCusYnText = '';
	let drCusYnParam = '';

	if (drCusYn == 'Y') {
		beforeDrCusYnText = '적용';
		afterDrCusYnText = '미적용';
		drCusYnParam = 'N'
	} else {
		beforeDrCusYnText = '미적용';
		afterDrCusYnText = '적용';
		drCusYnParam = 'Y'
	}

	if (confirm("DR 대상이며 현재 "+ beforeDrCusYnText + "중입니다. \n" + afterDrCusYnText + '으로 변경하시겠습니까?')) {
		$.ajax({
			type : 'POST',
			data : drCusYnParam,
			dataType : 'JSON',
			contentType : "application/text; charset=UTF-8",
			url : '/VM0101ChangeDrSet',
			error : function() {
				alert("(오류발생) 다시 시도해주세요.");
			},
			beforeSend:function() {
				$('#viewLoadingDiv').show().fadeIn('fast');
			},
			complete:function(returnJSON) {
				$('#viewLoadingDiv').fadeOut();
			},
			success : function(returnJSON) {
				if (returnJSON.success) {
					alert("변경되었습니다.");
					fn_VM0101refresh();
				} else {
					alert("(오류발생) 다시 시도해주세요.");
				}
			}
		});
	}
}

function getYyyymmdd(option){

	let date = new Date();
	let year = date.getFullYear();
	let month = ("0" + (1 + date.getMonth())).slice(-2);
	let day = ("0" + date.getDate()).slice(-2);
	let yesterday = new Date(date.setDate(date.getDate() - 1));

	// 전년도 동월
	if (option == 'lastYear') {
		year = date.getFullYear() - 1;

	// 지난달
	} else if (option == 'lastMonth') {

		// 1월인 경우
		if (month == '01') {
			year = date.getFullYear() - 1;
			month = '12';

		// 그 외
		} else {
			month = parseInt(month) - 1 < 10 ? "0" + (parseInt(month) - 1) : parseInt(month) - 1 ;
		}
	} else if(option == 'yesterday') {
		year = yesterday.getFullYear();
		month = ("0" + (1 + yesterday.getMonth())).slice(-2);
		day = ("0" + yesterday.getDate()).slice(-2);
	}

	// option 없으면 오늘
	return year + '' + month + '' + day;
}

// 데이터 가져오기 종료
function fn_VM0101GetDataComplete(dataFlag){

	// DB 통신이 하나라도 안되면 정지
	if( dbDataSetFlag == 0 || dbDataSetFlag2 == 0 ){
		return false;
	} else {

		// DB 통신이 둘 다 끝나면 로딩바 제거
		$('#viewLoadingDiv').fadeOut();

		if ( dataFlag == 'DB' || dataFlag == 'DB2' ) {
			if (dbDataSetFlag == 2 || dbDataSetFlag2 == 2) {
				alert( '(오류발생)일부 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.' );
			}
			return false;
		}

		//셋 다 성공
		if( gwDataSetFlag == 1 && dataFlag == 'GW') {
			return false;
		}

		// 셋 다 실패
		if( (gwDataSetFlag + dbDataSetFlag + dbDataSetFlag2) == 6 ){
			alert( '(오류발생)다시 시도해주세요.' );
		}
		// else {
		// 	alert( '(오류발생)일부 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.' );
		// }
	}
}

// 월간/일간 토글
function fn_VM0101dayMonthTg(){
	var btnCd = $("#btnCd").val();
	$("#vm0101data0").html("0");
	$("#vm0101data1").html("0");
	$("#vm0101data2").html("0");
	$("#vm0101data3").html("0");
	$("#vm0101data4").html("0");
	$("#vm0101data5").html("0");
	
	if( $('#dayMonthTg').children().eq(0).hasClass('on') ){
		$('#btnCd').val('M');
		$('#vm0101dataDiv1 > h4').html('지난달');
		$('#vm0101dataDiv2 > h4').html('이번달');
		$('#vm0101dataDiv3 > h4').html('이번달 예측');
	} else {
		$('#btnCd').val('D');
		$('#vm0101dataDiv1 > h4').html('어제');
		$('#vm0101dataDiv2 > h4').html('오늘');
		$('#vm0101dataDiv3 > h4').html('사용량 증감');
	}
	
	fn_VM0101refresh();
}

// DB 정보 초기화
function fn_VM0101dashInfoReset() {
	dbDataSetFlag = 0;
	$("#vm0101data0").html('- <span class="unit">kW</span>');
	$("#vm0101data1").html('-');
	$("#vm0101data2").html('-');
	$("#vm0101data3").html('-');
	$("#vm0101data4").html('- <span class="unit">kW</span>');
	$("#vm0101data5").html('- <span class="unit">원</span>');
	$("#forecastTemp").html('-℃');
	$("#senseTemp").html('-℃');
	$("#nowTime").html('-');
	$("#fridgeSt").html('-');
	$("#fridgeSt").attr('class', 'off');
}

// 통신 정보 초기화
function fn_VM0101gwApInfoReset() {
	gwDataSetFlag = 0;
	//냉난방 정보
	$("#HVACSt").attr("class","off");
	$("#HVACSt").html("-");
	
	//간판 정보
	$("#SignSt").attr("class","off");
	$("#SignSt").html("-");
}

// 냉난방기 제어 팝업
function fn_VM0301PopShow() {
	$('#VM0301_popup').popup({autoopen:true,background:false});
	fn_VM0302refresh( 'VM0101' );
}

// 간판 제어 팝업
function fn_VM0601PopShow() {
	$('#VM0601_popup').popup({autoopen: true,background:false});
	fn_VM0602refresh( 'VM0101' );
}

// 냉장비 목록 팝업
function fn_VM0501PopShow() {
	$('#VM0501_popup').popup({autoopen: true,background:false});
	fn_VM0502refresh( 'VM0101' );
}

//SEMS 소개 팝업
//$(function() {
//	$("#introduce_popup").popup();
//	$("#introduce_popup .row_list .list li a").off("click");
//	$("#introduce_popup .row_list .list li a").on("click", function() {
//		window.open(this.href,'_blank');
//		return false;
//	});
//});

//SEMS 소개 페이지 이동
function fn_VM0101PageMoveToVM0102(warnCode) {
	var paramDataset = new Object();
	
	paramDataset.fromView = "VM0102";
	paramDataset.warnCode = warnCode;
	
	var paramJson = JSON.stringify(paramDataset);
	
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/VM0102";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

// 특보 동영상 게시판 페이지 이동
function fn_VM0101PageMoveToVM1400(viewId){
	var paramDataset = new Object();
	
	paramDataset.fromView = viewId;
	
	var paramJson = JSON.stringify(paramDataset);
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/faq/" + viewId;
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}


function fn_VM0101MoveWeather(){
	if (isMobile.Android()) {
		try {
			window.open("https://www.weather.go.kr", "_blank");
		} catch (e) {
			alert("페이지 이동시 문제가 발생되었습니다.\n" + e);
		}
	} else {
		alert("준비 중입니다.");
	}
}

function fn_VM0101MoveCarrier(){
	if (!isMobile.iOS()) {
		try {
			window.open("http://gs25mt.net:8888/", "_blank");
		} catch (e) {
			alert("페이지 이동시 문제가 발생되었습니다.\n" + e);
		}
	} else {
		alert("준비 중입니다.");
	}
}


// 그래프 데이터 조회
function fn_VM0101GetContData(actual){
	$.ajax({
		url : '/VM0101GetContData',
		type : 'POST',
		dataType : 'json',
		success : function(resultJSON){
			if(resultJSON.success){
				let data = resultJSON.data;
				// 데이터 확인 후 처리로 수정
				if( data != "undefined" && data != null ) {
//					// 차트 그리기
					fn_VM0101GetGraph(data, actual);
				}else{
					$("#monthDate").hide();
				}

			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}

	});
}

// YYYYMMDD -> YYYY-MM-DD
function fn_VM0101GetContDate(date){

	let newDate = "";
	
	// 데이터 확인 후 처리로 수정
	if( typeof(date) != "undefined" && date != null && date != "") {
		newDate = date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
	}
	
	return newDate;

}

function fn_VM0101GetGraph( data, actual ){

	$("#monthDate").show();

	let today = getYyyymmdd('today');
	let yesterday = getYyyymmdd('yesterday');
	let recomToday = today.substring(0,4) + ',' + today.substring(4,6) + ',' + today.substring(6,8);
	let anchorToday = today.substring(0,4) + '-' + today.substring(4,6) + '-' + today.substring(6,8);

	yesterday = yesterday.substring(0,4) + '-' + yesterday.substring(4,6) + '-' + yesterday.substring(6,8);

	$('#recomDate').html('추천일 : ' + recomToday);

	// 1. data
	let totalUsage = null;
	let predictUsage = null;
	let predictUsage2 = null;
	let contElec = null;
	let maxDemandElec = null;

	let startDate = null;
	let endDate = null;
	let startDate2 = null;


	// SEMS 1일 ~ 말일 데이터도 없는경우 그래프 안보이기
	if (data != null) {
		startDate = data.startDate;
		endDate = data.endDate;
		startDate2 = data.startDate2;
	} else {
		$("#monthDate").hide();
	}

	let start = fn_VM0101GetContDate(startDate);
	let end = fn_VM0101GetContDate(endDate);
	let start2 = null;

	if (startDate2 != undefined) {
		start2 = fn_VM0101GetContDate(startDate2);
	}


	$("#monthDate").hide();

	let categories = [2];
	let chartData = [2];

	// 저압 + 20kw 미만 / 사용량 표기
	if (data.totalUsage != null) {

		categories[0] = "기준사용량(SEMS기준)";
		categories[1] = "현재사용량(전일/한전기준)";

		totalUsage = data.totalUsage;
		predictUsage = data.predictUsage;
		predictUsage2 = data.predictUsage2;

		chartData[0] = totalUsage;

		// 한전
		if (actual != null && !isEmpty(actual)) {
			if (end < anchorToday) {
				if (start2 == anchorToday) {
					$('#targetDate').html(start2 + " ~ " + anchorToday);
				} else {
					$('#targetDate').html(start2 + " ~ " + yesterday);
				}

				chartData[1] = predictUsage2;

			} else {
				$('#targetDate').html(start + " ~ " + yesterday);
				// $('#targetDate').html(start2 + " ~ 현재");
				chartData[1] = predictUsage;
			}

		// SEMS
		} else {
			$('#targetDate').html(start + " ~ " + yesterday);
			chartData[1] = predictUsage;
		}


		$("#targetMonthUsageMsg").show();	// 냉난방기 사용량 문구
		$("#noElecMsg").show();	// 직납점포, 건물통합청구 매장 문구


	// 저압 + 20kw 이상 또는 고압 / 최대수요전력
	} else {

		categories[0] = '계약전력(SEMS기준)';
		categories[1] = "최대수요전력(전일/한전기준)";

		contElec = data.contElec;
		maxDemandElec = data.maxDemandElec;
		maxDemandElec2 = data.maxDemandElec2;

		chartData[0] = contElec;
		chartData[1] = maxDemandElec;

		// 한전
		if (actual != null && !isEmpty(actual)) {

			// 종료일 <= 조회일
			if (end < anchorToday) {
				if (start2 == anchorToday) {
					$('#targetDate').html(start2 + " ~ " + anchorToday);
				} else {
					$('#targetDate').html(start2 + " ~ " + yesterday);
				}

			} else {
				$('#targetDate').html(start + " ~ " + yesterday);
			}

		// SEMS
		} else {
			$('#targetDate').html(start + " ~ " + yesterday);
		}

	}

	// 2. chart theme
	var setGraphStyle = {
		common:{
			txt:"#E0E0E3",
			line:"#707073",
			chart_1:"#2b9492",
			chart_2:"#91f27f"
		},
		gsr_theme:{
			txt:"#222",
			line:"#888",
			chart_1:"#be8f01",
			chart_2:"#fdd866"
		},
	};

	var graphStyle = setGraphStyle[smGraphStyleForVm];
	Highcharts.theme = {
		colors: [graphStyle.chart_1, graphStyle.chart_2],
		lang: {
			thousandsSep: ','
		},
		chart: {
			backgroundColor: '#fff',
			plotBorderColor: '#606063'
		},
		title: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase',
				fontSize: '20px'
			}
		},
		subtitle: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: graphStyle.txt
				}
			},
			lineColor: graphStyle.line,
			minorGridLineColor: '#505053',
			tickColor: graphStyle.line,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		yAxis: {
			gridLineColor: graphStyle.line,
			labels: {
				style: {
					color: graphStyle.txt,
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: graphStyle.line,
			tickWidth: 1,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			style: {
				color: '#F0F0F0'
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#B0B0B3'
				},
				marker: {
					lineColor: '#333'
				}
			},
			boxplot: {
				fillColor: '#505053'
			},
			candlestick: {
				lineColor: 'white'
			},
			errorbar: {
				color: 'white'
			}
		},
		legend: {
			itemStyle: {
				color: graphStyle.txt,
			},
			itemHoverStyle: {
				color: graphStyle.txt,
			},
			itemHiddenStyle: {
				color: '#606063'
			}
		},
		credits: {
			style: {
				color: '#666'
			}
		},
		labels: {
			style: {
				color: '#707073'
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				color: '#F0F0F3'
			},
			activeDataLabelStyle: {
				color: '#F0F0F3'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: '#505053'
				}
			}
		},
		// scroll charts
		rangeSelector: {
			buttonTheme: {
				fill: '#505053',
				stroke: '#000000',
				style: {
					color: '#CCC'
				},
				states: {
					hover: {
						fill: '#707073',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: '#000003',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					}
				}
			},
			inputBoxBorderColor: '#505053',
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(255,255,255,0.1)',
			series: {
				color: '#7798BF',
				lineColor: '#A6C7ED'
			},
			xAxis: {
				gridLineColor: '#505053'
			}
		},
		scrollbar: {
			barBackgroundColor: '#808083',
			barBorderColor: '#808083',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: '#606063',
			buttonBorderColor: '#606063',
			rifleColor: '#FFF',
			trackBackgroundColor: '#404043',
			trackBorderColor: '#404043'
		},
		// special colors for some of the
		legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		background2: '#505053',
		dataLabelsColor: '#B0B0B3',
		textColor: '#C0C0C0',
		contrastTextColor: '#F0F0F3',
		maskColor: 'rgba(255,255,255,0.3)'
	};

	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);

	// 3. set chart
	Highcharts.chart('container_graph', {
		chart: {
			type: 'column'
		},
		backgroundColor : '#fff',
		xAxis: {
			min: -0.5,
			max: 5.5
		},
		yAxis: {
			min: 0
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			align:'center',
			verticalAlign:'top',
			labelFormat: '<span style="color:{color}">{name}</span>'
		},
		xAxis: {
			labels: {
				enabled: false // disable labels
			}
		},
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
					//	return (this.value > 0 ? '' : '') + numberWithCommas (this.value ) + ' kW';
					return this.value + " kWh";
				}
			}
		},
		plotOptions: {
			series: {
				enableMouseTracking: false,	// hover disabled
				borderColor: Highcharts.getOptions().colors[0],
				groupPadding: 0,	// column 간격
				pointWidth: 50	// column 너비
			},
		},
		series: [{
			type: 'column',
			name: [categories[0]],
			data: [chartData[0]],
			color: "#be8f01",
			dataLabels : {
				enabled: true,
				color: '#ffffff',
				align: 'center',
				//세로 위치 지정
				y: 32,
				style: {
					fontSize: '16px',
					fontFamily: 'notoSans',
					fontWeight: 'normal'
				}
			}
		}, {
			type: 'column',
			name: [categories[1]],
			data: [chartData[1]],
			color: "#fdd866",
			dataLabels : {
				enabled: true,
				color: '#ffffff',
				align: 'center',
				//세로 위치 지정
				y: 32,
				style: {
					fontSize: '16px',
					fontFamily: 'notoSans',
					fontWeight: 'normal'
				}
			}
		}],
		exporting: {
			buttons: {
				contextButton: {
					enabled: false
				}
			}
		}
	});
}
function checkYn(arr){
	return arr.some(item => item.useYn === 'Y');
}
function filterYn(arr) {
	return arr.filter(item => item.useYn === 'Y');
}
function setDimmTbl(){
	let strCd = $("#hStrCd").val();
	$.ajax({
		url:'/VM0101retrieveDimmStatus',
		type:'POST',
		cache:false,
		dataType:'json',
		data:{strCd:strCd},
		success:function(result){
			if(result != null){
				let value = result.value;
				$("#dimmP").text('현재 밝기 '+value+'%');
			}else{
				$("#dimmP").hide();
			}
		}
	});
	$.ajax({
		url:'/searchDimmStrPolicy',
		type:'POST',
		cache:false,
		data:{strCd:strCd},
		dataType:'json',
		success:function(data){
			if(data.length>0){
				//돌면서 useYn y확인
				if(checkYn(data)){//활성
					data = filterYn(data);
					let sliderContent = '';
					//현재 밝기, 
					$("#dimmSt").text('정책 활성');
					for(let p = 0;p<data.length;p++){
						let row = data[p] ;
							//
						sliderContent += '<tr>';
						if(p==0){
							sliderContent += '<td rowspan="'+(data.length-1)+'">주간</td>';
						}else if (row.weather==undefined){
							sliderContent += '<td>야간</td>';
						}
						if(row.weather==undefined){
							sliderContent += '<td></td>';
						}else{										
							sliderContent += '<td>'+row.weather+'</td>';
						}
						sliderContent += '<td>'+row.value+'% 밝기 </td>';
						sliderContent += '</tr>';
						
					}
					$("#dimmBoard").html(sliderContent);
				}else{
					//비활성
					$("#dimmSt").text('정책 비활성');
					$("#dimmP").text('');
				}
			}else{//시스템 설정
				$.ajax({
					url:'/searchDimmSystemPolicy',
					type:'POST',
					cache:false,
					dataType:'json',
					data:{strCd:strCd},
					success:function(data){
						//돌면서 useYn y확인
						if(data.length>0){
							let sliderContent = '';
							let showYn = false;
							for(let p = 0;p<data.length;p++){
								let row = data[p] ;
								if(row.useYn=='Y'){
									showYn = true;
									sliderContent += '<tr>';
									if(p==0){
										sliderContent += '<td rowspan="'+(data.length-2)+'">주간</td>';
									}else if (p==(data.length-2)){
										sliderContent += '<td>야간</td>';
									}
									if(row.weather==undefined){
										sliderContent += '<td></td>';
									}else{										
										sliderContent += '<td>'+row.weather+'</td>';
									}
									sliderContent += '<td>'+row.value+'% 밝기 </td>';
									sliderContent += '</tr>';
								}
							}
							if(showYn){
								$("#dimmBoard").html(sliderContent);
								$("#dimmSt").text('정책 활성');	
							}else{
								$("#dimmBoard").hide();
								$("#dimmSt").text('정책 비활성');
							}
						}else{
							$("#dimmBoard").hide();
							$("#dimmSt").text('정책 비활성');
						}
					}
				});
			}
		}
	});
	//현재 밝기
}
//빈객체인지 확인
function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}


function emergencyNotiPop(){
	$.ajax({
		url:'/VM0101retrieveEmgNotice',
		data:{authId:authId},
		type:'POST',
		cache:false,
		dataType:'json',
		success:function(data){
			if(data.length>0){
				emNotiList(data)
			}
		}
	});
}
function emNotiList(data){
	let showAlertsSequentially = function(index) {
		if (index < data.length) {
			let noti = data[index];
			let key = 'noti_' + noti.notiId + '_confirm';
			let value = localStorage.getItem(key);

			if (!value) {
				let alertData = {
					title: noti.title,
					html: noti.contents.replaceAll('\n', '<br/>'),
					confirmButtonText: '다시보지 않기',
					confirmButtonColor: '#ffffff',
					didOpen: () => {
						// 팝업이 열릴 때 선택된 상태 제거
						$('.swal2-confirm').blur(); 
						$('.swal2-cancel').blur(); 
					}
				};
				try{
					Swal.fire(alertData).then((result) => {
						if (result.isConfirmed) {
							localStorage.setItem(key, "Y");
						}
						showAlertsSequentially(index + 1);
					});
				}catch(e){
					console.log(e);
				}
			} else {
				showAlertsSequentially(index + 1);
			}
		}
	};

	// 첫 번째 알림 표시 시작
	showAlertsSequentially(0);
}
