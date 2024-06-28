<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

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
						<li><a href="#" onclick="javascript:; return false;" class="btn_search">점포조회</a></li>
						<!-- //점포사용자는 노출하지 않음 -->
						<li>
							<a href="" class="btn_message">
								<span class="menu_text" data-new="true">알람<em class="msg">새로운 내용이 있습니다.</em></span>
							</a>
						</li>
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
							<li><a href="#" onclick="javascript:fn_refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
		
					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->
		
			<!-- container -->
			<div id="container">	
				<!-- 설정영역 -->
				<section>
					<h4 class="blind">설정하기</h4>
					<div class="setting_area">
						<div class="condition">
							<h5 class="blind">간판 상태</h5>
							<div class="cmToggle">
								<p class="tgBtn"><a href="#" onclick="" title=간판ON><em>ON</em>간판상태</a></p>
								<p class="tgBtn"><a href="#" onclick="" title="간판OFF"><em>OFF</em>간판상태</a></p>
							</div>
						</div>
						<div class="btn_save">
							<p><a href="#" onclick="">저장</a></p>
						</div>
					</div>
				</section>
				<!-- //설정영역 -->
		
				<!-- time -->
				<section>
					<h4 class="blind">위젯으로 보기</h4>
					<div class="time_groupBox">
						<ul class="time_group allTime">
							<li class="off_time">
								<span class="title_off_time blind">OFF시간</span>
								<!-- <span class="line_time">|</span> -->
								<span id="offTime" class="body_off_time">05시43분</span>
							</li>
							<li class="sunrise_time">
								<span class="title_sunrise_time blind">일출시간</span>
								<!-- <span class="line_time">|</span> -->
								<span id="sunriseTm" class="body_sunrise_time">05시13분</span>
							</li>
							<li class="sunset_time">
								<span class="title_sunset_time blind">일몰시간</span>
								<!-- <span class="line_time">|</span> -->
								<span id="sunsetTm" class="body_sunset_time">19시57분</span>
							</li>
							<li class="on_time">
								<span class="title_on_time blind">ON시간</span>
								<!-- <span class="line_time">|</span> -->
								<span id="onTime" class="body_on_time">18시57분</span>
							</li>
						</ul>
					</div>
				</section>
				<!-- //time -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
