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
						<h2><a href="#" onclick="" class="btn_shop_info shop_info_popup_open" title="점포정보 보기" onclick="return false;">티엔엠테크 티엔엠테크 티엔엠테크점</a></h2>
					</div>
					<!-- //점포명 -->
					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 점포사용자는 노출하지 않음 -->
						<li><a href="#" onclick="javascript:;" class="btn_noti">공지</a></li>
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
				<!-- 메인 공지 -->
				<section>
					<h3 class="blind">메인 공지</h3>
					<div class="main_notice">
						<p>2020-04-13 정기점검 방문 예정입니다.<br />
							별도 문의사항은 테스트(070-4321-8765)로 연락부탁드립니다.
						</p>
						<p>2020-04-20 냉장비 정기점검 방문 예정입니다.</p>
					</div>
				</section>
				<!-- //메인 공지 -->
				<!-- weather -->
				<section>
					<h3 class="blind">시간 및 온도 위젯</h3>
					<div class="today_weather">
						<div class="day_area">
							<ul>
								<li>
									<span class="month">5월</span>
									<span class="day">28일</span>
									<span class="week">월요일</span>
									<span class="time">오전 10:25</span>
								</li>
								<li>
									<span class="icon_weather dataset" data-weather="01"></span>
									<span class="w_text">맑음</span>
								</li>
								<li>
									<span class="temperature">-26.4℃</span>
									<span class="w_text">실외</span>
								</li>
								<li>
									<span class="icon_findDust dataset" data-findDust="1"></span>
									<span class="w_text">미세먼지 좋음</span>
								</li>
							</ul>
						</div>
						<!-- 
						<div class="day_area2">
							<ul>
								<li>
									<span class="temperature">-26.4℃</span>
									<span class="w_text">실외</span>
								</li>
								<li>
									<span class="temperature">-19.4℃</span>
									<span class="w_text">실외체감</span>
								</li>
								<li>
									<span class="temperature">-19.4℃</span>
									<span class="w_text">실내</span>
								</li>
							</ul>
						</div>
						 -->
					</div>
				</section>
				<!-- //weather -->
				
				<div id="facilities" class="tab">
					<a data-link="#air_hit" data-show="true" class="tab_on">냉난방기</a>
					<a data-link="#light" data-show="" class="tab_off">조명</a>
					<a data-link="#fire" data-show="" class="tab_off">화재감지기</a>
				</div>
				
				<!-- 냉난방기 -->
				<section id="air_hit">
					<div class="facilities_state">
						<ul>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">냉난방기 #1</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a data-check="off">
									<span class="state_box">
										<span class="name">냉난방기 #2</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">냉난방기 #3</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">냉난방기 #4</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #5</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #6</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #7 냉난방기냉난방기</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #8</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #9</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">냉난방기 #10</span>
										<em class="value">25.2&#186;&#199;</em>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</section>
				<!-- //냉난방기 -->
		
				<!-- 조명 -->
				<section id="light">
					<div class="facilities_state">
						<ul>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">조명 #1</span>
									</span>
								</a>
							</li>
							<li>
								<a data-check="off">
									<span class="state_box">
										<span class="name">조명 #2</span>
									</span>
								</a>
							</li>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">조명 #3</span>
									</span>
								</a>
							</li>
							<li>
								<a data-check="on">
									<span class="state_box">
										<span class="name">조명 #4</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #5</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #6</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #7 조명 조명 조명</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #8</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #9</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">조명 #10</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</section>
				<!-- //조명 -->
		
				<!-- 화재감지기 -->
				<section id="fire">
					<div class="facilities_state" data-type="fire">
						<ul>
							<li>
								<a data-check="alarm">
									<span class="state_box">
										<span class="name">화재감지기 #1</span>
									</span>
								</a>
							</li>
							<li>
								<a data-check="normal">
									<span class="state_box">
										<span class="name">화재감지기 #2</span>
									</span>
								</a>
							</li>
							<li>
								<a data-check="fire">
									<span class="state_box">
										<span class="name">화재감지기 #3</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #4</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #5</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #6</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #7 화재감지기 화재감지기</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #8</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #9</span>
									</span>
								</a>
							</li>
							<li>
								<a>
									<span class="state_box">
										<span class="name">화재감지기 #10</span>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</section>
				<!-- //화재감지기 -->
		
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
