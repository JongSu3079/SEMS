<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 냉장비온도</title>
<%@ include file="../cm/header.jsp" %>
<!-- chart 구현 lib -->
<script src="/resources/js/highstock.js" ></script>
<script src="/resources/js/exporting.js" ></script>
<!-- //chart 구현 lib -->
</head>
<body>
<form id="returnFrom" name="returnForm" method='post'>
	<input type="hidden" id="qStrNm"		name="qStrNm"		value="${paramData.qStrNm}"/>
	<input type="hidden" id="tabCd"			name="tabCd"		value="${paramData.tabCd}"/>
</form>

	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<input type="hidden" id="strCd" value="${paramData.strCd}" />
		<input type="hidden" id="moduleId" value="${paramData.moduleId}" />
		<input type="hidden" id="portNo" value="${paramData.portNo}" />
		<input type="hidden" id="temonType" value="${paramData.temonType}" />
		<input type="hidden" id="deviceType" value="${paramData.deviceType}" />
		<input type="hidden" id="moduleNm" value="${paramData.moduleNm}" />
		<input type="hidden" id="deviceLoc" value="${paramData.deviceLoc}" />
		<input type="hidden" id="contents" value="${paramData.contents}" />
		<input type="hidden" id="fromView" value="${paramData.fromView}" />
		
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:fn_CM0501Redirect();" title="이전화면" class="btn_previous"><img src="/${smCommonImagesPath}/btn_previous.png" alt="이전화면" /></a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2 id="title_temp_or_battery">냉장비온도 </h2>
					</div>
					<!-- //타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
			
			<!-- 날짜 검색 영역 -->
			<input id="startDate" name="startDate" type="hidden" title="검색 시작 날짜 입력" />
			<input id="endDate" name="endDate" type="hidden" title="검색 종료 날짜 입력" />
			<!-- //날짜 검색 영역 -->
			
			<!-- graph section -->
			<section>
				<h3 class="blind">그래프로 보기</h3>
				<div class="graph_section" id="container_graph"></div>
			</section>
			<!-- //graph section -->
			
		</div>
		<!-- //container -->
	</div>
	<!-- //wrap -->
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/cm/CM0501.js"></script>
	<!-- //viewJs import -->
</body>
</html>