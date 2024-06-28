<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 알림메시지함</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="notice_popup" class="wrap_popup">
		<!-- 공지사항 상세 팝업 -->
		<%@ include file="/pub/common/vm/VM0801_2.jsp"%>
		<!-- //공지사항 상세 팝업 -->
	</div>
	<!-- //wrap_popup -->
	<script>
	$(function() {
		$("#notice_popup").popup();
		
		$("div").addClass("notice_popup_open").trigger("click");
	});
	</script>
</body>
</html>