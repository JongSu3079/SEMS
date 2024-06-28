var pushToken		= null;	// 알림 식별자
var deviceType		= null;	// 모바일 OS 종류
var osVersion		= null;	// 모바일 OS 버전
var autoLoginSet	= null;	// 자동 로그인 세팅 정보
var autoLoginInfo	= null;	// 자동 로그인 정보
var cameraAuth		= null; // 카메라 권한 정보
var appVersion		= null; // Native app 버전 반환
var qrCode			= null; // QR 코드 스캔

// 모바일 OS 종류
var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
};

// 네이티브 메소드 호출
function callNativeFunction(functionName, params, successCallback, errorCallback, needBase64) {
	var callInfo = {};
	callInfo.functionName		= functionName;
	callInfo.successCallback	= successCallback;
	callInfo.errorCallback		= errorCallback;
	
	if (params) {
		callInfo.params = params;
	}
	
	var callJson = JSON.stringify(callInfo);
	
	$("#pushToken").val(pushToken);
	$("#deviceType").val(deviceType);
	$("#osVersion").val(osVersion);
	
	//배포시 활성화
	if (isMobile.iOS()) {
		var url = "jscall://";
		if (needBase64) {
			var encodeStr = Base64.encode( callJson );
			url += encodeStr;
		} else {
			url += callJson;
		}
		
		if($("#wkWebViewYn").val() == "Y"){
			prompt(url); // iOS 12이상 부터 UIWebView가 Deprecated -> WKWebView로 대체
		}else{
			openCustomURLinIFrame(url);
			
			if(functionName == 'getQRScan'){
				checkReceive(functionName, params)
			}else{
				setTimeout(checkReceive, 5000, functionName, params)
			}
		}
	} else if (isMobile.Android()) {
		if(window.Native && window.Native!= undefined){
			try{
				
				if (functionName == 'getPushToken') {
					// 알람 식별자 반환
					window.Native.getPushToken(callJson);
				} else if (functionName == 'getDeviceType') {
					// 모바일 OS 종류 반환
					window.Native.getDeviceType(callJson);
				} else if (functionName == 'getOSVersion') {
					// 모바일 OS 버전 반환
					window.Native.getOSVersion(callJson);
				} else if (functionName == 'setAutoLogin') {
					// 자동 로그인 정보 세팅
					window.Native.setAutoLogin(callJson);
				} else if (functionName == 'getAutoLogin') {
					// 자동 로그인 정보 반환
					window.Native.getAutoLogin(callJson);
				} else if (functionName == 'getCameraAuth') {
					// 카메라 권한
					window.Native.getCameraAuth(callJson);
				} else if (functionName == 'getAppVersion') {
					// Native app 버전 반환
					window.Native.getAppVersion(callJson);
				} else if (functionName == 'getQRScan') {
					// QR 코드 실행
					window.Native.getQRScan(callJson);
				}else if (functionName == 'getNotiEnvInfo') {
					// QR 코드 실행
					window.Native.getNotiEnvInfo(callJson);
				}
			}catch(e){
				Rollbar.error(functionName + '>'+ navigator.userAgent+'>'+e);
			}
		}
	}
}

// 반환 확인
function checkReceive( funName, params ){
	// 알람 식별자 결과 확인
	if (funName == 'getPushToken' && pushToken == null) {
		callNativeFunction(funName, '', 'onSuccessGetPushToken', 'onErrorGetPushToken', true);
	}
	// 모바일 OS 종류 결과 확인
	if (funName == 'getDeviceType' && deviceType == null) {
		callNativeFunction(funName, '', 'onSuccessGetDeviceType', 'onErrorGetDeviceType', true);
	}
	// 모바일 OS 버전 결과 확인
	if (funName == 'getOSVersion' && osVersion == null) {
		callNativeFunction(funName, '', 'onSuccessGetOSVersion', 'onErrorGetOSVersion', true);
	}
	// 자동 로그인 세팅 확인
	if (funName == 'setAutoLogin' && autoLoginSet == null) {
		callNativeFunction(funName, params, 'onSuccessSetAutoLogin', 'onErrorSetAutoLogin', true);
	}
	// 자동 로그인 확인
	if (funName == 'getAutoLogin'&& autoLoginInfo == null) {
		callNativeFunction(funName, '', 'onSuccessGetAutoLogin', 'onErrorGetAutoLogin', true);
	}
	// 카메라 권한
	if (funName == 'getCameraAuth'&& cameraAuth == null) {
		callNativeFunction(funName, params, 'onSuccessGetCameraAuth', 'onErrorGetCameraAuth', true);
	}
	// Native app 버전 확인
	if (funName == 'getAppVersion'&& appVersion == null) {
		callNativeFunction(funName, '', 'onSuccessGetAppVersion', 'onErrorGetAppVersion', true);
	}
	// QR코드 스캔 확인
	if (funName == 'getQRScan'&& qrCode == null) {
		qrCode = "QRCodeScan";
		callNativeFunction(funName, '', 'onSuccessGetQRScan', 'onErrorGetQRScan', true);
	}
	
	// 디바이스 정보 확인
	if (funName == 'getNotiEnvInfo'&& pushToken == null) {
		callNativeFunction(funName, '', 'onSuccessGetNotiEnvInfo', 'onErrorGetNotiEnvInfo', true);
	}
}

