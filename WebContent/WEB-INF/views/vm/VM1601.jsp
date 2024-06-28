<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 정기점검</title>
<%@ include file="../cm/header.jsp" %>

<script src="/resources/js/fullCalendar/main.min.js"></script>
<script src='/resources/js/fullCalendar/locale/ko.js'></script>
<link rel="stylesheet" type="text/css" media="screen"  href="/resources/css/fullCalendar/fullCalendar.min.css" />
<style>
	#container #calendar table a {color:#222;text-decoration:none !important;}
</style>

</head>

<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>
	
	<form name="movePageVM1602">
		<input type="hidden" id="movePageParam" name="movePageParam" />
	</form>
	
	<form name="movePageVM1603">
		<input type="hidden" id="movePageParam2" name="movePageParam" />
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<input type="hidden" id="returnStrNm" value="${returnParam.qStrNm}" />
		<input type="hidden" id="returnTabCd" value="${returnParam.tabCd}" />
		
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
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h2>정기점검</h2>
						</div>
						<!-- //타이틀 -->
						
						
					</div>
					<!-- //툴바영역 -->
					
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<section>
<!-- 					<h3 class="inner">점검일정</h3> -->
					<div class="graph_section" id="calendar"></div>
				</section>
				<section>
					<div class="search_list">
						<!-- 점검 리스트 -->
						<h3 class="inner">점검 목록(<span id="selectedDate"></span>)</h3>
						
						<!-- 탭영역 -->
						<input type="hidden" id="tabCd" value="S"/>
						<input type="hidden" id="srcDate" value=""/>
						<input type="hidden" id="moreCnt" name="moreCnt" value="0">
						<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="10">
						
						<div id="authEx" class="tab">
							<a href="#" id="tab_1" onclick="fn_VM1601changeTab('S'); return false;" class="tab_on">처리예정</a>
							<a href="#" id="tab_2" onclick="fn_VM1601changeTab('Y'); return false;" class="tab_off">처리완료</a>
							<a href="#" id="tab_3" onclick="fn_VM1601changeTab('P'); return false;" class="tab_off">미결</a>
						</div>
						<!-- 탭영역 -->
					
						<ul id="mntnc_list" class="message_list noLink2 "></ul>
						<!-- //점검 리스트 -->
						
						<!-- 하단 버튼 영역 -->
						<div class="bottom_btn_group" id="bottom_btn_group">
							<p id="btn_more" class="btn_more" style="display:none;">
								<a href="#" onclick="fn_VM1601showMoreList(); return false;">더보기</a>
							</p>
							<p id="btn_top" class="btn_top">
								<a href="" onclick="gfn_goToTop(); return false;" >
									<img src="/${smCommonImagesPath}/btn_top.png" alt="위로가기" width="38" height="38" />
								</a>
							</p>
						</div>
						<!-- //하단 버튼 영역 -->
					</div>
				</section>
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
	<script src="/resources/viewJs/vm/VM1601.js"></script>
	<!-- //viewJs import -->
</body>
</html>