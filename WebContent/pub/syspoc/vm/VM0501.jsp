<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 냉장비 상태조회</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common_theme/vm/VM0501.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
	$.fn.alarm_control_open = function() {
		var alarm_control = $(this).parents("li").find(".alarm_control");
		alarm_control.addClass("open");
		
		var closeBtn = $(this).parents("li").find(".alarm_control .end");
		closeBtn.off("click");
		closeBtn.on("click", function() {
			alarm_control.removeClass("open");
		});
	}
	</script>
</body>
</html>