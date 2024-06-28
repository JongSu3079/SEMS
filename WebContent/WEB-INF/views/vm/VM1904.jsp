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

	<%--inputForm--%>
	<form id="inputForm" name="inputForm" enctype="multipart/form-data" method="post" >
	
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
						<a href="javascript:fn_VM1904Redirect();" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
					
					<!-- 타이틀 -->
					<div class="title_header_search">
						<h2>마감 등록</h2>
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
						<h3>점포명</h3>
						<div class="inputBox">
							<input type="text" id="strNm" name="strNm" value="${strNm}" readonly/>
						</div>
					</div>
					<div class="form_row">
						<h3>유형</h3>
						<div class="inputBox">
						<select id="finishType" name="finishType">
							<option value="">선택</option>
							<option value="A">유지보수</option>
							<option value="B">구축</option>
						</select>
						</div>
					</div>
					<div class="form_row">
						<h3>조치일(*)</h3>
						<div class="inputBox">
							<input type="text" id="actionDate" name="actionDate"/>
						</div>
					</div>
					<div class="form_row">
						<h3>점검자(*)</h3>
						<div class="inputBox">
							<input type="text" id="inspector" name="inspector" value="${userNm}" readonly/>
						</div>
					</div>

					<section>
						<div class="form_row">
							<h3>유지보수유형</h3>
							<div class="inputBox">
								<select id="mntType" name="mntType">
									<c:forEach var='vo' items="${mntTypeList}">
										<option value="${vo.code}" <c:if test="${mntInfo.mntType == vo.code }">selected</c:if>>${vo.commCdNm }</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row">
							<h3>보수품목</h3>
							<div class="inputBox">
								<select id="mntItem" name="mntItem">
									<c:forEach var='vo' items="${mntItemList}">
										<option value="${vo.code}" <c:if test="${mntInfo.mntType == vo.code }">selected</c:if>>${vo.commCdNm }</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row">
							<h3>보수/교체내용</h3>
							<div class="inputBox">
								<select id="mntDescription" name="mntDescription">
									<c:forEach var='vo' items="${mntDescList}">
										<option value="${vo.code}" <c:if test="${mntInfo.mntType == vo.code }">selected</c:if>>${vo.commCdNm }</option>
									</c:forEach>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="setting_area">
							<div class="form_row">
								<h3>내용(기사입력)</h3>
								<div class="inputBox">
									<textarea cols="5" rows="5" id="descriptionText" name="descriptionText" style="resize: none;"></textarea>
								</div>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row" id="des1Box" >
							<h3>주요내용</h3>
							<div class="inputBox">
								<select id="description1" name="description1">
									<option value="">선택</option>
									<c:forEach var='vo' items="${description1List}">
										<option value="${vo.code}" <c:if test="${mntInfo.description1 == vo.code }">selected</c:if>>${vo.commCdNm }</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="form_row" id="des2Box" style="display: none;" >
							<h3>상세내용(품목)</h3>
							<div class="inputBox">
								<select id="description2" name="description2">
									<option value="">선택</option>
								</select>
							</div>
						</div>
						<div class="form_row" id="des3Box" style="display: none;">
							<h3>조치내용</h3>
							<div class="inputBox">
								<select id="description3" name="description3">
									<option value="">선택</option>
									<c:forEach var='vo' items="${description3List}">
										<option value="${vo.code}" <c:if test="${mntInfo.description3 == vo.code }">selected</c:if>>${vo.commCdNm }</option>
									</c:forEach>
								</select>
							</div>
						</div>
						<div class="form_row" id="desCntBox" style="display: none;">
							<h3>수량</h3>
							<div class="inputBox">
								<input type='text' id="descriptionCnt" name="descriptionCnt" />
							</div>
						</div>
					</section>

					<%--장비 정보--%>
					<section>
						<div class="form_row">
							<h3>장비정보</h3>
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
											<th scope="colgroup" colspan="4">교체내역</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>RELAY</td>
											<td class="input">
												<select id="relayCnt" name="relayCnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
												</select>
											</td>
											<td>ADAPTOR</td>
											<td class="input">
												<select id="adaptorCnt" name="adaptorCnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>HACON</td>
											<td class="input">
												<select id="haconCnt" name="haconCnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
													<option value="2">2개</option>
												</select>
											</td>
											<td>티센서</td>
											<td class="input">
												<select id="tSensorCnt" name="tSensorCnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>BT</td>
											<td class="input">
												<select id="btCnt" name="btCnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
													<option value="2">2개</option>
													<option value="3">3개</option>
													<option value="4">4개</option>
													<option value="5">5개</option>
													<option value="6">6개</option>
													<option value="7">7개</option>
													<option value="8">8개</option>
													<option value="9">9개</option>
													<option value="10">10개</option>
												</select>
											</td>
											<td>BT-I</td>
											<td class="input">
												<select id="btICnt" name="btICnt">
													<option value="0">0개</option>
													<option value="1">1개</option>
													<option value="2">2개</option>
													<option value="3">3개</option>
													<option value="4">4개</option>
													<option value="5">5개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>UTP 케이블(M)</td>
											<td class="input">
												<input type='text' id="utpCable" name="utpCable" value="" />
											</td>
											<td></td>
											<td class="input">
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</section>
					<%--// 장비 정보--%>

