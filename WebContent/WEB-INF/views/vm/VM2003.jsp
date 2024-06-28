<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<%@ include file="../cm/message.jsp" %>
<!-- 캐시저장X -->
<%  
response.setHeader("Cache-Control","no-store");  
response.setHeader("Pragma","no-cache");  
response.setDateHeader("Expires",0);  
if (request.getProtocol().equals("HTTP/1.1"))
        response.setHeader("Cache-Control", "no-cache");
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 조치내역입력</title>
<%@ include file="../cm/header.jsp" %>

<script src="/resources/js/jquery.form.min.js"></script>
<script src="/resources/js/signature_pad.min.js"></script>
<script src="/resources/js/aws-sdk.min.js"></script>

<script>
	const initStrCd 	= "${movePageParam.initStrCd}";
	const yyyymm 		= "${movePageParam.yyyymm}";
	const mntncType		= "S";
	const fileServerIp 	= "${fileServerIp}";
	const strNm			= "${movePageParam.strNm}";
	const vendorNm		= "${movePageParam.vendorNm}";
	const userId = "${userVo.userId}";
	// const authId = "${userVo.authId}";
</script>
</head>
<body>
	<form id="returnFrom" name="returnForm" method='post'>
		<input type="hidden" id="qStrNm"		name="qStrNm"		value="${movePageParam.qStrNm}"/>
	</form>
	
	<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
		
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
				<input type="hidden" id="wkWebViewYn" name="wkWebViewYn" value="${wkWebViewYn }">
				
				<!-- 툴바영역 -->
				<div class="toolbar">
					
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous">
						<a href="javascript:fn_VM2003Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>정기점검</h2>
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
				<input type="hidden" id="initStrCd"		name="initStrCd"	value="${movePageParam.initStrCd}"/>
				<input type="hidden" id="yyyymm"		name="yyyymm"		value="${movePageParam.yyyymm}"/>
				<input type="hidden" id="vendorNm"		name="vendorNm"	value="${movePageParam.vendorNm}"/>
				<!-- //파라미터 영역 -->
				
				<fieldset>
					<div class="info">
						<div class="info_title">
							<h3>${movePageParam.strNm}</h3>
						</div>
						
						<div class="info_detail">
							<span>
								점검일자 : ${movePageParam.yyyymmdd}<br/>
								담당기사 : ${movePageParam.vendorUserNm}<br/>
								총괄명 : ${movePageParam.sector}<br/>
							</span>
						</div>
					</div>
				</fieldset>
				
				<div class="list_text_detail type1 height-transition" style="max-height: 138px;">
					<div class="btn_grp" style="margin: 5 0 0 0;">
						<div class="btn_act" id="startBtn"><a href="" class="btn_single" onclick="fn_VM2003StartMntnc(); return false;">점검시작</a></div>
						<div class="btn_act" id="endBtn" style="display:none;"><a href="" class="btn_single complete_popup_open" >점검종료</a></div>
					</div>
				</div>
					
			</div>
			<!-- //정기점검 대상 점포 정보 영역 -->
			
			<section>
				<div class="setting_area">
					<c:set var="endsWithMaster" value="${fn:endsWith(userId, 'm')}" />
					<c:if test="${(authId eq 13 and endsWithMaster) or userId eq 'tnm'}">
						<div class="form_row" style="display:none;" id="operStatdiv">
							<h3 >점포 특이사항</h3>
							<div class="inputBox">
								<select id="operStat" name="operStat">
									<option value="해당없음">해당없음</option>
									<option value="휴점">휴점</option>
									<option value="폐점">폐점</option>
									<option value="거부">거부</option>
									<option value="이월">이월</option>
								</select>
							</div>
							<div class="inputBox" style="display:none;" id="operNoteDiv">
								<textarea rows="3" id="operNote" name="operNote" title="점포 특이사항" placeholder="점포 특이사항을 입력하세요" style="resize:none;"></textarea>
							</div>
						</div>
					</c:if>
				</div>
			</section>
			<!-- 데이터 테이블 section -->
			<section>
				<div class="form_row" style="display:none;" id="checkListDiv">
					<h3>정기점검 체크 리스트</h3>
					<div class="amountBox">
						<div class="tblBox">
							<table>
								<colgroup>
									<col />
									<col style="width:20%;" />
									<col style="width:20%;" />
									<col style="width:20%;" />
								</colgroup>
								<thead>
								<tr>
									<th scope="col">점검유형</th>
									<th scope="col">점검확인</th>
									<th scope="col">특이사항</th>
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
							<textarea cols="5" rows="5" id="note" name="note" title="점검 특이사항" placeholder="점검 특이사항을 입력하세요" style="resize: none;"></textarea>
						</div>
					</div>
					<div class="form_row">
						<h3>비고</h3>
						<div class="inputBox">
							<textarea cols="5" rows="5" id="subNote" name="subNote" title="비고" placeholder="비고내용을 입력하세요" style="resize: none;"></textarea>
						</div>
					</div>
				</div>
			</section>
			
			
			<!-- 데이터 테이블 section -->
			<section>
				<div class="setting_area" id="partRepairDiv" style="display:none;">
					<form id="partRepairInputForm" name="partRepairInputForm" enctype="multipart/form-data" method="post" onsubmit="return false;">
						<fieldset>
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
							
							<div class="form_row" id="partSeachDiv">
								<h3>부품검색</h3>
								<div class="inputBox" >
									<input type="text" id="searchBox" />
								</div>
							</div>
							
							<div class="form_row" id="partDiv">
								<input type="hidden" id="selectedPart" name="selectedPart" />
								<h3>부품명</h3>
								<div class="inputBox last_part" id="partDiv_1">
									<span id="partTagetText_1" class="notification" style="width: calc(10% - 3px);">구분</span>
									<select title="대분류" id="part_1" style="width: calc(15% - 3px);">
										<option>선택</option>
									</select>
									<input type="hidden" id="partTarget_1"/>
									<input type="hidden" id="partPrice_1"		value="0"/>
									<input type="hidden" id="repairPrice_1"		value="0"/>
									<input type="hidden" id="businessPrice_1"	value="0"/>
									<input type="hidden" id="compareYn_1"		value=""/>
									<button type="button" onclick="fn_VM2003RemovePart(this);">삭제</button>
								</div>
								<div class="inputBox">
									<button type="button" onclick="fn_VM2003AddPart();">추가</button>
								</div>
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
													<td>근무자</td>
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
													<td>해피콜 접수 번호</td>
													<td class="input">
														<input type="text" id="asNo" name="asNo" placeholder="해피콜 접수 번호"/>
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
									<textarea cols="5" rows="5" id="repairNote" name="repairNote" title="처리내용" placeholder="처리내용을 입력하세요" style="resize: none;"></textarea>
								</div>
							</div>
							
						</fieldset>
					</form>
				</div>
			</section>
			<!--//데이터 테이블 section -->
			
			<!-- 특이사항 입력 레이어 팝업 -->
			<div id="mntnc_popup" class="wrap_popup" style="display:none;">
				
				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">특이사항 입력</h2>
					<a href="#" class="mntnc_popup_close" title="닫기" id="mntnc_popup_close"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->
				
				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<div id="contentsArea" class="inputBox">
					</div>
					
					<div class="btn_grp">
						<input type="hidden" id="hCheckId">
						<div class="btn_act" ><a href="" class="btn_save" onclick="javascript:fn_VM2003SaveNote(); return false;">저장</a></div>
					</div>
				</div>
				<!-- //팝업 컨테이너 영역 -->
				
			</div>
			<!-- //특이사항 입력 내용 레이어 팝업 -->
			
			<!-- 점검완료 레이어 팝업 -->
			<div id="complete_popup" class="wrap_popup" style="display:none;">
				
				<!-- 팝업 타이틀 영역 -->
				<div class="header_popup">
					<h2 class="title_popup">점검 완료</h2>
					<a href="#" class="complete_popup_close" title="닫기" id="complete_popup_close"><img src="/${smCommonImagesPath}/btn_close_popup.png" alt="닫기" /></a>
				</div>
				<!-- //팝업 타이틀 영역 -->
				
				<!-- 팝업 컨테이너 영역 -->
				<div class="container_popup">
					<!-- 컨테이너 영역 -->
					<div class="setting_area">
						<!-- 조치내역입력 폼 -->
						<form id="inputForm" name="inputForm" enctype="multipart/form-data" method="post" onsubmit="return false;">
							<fieldset>
								<legend>점검완료</legend>
								
								<input type="hidden"	id="srcInitStrCd" 	name="initStrCd"/>
								<input type="hidden"	id="srcYyyymm" 		name="yyyymm"/>
								<input type="hidden"	id="srcMntncType" 	name="mntncType"/>
								<input type="hidden"	id="srcOperStat" 	name="operStat"/>
								<input type="hidden"	id="srcOperNote" 	name="operNote"/>
								<input type="hidden"	id="startTime" 		name="startTime"/>
								<input type="hidden"	id="checkList" 		name="checkList"/>
								<input type="hidden"	id="signImg" 		name="signImg"/>
								<input type="hidden"	id="fileImg" 		name="fileImg"/>
								<input type="hidden"	id="partGrpCd" 		name="partGrpCd"/>
								<input type="hidden"	id="repairData" 	name="repairData"/>
								<input type="hidden"	id="srcNote" 		name="note"/>
								<input type="hidden"	id="srcSubNote" 	name="subNote"/>
								
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
												<tr style="display:none;">
													<td>서명 이미지</td>
													<td>
														<div class="thumbBox">
															<div class="imgBox">
																<img id="img0" alt="이미지1" src="/${smCommonImagesPath}/bg_thumb.png" />
															</div>
															<div class="filebox">
																<label for="img0">업로드</label>
																<input type="file" accept="image/*" id="file0" />
																<input type="hidden" id="file0flag" name="file0flag" value="false" />
																<input type="hidden" id="file0url" name="file0url" />
															</div>
														</div>
													</td>
												</tr>
												<tr>
													<td>이미지1</td>
													<td>
														<div class="thumbBox">
															<div class="imgBox">
																<img id="img1" alt="이미지1" src="/${smCommonImagesPath}/bg_thumb.png" />
															</div>
															<div class="filebox">
																<label for="file1">업로드</label>
																<input type="file" accept="image/*" id="file1" />
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
																<input type="file" accept="image/*" id="file2" />
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
																<input type="file" accept="image/*" id="file3" />
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
																<input type="file" accept="image/*" id="file4" />
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
																<input type="file" accept="image/*" id="file5" />
																<input type="hidden" id="file5flag" name="file5flag" value="false" />
																<input type="hidden" id="file5url" name="file5url" />
															</div>
														</div>
													</td>
												</tr>
