// 스크립트 시작 
window.onpageshow = function(event) {

	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

function fn_VM0705Redirect() {
	$('#returnFrom').attr("action", "/VM0704Redirect");
	$("#returnFrom").submit();
}

// 저장
function fn_VM0705save() {
	$("#as_engineer").val($("#as_engineer").val().replace(/(^\s*)|(\s*$)/gi, ""));
	$("#as_note").val($("#as_note").val().replace(/(^\s*)|(\s*$)/gi, ""));
	
	if($("#as_engineer").val() == "") {
		alert("AS 기사명을 입력해 주세요.");
		$("#as_engineer").focus();
		return;
	}

	if($('#as_note').val()=='') {
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
		url : '/VM0705Save',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function() {
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function() {
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert("(등록완료)조치내역 등록을 완료하였습니다.");
				//window.location.href = "/VM0704Redirect";
				
				$('#returnFrom').attr("action", "/VM0704Redirect");
				$("#returnFrom").submit();
			} else {
				if(returnJSON.data == "E001") {
					alert("(등록실패)이미 처리된 조치내역입니다.");
					window.location.href = "/VM0704Redirect";
				} else {
					alert("(등록실패)다시 시도해주세요.");
				}
			}
		}
	});
}