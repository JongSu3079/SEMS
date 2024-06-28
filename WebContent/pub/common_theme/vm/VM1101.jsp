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
							<h3>관리자</h3>
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
			
				<section>
					<h3 class="inner">설치업체 변경</h3>
					<div class="setting_area">
						<!-- 점포등록 내용 입력 폼 -->
						<form id="inputForm" name="inputForm" action="#">
							<!-- 입력 폼 -->
							<fieldset>
								<legend>설치업체 변경</legend>
								<div class="form_row">
									<h4 class="blind">현재 설치 업체</h4>
									<div class="inputBox">
										<select id="srcElec" name="srcElec">
											<option>선택</option>
										</select>
									</div>
								</div>
							</fieldset>
							<!-- //입력 폼 -->
						</form>
						<!-- //점포등록 내용 입력 폼 -->
						
						<!-- 저장 버튼 영역 -->
						<div class="btn_save">
							<p><a href="#" onclick="javascript:fn_saveElecVendor();">저장</a></p>
						</div>
						<!-- //저장 버튼 영역 -->
					</div>
				</section>
		
				<!-- 게이트웨이 제어 -->
				<section>
					<h3 class="inner">게이트웨이 제어</h3>
					<div class="setting_area">
						<div class="setting">
							<h5 class="blind">게이트웨이 재시작</h5>
							<div class="cmToggle">
								<p class="tgBtn only on"><a href="#" onclick="" title="게이트웨이 재시작"><em>게이트웨이</em>재시작</a></p>
							</div>
						</div>
						<div class="setting">
							<h5 class="blind">게이트웨이 재인증</h5>
							<div class="cmToggle">
								<p class="tgBtn only disabled"><a href="#" onclick="" title="게이트웨이 재인증"><em>게이트웨이</em>재인증</a></p>
							</div>
						</div>
					</div>
				</section>
				<!-- //게이트웨이 제어-->
	
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
