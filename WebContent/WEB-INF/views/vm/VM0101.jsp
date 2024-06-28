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
</script>
<head>
	<title>에너지 관제시스템 모바일웹 - 대시보드</title>
	<%@ include file="../cm/header.jsp" %>
		<style>
		#dimmTbl td{
			border: 1px solid white;
		}
		#dimmTbl {
			margin: 0 2%;
			width: 96%;
		}
		.side{
			text-align:right;
			color:#bbe8bc;
			margin:5px 10px;
			font-size:12px;
		}
	</style>
</head>
<body>
<!-- 자동 로그인 정보 업데이트 -->
<c:if test="${ alAuthChkFlag eq '1'}">
	<input type="hidden" id="alUserId" name="alUserId" value="${alUserId}"/>
	<input type="hidden" id="alUserPw" name="alUserPw" value="${alUserPw}"/>
	<input type="hidden" id="alAuthChk" name="alAuthChk" value="${alAuthChk}"/>
</c:if>
<input type="hidden" id="alAuthChkFlag" name="alAuthChkFlag" value="${alAuthChkFlag}"/>
<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
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
						<li><a href="#" onclick="javascript:gfn_storeSearch( 'mainMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
					</c:if>
					<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->

					<%--						<c:if test="${authSp ne 'S'}">--%>
					<!-- 알람 표시 영역 -->
					<li>
						<c:choose>
							<c:when test="${authSp ne 'S' && authSp ne 'G'}">
								<a href="/VM0701Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg"><img src="/${smCommonImagesPath}/icon_new.png" alt="new" class="update"></span>
								</a>
							</c:when>
							<c:when test="${authSp eq 'G'}">
								<a href="/VM0704Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg"><img src="/${smCommonImagesPath}/icon_new.png" alt="new" class="update"></span>
								</a>
							</c:when>
							<c:otherwise>
								<a href="/menu/VM0703" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg"><img src="/${smCommonImagesPath}/icon_new.png" alt="new" class="update"></span>
								</a>
							</c:otherwise>
						</c:choose>
					</li>
					<!-- //알람 표시 영역 -->
					<%--						</c:if>--%>
				</ul>
				<!-- //헤더 우측 아이콘 버튼 그룹 -->
			</div>
		</header>
		<!-- //header -->

		<!-- container -->
		<div id="container">
			<!-- 메인 공지 -->
			<section>
				<h3 class="blind">메인 공지</h3>
				<div class="main_notice" id="main_notice" style="display:none">
					<p id="main_comment">
						<!-- 							2020-04-13 정기점검 방문 예정입니다. -->
					</p>
				</div>
			</section>
			<!-- //메인 공지 -->

			<!-- DR 공지 -->
			<section>
				<h3 class="blind">DR 공지</h3>
				<div class="main_notice" id="dr_notice" style="display:none">
					<p id="dr_comment">
						<!-- 							 -->
					</p>
				</div>
			</section>
			<!-- //DR 공지 -->

			<!-- weather -->
			<section>
				<h3 class="blind">시간 및 온도 위젯</h3>
				<div class="today_weather">
					<div class="day_area">
						<ul>
							<li>
								<span id="year" class="year">-</span>
								<span id="month" class="month">-</span>
								<span id="day" class="day">-</span>
								<span id="week" class="week">-</span>
								<span id="time" class="time">- -- : --</span>
							</li>
							<li class="ios_weather">
								<span class="icon_weather" onclick="fn_VM0101MoveWeather();"><img src="/${smCommonImagesPath}/icon_weather00_white.png" alt="날씨 정보없음" /></span>
								<span id="text_weather" class="w_text text_weather nodata">날씨</span>
							</li>
							<li class="android_weather" style="display:none;">
								<span><div class="link_icon">기상청 go &gt;</div></span>
								<span class="icon_weather" onclick="fn_VM0101MoveWeather();"><img src="/${smCommonImagesPath}/icon_weather00_white.png" alt="날씨 정보없음" /></span>
								<span id="text_weather" class="w_text text_weather nodata">날씨</span>
							</li>
							<li id="dustStatus">
								<span class="icon_findDust"><img src="/${smCommonImagesPath}/icon_fineDust0.png" alt="미세먼지 정보없음" /></span>
								<span id="dustText" class="w_text nodata">미세먼지</span>
							</li>
						</ul>
					</div>
					<div class="day_area2">
						<ul>
							<li>
								<span id="senseTemp" class="interior_temperature nodata temperature">-℃</span>
								<span id="senseTempTxt" class="interior w_text nodata">실내</span>
							</li>
							<li>
								<span class="temperature" id="sensibleTemp">-℃</span>
								<span class="w_text">실외체감</span>
							</li>
							<li>
								<span id="forecastTemp" class="outside_temperature nodata temperature">-℃</span>
								<span id="forecastTempTxt" class="outside w_text nodata">실외</span>
							</li>
						</ul>
					</div>
					<p class="desc" style="font-size:50%;">
						미세먼지 데이터는 실시간 관측된 자료이며 측정소 현지 사정이나 데이터의 수신상태에 따라 미수신 될 수 있음. (출처: 환경부/한국환경공단)
					</p>
				</div>
			</section>
			<!-- //weather -->
			<!-- 기상 특보 -->
			<section>
				<h3 class="blind">기상 특보</h3>
				<div class="main_notice" id="warn_notice" style="display:none">
					<p id="warn_comment">
						<!-- 							[특보] 제08-75호 : 2020.08.30.16:00 / 대구. 경상북도 / 폭염경보 해제·폭염주의보 변경·폭염주의보 해제 (*) -->
					</p>
				</div>
			</section>
			<!-- //기상 특보 -->

			<!-- 시설정보 -->
			<section>
				<div class="today_facilities">
					<h3>시설정보<span id="vm0101NetStatus">(통신중)</span></h3>
					<ul class="list">
						<li class="link air_heat" onclick="javascript:fn_VM0301PopShow();">
							<h4>냉난방<br><span id="tempCtrMsg" style="display:none;font-size:10px;font-weight:normal;">(온도제어 대상)</span></h4>
							<p id="HVACSt" class="off">-</p>
							<p class="info">
								<span class="tit">최근 제어 이력</span>
								<span id = "remsLastCtrl"></span>
							</p>
							<a title="냉난방 제어 새창열기">냉난방 제어하기</a>
						</li>
						<li class="link sign" onclick="javascript:fn_VM0601PopShow();" >
							<h4>간판</h4>
							<p id="SignSt" class="on">-</p>
							<p class="info">
								<span class="tit">간판 시간</span>
								<em>ON</em> <span id="onTime"></span> / <em>OFF</em> <span id="offTime"></span> <br> <span id="signTypeInfo" style="font-size:10px;font-weight:normal;"></span>
							</p>
							<a title="간판 제어 새창열기">간판 제어하기</a>
						</li>
