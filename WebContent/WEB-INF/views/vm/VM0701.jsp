<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 알람</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<form name="goDetailFrm">
		<input type="hidden" id="goDetailParamData" name="goDetailParamData" />
	</form>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
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
							<h2>알람</h2>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM0701refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
					
					<!-- 검색 영역 -->
					<div class="search">
						<div class="search_box">
							<input type="hidden" id="moreCnt" name="moreCnt" value="0">
							<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="3">
							<input type="text" id="qStrNm" name="qStrNm" value="${returnParam.qStrNm}" maxlength="30" placeholder="점포명을 입력하세요." onkeypress="if(event.keyCode==13) {fn_VM0701search(); return false;}" />
							<a href="" onclick="javascript:fn_VM0701search(); return false;" class="btn_search_1">조회</a>
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
				<div id="authS" class="tab" style="display:none">
					<span class="tab_on">미조치</span>
				</div>
				<div id="authEx" class="tab">
					<a href="#" id="tabProcess" onclick="fn_VM0701changeTab('0',click); return false;" class="tab_on">미조치</a>
					<c:if test="${authSp ne 'S'}">
						<a href="#" id="tabRecovery" onclick="fn_VM0701changeTab('2',click); return false;" class="tab_off">복구완료</a>
						<a href="#" id="tabResult" onclick="fn_VM0701changeTab('1',click); return false;" class="tab_off">조치완료</a>
					</c:if>
				</div>
				<!-- 탭영역 -->
				
				<div class="r_radio" >
					<input type="radio" id="all" name="ownerType" value="" checked>
					<label for="all">전체</label>
					
					<input type="radio" id="normal" name="ownerType" value="normal" >
					<label for="normal">일반 점포</label>
					
					<input type="radio" id="special" name="ownerType" value="special" >
					<label for="special">특수 점포</label>
					
				</div>
				
				<!-- 메시지 리스트 -->
				<ul id="message_list" class="message_list"></ul>
				<!-- //메시지 리스트 -->
				
				<!-- 점포 정보 레이어 팝업 -->
				<div id="shop_info_popup"></div>
				<!-- //점포 정보 레이어 팝업 -->
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
	<script src="/resources/viewJs/vm/VM0701.js"></script>
	<!-- //viewJs import -->
</body>
</html>