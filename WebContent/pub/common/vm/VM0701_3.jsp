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
						<li><a href="#" onclick="javascript:; return false;" class="btn_refresh">새로고침</a></li>
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
				<span class="tab_on">미조치</span>
			</div>
			<!-- 탭영역 -->
	
			<!-- 메시지 리스트 -->
			<ul id="message_list" class="message_list type2">
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[0]</span>
						<span class="state blue">조치 중</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : FRY<br>장애일시 : 2018.06.20 00:38 ~ 2018.06.20 10:28<br>장애내용 : 25 OSC3 장비 저온 이상 (-9.3℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[107]</span>	
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : OSC<br>장애일시 : 2018.04.24 00:38 ~ 2018.05.07 15:28<br>장애내용 : 25 OSC1 장비 고온 이상 (21.5℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[83]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : OSC<br>장애일시 : 2018.04.27 00:38 ~ 2018.05.07 15:28<br>장애내용 : 25 OSC3 장비 저온 이상 (-9.3℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[82]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : OSC<br>장애일시 : 2018.04.27 00:38 ~ 2018.05.07 15:28<br>장애내용 : 25 OSC4 장비 고온 이상 (21.2℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[34]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : OSC<br>장애일시 : 2018.04.27 16:53 ~ 2018.05.05 03:29<br>장애내용 : 25 OSC2 장비 고온 이상 (13.3℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[23]</span>
						<a href="#" title="그래프 새창 열기" onclick="fn_popupGraph('5'); return false;" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : RIF<br>장애일시 : 2018.04.24 00:38 ~ 2018.05.04 00:44<br>장애내용 : 05 미지정 장비 고온 이상 (0.0℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[2]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="fn_goInputForm(6); return false;" title="조치내역입력 열기">
							<span class="detail">장비명 : RIF<br>장애일시 : 2018.04.20 11:58 ~ 2018.05.04 00:42<br>장애내용 : 00 미지정 장비 고온 이상 (0.0℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[21]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : OSC<br>장애일시 : 2018.04.24 00:38 ~ 2018.04.26 12:38<br>장애내용 : 35 OSC2 장비 고온 이상 (21.4℃)</span>
						</a>
					</div>
				</li>
				<li>
					<div class="title_area">
						<a href="#" class="btn_shop_info shop_info_popup_open" onclick=""><span class="branch">DDMC점</span></a>
						<span class="notification">알람[1]</span>
						<a href="#" title="그래프 새창 열기" onclick="" class="btn_graph">그래프 열기</a>
					</div>
					<div class="detail_area">
						<a href="#" onclick="" title="조치내역입력 열기">
							<span class="detail">장비명 : RIF<br>장애일시 : 2018.04.20 11:58 ~ 2018.04.20 11:58<br>장애내용 : 55 기타 장비 고온 이상 (0.0℃)</span>
						</a>
					</div>
				</li>
			</ul>
			<!-- //메시지 리스트 -->
		</div>
		<!-- //container -->
	</div>

