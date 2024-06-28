// 전역 변수
var timeSetFalg = 0;

let beforeActiveYn = null;

// 스크립트 시작 
window.onpageshow = function(event) {
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 냉장비 알람 개수 가져오기
	gfn_getAlarmCnt();

	// 간판 알람 개수 가져오기
	gfn_getSignAlarmCnt();

	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// SIGN_OPER 변화 감지
	fn_VM0601SignOperSetter();

	// 기상청 연동제어 변화 감지
	fn_VM0601ForecastSetter()

	// 새로고침
	if(gfn_checkOnload()){
		fn_VM0601refresh();
	}
	
};

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

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

// 새로고침
function fn_VM0601refresh() {
	timeSetFalg = 0;
	// 로딩 바 표시
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	// 간판 상태 조회
	fn_VM0602refresh();
	
	// 일출몰/간판 시간 정보 조회
	fn_VM0601GetDbData();
}



// 일출몰, 간판 시간 / 기상청 연동제어 정보 조회
function fn_VM0601GetDbData() {
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0601GetSignDb',
		dataType : "JSON",
		timeout : 20000,
		contentType : "application/json; charset=UTF-8",
		beforeSend:function() {
		},
		error : function(e) {
			Rollbar.info(e);
			timeSetFalg = 2;
		},
		complete:function() {
			// 데이터 가져오기 종료
			fn_VM0601SetDataComplete();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				timeSetFalg = 1;
				
				var data = returnJSON.data.timeInfo
				var forecastData = returnJSON.data.forecastInfo;

				// 전체 날씨 설정 'N'으로 초기화
				$("[name='weatherKind']").each(function() {
					$(this).val('N');
					$(this).find('span').css('color', 'black');
				})

				if (forecastData != null) {
					fn_VM0601forecastValSet(forecastData);
				} else {
					$("#activeYn").val('N');
					$("#active_N").css({
						'font-weight': 'bold'
					});
					$("[name='weatherKind']").each(function() {
						$(this).val('N');
					});
				}

				// 특정 점포만 조명 상태 표시
				if($('#hStrCd').val() == 'RGR014621'){
					$("#lightMsg").show();
					var lightState = '';
					
					var date = new Date();
					var hour = date.getHours();
					var minute = date.getMinutes();
					var now = hour + "" + minute;
					
					if(data.sunriseTime.replace(":","") > now || data.sunsetTime.replace(":","") < now){
						// 해가 지고 뜨기 전까지 조명 'ON'
						lightState = 'ON';
					}else{
						// 날씨가 맑음이 아니면 조명 'ON'
						if(data.weatherCd == 1){
							lightState = 'OFF';
						}else{
							lightState = 'ON';
						}
					}
					
					$("#lightState").text(lightState);
					if(lightState == 'ON') $("#lightState").css("color","red");
				}
				// 시간정보 설정(일출/일몰시간, ON/OFF시간)
				// 초기화
				$('#timeDivGrp').children('li').each(function(){
					$(this).removeClass('sunrise_time off_time on_time sunset_time');
				})
				
				var temp = [];
				var on	= data.onTime;
				var off	= data.offTime;
				var sr	= data.sunriseTime;
				var ss	= data.sunsetTime;
				var onNum = on.replace(':', '')*1;
				var offNum = off.replace(':', '')*1;
				var srNum = sr.replace(':', '')*1;
				var ssNum = ss.replace(':', '')*1;
				
				$("#signOn").val(data.soperOn);
				$("#signOff").val(data.soperOff);

				var signDelyVal1 = data.signDely.split(',')[0];
				var signDelyVal2 = data.signDely.split(',')[1];

				$("#signOnDely").val(signDelyVal1);
				$("#signOffDely").val(signDelyVal2);

				// 24시간 간판 ON
				if( data.policy == '24_ON' ){
					$('#timeDivGrp').addClass('allTime');
					temp = [
						{data:onNum	, class:'on_time'		, time:on},
						{data:offNum, class:'on_time'		, time:off},
						{data:srNum	, class:'sunrise_time'	, time:sr},
						{data:ssNum	, class:'sunset_time'	, time:ss}
					];
					$("#scrSignOper").val("1").trigger('change');
					// 정책 없음
				} else if( data.policy == 'NO_POLICY' ){
					$('#timeDivGrp').addClass('allTime');
					temp = [
						{data:onNum	, class:'off_time'		, time:on},
						{data:offNum, class:'off_time'		, time:off},
						{data:srNum	, class:'sunrise_time'	, time:sr},
						{data:ssNum	, class:'sunset_time'	, time:ss}
					];
					// 그외
				} else {
					temp = [
						{data:onNum	, class:'on_time'		, time:on},
						{data:offNum, class:'off_time'		, time:off},
						{data:srNum	, class:'sunrise_time'	, time:sr},
						{data:ssNum	, class:'sunset_time'	, time:ss}
					];
					if(data.policy == 'SUN_RISET' || data.signOper == 'L1'){
						$("#scrSignOper").val("2").trigger('change');
						if(data.boxVer == '1.5'){
							$("#scrSignOper").attr("disabled", 'true');
						}
					}else{
						$("#scrSignOper").val("3").trigger('change');
					}
				}

				$("#scrSignOperLog").val(data.signOper);
				$("#signOnOffLog").val(data.soperOn+","+data.soperOff);
				$("#signDelyLog").val(data.signDely);

				// 정렬
				temp.sort(function (a, b) {
					return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
				});

				// 세팅
				for( var i=0; i<4; i++ ){
					$('#timeDiv' + i).addClass( temp[i].class );
					$('#setTime' + i).html( temp[i].time );
				}
			} else {
				timeSetFalg = 2;
			}
		}
	});
}

