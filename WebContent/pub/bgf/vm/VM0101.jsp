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
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common/vm/VM0101.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	
	<div id="air_hit_popup" class="wrap_popup">
		<!-- 냉난방기 제어 -->
		<%@ include file="/pub/common/vm/VM0102.jsp"%>
		<!-- //냉난방기 제어 -->
	</div>
	<!-- //wrap_popup -->
	
	<div id="sign_popup" class="wrap_popup">
		<!-- 간판 제어 -->
		<%@ include file="/pub/common/vm/VM0103.jsp"%>
		<!-- //간판 제어 -->
	</div>
	<!-- //wrap_popup -->
	
	<script>
		$(document).ready(function() {
			$("#air_hit_popup").popup();
			$("#air_hit_popup .setting_area .cmToggle.n1").cmToggle(1);
			$("#air_hit_popup .setting_area .cmToggle.n2").cmToggle(0);

			$("#sign_popup").popup();
			$("#sign_popup .setting_area .cmToggle.n1").cmToggle(1);
		});
	</script>
</body>
</html>