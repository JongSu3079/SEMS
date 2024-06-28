let absList = null;
$(function(){
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// 새로고침
	if(gfn_checkOnload()){
		fn_VM1901refresh();
	}
	
	if($("#retunTabCd").val() == 0){
		fn_VM1901ChangeTab('B');
	}else{
		fn_VM1901ChangeTab($("#retunTabCd").val());
	}
})

// 헤더에 점포 정보 세팅
function fn_setHeaderCombo(){
	/** 
	 * 필수 태그
	 * <div class="shop_name" id="strDataCombo" ></div>
	 * <input type="hidden" id="hStrCd"/>
	 * <input type="hidden" id="hStrNm"/>
	 */
	gfn_getStrDataList();
}

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

//점포 상세 정보 팝업
function fn_strInfoPopup(){
	/** 
	 * 필수 태그
	 * <div id="shop_info_popup">
	 * param : V(정보 열람)
	 */
	gfn_strInfoPopup("V");
	$("#shop_info_popup").popup();
}

function fn_VM1901ChangeTab(tabCd){
	$("#tabCd").val(tabCd);
	$("#moreCnt").val('0');
	
	$("[id^='tab_']").each(function(){
		if($(this).attr('id') === ('tab_' + tabCd)){
			$(this).attr("class", "tab_on");
		}else{
			$(this).attr("class", "tab_off");
		}
	})

	fn_VM1901setList();
}

function fn_VM1901search(){
	$("#moreCnt").val('0');

	fn_VM1901setList();
}

function fn_VM1901refresh(){
	$("#moreCnt").val('0');
	fn_VM1901ChangeTab('B');
}

function fn_VM1901setList(){
	var param 			= new Object();
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	param.tabCd = $("#tabCd").val();
	param.startRow = startRow;
	param.pagingRowCnt = pagingRowCnt;
	
	$.ajax({
		url:'/VM1901GetFinishList',
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
							// 유지보수 목록
							if(tabCd == 'B'){
								html += '	<a href="#" onclick="fn_VM1901ToVM1902(\''+item.maintenanceNo + '\'); return false;" >';
								html += '		<span class="detail">';
								html += '			조치일 : ' + item.actionDate + '<br/>';
								html += '			점검자 : ' + item.inspector + '<br/>';
								html += '			유형 : ' + item.mntType + '<br/>';
								html += '			보수품목 : ' + item.mntItem + '<br/>';
								html += '			보수/교체 내용 : ' + item.mntDescription2 + '<br/>';
								html += '		</span>';
								html += '	</a>';

							// 구축 목록
							}else{
								html += '	<a href="#" onclick="fn_VM1901ToVM1903(\''+item.asNo+'\'); return false;" >';
								html += '		<span class="detail">';
								html += '			조치일 : ' + item.vendorUserNm + '(' + item.vendorNm + ')<br/>';
								html += '			점검자 : ' + item.asDttm + '<br/>';
								html += '			유형 : ' + item.errorType + '<br/>';
								html += '			보수품목 : ' + item.errorType + '<br/>';
								html += '			보수/교체 내용 : ' + item.errorType + '<br/>';
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

function fn_VM1901ToVM1902(maintenanceNo){
	let pageParam = new Object();
	
	pageParam.maintenanceNo = maintenanceNo;
	pageParam.tabCd = $("#tabCd").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	let form = document.movePage;
	form.action = '/VM1902';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function fn_VM1901ToVM1903(asNo){
	let pageParam = new Object();
	pageParam.asNo = asNo;
	
	pageParam.qStrNm = $('#hStrNm').val();
	pageParam.tabCd = $("#tabCd").val();
	
	$("#movePageParam").val(JSON.stringify(pageParam));
	
	let form = document.movePage;
	form.action = '/VM1903';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function fn_VM1901showMoreList(){
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	fn_VM1901setList();
}

// 등록 페이지
function fn_VM1901newFinish(){
	if($('#hStrCd').val() == null || $('#hStrCd').val() == '') {
		alert("점포조회를 통해 점포를 선택해주세요.");
		return;
	}
	var pageParam = new Object();
	pageParam.qStrNm 	= $('#hStrNm').val();
	pageParam.tabCd 	= $("#tabCd").val();
	pageParam.order		= $("input[name='order']:checked").val();

	$("#movePageParam").val(JSON.stringify(pageParam));

	var form = document.movePage;
	form.action = '/VM1904';
	form.method = 'POST';
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}