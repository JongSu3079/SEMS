<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>에너지 관제시스템 모바일웹 - 만족도 조사</title>
<%@ include file="../cm/header.jsp" %>

<script>

	$(function() {
		var satisfaction 	= "${strInfo.satisfaction}";
		var dayYn 			= "${strInfo.dayYn}";		// 유효시간 체크(한 시간)

		if(satisfaction == "") {
			location.href = '/';
			alert("존재하지 않는 만족도 조사입니다.");
		} else if(satisfaction != '0' && satisfaction) {
			location.href = '/';
			alert("이미 진행된 만족도 조사입니다.");
		} else if(dayYn == 'N') {
			location.href = '/';
			alert("기간이 만료된 만족도 조사입니다.");
		}
	})

	function fn_VM2105SaveBtn() {
		if(!confirm("저장하시겠습니까?")) {
			return;
		}

		const selectedRadio = $("input[name='satis']:checked");
	
		if (selectedRadio.length <= 0) {
			alert("만족도를 선택해주세요.");
			return;
		}
			
		var param = new Object;
		param.asNo 		= $("#asNo").val();
		param.satis_1 	= $("#satis_1").val();
		param.satis_2 	= $("#satis_2").val();
		param.satis_3 	= $("#satis_3").val();
		param.satis 	= $('input[name="satis"]:checked').val();
		
		$.ajax({
			url: '/survey/VM2105Save',
			data: param,
			type: 'POST',
			success: function(response) {
				if(response) {
					alert('저장되었습니다.');
					location.href = '/';
				} else {
					alert('저장 중 문제가 발생했습니다. 잠시후 다시 시도해주세요');
				}
			}
		})
	}

</script>
<style>
	section fieldset{
		display: flex;
		direction: rtl;
		border:0;
		justify-content: center;
	}
	input[type=radio]{
		display: none;
	}
	label{
		font-size: 4em;
		color: transparent;
		text-shadow: 0 0 0 #f0f0f0;
	}
	label:hover{
		text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
	}
	label:hover ~ label{
		text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
	}
	input[type=radio]:checked ~ label{
		text-shadow: 0 0 0 rgba(250, 208, 0, 0.99);
	}
</style>
</head>
<body>
<!-- wrap -->
	<div id="wrap" class="${smStatusHeight}">
	<!-- trunk -->
		<div class="trunk">
			<!-- header -->
			<header class="sub">
				<div class="statusBar"></div>
				<div id="header_sub">
					<h1 class="blind">에너지 관제시스템</h1>
					
					<!-- 툴바영역 -->
					<div class="toolbar">
						
						<!-- 타이틀 -->
						<div class="title_header_search">
							<h2>간판 유지보수 만족도 조사</h2>
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
					<input type="hidden" id="asNo" name="asNo" value="${pageParam.asNo}"/>
					<!-- //파라미터 영역 -->
					
					<fieldset>
						<div class="info">
							<div class="info_detail">
								<span>
									더 나은 품질 향상을 위해 아래 항목에 <br/>
									대하여 답변을 부탁드립니다.<br/>
									매장명 : ${strInfo.strNm}<br/>
									처리일 : ${strInfo.resolveDttm}<br/>
								</span>
							</div>
						</div>
					</fieldset>
					<section>
						<div class="form_row" id="operStatdiv">
							<h3>1. 방문기사의 점검에 대한 자세한 설명이나, 주변정리가 양호한가요?</h3>
							<div class="inputBox">
								<select id="satis_1" name="satis_1">
									<option value="">선택</option>
										<option>매우 양호함.</option>
										<option>다소 설명이 부족함.</option>
										<option>아무 설명도 없고, 점검태도도 불량함.</option>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row" id="operStatdiv">
							<h3>2. AS 방문 시 사전에 미리 연락을 하고 방문하고 있나요?</h3>
							<div class="inputBox">
								<select id="satis_2" name="satis_2">
									<option value="">선택</option>
										<option>사전연락 및 일정을 준수하고 있음.</option>
										<option>사전연락을 주기는 하나, 일정이 안 맞음.</option>
										<option>사전연락도 없이 기사 임의로 방문함.</option>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row" id="operStatdiv">
							<h3>3. A/S 발생 시 고장원인 및 부품교체에 대한 담당기사의 설명을 듣고 있습니까?</h3>
							<div class="inputBox">
								<select id="satis_3" name="satis_3">
									<option value="">선택</option>
										<option>그렇다.</option>
										<option>가끔 듣고 있다.</option>
										<option>아무 설명이 없다.</option>
								</select>
							</div>
						</div>
					</section>
					<section>
						<div class="form_row" id="operStatdiv">
							<h3>4. A/S 처리에 대해 만족하십니까?</h3>
							<div class="inputBox">
								<fieldset id="star">
									<input type="radio" name="satis" value="1" id="rate1"><label
										for="rate1">★</label>
									<input type="radio" name="satis" value="2" id="rate2"><label
										for="rate2">★</label>
									<input type="radio" name="satis" value="3" id="rate3"><label
										for="rate3">★</label>
									<input type="radio" name="satis" value="4" id="rate4"><label
										for="rate4">★</label>
									<input type="radio" name="satis" value="5" id="rate5"><label
										for="rate5">★</label>
							</fieldset>
							</div>
						</div>
					</section>

					<div class="list_text_detail type1 height-transition" style="max-height: 138px;">
						<div class="btn_grp">
							<div class="btn_act" id="saveBtn"><a href="" class="btn_single" onclick="fn_VM2105SaveBtn(); return false;" style="margin:4px 0 0 0">저장</a></div>
						</div>
					</div>
						
				</div>
				<!-- //정기점검 대상 점포 정보 영역 -->
			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->

	</div>
</body>