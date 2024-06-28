<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 점검요청</title>
<%@ include file="../cm/header.jsp" %>
</head>
<script>
	var reqType = "${paramData.reqType}";
</script>
<style>
	label{width:100%;}
</style>
<body>
<form id="returnFrom" name="returnForm" method='post'>
	<input type="hidden" id="qStrNm"	name="qStrNm"	value="${paramData.qStrNm}"/>
	<input type="hidden" id="tabCd"		name="tabCd"	value="${paramData.tabCd}"/>
</form>
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:fn_VM1202Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>점검확인/요청</h2>
					</div>
					<!-- //타이틀 -->
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<input type="hidden" id="hStrAddInfo"/>
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
			<!-- 컨테이너 영역 -->
			<div class="setting_area">
				<!-- 오류점검 요청 내용 입력 폼 -->
				<form id="inputForm" name="inputForm" method="post" onsubmit="return false;">
					<fieldset>
						<legend>오류점검 요청 내용 입력</legend>
						
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input type="text" 		id="scrStrNm" 	name="scrStrNm" title="점포명" 	value="${paramData.strNm }" readonly="readonly" />
								<input type="hidden" 	id="scrStrCd" 	name="scrStrCd" 				value="${paramData.strCd }"/>
								<input type="hidden" 	id="no" 		name="no" 						value="${paramData.no }"/>
								<input type="hidden" 	id="mode" 		name="mode" 					value="${paramData.mode }"/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>냉장비 점검확인</h3>
							<div class="devicecheckboxList" id="deviceList"></div>
						</div>
						
						<div class="form_row">
							<h3>
								오류점검 요청 내용
							</h3>
							<div class="inputBox">
								<select id="reqType" name="reqType" title="오류구분(필수항목)" <c:if test="${paramData.userId != paramData.reqId }">disabled</c:if> >
									<option value="">없음</option>
								</select>
							</div>
							<div class="inputBox" id="reqMsgDiv" style="display:none;">
								<textarea cols="5" rows="5" id="reqMsg" name="reqMsg" title="오류점검 요청 내용 직접입력" placeholder="오류점검 요청 내용을 입력하세요" style="resize: none;" <c:if test="${paramData.userId != paramData.reqId }">readonly="readonly"</c:if> >${paramData.reqContents}</textarea>
							</div>
						</div>
					</fieldset>
				</form>
				
				<c:if test="${paramData.userId == paramData.reqId }">
					<div class="btn_save">
						<p>
							<a onclick="javascript:fn_VM1202Save();">저장</a>
						</p>
					</div>
				</c:if>
				<!-- //오류점검 요청내용입력 폼 -->
			</div>
			<!-- //컨테이너 영역 -->
		</div>
	</div>
	<!-- //wrap -->
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1202.js"></script>
	<!-- //viewJs import -->
</body>
</html>