// iOS 네이티브 메소드 호출
function openCustomURLinIFrame(src) {
	var rootElm = document.documentElement;
	var newFrameElm = document.createElement("IFRAME");
	newFrameElm.setAttribute("src", src);
	rootElm.appendChild(newFrameElm);
	newFrameElm.parentNode.removeChild(newFrameElm);
}

// 알림 식별자 반환 성공 콜백 함수
function onSuccessGetPushToken(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
		pushToken = obj.result;
		$("#pushToken").val(pushToken);
	}
}

// 알림 식별자 반환 실패 콜백 함수 
function onErrorGetPushToken(ret) {
	pushToken = null;
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 모바일 OS 종류 반환 성공 콜백 함수
function onSuccessGetDeviceType(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
		deviceType = obj.result;
		$("#deviceType").val(deviceType);
	}
}

// 모바일 OS 종류 반환 실패 콜백 함수 
function onErrorGetDeviceType(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 모바일 OS 버전 반환 성공 콜백 함수
function onSuccessGetOSVersion(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
		osVersion = obj.result;
		$("#osVersion").val(osVersion);
	}
}

// 모바일 OS 버전 반환 실패 콜백 함수 
function onErrorGetOSVersion(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 자동 로그인 정보 세팅 성공 콜백 함수
function onSuccessSetAutoLogin(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
		autoLoginSet = obj.result;
//		fn_alert_login_fail();
	}
}

// 자동 로그인 정보 세팅 실패 콜백 함수 
function onErrorSetAutoLogin(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 자동 로그인 정보 반환 성공 콜백 함수
function onSuccessGetAutoLogin(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
		autoLoginInfo = obj.result;
		// 자동 로그인 정보가 존재하는 경우
		if( autoLoginInfo.split('|')[0] == 'T' ){
			$('#userId').val( autoLoginInfo.split('|')[1] );	// 아이디 세팅
			$('#userPw').val( autoLoginInfo.split('|')[2] );	// 비밀번호 세팅
			$("input[name=auth_chk]").prop('checked', true);	// 자동로그인 체크
			
			// 모바일 버전 확인 후 최신버전이면 로그인 진행
			setTimeout(function() {
				fn_check_app_version(fn_login);
			}, 1000);
		// 로그인 한적은 있지만 자동 로그인 체크를 하지 않은 경우
		} else if( autoLoginInfo.split('|')[0] == 'F' ){
			$('#userId').val( autoLoginInfo.split('|')[1] );	// 아이디 세팅
			$("input[name=auth_chk]").prop('checked', false);	// 자동로그인 체크 해제
			
			// 모바일 버전 확인
			setTimeout(function() {
				fn_check_app_version(undefined);
			}, 1000);
		}
	}
}

