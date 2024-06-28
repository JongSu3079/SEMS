<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 점포조회</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="shop_info_popup" class="wrap_popup">
		<!-- 점포정보 -->
		<%@ include file="/pub/common/cm/CM0201.jsp"%>
		<!-- //점포정보 -->
	</div>
	<!-- //wrap_popup -->
	<script>
	$(function() {
		$("#shop_info_popup").popup();
		
		$("div").addClass("shop_info_popup_open").trigger("click");
	});
	</script>
</body>
</html>