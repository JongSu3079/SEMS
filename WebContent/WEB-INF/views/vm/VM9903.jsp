<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
	<script>
	var authSp = "${authSp}";
	var authId = "${authId}";
	let userId = "${userVo.userId}";
	let userNm = "${userVo.userNm}";
	</script>
	<head>
		<title>에너지 관제시스템 모바일웹 - 비밀번호 변경</title>
		<%@ include file="../cm/header.jsp" %>
		<style>
			#sisulOffText{
				font-size:1em;
				margin:1%;
				background-color:#dddddd;
				flex-wrap: nowrap;
				display:flex;
				padding:1% 0%
			}
			#innerText{
				max-height: 50%; 
				max-width:98%;
				margin:2%;
			}
			#red{
				margin:1%;
				color:red;
			}
			#showDetail{
				background-color:#cccccc;
				float:right;
				padding:1% 2%;
				margin:2%;
			}
			
		</style>
	</head>
	<body>
		<!-- 자동 로그인 -->
		<input type="hidden" id="alUserId" value="${userVo.getUserId()}" />
		<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
		<!-- //자동 로그인 -->
		
		<!-- wrap -->
		<div id="wrap" class="${smStatusHeight}">
				<!-- 전체메뉴 -->
				<nav class="nav">
					<%@ include file="../cm/CM0301.jsp" %>
				</nav>
				<!-- //전체메뉴 -->
				
				<!-- trunk -->
				<div class="trunk">
				
				<!-- header -->
				<header class="sub">
					<div class="statusBar"></div>
					
					<div id="header_sub">
						<h1 class="blind">에너지 관제시스템</h1>
					
						<!-- 툴바영역 -->
						<div class="toolbar">
							<!-- 페이지 타이틀 -->
							<div class="title_header_search">
								<h2>비밀번호 변경</h2>
							</div>
							<!-- //페이지 타이틀 -->
						</div>
						<!-- //툴바영역 -->
					</div>
				</header>
				<!-- //header -->
				
				<!-- container -->
				<div id="container">
					<!-- 사용자이름, 로그아웃 버튼 영역 -->
					<section>
						<h3 class="blind"></h3>
						<div class="user">
							<p class="id_full_name">${userVo.getUserId()}</p>
							<p class="btn_logout"><a href="#" onclick="fn_VM0901logout(); return false;" title="로그아웃">로그아웃</a></p>
						</div>
					</section>
					<!-- 비밀번호 변경 section -->
					<section>
						<h3 class="inner">초기 비밀번호 변경</h3>
						<div class="form_pw_modify">
							<form method="get" name="name" action="#">
								<fieldset>
									<legend>비밀번호 변경 폼</legend>
									<span class="present_pw"><input id="curPw" type="password" placeholder="초기 비밀번호를 입력하세요." title="초기 비밀번호 입력박스" maxlength="20" /></span>
									<span class="new_pw"><input id="newPw" type="password" placeholder="사용하실 비밀번호를 입력하세요." title="사용하실 비밀번호 입력박스" maxlength="20" /></span>
									<span class="new_pw_again"><input id="newPwCfrm" type="password" placeholder="사용하실 비밀번호를 한번 더 입력하세요." title="사용하실 비밀번호확인 입력박스" maxlength="20" /></span>
									<div class="btn_save">
										<p><a href="#" onclick="fn_VM9903checkUserPw(); return false;">저장</a></p>
									</div>
									<div>
										<p style="margin: 30px 0;">
											<span style="font-size:12px;line-height:1.5;"> * 비밀번호는 8자리 이상 15자리 이하, <br> * 영문자, 숫자, 특수문자 중 최소 두 가지 이상 포함 해야합니다.</span>
										</p>
									</div>
								</fieldset>
							</form>
						</div>
					</section>
					<!-- //비밀번호 변경 section -->
				</div>
				<!-- //container -->
			</div>
			<!-- //trunk -->
		</div>
		<!-- //wrap -->
		<!-- 로딩 -->
		<div id="viewLoadingDiv">
			<div id="viewLoadingImg"></div>
		</div>
		<!-- //로딩 -->
		<!-- viewJs import -->
		<script src="/resources/viewJs/vm/VM9903.js"></script>
		<script src="/resources/viewJs/cm/CM0104.js"></script>
		<!-- //viewJs import -->
	</body>
</html>