<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
		<%@ include file="/pub/common_theme/vm/VM0701.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	
	<script src="/pub/resources/gsr/lib/js/swiper/swiper.min.js"></script>
	<!-- Initialize Swiper -->
	<script>
		// https://swiperjs.com/api/
		// https://swiperjs.com/demos/#history_API
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
			spaceBetween: 0,
			initialSlide: 2,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
		*/
		});
		
	</script>
</body>
</html>