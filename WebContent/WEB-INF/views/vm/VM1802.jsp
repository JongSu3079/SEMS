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
						<a href="javascript:fn_VM1802Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>정기점검 조치내용</h2>
					</div>
					<!-- //타이틀 -->
				</div>
				<!-- //툴바영역 -->
			</div>
		</header>
		<!-- //header -->
		
		<!-- container -->
		<div id="container">
			<!-- 정기점검 대상 점포 정보 영역 -->
			<div class="setting_area">
				<!-- 파라미터 영역 -->
				<input type="hidden" id="initStrCd"		name="initStrCd"	value="${pageParam.initStrCd}"/>
				<input type="hidden" id="yyyymm"		name="yyyymm"		value="${pageParam.yyyymm}"/>
				<input type="hidden" id="mntncType"		name="mntncType"	value="${pageParam.mntncType}"/>
				<!-- //파라미터 영역 -->
				
				<fieldset>
					<div class="info">
						<div class="info_title">
							<h3>${pageParam.strNm}</h3>
						</div>
						
						<div class="info_detail">
							<span>
								점포명 : <span id="strNm"></span><br/>
								점검일자 : <span id="yyyymmdd"></span><br/>
								담당기사 : <span id="vendorUser"></span><br/>
								총괄명 : <span id="sector"></span><br/>
							</span>
						</div>
					</div>
				</fieldset>
			</div>
			<!-- //정기점검 대상 점포 정보 영역 -->
			
			<section>
				<div class="setting_area">
					<div class="form_row" id="operStatdiv">
						<h3 >점포 특이사항</h3>
						<div class="inputBox">
							<input type="text" id="operStat" value="" readonly/>
						</div>
						<div class="inputBox" id="operNoteDiv">
							<textarea rows="3" id="operNote" name="operNote" style="resize:none;" readonly></textarea>
						</div>
					</div>
				</div>
			</section>
			
			<!-- 데이터 테이블 section -->
			<section>
				<div class="form_row" id="checkListDiv" style="display:none;">
					<h3>정기점검 체크 리스트</h3>
					<div class="amountBox">
						<div class="tblBox">
							<table>
								<colgroup>
									<col />
									<col style="width:20%;" />
									<col style="width:20%;" />
								</colgroup>
								<thead>
								<tr>
									<th scope="col">점검유형</th>
									<th scope="col">점검확인</th>
									<th scope="col">내용</th>
								</tr>
								</thead>
								<tbody id="checkListArea">
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
			<!--//데이터 테이블 section -->
			
			<section>
				<div class="setting_area" id="noteDiv" style="display:none;">
					<div class="form_row">
						<h3>점검 특이사항</h3>
						<div class="inputBox">
							<textarea cols="5" rows="5" id="note" name="note" style="resize: none;" readonly></textarea>
						</div>
					</div>
					<div class="form_row">
						<h3>비고</h3>
						<div class="inputBox">
							<textarea cols="5" rows="5" id="subNote" name="subNote" style="resize: none;" readonly></textarea>
						</div>
					</div>
				</div>
			</section>
			
			<section>
				<div class="form_row" id="repairYnDiv" style="display:none;">
					<h3 >부품교체 여부</h3>
					<div class="inputBox">
						<input type="text" id="repairYn" value="" readonly/>
					</div>
				</div>
			</section>
			
			<!-- 데이터 테이블 section -->
			<section>
				<div class="setting_area" id="partRepairDiv" style="display:none;">
					<fieldset>
						<div class="form_row" id="partDiv">
							<h3>부품명</h3>
							<div id="partListDiv"></div>
						</div>
						
						<div class="form_row wide">
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
													<input type="text" id="head_part" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="head_repair" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="head_business" value='0' readonly/>
												</td>
											</tr>
											<tr>
												<td>경영주</td>
												<td class="input">
													<input type="text" id="owner_part" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="owner_repair" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="owner_business" value='0' readonly/>
												</td>
											</tr>
											<tr>
												<td>제조사</td>
												<td class="input">
													<input type="text" id="maker_part" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="maker_repair" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="maker_business" value='0' readonly/>
												</td>
											</tr>
											<tr>
												<td>총계</td>
												<td class="input">
													<input type="text" id="total_part" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="total_repair" value='0' readonly/>
												</td>
												<td class="input">
													<input type="text" id="total_business" value='0' readonly/>
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
													<input type="text" id="totalPrice" value='0' readonly/>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					
						<div class="form_row">
							<h3>처리내용</h3>
							<div class="inputBox">
								<textarea cols="5" rows="5" id="repairNote" name="repairNote" style="resize: none;" readonly></textarea>
							</div>
						</div>
						
					</fieldset>
				</div>
			</section>
			<!--//데이터 테이블 section -->
			
			<section>
				<div class="form_row">
					<h3 >경영주확인란</h3>
					<div class="inputBox">
						<input type="text" id="ownerNm" value="" readonly/>
					</div>
				</div>
				<div class="form_row">
					<h3 >전화번호</h3>
					<div class="inputBox">
						<input type="text" id="telNo" value="" readonly/>
					</div>
				</div>
				<div class="form_row">
					<h3 >서명</h3>
					<div class="inputBox">
						<div id="signImg"></div>
					</div>
				</div>
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
	<script src="/resources/viewJs/vm/VM1802.js"></script>
	<!-- //viewJs import -->
</body>
</html>