<%--												<tr>--%>
<%--													<td>이미지6</td>--%>
<%--													<td>--%>
<%--														<div class="thumbBox">--%>
<%--															<div class="imgBox">--%>
<%--																<img id="img6" alt="이미지6" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--															</div>--%>
<%--															<div class="filebox">--%>
<%--																<label for="file6">업로드</label>--%>
<%--																<input type="file" accept="image/*" id="file6" />--%>
<%--																<input type="hidden" id="file6flag" name="file6flag" value="false" />--%>
<%--																<input type="hidden" id="file6url" name="file6url" />--%>
<%--															</div>--%>
<%--														</div>--%>
<%--													</td>--%>
<%--												</tr>--%>
<%--												<tr>--%>
<%--													<td>이미지7</td>--%>
<%--													<td>--%>
<%--														<div class="thumbBox">--%>
<%--															<div class="imgBox">--%>
<%--																<img id="img7" alt="이미지7" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--															</div>--%>
<%--															<div class="filebox">--%>
<%--																<label for="file7">업로드</label>--%>
<%--																<input type="file" accept="image/*" id="file7" />--%>
<%--																<input type="hidden" id="file7flag" name="file7flag" value="false" />--%>
<%--																<input type="hidden" id="file7url" name="file7url" />--%>
<%--															</div>--%>
<%--														</div>--%>
<%--													</td>--%>
<%--												</tr>--%>
<%--												<tr>--%>
<%--													<td>이미지8</td>--%>
<%--													<td>--%>
<%--														<div class="thumbBox">--%>
<%--															<div class="imgBox">--%>
<%--																<img id="img8" alt="이미지8" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--															</div>--%>
<%--															<div class="filebox">--%>
<%--																<label for="file8">업로드</label>--%>
<%--																<input type="file" accept="image/*" id="file8" />--%>
<%--																<input type="hidden" id="file8flag" name="file8flag" value="false" />--%>
<%--																<input type="hidden" id="file8url" name="file8url" />--%>
<%--															</div>--%>
<%--														</div>--%>
<%--													</td>--%>
<%--												</tr>--%>
<%--												<tr>--%>
<%--													<td>이미지9</td>--%>
<%--													<td>--%>
<%--														<div class="thumbBox">--%>
<%--															<div class="imgBox">--%>
<%--																<img id="img9" alt="이미지9" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--															</div>--%>
<%--															<div class="filebox">--%>
<%--																<label for="file9">업로드</label>--%>
<%--																<input type="file" accept="image/*" id="file9" />--%>
<%--																<input type="hidden" id="file9flag" name="file9flag" value="false" />--%>
<%--																<input type="hidden" id="file9url" name="file9url" />--%>
<%--															</div>--%>
<%--														</div>--%>
<%--													</td>--%>
<%--												</tr>--%>
<%--												<tr>--%>
<%--													<td>이미지10</td>--%>
<%--													<td>--%>
<%--														<div class="thumbBox">--%>
<%--															<div class="imgBox">--%>
<%--																<img id="img10" alt="이미지10" src="/${smCommonImagesPath}/bg_thumb.png" />--%>
<%--															</div>--%>
<%--															<div class="filebox">--%>
<%--																<label for="file10">업로드</label>--%>
<%--																<input type="file" accept="image/*" id="file10" />--%>
<%--																<input type="hidden" id="file10flag" name="file10flag" value="false" />--%>
<%--																<input type="hidden" id="file10url" name="file10url" />--%>
<%--															</div>--%>
<%--														</div>--%>
<%--													</td>--%>
<%--												</tr>--%>
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
										<input type="text" 		id="telNo" 			name="telNo" oninput="telAutoHyphen(this)" maxlength="13" placeholder="전화번호를 입력하세요">
									</div>
								</div>
								<div class="form_row">
									<div class="inputBox checkbox">
										<input type="hidden" 		id="agreeYn" 	name="agreeYn"/>
										<input type="checkbox" 		id="agreeYnChk"/>
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
									</div>
								</div>
								<div class="form_row" id="signImgDiv">
									<h3>서명<span class="criticalItems">필수항목</span></h3>
									<div class="inputBox" id="signImgArea">
										<!-- 서명 공간 -->
										<canvas id="signature" style="border:1px solid #000;" height="160px"></canvas>
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
							</fieldset>
						</form>
						
						<div class="btn_grp">
							<input type="hidden" id="hCheckId">
							<div class="btn_act" >
								<a href="#" class="btn_save" onclick="javascript:fn_VM2003Save(); return false;">저장</a>
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
	<script src="/resources/viewJs/vm/VM2003.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>
