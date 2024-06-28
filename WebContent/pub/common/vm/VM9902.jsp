<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

	<div class="trunk">
		<!-- header -->
		<header>
			<div class="statusBar"></div>
			<div id="header_search">
				<h1 class="blind">에너지 관제시스템</h1>
	
				<!-- 툴바영역 -->
				<div class="toolbar">
	
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous" >
						<a href="#" onClick="history.go(-1); return false;" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>기상지역</h2>
					</div>
					<!-- //페이지 타이틀 -->
	
					<!-- 새로고침 버튼영역 -->
					<ul class="header_refesh_button">
						<li><a href="" class="btn_refresh" onclick="fn_refresh(); return false;">새로고침</a></li>
					</ul>
					<!-- //새로고침 버튼영역 -->
				</div>
				<!-- //툴바영역 -->
				<!-- search -->
				<div class="search">
					<div class="search_box">
						<input type="text" id="qStrNm" name="qStrNm" value="" maxlength="30" onkeypress="if(event.keyCode==13) {fn_refresh(); return false;}" />
						<a href="" onclick="javascript:fn_refresh(); return false;" class="btn_search_1">조회</a>
					</div>
				</div>
				<!-- search -->
			</div>
		</header>
		<!-- //header -->
	
		<!-- container -->
		<div id="container">
	
			<!-- 조회결과 -->
			<div class="search_list">
	
				<!-- 리스트 -->
				<ul class="list">
					<li class="no_result"><p>조회된 내용이 없습니다.</p></li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
					<li>
						<a href="" class="list_text">
							<span>강원도</span>
							<span>강릉시</span>
							<span class="point">강남동</span>
						</a>
					</li>
				</ul>
				<!-- //리스트 -->
			</div>
			<!-- //조회결과 -->
			
			<!-- 하단 버튼 영역 -->
			<div class="bottom_btn_group" id="bottom_btn_group">
				<p class="btn_top"><a href="" onclick="">위로가기</a></p>
			</div>
			<!-- ..하단 버튼 영역 -->
		
		</div>
		<!-- //container -->
	
	</div>