function fn_VM0601forecastValSet(data) {

	let activeYn;
	let cloudSmallYn;
	let cloudBigYn;
	let cloudyYn;
	let rainyYn;
	let snowyYn;
	let rainySunYn;
	let rainyShowerYn;
	let rainySnowYn;
	let snowyRainYn;
	let thunderYn;
	let smogYn;
	let sunnyYn;

	if (data != null) {

		if (data.activeYn != 'X') {
			activeYn = data.activeYn;
			cloudSmallYn = data.cloudSmallYn;
			cloudBigYn = data.cloudBigYn;
			cloudyYn = data.cloudyYn;
			rainyYn = data.rainyYn;
			snowyYn = data.snowyYn;
			rainySunYn = data.rainySunYn;
			rainyShowerYn = data.rainyShowerYn;
			rainySnowYn = data.rainySnowYn;
			snowyRainYn = data.snowyRainYn;
			thunderYn = data.thunderYn;
			smogYn = data.smogYn;
			sunnyYn = data.sunnyYn;
		} else {
			activeYn = data.totalActiveYn;
			cloudSmallYn = data.totalCloudSmallYn;
			cloudBigYn = data.totalCloudBigYn;
			cloudyYn = data.totalCloudyYn;
			rainyYn = data.totalRainyYn;
			snowyYn = data.totalSnowyYn;
			rainySunYn = data.totalRainySunYn;
			rainyShowerYn = data.totalRainyShowerYn;
			rainySnowYn = data.totalRainySnowYn;
			snowyRainYn = data.totalSnowyRainYn;
			thunderYn = data.totalThunderYn;
			smogYn = data.totalSmogYn;
			sunnyYn = data.totalSunnyYn;


		}

		$("#cloudSmallYn").val(cloudSmallYn);
		$("#cloudBigYn").val(cloudBigYn);
		$("#cloudyYn").val(cloudyYn);
		$("#rainyShowerYn").val(rainyShowerYn);
		$("#rainySnowYn").val(rainySnowYn);
		$("#rainySunYn").val(rainySunYn);
		$("#rainyYn").val(rainyYn);
		$("#smogYn").val(smogYn);
		$("#snowyRainYn").val(snowyRainYn);
		$("#snowyYn").val(snowyYn);
		$("#sunnyYn").val(sunnyYn);
		$("#thunderYn").val(thunderYn);

		// 날씨 데이터 백업
		$("#hCloudSmallYn").val(cloudSmallYn);
		$("#hCloudBigYn").val(cloudBigYn);
		$("#hCloudyYn").val(cloudyYn);
		$("#hRainyShowerYn").val(rainyShowerYn);
		$("#hRainySnowYn").val(rainySnowYn);
		$("#hRainySunYn").val(rainySunYn);
		$("#hRainyYn").val(rainyYn);
		$("#hSmogYn").val(smogYn);
		$("#hSnowyRainYn").val(snowyRainYn);
		$("#hSnowyYn").val(snowyYn);
		$("#hSunnyYn").val(sunnyYn);
		$("#hThunderYn").val(thunderYn);

		if (activeYn == 'Y') {
			$(this).addClass('greenBackground');
			$('input[name="weatherKind"]').prop('disabled', false);
			$('#activeYn ~ .toggleSwitch').css('background', '#0cca46');
			$('#activeYn ~ .toggleSwitch .toggleButton').css({
				'left': 'calc(100% - 30px)',
				'background': '#fff'
			});
			$('#active_Y').css('font-weight', 'bold');
			$('#active_N').css('font-weight', 'normal');
			$('#activeYn').val('Y');
		} else {
			$(this).removeClass('greenBackground');
			$('input[name="weatherKind"]').prop('disabled', true);
			$('#activeYn').val('N');
			$("[name='weatherKind']").each(function() {
				$(this).css({
					'background-color': '#bebebe'
				});
				$(this).find('span').css('color', 'black');
			});
		}

		$("[name='weatherKind']").each(function() {
			if (activeYn == 'Y') {
				if ($(this).val() === 'Y') {
					$(this).css({
						'background-color': '#0cca46'
					});
					$(this).find('span').css('color', '#fff');
				} else {
					$(this).css({
						'background-color': '#bebebe'
					});
					$(this).find('span').css('color', 'black');
				}
				$(this).prop('disabled', false);
			}
		})
	} else {
		$("#cloudSmallYn").val('N');
		$("#cloudBigYn").val('N');
		$("#cloudyYn").val('N');
		$("#rainyShowerYn").val('N');
		$("#rainySnowYn").val('N');
		$("#rainySunYn").val('N');
		$("#rainyYn").val('N');
		$("#smogYn").val('N');
		$("#snowyRainYn").val('N');
		$("#snowyYn").val('N');
		$("#sunnyYn").val('N');
		$("#thunderYn").val('N');
	}
}