<!-- 						<li class="link dimm" id="dimmPolicy"  > -->
<!-- 							<h4 id="dimmList">디밍</h4> -->
<!-- 							<span> -->
<!-- 								<p id="dimmP" class="side">현재 밝기 </p> -->
<!-- 								<p id="dimmSt" class="side">정책 </p> -->
<!-- 							</span> -->
<!-- 							<a >간판 디밍제어하기</a> -->
<!-- 							<table id="dimmTbl" style="grid-column:1/3;border:1px solid white;border-collapse: collapse;"> -->
<!-- 								<tbody id="dimmBoard"> -->
<!-- 									<tr> -->
<!-- 										<td rowspan="4">주간</td> -->
<!-- 										<td>맑은 날</td> -->
<!-- 										<td>70% 밝기</td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td>흐린 날</td> -->
<!-- 										<td>80% 밝기</td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td>비 오는 날</td> -->
<!-- 										<td>90% 밝기</td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td>눈 오는 날</td> -->
<!-- 										<td>90% 밝기</td> -->
<!-- 									</tr> -->
<!-- 									<tr> -->
<!-- 										<td>야간</td> -->
<!-- 										<td></td> -->
<!-- 										<td>100% 밝기</td> -->
<!-- 									</tr> -->
<!-- 								</tbody> -->
<!-- 							</table> -->

