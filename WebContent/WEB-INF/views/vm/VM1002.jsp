<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 유지보수 상세</title>
<%@ include file="../cm/header.jsp" %>

<script src="/resources/js/jquery.form.min.js"></script>


<script>
	var mode = "${paramData.mode}";
	var img1data = "${detailData.pic1data}";
	var img2data = "${detailData.pic2data}";
	var img3data = "${detailData.pic3data}";
	var img4data = "${detailData.pic4data}";
	var imgDataArr = [ img1data, img2data, img3data, img4data ];
</script>
</head>
<body>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${wkWebViewYn}">
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="#" onClick="history.go(-1); return false;" title="이전화면" class="btn_previous" id="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>
							<c:out value="${ paramData.titleTxt }" />
						</h2>
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
				<form id="inputForm" name="inputForm" enctype="multipart/form-data" method="post" onsubmit="return false;">
					<fieldset>
						<legend>유지보수 상세 내용 입력</legend>
						
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input type="text" 		id="scrStrNm" 	name="scrStrNm" title="점포명" value="${paramData.strNm }" readonly="readonly" />
								<input type="hidden" 	id="scrStrCd" 	name="scrStrCd" value="${paramData.strCd }"/>
								<input type="hidden" 	id="mode" 		name="mode" value="${paramData.mode }"/>
								<input type="hidden" 	id="no" 		name="no" value="${detailData.no }"/>
								<input type="hidden" 	id="cameraAuth" name ="cameraAuth" />
							</div>
						</div>
						
						<div class="form_row">
							<h3>
								접수<span class="criticalItems">필수항목</span>
							</h3>
							<div class="inputBox">
								<input type="text" id="recvDate" name="recvDate" title="접수일자 입력(필수항목)" value="${detailData.recvDt }" style="width: calc(50% - 3px);" />
								<select title="접수구분(필수항목)" id="recvType" name="recvType" class="right" style="width: calc(50% - 3px);">
									<c:forEach var="vo" items="${asRecvList}">
										<option value="${vo.commCd}"
											<c:if test="${detailData.recvType == vo.commCd}"> selected </c:if>>${vo.commCdNm}
										</option>
									</c:forEach>
								</select>
							</div>
						</div>
						
						<div class="form_row">
							<h3>
								처리<span class="criticalItems">필수항목</span>
							</h3>
							<div class="inputBox">
								<input type="text" id="solveDate" name="solveDate" title="처리일자 입력(필수항목)" value="${detailData.solveDt }" style="width: calc(50% - 3px);" />
								<input type="text" id="solveName" name="solveName" title="처리자 입력(필수항목)" value="${detailData.solveNm }" placeholder="처리자" class="right" 	style="width: calc(50% - 3px);" />
							</div>
						</div>
						
						<div class="form_row wide">
							<h3>설치장비</h3>
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
												<th scope="colgroup" colspan="4">SEMS 장비</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>SEMS</td>
												<td class="input">
													<select id="boxVer" name="boxVer">
														<option value="1.5" <c:if test="${detailData.boxVer == 1.5}">selected</c:if>>v1.5</option>
														<option value="2.0" <c:if test="${detailData.boxVer == 2.0}">selected</c:if>>v2.0</option>
														<option value="3.0" <c:if test="${detailData.boxVer == 3.0}">selected</c:if>>v3.0</option>
													</select>
												</td>
												<td>하콘</td>
												<td class="input">
													<select id="haconCnt" name="haconCnt">
														<option value="0" <c:if test="${detailData.haconCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.haconCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.haconCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>티센서</td>
												<td class="input">
													<select id="tSensorCnt" name="tSensorCnt">
														<option value="0" <c:if test="${detailData.tSensorCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.tSensorCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.tSensorCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
												<td>테몬</td>
												<td class="input">
													<select id="temonCnt" name="temonCnt">
														<option value="0" <c:if test="${detailData.temonCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.temonCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.temonCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>하콘몬</td>
												<td class="input">
													<select id="haconmonCnt" name="haconmonCnt">
														<option value="0" <c:if test="${detailData.haconmonCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.haconmonCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.haconmonCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
												<td>인버터허브</td>
												<td class="input">
													<select id="invHubCnt" name="invHubCnt">
														<option value="0" <c:if test="${detailData.invHubCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.invHubCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.invHubCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
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
												<th scope="colgroup" colspan="4">점포 설비</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>INV_WIC</td>
												<td class="input">
													<select id="invWicCnt" name="invWicCnt">
														<option value="0" <c:if test="${detailData.invWicCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.invWicCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.invWicCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
												<td>INV_OSC</td>
												<td class="input">
													<select id="invOscCnt" name="invOscCnt">
														<option value="0" <c:if test="${detailData.invOscCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.invOscCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.invOscCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>RIF</td>
												<td class="input">
													<select id="rifCnt" name="rifCnt">
														<option value="0" <c:if test="${detailData.rifCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.rifCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.rifCnt == 2}">selected</c:if>>2개</option>
														<option value="3" <c:if test="${detailData.rifCnt == 3}">selected</c:if>>3개</option>
														<option value="4" <c:if test="${detailData.rifCnt == 4}">selected</c:if>>4개</option>
														<option value="5" <c:if test="${detailData.rifCnt == 5}">selected</c:if>>5개</option>
													</select>
												</td>
												<td>RIC</td>
												<td class="input">
													<select id="ricCnt" name="ricCnt">
														<option value="0" <c:if test="${detailData.ricCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.ricCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.ricCnt == 2}">selected</c:if>>2개</option>
														<option value="3" <c:if test="${detailData.ricCnt == 3}">selected</c:if>>3개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>OSC</td>
												<td class="input">
													<select id="oscCnt" name="oscCnt">
														<option value="0" <c:if test="${detailData.oscCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.oscCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.oscCnt == 2}">selected</c:if>>2개</option>
														<option value="3" <c:if test="${detailData.oscCnt == 3}">selected</c:if>>3개</option>
														<option value="4" <c:if test="${detailData.oscCnt == 4}">selected</c:if>>4개</option>
														<option value="5" <c:if test="${detailData.oscCnt == 5}">selected</c:if>>5개</option>
														<option value="6" <c:if test="${detailData.oscCnt == 6}">selected</c:if>>6개</option>
													</select>
												</td>
												<td>ICC</td>
												<td class="input">
													<select id="iccCnt" name="iccCnt">
														<option value="0" <c:if test="${detailData.iccCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.iccCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.iccCnt == 2}">selected</c:if>>2개</option>
														<option value="3" <c:if test="${detailData.iccCnt == 3}">selected</c:if>>3개</option>
														<option value="4" <c:if test="${detailData.iccCnt == 4}">selected</c:if>>4개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>냉동평대 상</td>
												<td class="input">
													<select id="iftCnt" name="iftCnt">
														<option value="0" <c:if test="${detailData.iftCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.iftCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.iftCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
												<td>냉동평대 하</td>
												<td class="input">
													<select id="ifbCnt" name="ifbCnt">
														<option value="0" <c:if test="${detailData.ifbCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.ifbCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.ifbCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
											<tr>
												<td>냉동콤비 상</td>
												<td class="input">
													<select id="cftCnt" name="cftCnt">
														<option value="0" <c:if test="${detailData.cftCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.cftCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.cftCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
												<td>냉동콤비 하</td>
												<td class="input">
													<select id="cfbCnt" name="cfbCnt">
														<option value="0" <c:if test="${detailData.cfbCnt == 0}">selected</c:if>>0개</option>
														<option value="1" <c:if test="${detailData.cfbCnt == 1}">selected</c:if>>1개</option>
														<option value="2" <c:if test="${detailData.cfbCnt == 2}">selected</c:if>>2개</option>
													</select>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						
						<div class="form_row">
							<h3>
								오류내용<span class="criticalItems">필수항목</span>
							</h3>
							<div class="inputBox">
								<select id="errorType" name="errorType" title="오류구분(필수항목)">
									<c:forEach var="vo" items="${asErrorList}">
										<option value="${vo.commCd}" <c:if test="${detailData.errorType == vo.commCd}"> selected </c:if>>${vo.commCdNm}</option>
									</c:forEach>
								</select>
							</div>
							<div class="inputBox">
								<textarea cols="5" rows="5" id="errorMsg" name="errorMsg" title="오류내용 직접입력(필수항목)" placeholder="오류내용을 입력하세요">${detailData.errorMsg}</textarea>
							</div>
						</div>
						
						<div class="form_row">
							<h3>
								처리내용<span class="criticalItems">필수항목</span>
							</h3>
							<div class="inputBox">
								<select id="solveResult" name="solveResult" title="처리구분(필수항목)">
									<c:forEach var="vo" items="${asSolveList}">
										<option value="${vo.commCd}" <c:if test="${detailData.solveResult == vo.commCd}"> selected </c:if>>${vo.commCdNm}</option>
									</c:forEach>
								</select>
							</div>
							<div class="inputBox">
								<textarea cols="5" rows="5" id="solveMsg" name="solveMsg" title="처리내용 직접입력(필수항목)" placeholder="처리내용을 입력하세요">${detailData.solveMsg}</textarea>
							</div>
							<div class="inputBox"></div>
						</div>
						
						<div class="form_row">
							<h3>비고</h3>
							<div class="inputBox">
								<textarea cols="5" rows="5" id="noteMsg" name="noteMsg" title="비고내용 직접입력(필수항목)" placeholder="비고내용을 입력하세요">${detailData.noteMsg}</textarea>
							</div>
							<div class="inputBox"></div>
						</div>
						
						<div class="form_row wide">
							<h3>점포사진</h3>
							<div class="inputBox">
								<div class="tblBox">
									<table>
										<colgroup>
											<col />
											<col style="width:80%;" />
										</colgroup>
										<thead>
										<tr>
											<th scope="col">구분</th>
											<th scope="col">사진</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>간판<span class="criticalItems">필수항목</span></td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img1" alt="간판 사진" src="/${smCommonImagesPath}/bg_thumb.png" />
													</div>
													<div class="filebox">
														<label for="file1">업로드</label>
														<input type="file" accept="image/*" id="file1" name="file1"/>
														<input type="hidden" id="file1flag" name="file1flag" value="false" />
														<input type="hidden" id="file1url" name="file1url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>작업전</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img2" alt="작업전 사진" src="/${smCommonImagesPath}/bg_thumb.png" />
													</div>
													<div class="filebox">
														<label for="file2">업로드</label>
														<input type="file" accept="image/*" id="file2" name="file2"/>
														<input type="hidden" id="file2flag" name="file2flag" value="false" />
														<input type="hidden" id="file2url" name="file2url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>작업후</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img3" alt="작업후 사진" src="/${smCommonImagesPath}/bg_thumb.png" />
													</div>
													<div class="filebox">
														<label for="file3">업로드</label>
														<input type="file" accept="image/*" id="file3" name="file3"/>
														<input type="hidden" id="file3flag" name="file3flag" value="false" />
														<input type="hidden" id="file3url" name="file3url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>교체품</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img4" alt="교체품 사진" src="/${smCommonImagesPath}/bg_thumb.png" />
													</div>
													<div class="filebox">
														<label for="file4">업로드</label>
														<input type="file" accept="image/*" id="file4" name="file4" />
														<input type="hidden" id="file4flag" name="file4flag" value="false" />
														<input type="hidden" id="file4url" name="file4url" />
													</div>
												</div>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						
					</fieldset>
				</form>
				
				<div class="btn_save">
					<p>
						<a onclick="javascript:fn_VM1002save();">저장</a>
					</p>
				</div>
				<!-- //조치내역입력 폼 -->
			</div>
			<!-- //컨테이너 영역 -->
		</div>
	</div>
	<!-- //wrap -->
	
	<div class="dim none"></div>
	<div class="combobox none">
		<div class="filebox camera">
			<label for="file5">카메라</label>
			<input type="file" accept="image/*" id="file5" capture="camera" />
		</div>
		<div class="filebox album">
			<label for="file6" id="album_btn">앨범</label>
			<input type="file" accept="image/*" id="file6" />
		</div>
	</div>
	
	<canvas id="tempCanvas" style="display:none;" ></canvas>
	
	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->
	
	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM1002.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>