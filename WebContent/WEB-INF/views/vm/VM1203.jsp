<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.ui.ModelMap"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 조치내역입력</title>
<%@ include file="../cm/header.jsp" %>
</head>
<script>
	var authSp = "${paramData.authSp}";
</script>
<body>
<form id="returnFrom" name="returnForm" method='post'>
	<input type="hidden" id="qStrNm"		name="qStrNm"		value="${paramData.qStrNm}"/>
	<input type="hidden" id="tabCd"			name="tabCd"		value="${paramData.tabCd}"/>
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
						<a href="javascript:fn_VM1203Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>오류점검요청 조치</h2>
					</div>
					<!-- //타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
			<!-- 조치내역 영역 -->
			<div class="setting_area">
				<!-- 조치내역입력 폼 -->
				<form id="inputForm" name="inputForm" action="#">
					
					<!-- 파라미터 영역 -->
					<input type="hidden" id="no"			name="no"			value="${paramData.no}"/>
					<input type="hidden" id="strCd"			name="strCd"		value="${paramData.strCd}"/>
					<input type="hidden" id="strNm"			name="strNm"		value="${paramData.strNm}"/>
					<!-- //파라미터 영역 -->
					
					<!-- 입력 폼 -->
					<fieldset>
						<legend>오류점검요청 조치</legend>
						<div class="info">
							<div class="info_title">
								<h3>${paramData.strNm}</h3>
							</div>
							
							<div class="info_detail">
								<span>
									요청기사 : ${paramData.userNm} [${paramData.vendorNm}]<br />
									요청일자 : ${paramData.reqDttm}<br />
									요청내용 : [${paramData.reqTypeStr}] ${paramData.reqContents}<br />
								</span>
							</div>
						</div>
						
						<div class="form_row">
							<h3>냉장비 점검확인</h3>
							<div class="devicecheckboxList" id="deviceList"></div>
						</div>
						<c:if test="${paramData.solve eq 'n'}">
						<div class="form_row">
							<h3>
								처리예정일<span class="criticalItems" >필수항목</span>
							</h3>
							<div class="inputBox">
								<input id="scrDue" type="text" name="due" placeholder="2017-01-11" value="${paramData.due}">
								<input id="solve" type="text" name="solve" value="${paramData.solve}" style="display:none;">
							</div>
						</div>
						
						<div class="btn_save" id="btn_save">
							<p><a href="#" onclick="fn_VM1203Due()">처리예정일 수정</a></p>
						</div>
						</c:if>
						
						<div class="form_row">
							<h3>
								조치내용<span class="criticalItems">필수항목</span>
							</h3>
							<div class="inputBox">
								<textarea cols="5" rows="5" id="solveMsg" name="solveMsg" title="조치내용 직접입력(필수항목)" placeholder="조치내용을 입력하세요" style="resize: none;">${paramData.solveContents}</textarea>
							</div>
						</div>
					</fieldset>
					<!-- //입력 폼 -->
				</form>
				<!-- //조치내역입력 폼 -->
				
				<!-- //저장 버튼 영역 -->
				<!-- 조치완료 버튼 영역 -->
				<div class="btn_save" id="btn_save">
					<p><a href="#" onclick="fn_VM1203Save(); return false;">처리완료</a></p>
				</div>
				<!-- 조치완료 버튼 영역 -->
			</div>
			<!-- //조치내역 영역 -->
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
	<script src="/resources/viewJs/vm/VM1203.js"></script>
	<!-- //viewJs import -->
</body>
</html>