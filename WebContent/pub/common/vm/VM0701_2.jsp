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
						<h2>알람</h2>
					</div>
					<!-- //페이지 타이틀 -->
	
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
	
			<!-- 탭영역 -->
			<div id="authEx" class="tab">
				<a href="#" onclick="" class="tab_off">미조치</a>
<!-- 				<a href="#" onclick="" class="tab_off">복구</a> -->
				<a href="#" onclick="" class="tab_on">조치완료</a>
			</div>
			<!-- 탭영역 -->
	
			<!-- 메시지 리스트 -->
			<ul id="message_list" class="message_list">
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[106]</span>	
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<span class="detail">장비명 : WIC<br>담당기사 : test<br>조치일시 : 2018-06-22 18:40<br>조치방법 : 유선상담<br>조치내용 : 상품진열로 인한 온도상승확인</span>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[0]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<span class="detail">장비명 : COF<br>담당기사 : test<br>조치일시 : 2018-06-22 18:39<br>조치방법 : 유선상담<br>조치내용 : 상품진열로 인한 <br />온도상승확인</span>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[21]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<span class="detail">장비명 : WIC<br>담당기사 : 정주영테스트<br>조치일시 : 2018-06-19 14:18<br>조치방법 : 유선상담<br>조치내용 : test</span>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[3]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<span class="detail">장비명 : WIC<br>담당기사 : 정주영테스트<br>조치일시 : 2018-06-19 13:40<br>조치방법 : 유선상담<br>조치내용 : TEST</span>
					</div>
				</li>
			</ul>
		</div>
		<!-- //container -->
	</div>
