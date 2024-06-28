<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


				<section>
					<h4 class="blind">설정하기</h4>
					<h3 class="inner">간판 제어</h3>
					<div class="setting_area">
						<!-- 변수 -->
						<input type="hidden" id="gwId"/>
						<input type="hidden" id="signCtrlVal" value="0" />
						<!-- //변수 -->
						
						<!-- 설정 영역 -->
						<div class="condition">
							<h5 class="blind">간판 상태</h5>
							<div id="signTg" class="cmToggle">
								<p class="btn_on tgBtn"><a href="#" onclick="" title=간판ON><em>ON</em>간판상태</a></p>
								<p class="btn_off tgBtn"><a href="#" onclick="" title="간판OFF"><em>OFF</em>간판상태</a></p>
							</div>
						</div>
						<!-- //설정 영역 -->
						
						<!-- 저장 버튼 -->
						<div class="btn_save">
							<p><a href="#" onclick="fn_VM0601saveSignOnoff(); return false;">저장</a></p>
						</div>
						<!-- //저장 버튼 -->
					</div>
				</section>
				
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM0602.js"></script>
	<!-- //viewJs import -->