<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 점포지역조회</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<form name="backForm">
			<input type="hidden" id="backParamData" name="backParamData" />
		</form>
		
		<!-- header -->
		<header>
			<div class="statusBar"></div>
			<div id="header_search">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous" >
						<a href="#" onClick="history.go(-1); return false;" title="이전화면" class="btn_previous" id="btn_previous" >이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>점포지역조회</h2>
					</div>
					<!-- //타이틀 -->
					
					<!-- 새로고침 버튼영역 -->
					<ul class="header_refesh_button">
						<li><a href="" class="btn_refresh" onclick="fn_VM9902refresh(); return false;">새로고침</a></li>
					</ul>
					<!-- //새로고침 버튼영역 -->
					
				</div>
				<!-- //툴바영역 -->
				
				<!-- 검색 영역 -->
				<div class="search">
					<div class="search_box">
						<input type="hidden" id="moreCnt" name="moreCnt" value="0">
						<input type="text" id="srcLocalArea" name="srcLocalArea" value="" maxlength="30" placeholder="점포지역을 입력하세요." onkeypress="if(event.keyCode==13) {fn_VM9902refresh(); return false;}"  />
						<a href="" onclick="javascript:fn_VM9902refresh(); return false;" class="btn_search_1">조회</a>
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
				<ul class="list" id="storeList">
					<li class="no_result"><p>점포 지역을 검색하세요.</p></li>
				</ul>
				<!-- //조회 결과 목록 -->
			</div>
			<!-- //조회 결과 영역 -->
			
			<!-- 하단 버튼 영역 -->
			<div class="bottom_btn_group" id="bottom_btn_group">
				<p id="btn_top" class="btn_top"><a href="" onclick="gfn_goToTop(); return false;" ><img src="${smCommonImagesPath}/btn_top.png" alt="위로가기" width="38" height="38" /></a></p>
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
	
	<!-- 이전 페이지에서 입력한 파라미터 세팅 -->
	<script type="text/javascript">
		var paramJson = new Object();
		paramJson.srcLocalAreaCd	= '${goLocalAreaParamData.srcLocalAreaCd}';
		paramJson.srcElec			= '${goLocalAreaParamData.srcElec}';
		paramJson.srcStartDt		= '${goLocalAreaParamData.srcStartDt}';
		paramJson.srcAddr			= '${goLocalAreaParamData.srcAddr}';
		paramJson.srcReadyDt		= '${goLocalAreaParamData.srcReadyDt}';
		paramJson.srcLocalAreaNm	= '${goLocalAreaParamData.srcLocalAreaNm}';
		paramJson.srcStrNm			= '${goLocalAreaParamData.srcStrNm}';
		paramJson.srcNewYn			= '${goLocalAreaParamData.srcNewYn}';
		paramJson.srcSido			= '${goLocalAreaParamData.srcSido}';
		paramJson.strType			= '${goLocalAreaParamData.strType}';
	</script>
	<!-- //이전 페이지에서 입력한 파라미터 세팅 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM9902.js"></script>
	<!-- //viewJs import -->
</body>
</html>