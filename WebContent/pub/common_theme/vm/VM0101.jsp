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

						<!-- sems version -->
						<div class="sems_version">
							<span>3.0 | 유</span>
						</div>
						<!-- //sems version -->

					</div>
					<!-- //점포명 -->
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
									<!-- <span id="year" class="year">-</span> -->
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
									<span class="icon_findDust dataset" data-findDust="1"></span>
									<span class="w_text">미세먼지 좋음</span>
								</li>
							</ul>
						</div>
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
							<p class="desc">
								미세먼지 데이터는 실시간 관측된 자료이며 측정소 현지 사정이나 데이터의 수신상태에 따라 미수신 될 수 있음. (출처: 환경부/한국환경공단)
							</p>
						</div>
					</div>
				</section>
				<!-- //weather -->
		
				<!-- 시설정보 -->
				<section>
					<div class="today_facilities">
						<h3>시설정보(통신정상)</h3>
						<ul class="list">
							<li class="link air_heat">
								<h4>냉난방</h4>
								<p class="off">OFF</p>
								<p class="info">
									<span class="tit">마지막 제어</span>
									2020.06.03 15:15 / 24℃
								</p>
								<a class="air_hit_popup_open" title="냉난방 제어 새창열기">냉난방 제어하기</a>
							</li>
							<li class="link sign">
								<h4>간판</h4>
								<p class="on">ON</p>
								<p class="info">
									<span class="tit">간판 시간</span>
									<em>ON</em> 19 : 00 / <em>OFF</em> 09 : 00
								</p>
								<a class="sign_popup_open" title="간판 제어 새창열기">간판 제어하기</a>
							</li>
							<li class="refrigerator">
								<h4>냉장비</h4>
								<p class="on">정상</p>
							</li>
							<li class="t-sensor">
								<h4>티센서</h4>
								<p class="on">상단</p><!-- 하단/중단/상단 -->
							</li>
						</ul>
					</div>
				</section>
				<!-- //시설정보 -->
		
				<!-- 계약전력 -->
				<section>
					<div class="contract_energy">
						<div class="tit_box">
							<h3>계약전력(저압)</h3>
						</div>
						<div class="energy_list">
							<div class="energy_info">
								<h4>실제계약전력</h4>
								<p>24 <span class="unit">kW</span></p>
							</div>
							<div class="energy_info">
								<h4>추천계약전력</h4>
								<p>20 <span class="unit">kW</span></p>
							</div>
							<div class="energy_info">
								<h4 class="blind">계약전력효과</h4>
								<p class="ipt">4kW 감압가능(24,640원/월)</p>
							</div>
						</div>
						<!-- 지시문 -->
						<p class="direction">실제계약전력, 추천계약전력에 대한 상세 내용은 하단 'SEMS FAQ'를 참고해주세요.</p>
						<!-- //지시문 -->
					</div>
				</section>
				<!-- //계약전력 -->
		
				<!-- 전력사용량 -->
				<section>
					<div class="energy">
						<div class="tit_box">
							<h3>전력사용량(1일~30일 기준)</h3>
						</div>
						<div class="energy_list">
							<div class="energy_info">
								<h4>전년 동월 요금(한전 기준)</h4>
								<p>369,600 <span class="unit">원</span></p>
							</div>
							<div class="energy_info">
								<h4>지난달 요금(SEMS 기준)</h4>
								<p>3,203 <span class="unit">원</span></p>
							</div>
							<div class="energy_info">
								<h4>이번달 예상 요금(1일~말일 기준)</h4>
								<p>3,621 <span class="unit">원</span></p>
							</div>
							<div class="energy_info">
								<h4>이번달 요금(1일~현재 기준)</h4>
								<p class="ipt">1,561 <span class="unit">원</span></p>
							</div>
						</div>
						<div class="search_time">
							<div class="search_time_son">
								<h4>조회시간 :</h4>
								<p id="nowTime">2016.12.19 10:20</p>
							</div>
						</div>
						<div class="setting_area">
							<div class="btn_act"><a class="introduce_popup_open" onclick="return false;">SEMS FAQ</a></div>
						</div>
						<!-- 지시문 -->
						<p class="direction">전년 동월 요금 : 전년도 동월의 전력사용량을 기반으로 계산한 금액</p>
						<p class="direction">지난달 요금 : 지난달 전력사용량을 기반으로 계산한 금액</p>
						<p class="direction">이번달 예상 요금 : 최근 전력사용량을 기반으로 계산한 이번달 예상 금액</p>
						<p class="direction">이번달 요금 (실시간) : 이번달 전력사용량을 기반으로 계산한 금액</p>
						<p class="direction">각 금액은 전력사용량을 기반으로 계산한 금액으로 실제 청구되는 요금과 다를 수 있습니다.</p>
						<!-- //지시문 -->
					</div>
				</section>
				<!-- //전력사용량 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