//데이터 가져오기 종료
function fn_VM0601SetDataComplete(){
	// 둘 중 하나가 수행 중
	if( signSetFlag == 0 || timeSetFalg == 0 ){
		return false;
		// 둘 다 완료
	} else {
		$('#viewLoadingDiv').fadeOut();

		// 둘 다 성공
		if( signSetFlag == 1 && timeSetFalg == 1 ){
			return false;
			// 둘 다 실패
		} else if( (signSetFlag + timeSetFalg) == 4 ){
			alert( '(오류발생)다시 시도해주세요.' );
			// 하나만 실패
		} else {
			alert( '(오류발생)일부 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.' );
		}
	}
}

function fn_VM0601SignOperSetter() {
	$('#scrSignOper').off('change');
	$('#scrSignOper').on('change', function(){
		var signOper = $(this).val();

		$("#signTime").hide();
		$("#signDely").hide();

		if(signOper == "3"){
			$("#signTime").show();
		}
		if(signOper == "2"){
			$("#signDely").show();
		}
	});
}

//간판 설정
function fn_VM0601SaveSignEnv(){
	$('#viewLoadingDiv').show().fadeIn('fast');

	if($("#scrSignOper option:selected").val() == "선택"){
		alert("간판 설정을 선택해주세요");
		$('#viewLoadingDiv').fadeOut();
		return;
	}

	if($("#scrSignOper option:selected").val() == "2"){
//		if( $("#signOnDely").val() == "" || $("#signOffDely").val() == "" || $("#signOnDely").val() > 60 || $("#signOnDely").val() <= -60 || $("#signOffDely").val() > 60 || $("#signOffDely").val() <= -60 ){
		var regex= /^(-?)[0-9]+$/;
		if(!regex.test($("#signOnDely").val()) || !regex.test($("#signOffDely").val())){
			alert("숫자로만 입력해 주세요");
			$('#viewLoadingDiv').fadeOut();
			return;
		}
	}

	// 필수항목 유효성 검사, null 체크
	var reg = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
	var regFlag = reg.test( $('#signOn').val() ) && reg.test( $('#signOff').val() );		// true면 통과

	if( !regFlag ){
		alert('"00:00~23:59"의 시간만 입력 가능합니다.');
		$('#viewLoadingDiv').fadeOut();
		return;
	}

	var signOper 	= $("#scrSignOper").val();
	var signOn		= $('#signOn').val();
	var signOff		= $('#signOff').val();
	var signOnDely	= $("#signOnDely").val();
	var signOffDely	= $("#signOffDely").val();
	var signOperLog	= $("#scrSignOperLog").val();
	var signOnOffLog= $("#signOnOffLog").val();
	var signDelyLog	= $("#signDelyLog").val();

	var dbInfo = {
		"signOper"		:	signOper,
		"signTime"		:	signOn+","+signOff,
		"signDely"		:	signOnDely+","+signOffDely,
		"signOperLog"	:	signOperLog,
		"signOnOffLog"	:	signOnOffLog,
		"signDelyLog"	:	signDelyLog
	};

	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0601SaveSignEnv',
		timeout : 10000,
		data : JSON.stringify(dbInfo),
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		error : function(e) {
			Rollbar.info(e);
//			fn_VM0601getSignOnoff();
			fn_VM0601GetDbData();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert(returnJSON.msg);
				// 새로 고침
				if( parentPage0602 == 'VM0101' ){
					fn_VM0602refresh( 'VM0101' );
				} else {
					fn_VM0601refresh();
				}
			} else {
				alert(returnJSON.msg);
			}
		}
	})
}

