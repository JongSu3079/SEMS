<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 조치내역입력</title>
<%@ include file="../cm/header.jsp" %>

<script>
	let asNo 		= "${pageParam.asNo}";
	let errorType 	= "${pageParam.errorType}";
	let vendor 		= "${pageParam.vendor}";
	let vendorUser 	= "${pageParam.vendorUser}";
	let back		= "${pageParam.back}";
	
	let userId		= "${userVo.userId}";
</script>
</head>
<body>
	<form id="returnForm" name="returnForm" method='post'>
		<input type="hidden" id="qStrNm"		name="qStrNm"		value="${pageParam.qStrNm}"/>
		<input type="hidden" id="tabCd"			name="tabCd"		value="${pageParam.tabCd}"/>
		<input type="hidden" id="order"			name="order"		value="${pageParam.order}"/>
	</form>
	
	<form name="movePageForm">
		<input type="hidden" id="movePageParam" name="movePageParam" />
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
				<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:fn_VM2101Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>간판 AS 상세내역</h2>
					</div>
					<!-- //타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
		<!-- 조치내역 영역 -->
			<div class="setting_area">
				<!-- 조치내역입력 폼 -->
				<form id="inputForm" name="inputForm" action="#">
					<!-- 입력 폼 -->
					<fieldset>
						<div class="form_row">
							<h3>접수번호<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox" id="asNoInput">
								<input type="text" 		id="asNo" 			name="asNo" 		value="${pageParam.asNo }" oninput="onlyNumber(this)" style="width:calc(100% - 75px);" />
								<input type="hidden" 	id="asNoFlag" 		name="asNoFlag" 	value="false" />
								<button type="button" 	id="searchAsNo" 	class="dbchk right" >중복확인</button>
								<div class="errorMsg" id='asNoErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>점포명<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
<%-- 								<input id="strNm" name="strNm" type="text" value="${pageParam.strNm}" /> --%>
								<input type="text" 		id="strNm" 			name="strNm" value="${pageParam.strNm}" style="width:calc(100% - 33px);" />
								<button type="button" 	id="searchStrNm" 	class="iconSearch right">점포명 조회</button>
								<div class="errorMsg" id='strNmErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>점포코드<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input id="viewStrCd" name="viewStrCd" type="text" value="${pageParam.viewStrCd}" />
								<div class="errorMsg" id='viewStrCdErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>주소<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input id="addr" name="addr" type="text" value="${pageParam.addr}" />
								<div class="errorMsg" id='addrErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>장애유형<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox" id="errorTypeDiv">
								<input type="hidden" id="errorTypeCd" name="errorTypeCd">
								<input type="hidden" id="errorType" name="errorType">
								<select id="errorType_1" title="장애유형 선택">
									<option value="">선택</option>
								</select>
								<div class="errorMsg" id='errorTypeErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>긴급도</h3>
							<div class="inputBox">
								<select id="emergencyLevel" name="emergencyLevel" title="긴급도 선택">
									<option value="B" >B</option>
									<option value="A" >A</option>
									<option value="S" >S</option>
									<option value="SS">SS</option>
								</select>
								<div class="errorMsg" id='emergencyLevelErrorMsg'></div>
							</div>
						</div>
						
						<c:if test='${userVo.authId eq 13}'>
							<div class="form_row">
								<div class="inputBox checkbox">
									<input type="hidden" 		id="toMe" 		name="toMe"/>
									<input type="checkbox" 		id="toMeChk" />
									<label for="toMeChk"><h3>나에게 접수</h3></label>
								</div>
							</div>
						</c:if>
						
						<div class="form_row">
							<h3>간판업체<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<select id="vendor" name="vendor">
									<option value="">선택</option>
								</select>
								<div class="errorMsg" id='vendorErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>담당기사<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<select id="vendorUser" name="vendorUser">
									<option value="">선택</option>
								</select>
								<div class="errorMsg" id='vendorUserErrorMsg'></div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>전화번호</h3>
							<div class="inputBox">
								<input id="telNo" name="telNo" type="text" value="${pageParam.telNo}" oninput="telAutoHyphen(this)" maxlength="13" />
							</div>
						</div>
						
						<div class="form_row">
							<h3>접수내용</h3>
							<div id="asNoteArea" class="inputBox">
								<textarea id="as_note" name="asNote" cols="5" rows="5">${pageParam.asNote}</textarea>
							</div>
						</div>
					</fieldset>
					<!-- //입력 폼 -->
				</form>
				<!-- //조치내역입력 폼 -->
				
				<!-- 버튼 영역 -->
				<div class="btn_grp">
					<div class="btn_act" >
						<a href="#" class="btn_save" id="checkBtn" 		onclick="javascript:fn_VM2103SaveAs(); return false;" style="margin: 25px 0 10px 10px;">접수</a>
					</div>
				</div>
				<!-- //버튼 영역 -->
			</div>
			<!-- //조치내역 영역 -->
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
	<script src="/resources/viewJs/vm/VM2103.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>
