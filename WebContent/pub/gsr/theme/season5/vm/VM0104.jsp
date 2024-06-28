<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 간판 제어</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="introduce_popup" class="wrap_popup">
		<!-- 간판 제어 -->
		<%@ include file="/pub/common/vm/VM0104.jsp"%>
		<!-- //간판 제어 -->
	</div>
	<!-- //wrap_popup -->
	<script>
	$(function() {
		$("#introduce_popup").popup();
		$("#introduce_popup .row_list .list li a").off("click");
		$("#introduce_popup .row_list .list li a").on("click", function() {
			window.open(this.href,'_blank');
			return false;
		});
		
		$("div").addClass("introduce_popup_open").trigger("click");
	});
	</script>
</body>
</html>