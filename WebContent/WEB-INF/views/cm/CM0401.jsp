<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - ${smStr}조회</title>
<%@ include file="../cm/header.jsp" %>
</head>
<script>
	var menuId = '${paramData.menuId}';
</script>
<body>
	<!-- 자동 로그인 정보 업데이트 -->
	<c:if test="${ alAuthChkFlag eq '1'}">
		<input type="hidden" id="alUserId" name="alUserId" value="${alUserId}"/>
		<input type="hidden" id="alUserPw" name="alUserPw" value="${alUserPw}"/>
		<input type="hidden" id="alAuthChk" name="alAuthChk" value="${alAuthChk}"/>
	</c:if>
	<input type="hidden" id="alAuthChkFlag" name="alAuthChkFlag" value="${alAuthChkFlag}"/>
	<!-- //자동 로그인 정보 업데이트 -->
	
	<input type="hidden" id="authId" name="authId" value="${authId }"/>
	<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
	<input type="hidden" id="absUserFalg" name="absUserFalg" value="${ absUserFalg }">
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- 전체메뉴 -->
		<c:if test="${!backFlag}">
			<nav class="nav">
				<%@ include file="../cm/CM0301.jsp" %>
			</nav>
		</c:if>
		<!-- //전체메뉴 -->
		
		<input type="hidden" id="ref" value="${paramData.ref}" />
		
		<!-- trunk -->
		<div class="trunk">	
			<!-- header -->
			<header>
				<div class="statusBar"></div>
				<div id="header_search">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 이전화면 아이콘 버튼 -->
						<c:if test="${backFlag}">
							<div class="icon_previous" >
								<a href="#" onClick="history.go(-1); return false;" title="이전화면" class="btn_previous" id="btn_previous" ><img src="/${smCommonImagesPath}/btn_previous.png" alt="이전화면" /></a>
							</div>
						</c:if>
						<!-- //이전화면 아이콘 버튼 -->
						<!-- 메뉴 아이콘 버튼 -->
						<c:if test="${!backFlag}">
							<div class="icon_gnb">
								<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
							</div>
						</c:if>
						<!-- //메뉴 아이콘 버튼 -->
						
						<!-- 페이지 타이틀 -->
						<div class="title_header_search">
							<h2>${smStr}조회</h2>
						</div>
						<!-- //페이지 타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="" class="btn_refresh" onclick="fn_CM0401refresh(); return false;"><img src="/${smCommonImagesPath}/btn_refresh.png" alt="새로고침" /></a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
						<div class="shop_name" id="strDataCombo" ></div>
						<form name="form">
							<input type="hidden" id="hStrCd"/>
							<input type="hidden" id="hStrNm"/>
							<input type="hidden" id="backYn" value="N"/>
						</form>
					</div>
					<!-- //툴바영역 -->
					
					<!-- search -->
					<div class="search">
						<div class="search_box">
							<input type="hidden" id="moreCnt" name="moreCnt" value="0">
							<input type="hidden" id="pagingRowCnt" name="pagingRowCnt" value="10">
							<input type="text" id="qStrNm" name="qStrNm" value="" maxlength="30" placeholder="${smStrNm}/점포코드를 입력하세요." onkeypress="if(event.keyCode==13) {fn_CM0401refresh(); return false;}" />
							<a href="" onclick="javascript:fn_CM0401refresh(); return false;" class="btn_search_1"><img src="/${smCommonImagesPath}/btn_search_1.png" alt="조회" /></a>
						</div>
					</div>
					<!-- //search -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				
				<!-- 조회결과 -->
				<div class="search_list">
					
					<!-- list setting -->
					<div class="list_setting">
						<!-- 변수 -->
						<input type="hidden" id="ordSp" value="L"/>
						<!-- //변수 -->
						
						<!-- 정렬 기준 -->
						<div id="orderTg" class="order cmToggle">
							<span class="name tgBtn"><a href="#" onclick="">점포명순</a></span>
							<span class="new tgBtn"><a href="#" onclick="">최신순</a></span>
						</div>
						<!-- //정렬 기준 -->
						
						<!-- 검색 결과 개수 -->
						<div class="number_group">
							<div id="countDisplay" class="total">
								<span class="blue">-</span>
								<span>- / 총 -</span>
							</div>
						</div>
					</div>
					<!-- //list setting -->
					
					<!-- 리스트 -->
					<ul class="list st2" id="storeList">
						<li>
							<span class="list_text">
								<span>-</span>
								<span>-</span>
								<span class="point">-</span>
							</span>
							
							<div class="list_text_detail type1 height-transition-hidden">
								<div class="container_grp">
									<div class="address_area">
										<span class="address" id="pop_addr">-</span>
									</div>
									<div class="telephone_area">
										<a href="tel:010-0000-0000"><span class="telephone">-</span></a>
									</div>
								</div>
								<div class="btn_grp">
									<a href="" class="btn_single" onclick="">${smStr}확인</a>
								</div>
							</div>
						</li>
					</ul>
					<!-- //리스트 -->
				</div>
				<!-- //조회결과 -->
				
				<!-- 하단 버튼 영역 -->
				<div class="bottom_btn_group" id="bottom_btn_group">
					<p id="btn_more" class="btn_more"><a href="" onclick="fn_CM0401More(); return false;">더보기</a></p>
					<p id="btn_top" class="btn_top"><a href="" onclick="gfn_goToTop(); return false;">위로가기</a></p>
				</div>
				<!-- //하단 버튼 영역 -->
				
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/cm/CM0401.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>