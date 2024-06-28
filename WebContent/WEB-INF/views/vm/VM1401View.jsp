<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 게시판</title>
<%@ include file="../cm/header.jsp" %>

<style>
	#summernote video {width: 100% !important;}
	#summernote img {width: 100% !important;}
</style>
<script>
	var contents = '${contents}';
</script>
</head>
<body>
<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- trunk -->
		<div class="trunk">
			<!-- header -->
			<header class="sub">
				<div class="statusBar"></div>
				<div id="header_sub">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 이전화면 아이콘 버튼 -->
						<div class="icon_previous">
							<a href="#" title="이전화면" class="btn_previous" onclick="history.back(-1); return false;"><img src="/${smCommonImagesPath}/btn_previous.png" alt="이전화면" /></a>
						</div>
						<!-- //이전화면 아이콘 버튼 -->
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h2>${title}</h2>
						</div>
						<!-- //타이틀 -->
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<input type="hidden" id="faqId" value="${faqId}" />
			
			<!-- container -->
			<div id="container">
				<div class="container_grp" style="word-break:keep-all;">
<%-- 					<textarea id="summernote" name="editordata" style="height:100%;width:100%;background-color:#8080801d;">${contents}</textarea> --%>
					<div id="summernote" style="height:100%;width:100%;background-color:#8080801d;"></div>
					
<!-- 					<img src="/images_theme/faq/5/1/00.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/01.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/02.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/03.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/04.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/05.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/06.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/07.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/08.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/09.PNG" /> -->
<!-- 					<img src="/images_theme/faq/5/1/10.PNG" /> -->
				</div>
			</div>
			<div id="imageZoomDiv" style="background-color:white;">
				<img id="imageZoomImg" class="imageZoomDiv_close" />
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1401View.js"></script>
	<!-- //viewJs import -->
	
</body>
</html>