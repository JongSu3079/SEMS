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
		<div class="trunk">
			<!-- header -->
			<header>
				<div class="statusBar"></div>
				<div id="header">
					<h1 class="blind">에너지 관제시스템</h1>
		
					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">전체메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->
					<!-- 점포명 -->
					<div class="shop_name">
						<h2><a href="#" onclick="" class="btn_shop_info shop_info_popup_open" title="점포정보 보기">DDMC점</a></h2>
					</div>
					<!-- //점포명 -->
					<!-- sems version -->
					<div class="sems_version">
						<span>3.0 | 유</span>
					</div>
					<!-- //sems version -->
					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 점포사용자는 노출하지 않음 -->
						<li><a href="#" onclick="javascript:;" class="btn_search">점포조회</a></li>
						<!-- //점포사용자는 노출하지 않음 -->
						<li>
							<a href="" class="btn_message">
								<span class="menu_text" data-new="true">알람<em class="msg">새로운 내용이 있습니다.</em></span>
							</a>
						</li>
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->
		
				</div>
			</header>
			<!-- //header -->
		
			<!-- container -->
			<div id="container">
		
				<!-- weather 1/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="00"></span>
									<span class="text_weather nodata">날씨</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="0"></span>
									<span class="w_text nodata">미세먼지</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 2/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="01"></span>
									<span class="text_weather">맑음</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="1"></span>
									<span class="w_text">미세먼지 좋음</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 3/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="02"></span>
									<span class="text_weather">구름조금</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="2"></span>
									<span class="w_text">미세먼지 보통</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 4/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="03"></span>
									<span class="text_weather">구름많음</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="3"></span>
									<span class="w_text">미세먼지 나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 5/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="04"></span>
									<span class="text_weather">흐림</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span zzzclass="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 6/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="05"></span>
									<span class="text_weather">비</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 7/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="06"></span>
									<span class="text_weather">눈</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 8/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="07"></span>
									<span class="text_weather">비온후 갬</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 9/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="08"></span>
									<span class="text_weather">소나기</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 10/12 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="09"></span>
									<span class="text_weather">비/눈</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 11/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="10"></span>
									<span class="text_weather">눈/비</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 12/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="11"></span>
									<span class="text_weather">낙뢰</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
				<br />
				<!-- weather 13/13 -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="weather">
						<div class="day_area">
							<ul>
								<li>
									<!-- <span id="year" class="year">-</span> -->
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="12"></span>
									<span class="text_weather">안개</span>
								</li>
							</ul>
						</div>
						<div class="day_area2">
							<ul>
								<li>
									<span class="outside_temperature">-26.4℃</span>
									<span class="outside w_text">실외</span>
								</li>
								<li>
									<span class="interior_temperature">-19.4℃</span>
									<span class="interior w_text">실내</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="4"></span>
									<span class="w_text">미세먼지 매우나쁨</span>
								</li>
							</ul>
						</div>
					</div>
				</section>
				<!-- //weather -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->
</body>
</html>