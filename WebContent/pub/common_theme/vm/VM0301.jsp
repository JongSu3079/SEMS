<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

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
							<h3>냉난방</h3>
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
					<div class="setting_area">
		
						<h4 class="blind">냉난방 On/Off</h4>
						<div class="condition">
							<h5 class="blind">냉난방 가동상태</h5>
							<div class="cmToggle">
								<p class="tgBtn disabled"><a href="#" onclick="" title="가동멈추기"><em>ON</em>가동상태</a></p>
								<p class="tgBtn"><a href="#" onclick="" title="가동시키기"><em>OFF</em>가동상태</a></p>
							</div>
						</div>
						<div class="setting">
							<h5 class="blind">냉난방 설정</h5>
							<div class="cmToggle">
								<p class="btn_air_conditioning tgBtn"><a href="#" onclick="" title="냉방가동">냉방설정</a></p>
								<p class="btn_heating tgBtn"><a href="#" onclick="" title="난방가동">난방설정</a></p>
							</div>
						</div>
						<div class="form_row">
							<h3>온도 변경(℃)</h3>
							<div class="inputBox number">
								<input id="tempVal" type="number" max="30" min="18" value="24" readonly="readonly"/>
								<button type="button" class="btn_plus">온도 올리기</button>
								<button type="button" class="btn_minus">온도 내리기</button>
							</div>
						</div>
						<div class="btn_save">
							<p><a href="#" onclick="; return false;">저장</a></p>
						</div>
		
					</div>
				</section>
				<!-- //설정영역 -->
	
				<!-- graph section -->
				<section class="graph_section">
					<h3>냉난방 전력사용량</h3>
					<div id="container_graph">
						<div>
							<span class="no_result">조회된 내용이 없습니다.</span>
						</div>
					</div>
				</section>
				<!-- //graph section -->
	
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
