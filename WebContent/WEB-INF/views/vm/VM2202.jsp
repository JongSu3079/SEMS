<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 간판</title>
<%@ include file="../cm/header.jsp" %>
<style>
table td, table th{
	padding:0;
}
.slider-container {

	text-align: center;
}
.slider{
	width:80%;
	border-radius: 8px;
	outline: none;
	transition: background 450ms ease-in;
	accent-color: #f3ff4a;
}
.dimmBox{
	background-color:#e9e9e9;
}
datalist {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	writing-mode: vertical-lr;
	padding : 0 45px;
	width : 80%;
}

option {
	padding: 0;
}
</style>
<script>
let grpNm = "${grpNm}";
let count = "${count}";
let basicYn = "${basicYn}";
</script>
</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>
	<form id="returnFrom" name="returnForm" method='post'>
		<input type="hidden" id="strCd"		name="strCd"		value="${strCd}"/>
		<input type="hidden" id="hubId"		name="hubId"		value="${hubId}"/>
		<input type="hidden" id="grpId"		name="grpId"		value="${grpId}"/>
	</form>

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
			<header>
				<div class="statusBar"></div>
				<div id="header_multilayer">
					<h1 class="blind">에너지 관제시스템</h1>



					<!-- 점포명 -->
					<div class="shop_name">
						<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
					</div>
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<input type="hidden" id="hStrAddInfo"/>
					<!-- //점포명 -->

					<!-- 점포 정보 레이어 팝업 -->
					<div id="shop_info_popup"></div>
					<!-- //점포 정보 레이어 팝업 -->

					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
						<c:if test="${authSp ne 'S' || ( authSp eq 'S' && storeListCnt ne 1 ) }">
							<li><a href="#" onclick="javascript:gfn_storeSearch( 'signDimmControlMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
						</c:if>
						<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->

						<!-- 냉장비 알람 표시 영역 -->
						<c:if test="${authSp ne 'S' && authSp ne 'G'}">
							<li>
								<a href="/VM0701Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
								</a>
							</li>
						</c:if>
						<!-- // 냉장비 알람 표시 영역 -->

						<!-- 간판 알람 표시 영역 -->
						<c:if test="${authSp eq 'G'}">
							<li>
								<a href="/VM0704Redirect" class="btn_message">
									<span>알람</span>
									<span id="alarmNewImg" style="display:none"><img src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
								</a>
							</li>
						</c:if>
						<!-- // 간판 알람 표시 영역 -->
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->
				</div>
				<div id="header_sub">

					<!-- 툴바영역 -->
					<div class="toolbar">
						<!-- 이전화면 아이콘 버튼 -->
						<div class="icon_previous" onclick="fn_VM2201Redirect();">
							<a href="#" onclick="fn_VM2201Redirect();" title="이전화면" class="btn_previous"><img src="/${smCommonImagesPath}/btn_previous.png" alt="이전화면" /></a>
						</div>
						<!-- //이전화면 아이콘 버튼 -->
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h3>그룹별 디밍 설정</h3>
						</div>
						<!-- //타이틀 -->

						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="#" onclick="javascript:fn_VM0601refresh(); return false;" class="btn_refresh">새로고침</a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->

					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->

			<!-- container -->
			<div id="container">
				<section>
					<table>
						<colgroup>
							<col style="width:35%;" />
							<col style="width:65%;" />
						</colgroup>
						<tr>
							<th>그룹명</th>
							<td id="groupName"> </td>
						</tr>
						<tr>
							<th>연결된 <br>조명 개수</th>
							<td id="groupCount"></td>
						</tr>
						<tr>
							<th>디밍 정책</th>
							<td>
								<div class="form_row" style="display: flex; position: relative; justify-content: center; align-items: center;">
								<span>기본정책</span>
								<input type="checkbox" class="toggle" id="basicYn" onclick="changeSettings()" hidden>
								<label for="basicYn" class="toggleSwitch">
									<span class="toggleButton"></span>
								</label>
								<span>개별 정책</span>
								</div>
							</td>
						</tr>
					</table>
				</section>
				<section >
					<div class="setting_area" >
						<div class="form_row" >
							<table class="dimmBox" id="groupSetting">
								<colgroup>
									<col style="width:20%;" />
									<col style="width:80%;" />
								</colgroup>
								<tbody id="grpPolicy">
								<tr><td colspan="2">주간</tr>
								<tr>
									<td>맑은 날</td>
									<td>
										<div class="slider-container" style="display: flex;align-items: center;">
											<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">
											<input type="range" min="0" max="100" value="50" step="10" class="slider" id="myRange_1">
											<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">
										</div>
									</td>
								</tr>
								<tr>
									<td>흐린 날</td>
									<td>
										<div class="slider-container" style="display: flex;align-items: center;">
											<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">
											<input type="range" min="0" max="100" value="50" step="10" class="slider" id="myRange_2">
											<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">
										</div>
									</td>
								</tr>
								<tr>
									<td>비 오는 날</td>
									<td>
										<div class="slider-container" style="display: flex;align-items: center;">
											<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">
											<input type="range" min="0" max="100" value="50" step="10" class="slider" id="myRange_3">
											<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">
										</div>
									</td>
								</tr>
								<tr>
									<td>눈 오는 날</td>
									<td>
										<div class="slider-container" style="display: flex;align-items: center;">
											<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">
											<input type="range" min="0" max="100" value="50" step="10" class="slider" id="myRange_4" list="values">
											<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">
											<br>

										</div>
									</td>
								</tr>
								<tr>
									<td></td><td>
									<div class="slider-container" style="display: flex;align-items: center;">
										<datalist class="values">
												<option value="0" label="0%"></option>
												<option value="10" label="10%"></option>
												<option value="20" label="20%"></option>
												<option value="30" label="30%"></option>
												<option value="40" label="40%"></option>
												<option value="50" label="50%"></option>
												<option value="60" label="60%"></option>
												<option value="70" label="70%"></option>
												<option value="80" label="80%"></option>
												<option value="90" label="90%"></option>
												<option value="100" label="100%"></option>
											</datalist>
											</div>
									</td>
								</tr>
								<tr><td colspan="2">야간</td></tr>
								<tr>
									<td></td>
									<td>
										<div class="slider-container" style="display: flex;align-items: center;">
											<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">
											<input type="range" min="0" max="100" value="50" step="10" class="slider" id="myRange_99" list="values">
											<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">
											<br>

										</div>
									</td>
								</tr>
								<tr>
									<td></td><td>
									<div class="slider-container" style="display: flex;align-items: center;">
										<datalist class="values">
												<option value="0" label="0%"></option>
												<option value="10" label="10%"></option>
												<option value="20" label="20%"></option>
												<option value="30" label="30%"></option>
												<option value="40" label="40%"></option>
												<option value="50" label="50%"></option>
												<option value="60" label="60%"></option>
												<option value="70" label="70%"></option>
												<option value="80" label="80%"></option>
												<option value="90" label="90%"></option>
												<option value="100" label="100%"></option>
											</datalist>
											</div>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
						<!-- 저장 버튼 -->
						<div class="btn_save">
							<p><a href="#" onclick="fn_VM2202SaveGrpDimmSet(); return false;">저장</a></p>
						</div>
						<!-- //저장 버튼 -->



					</div>
				</section>
				<!-- 기본정책 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->

	<!-- 로딩 -->
<!-- 	<div id="viewLoadingDiv"> -->
<!-- 		<div id="viewLoadingImg"></div> -->
<!-- 	</div> -->
	<!-- //로딩 -->

	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM2202.js"></script>
	<!-- viewJs import -->
</body>
</html>
