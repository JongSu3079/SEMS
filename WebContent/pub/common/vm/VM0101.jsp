<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
		
				<!-- weather -->
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
		
				<!-- 시설정보 -->
				<section>
					<div class="info_facilities">
						<h3>시설정보</h3>
						<ul class="list">
							<li class="link air_heat">
								<h4>냉난방</h4>
								<p id="HVACSt" class="off">OFF</p>
								<a class="air_hit_popup_open" title="냉난방 제어 새창열기">냉난방 제어하기</a>
							</li>
							<li class="refrigerator">
								<h4>냉장비</h4>
								<p id="fridgeSt" class="on">정상</p>
							</li>
							<li class="link sign">
								<h4>간판</h4>
								<p id="SignSt" class="on">ON</p>
								<a class="sign_popup_open" title="간판 제어 새창열기">간판 제어하기</a>
							</li>
						</ul>
					</div>
				</section>
				<!-- //시설정보 -->
		
				<!-- 에너지사용량 -->  
				<section>
					<div class="energy">
						<div class="used_energy">
							<h3>전력사용량</h3>
						</div>
						<div class="shop_contract_energy">
							<h4>계약전력( 저압 )</h4>
							<p>23 <span class="unit">kW</span></p>
						</div>
						<div class="last_month">
							<h4>지난달</h4>
							<p>3,203 <span class="unit">원</span></p>
						</div>
						<div class="this_month">
							<h4>이번달</h4>
							<p>1,561 <span class="unit">원</span></p>
						</div>
						<div class="this_month_prediction">
							<h4>이번달 예측</h4>
							<p>3,621 <span class="unit">원</span></p>
						</div>
						<div class="search_time">
							<div class="search_time_son">
								<h4>조회시간 :</h4>
								<p id="nowTime">2016.12.19 10:20</p>
							</div>
						</div>
						<!-- 지시문 -->
						<p class="direction">지난달, 이번달, 이번 달 예측 요금은 전력사용량을 기반으로 계산한 금액으로 실제 청구되는 요금과 다를 수 있습니다.</p>
						<!-- //지시문 -->
					</div>
				</section>
				<!-- //에너지사용량 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
