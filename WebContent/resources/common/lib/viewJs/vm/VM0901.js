// 스크립트 시작 
window.onpageshow = function(event) {
	// 피크알람 수신 on/off 토글
	$("#peakTg").cmToggle(1, function() {
		fn_VM0901peakTg();
	});
	
	// 냉장비 알람 수신 on/off 토글
	$("#sisulTg").cmToggle(1, function() {
		fn_VM0901sisulTg();
	});
	
	// 냉장비 알람 수신 on/off 토글
	$("#sisul2ndTg").cmToggle(1, function() {
		fn_VM0901sisul2ndTg();
	});

	// 간판 알람 수신 on/off 토글
	$("#signTg").cmToggle(1, function() {
		fn_VM0901signTg();
	});
	
	// 정기점검 알람 수신 on/off 토글
	$("#mntncTg").cmToggle(1, function() {
		fn_VM0901mntncTg();
	});
	// 계약전력 20kW미만 점포 피크 알람 수신 on/off 토글
	$("#pklvTg").cmToggle(1, function() {
		fn_VM0901pklvTg();
	});
	// 공지사항 알람 수신 on/off 토글
	$("#notiTg").cmToggle(1, function() {
		fn_VM0901NotiTg();
	});
	// 기상특보 알람 수신 on/off 토글
	$("#wthrwTg").cmToggle(1, function() {
		fn_VM0901WthrwTg();
	});
	// 설비상태 알람 수신 on/off 토글
	$("#stateTg").cmToggle(1, function() {
		fn_VM0901StateTg();
	});
	
//	if( $('#sisulTg').children().eq(0).hasClass('on') ){
//		confVal = 'Y';
//		$('#sisulOffText').hide();
//	} else {
//		confVal = 'N';
//		$('#sisulOffText').show();
//	}

	let absUserYn = userNm[userNm.length - 1] == 's' ? 'Y' : 'N';	// abs 기사 flag
	let absManagerYn = userId[userId.length - 1] == 'm' ? 'Y' : 'N';// abs 매니저 flag
	if(absUserYn == 'Y' || absManagerYn == 'Y'){
		$("#happycDiv").show();
	}else{
		$("#happycDiv").hide();
	}
	// AS 알람 수신 on/off 토글
	$("#happyCTg").cmToggle(1, function() {
		fn_VM0901HappycTg();
	});
	
	// 알람 수신 정보 가져오기
	fn_VM0901getAlarmReceiveInfo();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 알람 수신 정보 가져오기
function fn_VM0901getAlarmReceiveInfo(){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM0901Search',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				// 점포 사용자, GS담당자 일때만 표시
//				if(authSp === 'S' || returnJSON.items[0].managerYn === 'Y'){
				if(Array.isArray(returnJSON.items) && returnJSON.items.length > 0){
					// GS담당자 일때만 표시
					if(typeof(returnJSON.items[0].managerYn) != "undefined" && returnJSON.items[0].managerYn != null && returnJSON.items[0].managerYn === 'Y'){
						$("#sisul2ndDiv").show();
					}
					
					if(returnJSON.total > 0) {
						var items = returnJSON.items;
						
						$.each(
							returnJSON.items,
							function(i,confList) {
								fn_VM0901setConfBtn(confList.confSp, confList.confVal);
						});
					}
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 알람 수신 정보 세팅
function fn_VM0901setConfBtn(confSp, confVal) {
	if(confSp == "PEAK") {
		if(confVal == "N") {
			$("#peakTg").cmToggle(1, function(){
				fn_VM0901peakTg();
			});
		} else {
			$("#peakTg").cmToggle(0, function(){
				fn_VM0901peakTg();
			});
		}
	} else if(confSp == "SISUL") {
		if(confVal == "N") {
			$("#sisulTg").cmToggle(1, function(){
				fn_VM0901sisulTg();
			});
			$('#sisulOffText').hide();
		} else {
			$("#sisulTg").cmToggle(0, function(){
				fn_VM0901sisulTg();
			});
			$('#sisulOffText').show();
		}
	} else if(confSp == "SIGN") {
		if(confVal == "N") {
			$("#signTg").cmToggle(1, function(){
				fn_VM0901signTg();
			});
		} else {
			$("#signTg").cmToggle(0, function(){
				fn_VM0901signTg();
			});
		}
	} else if(confSp == "MNTNC") {
		if(confVal == "N") {
			$("#mntncTg").cmToggle(1, function(){
				fn_VM0901mntncTg();
			});
		} else {
			$("#mntncTg").cmToggle(0, function(){
				fn_VM0901mntncTg();
			});
		}
	} else if(confSp == "PKLV") {
		if(confVal == "N") {
			$("#pklvTg").cmToggle(1, function(){
				fn_VM0901pklvTg();
			});
		} else {
			$("#pklvTg").cmToggle(0, function(){
				fn_VM0901pklvTg();
			});
		}
	} else if(confSp == "NOTICE"){
		if(confVal == "N"){
			$("#notiTg").cmToggle(1, function(){
				fn_VM0901NotiTg();
			});
		}else{
			$("#notiTg").cmToggle(0, function(){
				fn_VM0901NotiTg();
			});
		}
	} else if(confSp == "WTHRW"){
		if(confVal == "N"){
			$("#wthrwTg").cmToggle(1, function(){
				fn_VM0901WthrwTg();
			});
		}else{
			$("#wthrwTg").cmToggle(0, function(){
				fn_VM0901WthrwTg();
			});
		}
	} else if(confSp == "STATE"){
		if(confVal == "N"){
			$("#stateTg").cmToggle(1, function(){
				fn_VM0901StateTg();
			});
		}else{
			$("#stateTg").cmToggle(0, function(){
				fn_VM0901StateTg();
			});
		}
	} else if(confSp == "SISUL2ND") {
		if(confVal == "N") {
			$("#sisul2ndTg").cmToggle(1, function(){
				fn_VM0901sisul2ndTg();
			});
		} else {
			$("#sisul2ndTg").cmToggle(0, function(){
				fn_VM0901sisul2ndTg();
			});
		}
	} else if(confSp == 'HAPPYC') {
		if(confVal == "N"){
			$("#happyCTg").cmToggle(1, function(){
				fn_VM0901HappycTg();
			});
		}else{
			$("#happyCTg").cmToggle(0, function(){
				fn_VM0901HappycTg();
			});
		}
	}
}

// 피크 알람 설정 변경
function fn_VM0901peakTg(){
	var confSp	= 'PEAK';
	var confVal	= '';
	if( $('#peakTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

// 냉장비 알람 설정 변경
function fn_VM0901sisulTg(){
	var confSp	= 'SISUL';
	var confVal	= '';
	if( $('#sisulTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
		$('#sisulOffText').show();
	} else {
		confVal = 'N';
		$('#sisulOffText').hide();
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

// 간판 알람 설정 변경
function fn_VM0901signTg(){
	var confSp	= 'SIGN';
	var confVal	= '';
	if( $('#signTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}

	fn_VM0901saveConf(confSp, confVal);
}

//정기점검 알람 설정 변경
function fn_VM0901mntncTg(){
	var confSp	= 'MNTNC';
	var confVal	= '';
	if( $('#mntncTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

// 20kW 미만 점포 피크알람 설정 변경
function fn_VM0901pklvTg(){
	var confSp	= 'PKLV';
	var confVal	= '';
	if( $('#pklvTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

//공지사항 설정 변경
function fn_VM0901NotiTg(){
	var confSp	= 'NOTICE';
	var confVal	= '';
	if( $('#notiTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}
//기상특보 알람 설정 변경
function fn_VM0901WthrwTg(){
	var confSp	= 'WTHRW';
	var confVal	= '';
	if( $('#wthrwTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

//설비 상태 알람 설정 변경
function fn_VM0901StateTg(){
	var confSp	= 'STATE';
	var confVal	= '';
	if( $('#stateTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

//냉장비 알람 설정 변경
function fn_VM0901sisul2ndTg(){
	var confSp	= 'SISUL2ND';
	var confVal	= '';
	if( $('#sisul2ndTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

//AS 알람 설정 변경
function fn_VM0901HappycTg(){
	var confSp	= 'HAPPYC';
	var confVal	= '';
	if( $('#happyCTg').children().eq(0).hasClass('on') ){
		confVal = 'Y';
	} else {
		confVal = 'N';
	}
	
	fn_VM0901saveConf(confSp, confVal);
}

function fn_notiOff(){
	
}
// 알람 수신 정보 변경 저장
function fn_VM0901saveConf( paramConfSp, paramConfVal ) {
	var confInfo = {
		"confSp"	: paramConfSp,
		"confVal"	: paramConfVal
	};
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : JSON.stringify(confInfo),
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM0901SaveConf',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				fn_VM0901setConfBtn(paramConfSp, paramConfVal);
				alert("설정 저장 완료되었습니다.");
			} else {
				alert("(등록실패)다시 시도해주세요.");
			}
		}
	});
}

// 비밀번호 유효성 검사
function fn_VM0901checkUserPw() {
	var userId	= $("#alUserId").val();
	var curPw 	= $("#curPw").val();
	
	if(curPw == "") {
		alert("변경 전 비밀번호를 입력하세요.");
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
				if (response) {
					fn_VM0901checkUserNewPw();
				} else {
					alert("비밀번호가 틀렸습니다.");
					$("#curPw").focus();
					return;
				}
			}
		});
	}
}

//신규 비밀번호 유효성 검사
function fn_VM0901checkUserNewPw() {
	var returnVal 	= false;
	var curPw 		= $("#curPw").val();
	var newPw 		= $("#newPw").val();
	var newPwCfrm 	= $("#newPwCfrm").val();
	
	if(newPw == "") {
		alert("새로운 비밀번호를 입력하세요.");
		$("#newPw").focus();
		return;
	} else {
		if(!validatePw(newPw)) {
			alert("새로운 비밀번호를 확인해 주세요.");
			$("#newPw").focus();
		} else {
			if(curPw == newPw) {
				alert("변경전 비밀번호와 새로운 비밀번호가 동일합니다.");
				$("#newPw").val("");
				$("#newPw").focus();
				return;
			} else if(newPwCfrm == "") {
				alert("새로운 비밀번호를 한번더 입력해 주세요.");
				$("#newPwCfrm").val("");
				$("#newPwCfrm").focus();
				return;
			} else if(newPw != newPwCfrm) {
				alert("새로운 비밀번호가 동일하지 않습니다.");
				$("#newPwCfrm").val("");
				$("#newPwCfrm").focus();
				return;
			} 
			
			fn_VM0901saveUserPw();
		}
	}
}

// 비밀번호 변경 저장
function fn_VM0901saveUserPw() {
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
				alert("비밀번호 변경을 완료하였습니다.");
				document.name.reset();
			} else {
				alert("비밀번호 변경을 실패하였습니다.");
			}
		}
	});
}

//로그아웃
function fn_VM0901logout(){
	fnAutoLoginDestroy();	// 자동 로그인 해제
	location.href = "/CM0101Logout";
}