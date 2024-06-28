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

<script src="/resources/js/jquery.form.min.js"></script>
<script src="/resources/js/signature_pad.min.js"></script>
<script src="/resources/js/aws-sdk.min.js"></script>

<script>
	let asNo 			= "${pageParam.asNo}";
	let errorType 		= "${pageParam.errorType}";
	let emergencyLevel 	= "${pageParam.emergencyLevel}";
	let vendorCd 		= "${pageParam.vendorCd}";
	let vendorUserId 	= "${pageParam.vendorUserId}";
	let partGrpCd 		= "${pageParam.partGrpCd}";
	let tabCd			= "${pageParam.tabCd}";
	let userId			= "${userVo.userId}";
	let vendorNm		= "${pageParam.vendorNm}";
</script>
</head>
<body>
	<form id="returnForm" name="returnForm" method='post'>
		<input type="hidden" id="qStrNm"		name="qStrNm"		value="${pageParam.qStrNm}"/>
		<input type="hidden" id="tabCd"			name="tabCd"		value="${pageParam.tabCd}"/>
		<input type="hidden" id="order"			name="order"		value="${pageParam.order}"/>
		<input type="hidden" id="userId"		name="userId"		value="${userVo.userId}"/>
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${ wkWebViewYn }">
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:fn_VM2102Redirect();" title="이전화면" class="btn_previous">이전화면</a>
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
							<h3>접수번호</h3>
							<div class="inputBox">
								<input id="asNo" type="text" value="${pageParam.asNo}" readonly/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>점포코드</h3>
							<div class="inputBox">
								<input id="viewStrCd" name="viewStrCd" type="text" value="${pageParam.viewStrCd}" readonly/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input id="strNm" name="strNm" type="text" value="${pageParam.strNm}" readonly/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>주소</h3>
							<div class="inputBox">
								<input id="addr" name="addr" type="text" value="${pageParam.addr}" readonly/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>접수일시</h3>
							<div class="inputBox">
								<input id="asDttm" name="asDttm" type="text" value="${pageParam.asDttm}" readonly/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>장애유형</h3>
							<div class="inputBox">
								<input type="hidden" id="errorTypeCd" name="errorTypeCd">
								<input type="hidden" id="errorType" name="errorType">
								<select id="errorType_1" name="errorType_1" title="장애유형 선택">
									<option value="">선택</option>
								</select>
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
							</div>
						</div>
						
						<c:if test='${userVo.authId eq 13 and pageParam.tabCd eq "U"}'>
							<div class="form_row">
								<div class="inputBox checkbox">
									<input type="hidden" 		id="toMe" 		name="toMe"/>
									<input type="checkbox" 		id="toMeChk" />
									<label for="toMeChk"><h3>나에게 접수</h3></label>
								</div>
							</div>
						</c:if>
						
						<div class="form_row">
							<h3>간판업체</h3>
							<div class="inputBox">
								<input id="vendorNm" name="vendorNm" type="text" value="${pageParam.vendorNm}" readonly/>
								<input id="vendorCd" name="vendorCd" type="hidden" value="${pageParam.vendorCd}"/>
							</div>
						</div>
						
						<div class="form_row">
							<h3>담당기사</h3>
							<div class="inputBox">
