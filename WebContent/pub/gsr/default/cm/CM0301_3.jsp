<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page session="true"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 메인페이지</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301_3.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common/vm/VM0101.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
	$(function() {
		$(".btn_gnb").trigger("click");
	});
	</script>
</body>
</html>