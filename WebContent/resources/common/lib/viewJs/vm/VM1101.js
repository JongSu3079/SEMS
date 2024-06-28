// 전역변수 
var returnJSONData = null;

// 스크립트 시작 
window.onpageshow = function(event) {
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// 설치업체, 맥 정보, 점포코드 가져오기
	fn_VM1101Info();
	
	// 게이트웨이 재시작/재인증 초기 세팅
	if(!fn_VM1101checkOnload()) {
		$('.tgBtn').removeClass('on');
		$('.tgBtn').addClass('disabled');
	}
	
	// 알람 설정 세팅
	alarmSetting();
	
	
	$('#viewLoadingDiv').fadeOut();
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
function fn_VM1101refresh() {
	// 로딩 바 표시
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	// 설치업체, 맥 정보, 점포코드 가져오기
	fn_VM1101Info();
}

// 설치업체, 맥 정보, 점포코드 가져오기
function fn_VM1101Info(){
	var strInfo = {
		srcStrCd: $('#hStrCd').val()
	}
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(strInfo),
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM1101Info',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var items = returnJSON.items;
				var data = returnJSON.data;
				var html = '';
				html += '<option value="">선택</option>';
				for( var i=0; i<items.length; i++ ){
					var isSelected = items[i].value == data.currentEelcVendor ? 'selected' : '';
					html += '<option value="' + items[i].value + '" ' + isSelected + '>' + items[i].name +'</option>';
				}
				$('#hElecVendor').val( data.currentEelcVendor );
				$('#srcElec').html( html );
				
				$("#gwAddr").val(data.currentGwAddr);
				$("#hViewStrCd").val(data.currentViewStrcd);
				$("#srcViewStrCd").val(data.currentViewStrcd);
			}
		}
	});
}

// 설치 업체 저장
function fn_saveElecVendor(){
	if( $('#hStrCd').val() == ''){
		alert('점포조회를 통해 점포를 선택해주세요.');
		return;
	}
	if( $('#srcElec').val() == ''){
		alert('설치업체를 선택해주세요.');
		return;
	}
	if( $('#srcElec').val() == $('#hElecVendor').val()){
		alert('변경하려는 설치업체가 현재 설치업체와 동일합니다.\n설치업체를 다시 확인해주세요.');
		return;
	}
	
	var confirmFlag = confirm('[' + $('#hStrNm').val() + '] 점포의 설치업체를 [' + $('#srcElec option[value="' + $('#hElecVendor').val() + '"]').text() + ']에서 '
							+ '[' + $('#srcElec option:selected').text() + '](으)로 바꾸시겠습니까?');
	if(!confirmFlag)
		return false;
	
	// 파라미터
	var elecVendor = {
		srcStrCd: $('#hStrCd').val(),
		srcPrevElecVendor: $('#hElecVendor').val(),
		srcElecVendor: $('#srcElec').val()
	}
	
	// 저장
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(elecVendor),
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM1101SaveElecVendor',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			fn_VM1101refresh();
		}
	});
}

function fn_saveViewStrCd() {
	if( $('#hStrCd').val() == ''){
		alert('점포조회를 통해 점포를 선택해주세요.');
		return;
	}
	if( $('#srcElec').val() == ''){
		alert('점포코드를 확인해주세요.');
		return;
	}
	if( $('#srcViewStrCd').val() == $('#hViewStrCd').val()){
		alert('변경하려는 점포코드가 현재 점포코드와 동일합니다.\n점포코드를 다시 확인해주세요.');
		return;
	}
	
	var confirmFlag = confirm('[' + $('#hStrNm').val() + '] 점포의 점포코드를 [' + $('#hViewStrCd').val() + ']에서 '
							+ '[' + $('#srcViewStrCd').val() + '](으)로 바꾸시겠습니까?');
	if(!confirmFlag)
		return false;
	
	// 파라미터
	var viewStrCd = {
		srcStrCd: $('#hStrCd').val(),
		srcPrevViewStrCd: $('#hViewStrCd').val(),
		srcViewStrCd: $('#srcViewStrCd').val()
	}
	
	// 저장
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(viewStrCd),
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM1101SaveViewStrCd',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			fn_VM1101refresh();
		}
	});
}

