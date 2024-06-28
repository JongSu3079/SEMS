<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 사용자 약관</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바 영역 -->
				<div class="toolbar">
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>사용자 약관</h2>
					</div>
					<!-- //타이틀 -->
					
					<!-- 닫기 영역 -->
					<div class="btn_close">
						<a href="#" title="창닫기" onclick="fn_CM0102Back();">닫기</a>
					</div>
					<!-- //닫기 영역 -->
					
				</div>
				<!-- //툴바 영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container" class="navi_fixed_2">
			
			<!-- 약관 영역-->
			<section>
				<div class="clause">
					
					<!-- 사이트 이용 약관 동의 -->
					<div class="clauseBox">
						<div class="clauseTxt">
							<!-- 약관본문 -->
							<jsp:include page="../cm/CM010201_${smCompanyCd}.jsp" flush="true"/>
							<!-- //약관본문 -->
						</div>
					</div>
					<div class="checkbox">
						<input id="clause_check1" type="checkbox" /><label for="clause_check1">사이트 이용 약관 동의</label>
					</div>
					<!-- //사이트 이용 약관 동의 -->
					
					<!-- 개인정보수집 및 이용 동의 -->
					<div class="clauseBox">
						<div class="clauseTxt">
							<!-- 약관본문 -->
							<jsp:include page="../cm/CM010202_${smCompanyCd}.jsp" flush="true"/>
							<!-- //약관본문 -->
						</div>
					</div>
					<div class="checkbox">
						<input id="clause_check2" type="checkbox" /><label for="clause_check2">개인정보수집 및 이용 동의</label>
					</div>
					<!-- //개인정보수집 및 이용 동의 -->
					
					<!-- 버튼 영역 -->
					<div class="btn_aree_start">
						<form name="formEula" action="saveCM0102" enctype="application/x-www-form-urlencoded">
							<!-- 자동 로그인 정보 업데이트 -->
							<c:if test="${ alAuthChkFlag eq '1'}">
								<input type="hidden" id="alUserId" name="alUserId" value="${alUserId}"/>
								<input type="hidden" id="alUserPw" name="alUserPw" value="${alUserPw}"/>
								<input type="hidden" id="alAuthChk" name="alAuthChk" value="off"/>
								<input type="hidden" id="alAuthChkReal" name="alAuthChkReal" value="${alAuthChk}"/>
							</c:if>
							<input type="hidden" id="alAuthChkFlag" name="alAuthChkFlag" value="${alAuthChkFlag}"/>
							<!-- //자동 로그인 정보 업데이트 -->
							
							<!-- 동의 영역 -->
							<input type='hidden' id='radEulaAgree' name='radEula' value='Y' />
							<p><a href="#" onclick="javascript:fn_CM0102Agree();" class="disabled">동의하고 시작하기</a></p>
							<!-- //동의 영역 -->
							<!-- 초기비밀번호 변경 여부 -->
							<input type="hidden" id="pwChangYn" name="pwChangYn" value="${pwChangYn}"/>
						</form>
					</div>
					<!-- //버튼 영역 -->
					
				</div>
			</section>
			<!-- //약관 -->
			
		</div>
		<!-- //container -->
		
	</div>
	<!-- //wrap -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/cm/CM0102.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>