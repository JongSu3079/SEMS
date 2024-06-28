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
						<a href="javascript:fn_VM1702Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>AS 상세내역</h2>
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
						
						<c:if test='${userVo.authId eq 3 and pageParam.tabCd eq "U"}'>
							<div class="form_row">
								<div class="inputBox checkbox">
									<input type="hidden" 		id="toMe" 		name="toMe"/>
									<input type="checkbox" 		id="toMeChk" />
									<label for="toMeChk"><h3>나에게 접수</h3></label>
								</div>
							</div>
						</c:if>
						
						<div class="form_row">
							<h3>냉장비업체</h3>
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
					<fieldset id="resolveSection" >
						<div class="form_row">
							<h3>구분</h3>
							<div class="inputBox">
								<select title="구분" id="target" name="target" class="right" >
									<option value="head">본부</option>
									<option value="owner">경영주</option>
									<option value="maker">제조사무상</option>
								</select>
								<select title="제조사" id="maker" name="maker" class="right"  style="display:none;">
									<option value="">선택</option>
									<c:forEach var="vo" items="${makerList}" varStatus="status" >
										<option value='${vo.makerCd}'>${vo.makerNm}</option>
									</c:forEach>
								</select>
							</div>
						</div>
						
						<div class="form_row" id="partSeachDiv" style="display:none;">
							<h3>부품검색</h3>
							<div class="inputBox" >
								<input type="text" id="searchBox" />
							</div>
						</div>
						
						<div class="form_row" id="partDiv">
							<input type="hidden" id="partJson" name="partJson" />
							<input type="hidden" id="partGrpCd" name="partGrpCd" />
							<h3>부품명</h3>
							<div class="inputBox" id="partDiv_1">
								<span id="partTagetText_1" class="notification" style="width: calc(10% - 3px);">구분</span>
								<select title="대분류" id="part_1" style="width: calc(15% - 3px);">
									<option>선택</option>
								</select>
								<input type="hidden" id="partTarget_1"/>
								<input type="hidden" id="partPrice_1"		value="0"/>
								<input type="hidden" id="repairPrice_1"		value="0"/>
								<input type="hidden" id="businessPrice_1"	value="0"/>
								<input type="hidden" id="compareYn_1"		value=""/>
								<button type="button" id="partRemoveBtn" onclick="fn_VM1702RemovePart(this);" style="display:none;">삭제</button>
							</div>
							<div class="inputBox" >
								<button type="button" id="partAddBtn" onclick="fn_VM1702AddPart();" style="display:none;">추가</button>
							</div>
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
													<input type="text" id="head_part" placeholder="부품비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="head_repair" placeholder="수리비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="head_business" placeholder="출장비" readonly/>
												</td>
											</tr>
											<tr>
												<td>경영주</td>
												<td class="input">
													<input type="text" id="owner_part" placeholder="부품비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="owner_repair" placeholder="수리비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="owner_business" placeholder="출장비" readonly/>
												</td>
											</tr>
											<tr>
												<td>제조사</td>
												<td class="input">
													<input type="text" id="maker_part" placeholder="부품비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="maker_repair" placeholder="수리비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="maker_business" placeholder="출장비" readonly/>
												</td>
											</tr>
											<tr>
												<td>총계</td>
												<td class="input">
													<input type="text" id="total_part" placeholder="부품비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="total_repair" placeholder="수리비" readonly/>
												</td>
												<td class="input">
													<input type="text" id="total_business" placeholder="출장비" readonly/>
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
												<td>모델명</td>
												<td class="input">
													<input type="text" id="modelNm" name="modelNm" placeholder="모델명"/>
												</td>
												<td>시리얼번호</td>
												<td class="input">
													<input type="text" id="serialNo" name="serialNo" placeholder="시리얼번호"/>
												</td>
											</tr>
											<tr>
												<td>처리비용</td>
												<td class="input" colspan="3">
													<input type="text" id="totalPrice" placeholder="처리비용" readonly/>
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
								<input type="hidden" id="resolveCd" name="resolveCd">
								<input type="hidden" id="resolveCdText" name="resolveCdText">
								<span id="resolveCdText_1" class="notification" style="width: calc(13% - 3px);">집기명</span>
								<select id="resolveCd_1" title="처리내용 선택" style="width: calc(87% - 3px);"></select>
							</div>
							<div class="inputBox">
								<textarea id="resolveNote" name="resolveNote" title="처리내용" cols="5" rows="5" style="resize: none;" ></textarea>
							</div>
						</div>
						<section id="subNoteSection" style="display:block;">
						<div class="form_row">
							<h3>비고</h3>
							<div class="inputBox">
								<textarea id="subNote" name="subNote" title="비고" cols="5" rows="2" style="resize: none;" ></textarea>
							</div>
						</div>
						</section>
						
						
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
															<input type="file" accept="image/*" id="file1" name="file1"/>
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
															<input type="file" accept="image/*" id="file2" name="file2"/>
															<input type="hidden" id="file2flag" name="file2flag" value="false" />
															<input type="hidden" id="file2url" name="file2url" />
														</div>
													</div>
												</td>
											</tr>
											<tr style="display:none;">
												<td>서명 이미지</td>
												<td>
													<div class="thumbBox">
														<div class="imgBox">
															<img id="img0" alt="이미지1" src="/${smCommonImagesPath}/bg_thumb.png" />
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
							<h3>경영주확인란<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input type="text" 		id="ownerNm" 	name="ownerNm" title="경영주확인란" placeholder="경영주 성명을 입력하세요"/>
							</div>
						</div>
						<div class="form_row">
							<h3>전화번호<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input type="text" 		id="ownerTelNo" name="ownerTelNo" oninput="telAutoHyphen(this)" maxlength="13" placeholder="전화번호를 입력하세요">
							</div>
						</div>
						
						<div class="form_row">
							<h3>경영주 의견</h3>
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
								<label for="ownerSignYnChk"><h3>경영주서명거부</h3></label>
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
									<label for="file5">카메라</label>
									<input type="file" accept="image/*" id="file5" capture="camera" />
								</div>
								<div class="filebox album">
									<label for="file6" id="album_btn">앨범</label>
									<input type="file" accept="image/*" id="file6" />
								</div>
							</div>
							<canvas id="tempCanvas" style="display:none;" ></canvas>
						</section>
					</fieldset>
				</form>
				
				<!-- 버튼 영역 -->
				<div class="btn_grp">
					<div class="btn_act" >
						<a href="#" class="btn_save" id="resolveBtn" 	onclick="javascript:fn_VM1702resoveAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">처리완료</a>
						<a href="#" class="btn_save" id="modifyBtn" 	onclick="javascript:fn_VM1702ModifyAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">접수내용수정</a>
						<a href="#" class="btn_save" id="checkBtn" 		onclick="javascript:fn_VM1702CheckAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">확인</a>
						<a href="#" class="btn_save" id="changeBtn" 	onclick="javascript:fn_VM1702ChangeAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">기사변경</a>
						<a href="#" class="btn_save" id="saveTempBtn" 	onclick="javascript:fn_VM1702saveTempAs(); return false;" style="display:none; margin: 25px 0 10px 10px;">임시저장</a>
