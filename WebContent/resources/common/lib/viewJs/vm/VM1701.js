let asList = null;
$(function(){
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
	if($("#returnTabCd").val() == ""){
		// 최초접근 => 미확인 탭
		fn_VM1701changeTab('U');
	}else{
		// 페이지 이동 => 기존 탭
		fn_VM1701changeTab($("#returnTabCd").val());
	}
	
	$("input[name='order']:radio").change(function () {
		fn_VM1701changeTab($("#tabCd").val());
	});
})

// 새로고침
function fn_VM1701refresh(){
	$("#qStrNm").val('');
	$("#moreCnt").val('0');
	fn_VM1701changeTab('U');
}

// 탭 클릭
function fn_VM1701SetTab(tabCd){
	$("#moreCnt").val('0');
	
	fn_VM1701changeTab(tabCd);
}

//탭 변경 - tabCd : U(미확인), S(예정), Y(처리완료), P(미처리)
function fn_VM1701changeTab(tabCd) {
	$("#tabCd").val(tabCd);
	
	$("[id^='tab_']").each(function(){
		if($(this).attr('id') === ('tab_' + tabCd)){
			$(this).attr("class", "tab_on");
		}else{
			$(this).attr("class", "tab_off");
		}
	})
	
	var param = new Object();
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	param.strNm			= $("#qStrNm").val();
	param.progStat		= tabCd;
	param.startRow 		= startRow;
	param.pagingRowCnt 	= pagingRowCnt;
	param.order			= $("input[name='order']:checked").val();
	
	if(tabCd === 'P'){
		fn_VM1701RetrieveCancelAs(param);
	}else{
		fn_VM1701RetrieveAs(param);
	}
}

// 미확인, 예정, 처리완료 AS 조회
function fn_VM1701RetrieveAs(param){
	$.ajax({
		url:'/VM1701RetrieveAsList',
		type : 'POST',
		data : JSON.stringify(param),
		dataType:'json',
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				if(response.items != null) {
					var html = "";
					var moreCnt			= $("#moreCnt").val();
					var pagingRowCnt	= $("#pagingRowCnt").val();
					if(response.total > 0){
						response.items.forEach( (item, i) => {
							html += '<li>';
							html += '	<div class="title_area">';
							html += '		<span class="branch">[' + item.emergencyLevel + '] ' + item.strNm + '</span>';
							html += '		<span class="notification">접수번호[' + item.asNo + ']</span>';
							html += '	</div>';
							html += '	<div class="detail_area">';
							html +=  '		<a href="#" onclick="fn_VM1701PageMoveVM1702('+(i + Number(param.startRow))+'); return false;" >';
							html += '			<span class="detail">';
							html += '				담당기사 : ' + item.vendorUserNm + ' ( ' + item.vendorNm +' )<br/>';
							html += '				접수일자 : ' + item.asDttm + '<br/>';
							if($("#tabCd").val() == 'Y'){
								html += '				처리일자 : ' + item.resolveDttm + '<br/>';
							}
							html += '				장애유형 : ' + item.errorTypeTxt + '<br/>';
							html += '				장애내용 : ' + item.asNote + '<br/>';
							html += '			</span>';
							html += '		</a>';
							html += '	</div>';
							html += '</li>';
						})
						
						$("#message_list").addClass("type2");
						
						if(moreCnt == 0){
							asList = response.items;
						}else{
							asList = [
								...asList,
								...response.items
							]
						}
						
					}else{
						html +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
					
					// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
					if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
						$("#btn_more").show();
					} else {
						$("#btn_more").hide();
					}
					
					if(moreCnt == 0){
						$("#message_list").html(html);
					}else{
						$("#message_list").append(html);
					}
				}
			}
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
	})
}

// 미처리 AS 조회
function fn_VM1701RetrieveCancelAs(param){
	$.ajax({
		url:'/VM1701RetriveCancelAsList',
		type : 'POST',
		data : JSON.stringify(param),
		dataType:'json',
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				if(response.items != null) {
					var html = "";
					var moreCnt = $("#moreCnt").val();
					if(response.total > 0){
						response.items.forEach( (item, i) => {
							html += '<li>';
							html += '	<div class="title_area">';
							html += '		<span class="branch">' + item.strNm + '</span>';
							html += '		<span class="notification">접수번호[' + item.asNo + ']</span>';
							html += '	</div>';
							html += '	<div class="detail_area">';
							html += '		<span class="detail">';
							html += '			취소자 : ' + item.userNm + ' ( ' + item.cencelId +' )<br/>';
							html += '			취소일자 : ' + item.cancelDttm + '<br/>';
							html += '			취소사유 : ' + item.cancelReason + '<br/>';
							html += '		</span>';
							html += '	</div>';
							html += '</li>';
						})
						if(moreCnt == 0){
							asList = response.items;
						}else{
							asList = [
								...asList,
								...response.items
							]
						}
						
						// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
						if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
							$("#btn_more").show();
						} else {
							$("#btn_more").hide();
						}
					}else{
						html +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
					}
					$("#message_list").removeClass("type2");
					
					if(moreCnt == 0){
						$("#message_list").html(html);
					}else{
						$("#message_list").append(html);
					}
				}
			}
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
	})
}

//검색 버튼
function fn_VM1701search (){
	$("#moreCnt").val('0');
	var tabCd = $("#tabCd").val();
	
	fn_VM1701changeTab(tabCd);
}

//더보기 클릭
function fn_VM1701showMoreList(){
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	var tabCd = $("#tabCd").val();
	
	fn_VM1701changeTab(tabCd);
}

// as 상세 페이지
function fn_VM1701PageMoveVM1702(index){
	var pageParam = asList[index];
	pageParam.qStrNm 	= $("#qStrNm").val();
	pageParam.tabCd 	= $("#tabCd").val();
	pageParam.order		= $("input[name='order']:checked").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	var form = document.movePage;
	form.action = '/menu/VM1702';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

// as 등록 페이지
function fn_VM1701newAs(){
	var pageParam = new Object();
	pageParam.qStrNm 	= $("#qStrNm").val();
	pageParam.tabCd 	= $("#tabCd").val();
	pageParam.order		= $("input[name='order']:checked").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	var form = document.movePage;
	form.action = '/menu/VM1703';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}