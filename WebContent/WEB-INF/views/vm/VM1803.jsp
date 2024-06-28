<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 조치내용확인</title>

	<%@ include file="../cm/header.jsp" %>
</head>

<body>
<form id="returnFrom" name="returnForm" method='post'>
	<input type="hidden" id="qStrNm"	name="qStrNm"		value="${pageParam.qStrNm}"/>
	<input type="hidden" id="tabCd"		name="tabCd"		value="${pageParam.tabCd}"/>
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
					<a href="javascript:fn_VM1803Redirect();" title="이전화면" class="btn_previous">이전화면</a>
				</div>
				<!-- //이전화면 아이콘 버튼 -->

				<!-- 타이틀 -->
				<div class="title_header_search">
					<h2>AS 조치내용</h2>
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
			<!-- 입력 폼 -->
			<fieldset>
				<div class="form_row">
					<h3>접수번호</h3>
					<div class="inputBox">
						<input id="asNo" type="text" value="${pageParam.asNo}" readonly/>
					</div>
				</div>
				<div class="form_row">
					<h3>점포코드</h3>
					<div class="inputBox">
						<input id="viewStrCd" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>점포명</h3>
					<div class="inputBox">
						<input id="strNm" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>접수일시</h3>
					<div class="inputBox">
						<input id="asDttm" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>처리일시</h3>
					<div class="inputBox">
						<input id="resolveDttm" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>장애유형</h3>
					<div class="inputBox">
						<input id="errorType" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>긴급도</h3>
					<div class="inputBox">
						<input id="emergencyLevel" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>담당기사</h3>
					<div class="inputBox">
						<input id="vendorUserNm" type="text" value="" readonly/>
					</div>
				</div>

				<div class="form_row">
					<h3>접수 제목</h3>
					<div class="inputBox">
						<textarea id="asTitle" name="asTitle" style="height: 45px; resize: none;" readonly></textarea>
					</div>
				</div>

				<div class="form_row">
					<h3>접수내용</h3>
					<div id="asNoteArea" class="inputBox">
						<textarea id="asNote" cols="5" rows="5" style="resize: none;" readonly></textarea>
					</div>
				</div>

				<c:if test="tabCd=='A'">
					<div class="form_row" id="partDiv">
						<h3>부품명</h3>
						<div id="partListDiv"></div>
					</div>
					<div class="form_row " >
						<h3>부품 교체 비용</h3>
						<div class="inputBox">
							<div class="tblBox">
								<table>
									<colgroup>
										<col />
										<col style="width: 25%;" />
										<col style="width: 25%;" />
										<col style="width: 25%;" />
									</colgroup>
									<thead>
									<tr>
										<th scope="colgroup" colspan="4">부품 교체</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>본부</td>
										<td class="input">
											<input type="text" id="head_part" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="head_repair" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="head_business" value="0" readonly/>
										</td>
									</tr>
									<tr>
										<td>경영주</td>
										<td class="input">
											<input type="text" id="owner_part" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="owner_repair" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="owner_business" value="0" readonly/>
										</td>
									</tr>
									<tr>
										<td>제조사</td>
										<td class="input">
											<input type="text" id="maker_part" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="maker_repair" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="maker_business" value="0" readonly/>
										</td>
									</tr>
									<tr>
										<td>총계</td>
										<td class="input">
											<input type="text" id="total_part" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="total_repair" value="0" readonly/>
										</td>
										<td class="input">
											<input type="text" id="total_business" value="0" readonly/>
										</td>
									</tr>
									</tbody>
								</table>

								<table>
									<colgroup>
										<col />
										<col style="width: 25%;" />
										<col style="width: 25%;" />
										<col style="width: 25%;" />
									</colgroup>
									<thead>
									<tr>
										<th scope="colgroup" colspan="4">종합</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>처리비용</td>
										<td class="input" colspan="3">
											<input type="text" id="totalPrice" value="0" readonly/>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					</c:if>
					
					<div class="form_row">
						<h3>처리내용</h3>
						<div class="inputBox">
							<span class="notification" style="width: calc(13% - 3px);">집기명</span>
							<input type="text"  id="resolveCd_0" style="width: calc(87% - 3px); margin-bottom: 1px;" readonly/>
							<span class="notification" style="width: calc(13% - 3px);">제조사</span>
							<input type="text"  id="resolveCd_1" style="width: calc(87% - 3px); margin-bottom: 1px;" readonly/>
							<span class="notification" style="width: calc(13% - 3px);">불량내용</span>
							<input type="text"  id="resolveCd_2" style="width: calc(87% - 3px); margin-bottom: 1px;" readonly/>
							<span class="notification" style="width: calc(13% - 3px);">불량원인</span>
							<input type="text"  id="resolveCd_3" style="width: calc(87% - 3px); margin-bottom: 1px;" readonly/>
							<span class="notification" style="width: calc(13% - 3px);">처리내용</span>
							<input type="text"  id="resolveCd_4" style="width: calc(87% - 3px); margin-bottom: 1px;" readonly/>
						</div>
						<div class="inputBox">
							<textarea id="resolveNote" cols="5" rows="5" style="resize: none;" readonly></textarea>
						</div>
					</div>
					
					<div class="form_row">
						<h3>비고</h3>
						<div class="inputBox">
							<textarea id="subNote" cols="5" rows="2" style="resize: none;" readonly></textarea>
						</div>
					</div>
					
					<div class="form_row">
						<h3>경영주확인란</h3>
						<div class="inputBox">
							<input type="text"  id="ownerNm" readonly/>
						</div>
					</div>
	
					<div class="form_row">
						<h3>전화번호</h3>
						<div class="inputBox">
							<input type="text" id="ownerTelNo" readonly>
						</div>
					</div>
	
					<div class="form_row">
						<h3>경영주 의견</h3>
						<div class="inputBox">
							<textarea id="ownerNote" cols="5" rows="5" style="resize: none;" readonly></textarea>
						</div>
					</div>
					
				</div>

				

				<div class="form_row">
					<h3 >서명</h3>
					<div class="inputBox">
						<div id="signImg"></div>
					</div>
				</div>
			</fieldset>
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
<script src="/resources/viewJs/vm/VM1803.js"></script>
<!-- //viewJs import -->
</body>
</html>