function fn_VM0601ForecastSetter() {

	$('#activeYn').on('click', function() {

		if($(this).val() == 'N') {
			$('#activeYn').val('Y');
			$('#active_Y').css('font-weight', 'bold');
			$('#active_N').css('font-weight', 'normal');
			$('#activeYn ~ .toggleSwitch').css('background', '#0cca46');
			$('#activeYn ~ .toggleSwitch .toggleButton').css({
				'left': 'calc(100% - 30px)',
				'background': '#fff'
			});

			$("[name='weatherKind']").each(function() {
				let closestForecast = $(this).closest('.forecast');
				let hiddenValue = closestForecast.find('input[type="hidden"]').val();
				if (hiddenValue === 'Y') {
					$(this).val(hiddenValue);
					$(this).css({
						'background-color': '#0cca46'
					});
					$(this).find('span').css('color', '#fff');
				}
				$(this).prop("disabled", false);
			});
		} else {
			$('#activeYn').val('N');
			$('#active_Y').css('font-weight', 'normal');
			$('#active_N').css('font-weight', 'bold');
			$('#activeYn ~ .toggleSwitch').css('background', '#bebebe');
			$('#activeYn ~ .toggleSwitch .toggleButton').css({
				'left': 'calc(100% - 75px)',
				'background': '#fff'
			});

			$("[name='weatherKind']").each(function() {
				// $(this).val('N')
				$(this).css({
					'background-color': '#bebebe'
				});
				$(this).prop("disabled", true);
				$(this).find('span').css('color', 'black');
			});
		}
	});

	$('.forecast_button').on('click', function() {
		if ($('#activeYn').val() == 'Y') {
			if ($(this).val() === 'Y') {
				$(this).val('N')
				$(this).css({
					'background-color': '#bebebe'
				});
				$(this).find('span').css('color', 'black');
			} else {
				$(this).val('Y')
				$(this).css({
					'background-color': '#0cca46'
				});
				$(this).find('span').css('color', '#fff');
			}
		}
	});
}


function fn_VM0601SaveForecast() {

	let activeYn 		= $("#activeYn").val() != '' ? $("#activeYn").val() : 'N';
	let	cloudBigYn 		= $("#cloudBigYn").val() != '' ? $("#cloudBigYn").val() : 'N';
	let	cloudSmallYn 	= $("#cloudSmallYn").val() != '' ? $("#cloudSmallYn").val() : 'N';
	let	cloudyYn 		= $("#cloudyYn").val() != '' ? $("#cloudyYn").val() : 'N';
	let	rainyShowerYn 	= 'X';
	let	rainySnowYn 	= $("#rainySnowYn").val() != '' ? $("#rainySnowYn").val() : 'N';
	let	rainySunYn 		= 'X';
	let	rainyYn 		= $("#rainyYn").val() != '' ? $("#rainyYn").val() : 'N';
	let	smogYn 			= 'X';
	let	snowyRainYn 	= 'X';
	let	snowyYn 		= $("#snowyYn").val() != '' ? $("#snowyYn").val() : 'N';
	let	sunnyYn 		= $("#sunnyYn").val() != '' ? $("#sunnyYn").val() : 'N';
	let	thunderYn 		= 'X';
	let strCd 			= $("#hStrCd").val();
	let strNm 			= $("#hStrNm").val();

	var params = new Object();
	params.activeYn 		= activeYn;
	params.cloudBigYn 		= cloudBigYn;
	params.cloudSmallYn 	= cloudSmallYn;
	params.cloudyYn 		= cloudyYn;
	params.rainyShowerYn 	= rainyShowerYn;
	params.rainySnowYn 		= rainySnowYn;
	params.rainySunYn 		= rainySunYn;
	params.rainyYn 			= rainyYn;
	params.smogYn 			= smogYn;
	params.snowyRainYn 		= snowyRainYn;
	params.snowyYn 			= snowyYn;
	params.sunnyYn 			= sunnyYn;
	params.thunderYn 		= thunderYn;
	params.strCd 			= strCd;
	params.strNm 			= strNm;

	$.ajax({
		type : 'POST',
		dataType : "JSON",
		async : false,
		data : JSON.stringify(params),
		beforeSend : function() {
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete : function() {
			$('#viewLoadingDiv').fadeOut();
		},
		url : "/VM0601SaveForecast",
		contentType : "application/json; charset=UTF-8",
		success : function(resultJson) {
			if(resultJson.success) {
				fn_VM0601refresh();
				alert("(저장성공)저장이 완료됐습니다.");
			} else {
				alert("(저장실패)다시 시도해주세요.");
			}
		},
		error : function() {
			alert("(저장실패)다시 시도해주세요.");
		}
	})
}