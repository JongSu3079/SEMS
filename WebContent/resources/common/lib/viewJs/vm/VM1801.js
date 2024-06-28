let absList = null;
$(function(){
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
	if($("#retunTabCd").val() == 0){
		fn_VM1801ChangeTab('B');
	}else{
		fn_VM1801ChangeTab($("#retunTabCd").val());
	}
})

function fn_VM1801ChangeTab(tabCd){
	$("#tabCd").val(tabCd);
	$("#moreCnt").val('0');
	
	$("[id^='tab_']").each(function(){
		if($(this).attr('id') === ('tab_' + tabCd)){
			$(this).attr("class", "tab_on");
		}else{
			$(this).attr("class", "tab_off");
		}
	})
	
	fn_VM1801setList();
}

function fn_VM1801search(){
	$("#moreCnt").val('0');
	
	fn_VM1801setList();
}

function fn_VM1801refresh(){
	$("#moreCnt").val('0');
	$("#qStrNm").val('');
	fn_VM1801ChangeTab('B');
}

function fn_VM1801setList(){
	var param 			= new Object();
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	param.strNm = $("#qStrNm").val();
	param.tabCd = $("#tabCd").val();
	param.startRow = startRow;
	param.pagingRowCnt = pagingRowCnt;
	
	$.ajax({
		url:'/VM1801RetrieveAbsList',
		type : 'POST',
		data : JSON.stringify(param),
		dataType:'json',
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				if(response.items != null){
					let html = "";
					let tabCd = $("#tabCd").val();
					let moreCnt = $("#moreCnt").val();
					let pagingRowCnt = $("#pagingRowCnt").val();
					if(response.total > 0){
						response.items.forEach((item, i) => {
							html += '<li>';
							html += '	<div class = "title_area">';
							html += '		<span class = "branch">' + item.strNm + '</span>';
							html += '	</div>';
							
							html += '	<div class = "detail_area">';
							if(tabCd == 'B'){
								html += '	<a href="#" onclick="fn_VM1801ToVM1802(\''+item.initStrCd+'\',\''+item.yyyymm+'\',\''+item.mntncType+'\'); return false;" >';
								html += '		<span class="detail">';
								html += '			점검유형 : ' + (item.mntncType == 'N' ? '일반' : '커피머신') + '<br/>';
								html += '			담당기사 : ' + item.vendorUserNm + '(' + item.vendorNm + ')<br/>';
								html += '			점검일정 : ' + item.progDttm + '<br/>';
								html += '		</span>';
								html += '	</a>';
							}else if(tabCd =='A'){
								html += '	<a href="#" onclick="fn_VM1801ToVM1803(\''+item.asNo+'\'); return false;" >';
								html += '		<span class="detail">';
								html += '			담당기사 : ' + item.vendorUserNm + '(' + item.vendorNm + ')<br/>';
								html += '			점수일자 : ' + item.asDttm + '<br/>';
								html += '			장애유형 : ' + item.errorType + '<br/>';
								html += '		</span>';
								html += '	</a>';
							}
							else if(tabCd =='SA'){
								html += '	<a href="#" onclick="fn_VM1801ToVM1803(\''+item.asNo+'\'); return false;" >';
								html += '		<span class="detail">';
								html += '			담당기사 : ' + item.vendorUserNm + '(' + item.vendorNm + ')<br/>';
								html += '			점수일자 : ' + item.asDttm + '<br/>';
								html += '			장애유형 : ' + item.errorType + '<br/>';
								html += '		</span>';
								html += '	</a>';
							}else if(tabCd == 'SB'){
								html += '	<a href="#" onclick="fn_VM1801ToVM1802(\''+item.initStrCd+'\',\''+item.yyyymm+'\',\''+item.mntncType+'\'); return false;" >';
								html += '		<span class="detail">';
								html += '			점검유형 : 간판 <br/>';
								html += '			담당기사 : ' + item.vendorUserNm + '(' + item.vendorNm + ')<br/>';
								html += '			점검일정 : ' + item.progDttm + '<br/>';
								html += '		</span>';
								html += '	</a>';
							}
							html += '	</div>';
							html += '</li>';
						})
						
						$("#absList").addClass("type2");
						
						if(moreCnt == 0){
							absList = response.items;
						}else{
							absList = [
								...absList,
								...response.items
							]
						}
						
					}else{
						html +=  '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
					}
					$("#absList").removeClass("type2");
					
					if(moreCnt == 0){
						$("#absList").html(html);
					}else{
						$("#absList").append(html);
					}
					
					// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
					if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
						$("#btn_more").show();
					} else {
						$("#btn_more").hide();
					}
				}
			}
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
	})
}

function fn_VM1801ToVM1802(initStrCd, yyyymm, mntncType){
	let pageParam = new Object();
	pageParam.initStrCd = initStrCd;
	pageParam.yyyymm = yyyymm;
	pageParam.mntncType = mntncType;
	
	pageParam.qStrNm = $("#qStrNm").val();
	pageParam.tabCd = $("#tabCd").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	let form = document.movePage;
	form.action = '/menu/VM1802';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function fn_VM1801ToVM1803(asNo){
	let pageParam = new Object();
	pageParam.asNo = asNo;
	
	pageParam.qStrNm = $("#qStrNm").val();
	pageParam.tabCd = $("#tabCd").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	let form = document.movePage;
	form.action = '/menu/VM1803';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function fn_VM1801showMoreList(){
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	fn_VM1801setList();
}