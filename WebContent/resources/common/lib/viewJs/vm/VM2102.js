let errorTypeList = [];		// 장애유형 list
let partList = {};			// 부품 array
let partItems = {};			// 부품 item( 초성검색 전용 )
let signature;
var initFlag = false;

$(function(){
	$("#target").off();
	$("#target").change(function(){
		if($(this).val() == 'maker'){
			$("#maker").show();
			
			// 검색 대상 변경 무상 부품
			$( "#searchBox" ).autocomplete({
				source: partItems.free
			});
		}else{
			$("#maker").hide();
			
			// 검색 대상 변경 유상 부품
			$( "#searchBox" ).autocomplete({
				source: partItems.paid
			});
		}
	})

	$("#cancel_popup").popup();
	
	// 담당기사 목록 조회
	fn_VM2102RetrieveVendorUserList($('#vendorCd').val());
	
	// 장애유형 조회
	fn_VM2102RetrieveErrorType();
	// 파라미터 setting
	fn_VM2102SetParamData();
	// tabCd에 따라 보여지는 form setting
	fn_VM2102SetForm();
	// 담당기사 정보 세팅
	fn_VM2102RetriveVendorUser();
	
	// Android/iOS OS 별 file 기본 동작 처리
	setOSDefault();

	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

// 장애유형 조회
function fn_VM2102RetrieveErrorType(){
	$.ajax({
		url:'/VM2102RetrieveErrorType',
		async:false,
		success:function(response){
			errorTypeList = response.items;
			
			fn_VM2102SetErrorTypeOptions('1', errorTypeList);
		}
	})
}

function fn_VM2102SetErrorTypeOptions(depth, array, code) {
	let el = $("#errorType_" + depth);
	let elIdArr = ($(el).attr('id')).split('_');
	
	let html = '';
	html += '<option value="">선택</option>';
	if(Array.isArray(array)){
		array.forEach( item => {
			html += '<option value="'+item.code+'"';
			if(item.emergencyLevel){
				html += 'level="'+item.emergencyLevel+'"' ;
			}
			html += '>'+item.contents+'</option>';
		});
	}
	$(el).html(html);
	
	$(el).off();
	$(el).change(function(){
		$(this).nextAll().remove();	// 변경한 select의 하위 뎁스 select 삭제
		
		let index = array.findIndex( item => $(this).val() === item.code);	// 선택한 유형의 index 찾기
		// 선택한 유형의 하위 뎁스가 있으면 select 생성
		if(index != -1 && array[index].child && array[index].child.length > 0){
			// 하위 뎁스 select 생성
			let newHtml = '';
			newHtml += '<select id="errorType_'+(Number(depth)+1)+'">';
			newHtml += '</select>';
			$(el).after(newHtml);
			fn_VM2102SetErrorTypeOptions((Number(depth)+1), array[index].child, code);
		}
		// 긴급도 변경
		if($('option:selected',this).attr('level')){
			$("#emergencyLevel").val($('option:selected',this).attr('level')).change();
		}
	})
	
	// 선택된 값이 있으면 setting
	if(code){
		let index = array.findIndex( item => code.indexOf(item.code) == 0);
		if(index != -1){
			$(el).val(array[index].code).change();
		}
	}
}

// 가공이 필요한 pageParam 데이터 setting
function fn_VM2102SetParamData(){
	// 접수번호
	$("#asNo").val(asNo);
	
	// 장애유형
	fn_VM2102SetErrorTypeOptions('1', errorTypeList, errorType);
	
	// 긴급도
	$("#emergencyLevel").val(emergencyLevel).change();
}

//냉장비업체 담당기사 리스트 조회
function fn_VM2102RetrieveVendorUserList(vendorCd){
	var optionsHtml = "";
	optionsHtml += "<option value=''>선택</option>";
	if(vendorCd){
		var param = new Object();
		param.vendorCd = vendorCd;
		
		$.ajax({
			url:"/VM2103RetrieveVendorUserList",
			data: param,
			async: false,
			dataType: "json",
			success:function(response){
				response.items.forEach( item => {
					if(item.userId == vendorUserId)
						optionsHtml += "<option value='"+item.userId+"' selected>"+item.userNm+"</option>";
					else
						optionsHtml += "<option value='"+item.userId+"'>"+item.userNm+"</option>";
				})
			}
		})
	}
	$("#vendorUser").html(optionsHtml);
	$("#vendorUser").change(); // 담당기사 정보() 세팅
	
	// 미확인 상태가 아닐 경우 : 담당기사 변경 불가
	if($('#tabCd').val() != 'U') {
		$("#vendorUser").hide(); // 담당기사 선택 불가
		$("#vendorUserNm").show(); // 지정된 담당기사 이름 표시
	}
}

function fn_VM2102SetForm(){
	var tabCd = $("#tabCd").val();
	if(tabCd === 'U'){
		// 미확인에서 접근
		// 확인, 기사변경, 접수취소 버튼 표시
		$("#resolveBtn, #modifyBtn").hide();
		$("#checkBtn, #changeBtn, #cancelBtn").show();
		$("#resolveSection").hide();
	}else if(tabCd === 'S'){
		// 예정에서 접근
		let vUserId=$("#vendorUserId").val();
		let nowUserId=$("#userId").val();
		//담당기사, 로그인 유저 비교		
		if(vUserId != nowUserId){
			$("#resolveBtn, #modifyBtn, #checkBtn, #cancelBtn").hide();
			$("#resolveSection").hide();
			$("#partSeachDiv").hide();
			$("#changeBtn").show();
		}else{
			// 현재 사용자와 담당기사 같으면 기사변경 버튼 hide
			$("#checkBtn, #changeBtn").hide();
			// 수정, 처리완료, 접수취소 버튼 표시
			$("#resolveBtn, #modifyBtn, #cancelBtn").show();
			$("#resolveSection").show();
			$("#imgSection").show();
			$("#partAddBtn, #partRemoveBtn").show();
			$("#partSeachDiv").show();
			fn_VM2102SetSignPad();	// 서명 항목 setting
			
			// 경영주서명거부, 전화설명 check event
			$("#ownerSignYnChk, #visitYnChk").click(function(){
				var id = $(this).attr('id');
				if(id == 'ownerSignYnChk'){
					$("#visitYnChk").attr('checked', false);	// 전화설명 체크 해제
				}else{
					$("#ownerSignYnChk").attr('checked', false);	// 경영주서명거부 체크 해제
				}
				
				// 둘 중 하나라도 체크 되있으면 sign 막기
				var ownerSignYn = $("#ownerSignYnChk").attr('checked');
				var visitYn = $("#visitYnChk").attr('checked');
				if (ownerSignYn || visitYn) {
					// pad 그리기 막기
					signature.clear();
					signature.off();
				} else {
					// pad 그리기 허용
					signature.on();
				}
			})
		}
	}else if(tabCd === 'Y'){
		// 처리완료에서 접근
		// 모든 버튼 표시X
		$("#checkBtn, #resolveBtn, #modifyBtn, #changeBtn, #cancelBtn").hide();
		$("#resolveSection").show();	// 조치내역 영역
		$("#imgSection").hide();		// 경영주 확인, 이미지 영역
		$("#partAddBtn, #partRemoveBtn").hide();		// 부품 추가, 삭제 버튼
		
		fn_VM2102RetriveResolve();	// AS 처리 데이터 조회
		
		// 처리완료된 AS건은 수정 불가
		$("#inputForm, #inputForm2").children().children(".form_row").each(function(){
			$(this).children(".inputBox").children("input").attr("readonly", true);
			$(this).children(".inputBox").children("select").attr("disabled", true);
			$(this).children(".inputBox").children("textarea").attr("readonly", true);
		})
	}
}

function fn_VM2102RetriveVendorUser() {
	// 나에게 접수 체크박스
	if($('#toMeChk').is(':checked')){
		$('#toMe').val('Y');
	}else{
		$('#toMe').val('N');
	}
	
	// 나에게 접수 change event
	$("#toMeChk").click(function(){
		if ($(this).attr('checked')) {
			// 체크 시 현재 계정 선택
			$("#vendorUser").val(userId).change();
		}
	})
	
	$("#vendorUser").change(function() {
		$('#vendorUserId').val($(this).val());
		$('#vendorUserNm').val($(this).find('option:selected').text());
		
		if($('#toMeChk').attr('checked')) {
			if($(this).val() != userId) {
				// '나에게 접수' 체크되어있으면
				$('#toMeChk').attr('checked', false); // 리셋
			}
		}
	});
}

//// AS 처리 데이터 조회
function fn_VM2102RetriveResolve(){
	var param = new Object();
	param.asNo = asNo;
	
	$.ajax({
		url:'/VM2102RetriveResolve',
		data:param,
		async:false,
		success:function(response){
			var data = response.data;
			if(data){
				Object.keys(data).forEach(item => {
					$("#"+item).val(data[item]);
				})
			}
		}
	})
}

function fn_VM2102SetSignPad(){
	// 서명
	var canvas = $("#signature")[0];
	signature = new SignaturePad(canvas, {
		minWidth : 2,
		maxWidth : 2,
		penColor : "rgb(0, 0, 0)",
	});
	
	// 서명 clear 버튼
	$("#clear").off();
	$("#clear").on("click", function() {
		signature.clear();
	});
	
	// 서명란 터치 시 키보드 생성 막기
	canvas.addEventListener("touchstart", fn_VM2102TouchStart, false);
	function fn_VM2102TouchStart(e){
		e.preventDefault();
		$('input[type=text], textarea').blur();
	}
}

// 확인 버튼
function fn_VM2102CheckAs(){
	if($("#vendorUserId").val() == ""){
		alert("담당기사 할당 후에 진행해주세요.")
		return;
	}
	
	if(!confirm("해당 AS건을 확인하셨습니까?")){
		return;
	}
	
	var errorTypeCd = $("[id^='errorType_']").last();
	if($(errorTypeCd).val() == ""){
		alert("장애유형을 선택해주세요.");
		$(errorTypeCd).focus();
		return;
	}
	$("#errorTypeCd").val($(errorTypeCd).val());
	var errorType = '';
	$("[id^=errorType_").each(function(){
		if(errorType.length > 0) errorType += '>';
		errorType += $('option:selected',this).text();
	})
	$("#errorType").val(errorType);
	
	
	let formData = $("#inputForm").serialize();
	
	$.ajax({
		url:'/VM2102Check/' + asNo,
		type:'POST',
		data:formData,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM2102Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

// 기사변경 버튼
function fn_VM2102ChangeAs(){//기사변경
	
	if(!confirm("해당 AS건 기사를 변경하시겠습니까?")){
		return;
	}
	
	$.ajax({
		url:'/VM2102Change/' + asNo,
		type:'POST',
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM2102Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

// 처리완료 버튼
function fn_VM2102resolveAs() {

	var flag = true;

	if($("#resolveNote").val() == "") {
		alert('처리내용을 입력해주세요.');
		$("#resolveNote").focus();
		return;
	}

	if(!$('#ownerSignYnChk').is(':checked') && !$('#visitYnChk').is(':checked')) {
		if(signature.isEmpty()) {
			alert("서명 항목을 입력해주세요.");
			return;
		} else {
			var data = signature.toDataURL("image/png");
			$("#file0url").val(data);
		}
		$('#ownerSignYn').val('Y');// 서명이미지가 있으면 'Y'
	} else {
		// 서명이미지가 없으면 체크 확인
		if($('#ownerSignYnChk').is(':checked')) {
			$('#ownerSignYn').val('Y');
		} else if($('#visitYnChk').is(':checked')) {
			$('#ownerSignYn').val('P');
		}
	}

	if(!$("#agreeYnChk").is(':checked')) {
		alert("개인정보 수집 약관에 동의해주세요");
		$("#agreeYn").val('N');
		return;
	} else {
		$("#agreeYn").val('Y')
	}
	
	// 이미지 압축
	fn_imgCompress();
	
	$('#viewLoadingDiv').show().fadeIn('fast');

	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$.ajax({
			url: '/VM2102Resolve/' + asNo,
			type: 'POST',
			data: $('#inputForm2').serialize(),
			success: function(response) {
				if(response.success) {
					fn_VM2102SendMessage(response.data);
					alert("저장되었습니다.");
					fn_VM2102Redirect();
				} else {
					alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
				}
			},
			error: function (e) {
				$("body").html(e.responseText);
			},
			complete: function() {
				$('#viewLoadingDiv').fadeOut();
			}
		})
	}, 0);
}

// 만족도 조사 문자 발송
function fn_VM2102SendMessage(smsUrls) {

	// 연락처 입력한 경우에만 만족도 조사 발송
	if(($("#ownerTelNo").val()).split('-').join('') !== '' && ($("#ownerTelNo").val()).split('-').join('') !== undefined) {
		let param = {
			number 		: ($("#ownerTelNo").val()).split('-').join(''),	// 전화번호
			asNo 		: asNo,
			strNm		: $('#strNm').val(),
			vendorNm	: $('#vendorNm').val()
		};
		fn_uptSemResLog(param.asNo);
		fnSendMessage(smsUrls[1], param, smsUrls[0] == undefined || smsUrls[0] == null ? '' : smsUrls[0]);
	}
}

function fnSendMessage(smsUrl, param, nextUrl) {
	fn_uptSemReqLog(param);
	$.ajax({
		url: smsUrl + '/api/sign/as/survey',
		data: JSON.stringify(param),
		type: 'POST',
		cache: false,
		async: false,
		contentType: 'application/json',
		success: function(response) {
			fn_uptAlgResLog(param.asNo, response);
		},
		error : function(error, textStatus, message) {
			let responseText = error.responseText == undefined || error.responseText == null || error.responseText == '' ? '' : JSON.parse(error.responseText);
			
			if(nextUrl != '') // 다음 url 있으면 재시도
				fnSendMessage(nextUrl, param, '');
			else{
				let errResponse={code : "-98", message: "서버 다운"}
				fn_uptAlgResLog(param.asNo, errResponse);
			}
		},
	});
}

//log
function fn_uptSemResLog(){
	$.ajax({
		url: '/VM2102uptSemResLog/'+asNo,
		type: 'POST',
		async:false
	});
}

function fn_uptSemReqLog(param){
	$.ajax({
		url: '/VM2102uptSemReqLog/'+param.asNo,
		data: param,
		type: 'POST',
		async:false
	});
}

function fn_uptAlgResLog(asNo, response){
	var param = new Object();
	param.aligoRes = JSON.stringify(response);
	$.ajax({
		url: '/VM2102uptAlgResLog/'+asNo,
		data: param,
		type: 'POST',
		async: false
	});
}
////log

////이미지 압축
function fn_imgCompress(){
	$('.thumbBox .imgBox img').each(function(i,ele){
		if( $(ele).closest('.thumbBox').find('input[name$=flag]').val() == 'true' ){
			var oriImgObj = $(ele).get(0);
			var imgType = $(ele).attr('src').split(';')[0].split(':')[1];
			var width = oriImgObj.naturalWidth;
			var height = oriImgObj.naturalHeight;
			
			var upWidth = 0;
			var upHeight = 0;
			if( width >= height ){
				upWidth = (width>=1920 ? 1920 : width);
				upHeight = (width>=1920 ? Math.round(1920*height/width) : height);
			} else {
				upHeight = (height>=1920 ? 1920 : height);
				upWidth = (height>=1920 ? Math.round(1920*width/height) : width);
			}
			
			var canvas = $('#tempCanvas')[0];
			canvas.width = upWidth;
			canvas.height = upHeight;
			var ctx = canvas.getContext('2d').drawImage(oriImgObj, 0, 0, upWidth, upHeight);
			var cnvImg64 = canvas.toDataURL('image/jpeg', 70/100);
			var cnvImgObj = new Image();
			cnvImgObj.src = cnvImg64;
			
			var gap = '[' + i + '] '
				+ $(ele).attr('src').length + ' > ' + cnvImg64.length + ', '
				+ width + ' x ' + height + ' > ' + upWidth + ' x ' + upHeight;
			$(ele).attr('src', cnvImg64);
			$(ele).closest('.thumbBox').find('input[name$=url]').val(cnvImg64);
		}
	})
}

// 수정 버튼
function fn_VM2102ModifyAs(){
	if($("#vendorUserId").val() == ""){
		alert("담당기사 할당 후에 진행해주세요.")
		return;
	}
	
	var errorTypeCd = $("[id^='errorType_']").last();
	if($(errorTypeCd).val() == ""){
		alert("장애유형을 선택해주세요.");
		$(errorTypeCd).focus();
		return;
	}
	$("#errorTypeCd").val($(errorTypeCd).val());
	var errorType = '';
	$("[id^=errorType_").each(function(){
		if(errorType.length > 0) errorType += '>';
		errorType += $('option:selected',this).text();
	})
	$("#errorType").val(errorType);
	
	let formData = $("#inputForm").serialize();
	
	$.ajax({
		url:'/VM2102Modify/' + asNo,
		type:'POST',
		data:formData,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM2102Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

//뒤로가기 버튼
function fn_VM2102Redirect() {
	$('#returnForm').attr("action", "/VM2101Redirect");
	$("#returnForm").submit();
}

const telAutoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}

function dataURLtoFile(dataurl, fileName){
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], fileName, {type:mime});
}

//Android/iOS OS 별 기본 동작 처리
function setOSDefault(){
	var devName = OSInfoDev();
	if(devName.indexOf("Android") != -1) {
		// android - 파일첨부가 바로 되지 않는 문제로 처음 파일 첨부버튼은 비활성화
		$(".thumbBox .fileBox input[type=file]").css('pointer-events', 'none');
		$(".thumbBox .fileBox input[type=file]").off("click");
		$(".thumbBox .fileBox input[type=file]").on("click", function(event){
			event.preventDefault();
			event.stopPropagation();
		});
		
		// 카메라 권한(네이티브 함수)
		$('.thumbBox .filebox').off('click');
		$('.thumbBox .filebox').on('click', function(){
			actingInput = $(this).children('input[type=file]').attr('id');
			callNativeFunction('getCameraAuth', 'single', 'onSuccessGetCameraAuth', 'onErrorGetCameraAuth', false);
		});
	} else {
		$("input[type=file]").off("change");
		$("input[type=file]").on("change", function(event){
			event.preventDefault();
			event.stopPropagation();
			
			var thumbnail = $(this).closest("td").find("img");
			readURL(this, thumbnail);
		});
	}
}

//카메라 권한 획득 성공 시(Android only)
function fn_getCamAuthSuc(){
	if( cameraAuth == 'OK' ){
		// 점포사진 리스트(비활성화)
		$(".thumbBox .filebox").off("click");
		$(".thumbBox .filebox").on("click", function() {
			
			var input_url = $(this).find("input[name$=url]");
			var thumbnail = $(input_url).closest("td").find("img");
			$(".dim").css({
				"width" : $(window).width(),
				"height" : $(window).height()
			});
			
			// 하단 메뉴 open
			$(".dim, .comboBox").removeClass("none");
			$(".comboBox").addClass("show");
			
			$(".dim").off("click");
			$(".dim").on("click", function() {
				$(".dim, .comboBox").addClass("none");
				$(".comboBox").removeClass("show");
			});
			
			// 하단 메뉴 event
			$(".comboBox input[type=file]").off("change");
			$(".combobox input[type=file]").val("");
			$(".comboBox input[type=file]").on("change", function(){
				readURL(this, thumbnail);
				
				if($(".comboBox").hasClass("show")) {
					$(".dim, .comboBox").addClass("none");
					$(".comboBox").removeClass("show");
				}
			});
		});
		
		$('#cameraAuth').val('OK');
		if( !initFlag ){
			$('#'+actingInput).closest('.filebox').trigger('click');
		}
		initFlag = true;
	}
}

//3. load input file
function readURL(input, thumbnail) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$(thumbnail).attr('src', e.target.result);
			$(thumbnail).closest(".imgBox").addClass("be");
			$(thumbnail).closest(".thumbBox").find('input[name$=flag]').val('true');
		}
		
		reader.readAsDataURL(input.files[0]);
	}
}

//OS 버전 보기 
var uanaVigatorOs = navigator.userAgent; 
var AgentUserOs= uanaVigatorOs.replace(/ /g,''); 
var Ostxt=""; 
var OSName=""; 
var OsVers=""; 

// This script sets OSName variable as follows: 
// "Windows" for all versions of Windows 
// "MacOS" for all versions of Macintosh OS 
// "Linux" for all versions of Linux 
// "UNIX" for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS 
new function() { 
	var OsNo = navigator.userAgent.toLowerCase(); 
	jQuery.os = { 
		Linux: /linux/.test(OsNo), 
		Unix: /x11/.test(OsNo), 
		Mac: /mac/.test(OsNo), 
		Windows: /win/.test(OsNo) 
	} 
} 

function OSInfoDev(){ 
	if($.os.Windows) { 
		if(AgentUserOs.indexOf("WindowsCE") != -1) 
			OSName="Windows CE"; 
		else if(AgentUserOs.indexOf("Windows95") != -1) 
			OSName="Windows 95"; 
		else if(AgentUserOs.indexOf("Windows98") != -1) { 
			if (AgentUserOs.indexOf("Win9x4.90") != -1) OSName="Windows Millennium Edition (Windows Me)";
			else OSName="Windows 98"; 
		} 
		else if(AgentUserOs.indexOf("WindowsNT4.0") != -1) OSName="Microsoft Windows NT 4.0"; 
		else if(AgentUserOs.indexOf("WindowsNT5.0") != -1) OSName="Windows 2000"; 
		else if(AgentUserOs.indexOf("WindowsNT5.01") != -1) OSName="Windows 2000, Service Pack 1 (SP1)"; 
		else if(AgentUserOs.indexOf("WindowsNT5.1") != -1) OSName="Windows XP"; 
		else if(AgentUserOs.indexOf("WindowsNT5.2") != -1) OSName="Windows 2003"; 
		else if(AgentUserOs.indexOf("WindowsNT6.0") != -1) OSName="Windows Vista/Server 2008"; 
		else if(AgentUserOs.indexOf("WindowsNT6.1") != -1) OSName="Windows 7"; 
		else if(AgentUserOs.indexOf("WindowsNT6.2") != -1) OSName="Windows 8"; 
		else if(AgentUserOs.indexOf("WindowsNT6.3") != -1) OSName="Windows 8.1"; 
		else if(AgentUserOs.indexOf("WindowsPhone8.0") != -1) OSName="Windows Phone 8.0"; 
		else if(AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1) OSName="Windows Phone OS 7.5"; 
		else if(AgentUserOs.indexOf("Xbox") != -1) OSName="Xbox 360"; 
		else if(AgentUserOs.indexOf("XboxOne") != -1) OSName="Xbox One"; 
		else if(AgentUserOs.indexOf("Win16") != -1) OSName="Windows 3.x"; 
		else if(AgentUserOs.indexOf("ARM") != -1) OSName="Windows RT"; 
		else OSName="Windows (Unknown)"; 
		
		if(AgentUserOs.indexOf("WOW64") != -1) OsVers=" 64-bit(s/w 32-bit)"; 
		else if(AgentUserOs.indexOf("Win64;x64;") != -1) OsVers=" 64-bit(s/w 64-bit)"; 
		else if(AgentUserOs.indexOf("Win16") != -1) OsVers=" 16-bit"; 
		else OsVers=" 32-bit"; 
	} else if ($.os.Linux) { 
		if(AgentUserOs.indexOf("Android") != -1) { OSName = getAndroidDevName(); } 
		else if(AgentUserOs.indexOf("BlackBerry9000") != -1) OSName="BlackBerry9000"; 
		else if(AgentUserOs.indexOf("BlackBerry9300") != -1) OSName="BlackBerry9300"; 
		else if(AgentUserOs.indexOf("BlackBerry9700") != -1) OSName="BlackBerry9700"; 
		else if(AgentUserOs.indexOf("BlackBerry9780") != -1) OSName="BlackBerry9780"; 
		else if(AgentUserOs.indexOf("BlackBerry9900") != -1) OSName="BlackBerry9900"; 
		else if(AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) OSName="Opera/9.80"; 
		else if(AgentUserOs.indexOf("Symbian/3") != -1) OSName="Symbian OS3"; 
		else if(AgentUserOs.indexOf("SymbianOS/6") != -1) OSName="Symbian OS6"; 
		else if(AgentUserOs.indexOf("SymbianOS/9") != -1) OSName="Symbian OS9"; 
		else if(AgentUserOs.indexOf("Ubuntu") != -1) OSName="Ubuntu"; 
		else if(AgentUserOs.indexOf("PDA") != -1) OSName="PDA"; 
		else if(AgentUserOs.indexOf("NintendoWii") != -1) OSName="Nintendo Wii"; 
		else if(AgentUserOs.indexOf("PSP") != -1) OSName="PlayStation Portable"; 
		else if(AgentUserOs.indexOf("PS2;") != -1) OSName="PlayStation 2"; 
		else if(AgentUserOs.indexOf("PLAYSTATION3") != -1) OSName="PlayStation 3"; 
		else OSName="Linux (Unknown)"; 
		
		if(AgentUserOs.indexOf("x86_64") != -1) OsVers=" 64-bit"; 
		else if(AgentUserOs.indexOf("i386") != -1) OsVers=" 32-bit"; 
		else if(AgentUserOs.indexOf("IA-32") != -1) OsVers=" 32-bit"; 
		else OsVers=""; 
	} else if ($.os.Unix) { 
		OSName="UNIX"; 
	} else if ($.os.Mac) { 
		if(AgentUserOs.indexOf("iPhone") != -1) { 
			if(AgentUserOs.indexOf("iPhoneOS3") != -1) OSName="iPhone OS 3"; 
			else if(AgentUserOs.indexOf("iPhoneOS4") != -1) OSName="iPhone OS 4"; 
			else if(AgentUserOs.indexOf("iPhoneOS5") != -1) OSName="iPhone OS 5"; 
			else if(AgentUserOs.indexOf("iPhoneOS6") != -1) OSName="iPhone OS 6"; 
			else OSName="iPhone"; 
		} else if(AgentUserOs.indexOf("iPad") != -1) { 
			OSName="iPad"; 
		} else if(AgentUserOs.indexOf("MacOS") != -1) { 
			if(AgentUserOs.indexOf("Macintosh") != -1) OSName="Macintosh"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.1")) != -1) OSName="Mac OS X Puma"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.2")) != -1) OSName="Mac OS X Jaguar"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.3")) != -1) OSName="Mac OS X Panther"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.4")) != -1) OSName="Mac OS X Tiger"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.5")) != -1) OSName="Mac OS X Leopard"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.6")) != -1) OSName="Mac OS X Snow Leopard"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.7")) != -1) OSName="Mac OS X Lion"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.8")) != -1) OSName="Mac OS X Mountain Lion"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.9")) != -1) OSName="Mac OS X Mavericks"; 
		} else { 
			OSName="MacOS (Unknown)"; 
		} 
	} else { 
		OSName="Unknown OS"; 
	} 
	var OSDev = OSName + OsVers; 
	return OSDev; 
} 

// Android의 단말 이름을 반환 
function getAndroidDevName() { 
	var uaAdata = navigator.userAgent; 
	var regex = /Android (.*);.*;\s*(.*)\sBuild/; 
	var match = regex.exec(uaAdata); 
	if(match) { 
		var ver = match[1]; 
		var dev_name = match[2]; 
		return "Android " + ver + " " + dev_name; 
	} 
	
	return "Android OS"; 
}

$('#toggle').click(function() {
	$('#agreement').toggle();
	if($(this).text()=='자세히 ▼'){
		$(this).text('자세히 ▲');
	}else{
		$(this).text('자세히 ▼');
	}
});