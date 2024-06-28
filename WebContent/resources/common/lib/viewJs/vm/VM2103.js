let errorTypeList = [];		// 장애유형 list

$(function(){
	$("#vendor").off();
	$("#vendor").change(function(){
		fn_VM2103RetrieveVendorUserList($(this).val())
	})
	
	fn_VM2103SetInfo();			// 냉장비 업체, 장애유형 setting
	if(back == 'Y'){
		fn_VM2103SetPageParam();	// 페이지 이동 파라미터 setting
	}
	
	// 나에게 접수 change event
	$("#toMeChk").click(function(){
		if ($(this).attr('checked')) {
			// 체크 시 현재 계정 선택
			$("#vendorUser").val(userId).change();
		}
	})
	
	$("#vendorUser").change(function() {
		if($('#toMeChk').attr('checked')) {
			if($(this).val() != userId) {
				// '나에게 접수' 체크되어있으면
				$('#toMeChk').attr('checked', false); // 리셋
			}
		}
	});
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

function fn_VM2103SetInfo(){
	$.ajax({
		url:'/VM2103RetrieveInfo',
		async:false,
		success:function(response){
			// 냉장비 업체 setting
			var vendorHtml = '';
			var vendorList = response.items[0];
			if(vendorList.length > 2){
				// 결과 값이 한개면 바로 선택
				vendorHtml = '<option value="">선택</option>';
			}
			vendorList.forEach( item => {
				vendorHtml += '<option value="'+item.value+'">'+item.name+'</option>';
			})
			$("#vendor").html(vendorHtml);
			$("#vendor").change();
			
			// 장애유형 setting
			errorTypeList = response.items[1];
			// 장애유형
			let el = $("#errorType_1")
			fn_VM2103SetErrorTypeOptions(el, errorTypeList);
		}
	})
}

//장애유형
function fn_VM2103SetErrorTypeOptions(el, array, code){
	let elIdArr = ($(el).attr('id')).split('_');
	let target = elIdArr[0];
	let depth = elIdArr[1];
	
	let html = '';
	html += '<option value="">선택</option>';
	array.forEach( item => {
		html += '<option value="'+item.code+'"';
		if(item.emergencyLevel){
			html += 'level="'+item.emergencyLevel+'"' ;
		}
		html += '>'+item.contents+'</option>';
	});
	$(el).html(html);
	
	$(el).off();
	$(el).change(function(){
		$(this).nextAll().remove();	// 변경한 select의 하위 뎁스 select 삭제
		let index = array.findIndex( item => $(this).val() === item.code);	// 선택한 유형의 index 찾기
		// 선택한 유형의 하위 뎁스가 있으면 select 생성
		if(index != -1 && array[index].child && array[index].child.length > 0){
			// 하위 뎁스 select 생성
			let newHtml = '';
			newHtml += '<select id="'+target+'_'+(Number(depth)+1)+'">';
			newHtml += '</select>';
			$(el).after(newHtml);
			fn_VM2103SetErrorTypeOptions($('#'+target+'_'+(Number(depth)+1)), array[index].child, code);
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
//
//냉장비업체 담당기사 리스트 조회
function fn_VM2103RetrieveVendorUserList(vendorCd){
	var optionsHtml = "";
	optionsHtml += "<option value=''>선택</option>";
	if(vendorCd){
		var param = new Object();
		param.vendorCd = vendorCd;
		
		// ABS 담당자 목록 조회. (이름 's'자로 끝나는 사용자)
		$.ajax({
			url:"/VM2103RetrieveVendorUserList",
			data: param,
			async: false,
			dataType: "json",
			success:function(response){
				response.items.forEach( item => {
					optionsHtml += "<option value='"+item.userId+"'>"+item.userNm+"</option>";
				})
			}
		})
	}
	$("#vendorUser").html(optionsHtml);
}

function fn_VM2103SetPageParam(){
	// 접수 번호 중복검사
	$("#searchAsNo").click();
	
	// 장애유형
	let el = $("#errorType_1")
	fn_VM2103SetErrorTypeOptions(el, errorTypeList, errorType);
	
	// 냉장비 업체
	$("#vendor").val(vendor).change();
	$("#vendorUser").val(vendorUser).change();
}

function fn_VM2103SaveAs(){
	if(!fn_VM2103Validate()){
		return;
	}
	var errorType = '';
	$("[id^=errorType_").each(function(){
		if(errorType.length > 0) errorType += ' > ';
		errorType += $('option:selected',this).text();
	})
	$("#errorType").val(errorType);
	$("#errorTypeCd").val($("#errorTypeDiv").children('select').last().val());
	
	if($('#toMeChk').is(':checked')){
		$('#toMe').val('Y');
	}else{
		$('#toMe').val('N');
	}
	
	var formData = $("#inputForm").serialize();
	formData += '&vendorCd=' + $("#vendor").val();
	formData += '&vendorNm=' + $("#vendor option:selected").text();
	formData += '&vendorUserId=' + $("#vendorUser").val();
	formData += '&vendorUserNm=' + $("#vendorUser option:selected").text();
	
	$.ajax({
		url:'/VM2103SaveAs',
		type:'POST',
		data:formData,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert('저장되었습니다.');
				fn_VM2101Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.');
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
	
}

function fn_VM2103Validate(){
	let rslt = true;
	if($("#asNo").val() == ""){
		$("#asNo").parent().addClass('error');
		$("#asNoErrorMsg").html('접수번호를 입력해주세요.');
		rslt = false;
	}else if($("#asNoFlag").val() == 'false'){
		$("#asNo").parent().addClass('error');
		$("#asNoErrorMsg").html('접수번호 중복확인을 해주세요.');
		rslt = false;
	}else{
		$("#asNo").parent().removeClass('error');
	}
	
	if($("#strNm").val() == ""){
		$("#strNm").parent().addClass('error');
		$("#strNmErrorMsg").html('점포명을 입력해주세요.');
		rslt = false;
	}else{
		$("#strNm").parent().removeClass('error');
		$("#strNmErrorMsg").html('');
	}
	
	if($("#viewStrCd").val() == ""){
		$("#viewStrCd").parent().addClass('error');
		$("#viewStrCdErrorMsg").html('점포코드를 입력해주세요.');
		rslt = false;
	}else{
		$("#viewStrCd").parent().removeClass('error');
		$("#viewStrCdErrorMsg").html('');
	}
	
	if($("#addr").val() == ""){
		$("#addr").parent().addClass('error');
		$("#addrErrorMsg").html('주소를 입력해주세요.');
		rslt = false;
	}else{
		$("#addr").parent().removeClass('error');
		$("#addrErrorMsg").html('');
	}
	
	if($("#errorTypeDiv").children('select').last().val() == ""){
		$("#errorTypeDiv").addClass('error');
		$("#errorTypeErrorMsg").html('장애유형을 입력해주세요.');
		rslt = false;
	}else{
		$("#errorTypeDiv").removeClass('error');
		$("#errorTypeErrorMsg").html('');
	}
	
	if($("#vendor").val() == ""){
		$("#vendor").parent().addClass('error');
		$("#vendorErrorMsg").html('냉장비업체를 선택해주세요.');
		rslt = false;
	}else{
		$("#vendor").parent().removeClass('error');
		$("#vendorErrorMsg").html('');
	}
	
	if($("#vendorUser").val() == ""){
		$("#vendorUser").parent().addClass('error');
		$("#vendorUserErrorMsg").html('담당기사를 선택해주세요.');
		rslt = false;
	}else{
		$("#vendorUser").parent().removeClass('error');
		$("#vendorUserErrorMsg").html('');
	}
	
	return rslt;
}

// 접수 번호 중복확인 버튼 클릭 이벤트
$("#searchAsNo").off();
$("#searchAsNo").on('click',function(){
	var asNo = $("#asNo").val();
	if(asNo == ''){
		alert('접수번호를 입력해주세요');
		return;
	}
	var param = new Object();
	param.asNo = asNo;
	
	$.ajax({
		url:'/VM2103RetrieveAsNo',
		data:param,
		success:function(response){
			if(response.success){
				// 이미 등록된 as건이 없으면 등록 가능
				if(response.items.length > 0){
					$("#asNoErrorMsg").html('이미 등록된 접수번호입니다.');
					$("#asNoInput").addClass('error');
				}else{
					$("#asNoFlag").val(true);
					$("#asNoInput").removeClass('error');
					$("#asNoErrorMsg").html('등록 가능');
				}
			}
		}
	})
})

// 점포명 검색 아이콘 클릭 이벤트
$("#searchStrNm").off();
$("#searchStrNm").on('click',function(){
	$("#errorTypeCd").val($("#errorTypeDiv").children('select').last().val());
	
	var params = $("#inputForm").serializeObject();
	params.qStrNm = $("#qStrNm").val();
	params.tabCd = $("#tabCd").val();
	params.order = $("#order").val();
	
	$("#movePageParam").val(JSON.stringify(params));
	var form = document.movePageForm;
	form.action = '/menu/VM2104';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
})

function fn_VM2101Redirect(){
	$('#returnForm').attr("action", "/VM2101Redirect");
	$("#returnForm").submit();
}

const onlyNumber = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
}
const telAutoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}