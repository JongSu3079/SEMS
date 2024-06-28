<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="trunk">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
	
				<!-- 툴바영역 -->
				<div class="toolbar">
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous" >
						<a href="#" onclick="" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>알람 조치</h2>
					</div>
					<!-- //페이지 타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
	
		<!-- container -->
		<div id="container">
			<!-- 컨테이너 영역 -->
			<div class="setting_area">
				<!-- 조치내역입력 폼 -->
				<form id="inputForm" name="inputForm" action="#">
					<fieldset>
						<legend>조치 예정 내용 입력</legend>
						<div class="info">
							<div class="info_title">
								<h3>DDMC점</h3>
								<span class="notification">알림[10]</span>
							</div>
							
							<div class="info_detail">
								<span>
									장비명 : OSC<br />
									장애일시 : 2018.04.27 00:38 ~ 2018.05.07 15:28<br />
									장애내용 : 25 OSC4 장비 고온 이상 (21.2℃)
								</span>
							</div>
						</div>
						<div class="form_row">
							<h3>담당기사</h3>
							<p>동남신화</p>
							<div class="inputBox">
								<input id="as_engineer" name="asEngineer" type="text" title="담당기사 입력" value="홍길동" />
							</div>
						</div>
						
						<div class="form_row">
							<h3>조치방법</h3>
							<div class="inputBox">
								<select id="as_method" name="asMethod" title="조치방법 선택">
									<option value="">선택</option>
								</select>
							</div>
						</div>
						
						<div class="form_row">
							<h3>조치내용</h3>
							<div class="inputBox">
								<select title="조치내용 선택">
									<option value="">선택</option>
									<option value="">1. 제상</option>
									<option value="">2. 상품진열</option>
									<option value="">3. 기타</option>
								</select>
							</div>
							<div class="inputBox">
								<textarea id="as_note" name="asNote" cols="5" rows="5" title="조치내용 직접입력">조치완료</textarea>
							</div>
						</div>
					</fieldset>
				</form>
				
				<div class="btn_save">
					<p><a href="#" onclick="">저장</a></p>
				</div>
				<!-- //조치내역입력 폼 -->
			</div>
			<!-- //컨테이너 영역 -->
		</div>
		<!-- //container -->
	</div>
