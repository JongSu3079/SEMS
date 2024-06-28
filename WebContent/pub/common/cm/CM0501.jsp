<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
	
				<!-- 툴바영역 -->
				<div class="toolbar">
	
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:history.back();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2 id="title_temp_or_battery">냉장비온도 </h2>
					</div>
					<!-- //페이지 타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
	
		<!-- container -->
		<div id="container">
	
			<!-- graph section -->
			<section>
				<h3 class="blind">그래프로 보기</h3>
				<div class="graph_section" id="container_graph"></div>
			</section>
			<!-- //graph section -->
	
		</div>
		<!-- //container -->
