<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
	<script>
	var authSp = "${authSp}";
	var authId = "${authId}";
	let userId = "${userVo.userId}";
	let userNm = "${userVo.userNm}";
	</script>
	<head>
		<title>에너지 관제시스템 모바일웹 - 설정</title>
		<%@ include file="../cm/header.jsp" %>
		<style>
			#sisulOffText{
				font-size:1em;
				margin:1%;
				background-color:#dddddd;
				flex-wrap: nowrap;
				display:flex;
				padding:1% 0%
			}
			#innerText{
				max-height: 50%; 
				max-width:98%;
				margin:2%;
			}
			#red{
				margin:1%;
				color:red;
			}
			#showDetail{
				background-color:#cccccc;
				float:right;
				padding:1% 2%;
				margin:2%;
			}
			
		</style>
	</head>
	<body>
		<!-- 자동 로그인 -->
		<input type="hidden" id="alUserId" value="${userVo.getUserId()}" />
		<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
		<!-- //자동 로그인 -->
		
		<!-- wrap -->
		<div id="wrap" class="${smStatusHeight}">
				<!-- 전체메뉴 -->
				<nav class="nav">
					<%@ include file="../cm/CM0301.jsp" %>
				</nav>
				<!-- //전체메뉴 -->
				
				<!-- trunk -->
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
								<h2>설정</h2>
							</div>
							<!-- //페이지 타이틀 -->
						</div>
						<!-- //툴바영역 -->
					</div>
				</header>
				<!-- //header -->
				
					<!-- container -->
					<div id="container">
						<!-- 사용자이름, 로그아웃 버튼 영역 -->
						<section>
							<h3 class="blind"></h3>
							<div class="user">
								<p class="id_full_name">${userVo.getUserId()}</p>
								<p class="btn_logout"><a href="#" onclick="fn_VM0901logout(); return false;" title="로그아웃">로그아웃</a></p>
							</div>
						</section>
						
						<!-- 설정 section -->
							<section>
								<h3 class="blind">설정하기</h3>
								<div class="setting_area">
									<!-- 점포사용자는 노출하지 않음 -->
									<c:if test="${ authSp ne 'S' }">
										<!-- 피크 알람 -->
										<div class="peak">
											<h3 class="blind">피크알람</h3>
											<div id="peakTg" class="cmToggle">
												<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>피크 알람 수신</a></p>
												<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>피크 알람 미수신</a></p>
											</div>
										</div>
										<!-- //피크 알람 -->
									</c:if>
									<!-- GS담당자, 점포사용자에게만 노출 -->
								<!-- 설비 알람 -->
								<c:if test="${ authSp ne 'G' }">
								<div class="facilities" id="sisulDiv">
									<h3 class="blind">설비알람</h3>
										<div id="sisulTg" class="cmToggle">
										<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>냉장비 알람 수신</a></p>
										<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>냉장비 알람 미수신</a></p>
									</div>
								</div>
								</c:if>
								<!-- //설비 알람 -->
								
								<!-- 설비 알람 안내 메세지 -->
								<c:if test="${ authSp eq 'S' }">
									<section>
										<div class="setting_area" id="sisulOffText" style="display:none">
											<div class=" facilities" id="textBox" >
												<span id="innerText" style="font-size:0.8em;width:100%;margin-left:-5px;height:10%;border:0px" readonly>
													점내 냉장비 온도가 상승하면  PUSH 알람을 받습니다.
													<p id="red" >
														* 점포 시설물 관리의 책임은 경영주님께 있으며, 2시간 마다 냉장비 온도 상태 확인이 필요합니다.<br>
														* SEMS알람 기능은 유지보수 보조장치로 활용됩니다.<br>
														* 통신오류 및 ID 공동사용 등의 사유로 알람 미수신될 수 있으며, 이로 인한 상품보상 책임은 없습니다.<br>
													</p>
													※ SEMS 어플리케이션 최종 접속자에게 알람 발송됩니다.
												</span><br>
											<a id="showDetail" href="/faq/VM1421">자세히 보기</a>
											</div>
										</div>     
									</section>
								</c:if>
								<!-- //설비 알람 안내 메세지 -->
								
								<!-- 간판 알람 -->
								<c:if test="${ authId ne 3 }">
								<div class="facilities" id="signDiv">
									<h3 class="blind">간판알람</h3>
									<div id="signTg" class="cmToggle">
										<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>간판 알람 수신</a></p>
										<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>간판 알람 미수신</a></p>
									</div>
								</div>
								</c:if>
								<!-- 간판 알람 -->

							
							
							
