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
</head>
<body>
	<form id="returnFrom" name="returnForm" method='post'>
	</form>
	
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>
	
	<form name="movePageVM1603">
		<input type="hidden" id="movePageParam" name="movePageParam" />
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- header -->
		<header>
			<div class="statusBar"></div>
			<div id="header_search">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous" >
						<a href="#" onClick="javascript:fn_VM1601Redirect();" title="이전화면" class="btn_previous" id="btn_previous" >이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>정기점검</h2>
					</div>
					<!-- //타이틀 -->
					
				</div>
				<!-- //툴바영역 -->
				
				<!-- 검색 영역 -->
				<div class="search">
					<div class="search_box">
						<input type="hidden" id="moreCnt" name="moreCnt" value="0">
						<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="10">
						<input type="text" id="srcStrNm" name="srcStrNm" value="" maxlength="30" placeholder="점포명을 입력하세요." onkeypress="if(event.keyCode==13) {fn_VM1602Search(); return false;}"  />
						<a href="" onclick="fn_VM1602Search(); return false;" class="btn_search_1">조회</a>
					</div>
				</div>
				<!-- //검색 영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
			<!-- 조회 결과 영역 -->
			<div class="search_list">
				<!-- 조회 결과 목록 -->
				<ul class="message_list" id="mntncList">
				</ul>
				<!-- //조회 결과 목록 -->
			</div>
			<!-- //조회 결과 영역 -->
			
			<!-- 하단 버튼 영역 -->
			<div class="bottom_btn_group" id="bottom_btn_group">
				<p id="btn_more" class="btn_more" style="display:none;">
					<a href="#" onclick="fn_VM1602showMoreList(); return false;">더보기</a>
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
	<!-- //wrap -->
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1602.js"></script>
	<!-- //viewJs import -->
</body>
</html>