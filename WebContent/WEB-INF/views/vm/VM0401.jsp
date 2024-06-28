<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 제어이력</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>
	
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
			<header>
				<div class="statusBar"></div>
				<div id="header_search">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 전체메뉴 아이콘 버튼 -->
						<div class="icon_gnb">
							<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
						</div>
						<!-- //전체메뉴 아이콘 버튼 -->
						
						<!-- 페이지 타이틀 -->
						<div class="title_header_search">
							<h2>제어이력</h2>
						</div>
						<!-- //페이지 타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM0401refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
					
					<!-- 검색 영역 -->
					<div class="search">
						<div class="search_box">
							<input type="hidden" id="moreCnt" name="moreCnt" value="0">
							<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="3">
							<input type="text" id="qStrNm" name="qStrNm" value="" maxlength="30" placeholder="점포명/점포코드를 입력하세요." onkeypress="if(event.keyCode==13) {fn_VM0401search(); return false;}" />
							<a href="" onclick="javascript:fn_VM0401search(); return false;" class="btn_search_1">조회</a>
						</div>
					</div>
					<!-- //검색 영역 -->
					
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<div class="search_list">
					<!-- 탭영역 -->
					<input type="hidden" id="tabCd" value="0"/>
					<div id="authS" class="tab" style="display:none">
						<span class="tab_on">미조치</span>
					</div>
					<div id="authEx" class="tab">
						<a href="#" id="tabTempCtrl" onclick="fn_VM0401changeTab('0'); return false;" class="tab_on">온도제어</a>
						<a href="#" id="tabPeakCtrl" onclick="fn_VM0401changeTab('1'); return false;" class="tab_off">피크제어</a>
					</div>
					<!-- 탭영역 -->
					
					<!-- 제어 목록 -->
					<ul id="message_list" class="list noLink2"></ul>
					<!-- //제어 목록 -->
					
					<!-- 하단 버튼 영역 -->
					<div class="bottom_btn_group" id="bottom_btn_group">
						<p id="btn_more" class="btn_more" style="display:none;">
							<a href="" onclick="fn_VM0401showMoreList(); return false;">더보기</a>
						</p>
						<p id="btn_top" class="btn_top">
							<a href="" onclick="gfn_goToTop(); return false;" >
								<img src="/${smCommonImagesPath}/btn_top.png" alt="위로가기" width="38" height="38" />
							</a>
						</p>
					</div>
					<!-- //하단 버튼 영역 -->
				</div>
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
	<script src="/resources/viewJs/vm/VM0401.js"></script>
	<!-- //viewJs import -->
</body>
</html>