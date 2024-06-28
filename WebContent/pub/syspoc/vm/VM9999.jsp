<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.ui.ModelMap"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 튀김기 오류 접수</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
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
						<h2>튀김기 오류 상세</h2>
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
						<legend>유지보수 상세 내용 입력</legend>
						
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input type="text" title="점포명" value="T006002 점" readonly="readonly" />
							</div>
						</div>
						
						<!-- 상세일 때만 표시 -->
						<div class="form_row">
							<h3>진행 상황</h3>
							<div class="inputBox">
								<input type="text" title="진행 상황" value="유지보수 기사 확인 중" readonly="readonly" />
								<div>
									<p><a onclick="" style="display: block;font-size: 1.33375em;font-weight: bold;background-color: #6bbee9;position: fixed;top: 162px;left: 411px;width: 70px;height: 23px;text-align: center;line-height: 21px;border-radius: 16px;">접수 취소</a></p>
								</div>
							</div>
						</div>
						<!-- //상세일 때만 표시 -->
						
						<div class="form_row">
							<h3>오류 선택<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<select title="오류구분(필수항목)">
									<option value="">[5] FAN1 미연결(펜1 연결 확인)</option>
									<option value="">[6] FAN1 연결 에러(펜1or펜2 연결 확인)</option>
									<option value="">[8] FAN2 미연결(펜1 연결 확인)</option>
									<option value="">[9] FAN2 연결 에러(펜2 연결 확인)</option>
									<option value="">[16] 온도센서 미연결(히터 교체 단자 미연결)</option>
									<option value="">[21] 바이메탈 SW. PSM 모듈 점검(SCR 보드 교체)</option>
									<option value="">[24] MOTOR A 연결오류(모터연결오류)</option>
									<option value="">기타</option>
								</select>
							</div>
							<div class="inputBox">
								<textarea cols="5" rows="5" title="오류내용 직접입력(필수항목)" placeholder="오류내용을 입력하세요"></textarea>
							</div>
						</div>

					</fieldset>
				</form>
				
				<div class="btn_save">
					<!-- 신규 -->
					<!-- <p><a onclick="">접수 취소</a></p> -->
					<!-- 상세 -->
					<p><a onclick="">수정</a></p>
				</div>
				<!-- //조치내역입력 폼 -->
			</div>
			<!-- //컨테이너 영역 -->
		</div>
		<!-- //container -->
	</div>
	<!-- //wrap -->
	
</body>
</html>