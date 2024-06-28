<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 공지</title>
<%@ include file="../cm/header.jsp" %>

</head>
<body>
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
						
						<!-- 전체메뉴 아이콘 버튼 -->
						<div class="icon_gnb">
							<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
						</div>
						<!-- //전체메뉴 아이콘 버튼 -->
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h2>공지</h2>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM0801refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				
				<!-- 공지사항 목록 영역 -->
				<form action="javascript:showList(null)">
					<input type="hidden" id="searchColumn" value="title">
					<input type="hidden" id="page">
					<!-- 목록 -->
					<ul class="notice_list" id="notice_list" ></ul>
					<!-- //목록 -->
				</form>
				<!-- //공지사항 목록 영역 -->
				
				<!-- 공지사항 상세 내용 레이어 팝업 -->
				<div id="notice_popup" class="wrap_popup" style="display:none;">
					
					<!-- 팝업 타이틀 영역 -->
					<div class="header_popup">
						<h2 class="title_popup">공지사항</h2>
						<a href="#" class="notice_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
					</div>
					<!-- //팝업 타이틀 영역 -->
					
					<!-- 팝업 컨테이너 영역 -->
					<div class="container_popup">
						<div class="notice_popup">
							<h3><span id="title"></span></h3>
							<p class="write_titme_popup"><span id="pub_dttm"></span></p>
							<p class="notice_detail"><span id="contents"></span></p>
						</div>
					</div>
					<!-- //팝업 컨테이너 영역 -->
					
				</div>
				<!-- //공지사항 상세 내용 레이어 팝업 -->
				
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
	<script src="/resources/viewJs/vm/VM0801.js"></script>
	<!-- //viewJs import -->

</body>
</html>