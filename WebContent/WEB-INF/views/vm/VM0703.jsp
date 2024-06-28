<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@page session="true"%>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">

<!-- chart 구현 lib -->
<script src="/resources/js/highcharts/highcharts.js"></script>
<script src="/resources/js/highcharts/modules/data.js"></script>
<script src="/resources/js/highcharts/modules/drilldown.js"></script>
<!-- /chart 구현 lib -->

<script>
	var authSp = "${authSp}";
	var pushNo = "${pushNo}";
</script>
<style>
	section:not(#wrapTop) {
	    margin: 2%;
	}
	#top{
		background-color:#eeeeee;
		padding:4%;
		overflow:hidden;
	}
	#showDetail{
		background-color:#cccccc;
		float:right;
		padding:1% 2%;
        border: solid black 1px;
        border-radius: 20px;
	}
	.alarmInfo{
		background-color: #eeeeee;
		padding: 4% 5%;
		margin:3% 2%;
	}
	#month {
		color:#777777;
		style:bold;
	}
	#alDetail p{
		font-size:15px;
	}
</style>
<head>
<title>에너지 관제시스템 모바일웹 - 대시보드</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<!-- 자동 로그인 정보 업데이트 -->
	<c:if test="${ alAuthChkFlag eq '1'}">
		<input type="hidden" id="alUserId" name="alUserId" value="${alUserId}"/>
		<input type="hidden" id="alUserPw" name="alUserPw" value="${alUserPw}"/>
		<input type="hidden" id="alAuthChk" name="alAuthChk" value="${alAuthChk}"/>
<%--		<input type="hidden" id="alarmList" value="${alarmList}"/>--%>
	</c:if>
	<input type="hidden" id="alAuthChkFlag" name="alAuthChkFlag" value="${alAuthChkFlag}"/>
	<!-- //자동 로그인 정보 업데이트 -->
	
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- 전체메뉴 -->
		<nav class="nav">
			<%@ include file="../cm/CM0301.jsp" %>
		</nav>
		<!-- //전체메뉴 -->
		
		<!-- trunk -->
		<div class="trunk">
			<!-- header -->
			<header>
				<div class="statusBar"></div>
				<div id="header">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->
					
					<!-- 점포명 -->
					<div class="shop_name">
						<div style="margin-right:28%;">
							<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
						</div>
					</div>
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<input type="hidden" id="hStrAddInfo"/>
					<!-- //점포명 -->
					
					<!-- 점포 정보 레이어 팝업 -->
					<div id="shop_info_popup"></div>
					<!-- //점포 정보 레이어 팝업 -->
					
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<section id="wrapTop">
					<!-- faq,안내 -->
					<div id="top">
						<div style="margin-bottom: 5px;">
							<h2>"<span id="strNm" style="font-weight: bold; font-size: 18px;"></span>" 경영주님</h2>
						</div>
						<div style="margin-bottom: 5px;">
							<span>매장에서 발생한 알람을 확인해주세요.</span>
						</div>
						<div>
							<a href="/faq/VM1421" id="showDetail" style="font-weight: bold">알람 발생시 대응방법</a><!-- onclick="fn_PageMoveToVM0102() -->
						</div>
					</div>
				</section>
				<section>
					<!-- nav -->
					<div id="nav" style="display: flex">
						<div id="totalDiv" style="padding: 0 10px 0 10px; background: #595959; margin-right: 10px; border: gray solid 1px">
							<span style="color: white" onclick="fn_VM0703getAlarmCategory('total')">전체(<span id="alarmCount"></span>)</span>
						</div>
						<div id="fridgeDiv" style="padding: 0 10px 0 10px; background: #a5a5a5; border: gray solid 1px">
							<span style="color: white" onclick="fn_VM0703getAlarmCategory('fridge')">냉장비</span>
						</div>
					</div>
				</section>

				<section style=" padding-bottom: 10px; box-shadow: 0 4px 4px -4px black;">
					<!-- 알람설정 버튼 -->
					<div id="navSub" style="display: flex; justify-content: space-between">
						<div>
							<span id="month" style="font-size: 12px; margin-left: 10px;">최근 30일간의 알람 내역을 제공합니다.</span>
						</div>
						<div>
							<span><a href="/menu/VM0901" id="alarmSettings" style="text-decoration:underline; color:blue; font-size: 12px; margin-right: 10px;">알람 설정</a></span>
						</div>
					</div>
				</section>

				<!-- 알람 리스트 -->
				<section>
					<ul id="alarmDataList" class="message_list">
					</ul>
				</section>
				<!-- // 알람 리스트 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv" >
		<div id="viewLoadingImg" ></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM0703.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>