<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="trunk">
		<!-- header -->
		<header class="sub">
			<div class="statusBar"></div>
			<div id="header_sub">
				<h1 class="blind">에너지 관제시스템</h1>
	
				<!-- 툴바영역 -->
				<div class="toolbar">
					<!-- 이전화면 아이콘 버튼 -->
					<div class="icon_previous" >
						<a href="#" onclick="" title="이전화면" class="btn_previous">이전화면</a>
					</div>
					<!-- //이전화면 아이콘 버튼 -->
	
					<!-- 페이지 타이틀 -->
					<div class="title_header_search">
						<h2>유지보수 상세</h2>
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
				<form id="inputForm" name="inputForm" action="#">
					<fieldset>
						<legend>유지보수 상세 내용 입력</legend>
						
						<div class="form_row">
							<h3>점포명</h3>
							<div class="inputBox">
								<input type="text" title="점포명" value="DDMC 점" readonly="readonly" />
							</div>
						</div>
						
						<div class="form_row">
							<h3>접수<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input type="text" title="접수일자 입력(필수항목)" value="2018-07-24" style="width:calc(50% - 3px);" />
								<select title="접수구분(필수항목)" class="right" style="width:calc(50% - 3px);">
									<option value="">해피콜</option>
									<option value="">점포연락</option>
									<option value="">정기점검</option>
								</select>
							</div>
						</div>
						
						<div class="form_row">
							<h3>처리<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<input type="text" title="처리일자 입력(필수항목)" value="2018-07-24" style="width:calc(50% - 3px);" />
								<input type="text" title="처리자 입력(필수항목)" value="홍길동" class="right" style="width:calc(50% - 3px);" />
							</div>
						</div>

						<div class="form_row wide">
							<h3>설치장비</h3>
							<div class="inputBox">
								<div class="tblBox">
									<table>
										<colgroup>
											<col />
											<col style="width:25%;" />
											<col style="width:25%;" />
											<col style="width:25%;" />
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
												<select>
													<option value="">v1.5</option>
													<option value="">v2.0</option>
													<option value="">v3.0</option>
												</select>
											</td>
											<td>하콘</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>티센서</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>테몬</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>하콘몬</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>인버터허브</td>
											<td class="input">
												<select>
													<option value="">0개</option>
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
											<col style="width:25%;" />
											<col style="width:25%;" />
											<col style="width:25%;" />
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
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>INV_OSC</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>RIF</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>RIC</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>OSC</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>ICC</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>냉동평대 상</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>냉동평대 하</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										<tr>
											<td>냉동콤비 상</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
											<td>냉동콤비 하</td>
											<td class="input">
												<select>
													<option value="">0개</option>
												</select>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div class="form_row">
							<h3>오류내용<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<select title="오류구분(필수항목)">
									<option value="">간판</option>
									<option value="">통신</option>
									<option value="">전력</option>
									<option value="">센서</option>
									<option value="">기타</option>
								</select>
							</div>
							<div class="inputBox">
								<textarea cols="5" rows="5" title="오류내용 직접입력(필수항목)" placeholder="오류내용을 입력하세요"></textarea>
							</div>
						</div>
						
						<div class="form_row">
							<h3>처리내용<span class="criticalItems">필수항목</span></h3>
							<div class="inputBox">
								<select title="처리구분(필수항목)">
									<option value="">완료</option>
									<option value="">재방문 예정</option>
									<option value="">간판업체 이관</option>
									<option value="">전기업체 이관</option>
									<option value="">기타업체 이관</option>
								</select>
							</div>
							<div class="inputBox">
								<textarea cols="5" rows="5" title="처리내용 직접입력(필수항목)" placeholder="처리내용을 입력하세요"></textarea>
							</div>
							<div class="inputBox">
							</div>
						</div>

						<div class="form_row">
							<h3>비고</h3>
							<div class="inputBox">
								<textarea cols="5" rows="5" title="비고내용 직접입력(필수항목)" placeholder="비고내용을 입력하세요"></textarea>
							</div>
							<div class="inputBox">
							</div>
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
														<img id="img1" alt="간판 사진" src="" />
													</div>
													<div class="fileBox">
														<label for="file1">업로드</label>
														<input type="file" accept="image/*" id="file1" />
														<input type="hidden" name="url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>작업전</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img2" alt="간판 사진" src="" />
													</div>
													<div class="fileBox">
														<label for="file2">업로드</label>
														<input type="file" accept="image/*" id="file2" />
														<input type="hidden" name="url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>작업후</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img3" alt="간판 사진" src="" />
													</div>
													<div class="fileBox">
														<label for="file3">업로드</label>
														<input type="file" accept="image/*" id="file3" />
														<input type="hidden" name="url" />
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>교체품</td>
											<td>
												<div class="thumbBox">
													<div class="imgBox">
														<img id="img4" alt="간판 사진" src="" />
													</div>
													<div class="fileBox">
														<label for="file4">업로드</label>
														<input type="file" accept="image/*" id="file4" />
														<input type="hidden" name="url" />
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
					<p><a onclick="">저장</a></p>
				</div>
				<!-- //조치내역입력 폼 -->
			</div>
			<!-- //컨테이너 영역 -->
		</div>
		<!-- //container -->
	</div>
	<!-- //trunk -->
	
	<div class="dim none"></div>
	<div class="comboBox none">
		<div class="fileBox camera">
			<label for="file5">카메라</label>
			<input type="file" accept="image/*" id="file5" capture="camera" />
		</div>
		<div class="fileBox album">
			<label for="file6" id="album_btn">앨범</label>
			<input type="file" accept="image/*" id="file6" />
		</div>
	</div>
