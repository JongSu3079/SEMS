<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 사용량</title>
<%@ include file="../cm/header.jsp" %>

<!-- chart 구현 lib -->
<script src="/resources/js/highcharts/highcharts.js"></script>
<script src="/resources/js/highcharts/modules/data.js"></script>
<script src="/resources/js/highcharts/modules/drilldown.js"></script>
<!-- /chart 구현 lib -->

</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" 	name="paramData" />
		<input type="hidden" id="yyyyMm" 		name="yyyyMm"  />
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
				<div id="header_multilayer">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->
					
					<!-- 점포명 -->
					<div class="shop_name">
						<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
					</div>
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<input type="hidden" id="hStrAddInfo"/>
					<!-- //점포명 -->
					
					<!-- 점포 정보 레이어 팝업 -->
					<div id="shop_info_popup"></div>
					<!-- //점포 정보 레이어 팝업 -->
					
					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
						<c:if test="${authSp ne 'S' || ( authSp eq 'S' && storeListCnt ne 1 ) }">
							<li><a href="#" onclick="javascript:gfn_storeSearch( 'energyAnalMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
						</c:if>
						<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
						
						<c:if test="${authSp ne 'S'}">
							<!-- 알람 표시 영역 -->
							<li>
								<a href="/VM0701Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
								</a>
							</li>
							<!-- //알람 표시 영역 -->
						</c:if>
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->
					
				</div>
				<div id="header_sub">
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h3>전력사용현황</h3>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="" class="btn_refresh" onclick="javascript:fn_VM0201refresh(); return false;"><img src="/${smCommonImagesPath}/btn_refresh.png" alt="새로고침" /></a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				<section>
					<h3 class="inner">계약종별 : <span id="elecKind"></span> / <span id="contPower"></span></h3>
				</section>
				<!-- 그래프 section -->
				<section>
					<h3 class="inner">월별 계약전력 대비 수요</h3>
					<div class="graph_section" id="container_graph"></div>
				</section>
				<!-- //그래프 section -->
				
				<!-- 데이터 테이블 section -->
				<section>
					<div class="amountInfo2">
						<!-- 냉난방 가동시간 -->
						<h3 class="inner">월별 상세 계약전력 대비 수요<br><span style="font-size: 10px; color: red;">(날짜 클릭시 일별 전력 사용량 확인)</span></h3>
						<div class="amountBox">
							<div class="tblBox">
								<table>
									<colgroup>
										<col />
										<col style="width:18%;" />
										<col style="width:23%;" />
										<col style="width:18%;" />
										<col style="width:25%;" />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">년월</th>
										<th scope="col" id="contTotalOrElec">계약<br>전력<br>(kW)</th>
										<th scope="col" id="usageOrMaxDemand">최대수요<br>전력<br>(kW)</th>
										<th scope="col">여유<br>전력<br>(kW)</th>
										<th scope="col">최대냉난방<br>전력<br>(kW)</th>
									</tr>
									</thead>
									<tbody id="demandMonthDetail">
									</tbody>
								</table>
							</div>
						</div>
						<!-- //냉난방 가동시간 -->
					</div>
				</section>
				<!--//데이터 테이블 section -->
				
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
	<script src="/resources/viewJs/vm/VM0201.js"></script>
	<!-- //viewJs import -->
</body>
</html>