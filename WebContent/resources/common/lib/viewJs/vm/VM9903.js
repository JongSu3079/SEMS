// 스크립트 시작 
window.onpageshow = function(event) {
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 초기 비밀번호 유효성 검사
function fn_VM9903checkUserPw() {
	var userId		= $("#alUserId").val();
	var curPw 		= $("#curPw").val();
	
	if(curPw == "") {
		alert("초기 비밀번호를 입력하세요.");
		$("#curPw").focus();
		return;
	} else {
		var param = new Object;
		param.userId = userId;
		param.userPw = curPw;
		
		$.ajax({
			type : 'POST',
			data : param,
			url : '/VM9903PwCheck',
			success : function(response) {
				//console.log( "CM0101PwCheck returnJSON " );
				//console.log( response );
				if (response) {
					fn_VM9903checkUserNewPw();
				} else {
					alert("초기 비밀번호가 틀렸습니다.");
					$("#curPw").focus();
					return;
				}
			}
		});
	}
}

// 신규 비밀번호 유효성 검사
function fn_VM9903checkUserNewPw() {
	var returnVal 	= false;
	var newPw 		= $("#newPw").val();
	var newPwCfrm 	= $("#newPwCfrm").val();
	
	if(newPw == "") {
		alert("사용하실 비밀번호를 입력하세요.");
		$("#newPw").focus();
		return;
	} else {
		if(!validatePw(newPw)) {
			alert("비밀번호는 영문자 숫자 특수문자 중 2가지 이상 종류로 조합하여 8자리 이상 15자리 이하로 입력해야합니다.");
			$("#newPw").focus();
		} else {
			if(newPwCfrm == "") {
				alert("사용하실 비밀번호를 한번더 입력해 주세요.");
				$("#newPwCfrm").val("");
				$("#newPwCfrm").focus();
				return;
			} else if(newPw != newPwCfrm) {
				alert("사용하실 비밀번호가 동일하지 않습니다.");
				$("#newPwCfrm").val("");
				$("#newPwCfrm").focus();
				return;
			} 
			
			fn_VM9903saveUserPw();
		}
	}
}

// 비밀번호 변경 저장
function fn_VM9903saveUserPw() {
	var userNewPw = $("#newPw").val();
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : userNewPw,
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/text; charset=UTF-8",
		url : '/VM0901SavePw',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				fnAutoLoginDestroy();	// 자동 로그인 해제
				alert("초기 비밀번호 변경을 완료하였습니다.");
				location.href = '/VM0101';
			} else {
				alert("초기 비밀번호 변경을 실패하였습니다.");
			}
		}
	});
}

//로그아웃
function fn_VM0901logout(){
	fnAutoLoginDestroy();	// 자동 로그인 해제
	location.href = "/CM0101Logout";
}