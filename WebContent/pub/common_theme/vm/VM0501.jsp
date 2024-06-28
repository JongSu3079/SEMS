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
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h3>냉장비</h3>
					</div>
					<!-- //타이틀 -->
	
					<!-- 새로고침 버튼영역 -->
					<ul class="header_refesh_button">
						<li><a href="#"  onclick="javascript:fn_refresh(); return false;" class="btn_refresh">새로고침</a></li>
					</ul>
					<!-- //새로고침 버튼영역 -->
				</div>
			</header>
			<!-- //header -->
		
			<!-- container -->
			<div id="container">
		
				<!-- 메시지 리스트 -->
				<ul class="condition_list" id="condition_list">
					<li class="no_result"><p>조회된 내용이 없습니다.</p></li>
					<li><!-- 알람일시 정지 시작할 때 -->
						<div class="title_area">
							<span class="t_icon">유선</span>
							<span class="equipment">WIC1</span>
							<span class="notification">| 최근한달알람[<span class="red">0</span>]</span>
							<a href="#" onclick="$(this).alarm_control_open();" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>
							<a href="#" onclick="" title="그래프 새창 열기" class="btn_graph">그래프 열기</a>
						</div>
						<div class="detail_area">
							<ul class="temperatureInfo">
								<li class="temperature">
									<span class="title_temperature">온도</span>
									<span class="body_temperature">14.0℃</span>
								</li>
								<li class="battery">
									<span class="title_temperature">배터리</span>
									<span class="body_temperature">88%</span>
								</li>
								<li class="rssi">
									<span class="title_temperature">rssi</span>
									<span class="body_temperature">90dBm</span>
								</li>
							</ul>
						</div>
						<div class="alarm_control">
							<em class="restart_time">알람 재시작 일시 지정</em>
							<div class="setting_area">
								<div class="form_row">
									<div class="inputBox">
										<input type="date" style="float:left;width:calc( (100% / 3) - 2px );" />
										<select style="float:left;margin:0 3px;width:calc( (100% / 3) - 2px );">
											<option>15</option>
										</select>
										<select style="float:left;width:calc( (100% / 3) - 2px );">
											<option>32</option>
										</select>
									</div>
								</div>
								<div class="btn_sub">
									<p class="start"><a href="#" onclick="; return false;">중지시작</a></p>
								</div>
							</div>
						</div>
					</li>
					<li><!-- 알람일시 정지 진행중일 때 -->
						<div class="title_area">
							<span class="t_icon">유선</span>
							<span class="equipment">WIC1</span>
							<span class="notification">| 최근한달알람[<span class="red">0</span>]</span>
							<a href="#" onclick="$(this).alarm_control_open();" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>
							<a href="#" onclick="" title="그래프 새창 열기" class="btn_graph">그래프 열기</a>
						</div>
						<div class="detail_area">
							<ul class="temperatureInfo">
								<li class="temperature">
									<span class="title_temperature">온도</span>
									<span class="body_temperature">14.0℃</span>
								</li>
								<li class="battery">
									<span class="title_temperature">배터리</span>
									<span class="body_temperature">88%</span>
								</li>
								<li class="rssi">
									<span class="title_temperature">rssi</span>
									<span class="body_temperature">90dBm</span>
								</li>
							</ul>
						</div>
						<div class="alarm_control">
							<em class="restart_time">알람 재시작: 2021.02.05 11:05</em>
							<div class="setting_area">
								<div class="form_row">
									<div class="inputBox">
										<input type="date" style="float:left;width:calc( (100% / 3) - 2px );" />
										<select style="float:left;margin:0 3px;width:calc( (100% / 3) - 2px );">
											<option>15</option>
										</select>
										<select style="float:left;width:calc( (100% / 3) - 2px );">
											<option>32</option>
										</select>
									</div>
								</div>
								<div class="btn_sub">
									<p class="extend"><a href="#" onclick="; return false;">연장</a></p>
									<p class="end"><a href="#" onclick="; return false;">종료</a></p>
								</div>
							</div>
						</div>
					</li>
					<li class="disorder"><!-- 이상이 있을 때 class="disorder" -->
						<div class="title_area">
							<span class="h_icon">무선</span>
							<span class="equipment">WIC1</span>
							<span class="notification">| 최근한달알람[<span class="red">0</span>]</span>
							<a href="#" onclick="" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>
							<a href="#" onclick="" title="그래프 새창 열기" class="btn_graph">그래프 열기</a>
						</div>
						<div class="detail_area">
							<ul class="temperatureInfo">
								<li class="temperature">
									<span class="title_temperature">온도</span>
									<span class="body_temperature">14.0℃</span>
								</li>
								<li class="battery">
									<span class="title_temperature">배터리</span>
									<span class="body_temperature">88%</span>
								</li>
								<li class="rssi">
									<span class="title_temperature">rssi</span>
									<span class="body_temperature">90dBm</span>
								</li>
							</ul>
						</div>
						<div class="alarm_control">
							<em class="restart_time">알람 재시작: 2021.02.05 11:05</em>
							<div class="setting_area">
								<div class="form_row">
									<div class="inputBox">
										<input type="date" style="float:left;width:calc( (100% / 3) - 2px );" />
										<select style="float:left;margin:0 3px;width:calc( (100% / 3) - 2px );">
											<option>15</option>
										</select>
										<select style="float:left;width:calc( (100% / 3) - 2px );">
											<option>32</option>
										</select>
									</div>
								</div>
								<div class="btn_sub">
									<p class="extend"><a href="#" onclick="; return false;">연장</a></p>
									<p class="end"><a href="#" onclick="; return false;">종료</a></p>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="i_icon">인버터</span>
							<span class="equipment">WIC1</span>
							<span class="notification">| 최근한달알람[<span class="red">0</span>]</span>
							<a href="#" onclick="$(this).alarm_control_open();" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>
							<a href="#" onclick="" title="그래프 새창 열기" class="btn_graph">그래프 열기</a>
						</div>
						<div class="detail_area">
							<ul class="temperatureInfo">
								<li class="temperature">
									<span class="title_temperature">온도</span>
									<span class="body_temperature">14.0℃</span>
								</li>
								<li class="battery">
									<span class="title_temperature">배터리</span>
									<span class="body_temperature">88%</span>
								</li>
								<li class="rssi">
									<span class="title_temperature">rssi</span>
									<span class="body_temperature">90dBm</span>
								</li>
							</ul>
						</div>
						<div class="alarm_control">
							<em class="restart_time">알람 재시작: 2021.02.05 11:05</em>
							<div class="setting_area">
								<div class="form_row">
									<div class="inputBox">
										<input type="date" style="float:left;width:calc( (100% / 3) - 2px );" />
										<select style="float:left;margin:0 3px;width:calc( (100% / 3) - 2px );">
											<option>15</option>
										</select>
										<select style="float:left;width:calc( (100% / 3) - 2px );">
											<option>32</option>
										</select>
									</div>
								</div>
								<div class="btn_sub">
									<p class="extend"><a href="#" onclick="; return false;">연장</a></p>
									<p class="end"><a href="#" onclick="; return false;">종료</a></p>
								</div>
							</div>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="t_icon">유선</span>
							<span class="equipment">WIC1</span>
							<span class="notification">| 최근한달알람[<span class="red">0</span>]</span>
							<a href="#" onclick="$(this).alarm_control_open();" title="알람 일시 정지 열기" class="btn_alarm_stop">알람 일시 정지 열기</a>
							<a href="#" onclick="" title="그래프 새창 열기" class="btn_graph">그래프 열기</a>
						</div>
						<div class="detail_area">
							<ul class="temperatureInfo">
								<li class="temperature">
									<span class="title_temperature">온도</span>
									<span class="body_temperature">14.0℃</span>
								</li>
							</ul>
						</div>
						<div class="alarm_control">
							<em class="restart_time">알람 재시작: 2021.02.05 11:05</em>
							<div class="setting_area">
								<div class="form_row">
									<div class="inputBox">
										<input type="date" style="float:left;width:calc( (100% / 3) - 2px );" />
										<select style="float:left;margin:0 3px;width:calc( (100% / 3) - 2px );">
											<option>15</option>
										</select>
										<select style="float:left;width:calc( (100% / 3) - 2px );">
											<option>32</option>
										</select>
									</div>
								</div>
								<div class="btn_sub">
									<p class="extend"><a href="#" onclick="; return false;">연장</a></p>
									<p class="end"><a href="#" onclick="; return false;">종료</a></p>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<!-- //메시지 리스트 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
