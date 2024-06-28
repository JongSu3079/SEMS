<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 유지보수</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>

	<!-- 전체메뉴 -->
	<nav class="nav">
		<%@ include file="../cm/CM0301.jsp"%>
	</nav>
	<!-- //전체메뉴 -->

	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<!-- header -->
		<header>
			<div class="statusBar"></div>
			<div id="header_multilayer">
				<h1 class="blind">에너지 관제시스템</h1>

				<!-- 전체메뉴 아이콘 버튼 -->
				<div class="icon_gnb">
					<h2>
						<a title="전체메뉴" class="btn_gnb">메뉴</a>
					</h2>
				</div>
				<!-- //전체메뉴 아이콘 버튼 -->

				<!-- 점포명 -->
				<div class="shop_name">
					<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
				</div>
				<input type="hidden" id="hStrCd" />
				<input type="hidden" id="hStrNm" />
				<input type="hidden" id="hStrAddInfo" />
				<!-- //점포명 -->

				<!-- 점포 정보 레이어 팝업 -->
				<div id="shop_info_popup"></div>
				<!-- //점포 정보 레이어 팝업 -->

				<!-- 헤더 우측 아이콘 버튼 그룹 -->
				<ul class="header_button_group">
					<!-- 복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
					<c:if test="${authSp ne 'S' || ( authSp eq 'S' && storeListCnt ne 1 ) }">
						<li><a href="#" onclick="javascript:gfn_storeSearch( 'energyAnalMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
					</c:if>
					<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
					<c:if test="${authSp ne 'S'}">
						<!-- 알람 표시 영역 -->
						<li>
							<a href="/VM0701Redirect" class="btn_message"> <span>알람</span>
								<span id="alarmNewImg" style="display: none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
							</a>
						</li>
						<!-- //알람 표시 영역 -->
					</c:if>
				</ul>
				<!-- //헤더 우측 아이콘 버튼 그룹 -->
			</div>
			<div id="header_sub">

				<!-- 툴바영역 -->
				<div class="toolbar">

					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>유지보수</h2>
					</div>
					<!-- //페이지 타이틀 -->

					<!-- 새로고침 버튼영역 -->
					<ul class="header_new_button">
						<li><a href="#" id="newAsClosing" onclick="javascript:fn_VM1001newAsClose();">신규작성</a></li>
					</ul>
					<!-- //새로고침 버튼영역 -->

				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		<!-- container -->
		<div id="container">

			<!-- 리스트 -->
			<div class="search_list">
				<ul class="list st3" id="asCloseList">
					<li class="no_result"><p>조회된 내용이 없습니다.</p></li>
				</ul>
			</div>
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
	<script src="/resources/viewJs/vm/VM1001.js"></script>
	<!-- //viewJs import -->
</body>
</html>