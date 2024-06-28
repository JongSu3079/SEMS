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
						<a href="#" onclick="" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>점포조회</h2>
					</div>
					<!-- //페이지 타이틀 -->
	
					<!-- 새로고침 버튼영역 -->
					<div class="header_refesh_button">
						<a href="" class="btn_refresh" onclick="">새로고침</a>
					</div>
					<!-- //새로고침 버튼영역 -->
				</div>
				<!-- //툴바영역 -->
				<!-- search -->
				<div class="search">
					<div class="search_box">
						<input type="text" id="qStrNm" name="qStrNm" placeholder="점포명을 입력하세요." maxlength="30" onkeypress="if(event.keyCode==13) {fn_refresh(); return false;}" />
						<a href="" onclick="javascript:; return false;" class="btn_search_1">조회</a>
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
	
				<!-- list setting -->
				<div class="list_setting">
					<div class="order cmToggle">
						<span class="name tgBtn"><a href="#" onclick="">점포명순</a></span>
						<span class="new tgBtn"><a href="#" onclick="">최신순</a></span>
					</div>
					<div class="number_group">
						<div class="total">
							<span class="blue">500</span>
							<span> / 총 1,203</span>
						</div>
					</div>
				</div>
				<!-- //list setting -->
	
				<!-- 리스트 -->
				<ul class="list st2">
					<li class="no_result"><p>조회된 점포가 없습니다.</p></li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">강남구<br />DDMC점</span>
						</span>
						<!-- type1 클래스 추가 -->
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구 <br />매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<!-- 버튼이 1개 일 경우 -->
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address null">내용없음</span>
								</div>
								<div class="telephone_area">
									<a class="null" href="tel:"><span class="telephone">내용없음</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<!-- 버튼이 2개 일 경우 -->
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
					<li>
						<span class="list_text">
							<span>2018.08.10</span>
							<span>V0395</span>
							<span class="point">DDMC점</span>
						</span>
						<div class="list_text_detail type1 height-transition-hidden">
							<div class="container_grp">
								<div class="address_area">
									<span class="address">서울시 마포구  매봉산로 75</span>
								</div>
								<div class="telephone_area">
									<a href="tel:010-0000-0000"><span class="telephone">010-0000-0000</span></a>
								</div>
							</div>
							<div class="btn_grp">
								<div class="btn_act"><a href="" onclick="">점포확인</a></div>
								<div class="btn_act"><a href="" onclick="">점검요청</a></div>
							</div>
						</div>
					</li>
				</ul>
				<!-- //리스트 -->
			</div>
			<!-- //조회결과 -->
			
			<!-- 하단 버튼 영역 -->
			<div class="bottom_btn_group" id="bottom_btn_group">
				<p class="btn_more"><a href="" onclick="">더보기</a></p>
				<p class="btn_top"><a href="" onclick="">위로가기</a></p>
			</div>
			<!-- //하단 버튼 영역 -->
		
		</div>
		<!-- //container -->
	</div>
	<!-- //trunk -->
		