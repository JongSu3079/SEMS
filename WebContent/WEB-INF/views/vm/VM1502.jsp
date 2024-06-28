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
	var asResult = '${goDetailParamData.asResult}'
</script>
<body>
<form id="returnFrom" name="returnForm" method='post'>
	<input type="hidden" id="qStrNm"		name="qStrNm"		value="${goDetailParamData.qStrNm}"/>
	<input type="hidden" id="tabCd"			name="tabCd"		value="${goDetailParamData.tabCd}"/>
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
						<a href="javascript:fn_VM1502Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>${titleTxt}</h2>
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
					<input type="hidden" id="no"			name="no"			value="${goDetailParamData.no}"/>
					<input type="hidden" id="strCd"			name="strCd"		value="${goDetailParamData.strCd}"/>
					<input type="hidden" id="asEngineerNm"	name="asEngineerNm"	value="${goDetailParamData.asEngineerNm}"/>
					<input type="hidden" id="temonId"		name="temonId"		value="${goDetailParamData.temonId}"/>
					<input type="hidden" id="temonType"		name="temonType"	value="${goDetailParamData.temonType}"/>
					<input type="hidden" id="temonPort"		name="temonPort"	value="${goDetailParamData.portNo}"/>
					<input type="hidden" id="deviceLoc"		name="deviceLoc"	value="${goDetailParamData.deviceLoc}"/>
					<input type="hidden" id="asResult"		name="asResult"		value="${goDetailParamData.asResult}"/>
					<!-- //파라미터 영역 -->
					
					<!-- 입력 폼 -->
					<fieldset>
						<legend>알람 조치</legend>
						<div class="info">
							<div class="info_title">
								<h3>${goDetailParamData.moduleNm}</h3>
								<span class="notification"> 알람[${goDetailParamData.alarmCnt}]</span>
							</div>
							
							<div class="info_detail">
								<span>
									점포명 : ${goDetailParamData.strNm}<br />
									장애일시 : ${goDetailParamData.startDate} ~ ${goDetailParamData.endDate}<br />
									장애내용 : ${goDetailParamData.message}
								</span>
							</div>
						</div>
						<div class="form_row">
							<h3>담당자</h3>
							<div class="inputBox">
								<input id="as_engineer" name="asEngineer" type="text" title="담당자 입력" value="${asEngineerNm}"/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>알람 원인</h3>
							<div id="asNoteArea" class="inputBox">
								<textarea id="as_note" name="asNote" cols="5" rows="5" title="조치 내용 직접입력"></textarea>
							</div>
						</div>
					</fieldset>
					<!-- //입력 폼 -->
				</form>
				<!-- //조치내역입력 폼 -->
				
				<!-- 저장 버튼 영역 -->
				<div class="btn_save">
					<p><a href="#" onclick="fn_VM1502save(); return false;">저장</a></p>
				</div>
				<!-- //저장 버튼 영역 -->
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
	<script src="/resources/viewJs/vm/VM1502.js"></script>
	<!-- //viewJs import -->
</body>
</html>