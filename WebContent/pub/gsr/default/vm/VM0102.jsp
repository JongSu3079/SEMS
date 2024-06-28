<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 냉난방기 제어</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="air_hit_popup" class="wrap_popup">
		<!-- 냉난방기 제어 -->
		<%@ include file="/pub/common/vm/VM0102.jsp"%>
		<!-- //냉난방기 제어 -->
	</div>
	<!-- //wrap_popup -->
	<script>
	$(function() {
		$("#air_hit_popup").popup();
		$("#air_hit_popup .setting_area .cmToggle.n1").cmToggle(1);
		$("#air_hit_popup .setting_area .cmToggle.n2").cmToggle(0);
		
		$("div").addClass("air_hit_popup_open").trigger("click");
	});
	</script>
</body>
</html>