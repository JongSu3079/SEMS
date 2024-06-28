// 전역변수 
var returnJSONData = null;
var frigeList = [];		// 냉장비 리스트

// 스크립트 시작 
window.onpageshow = function(event) {
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();

	// 알람 개수 가져오기
	gfn_getAlarmCnt();

	// 점포 상세 정보 팝업
	fn_strInfoPopup();

	// 설비종류
	fn_VM0501retrieveDeviceCode();

	// 새로고침
	if(gfn_checkOnload()){
		fn_VM0501refresh();
	}

	// 일시정지 아코디언 on/off
	$.fn.alarm_control_open = function() {
		var alarm_control = $(this).parents("li").find(".alarm_control");

		if(alarm_control.hasClass("open")){
			alarm_control.removeClass("open");
		}else{
			alarm_control.addClass("open");
		}

//		var closeBtn = $(this).parents("li").find(".open");
//		closeBtn.off("click");
//		closeBtn.on("click", function() {
//			alarm_control.removeClass("open");
//		});
	}

	// 냉장비 설정 아코디언 on/off
	$.fn.settings_open = function() {
		var settings = $(this).parents("li").find(".settings");

		if(settings.hasClass("open")){
			settings.removeClass("open");
		}else{
			settings.addClass("open");
		}
	}
	
	$.fn.owner_settings_open = function() {
		var owner_settings = $(this).parents("li").find(".owner_settings");

		if(owner_settings.hasClass("open")){
			owner_settings.removeClass("open");
		}else{
			owner_settings.addClass("open");
		}
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

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

//새로고침
function fn_VM0501refresh() {
	fn_VM0501getFrigeStatList();
}

// 냉장비 상태 조회
function fn_VM0501getFrigeStatList() {
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		async : false,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM0501List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				returnJSONData = returnJSON.items;
				var frigeStatList = returnJSON.items;

				var rssiFlag = true;
				if($("#hStrNm").val() == 'GS슈퍼강동고덕점'){
					if(returnJSONData[0].userId != 'ksg' && returnJSONData[0].userId != 'psh'){
						rssiFlag = false;
					}
				}

				// gs슈퍼 온도 보정값 하드코딩
				if($("#hStrNm").val() == 'GS슈퍼포레스티아점'){
					for(var i=0;i<frigeStatList.length; i++){
						var temp = frigeStatList[i].senseTemp;
						if(temp != '-'){
							switch(frigeStatList[i].portNo){
								case "1" :
								case "2" :
								case "3" :
								case "4" :
								case "7" :
								case "9" :
								case "13" :
								case "15" :
									temp = (temp - 3).toFixed(2);
									break;
								case "5" :
									temp = (temp - 2).toFixed(2);
									break;
								case "6" :
								case "8" :
								case "12" :
									temp = (temp - 4).toFixed(2)
									break;
							}
						}
						frigeStatList[i].senseTemp = temp;
					}
				}
				var records = "";
				if(frigeStatList.length > 0) {
					$.each(
						frigeStatList,
						function(i, frigeStatList) {
							var freezeYn = 'N';
							switch(frigeStatList.deviceCode){
								case 'ICC':
								case 'ICC_C':
								case 'ICC_F':
								case 'RIF':
									freezeYn = 'Y';
									break;
								default :
									freezeYn = 'N';
									break;
							}
							
							if( frigeStatList.alarmYn == 'Y' ) {
//							if( frigeStatList.alarmYn != 'N' ) {	// 추후 반영
								records += '<li class="disorder">';
							} else {
								records += '<li>';
							}
							records += '	<div class="title_area">';
							if( frigeStatList.temonType == 'B' ){
								records += '		<span class="h_icon">무선</span>';
							} else if( frigeStatList.temonType == 'T' ) {
								records += '		<span class="t_icon">유선</span>';
							} else if( frigeStatList.temonType == 'I' ) {
								records += '		<span class="i_icon">인버터</span>';
							}
							records += '		<span class="equipment">' + frigeStatList.deviceLoc + frigeStatList.contents +'</span>';
							records += '		<span class="notification">| 최근한달알람[<span class="red">' + frigeStatList.alarmCnt + '</span>]</span>';

							if(frigeStatList.deviceType == "I" && (frigeStatList.deviceLoc).indexOf('ICC') != -1 ){	// ICC 장비 위치 저장
								records += '	<select id="iccLocation'+frigeStatList.portNo+'" style="width:calc(20% - 5px);" onchange="fnIccSelectChangeEvent(this,\''+frigeStatList.strCd+'\',\''+frigeStatList.moduleId+'\',\''+frigeStatList.portNo+'\',\''+frigeStatList.temonType+'\',\''+frigeStatList.deviceLoc+'\')">';
								records += '		<option value="">선택</option>';
								records += '		<option value="내부">내부</option>';
								records += '		<option value="외부">외부</option>';
								records += '	</select>';
							}
							// 냉동 장비 일때 만 표시
							if(freezeYn == 'Y'){
								records += '		<a onclick="$(this).owner_settings_open();" title="경영주 알람 설정 열기" class="btn_alarm">경영주 알람 설정 열기</a>';
							}
							if( frigeStatList.temonType !== 'I' ) {
								records += '		<a onclick="$(this).settings_open();" title="냉장비 설정 열기" class="btn_settings">냉장비 설정 열기</a>';
							}
							records += '		<a onclick="$(this).alarm_control_open();" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>';
							records += '		<a href="#" onclick="fn_VM0501popupGraph(\'' + i + '\'); return false;" title="그래프 새창 열기" class="btn_graph"><img src="/images/btn_graph.png" width="8" height="11" alt="그래프" /></a>';
							records += '	</div>';
							records += '	<div class="detail_area">';
							records += '		<ul class="temperatureInfo">';
							records += '			<li class="temperature">';
							records += '				<span class="title_temperature">온도</span>';
							records += '				<span class="body_temperature">' + frigeStatList.senseTemp + '℃</span>';
							records += '			</li>';
							if( frigeStatList.temonType == 'B' ){
								records += '		<li class="battery">';
								records += '			<span class="title_temperature">배터리</span>';
								records += '			<span class="body_temperature">' + frigeStatList.battery + '%</span>';
								records += '		</li>';
								if(rssiFlag){
									records += '		<li class="rssi">';
									records += '			<span class="title_temperature">rssi</span>';
									records += '			<span class="body_temperature">' + frigeStatList.rssi + ' dBm</span>';
									records += '		</li>';
								}
							}
							records += '		</ul>';
							records += '	</div>';

							/* 냉장비 설정 아코디언 */
							records += '	<div class="settings">';
							records += '		<div class="setting_area">';
							records += '			<div class="form_row">';
							records += '				<div class="inputBox">';
							records += '					<em class="title">설비종류</em>';
							records += '					<select id="deviceType"  onchange ="checkFreezer(this, '+i+')">';
							frigeList.forEach(item => {
								records += '<option value="'+item.deviceType+'"';
								if(item.deviceType === frigeStatList.deviceType){
									records += 'selected';
								}
								records += ' value2="'+item.deviceCode+'" >'+item.deviceName+'</option>'
							})
							records += '					</select>';
							records += '					<em class="title">설비구분</em>';
							records += '					<input type="text" style="width:100%;" id="deviceLoc" value="'+frigeStatList.deviceLoc+'"/>';
							records += '					<em class="title" style="border-bottom: 1px solid #c4c4c4;">설비설정</em>';
							records += '					<div class="tblBox">';
							records += '						<table>';
							records += '							<colgroup>';
							records += '								<col />';
							records += '								<col style="width: 25%;" />';
							records += '								<col style="width: 25%;" />';
							records += '								<col style="width: 25%;" />';
							records += '							</colgroup>';


							records += '							<tbody>';
							records += '								<tr>';
							records += '									<td>상한온도</td>';
							records += '									<td class="input"><input type="text" style="font-size: 1.2em;" max="50" min="-50" id="maxTemp" value="'+Math.floor(frigeStatList.maxTemp)+'"/></td>';
							records += '									<td>하한온도</td>';
							records += '									<td class="input"><input type="text" style="font-size: 1.2em;" max="50" min="-50" id="minTemp" value="'+Math.floor(frigeStatList.minTemp)+'"/></td>';
							records += '								</tr>';
							records += '								<tr>';
							records += '									<td>감지주기(분)</td>';
							records += '									<td class="input"><input type="text" style="font-size: 1.2em;" max="180" min="0" id="delayTime" value="'+Math.floor(frigeStatList.delayTime)+'"/></td>';
							records += '									<td>알람주기(분)</td>';
							records += '									<td class="input"><input type="text" style="font-size: 1.2em;" max="360" min="0" id="pushTerm" value="'+Math.floor(frigeStatList.pushTerm)+'"/></td>';
							records += '								</tr>';
							records += '							</tbody>';
							records += '						</table>';
							records += '					</div>';
							records += '				</div>';
							records += '			</div>';
							records += '			<div class="btn_sub">';
							records += '				<p class="start"><a href="#" onclick="fn_VM0501frigeSettingSave(this, '+i+'); return false;">저장</a></p>';
							records += '			</div>';
							records += '		</div>';
							records += '	</div>';
							/* //냉장비 설정 아코디언*/
							
							/* 경영주알람 설정 아코디언 */
							records += '	<div class="owner_settings">';
							records += '		<div class="setting_area">';
							records += '			<div class="form_row">';
							records += '				<div class="inputBox">';
							records += '					<em>경영주 알람 사용설정</em>';
							records += '					<div class="checkBox " style="margin-left:3%">';
							records += '						<input type="checkbox" id="useYn'+i+'" name="useYn'+i+'">';
							records += '						<label for="useYn'+i+'" style="font-size:15px;">경영주 알람 사용</label>';
							records += '					</div>';								
							records += '					';
							records += '					<em class="title" style="border-bottom: 1px solid #c4c4c4;">설비설정<br><span style="font-size:12px;color:blue;">경영주 알람 설비 설정은 기존 설비 설정 값을 기준으로 설정</span></em>';
							records += '					<div class="tblBox">';
							records += '						<table>';
							records += '							<colgroup>';
							records += '								<col />';
							records += '								<col style="width: 25%;" />';
							records += '								<col style="width: 25%;" />';
							records += '								<col style="width: 25%;" />';
							records += '							</colgroup>';

							records += '							<tbody>';
							records += '								<tr>';
							records += '									<td>추가상한온도</td>';
							records += '									<td class="input" style="white-space: nowrap;">+ &nbsp<input type="number" style="font-size: 1.2em;max-width: 80%;" max="50" min="-50" id="maxTempOwner" value="'+Math.floor(frigeStatList.maxTempOwner)+'"/></td>';
							records += '									<td>추가하한온도</td>';
							records += '									<td class="input" style="white-space: nowrap;">- &nbsp<input type="number" style="font-size: 1.2em;max-width: 80%;" max="50" min="-50" id="minTempOwner" value="'+Math.floor(frigeStatList.minTempOwner.replace('-',''))+'"/></td>';
							records += '								</tr>';
							records += '								<tr>';
							records += '									<td>감지주기(분)</td>';
							records += '									<td class="input"style="white-space: nowrap;">&nbsp &nbsp<input type="number" style="font-size: 1.2em;max-width: 80%;" max="360" min="0" id="delayTimeOwner" value="'+Math.floor(frigeStatList.delayTimeOwner)+'"/></td>';
							records += '									<td>알람주기(분)</td>';
							records += '									<td class="input"style="white-space: nowrap;">&nbsp &nbsp<input type="number" style="font-size: 1.2em;max-width: 80%;" max="360" min="0" id="pushTermOwner" value="'+Math.floor(frigeStatList.pushTermOwner)+'"/></td>';
							records += '								</tr>';
							records += '							</tbody>';
							records += '						</table>';
							records += '					</div>';
							records += '				</div>';
							records += '			</div>';
							records += '			<div class="btn_sub">';
							records += '				<p class="start"><a href="#" onclick="fn_VM0501OwnerSettingSave(this, '+i+'); return false;">저장</a></p>';
							records += '			</div>';
							records += '		</div>';
							records += '	</div>';
							/* //경영주알람 설정 아코디언*/

							/* 알람 중지 설정 아코디언 */
							let periodIndex = -1
							let daysIndex = -1
							if(frigeStatList.pauseList){
								periodIndex = frigeStatList.pauseList.findIndex( item => item.pauseType === 'period');
								daysIndex = frigeStatList.pauseList.findIndex( item => item.pauseType === 'days');
							}
							// 중지 알람 설정이 하나라도 있으면 아코디언 open
							if(periodIndex + daysIndex > -2){
								records += '	<div class="alarm_control open">';
							}else{
								records += '	<div class="alarm_control">';
							}
							// 알람 재시작 일시 지정
							if(periodIndex > -1){
								records += '		<em class="restart_time">알람 재시작</em>';
								records += '		<input type="hidden" id="pauseValueData" value="'+frigeStatList.pauseList[periodIndex].pauseValue+'"/>';
								records += '		<div class="setting_area">';

								records += '			<div class="btn_sub">';
								records += '				<p class="pauseStart">정지 시작일</p>';
								records += '				<p class="pauseEnd">정지 종료일</p>';
								records += '			</div>';

								records += fnPeriodSelectArea(frigeStatList.pauseList[periodIndex]);

								records += '			<div class="btn_sub">';
								records += '				<a href="#" class="pausePlus" id="extend180" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+180일</a>';
								records += '				<a href="#" class="pausePlus" id="extend30" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+30일</a>';
								records += '				<a href="#" class="pausePlus" id="extend7" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+7일</a>';
								records += '				<a href="#" class="pausePlus" id="extend1" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+1일</a>';
								records += '				<a href="#" class="pausePlus" onclick="fn_VM0501PauseDayReset(\'' + i + '\',this); return false;">초기화</a>';
								records += '			</div>';

								records += 	fnPeriodDetail(frigeStatList.pauseList[periodIndex]);

								records += '			<div class="btn_sub">';
								records += '				<p class="extend"><a href="#" onclick="fn_VM0501PauseAlarm(\'' + i + '\',this); return false;">연장</a></p>';
								records += '				<p class="end"><a href="#" onclick="fn_VM0501PauseEnd(\'' + i + '\',this); return false;">종료</a></p>';
								records += '			</div>';
								records += '		</div>';
							}else{
								records += '		<em class="restart_time">알람 일시정지 기간 설정(현재 ~ 설정일)</em>';

								records += '		<div class="setting_area">';
								records += '			<div class="btn_sub">';
								records += '				<p class="pauseStart">정지 시작일</p>';
								records += '				<p class="pauseEnd">정지 종료일</p>';
								records += '			</div>';

								records += fnPeriodSelectArea();

								records += '			<div class="btn_sub">';
								records += '				<a href="#" class="pausePlus" id="extend180" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+180일</a>';
								records += '				<a href="#" class="pausePlus" id="extend30" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+30일</a>';
								records += '				<a href="#" class="pausePlus" id="extend7" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+7일</a>';
								records += '				<a href="#" class="pausePlus" id="extend1" onclick="fn_VM0501PauseDayExtend(\'' + i + '\',this); return false;">+1일</a>';
								records += '				<a href="#" class="pausePlus" onclick="fn_VM0501PauseDayReset(\'' + i + '\',this); return false;">초기화</a>';
								records += '			</div>';

								records += '		</div>';

								records += '		<div class="setting_area">';

								records += '			<div class="btn_sub">';
								records += '				<p class="start"><a href="#" onclick="fn_VM0501PauseAlarm(\'' + i + '\',this); return false;">중지시작</a></p>';
								records += '			</div>';
								records += '		</div>';
							}
							// 알람 중지 설정
							if(daysIndex > -1){
								records += '		<em class="restart_time">알람 중지 시간 설정</em>';
								records += '		<div class="setting_area">';

								records += fnDaysSelectArea(i, frigeStatList.pauseList[daysIndex]);

								records += '			<div class="btn_sub">';
								records += '				<p class="extend"><a href="#" onclick="fn_VM0501PauseAlarmSetting(\'' + i + '\',this); return false;">변경</a></p>';
								records += '				<p class="end"><a href="#" onclick="fn_VM0501PauseAlarmSettingEnd(\'' + i + '\',this); return false;">종료</a></p>';
								records += '			</div>';
								records += '		</div>';
							}else{
								records += '		<em class="restart_time">알람 중지 시간 설정</em>';
								records += '		<div class="setting_area">';
								records += fnDaysSelectArea(i);
								records += '			<div class="btn_sub">';
								records += '				<p class="start"><a href="#" onclick="fn_VM0501PauseAlarmSetting(\'' + i + '\',this); return false;">중지설정</a></p>';
								records += '			</div>';
								records += '		</div>';
							}
							records += '	</div>';
							/*//알람 중지 설정 역역 */

							records += '</li>';
						});
				} else {
					records += '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
				}
				$("#condition_list").html(records);
				for(let s=0;s<frigeStatList.length;s++){
					if(frigeStatList[s].saveYn=='Y'){
						$("#useYn"+s).prop('checked', 'checked');
					}
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 정지 일수 증가
function fn_VM0501PauseDayExtend(idx, ele) {

	let findEle = $(ele).parents("div").parents(".setting_area").find(".form_row").find(".inputBox").find("#yyyymmdd2");
	let days = $(ele).attr("id").substring(6);
	let date = new Date(findEle.val());

	// 날짜 추가
	date.setDate(date.getDate() + parseInt(days));

	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const end = year + '-' + month + '-' + day;

	$(findEle).attr('value', end);
}

// 날짜 초기화
function fn_VM0501PauseDayReset(idx, ele) {

	// 종료일 시간 데이터 가져오기
	let findEle = $(ele).parents("div").parents(".setting_area").find(".form_row").find(".inputBox").find("#yyyymmdd2");
	let yyyymmdd2 = $('#yyyymmdd2').val();
	let yyyymmdd1 = $('#yyyymmdd1').val();

	let date = new Date();
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const today = year + '-' + month + '-' + day;


	// 정지 설정이 된 상태
	if($('.pauseStatus').length > 0) {
		var pauseText = $('#pauseValueData').val();
		pauseText = pauseText.split(',');
		$(findEle).attr('value', pauseText[1]);

		// 정지 설정이 안된 상태
	} else {
		$(findEle).attr('value', today);
	}
}

// 정지 시작일, 정지 종료일 설정
function fnPeriodSelectArea(item){
	var yyyymmdd1, yyyymmdd2 = '';
	if(item){
		// 미리 설정되어있는 값을 DB에서 조회
		yyyymmdd1 	= item.pauseValue.substr(0,10);
		yyyymmdd2 	= item.pauseValue.substr(11,10);
	} else {
		// 알람 중지 설정이 안되어있으면 현재 날짜가 기본으로 설정된다
		const date = new Date();
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const today = year + '-' + month + '-' + day;

		yyyymmdd1 = today;
		yyyymmdd2 = today;
	};

	let records = '';
	records += '			<div class="form_row">';
	records += '				<div class="inputBox" style="display: flex; justify-content: space-between">';
	records += '					<input type="date" id="yyyymmdd1" style="width: 48%; text-align: center" value="'+yyyymmdd1+'" />';
	records += '					<input type="date" id="yyyymmdd2" style="width: 48%; text-align: center" value="'+yyyymmdd2+'" />';
	records += '				</div>';
	records += '			</div>';

	return records;
}


// 알람 중지 설정
function fnDaysSelectArea(i, item){
	var startHH, startMin, endHH, endMin = '';
	if(item){
		startHH 	= item.pauseValue.substr(0,2);
		startMin 	= item.pauseValue.substr(2,2);
		endHH 		= item.pauseValue.substr(5,2);
		endMin 		= item.pauseValue.substr(7,2);
	}

	var days = [
		{value:'0', label:'월'},
		{value:'1', label:'화'},
		{value:'2', label:'수'},
		{value:'3', label:'목'},
		{value:'4', label:'금'},
		{value:'5', label:'토'},
		{value:'6', label:'일'}
	];

	let records = '';
	records += '			<div class="form_row">';
	records += '				<div class="inputBox">';
	// 알람 중지 요일 checkbox
	records += '					<div class="devicecheckboxList">';
	days.forEach( (day, index) => {
		records += '<input type="checkbox" id="days_'+i+'_'+index+'" value="'+day.value+'"';
		// 설정된 요일 checked
		if(item && item.pauseDays.indexOf(index) > -1){
			records += 'checked';
		}
		records += '/> <label for="days_'+i+'_'+index+'" >'+day.label+' </label>';
	})
	records += '					</div>';
	// 알람 중지 시간
	records += '					<select id="startHH" style="float:left;margin:0 3px;width:calc( (100% * 0.25) - 8px );">';
	for(var j=0; j<=23; j++){
		if(j<10) j = '0'+j;
		if(startHH == j){
			records += '						<option value='+j+' selected>'+j+'</option>';
		}else{
			records += '						<option value='+j+'>'+j+'</option>';
		}
	}
	records += '					</select>';
	records += '					<select id="startMin" style="float:left;width:calc( (100% * 0.25) - 8px );">';
	for(var j=0; j<=59; j++){
		if(j<10) j = '0'+j;
		if(startMin == j){
			records += '						<option value='+j+' selected>'+j+'</option>';
		}else{
			records += '						<option value='+j+'>'+j+'</option>';
		}
	}
	records += '					</select>';
	records += '					<span style="float:left;margin:0 3px;" >&#126;</span>';
	records += '					<select id="endHH" style="float:left;margin:0 3px;width:calc( (100% * 0.25) - 8px );">';
	for(var j=0; j<=23; j++){
		if(j<10) j = '0'+j;
		if(endHH == j){
			records += '						<option value='+j+' selected>'+j+'</option>';
		}else{
			records += '						<option value='+j+'>'+j+'</option>';
		}
	}
	records += '					</select>';
	records += '					<select id="endMin" style="float:left;width:calc( (100% * 0.25) - 8px );">';
	for(var j=0; j<=59; j++){
		if(j<10) j = '0'+j;
		if(endMin == j){
			records += '						<option value='+j+' selected>'+j+'</option>';
		}else{
			records += '						<option value='+j+'>'+j+'</option>';
		}
	}
	records += '					</select>';

	records += '				</div>';
	records += '			</div>';

	return records;
}

function fnIccSelectChangeEvent(_this, strCd, temonId, portNo, temonType, deviceLoc){
	var param = new Object;
	param.deviceLoc = deviceLoc.substr(0,deviceLoc.indexOf('(') != -1 ? deviceLoc.indexOf('(') : deviceLoc.length ) + "(" + $(_this).val() + ")";
	param.strCd = strCd;
	param.temonId = temonId;
	param.portNo = portNo;
	param.temonType = temonType;

	$.ajax({
		type : 'POST',
		dataType:"JSON",
		data:JSON.stringify(param),
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		url:"/VM0501SaveIccLoc",
		contentType : "application/json; charset=UTF-8",
		success:function(resultJson){
			if(resultJson.success){
				fn_VM0501refresh();
				alert("(저장성공)저장이 완료됐습니다.");
			}else{
				alert("(저장실패)다시 시도해주세요.");
			}
		},
		error:function() {
			alert("(저장실패)다시 시도해주세요.");
		}
	})
}

// 그래프 페이지 이동
function fn_VM0501popupGraph(idx) {
	var paramDataset = new Object();
	paramDataset.strCd		= returnJSONData[idx].strCd;
	paramDataset.moduleId	= returnJSONData[idx].moduleId;		// ID
	paramDataset.portNo		= returnJSONData[idx].portNo;		// 포트번호
	paramDataset.temonType	= returnJSONData[idx].temonType;	// SEMS 장비 종류
	paramDataset.deviceType	= returnJSONData[idx].deviceType;	// 설비 종류
	paramDataset.moduleNm	= returnJSONData[idx].moduleNm;		// SEMS장비/캐리어허브
	paramDataset.deviceLoc	= returnJSONData[idx].deviceLoc;	// 설비종류
	paramDataset.contents	= returnJSONData[idx].contents;		// 설비명

	/* 차트를 요청하는 화면  */
	paramDataset.fromView = "VM0501";

	var paramJson = JSON.stringify(paramDataset);

	$("#paramData").val(paramJson);

	var form = document.form;
	form.action = "/CM0501";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

// 현재 진행상황 표시
function fnPeriodDetail(item) {

	var yyyymmdd1, yyyymmdd2 = '';

	// 미리 설정되어있는 값을 DB에서 조회
	yyyymmdd1 	= item.pauseValue.substr(0,10);
	yyyymmdd2 	= item.pauseValue.substr(11,10);

	let date1 = new Date(yyyymmdd1);
	let date2 = new Date(yyyymmdd2);
	let now = new Date();

	// 현재 진행중인 일수
	let diffDate1 = now.getTime() - date1.getTime();
	diffDate1 = Math.ceil((diffDate1 / (1000 * 60 * 60 * 24)));


	// 남은 일수
	let diffDate2 = null;

	if (now < date1) {
		diffDate2 = date2.getTime() - date1.getTime();
	} else {
		diffDate2 = date2.getTime() - now.getTime();
	}

	diffDate2 = Math.ceil((diffDate2 / (1000 * 60 * 60 * 24)));

	if (diffDate1 <= 0) {
		diffDate1 = '0';
	}

	let records = '';

	records += '<div class="btn_sub">';
	records += '	<p class="pauseStatus" style="width: 100%; border: #95a8b3 1px solid; background-color: #cbc5c5;">' + '현재 ' +diffDate1+'일째 진행중 / ' + diffDate2 + '일 남음'  + '</p>';
	records += '</div>';

	return records;
}

// 장비 일시정지 시간 업데이트
function fn_VM0501PauseAlarm(idx, ele){
	let findEle = $(ele).parents("li").find(".setting_area");

	let yyyymmdd1 = findEle.find("#yyyymmdd1").val();
	let yyyymmdd2 = findEle.find("#yyyymmdd2").val();

	if(!yyyymmdd1 && !yyyymmdd2){
		alert('날짜를 지정해주세요.');
		return;
	}

	if(yyyymmdd1 > yyyymmdd2) {
		alert('종료일이 시작일보다 이전일 수 없습니다.');
		return;
	}

	let now = new Date();

	const year = now.getFullYear();
	const month = ('0' + (now.getMonth() + 1)).slice(-2);
	const day = ('0' + now.getDate()).slice(-2);
	const today = year + '-' + month + '-' + day;

	if (yyyymmdd1 < today) {
		alert('시작일이 현재시간보다 이전일 수 없습니다.');
		return;
	}

	let date2 = new Date(yyyymmdd1);
	let date3 = new Date(yyyymmdd2);

	let diffDays = date2.getTime() - date3.getTime();
	diffDays = Math.abs(diffDays / (1000 * 60 * 60 * 24));

	if (diffDays > 365) {
		alert('기간은 최대 1년까지 설정 가능합니다.');
		return;
	}

	let pauseDttm = findEle.find("#yyyymmdd1").val() +","+ findEle.find("#yyyymmdd2").val();

	var paramDataset = {
		"strCd" : returnJSONData[idx].strCd,
		"moduleId" : returnJSONData[idx].moduleId,
		"portNo" : returnJSONData[idx].portNo,
		"temonType" : returnJSONData[idx].temonType,
		"pauseType" : 'period',
		"pauseDays"	: '0,1,2,3,4,5,6',		// 모든 요일 중지
		"pauseYn"	: 'Y',
		"pauseDttm" : pauseDttm
	}
	fn_VM0501PauseAjax(paramDataset);
}

// 장비 일시정지 종료
function fn_VM0501PauseEnd(idx, ele){
	var findEle = $(ele).parents("li").find(".setting_area");
	var pauseDttm = findEle.find("#yyyymmdd").val() +" "+ findEle.find("#hh").val() +":"+ findEle.find("#min").val();

	var paramDataset = {
		"strCd" : returnJSONData[idx].strCd,
		"moduleId" : returnJSONData[idx].moduleId,
		"portNo" : returnJSONData[idx].portNo,
		"temonType" : returnJSONData[idx].temonType,
		"pauseDays"	: '0,1,2,3,4,5,6',
		"pauseType" : 'period',
		"pauseYn"	: 'N',
	};

	fn_VM0501PauseAjax(paramDataset);
}

//장비 알람 중지 설정
function fn_VM0501PauseAlarmSetting(idx, ele){
	var findEle = $(ele).parents("li").find(".setting_area");

	// 요일
	var pauseDays = [];
	findEle.find('input:checkbox[id^=days_]').each(function(){
		if($(this).is(":checked")){
			pauseDays.push($(this).val());
		}
	});
	if(pauseDays.length === 0){
		alert('요일을 선택해주세요.');
		return;
	}

	// 시간
	var startDttm = findEle.find("#startHH").val() + findEle.find("#startMin").val();
	var endDttm = findEle.find("#endHH").val() + findEle.find("#endMin").val();
	if(startDttm === endDttm){
		alert('시작시간과 종료시간을 다르게 설정해주세요.')
		return;
	}

	var paramDataset = {
		"strCd" 	: returnJSONData[idx].strCd,
		"moduleId" 	: returnJSONData[idx].moduleId,
		"portNo" 	: returnJSONData[idx].portNo,
		"temonType" : returnJSONData[idx].temonType,
		"pauseType" : 'days',
		"pauseDays" : pauseDays.join(','),
		"pauseYn"	: 'Y',
		"pauseDttm" : startDttm+","+endDttm
	}
	fn_VM0501PauseAjax(paramDataset);
}

//장비 알람 중지 종료
function fn_VM0501PauseAlarmSettingEnd(idx, ele){
	var findEle = $(ele).parents("li").find(".setting_area");
	var pauseDttm = findEle.find("#startHH").val() + findEle.find("#startMin").val() + "," + findEle.find("#endHH").val() + findEle.find("#endMin").val();

	// 선택한 요일
	var pauseDays = [];
	findEle.find('input:checkbox[id^=days_]').each(function(){
		if($(this).is(":checked")){
			pauseDays.push($(this).val());
		}
	});

	var paramDataset = {
		"strCd" 	: returnJSONData[idx].strCd,
		"moduleId" 	: returnJSONData[idx].moduleId,
		"portNo" 	: returnJSONData[idx].portNo,
		"temonType" : returnJSONData[idx].temonType,
		"pauseType" : 'days',
		"pauseDays" : pauseDays.join(','),
		"pauseYn"	: 'N',
		"pauseDttm" : pauseDttm
	}
	fn_VM0501PauseAjax(paramDataset);
}

function fn_VM0501PauseAjax(paramDataset){
	$.ajax({
		type : 'POST',
		dataType:"JSON",
		data:JSON.stringify(paramDataset),
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url:"/VM0501PauseAlarm",
		success:function(resultJson){
			if(resultJson.success){
				fn_VM0501refresh();
				alert("(저장성공)저장이 완료됐습니다.");
			}else{
				alert("(저장실패)다시 시도해주세요.");
			}
		},
		error:function() {
			alert("(저장실패)다시 시도해주세요.");
		}
	});
}

function fn_VM0501retrieveDeviceCode(){
	$.ajax({
		url:'/VM0501retrieveDeviceCd',
//		data:param,
		async:false,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success:function(response){
			frigeList = response.items;
		}
	})
}

function fn_VM0501OwnerSettingSave(ele, idx){
	var findEle = $(ele).parents("li").find(".setting_area");
	var param = new Object();
	param.strCd 		= returnJSONData[idx].strCd;
	param.temonId		= returnJSONData[idx].moduleId;
	param.portNo		= returnJSONData[idx].portNo;
	param.temonType		= returnJSONData[idx].temonType;
	param.maxTemp 		= findEle.find("#maxTempOwner").val();
	param.minTemp 		= findEle.find("#minTempOwner").val();
	param.delayTime 	= findEle.find("#delayTimeOwner").val();
	param.pushTerm 		= findEle.find("#pushTermOwner").val();
	
	if(param.temonType=='B'){
		param.maxTemp = param.maxTemp*10;
		param.minTemp = param.minTemp*10;
	}
	if(findEle.find("#useYn"+idx).prop('checked')){
		param.useYn = 'Y';
	}else{
		param.useYn = 'N';
	}
	
	if(param.maxTemp < 0 ){
		alert("상한온도는 0보다  큰 수를 입력해주세요.");
		findEle.find("#maxTempOwner").focus();
		return;
	}else{
		param.maxTemp = param.maxTemp;
	}

	if(param.minTemp < 0 ){
		alert("하한온도는 0보다 작은 수를 입력해주세요.");
		findEle.find("#minTempOwner").focus();
		return;
	}else{
		param.minTemp = '-'+param.minTemp;
	}

	if(param.delayTime < 0 ){
		alert("감지주기는  0보다 큰 수를 입력해주세요.");
		findEle.find("#delayTimeOwner").focus();
		return;
	}else{
		param.delayTime = param.delayTime;
	}

	if(param.pushTerm < 0){
		alert("알람주기는  0보다 큰 수를 입력해주세요.");
		findEle.find("#pushTermOwner").focus();
		return;
	}else{
		param.pushTerm = param.pushTerm;
	}

	$.ajax({
		type : 'POST',
		dataType:"JSON",
		data:JSON.stringify(param),
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url:"/VM0501SaveOwnerPushSetting",
		success:function(resultJson){
			if(resultJson.success){
				fn_VM0501refresh();
				alert("(저장성공)저장이 완료됐습니다.");
			}else{
				alert("(저장실패)다시 시도해주세요.");
			}
		},
		error:function() {
			alert("(저장실패)다시 시도해주세요.");
		}
	});
}

function fn_VM0501frigeSettingSave(ele, idx){
	var findEle = $(ele).parents("li").find(".setting_area");
	var param = new Object();
	param.strCd 		= returnJSONData[idx].strCd;
	param.moduleId		= returnJSONData[idx].moduleId;
	param.portNo		= returnJSONData[idx].portNo;
	param.temonType		= returnJSONData[idx].temonType;
	param.deviceType 	= findEle.find("#deviceType").val();
	param.deviceTypeLog	= returnJSONData[idx].deviceType;
	param.deviceCode 	= findEle.find("#deviceType > option:selected").attr('value2');
	param.deviceCodeLog	= returnJSONData[idx].deviceCode;
	param.deviceLoc 	= findEle.find("#deviceLoc").val();
	param.deviceLocLog	= returnJSONData[idx].deviceLoc;
	param.maxTemp 		= findEle.find("#maxTemp").val();
	param.maxTempLog	= returnJSONData[idx].maxTemp;
	param.minTemp 		= findEle.find("#minTemp").val();
	param.minTempLog	= returnJSONData[idx].minTemp;
	param.delayTime 	= findEle.find("#delayTime").val();
	param.delayTimeLog	= returnJSONData[idx].delayTime;
	param.pushTerm 		= findEle.find("#pushTerm").val();
	param.pushTermLog	= returnJSONData[idx].pushTerm;
	
	if(param.maxTemp > 50 || param.maxTemp < -50){
		alert("상한온도는 50보다 작거나 -50보다 큰 수를 입력해주세요.");
		findEle.find("#maxTemp").focus();
		return;
	}

	if(param.minTemp > 50 || param.minTemp < -50){
		alert("하한온도는 50보다 작거나 -50보다 큰 수를 입력해주세요.");
		findEle.find("#minTemp").focus();
		return;
	}

	if(param.delayTime > 180 || param.delayTime < 0){
		alert("감지주기는 180보다 작고 0보다 큰 수를 입력해주세요.");
		findEle.find("#delayTime").focus();
		return;
	}

	if(param.pushTerm > 360 || param.pushTerm < 0){
		alert("알람주기는 360보다 작고 0보다 큰 수를 입력해주세요.");
		findEle.find("#pushTerm").focus();
		return;
	}

	$.ajax({
		type : 'POST',
		dataType:"JSON",
		data:JSON.stringify(param),
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url:"/VM0501frigeSetting",
		success:function(resultJson){
			if(resultJson.success){
				fn_VM0501refresh();
				alert("(저장성공)저장이 완료됐습니다.");
			}else{
				alert("(저장실패)다시 시도해주세요.");
			}
		},
		error:function() {
			alert("(저장실패)다시 시도해주세요.");
		}
	});
}

function checkFreezer(ele, i){
	var findEle 	= $(ele).parents("li").find(".setting_area");
	let deviceType 	= findEle.find("#deviceType > option:selected").attr('value2');
	switch(deviceType){
		case "ICC":
		case "ICC_C":
		case "ICC_F":
		case "ICC_OF":
		case "RIF":
			findEle.find("#pushTerm").val("60");
			break;
		case "OSC":
		case "RIC":
		case "WIC":
			findEle.find("#pushTerm").val("180");
			break;
	}
}
