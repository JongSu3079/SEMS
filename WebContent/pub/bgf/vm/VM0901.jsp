<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<!-- <meta name="theme-color" content="#353942" /> 주소창 컬러 -->
<title>에너지 관제시스템 모바일웹 - 설정</title>
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/app_icon.png" />
<link rel="apple-touch-icon-precomposed" href="/images/app_icon.png" />
<link rel="stylesheet" type="text/css" href="/resources/css/common.css" />
<link rel="stylesheet" type="text/css" href="/bgf/lib/css/customer.css" />
<script src="/resources/js/jquery-1.8.2.min.js"></script>
<script src="/resources/js/jquery.popupoverlay.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/commonUI.js"></script>
<script>
$(function() {
	$(".peak .cmToggle").cmToggle(1);
	$(".facilities .cmToggle").cmToggle(0);
});
</script>
</head>
<body>
	<div id="wrap">

		<!-- header -->
		<header>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>

				<!-- 툴바영역 -->
				<div class="toolbar">

					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a href="/CM0301" title="전체메뉴" class="btn_gnb">전체메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->

					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>설정</h2>
					</div>
					<!-- //페이지 타이틀 -->

				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->

		<!-- container -->
		<div id="container">

			<!-- user -->
			<section>
				<h3 class="blind"></h3>
				<div class="user">
					<p class="id_full_name">ID Full Name</p>
					<p class="btn_logout"><a href="#" onclick="fn_logout(); return false;" title="로그아웃">로그아웃</a></p>
				</div>
			</section>
			<!-- //user -->

			<!-- 설정영역 -->
			<section>
				<h3 class="blind">설정하기</h3>
				<div class="setting_area">
					<div class="peak">
						<h3 class="blind">피크알람</h3>
						<div class="cmToggle">
							<p class="tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>피크 알람 수신</a></p>
							<p class="tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>피크 알람 미수신</a></p>
						</div>
					</div>
					<div class="facilities">
						<h3 class="blind">시설물알람</h3>
						<div class="cmToggle">
							<p class="tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>냉장비 알람 수신</a></p>
							<p class="tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>냉장비 알람 미수신</a></p>
						</div>
					</div>
				</div>
			</section>
			<!-- //설정영역 -->

			<!-- 비밀번호 변경하기 -->
			<section>
				<h3 class="blind">비밀번호를 변경하기</h3>
				<div class="form_pw_modify">
					<p>비밀번호 변경</p>
					<form method="get" name="name" action="#">
						<fieldset>
							<legend>비밀번호 변경 폼</legend>
							<span class="present_pw"><input id="curPw" type="password" placeholder="변경 전 비밀번호를 입력하세요." title="변경 전 비밀번호 입력박스" maxlength="20" /></span>
							<span class="new_pw"><input id="newPw" type="password" placeholder="새로운 비밀번호를 입력하세요." title="새로운 비밀번호 입력박스" maxlength="20" /></span>
							<span class="new_pw_again"><input id="newPwCfrm" type="password" placeholder="새로운 비밀번호를 한번 더 입력하세요." title="새로운 비밀번호확인 입력박스" maxlength="20" /></span>
							<div class="btn_save">
								<p><a href="#" onclick="javascript:fn_checkUserPw(); return false;">저장</a></p>
							</div>
						</fieldset>
					</form>
				</div>
			</section>
			<!-- //비밀번호 변경하기 -->

		</div>
		<!-- //container -->

	</div>
	<!-- //wrap -->
</body>
</html>
