<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 게시판</title>
<%@ include file="../cm/header.jsp" %>
<script>
	var faqGroup = "${faqGroup}";
</script>
</head>
<body>
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- 전체메뉴 -->
		<c:if test="${empty faqGroup or not empty userId }">
		<nav class="nav">
			<%@ include file="../cm/CM0301.jsp" %>
		</nav>
		</c:if>
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
						
						<!-- 전체메뉴 아이콘 버튼 -->
						<c:if test="${empty faqGroup or not empty userId }">
						<div class="icon_gnb">
							<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
						</div>
						</c:if>
						<!-- //전체메뉴 아이콘 버튼 -->
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h2>게시판</h2>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM1401refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				
				<!-- 메시지 리스트 -->
				<ul id="message_list" class="message_list"></ul>
				<!-- //메시지 리스트 -->
				
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
	<script src="/resources/viewJs/vm/VM1401.js"></script>
	<!-- //viewJs import -->

</body>
</html>