<%-- 								<input id="vendorUserNm" name="vendorUserNm" type="text" value="${pageParam.vendorUserNm}" readonly/> --%>
<%-- 								<input id="vendorUserId" name="vendorUserId" type="hidden" value="${pageParam.vendorUserId}"/> --%>
								<input id="vendorUserNm" name="vendorUserNm" type="text" value="${pageParam.vendorUserNm}" readonly style="display:none;" />
								<input id="vendorUserId" name="vendorUserId" type="hidden" value="${pageParam.vendorUserId}" />
								<select id="vendorUser" name="vendorUser">
									<option value="">선택</option>
								</select>
							</div>
						</div>
						
						<div class="form_row">
							<h3>전화번호</h3>
							<div class="inputBox">
								<input id="telNo" name="telNo" type="text" value="${pageParam.telNo}" oninput="telAutoHyphen(this)" maxlength="13" />
							</div>
						</div>
						
						<div class="form_row">
							<h3>접수 제목</h3>
							<div class="inputBox">
								<textarea id="as_title" name="asTitle" style="height: 45px; resize: none;" readonly>${pageParam.asTitle}</textarea>
							</div>
						</div>
						
						<div class="form_row">
							<h3>접수내용</h3>
							<div id="asNoteArea" class="inputBox">
								<textarea id="as_note" name="asNote" cols="5" rows="5" style="resize: none;">${pageParam.asNote}</textarea>
							</div>
						</div>
					</fieldset>
					<!-- //입력 폼 -->
				</form>
				<!-- //조치내역입력 폼 -->
				
				<form id="inputForm2" name="inputForm2" action="#">
					<fieldset id="resolveSection" style="display:none;">
						<div class="form_row">
							<h3>처리내용</h3>
							<div class="inputBox">
								<textarea id="resolveNote" name="resolveNote" title="처리내용" cols="5" rows="5" style="resize: none;" ></textarea>
							</div>
						</div>
						
						<div class="form_row">
							<h3>비고</h3>
							<div class="inputBox">
								<textarea id="subNote" name="subNote" title="비고" cols="5" rows="2" style="resize: none;" ></textarea>
							</div>
						</div>
						
						
						<section id="imgSection" style="display:none;">
							<div class="form_row">
								<h3>이미지 첨부</h3>
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
												<td>이미지1</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img1" alt="이미지1" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="file1">업로드</label>
															<input type="file" accept="image/*" id="file1"/>
															<input type="hidden" id="file1flag" name="file1flag" value="false" />
															<input type="hidden" id="file1url" name="file1url" />
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>이미지2</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img2" alt="이미지2" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="file2">업로드</label>
															<input type="file" accept="image/*" id="file2"/>
															<input type="hidden" id="file2flag" name="file2flag" value="false" />
															<input type="hidden" id="file2url" name="file2url" />
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>이미지3</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img3" alt="이미지3" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="file3">업로드</label>
															<input type="file" accept="image/*" id="file3"/>
															<input type="hidden" id="file3flag" name="file3flag" value="false" />
															<input type="hidden" id="file3url" name="file3url" />
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>이미지4</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img4" alt="이미지4" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="file4">업로드</label>
															<input type="file" accept="image/*" id="file4"/>
															<input type="hidden" id="file4flag" name="file4flag" value="false" />
															<input type="hidden" id="file4url" name="file4url" />
														</div>
													</div>
												</td>
											</tr>
											<tr>
												<td>이미지5</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img5" alt="이미지5" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="file5">업로드</label>
															<input type="file" accept="image/*" id="file5"/>
															<input type="hidden" id="file5flag" name="file5flag" value="false" />
															<input type="hidden" id="file5url" name="file5url" />
														</div>
													</div>
												</td>
											</tr>