// 게이트웨이 재시작
function fn_VM1101restartGW() {
	var confirmFlag = confirm('[' + $('#hStrNm').val() + '] 점포의 게이트웨이를 재시작하시겠습니까?');
	if(!confirmFlag)
		return false;
	
	var paramInfo = {
		"strCd" : $('#hStrCd').val()
	}
	
	$.ajax({
		type : 'POST',
		url : '/VM1101Restart',
		data : JSON.stringify(paramInfo),
		dataType : 'JSON',
		async : false,
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert(returnJSON.msg);
			} else {
				alert(returnJSON.msg);
				console.log("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 게이트웨이 재인증
function fn_VM1101reauthGW() {
	var confirmFlag = confirm('[' + $('#hStrNm').val() + '] 점포의 게이트웨이를 재인증하시겠습니까?');
	if(!confirmFlag)
		return false;
	
	var paramInfo = {
		"strCd" : $('#hStrCd').val()
	}
	
	$.ajax({
		type : 'POST',
		url : '/VM1101Reauth',
		data : JSON.stringify(paramInfo),
		dataType : 'JSON',
		async : false,
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert(returnJSON.msg);
			} else {
				alert(returnJSON.msg);
				console.log("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

function fn_VM1101checkOnload(){
	var value = $('#hStrCd').val();
	var flag = true;
	if( value == null || value == "" || value == undefined ){
		$('#viewLoadingDiv').fadeOut();
		flag = false;
	}
	return flag
}

//맥주소로 점포 검색
$('#searchStr').on('click',function() {
	if($("#gwAddr").val() == '' || $("#gwAddr").val() == '000000000000') {
		alert('맥주소를 확인해주세요');
		return;
	}
	
	$("#gwStrNm").val('');
	$("#gwStrCd").val('');
	
	var paramInfo = {
		"gwAddr" : $('#gwAddr').val()
	}
	
	$.ajax({
		type:'POST',
		dataType:'JSON',
		data:JSON.stringify(paramInfo),
		beforSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url:'/VM1101SearchGwAddr',
		error : function() {
			alert("(오류발생)개발팀에 문의해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var data = returnJSON.data.strInfo;
				$("#gwStrNm").val(data.strNm + " (" + data.useYn + ", " + data.operStat + ")");
				$("#gwStrCd").val(data.strCd);
			} else {
				alert("등록된 정보가 없습니다.");
			}
		}
	});
});

// 맥주소 초기화
function fn_VM1101ResetGwAddr(){
	
	if( $("#gwStrNm").val() == '' ){
		alert("맥주소 검색을 통해 점포를 검색해주세요");
		return;
	}
	
	var resetStrInfo = {
			"gwStrNm" 	: $("#gwStrNm").val(),
			"gwStrCd" 	: $("#gwStrCd").val(),
			"gwAddr"	: $("#gwAddr").val()
	};
	
	$.ajax({
		type:'POST',
		dataType:'JSON',
		data:JSON.stringify(resetStrInfo),
		beforSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url:'/VM1101ResetGwAddr',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if(returnJSON.success){
				$("#gwStrNm").val('');
				$("#gwStrCd").val('');
				alert("초기화에 성공했습니다");
			}else{
				alert("(초기화 실패)다시 시도해주세요");
			}
		}
	});
}

// 알람설정
function alarmSetting(){

	//기간중지 날짜 설정
	var yyyymmdd = '';
	const date = new Date();
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const today = year + '-' + month + '-' + day;

	$("#yyyymmdd1").val(today);
	$("#yyyymmdd2").val(today);
	
	// 요일/시간 중지
	let records='';
	records += '<div class="inputBox">';
	records += '	<div class="devicecheckboxList">';
	let days = ['월', '화', '수', '목', '금', '토', '일'];
	for(let d=0;d<7;d++){
		records += '<input type="checkbox" id="days_0_'+d+'" value="'+d+'"> ';
		records +='<label for="days_0_'+d+'">'+days[d]+' </label>';
	}
	records += '</div>';	
	records += '<select id="startHH" style="float:left;margin:0 3px;width:calc( (100% * 0.25) - 8px );">';
	for(let hh=0;hh<24;hh++){
		records += '<option value="'+hh.toString().padStart(2, '0')+'">'+hh.toString().padStart(2, '0')+'</option>	';
	}
	records += '</select>';
	records += '<select id="startMin" style="float:left;width:calc( (100% * 0.25) - 8px );">	';
	for(let mm = 0 ;mm<60;mm++){
		records += '<option value="'+mm.toString().padStart(2, '0')+'">'+mm.toString().padStart(2, '0')+'</option>	';
	}
	records += '</select>';
	records += '<span style="float:left;margin:0 3px;">~</span>';	
	records += '<select id="endHH" style="float:left;margin:0 3px;width:calc( (100% * 0.25) - 8px );">	';
	for(let hh=0;hh<24;hh++){
		records += '<option value="'+hh.toString().padStart(2, '0')+'">'+hh.toString().padStart(2, '0')+'</option>	';
	}
	records += '</select>';
	records += '<select id="endMin" style="float:left;width:calc( (100% * 0.25) - 8px );">';
	for(let mm = 0 ;mm<60;mm++){
		records += '<option value="'+mm.toString().padStart(2, '0')+'">'+mm.toString().padStart(2, '0')+'</option>	';
	}
	records += '</select>';
	records += '</div>';
	$("#selectPause").html(records);
}


//정지 일수 증가
function fn_VM1101PauseDayExtend(ele) {

	let findEle = $("#yyyymmdd2");
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

//날짜 초기화
function fn_VM1101PauseDayReset(ele) {

	// 종료일 시간 데이터 가져오기
	let findEle = $("#yyyymmdd2");
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

//장비 일시정지 시간 업데이트
function fn_VM1101PauseAlarm( ele){
	var strCd = $('#hStrCd').val();
	if(strCd == null || strCd == ''){
		alert('점포조회를 통해 점포를 선택해주세요.');
		return;
	}
	let findEle = $(".setting_area");

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
		"strCd" : strCd,
		"pauseType" : 'period',
		"pauseDays"	: '0,1,2,3,4,5,6',		// 모든 요일 중지
		"pauseYn"	: 'Y',
		"pauseDttm" : pauseDttm
	}
	fn_VM1101PauseAjax(paramDataset);
}

//장비 일시정지 종료
function fn_VM1101PauseEnd(ele){
	var findEle = $(".setting_area");
	var pauseDttm = findEle.find("#yyyymmdd").val() +" "+ findEle.find("#hh").val() +":"+ findEle.find("#min").val();
	var strCd = $('#hStrCd').val();
	var paramDataset = {
		"strCd" : strCd,
		"pauseDays"	: '0,1,2,3,4,5,6',
		"pauseType" : 'period',
		"pauseYn"	: 'N',
	};

	fn_VM1101PauseAjax(paramDataset);
}

//장비 알람 중지 설정
function fn_VM1101PauseAlarmSetting(ele){
	var findEle = $(".setting_area");

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
	var strCd = $('#hStrCd').val();
	var paramDataset = {
		"strCd" 	: strCd,
		"pauseType" : 'days',
		"pauseDays" : pauseDays.join(','),
		"pauseYn"	: 'Y',
		"pauseDttm" : startDttm+","+endDttm
	}
	fn_VM1101PauseAjax(paramDataset);
}

//장비 알람 중지 종료
function fn_VM1101PauseAlarmSettingEnd(ele){
	var findEle = $(".setting_area");
	var pauseDttm = findEle.find("#startHH").val() + findEle.find("#startMin").val() + "," + findEle.find("#endHH").val() + findEle.find("#endMin").val();

	// 선택한 요일
	var pauseDays = [];
	findEle.find('input:checkbox[id^=days_]').each(function(){
		if($(this).is(":checked")){
			pauseDays.push($(this).val());
		}
	});
	var strCd = $('#hStrCd').val();
	var paramDataset = {
		"strCd" 	: strCd,
		"pauseType" : 'days',
		"pauseDays" : pauseDays.join(','),
		"pauseYn"	: 'N',
		"pauseDttm" : pauseDttm
	}
	fn_VM1101PauseAjax(paramDataset);
}

function fn_VM1101PauseAjax(paramDataset){
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
		url:"/VM1101PauseAlarm",
		success:function(resultJson){
			if(resultJson.success){
				fn_VM1101refresh();
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

function removeOpen(){
	$("#alarm_ctrl").removeClass("open");
}