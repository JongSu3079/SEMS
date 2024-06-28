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
				<!-- 간판 제어 -->
				<section>
					<h3 class="inner">간판 제어</h3>
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
				<!-- //간판 제어 -->
		
				<!-- 간판 시간 -->
				<section>
					<h3 class="inner">간판 시간</h3>
					<div class="time_groupBox">
						<ul class="time_group">
							<li class="sunrise_time">
								<span class="blind">일출시간</span>
								<span id="sunriseTm">05시13분</span>
							</li>
							<li class="off_time">
								<span class="blind">OFF시간</span>
								<span>05시43분</span>
							</li>
							<li class="on_time">
								<span class="blind">ON시간</span>
								<span>18시57분</span>
							</li>
							<li class="sunset_time">
								<span class="blind">일몰시간</span>
								<span>19시57분</span>
							</li>
						</ul>
					</div>
				</section>
				<!-- //간판 시간 -->
				
				<section>
					<h3 class="inner">간판설정 변경</h3>
					<div class="setting_area">
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
											<option value="2" selected="selected">일출몰 기준</option>
											<option value="3">사용자 정의</option>
										</select>
										<input type="hidden" id="scrSignOperLog" name="scrSignOperLog" value="L0">
									</div>
								</div>
								<div class="form_row" id="signTime" style="display:none">
									<h3>ON/OFF 시간</h3>
									<div class="inputBox">
										<input type="text" id="signOn" name="signOn" value="" style="width: calc(50% - 3px);">
										<input type="text" id="signOff" name="signOff" value="" class="right" style="width: calc(50% - 3px);">
										<input type="hidden" id="signOnOffLog" name="signOnOffLog" value="08:00,08:00">
									</div>
								</div>
								<div class="form_row" id="signDely">
									<h3>간판 켜기 보정값(-60분~60분)/간판 끄기 보정값(-60분~60분)</h3>
									<div class="inputBox">
										<input type="number" id="signOnDely" name="signOnDely" value="0" style="width: calc(50% - 3px);">
										<input type="number" id="signOffDely" name="signOffDely" value="60" class="right" style="width: calc(50% - 3px);">
										<input type="hidden" id="signDelyLog" name="signDelyLog" value="30,-60">
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
					<!-- //setting_area -->
					
					<!-- 지시문 -->
					<p class="direction">변경한 설정은 자정 이후 적용됩니다.</p>
					<p class="direction">24시간 ON : 24시간 간판 켜기</p>
					<p class="direction">일출몰 기준 : 일출몰 시간에 보정시간을 더하여 간판 켜기/끄기</p>
					<p class="direction">사용자 정의 : 사용자가 입력한 시간에 간판 켜기/끄기</p>
					<!-- //지시문 -->
					
				</section>
				
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