<!-- 						</li> -->
						<li class="link fridge" id="fridgeCon" onclick="javascript:fn_VM0501PopShow();" style="display: none;" >
							<h4 id="fridegList">냉장비 목록</h4>
							<p id="fridgeSt" class="on">-</p>
						</li>
						<%--							<li class="t-sensor" id="t-sensorState" style="display:none;">--%>
						<%--								<h4>티센서</h4>--%>
						<%--								<p class="on"><span id="tsensor1Loc"></span></p><!-- 하단/중단/상단 -->--%>
						<%--							</li>--%>
					</ul>
				</div>
			</section>
			<section>
				<div class="contract_energy">
					<div class="tit_box" style="display: flex; justify-content: space-between">
						<div style="flex: 1; margin: 0;">
							<h3>계약전력( <span id="elecKind"></span> ) <span id="elecText" style="font-size:0.625em;"></span></h3>
						</div>
						<div style="flex: 1; position: relative; top:35%; right: 3%;">
							<span id="drYn" style="font-size: 12px;"></span><br/>
							<span id="drBtn" style="font-size: 12px;"></span>
						</div>
					</div>

					<p class="direction" id="targetMonthUsageMsg" style="display:none;">냉난방기 사용량은 당월 예상 사용량에 포함</p>
					<p class="direction" id="noElecMsg" style="display:none;">전기료직납점포 및 건물통합청구 매장은 전기료 미입력시 업데이트 불가</p>
					<p class="direction" id="elecInfo">현재계약전력, 추천계약전력에 대한 상세 내용은 하단 'SEMS FAQ'를 참고해주세요.</p>

					<div class="energy_list" id="energy_list">
						<div class="energy_info" style="position: relative">
							<h4>현재계약전력</h4>
							<p><span id="vm0101data0">- <span class="unit">kW</span></span></p>
							<p><span id="recomDate2" style="font-size: 10px;"></span></p>
						</div>
						<div class="energy_info">
							<h4>추천계약전력</h4>
							<p><span id="vm0101data4">- <span class="unit">kW</span></span></p>
							<p><span id="recomDate3" style="font-size: 10px;"></span></p>
						</div>

						<!-- 그래프 -->
						<div class="energy_info" id="monthDate" style="display: none; position: relative">
							<div>
								<span id="recomDate" style="font-size: 10px; position: absolute; right: 10px;"></span>
							</div>
							<h4>기준날짜</h4>
							<p id="targetDate"></p>
							<%--								<p><span>- <span class="unit">kW</span></span></p>--%>

															<div class="graph_section" id="container_graph" style="background-color: #ffffff;"></div>
<%--							<div id="gaugeChart"  style="width:230px;height:170px;"></div>--%>
<%--							<table>--%>
<%--								<tbody>--%>
<%--								<tr>--%>
<%--									<td><span style="font-size: 15px;">최대 사용량</span></td>--%>
<%--									<td><span style="font-size: 15px;">11,232kWh</span></td>--%>
<%--								</tr>--%>
<%--								<tr>--%>
<%--									<td><span style="font-size: 15px;">현재 사용량</span></td>--%>
<%--									<td><span style="font-size: 15px;">3,949kWh</span></td>--%>
<%--								</tr>--%>
<%--								</tbody>--%>
<%--							</table>--%>
						</div>
						<!-- 							<div class="energy_info"> -->
						<!-- 								<h4 class="blind">계약전력효과</h4> -->
						<!-- 								<p class="ipt">4kW 감압가능(24,640원/월)</p> -->
						<!-- 							</div> -->
					</div>
					<div class="search_time" id="search_time">
						<div class="search_time_son">
							<h4></h4>
							<p id="updateTime"></p>
						</div>
					</div>
