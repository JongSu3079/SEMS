// 스크립트 시작 
window.onpageshow = function(event) {
	// 조치내용 셀렉트 박스 변화 감시
	fn_VM0702AsTypeChange();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 조치내용 셀렉트 박스 변화 감시
function fn_VM0702AsTypeChange(){
	var ck;
	ck = $('#as_type');
	if( ck != null && typeof(ck) != "undefined" ) {
		$('#as_type').on('change', function(){
			if( $(this).val() == 98 ){
				$('#as_note').text('');
				$('#asNoteArea').removeClass('none');
			} else {
				$('#as_note').text($(this).children("option:selected").text());
				$('#asNoteArea').addClass('none');
			}
		});
	}
}
function asTypeOnchange(ele){
	if( $(ele).val() == 98 ){
		$('#as_note').text('');
		$('#asNoteArea').removeClass('none');
	} else {
		$('#as_note').text($(ele).children("option:selected").text());
		$('#as_note').val($(ele).children("option:selected").text());
		$('#asNoteArea').addClass('none');
	}
}

function fn_VM0702Redirect() {
	$('#returnFrom').attr("action", "/VM0701Redirect");
	$("#returnFrom").submit();
}

// 저장
function fn_VM0702save() {
	$("#as_engineer").val($("#as_engineer").val().replace(/(^\s*)|(\s*$)/gi, ""));
	$("#as_note").val($("#as_note").val().replace(/(^\s*)|(\s*$)/gi, ""));
	
	if($("#as_engineer").val() == "") {
		alert("AS 기사명을 입력해 주세요.");
		$("#as_engineer").focus();
		return;
	}
	if($("#as_method").val() == "") {
		alert("조치방법을 선택해 주세요.");
		$("#as_method").focus();
		return;
	}
	if($("#as_noteType").val() == "") {
		alert("알람 원인을 선택해 주세요.");
		$("#as_noteType").focus();
		return;
	}
	var selVal = $('#as_type').val();
	if(selVal == "") {
		alert("조치방법 상세을 선택해 주세요.");
		$("#as_type").focus();
		return;
	}
	if(selVal == 98 && $('#as_note').val()=='') {
		alert("조치내용을 입력해 주세요.");
		$("#as_note").focus();
		return;
	}
	
	var inputForm = $("#inputForm").serialize();
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : inputForm,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		url : '/VM0701Save',
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
				alert("(등록완료)조치내역 등록을 완료하였습니다.");
				//window.location.href = "/VM0701Redirect";
				
				$('#returnFrom').attr("action", "/VM0701Redirect");
				$("#returnFrom").submit();
			} else {
				if(returnJSON.data == "E001") {
					alert("(등록실패)이미 처리된 조치내역입니다.");
					window.location.href = "/VM0701Redirect";
				} else {
					alert("(등록실패)다시 시도해주세요.");
				}
			}
		}
	});
}