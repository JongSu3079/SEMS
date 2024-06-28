<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - ${smStr}등록</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<form name="goLocalAreaForm">
		<input type="hidden" id="goLocalAreaParamData" name="goLocalAreaParamData" />
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
			<header class="sub">
				<div class="statusBar"></div>
				<div id="header_sub">
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
							<h2>${smStr}등록</h2>
						</div>
						<!-- //타이틀 -->
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<!-- 점포등록 내용 입력 영역 -->
				<div class="setting_area">
					<!-- 점포등록 내용 입력 폼 -->
					<form id="inputForm" name="inputForm" action="#">
						<input type="hidden" id="savedStrCd" name="savedStrCd" />
						
						<!-- 입력 폼 -->
						<fieldset>
							<legend>${smStr}등록</legend>
							<div class="form_row">
								<h3>${smStrNm}</h3>
								<div class="inputBox">
									<input type="text" id="srcStrNm" name="srcStrNm" title="${smStrNm} 입력" placeholder="${smStrNm}을 입력하세요" style="width:calc(50% - 3px);" />
									<select id="srcNewYn" name="srcNewYn" class="right" style="width:calc(50% - 3px);">
										<option value="Y">신규점</option>
										<option value="N">기존점</option>
									</select>
								</div>
							</div>
							<div class="form_row">
								<h3>점포 종류</h3>
								<div class="inputBox">
									<select id="strType" name="strType">
										<option value="">선택</option>
										<option value="C" >GS 편의점(3.7미만)</option>
										<option value="D" >GS 편의점(3.7이상)</option>
										<option value="E" >GS 친환경</option>
										<option value="S" >GS 슈퍼</option>
									</select>
								</div>
							</div>
							<div class="form_row">
								<h3>주소</h3>
								<div class="inputBox">
									<select id="srcSido" name="srcSido" style="width:calc(30% - 3px);">
										<option>선택</option>
									</select>
									<input type="text" id="srcAddr" name="srcAddr" class="right" title="상세주소 입력" placeholder="상세주소를 입력하세요" style="width:calc(70% - 3px);" />
								</div>
							</div>
							<div class="form_row">
								<h3>점포지역</h3>
								<div class="inputBox">
									<input type="text" id="srcLocalAreaNm" name="srcLocalAreaNm" title="기상지역" onfocus="this.blur()" readonly="readonly" style="width:calc(100% - 33px);" />
									<input type="hidden" id="srcLocalAreaCd" name="srcLocalAreaCd" />
									<button type="button" id="searchLocalArea" class="iconSearch right">가상지역 조회</button>
								</div>
							</div>
							<div class="form_row">
								<h3>설치업체</h3>
								<div class="inputBox">
									<select id="srcElec" name="srcElec">
										<option>선택</option>
									</select>
								</div>
							</div>
							<div class="form_row">
								<h3>착공일자 / 준공일자</h3>
								<div class="inputBox">
									<input id="srcReadyDt" name="srcReadyDt" type="text" title="준공일" value="2018-07-24" style="width:calc(50% - 3px);" />
									<input id="srcStartDt" name="srcStartDt" type="text" title="착공일" value="2018-07-24" class="right" style="width:calc(50% - 3px);" />
								</div>
							</div>
						</fieldset>
						<!-- //입력 폼 -->
					</form>
					<!-- //점포등록 내용 입력 폼 -->
					
					<!-- 저장 버튼 영역 -->
					<div class="btn_save">
						<p><a href="#" onclick="javascript:fn_VM9901saveVM9901();">저장</a></p>
					</div>
					<!-- //저장 버튼 영역 -->
				</div>
				<!-- 점포등록 내용 입력 영역 -->
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
	
	<!-- 지역 선택 시 이전에 입력했던 파라미터 세팅 -->
	<script type="text/javascript">
		var paramJson = new Object();
		paramJson.srcLocalAreaCd	= '${backParamData.srcLocalAreaCd}';
		paramJson.srcElec			= '${backParamData.srcElec}';
		paramJson.srcStartDt		= '${backParamData.srcStartDt}';
		paramJson.srcAddr			= '${backParamData.srcAddr}';
		paramJson.srcReadyDt		= '${backParamData.srcReadyDt}';
		paramJson.srcLocalAreaNm	= '${backParamData.srcLocalAreaNm}';
		paramJson.srcStrNm			= '${backParamData.srcStrNm}';
		paramJson.srcNewYn			= '${backParamData.srcNewYn}';
		paramJson.srcSido			= '${backParamData.srcSido}';
		paramJson.srcAreaCd			= '${backParamData.srcAreaCd}';
		paramJson.srcAreaNm			= '${backParamData.srcAreaNm}';
		paramJson.srcSet			= '${backParamData.srcSet}';
		paramJson.strType			= '${backParamData.strType}';
	</script>
	<!-- //지역 선택 시 이전에 입력했던 파라미터 세팅 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM9901.js"></script>
	<!-- //viewJs import -->
</body>
</html>