<!-- 							<div class="facilities" style="display:none;" id="sisul2ndDiv"> -->
<!-- 								<h3 class="blind">설비2차알람</h3> -->
<!-- 								<div id="sisul2ndTg" class="cmToggle"> -->
<!-- 									<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>냉장비(2차) 알람 수신</a></p> -->
<!-- 									<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>냉장비(2차) 알람 미수신</a></p> -->
<!-- 								</div> -->
<!-- 							</div> -->
							<!-- //설비 알람 -->
							<!-- //사용자이름, 로그아웃 버튼 영역 -->
							<!-- 점포사용자 만 노출 -->
							<c:if test="${ authSp eq 'S' }">
								<!-- 정기점검 알람 -->
								<div class="facilities">
									<h3 class="blind">정기점검알람</h3>
									<div id="mntncTg" class="cmToggle">
										<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>점검 알람 수신</a></p>
										<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>점검 알람 미수신</a></p>
									</div>
								</div>
								<!-- //정기점검 알람 -->
								
								<!-- 계약전력 20kW미만 점포 피크 알람 -->
								<div class="facilities">
									<h3 class="blind">피크알람</h3>
									<div id="pklvTg" class="cmToggle">
										<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>피크 알람 수신</a></p>
										<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>피크 알람 미수신</a></p>
									</div>
								</div>
								<!-- //계약전력 20kW미만 점포 피크 알람 -->
							</c:if>
							<!-- 상태 알람 -->
							<div class="facilities">
							<h3 class="blind">상태 알람</h3>
								<div id="stateTg" class="cmToggle">
									<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>기타 설비 알람 수신</a></p>
									<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>기타 설비 알람 미수신</a></p>
								</div>
							</div>
							<!-- AS 알람 -->
							<div class="facilities" id="happycDiv" style="display:none;">
								<h3 class="blind">해피콜 알람</h3>
								<div id="happyCTg" class="cmToggle">
									<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>해피콜 알람 수신</a></p>
									<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>해피콜 알람 미수신</a></p>
								</div>
							</div>
							<!-- 점포 지역 기상특보 알람 -->
							<div class="facilities">
								<h3 class="blind">특보 알람</h3>
								<div id="wthrwTg" class="cmToggle">
									<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>특보 알람 수신</a></p>
									<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>특보 알람 미수신</a></p>
								</div>
							</div>
							<!-- //점포 지역 기상특보 알람 -->
							<!-- 공지사항 알람 -->
							<div class="facilities">
								<h3 class="blind">공지사항 알람</h3>
								<div id="notiTg" class="cmToggle">
									<p class="btn_yes tgBtn"><a href="#" onclick="" title="알람받기"><em>ON</em>공지 알람 수신</a></p>
									<p class="btn_no tgBtn"><a href="#" onclick="" title="알람받지않기"><em>OFF</em>공지 알람 미수신</a></p>
								</div>
							</div>
							<!-- //공지사항 알람 -->
						</div>
					</section>
					<!-- //설정 section -->
					<!-- 비밀번호 변경 section -->
					<section>
						<h3 class="inner">비밀번호 변경</h3>
						<div class="form_pw_modify">
							<form method="get" name="name" action="#">
								<fieldset>
									<legend>비밀번호 변경 폼</legend>
									<span class="present_pw"><input id="curPw" type="password" placeholder="변경 전 비밀번호를 입력하세요." title="변경 전 비밀번호 입력박스" maxlength="20" /></span>
									<span class="new_pw"><input id="newPw" type="password" placeholder="새로운 비밀번호를 입력하세요." title="새로운 비밀번호 입력박스" maxlength="20" /></span>
									<span class="new_pw_again"><input id="newPwCfrm" type="password" placeholder="새로운 비밀번호를 한번 더 입력하세요." title="새로운 비밀번호확인 입력박스" maxlength="20" /></span>
									<div class="btn_save">
										<p><a href="#" onclick="fn_VM0901checkUserPw(); return false;">저장</a></p>
									</div>
								</fieldset>
							</form>
						</div>
					</section>
					<!-- //비밀번호 변경 section -->
				</div>
				<!-- //container -->
			</div>
			<!-- //trunk -->
		</div>
		<!-- //wrap -->
		<!-- 로딩 -->
		<div id="viewLoadingDiv">
			<div id="viewLoadingImg"></div>
		</div>
		<!-- //로딩 -->
		<!-- viewJs import -->
		<script src="/resources/viewJs/vm/VM0901.js"></script>
		<script src="/resources/viewJs/cm/CM0104.js"></script>
		<!-- //viewJs import -->
	</body>
</html>