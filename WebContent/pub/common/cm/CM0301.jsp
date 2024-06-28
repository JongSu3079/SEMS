<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

		<!-- 전체메뉴 -->
		<nav class="nav">
			<div class="statusBar"></div>
			<h2 class="blind">전체메뉴</h2>
			<div class="gnb">
				<div class="header_gnb">
					<p class="id_full_name">ID Full Name</p>
					<p class="btn_setting"><a title="설정 화면 이동">설정</a></p>
					<p class="btn_close_all_menu"><a title="메뉴 닫기">닫기</a></p>
				</div>
				<ul id="all_menu" class="all_menu">
					<li>
						<a href="../vm/VM0101.jsp" data-menu="VM0101">
							<span class="menu_text">대시보드</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0201.jsp" data-menu="VM0201">
							<span class="menu_text">사용량</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0301.jsp" data-menu="VM0301">
							<span class="menu_text">냉난방</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0601.jsp" data-menu="VM0601">
							<span class="menu_text">간판</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0701.jsp" data-menu="VM0701">
							<span class="menu_text" data-new="true">알람<em class="msg">새로운 내용이 있습니다.</em></span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0801.jsp" data-menu="VM0801">
							<span class="menu_text" data-new="true">공지<em class="msg">새로운 내용이 있습니다.</em></span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0501.jsp" data-menu="VM0501">
							<span class="menu_text">냉장비</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM0401.jsp" data-menu="VM0401">
							<span class="menu_text">제어이력</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM1001.jsp" data-menu="VM1001">
							<span class="menu_text">유지보수</span>
						</a>
					</li>
					<li>
						<a href="../vm/VM1001.jsp" data-menu="VM9901">
							<span class="menu_text">점포등록</span>
						</a>
					</li>
					<li data-width="100%">
						<a href="../vm/VM1101.jsp" data-menu="VM1101">
							<span class="menu_text">관리자</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
		<!-- //전체메뉴 -->
