<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

		<div class="trunk">
			<!-- header -->
			<header>
				<div class="statusBar"></div>
				<div id="header_search">
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
							<h2>알람</h2>
						</div>
						<!-- //페이지 타이틀 -->
		
						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:; return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->
		
					</div>
					<!-- //툴바영역 -->
					<!-- search -->
					<div class="search">
						<div class="search_box">
							<input type="text" name="qStrNm" value="" maxlength="30" onkeypress="if(event.keyCode==13) {fn_refresh(); return false;}" />
							<a href="" onclick="javascript:; return false;" class="btn_search_1">조회</a>
						</div>
					</div>
					<!-- search -->
				</div>
			</header>
			<!-- //header -->
		
			<!-- container -->
			<div id="container">
		
				<!-- 메시지 리스트 -->
				<ul id="message_list" class="message_list type2">
					<li>
						<div class="title_area">
							<span class="branch">화재경보기1</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기2</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기3</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기4</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기5</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기6</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기7</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기8</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
					<li>
						<div class="title_area">
							<span class="branch">화재경보기9</span>
							<span class="notification">알람 발생</span>
						</div>
						<div class="detail_area">
							<span class="detail">발생 일시: 2021.02.04 00:00:00</span>
						</div>
					</li>
				</ul>
				<!-- //메시지 리스트 -->
			</div>
			<!-- //container -->
		</div>
