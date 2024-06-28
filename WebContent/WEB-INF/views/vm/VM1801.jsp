<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 정기점검/AS 현황</title>
	<%@ include file="../cm/header.jsp" %>
</head>
<body>
<form name="movePage">
	<input type="hidden" id="movePageParam" name="movePageParam" />
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

					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>정기점검/AS 현황</h2>
					</div>
					<!-- //타이틀 -->

					<!-- 새로고침 버튼영역 -->
					<ul class="header_refesh_button">
						<li><a href="#" onclick="javascript:fn_VM1801refresh();" class="btn_refresh">새로고침</a></li>
					</ul>
					<!-- //새로고침 버튼영역 -->

				</div>
				<!-- //툴바영역 -->

				<!-- 검색 영역 -->
				<div class="search">
					<div class="search_box">
						<input type="hidden" id="moreCnt" name="moreCnt" value="0">
						<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="20">
						<input type="text" id="qStrNm" name="qStrNm" value="${returnParam.qStrNm}" maxlength="30" placeholder="점포명을 입력하세요." onkeypress="if(event.keyCode==13) {fn_VM1801search(); return false;}" />
						<a href="#" onclick="javascript:fn_VM1801search();" class="btn_search_1">조회</a>
					</div>
				</div>
				<!-- //검색 영역 -->

			</div>
		</header>
		<!-- //header -->

		<!-- container -->
		<div id="container">
			<!-- 탭영역 -->
			<input type="hidden" id="tabCd" value="0"/>
			<input type="hidden" id="retunTabCd" value="${returnParam.tabCd}"/>
			<div id="authEx" class="tab">
				<a href="#" id="tab_B" onclick="fn_VM1801ChangeTab('B'); return false;" class="tab_on">정기점검</a>
				<a href="#" id="tab_A" onclick="fn_VM1801ChangeTab('A'); return false;" class="tab_off">AS</a>
				<a href="#" id="tab_SB" onclick="fn_VM1801ChangeTab('SB'); return false;" class="tab_on">간판 정기점검</a>
				<a href="#" id="tab_SA" onclick="fn_VM1801ChangeTab('SA'); return false;" class="tab_off">간판 AS</a>
			</div>
			<!-- 탭영역 -->

			<!-- 메시지 리스트 -->
			<ul id="absList" class="message_list"></ul>
			<!-- //메시지 리스트 -->

			<!-- 하단 버튼 영역 -->
			<div class="bottom_btn_group" id="bottom_btn_group">
				<p id="btn_more" class="btn_more" style="display:none;">
					<a href="#" onclick="fn_VM1801showMoreList(); return false;">더보기</a>
				</p>
				<p id="btn_top" class="btn_top">
					<a href="" onclick="gfn_goToTop(); return false;" >
						<img src="/${smCommonImagesPath}/btn_top.png" alt="위로가기" width="38" height="38" />
					</a>
				</p>
			</div>
			<!-- //하단 버튼 영역 -->

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
<script src="/resources/viewJs/vm/VM1801.js"></script>
<!-- //viewJs import -->
</body>
</html>