<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 간판설정</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common_theme/vm/VM0601_2.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->

	<script>
	$(function() {
		$(".condition .cmToggle").cmToggle(1);
	});
	</script>
</body>
</html>