<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 간판</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
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
							<li><a href="#" onclick="javascript:gfn_storeSearch( 'signControlMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
						</c:if>
						<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->

						<!-- 냉장비 알람 표시 영역 -->
						<c:if test="${authSp ne 'S' && authSp ne 'G'}">
							<li>
								<a href="/VM0701Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
								</a>
							</li>
						</c:if>
						<!-- // 냉장비 알람 표시 영역 -->

						<!-- 간판 알람 표시 영역 -->
						<c:if test="${authSp eq 'G'}">
							<li>
								<a href="/VM0704Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
								</a>
							</li>
						</c:if>
						<!-- // 간판 알람 표시 영역 -->
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->
				</div>
				<div id="header_sub">
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h3>간판</h3>
						</div>
						<!-- //타이틀 -->
						
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM0601refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
						
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
			
			<!-- container -->
			<div id="container">
				
				<!-- 간판 상태 설정 section -->
				<%@ include file="../vm/VM0602.jsp" %>
				<!-- //간판 상태 설정 section -->
				
				<!-- 시간 정보 section -->
				<section>
					<h3 class="inner" id="lightMsg" style="display:none;">조명 상태 : <span id="lightState" ></span></h3>
					<h3 class="inner">간판 시간</h3>
					<h4 class="blind">위젯으로 보기</h4>
					<div class="time_groupBox">
						<ul id="timeDivGrp" class="time_group">
							<li id="timeDiv0" class="sunrise_time">
								<span class="blind">일출시간</span>
								<span id="setTime0">-</span>
							</li>
							<li id="timeDiv1" class="off_time">
								<span class="blind">OFF시간</span>
								<span id="setTime1">-</span>
							</li>
							<li id="timeDiv2" class="on_time">
								<span class="blind">ON시간</span>
								<span id="setTime2">-</span>
							</li>
							<li id="timeDiv3" class="sunset_time">
								<span class="blind">일몰시간</span>
								<span id="setTime3">-</span>
							</li>
						</ul>
					</div>
					<c:if test="${authSp ne 'I' and authSp ne 'S'}">
						<h3 class="inner">간판설정 변경</h3>
						<div class="setting_area">
							<!-- 점포등록 내용 입력 폼 -->
							<form id="inputForm" name="inputForm" action="#">
								<!-- 입력 폼 -->
								<fieldset>
									<legend>간판설정 변경</legend>
									<div class="form_row">
										<h3 class="blind">현재 간판설정</h3>
										<div class="inputBox">
											<select id="scrSignOper" name="scrSignOper">
												<option>선택</option>
												<option value="1">24시간 ON</option>
												<option value="2">일출몰 기준</option>
												<option value="3">사용자 정의</option>
											</select>
											<input type="hidden" id="scrSignOperLog" name="scrSignOperLog"/>
										</div>
									</div>
									<div class="form_row" id="signTime" style="display:none">
										<h3>
											ON/OFF 시간
										</h3>
										<div class="inputBox">
											<input type="text" id="signOn" name="signOn" value="${detailData.signOn }" style="width: calc(50% - 3px);" />
											<input type="text" id="signOff" name="signOff" value="${detailData.signOff }" class="right" style="width: calc(50% - 3px);" />
											<input type="hidden" id="signOnOffLog" name="signOnOffLog"/>
										</div>
									</div>
									<div class="form_row" id="signDely" style="display:none">
										<h3>
											간판 켜기 보정값/간판 끄기 보정값
										</h3>
										<div class="inputBox">
											<input type="number" id="signOnDely" name="signOnDely" value="${detailData.signOnDely }" style="width: calc(50% - 3px);" />
											<input type="number" id="signOffDely" name="signOffDely" value="${detailData.signOffDely }" class="right" style="width: calc(50% - 3px);" />
											<input type="hidden" id="signDelyLog" name="signDelyLog"/>
										</div>
									</div>
								</fieldset>
								<!-- //입력 폼 -->
							</form>

							<!-- 저장 버튼 -->
							<div class="btn_save">
								<p><a href="#" onclick="fn_VM0601SaveSignEnv(); return false;">저장</a></p>
							</div>
							<!-- //저장 버튼 -->
						</div>
						<!-- //점포등록 내용 입력 폼 -->
					</c:if>

					<c:if test="${authSp ne 'I' and authSp ne 'G' and authId ne 3}">
						<h3 class="inner">기상정보 연동제어 설정</h3>
						<div class="setting_area" style="width: 100%;">
							<!-- 점포등록 내용 입력 폼 -->
							<form id="forecastForm" name="forecastForm" action="#">
								<!-- 입력 폼 -->
								<fieldset>
									<legend>기상정보 연동제어 설정</legend>
									<div class="form_row" style="display: flex; position: relative; justify-content: center; align-items: center;">
										<div class="forecast_active" style="position: relative; display: inline-block; bottom: 2px; right: 20px;">
											<h2 id="active_N" style="font-weight: bold">비활성</h2>
										</div>
										<div style="position: relative; display: inline-block;">
											<input type="checkbox" id="activeYn" value="N" hidden>
											<label for="activeYn" class="toggleSwitch">
												<span class="toggleButton"></span>
											</label>
										</div>
										<div class="forecast_active" style="position: relative; display: inline-block; bottom: 2px; left: 20px;">
											<h2 id="active_Y">활성</h2>
										</div>
									</div>

									<div class="forecast" style="display: inline;">
										<p style="text-align: center; margin-top: 10px; font-size: 12px;">기상정보 연동제어를 위한 기상 상태를 선택하십시오.</p>
									</div>

									<div class="form_row" style="margin-top: 30px; text-align: center;">
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="cloudSmallYn"><span style="color: black;">구름조금</span></button>
											<input type="hidden" id="hCloudSmallYn">
										</div>
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="cloudBigYn"><span style="color: black;">구름많음</span></button>
											<input type="hidden" id="hCloudBigYn">
										</div>

									</div>
									<div class="form_row" style="text-align: center;">
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="cloudyYn"><span style="color: black;">흐림</span></button>
											<input type="hidden" id="hCloudyYn">
										</div>
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="rainyYn"><span style="color: black;">비</span></button>
											<input type="hidden" id="hRainyYn">
										</div>