<!-- 						<a href="#" class="btn_save cancel_popup_open" id="cancelBtn" 	style="display:none; margin: 25px 0 10px 10px;">접수취소</a> -->
					</div>
				</div>
				<!-- //버튼 영역 -->
			</div>
			<!-- //조치내역 영역 -->
			
			<!-- 접수취소 레이어 팝업 -->
			<div id="cancel_popup" class="wrap_popup" style="display:none;">
				
				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">접수취소</h2>
					<a href="#" class="cancel_popup_close" title="닫기" id="cancel_popup_close"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->
				
				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<!-- 컨테이너 영역 -->
					<div class="setting_area">
						<!-- 조치내역입력 폼 -->
						<fieldset>
							<legend>접수취소</legend>
							
							<div class="form_row">
								<h3>취소사유<span class="criticalItems">필수항목</span></h3>
								<div class="inputBox">
									<select id="cancelReason">
										<option value="">선택</option>
										<option value="1">다른 파트로 이첩</option>
										<option value="2">경영주 취소</option>
										<option value="3">냉장비 업체 변경</option>
									</select>
								</div>
							</div>
						</fieldset>
						
						<div class="btn_grp">
							<div class="btn_act" >
								<a href="#" class="btn_save" onclick="javascript:fn_VM1702cancelAs(); return false;">저장</a>
							</div>
						</div>
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->
				
			</div>
			<!-- //점검완료 내용 레이어 팝업 -->
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
	<script src="/resources/viewJs/vm/VM1702.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>
