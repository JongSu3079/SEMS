<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="trunk">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
	
				<!-- 툴바영역 -->
				<div class="toolbar">
	
					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>점포등록</h2>
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
						<legend>점포등록</legend>
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input type="text" title="점포명 입력" placeholder="점포명을 입력하세요" style="width:calc(50% - 3px);" />
								<select class="right" style="width:calc(50% - 3px);">
									<option>신규점</option>
									<option>기존점</option>
								</select>
							</div>
						</div>
						<div class="form_row">
							<h3>간략주소</h3>
							<div class="inputBox">
								<select style="width:calc(30% - 3px);">
									<option>서울</option>
								</select>
								<input type="text" class="right" title="상세주소 입력" placeholder="상세주소를 입력하세요" style="width:calc(70% - 3px);" />
							</div>
						</div>
						<div class="form_row">
							<h3>기상지역</h3>
							<div class="inputBox">
								<input type="text" title="기상지역" onfocus="this.blur()" readonly="readonly" style="width:calc(100% - 33px);" value="test" />
								<button type="button" class="iconSearch right">가상지역 조회</button>
							</div>
						</div>
						<div class="form_row">
							<h3>설치 전기업체</h3>
							<div class="inputBox">
								<select style="width:calc(50% - 3px);">
									<option>선택</option>
								</select>
								<select class="right" style="width:calc(50% - 3px);">
									<option>미정</option>
								</select>
							</div>
						</div>
						<div class="form_row">
							<h3>착공일 / 준공일</h3>
							<div class="inputBox">
								<input type="text" title="준공일" value="2018-07-24" onfocus="this.blur()" readonly="readonly" style="width:calc(50% - 3px);" />
								<input type="text" title="착공일" value="2018-07-24" onfocus="this.blur()" readonly="readonly" class="right" style="width:calc(50% - 3px);" />
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
