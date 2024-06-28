var loginEnable = false;
var immediateLogin = true;

function fn_alert_login_fail() {
	if(msg != '') {
		alert(msg.split(':')[1]);
	}
}

window.onpageshow = function(event) {
	
	$('#viewLoadingDiv').hide();

	if(msg != '') {
		if( $.trim(msg.split(':')[1]).length > 0 ){
			if( msg.split(':')[0] == 'e3' ){
				// 자동 로그인 정보 세팅 초기화
				callNativeFunction('setAutoLogin', 'F|' + msg.split(':')[2] + '| ', 'onSuccessSetAutoLogin', 'onErrorSetAutoLogin', false);
			}
			alert( msg.split(':')[1] );
		}
	}
	
	fn_SetDeviceInfo();	// 쿼리스트링으로 받아온 device정보 setting
	
	// 알림 식별자 확인
	callNativeFunction('getPushToken', '', 'onSuccessGetPushToken', 'onErrorGetPushToken', false);
	
	// 모바일 OS 종류 확인
	callNativeFunction('getDeviceType', '', 'onSuccessGetDeviceType', 'onErrorGetDeviceType', false);
	
	// 모바일 OS 버전 확인
	callNativeFunction('getOSVersion', '', 'onSuccessGetOSVersion', 'onErrorGetOSVersion', false);
	
	// 자동 로그인 정보 확인
	callNativeFunction('getAutoLogin', '', 'onSuccessGetAutoLogin', 'onErrorGetAutoLogin', false);
	
	// Native app 버전 확인
	callNativeFunction('getAppVersion', '', 'onSuccessGetAppVersion', 'onErrorGetAppVersion', false);
};

function fn_check_app_version(callBack) {
	var filter = "win16|win32|win64|mac|macintel";
	
	// 로그인 화면 하단 앱버전 표시
	$("#appVer").text("Version " + appVersion);
	
	if ( navigator.platform && filter.indexOf( navigator.platform.toLowerCase() ) > 0) {
		loginEnable = true;
	} else {
		//mobile
		if(deviceType == 'IOS') {
			if(appVersion == null || appVersion < 2.4) {
				if($("#wkWebViewYn").val() == "Y"){
					$('a#appUrl').attr('onClick', "fn_needUpdate('https://itunes.apple.com/app/id1411817255')");
				}else{
					$('a#appUrl').attr('href', 'https://apps.apple.com/kr/app/sems-엣스퍼트/id1411817255');
				}
				
				$('#app_update_popup').popup({autoopen:true,background:false});
				return;
			} else {
				loginEnable = true;
			}
		} else if(deviceType == 'AND') {
//			if(appVersion == null || appVersion < 1.6) {
//				// 확인 팝업
//				$('#app_update_confirm_popup').popup({autoopen:true,background:false});
//				// 로그인 진행
//				//loginEnable = true;
//				//immediateLogin = false;
//			} else 
				if(appVersion < 2.9 && appVersion != 2.8) {	// 3.1 버전 사용 기사님들 중 이미지 업로드 오류가 있는 기사님은 2.8버전 사용중
				// 업데이트 이동 팝업
				$('a#appUrl').attr('href', 'http://play.google.com/store/apps/details?id=com.tnmtech.sems3');
				$('#app_update_popup').popup({autoopen:true,background:false});
				return;
			} else {
				loginEnable = true;
			}
		} else {
			loginEnable = true;
		}
	}
	if(immediateLogin && callBack && callBack != 'undefined') {
		callBack();
	}
}

function fn_login() {
	if(loginEnable) {
		if(deviceType == 'IOS') {
			callNativeFunction('getNotiEnvInfo', '', 'onSuccessGetNotiEnvInfo', 'onErrorGetNotiEnvInfo', false)
		}
		$('#viewLoadingDiv').show().fadeIn('fast');
		
		var loginId = $.trim( $("#userId").val() );
		var loginPw = $.trim( $("#userPw").val() );
		
		if(loginId == null || loginId.length < 1){
			alert("아이디를 입력하세요.");
			
			$("#username").val("");
			$('#viewLoadingDiv').fadeOut();
			return false;
		}
		
		if(loginPw == null || loginPw.length < 1){
			alert("비밀번호를 입력하세요.");
			$("#userpass").val("");
			$('#viewLoadingDiv').fadeOut();
			return false;
		}
		
		document.loginForm.method = 'POST';
		document.loginForm.submit();
	} else {
		fn_check_app_version(fn_login);
	}
}

function fn_check(){
	if( $("input[name=auth_chk]").prop('checked') ){
		$("input[name=auth_chk]").prop('checked', false);
	} else {
		$("input[name=auth_chk]").prop('checked', true);
	}
}

function fn_needUpdate(url){
	callNativeFunction('setNeedUpdate', url, 'onSuccessSetNeedUpdate', 'onErrorSetNeedUpdate', false);
}