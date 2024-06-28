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
				<div id="header_multilayer">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->
					
					<!-- 점포명 -->
					<div class="shop_name">
						<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
					</div>
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<input type="hidden" id="hStrAddInfo"/>
					<!-- //점포명 -->
					
					<!-- 점포 정보 레이어 팝업 -->
					<div id="shop_info_popup"></div>
					<!-- //점포 정보 레이어 팝업 -->
					
					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 점포사용자는 노출하지 않음 -->
						<c:if test="${authSp ne 'S' || ( authSp eq 'S' && storeListCnt ne 1 ) }">
							<li><a href="#" onclick="javascript:gfn_storeSearch( 'finishMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
						</c:if>
						<!-- //점포사용자는 노출하지 않음 -->
						<c:if test="${authSp ne 'S'}">
							<li>
							<a href="/VM0701Redirect" class="btn_message">
								<span>알람</span>
								<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
							</a>
						</li>
						</c:if>
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->
				</div>
				
				<div id="header_sub">
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h3>마감</h3>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_new2_button">
							<li><a href="#" id="newAsClosing" onclick="javascript:fn_VM1901newFinish();">신규작성</a></li>
						</ul>
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM1901refresh(); return false;" class="btn_refresh"><img src="/${smCommonImagesPath}/btn_refresh.png" alt="새로고침" /></a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
						<input type="hidden" id="moreCnt" name="moreCnt" value="0">
						<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="20">
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<!-- 탭영역 -->
				<input type="hidden" id="tabCd" value="0"/>
				<input type="hidden" id="retunTabCd" value="${returnParam.tabCd}"/>
				<div id="authEx" class="tab">
					<a href="#" id="tab_B" onclick="fn_VM1901ChangeTab('B'); return false;" class="tab_on">유지보수</a>
<%--					<a href="#" id="tab_A" onclick="fn_VM1901ChangeTab('A'); return false;" class="tab_off">구축</a>--%>
				</div>
				<!-- 탭영역 -->
				
				<!-- 메시지 리스트 -->
				<ul id="absList" class="message_list"></ul>
				<!-- //메시지 리스트 -->
				
				<!-- 하단 버튼 영역 -->
				<div class="bottom_btn_group" id="bottom_btn_group">
					<p id="btn_more" class="btn_more" style="display:none;">
						<a href="#" onclick="fn_VM1901showMoreList(); return false;">더보기</a>
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
	<script src="/resources/viewJs/vm/VM1901.js"></script>
	<!-- //viewJs import -->
</body>
</html>