<%--					<section>--%>
<%--						<div class="setting_area">--%>
<%--							<div class="form_row">--%>
<%--								<h3>비고</h3>--%>
<%--								<div class="inputBox">--%>
<%--									<textarea cols="5" rows="5" id="comments" name="comments" value="" style="resize: none;"></textarea>--%>
<%--								</div>--%>
<%--							</div>--%>
<%--						</div>--%>
<%--					</section>--%>
				</fieldset>
			</div>
			<!-- //조치내역 영역 -->

			<div class="form_row wide">
				<div style="position: relative; display: inline-block; padding-top: 20px;">
					<h3>점포사진</h3>
					<div class="thumbBox" style="position: absolute; left: 65px; bottom: 20px;">
						<div class="filebox">
							<label for="fileUpload">업로드</label>
							<input type="file" name="imgs[]" accept="image/*" id="fileUpload" multiple/>
						</div>
					</div>
				</div>

				<div class="inputBox">
					<div class="tblBox">
						<table>
							<colgroup>
								<col />
								<col />
								<col />
							</colgroup>
							<thead>
							<tr>
								<th scope="col" colspan="3">목록</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img1" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag1" name="imgFlag1" value="false" />
											<input type="hidden" id="imgUrl1" name="imgUrl1" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img2" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag2" name="imgFlag2" value="false" />
											<input type="hidden" id="imgUrl2" name="imgUrl2" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img3" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag3" name="imgFlag3" value="false" />
											<input type="hidden" id="imgUrl3" name="imgUrl3" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img4" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag4" name="imgFlag4" value="false" />
											<input type="hidden" id="imgUrl4" name="imgUrl4" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img5" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag5" name="imgFlag5" value="false" />
											<input type="hidden" id="imgUrl5" name="imgUrl5" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img6" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag6" name="imgFlag6" value="false" />
											<input type="hidden" id="imgUrl6" name="imgUrl6" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img7" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag7" name="imgFlag7" value="false" />
											<input type="hidden" id="imgUrl7" name="imgUrl7" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img8" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag8" name="imgFlag8" value="false" />
											<input type="hidden" id="imgUrl8" name="imgUrl8" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img9" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag9" name="imgFlag9" value="false" />
											<input type="hidden" id="imgUrl9" name="imgUrl9" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img10" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag10" name="imgFlag10" value="false" />
											<input type="hidden" id="imgUrl10" name="imgUrl10" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img11" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag11" name="imgFlag11" value="false" />
											<input type="hidden" id="imgUrl11" name="imgUrl11" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img12" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag12" name="imgFlag12" value="false" />
											<input type="hidden" id="imgUrl12" name="imgUrl12" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img13" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag13" name="imgFlag13" value="false" />
											<input type="hidden" id="imgUrl13" name="imgUrl13" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img14" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag14" name="imgFlag14" value="false" />
											<input type="hidden" id="imgUrl14" name="imgUrl14" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img15" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag15" name="imgFlag15" value="false" />
											<input type="hidden" id="imgUrl15" name="imgUrl15" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img16" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag16" name="imgFlag16" value="false" />
											<input type="hidden" id="imgUrl16" name="imgUrl16" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img17" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag17" name="imgFlag17" value="false" />
											<input type="hidden" id="imgUrl17" name="imgUrl17" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img18" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag18" name="imgFlag18" value="false" />
											<input type="hidden" id="imgUrl18" name="imgUrl18" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img19" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag19" name="imgFlag19" value="false" />
											<input type="hidden" id="imgUrl19" name="imgUrl19" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img20" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag20" name="imgFlag20" value="false" />
											<input type="hidden" id="imgUrl20" name="imgUrl20" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img21" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag21" name="imgFlag21" value="false" />
											<input type="hidden" id="imgUrl21" name="imgUrl21" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img22" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag22" name="imgFlag22" value="false" />
											<input type="hidden" id="imgUrl22" name="imgUrl22" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img23" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag23" name="imgFlag23" value="false" />
											<input type="hidden" id="imgUrl23" name="imgUrl23" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img24" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag24" name="imgFlag24" value="false" />
											<input type="hidden" id="imgUrl24" name="imgUrl24" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img25" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag25" name="imgFlag25" value="false" />
											<input type="hidden" id="imgUrl25" name="imgUrl25" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img26" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag26" name="imgFlag26" value="false" />
											<input type="hidden" id="imgUrl26" name="imgUrl26" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img27" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag27" name="imgFlag27" value="false" />
											<input type="hidden" id="imgUrl27" name="imgUrl27" />
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox" >
											<img id="img28" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag28" name="imgFlag28" value="false" />
											<input type="hidden" id="imgUrl28" name="imgUrl28" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img29" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag29" name="imgFlag29" value="false" />
											<input type="hidden" id="imgUrl29" name="imgUrl29" />
										</div>
									</div>
								</td>
								<td>
									<div class="thumbBox" style="padding-right: 0px;">
										<div class="imgBox">
											<img id="img30" alt="사진" src="/${smCommonImagesPath}/bg_thumb.png" />
										</div>
										<div class="filebox">
											<input type="hidden" id="imgFlag30" name="imgFlag30" value="false" />
											<input type="hidden" id="imgUrl30" name="imgUrl30" />
										</div>
									</div>
								</td>
							</tr>


							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- 버튼 영역 -->
			<div class="btn_grp">
				<div class="btn_act" >
					<a href="#" class="btn_save" id="modifyBtn" onclick="javascript:fn_VM1904Save(); return false;" style="margin: 25px 20px 10px 10px;">등록</a>
				</div>
			</div>
			<!-- //버튼 영역 -->

		</div>
		<!-- //container -->
		
	</div>
	<!-- //wrap -->

	</form>
<%--// inputForm--%>

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
	<script src="/resources/viewJs/vm/VM1904.js"></script>
	<script src="/resources/viewJs/cm/CM0104.js"></script>
	<!-- //viewJs import -->
</body>
</html>