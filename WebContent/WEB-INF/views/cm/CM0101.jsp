<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="../cm/message.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 로그인</title>
<%@ include file="../cm/header.jsp" %>

<script>
	var msg = '${msg}';

	localStorage.setItem('envMode', "${envMode}");
	localStorage.setItem('rollBarToken', "${rollBarToken}");
</script>
</head>
<body class="login">
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<div class="statusBar"></div>
		<h1 class="blind">에너지 관제시스템 로그인 페이지</h1>

		<!-- container -->
		<div id="container">
			<h2 class="logo">
				${smLogoAlt}
			</h2>
			<form name="loginForm" action="/login" enctype="application/x-www-form-urlencoded">
				<input type="hidden" id="pushToken" 	name="pushToken" value="${pushToken }" />
				<input type="hidden" id="deviceType" 	name="deviceType" value="${deviceType }" />
				<input type="hidden" id="osVersion" 	name="osVersion" value="${osVersion }" />
				<input type="hidden" id="appVersion" 	name="appVersion" value="${appVersion }" />
				<input type="hidden" id="wkWebViewYn" 	name="wkWebViewYn" value="N" />
				<input type="hidden" id="isPush" 		name="isPush" 		value="${isPush}" />
				<input type="hidden" id="pushNo" 		name="pushNo" 		value="${pushNo}" />
				<input type="hidden" id="fs" name="fs" value="${fullScreen}" />
				<input type="hidden" id="sh" name="sh" value="${statusBar}" />
				<fieldset>
					<legend>로그인</legend>
					<div class="form_login">
						<p class="id_input">
							<label for="userId">
								Username
							</label>
							<input type="text" id="userId" name="userId" placeholder="아이디" title="아이디 입력" value=""/>
						</p>
						<p class="pw_input">
							<label for="userPw">
								Password
							</label>
							<input type="password" id="userPw" name="userPw" placeholder="비밀번호" title="비밀번호 입력" value="" onkeypress="if(event.keyCode==13) {fn_login(); return false;}" />
						</p>
						<p class="btn_login">
							<a href="#" onclick="javascript:fn_login()">로그인</a>
						</p>
						<p class="auto_login">
							<input type="checkbox" id="auth_chk" name="auth_chk" /><label for="auth_chk">자동로그인</label>
						</p>
						<p style="margin: 30px 0;">
							<span style="font-size:12px;line-height:1.5;">ID / 비밀번호를 알 수 없는 경우, <br>해피콜 시스템을 통해 ID / 비밀번호를 요청해주세요</span>
						</p>
						<div class="appVerInfo">
							<span id="appVer" class="appversion"></span>
						</div>
						<!-- <p class="btn_login">
							<a href="#" onclick="javascript:fn_getCookie()">쿠키보기</a>
						</p>
						<p class="btn_login">
							<a href="#" onclick="javascript:fn_deleteCookie()">쿠키삭제</a>
						</p> -->
					</div>
				</fieldset>
			</form>

			<!-- 앱 업데이트 안내 팝업 - 이동 -->
			<div id="app_update_popup" class="wrap_popup" style="display:none;">
				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">앱 업데이트 안내</h2>
					<a href="#" class="app_update_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->
				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div class="VM0301_popup setting_area">
						<p class="direction">최신버전을 사용해야 이용하실 수 있습니다.</p>
						<div class="btn_save">
							<p><a id="appUrl">앱 업데이트</a></p>
						</div>
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->
			</div>
			<!-- //앱 업데이트 안내 팝업 - 이동 -->

			<!-- 앱 업데이트 안내 팝업 - 확인 -->
			<div id="app_update_confirm_popup" class="wrap_popup" style="display:none;">
				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">앱 업데이트 안내</h2>
					<a href="#" class="app_update_confirm_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->
				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div class="VM0301_popup setting_area">
						<p class="direction">구글플레이에서 'SEMS 엣스퍼트'를 검색하여 최신버전으로 업데이트해주세요.</p>
						<div class="btn_save">
							<p><a href="#" class="app_update_confirm_popup_close" >확인</a></p>
						</div>
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->
			</div>
			<!-- //앱 업데이트 안내 팝업 - 확인 -->

		</div>
		<!-- //container -->
	</div>
	<!-- //wrap -->

	<!-- 로딩 -->
	<div id="viewLoadingDiv" >
		<div id="viewLoadingImg" ></div>
	</div>
	<!-- //로딩 -->

	<!-- viewJs import -->
	<script src="/resources/viewJs/cm/CM0101.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>
