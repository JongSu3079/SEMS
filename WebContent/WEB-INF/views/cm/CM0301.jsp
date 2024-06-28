<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="smCompanyCd"><spring:message code="companyCd"/></c:set>
<c:set var="smCommonImagesPath">
	<c:choose>
		<c:when test="${ smCompanyCd eq 'gsr' }">images_theme</c:when>
		<c:otherwise>images</c:otherwise>
	</c:choose>
</c:set>
<div class="statusBar"></div>
<h2 class="blind">전체메뉴</h2>
<div class="gnb">
	<div class="header_gnb">
		<p class="id_full_name">${userVo.getUserId()}</p>
		<p class="btn_setting">
			<a href="/menu/VM0901" title="설정">
				<img src="/${smCommonImagesPath}/icon_left_000009.png" width="20" height="20" alt="" class="icon_left">
			</a>
		</p>
		<p class="btn_close_all_menu"><a href="" title="닫기" ><img src="/${smCommonImagesPath}/btn_close_all_menu.png" alt="닫기" /></a></p>
	</div>
	<ul id="all_menu" class="all_menu">
	</ul>
</div>

<!-- viewJs import -->
<script src="/resources/viewJs/cm/CM0301.js"></script>
<!-- //viewJs import -->