<%--											<p class="direction" id="targetMonthUsageMsg" style="display:none;">냉난방기 사용량은 당월 예상 사용량에 포함</p>--%>
<%--											<p class="direction" id="noElecMsg" style="display:none;">전기료직납점포 및 건물통합청구 매장은 전기료 미입력시 업데이트 불가</p>--%>
<%--											<p class="direction">현재계약전력, 추천계약전력에 대한 상세 내용은 하단 'SEMS FAQ'를 참고해주세요.</p>--%>
				</div>
			</section>
			<!-- //계약전력 -->

			<!-- 전력사용량 -->
			<section>
				<div class="energy">
					<div class="tit_box">
						<h3>예상요금<span id="energyText" style="font-size:0.625em;"></span></h3>
						<input type="hidden" id="btnCd" value="M"/>
					</div>
					<div class="energy_list">
						<div class="energy_info ipt" id="vm0101data5Div">
							<h4 id="lastYear">[한전]전년 동월 요금</h4>
							<p><span id="vm0101data5">- <span class="unit">원</span></span></p>
						</div>
						<div id="vm0101dataDiv1" class="energy_info">
							<h4 id="lastMonth">[SEMS]지난달 요금(1일 ~ 말일)</h4>
							<p><span id="vm0101data1">- <span class="unit">원</span></span></p>
						</div>
						<div id="vm0101dataDiv3" class="energy_info">
							<h4 id="nowDate1">[SEMS]이번달 예상 요금(1일 ~ 말일)</h4>
							<p><span id="vm0101data3">- <span class="unit">원</span></span> </p>
						</div>
						<%--							<div id="vm0101dataDiv2" class="energy_info">--%>
						<%--								<h4 id="nowDate2">[한]이번달 요금(1일 ~ 현재)</h4>--%>
						<%--								<p class="ipt"><span id="vm0101data2">-<span class="unit">원</span></span> </p>--%>
						<%--							</div>--%>
					</div>
					<div class="search_time">
						<div class="search_time_son">
							<h4>조회시간 :</h4>
							<p id="nowTime"></p>
						</div>
					</div>
					<!-- SEMS 소개 -->
					<div class="setting_area">
						<div class="btn_act"><a class="introduce_popup_open" onclick="javascript:fn_VM0101PageMoveToVM0102();">SEMS FAQ</a></div>
						<br />
						<div class="btn_act" id="carrierBtn" style="display:none;"><a class="introduce_popup_open carrier_web_open" onclick="javascript:fn_VM0101MoveCarrier();">캐리어 유지보수 웹사이트</a></div>
					</div>
					<!-- //SEMS 소개 -->
					<!-- 지시문 -->
					<p class="direction">[SEMS] : SEMS 데이터 기준</p>
					<p class="direction">[한전] : 한전 청구서 상 요금 기준</p>
					<%--						<p class="direction">전년 동월 요금 : 해당 월 한전 청구서 상 요금 표시, 없을시 SEMS 기준(1일 ~ 말일)으로 계산한 금액</p>--%>
					<%--						<p class="direction">지난달 요금 : 해당 월 한전 청구서 상 요금 표시, 없을시 SEMS 기준(1일 ~ 말일)으로 계산한 금액</p>--%>
					<%--						<p class="direction">이번달 예상요금 : 현재 날짜가 해당 기간 사이인 경우 한전 청구 기간 기준 SEMS 데이터로 계산, 그렇지 않거나 없을시 SEMS 기준(1일 ~ 말일)으로 계산한 금액</p>--%>

					<p class="direction">전년 동월 요금 : 전년 동월 한전 청구서 상 요금 표시, 요금 없을시 미표기</p>
					<p class="direction">지난달 요금 : 지난달 한전 청구서 상 요금 표시, 요금 없을시 미표기  </p>
					<p class="direction">이번달 예상요금 : 이번달 한전 청구 기간 기준 SEMS 데이터로 계산한 금액, 한전 청구 기간 없을시 미표기</p>

					<%--						<p class="direction">이번달 요금 : 해당 기간 한전 청구 기간 기준 SEMS 데이터로 계산, 없을시 SEMS 기준(1일 ~ 현재)으로 계산한 금액</p>--%>
					<p class="direction">서버오류, 매장환경 등 외부요인으로 데이터 누락시 이를 기반으로 제공되는 화면에서 수치가 부정확하게 나올 수 있음</p>
					<p class="direction">사용량 확인 및 예측을 위한 자료로 요금계산은 부가적임, 실시간 요금 및 예상요금이 반드시 청구요금과 일치하지 않음</p>
					<p class="direction">각 금액은 전력사용량을 기반으로 계산한 금액으로 실제 청구되는 요금과 다를 수 있습니다.</p>
					<!-- //지시문 -->
				</div>
			</section>
			<!-- //전력사용량 -->

			<!-- 냉난방기 제어 레이어 팝업 -->
			<div id="VM0301_popup" class="wrap_popup" style="display:none;">

				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">냉난방기 제어</h2>
					<a href="#" class="VM0301_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->

				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div class="VM0301_popup">
						<!-- 설정영역 -->
						<%@ include file="../vm/VM0302.jsp" %>
						<!-- //설정영역 -->
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->

			</div>
			<!-- 냉난방기 제어 레이어 팝업 -->

			<!-- 간판 제어 레이어 팝업 -->
			<div id="VM0601_popup" class="wrap_popup" style="display:none;">

				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">간판 제어</h2>
					<a href="#" class="VM0601_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->

				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div class="VM0601_popup">
						<!-- 설정영역 -->
						<%@ include file="../vm/VM0602.jsp" %>
						<!-- //설정영역 -->
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->

			</div>
			<!-- 간판 제어 레이어 팝업 -->

			<!-- 냉장비 목록 레이어 팝업 -->
			<div id="VM0501_popup" class="wrap_popup" style="display:none;">

				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">냉장비 목록</h2>
					<a href="#" class="VM0501_popup_close" title="닫기"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->

				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div class="VM0501_popup">
						<!-- 설정영역 -->
						<%@ include file="../vm/VM0502.jsp" %>
						<!-- //설정영역 -->
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->

			</div>
			<!-- 냉장비 목록 레이어 팝업 -->


			<!-- SEMS 소개 -->
			<!-- 				<div id="introduce_popup" class="wrap_popup"> -->
			<!-- 					<div class="header_popup"> -->
			<!-- 						<h3 class="title_popup">SEMS FAQ</h3> -->
			<!-- 						<a href="#" class="introduce_popup_close" title="팝업 닫기">닫기</a> -->
			<!-- 					</div> -->
			<!-- 					<div class="container_popup type2"> -->
			<%-- 						<section> --%>
			<!-- 							<h3 class="blind">SEMS 소개</h3> -->

			<!-- 							<div class="row_list"> -->

			<!-- 								리스트 -->
			<!-- 								<ul class="list"> -->
			<!-- 									<li> -->
			<!-- 										<a href="https://m.blog.naver.com/sniatxpert/221880995903" class="list_text"> -->
			<!-- 											<span class="point">SEMS 소개</span> -->
			<!-- 										</a> -->
			<!-- 									</li> -->
			<!-- 									<li> -->
			<!-- 										<a href="https://m.blog.naver.com/sniatxpert/221871767868" class="list_text"> -->
			<!-- 											<span class="point">SEMS 기능</span> -->
			<!-- 											<span class="info">(전력량 모니터링, 냉난방기 제어, 간판제어)</span> -->
			<!-- 										</a> -->
			<!-- 									</li> -->
			<!-- 									<li> -->
			<!-- 										<a href="https://m.blog.naver.com/sniatxpert/221920724420" class="list_text"> -->
			<!-- 											<span class="point">전력사용량 Q&amp;A</span> -->
			<!-- 										</a> -->
			<!-- 									</li> -->
			<!-- 									<li>
													 <span class="list_text"> -->
			<!-- 											<span class="point">감압 방법</span> -->
			<!-- 										</span> -->
			<!-- 									</li> -->
			<!-- 								</ul> -->
			<!-- 								//리스트 -->
			<!-- 							</div> -->

			<%-- 						</section> --%>
			<!-- 					</div> -->
			<!-- 				</div> -->
			<!-- //SEMS 소개 -->

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
<script src="/resources/viewJs/vm/VM0101.js"></script>
<script src="/resources/viewJs/cm/CM0104.js"></script>
<!-- //viewJs import -->
</body>
</html>