// 자동 로그인 정보 반환 실패 콜백 함수
function onErrorGetAutoLogin(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 카메라 권한 반환 성공 콜백함수
function onSuccessGetCameraAuth(ret){
	if (ret) {
		var obj = JSON.parse(ret);
		cameraAuth = obj.result;
		fn_getCamAuthSuc();
	}
}

// 카메라 권한 반환 실패 콜백함수
function onErrorGetCameraAuth(ret){
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// Native app 버전 반환 성공 콜백함수
function onSuccessGetAppVersion(ret){
	if (ret) {
		var obj = JSON.parse(ret);
		appVersion = obj.result.replace('APPVERSION', '');
		$('#appVersion').val(appVersion);
	}
}

// Native app 버전 반환 실패 콜백함수
function onErrorGetAppVersion(ret){
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// QR 코드 스캔 성공 콜백함수
function onSuccessGetQRScan(ret){
	if (ret) {
		var obj = JSON.parse(ret);
		qrCode = obj.result;	// qr 코드안의 url
		
		// QR 코드 url 유효성 검사
		if(qrCode.indexOf(window.location.host) != -1){
			location.href = qrCode;	
		}else{
			alert("유효한 QR코드가 아닙니다.");
			$(".btn_gnb").click();
		}
	}
}

// QR 코드 스캔 실패 콜백함수
function onErrorGetQRScan(ret){
	if (ret) {
		var obj = JSON.parse(ret);
		alert(obj.error);
		$(".btn_gnb").click();
	}
}

function onSuccessGetNotiEnvInfo(ret){
	if(ret) {
		var obj = JSON.parse(ret);
		pushToken = ret.PushToken;
		deviceType = ret.DeviceType;
		osVersion = ret.osVersion;
		appVersion = ret.AppVersion;
	}
}

function onErrorGetNotiEnvInfo(ret){
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

//ios 앱 업데이트 요청 실패 콜백 함수 
function onErrorSetNeedUpdate(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

//ios 앱 업데이트 요청 성공 콜백 함수 
function onSuccessSetNeedUpdate(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// ios 앱 업데이트 요청 실패 콜백 함수 
function onErrorSetNeedUpdate(ret) {
	if (ret) {
		var obj = JSON.parse(ret);
	}
}

// 자동로그인 설정
function fnAutoLoginChk( mode ){
	var alUserId		= $('#alUserId').val();
	var alUserPw		= $('#alUserPw').val();
	var alAuthChk		= $('#alAuthChk').val();
	var alAuthChkFlag	= $('#alAuthChkFlag').val();
	var param = '';
	
	if( mode == 'T' ){
		var alAuthChk		= $('#alAuthChkReal').val();
	}
	
	// 자동 로그인 정보 갱신해야하는지 검사
	if( alAuthChkFlag == '1' ){
		// 자동 로그인 기능 사용
		if( alAuthChk == 'on' ){
			param += 'T|' + alUserId + '|' + alUserPw;
			// 자동 로그인 정보 세팅 --- 자동로그인 기능 사용
			callNativeFunction('setAutoLogin', param, 'onSuccessSetAutoLogin', 'onErrorSetAutoLogin', false);
		} else {
			param += 'F|' + alUserId + '| ';
			// 자동 로그인 정보 세팅 --- 자동로그인 기능 사용
			callNativeFunction('setAutoLogin', param, 'onSuccessSetAutoLogin', 'onErrorSetAutoLogin', false);
		}
	}
}

// 자동 로그인 해제
function fnAutoLoginDestroy(){
	var param = 'F|' + $('#alUserId').val() + '| ';
	callNativeFunction('setAutoLogin', param, 'onSuccessSetAutoLogin', 'onErrorSetAutoLogin', false);
}

// 푸시토큰 정보 업데이트
function updatePushToken(token) {
	if (pushToken == null || pushToken == '') {
		pushToken = token;
		$("#pushToken").val(pushToken);
	}
}

var Base64 = {
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		
		while (i < input.length) {
			
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			
			if( isNaN(chr2) ){
				enc3 = enc4 = 64;
			} else if( isNaN(chr3) ){
				enc4 = 64;
			}
			
			output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		
		return output;
	},
	// public method for decoding
	decode : function (input){
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		
		input = input.replace(/[^A-Za-z0-9+/=]/g, "");
		
		while (i < input.length){
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
			
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			
			output = output + String.fromCharCode(chr1);
			
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		
		return output;
	}
}

function fn_SetDeviceInfo(){
	var pushToken		= $("#pushToken").val();	// 알림 식별자
	var deviceType		= $("#deviceType").val();	// 모바일 OS 종류
	var osVersion		= $("#osVersion").val();	// 모바일 OS 버전
	var appVersion		= $("#appVersion").val(); 	// Native app 버전 반환
	
	if($("#osVersion").val() != null && $("#osVersion").val() != ""){
		$("#wkWebViewYn").val('Y');
	}
}

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
				if(appVersion < 2.9) {
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