<%--											<tr>--%>
<%--												<td>이미지6</td>--%>
<%--												<td>--%>
<%--													<div class="thumbBox">--%>
<%--														<div class="imgBox">--%>
<%--															<img id="img6" alt="이미지6" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--														</div>--%>
<%--														<div class="filebox">--%>
<%--															<label for="file6">업로드</label>--%>
<%--															<input type="file" accept="image/*" id="file6" name="file6"/>--%>
<%--															<input type="hidden" id="file6flag" name="file6flag" value="false" />--%>
<%--															<input type="hidden" id="file6url" name="file6url" />--%>
<%--														</div>--%>
<%--													</div>--%>
<%--												</td>--%>
<%--											</tr>--%>
<%--											<tr>--%>
<%--												<td>이미지7</td>--%>
<%--												<td>--%>
<%--													<div class="thumbBox">--%>
<%--														<div class="imgBox">--%>
<%--															<img id="img7" alt="이미지7" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--														</div>--%>
<%--														<div class="filebox">--%>
<%--															<label for="file7">업로드</label>--%>
<%--															<input type="file" accept="image/*" id="file7" name="file7"/>--%>
<%--															<input type="hidden" id="file7flag" name="file7flag" value="false" />--%>
<%--															<input type="hidden" id="file7url" name="file7url" />--%>
<%--														</div>--%>
<%--													</div>--%>
<%--												</td>--%>
<%--											</tr>--%>
<%--											<tr>--%>
<%--												<td>이미지8</td>--%>
<%--												<td>--%>
<%--													<div class="thumbBox">--%>
<%--														<div class="imgBox">--%>
<%--															<img id="img8" alt="이미지8" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--														</div>--%>
<%--														<div class="filebox">--%>
<%--															<label for="file8">업로드</label>--%>
<%--															<input type="file" accept="image/*" id="file8" name="file8"/>--%>
<%--															<input type="hidden" id="file8flag" name="file8flag" value="false" />--%>
<%--															<input type="hidden" id="file8url" name="file8url" />--%>
<%--														</div>--%>
<%--													</div>--%>
<%--												</td>--%>
<%--											</tr>--%>
<%--											<tr>--%>
<%--												<td>이미지9</td>--%>
<%--												<td>--%>
<%--													<div class="thumbBox">--%>
<%--														<div class="imgBox">--%>
<%--															<img id="img9" alt="이미지9" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--														</div>--%>
<%--														<div class="filebox">--%>
<%--															<label for="file9">업로드</label>--%>
<%--															<input type="file" accept="image/*" id="file9" name="file9"/>--%>
<%--															<input type="hidden" id="file9flag" name="file9flag" value="false" />--%>
<%--															<input type="hidden" id="file9url" name="file9url" />--%>
<%--														</div>--%>
<%--													</div>--%>
<%--												</td>--%>
<%--											</tr>--%>
<%--											<tr>--%>
<%--												<td>이미지10</td>--%>
<%--												<td>--%>
<%--													<div class="thumbBox">--%>
<%--														<div class="imgBox">--%>
<%--															<img id="img10" alt="이미지10" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--														</div>--%>
<%--														<div class="filebox">--%>
<%--															<label for="file10">업로드</label>--%>
<%--															<input type="file" accept="image/*" id="file10" name="file10"/>--%>
<%--															<input type="hidden" id="file10flag" name="file10flag" value="false" />--%>
<%--															<input type="hidden" id="file10url" name="file10url" />--%>
<%--														</div>--%>
<%--													</div>--%>
<%--												</td>--%>
<%--											</tr>--%>
											<tr style="display:none;">
												<td>서명 이미지</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img0" alt="이미지0" src="/${smCommonImagesPath}/bg_thumb.png" />
														</div>
														<div class="filebox">
															<label for="img0">업로드</label>
															<input type="file" accept="image/*" id="file0" name="signImgFile"/>
															<input type="hidden" id="file0flag" name="file0flag" value="false" />
															<input type="hidden" id="file0url" name="file0url" />
														</div>
													</div>
												</td>
											</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div class="form_row">
							<h3>근무자확인란</h3>
							<div class="inputBox">
								<input type="text" 		id="ownerNm" 	name="ownerNm" title="근무자확인란" placeholder="근무자 성명을 입력하세요"/>
							</div>
						</div>
						<div class="form_row">
							<h3>전화번호</h3>
							<div class="inputBox">
								<input type="text" 		id="ownerTelNo" name="ownerTelNo" oninput="telAutoHyphen(this)" maxlength="13" placeholder="전화번호를 입력하세요">
							</div>
						</div>
						
						<div class="form_row">
							<h3>근무자 의견</h3>
							<div class="inputBox">
								<textarea id="ownerNote" name="ownerNote" cols="5" rows="5" style="resize: none;" ></textarea>
							</div>
						</div>
						<div class="form_row">
							<div class="inputBox checkbox">
								<input type="hidden" 		id="agreeYn" 	name="agreeYn"/>
								<input type="checkbox" 		id="agreeYnChk" />
								<label for="agreeYnChk" ><h3 style="display:inline-block;">개인정보 수집 및 이용 동의 &nbsp </h3></label>
								<h3 style="display:inline-block;"> <a id="toggle">자세히 ▼</a></h3>
								<textarea id="agreement" style="display:none;resize:none;" readonly="readonly">
