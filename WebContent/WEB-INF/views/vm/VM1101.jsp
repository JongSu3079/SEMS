<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 관리자</title>
<%@ include file="../cm/header.jsp" %>
</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
		<input type="hidden" id="menuId" name="menuId" value="VM1101" />
	</form>

	<!-- 전체메뉴 -->
	<nav class="nav">
		<%@ include file="../cm/CM0301.jsp"%>
	</nav>
	<!-- //전체메뉴 -->

	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<!-- header -->
		<header>
			<div class="statusBar"></div>
			<div id="header_multilayer">
				<h1 class="blind">에너지 관제시스템</h1>

				<!-- 전체메뉴 아이콘 버튼 -->
				<div class="icon_gnb">
					<h2>
						<a title="전체메뉴" class="btn_gnb" onclick="removeOpen()">메뉴</a>
					</h2>
				</div>
				<!-- //전체메뉴 아이콘 버튼 -->

				<!-- 점포명 -->
				<div class="shop_name">
					<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
				</div>
				<input type="hidden" id="hStrCd" />
				<input type="hidden" id="hStrNm" />
				<input type="hidden" id="hElecVendor" />
				<input type="hidden" id="hViewStrCd" />
				<!-- //점포명 -->

				<!-- 점포 정보 레이어 팝업 -->
				<div id="shop_info_popup"></div>
				<!-- //점포 정보 레이어 팝업 -->

				<!-- 헤더 우측 아이콘 버튼 그룹 -->
				<ul class="header_button_group">
					<!-- 점포 조회 -->
					<li><a href="#"
							onclick="javascript:gfn_storeSearch( 'energyAnalMobile' ); return false;"
							class="btn_search">${smStr}조회</a>
					</li>
					<!-- //점포 조회 -->

					<!-- 알람 표시 영역 -->
					<li><a href="/VM0701Redirect" class="btn_message"> <span>알람</span>
							<span id="alarmNewImg" style="display: none"><img
								src="/${smCommonImagesPath}/icon_new.png" alt="NEW" class="update" /></span>
					</a></li>
					<!-- //알람 표시 영역 -->
				</ul>
				<!-- //헤더 우측 아이콘 버튼 그룹 -->

			</div>
			<div id="header_sub">

				<!-- 툴바영역 -->
				<div class="toolbar">

					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>관리자 메뉴</h2>
					</div>
					<!-- //페이지 타이틀 -->
						
					<!-- 새로고침 버튼영역 -->
					<ul class="header_refesh_button">
						<li><a href="#" onclick="javascript:fn_VM1101refresh(); return false;" class="btn_refresh">새로고침</a></li>
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
				<h3 class="inner">설치업체 변경</h3>
				<div class="setting_area">
					<!-- 점포등록 내용 입력 폼 -->
					<form id="inputForm" name="inputForm" action="#">
						<!-- 입력 폼 -->
						<fieldset>
							<legend>설치업체 변경</legend>
							<div class="form_row">
								<h3 class="blind">현재 설치 업체</h3>
								<div class="inputBox">
									<select id="srcElec" name="srcElec">
										<option>선택</option>
									</select>
								</div>
							</div>
						</fieldset>
						<!-- //입력 폼 -->
					</form>
					<!-- //점포등록 내용 입력 폼 -->
					
					<!-- 저장 버튼 영역 -->
					<div class="btn_save">
						<p><a href="#" onclick="javascript:fn_saveElecVendor();">저장</a></p>
					</div>
					<!-- //저장 버튼 영역 -->
				</div>
			</section>
			<section>
				<h3 class="inner">맥주소 초기화</h3>
				<div class="setting_area">
					<!-- 점포등록 내용 입력 폼 -->
					<form id="GwAddrInputForm" name="GwAddrInputForm" action="#">
						<!-- 입력 폼 -->
						<fieldset>
							<legend>맥주소 초기화</legend>
							<div class="form_row">
								<div class="inputBox">
									<input type="text" id="gwAddr" name="gwAddr" placeholder="mac 주소" style="width:calc(100% - 33px);" />
									<button type="button" id="searchStr" class="iconSearch right">점포 조회</button>
								</div>
							</div>
							<div class="form_row">
								<div class="inputBox">
									<input type="text" id="gwStrNm" name="gwStrNm" value="" placeholder="점포명" readonly="readonly" />
									<input type="hidden" id="gwStrCd" name="gwStrCd"/>
								</div>
							</div>
						</fieldset>
						<!-- //입력 폼 -->
					</form>
					<!-- //점포등록 내용 입력 폼 -->
					
					<!-- 저장 버튼 영역 -->
					<div class="btn_save">
						<p><a href="#" onclick="javascript:fn_VM1101ResetGwAddr();">초기화</a></p>
					</div>
					<!-- //저장 버튼 영역 -->
				</div>
			</section>
			<section>
				<h3 class="inner">점포코드 변경</h3>
				<div class="setting_area">
					<!-- 점포코드 변경 입력 폼 -->
					<form id="GwAddrInputForm" name="GwAddrInputForm" action="#">
						<!-- 입력 폼 -->
						<fieldset>
							<legend>맥주소 초기화</legend>
							<div class="form_row">
								<div class="inputBox">
									<input type="text" id="srcViewStrCd" name="srcViewStrCd" placeholder="점포코드" style="width:100%;" />
								</div>
							</div>
						</fieldset>
						<!-- //입력 폼 -->
					</form>
					<!-- //점포코드 변경 입력 폼 -->
					
					<!-- 저장 버튼 영역 -->
					<div class="btn_save">
						<p><a href="#" onclick="javascript:fn_saveViewStrCd();">저장</a></p>
					</div>
					<!-- //저장 버튼 영역 -->
				</div>
			</section>
			<section>
				<h3 class="inner">게이트웨이 제어</h3>
				<div class="setting_area">
					<h4 class="blind">게이트웨이 설정</h4>
					<!-- 재시작 버튼 -->
					<div class="setting">
						<h5 class="blind">게이트웨이 재시작</h5>
						<div class="cmToggle">
							<p id="restartBtn" class="tgBtn only on"><a href="#" onclick="fn_VM1101restartGW(); return false;" title="게이트웨이 재시작"><em>게이트웨이</em>재시작</a></p>
						</div>
					</div>
					<!-- //재시작 버튼 -->
					
					<!-- 재인증 버튼 -->
					<c:if test="${authSp eq 'M'}">
						<div class="setting">
							<h5 class="blind">게이트웨이 재인증</h5>
							<div class="cmToggle">
								<p id="reauthBtn" class="tgBtn only on"><a href="#" onclick="fn_VM1101reauthGW(); return false;" title="게이트웨이 재인증"><em>게이트웨이</em>재인증</a></p>
							</div>
						</div>
					</c:if>
					<!-- //재인증 버튼 -->
				</div>
			</section>
			<section>
				<ul class="condition_list" id="condition_list">
					<li>
						<div id="alarm_ctrl" class="alarm_control open" style="background-color:#ffffff;">		
						<h3 >알람 일시정지 기간 설정(현재 ~ 설정일)</h3>
							<div class="setting_area">
								<div class="btn_sub">
									<p class="pauseStart">정지 시작일</p>
									<p class="pauseEnd">정지 종료일</p>
								</div>
								<div class="form_row">
									<div class="inputBox" style="display: flex; justify-content: space-between"  id="alarmDate">					
										<input type="date" id="yyyymmdd1" style="width: 48%; text-align: center" value="">
										<input type="date" id="yyyymmdd2" style="width: 48%; text-align: center" value="">	
									</div>	
								</div>	
								<div class="btn_sub">	
									<a href="#" class="pausePlus" id="extend180" onclick="fn_VM1101PauseDayExtend(this); return false;">+180일</a>
									<a href="#" class="pausePlus" id="extend30" onclick="fn_VM1101PauseDayExtend(this); return false;">+30일</a>	
									<a href="#" class="pausePlus" id="extend7" onclick="fn_VM1101PauseDayExtend(this); return false;">+7일</a>
									<a href="#" class="pausePlus" id="extend1" onclick="fn_VM1101PauseDayExtend(this); return false;">+1일</a>	
									<a href="#" class="pausePlus" onclick="fn_VM1101PauseDayReset(this); return false;">초기화</a>	
								</div>
							</div>	
							<div class="setting_area">	
								<div class="btn_sub">
									<p class="extend">
										<a href="#" onclick="fn_VM1101PauseAlarm(this); return false;">중지시작</a>
									</p>	
									<p class="end">
										<a href="#" onclick="fn_VM1101PauseEnd(this); return false;">종료</a>
									</p>
								</div>	
							</div>	
							<h3>알람 중지 시간 설정</h3>	
							<div class="setting_area">	
								<div class="form_row" id="selectPause">
								</div>			
								<div class="btn_sub">	
									<p class="extend">
										<a href="#" onclick="fn_VM1101PauseAlarmSetting(this); return false;">중지설정</a>
									</p>
									<p class="end">
										<a href="#" onclick="fn_VM1101PauseAlarmSettingEnd(this); return false;">종료</a>
									</p>
								</div>		
							</div>	
						</div>
					</li>
				</ul>
			</section>
		</div>
		<!-- //container -->
	</div>
	<!-- //wrap -->

	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->

	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1101.js"></script>
	<!-- //viewJs import -->
</body>
</html>