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
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common/vm/VM0801.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	
	<div id="notice_popup" class="wrap_popup">
		<!-- 공지사항 상세 팝업 -->
		<%@ include file="/pub/common/vm/VM0801_2.jsp"%>
		<!-- //공지사항 상세 팝업 -->
	</div>
	<!-- //wrap_popup -->

	<script>
		$(document).ready(function() {
			$('#notice_popup').popup();
		});
	</script>
</body>
</html>