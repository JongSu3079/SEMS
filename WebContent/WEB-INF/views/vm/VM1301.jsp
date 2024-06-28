<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - QR코드 스캔</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
	
	<!-- 전체메뉴 -->
	<nav class="nav">
		<%@ include file="../cm/CM0301.jsp" %>
	</nav>
	<!-- //전체메뉴 -->
	
	<!-- 전체메뉴 아이콘 버튼 -->
	<div class="icon_gnb">
		<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
	</div>
	<!-- //전체메뉴 아이콘 버튼 -->

	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1301.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>