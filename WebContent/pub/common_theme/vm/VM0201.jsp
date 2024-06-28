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
							<h3>사용량</h3>
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
		
				<!-- graph section -->
				<section>
					<h3 class="inner">계약종별 : 일반용(갑)저압</h3>
					<h3 class="inner">월별 상세 계약전력 대비 수요</h3>
					<div class="graph_section" id="container_graph"></div>
				</section>
				<!-- //graph section -->
	
				<!-- 테이블 -->
				<section>
					<div class="amountInfo2">
						<!-- 월별 계약전력 대비 수요 -->
						<h3 class="inner">월별 계약전력 대비 수요</h3>
						<div class="amountBox">
							<div class="tblBox">
								<table>
									<colgroup>
										<col />
										<col style="width:18%;" />
										<col style="width:23%;" />
										<col style="width:18%;" />
										<col style="width:25%;" />
									</colgroup>
									<thead>
									<tr>
										<th scope="col">년월</th>
										<th scope="col">계약전력(kW)</th>
										<th scope="col">최대수요전력(kW)</th>
										<th scope="col">여유전력(kW)</th>
										<th scope="col">최대냉난방전력(kW)</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>2019-04</td>
										<td class="unit">24.0</td>
										<td class="unit">13.8</td>
										<td class="unit">10.2</td>
										<td class="unit">2.3</td>
									</tr>
									<tr>
										<td>2019-03</td>
										<td class="unit">24.0</td>
										<td class="unit">15.6</td>
										<td class="unit">8.4</td>
										<td class="unit">4.1</td>
									</tr>
									<tr>
										<td>2019-02</td>
										<td class="unit">24.0</td>
										<td class="unit">17.6</td>
										<td class="unit">6.4</td>
										<td class="unit">3.1</td>
									</tr>
									<tr>
										<td>2018-12</td>
										<td class="unit">24.0</td>
										<td class="unit">17.2</td>
										<td class="unit">6.8</td>
										<td class="unit">71.0</td>
									</tr>
									<tr>
										<td>2018-11</td>
										<td class="unit">24.0</td>
										<td class="unit">16.0</td>
										<td class="unit">8.0</td>
										<td class="unit">70.2</td>
									</tr>
									<tr>
										<td>2018-10</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
									</tr>
									<tr>
										<td>2018-09</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
									</tr>
									<tr>
										<td>2018-08</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
										<td class="unit">24.0</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
						<!-- //월별 계약전력 대비 수요 -->
					</div>
				</section>
				<!-- //테이블 -->
		
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