본 개인정보 수집 및 이용 동의 약관(이하 '약관')은 (주)에스앤아이코퍼레이션(이하 '회사')이 제공하는 SEMS 엣스퍼트 서비스 및 관련 제반 서비스 (이하 '서비스')와 관련하여 개인정보의 수집 및 이용에 관한 내용을 설명하고 있습니다. 이 약관은 사용자의 개인정보 보호를 위해 작성되었으며, 회사는 이를 엄격히 준수합니다.

[수집하는 개인정보의 항목]
회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다:

1. 성명
2. 전화번호
3. 기타 서비스 이용에 필요한 정보

[개인정보의 수집 및 이용 목적]
회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다:

1. 서비스 제공 및 운영
2. 고객 문의 응답 및 서비스 관련 공지 전달
3. 서비스 개선 및 향상을 위한 통계 및 분석 활용

[개인정보의 보유 및 이용 기간]
회사는 수집한 개인정보를 위에서 명시한 목적을 달성한 후에는 지체 없이 파기하거나 삭제합니다. 다만, 관련 법령에 따라 일정 기간 동안 보관할 필요가 있는 경우 해당 기간 동안 보관하며, 법령에 의해 요구되는 경우 개인정보를 제출합니다.

[개인정보의 제공 및 위탁]
회사는 사용자의 동의 없이 개인정보를 외부에 제공하지 않으며, 이용 목적에 따라 필요한 경우에만 개인정보를 제3자에게 제공할 수 있습니다. 또한, 서비스의 원활한 운영을 위해 필요한 경우에는 개인정보 처리를 위탁할 수 있습니다.

[개인정보의 보안 조치]
회사는 개인정보의 보안을 위해 노력하며, 관련 법령에 따라 안전한 보관 및 처리를 위한 적절한 조치를 취합니다. 개인정보의 유출, 변조, 훼손을 방지하기 위해 노력하며, 보안 위협에 대비한 대응책을 마련합니다.

[사용자의 권리]
개인정보 주체는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리정지 등의 권리를 행사할 수 있습니다. 또한, 개인정보 수집 및 이용에 대한 동의 철회도 가능합니다.
								</textarea>
							</div>
						</div>
						<div class="form_row">
							<div class="inputBox checkbox">
								<input type="hidden" 		id="ownerSignYn" 	name="ownerSignYn"/>
								<input type="checkbox" 		id="ownerSignYnChk" />
								<label for="ownerSignYnChk"><h3>근무자서명거부</h3></label>
								<input type="checkbox" 		id="visitYnChk" />
								<label for="visitYnChk"><h3>전화설명(미방문)</h3></label>
							</div>
						</div>
						<div class="form_row" id="signImgDiv">
							<h3>서명<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox" id="signImgArea">
								<!-- 서명 공간 -->
								<canvas id="signature" style="width:calc(100% - 20px); border:1px solid #000;" height="160px"></canvas>
								<div>
									<button type="button" id="clear">Clear</button>
								</div>
							</div>
						</div>
						<div class="dim none"></div>
							<div class="combobox none">
								<div class="filebox camera">
									<label for="file11">카메라</label>
									<input type="file" accept="image/*" id="file11" capture="camera" />
								</div>
								<div class="filebox album">
									<label for="file12" id="album_btn">앨범</label>
									<input type="file" accept="image/*" id="file12" />
								</div>
							</div>
							<canvas id="tempCanvas" style="display:none;" ></canvas>
						</section>
					</fieldset>
				</form>
				
				<!-- 버튼 영역 -->
				<div class="btn_grp">
					<div class="btn_act" >
						<a href="#" class="btn_save" id="resolveBtn" 	onclick="javascript:fn_VM2102resolveAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">처리완료</a>
						<a href="#" class="btn_save" id="modifyBtn" 	onclick="javascript:fn_VM2102ModifyAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">접수내용수정</a>
						<a href="#" class="btn_save" id="checkBtn" 		onclick="javascript:fn_VM2102CheckAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">확인</a>
						<a href="#" class="btn_save" id="changeBtn" 	onclick="javascript:fn_VM2102ChangeAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">기사변경</a>
<%--						<a href="#" class="btn_save cancel_popup_open" id="cancelBtn" 	style="display:none; margin: 25px 0 10px 10px;">접수취소</a>--%>
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
	<script src="/resources/viewJs/vm/VM2102.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>
