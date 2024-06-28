<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


				<section>
					<div class="setting_area">
						<div>
							<!-- 변수 -->
							<input type="hidden" id="gwId"/>
							<input type="hidden" id="onOffVal" value=""/>
							<input type="hidden" id="operVal" value=""/>
							<!-- //변수 -->
							
							<!-- on/off 설정 -->
							<h4 class="blind">냉난방 On/Off</h4>
							<div class="condition">
								<h5 class="blind">냉난방 가동상태</h5>
									<div id="powerMode" class="cmToggle">
										<p class="tgBtn"><a href="#" onclick="" title="가동멈추기"><em>ON</em>가동상태</a></p>
										<p class="tgBtn"><a href="#" onclick="" title="가동시키기"><em>OFF</em>가동상태</a></p>
									</div>
							</div>
							<!-- //on/off 설정 -->
							
							<!-- On 상태 1단계 -->
							<div id="1step">
								<div class="setting">
									<h5 class="blind">냉난방 설정</h5>
									<div id="operMode" class="cmToggle">
										<p class="btn_air_conditioning tgBtn"><a href="#" onclick="" title="냉방가동">냉방설정</a></p>
										<p class="btn_heating tgBtn"><a href="#" onclick="" title="난방가동">난방설정</a></p>
									</div>
								</div>
							</div>
							<!-- //On 상태 1단계 -->
							
							<!-- On 상태 2단계 -->
							<div id="2step">
								<!-- 온도로 제어 활성화 -->
<!-- 								<div class="temperature"> -->
<!-- 									<h5>온도 변경(℃)</h5> -->
<!-- 									<input id="tempVal" type="number" max="30" min="18" value="24" readonly /> -->
<!-- 									<p class="btn_plus"><a href="#" onclick="fn_VM0301changeTempVal('P'); return false;" title="plus"><img src="/images/btn_plus.png" alt="plus" /></a></p> -->
<!-- 									<p class="btn_minus"><a href="#" onclick="fn_VM0301changeTempVal('M'); return false;" title="minus"><img src="/images/btn_minus.png" alt="minus" /></a></p> -->
<!-- 								</div> -->
								<!-- //온도로 제어 활성화 -->
								<!-- 온도로 제어 비활성화 -->
<!-- 								<div class="temperature"> -->
<!-- 									<input id="tempVal" type="hidden" max="30" min="18" value="24" readonly /> -->
<!-- 								</div> -->
								<!-- //온도로 제어 비활성화 -->
							</div>
							<!-- //On 상태 2단계 -->
							<!-- 
							<div class="temperature">
								<h5>온도 변경(℃)</h5>
								<input id="tempVal" type="number" max="30" min="18" value="" readonly />
								<p class="btn_plus"><a href="#" onclick="fn_VM0301changeTempVal('P'); return false;" title="온도 올리기">온도 올리기</a></p>
								<p class="btn_minus"><a href="#" onclick="fn_VM0301changeTempVal('M'); return false;" title="온도 내리기">온도 내리기</a></p>
							</div>
							 -->
							<div class="form_row">
								<h3>온도 변경(℃)</h3>
								<div class="inputBox number">
									<input id="tempVal" type="number" max="30" min="18" value="" readonly="readonly"/>
									<button type="button" class="btn_plus" onclick="fn_VM0301changeTempVal('P'); return false;" >온도 올리기</button>
									<button type="button" class="btn_minus" onclick="fn_VM0301changeTempVal('M'); return false;">온도 내리기</button>
								</div>
							</div>
							
							<!-- 저장 버튼 -->
							<div class="btn_save">
								<p><a href="#" onclick="fn_VM0301setGwApStat(); return false;">저장</a></p>
							</div>
							<!-- 저장 버튼 -->
						</div>
					</div>
				</section>
				
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM0302.js"></script>
	<!-- //viewJs import -->