<%--										<div class="forecast">--%>
<%--											<button type="button" class="forecast_button" name="weatherKind" id="rainySunYn"><span style="color: black;">비온후 갬</span></button>--%>
<%--											<input type="hidden" id="hRainySunYn">--%>
<%--										</div>--%>
									</div>
									<div class="form_row" style="text-align: center;">
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="snowyYn"><span style="color: black;">눈</span></button>
											<input type="hidden" id="hSnowyYn">
										</div>
										<div class="forecast">
											<button type="button" class="forecast_button" name="weatherKind" id="rainySnowYn"><span style="color: black;">비/눈</span></button>
											<input type="hidden" id="hRainySnowYn">
										</div>

<%--										<div class="forecast">--%>
<%--											<button type="button" class="forecast_button" name="weatherKind" id="rainyShowerYn"><span style="color: black;">소나기</span></button>--%>
<%--											<input type="hidden" id="hRainyShowerYn">--%>
<%--										</div>--%>

<%--										<div class="forecast">--%>
<%--											<button type="button" class="forecast_button" name="weatherKind" id="snowyRainYn"><span style="color: black;">눈/비</span></button>--%>
<%--											<input type="hidden" id="hSnowyRainYn">--%>
<%--										</div>--%>
									</div>
									<div class="form_row" style="text-align: center;">
										<div class="forecast" style="width: 64%;">
											<button type="button" class="forecast_button" name="weatherKind" id="sunnyYn"><span style="color: black;">맑음</span></button>
											<input type="hidden" id="hSunnyYn">
										</div>
<%--										<div class="forecast">--%>
<%--											<button type="button" class="forecast_button" name="weatherKind" id="thunderYn"><span style="color: black;">낙뢰</span></button>--%>
<%--											<input type="hidden" id="hThunderYn">--%>
<%--										</div>--%>
<%--										<div class="forecast">--%>
<%--											<button type="button" class="forecast_button" name="weatherKind" id="smogYn"><span style="color: black;">안개</span></button>--%>
<%--											<input type="hidden" id="hSmogYn">--%>
<%--										</div>--%>

									</div>
								</fieldset>
								<!-- //입력 폼 -->
							</form>

							<!-- 저장 버튼 -->
							<div class="btn_save">
								<p><a href="#" onclick="fn_VM0601SaveForecast(); return false;">저장</a></p>
							</div>
							<!-- //저장 버튼 -->
						</div>

					</c:if>

					<!-- 지시문 -->
					<c:if test="${authSp ne 'I' and authSp ne 'S'}">
						<p class="direction">변경한 설정은 자정 이후 적용됩니다.</p>
						<p class="direction">24시간 ON : 24시간 간판 켜기</p>
						<p class="direction">일출몰 기준 : 일출몰 시간에 보정시간을 더하여 간판 켜기/끄기</p>
						<p class="direction">사용자 정의 : 사용자가 입력한 시간에 간판 켜기/끄기</p>
					</c:if>

					<c:if test="${authSp ne 'I' and authSp ne 'G' and authId ne 3}">
						<p class="direction" style="font-weight: bold;">기상정보 연동제어 : 일출과 일몰 시간 사이에 적용되고 1시간 간격으로 제어되며 체크되지 않은 기상 상태에는 간판이 OFF됩니다.</p>
					</c:if>
					<!-- //지시문 -->

				</section>
				<!-- //시간 정보 section -->
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
	<script src="/resources/viewJs/vm/VM0601.js"></script>
	<!-- viewJs import -->
</body>
</html>