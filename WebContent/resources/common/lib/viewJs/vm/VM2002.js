// 전역변수 
var returnData = null;

$(function(){
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	fn_VM2002RetrieveMntntList();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
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

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

function fn_VM2002Search(){
	$("#moreCnt").val( 0 );
	
	fn_VM2002RetrieveMntntList();
}

function fn_VM2002RetrieveMntntList(){
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	var param 			= new Object;
	param.strNm 		= $("#srcStrNm").val();
	param.progStatCd 	= 'S';		// 조치예정인 점검만 조회
	param.startRow 		= startRow;
	param.pagingRowCnt 	= pagingRowCnt;
	
	$.ajax({
		type : 'POST',
		url:'/retrieveSignMntncList',
		data:JSON.stringify(param),
		dataType:'json',
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success:function(response){
			if (response.success) {
				var moreCnt = $("#moreCnt").val();
				var pagingRowCnt = $("#pagingRowCnt").val();
				var html = '';
				if(response.items != null) {
					if(moreCnt == 0){
						returnData = response.items;
					}else{
						returnData = [
							...returnData,
							...response.items
						]
					}
					var items = response.items;
					
					if( items.length > 0 ){
						items.forEach( (item,i) => {
							i = Number(startRow) + Number(i);
							html += '<li>';
							html +=  '	<div class="title_area">';
							html +=  '		<span class="branch">' + item.strNm + '</span>';
							html +=  '	</div>';
							html +=  '	<div class="detail_area">';
							html +=  '		<a href="#" onclick="fn_VM2002PageMoveVM2003('+i+'); return false;" >';
							html +=  '			<span class="detail">';
							html +=  '				담당기사 : '+ item.vendorUserNm + ' ( ' + item.vendorNm +' )<br/>';
							html +=  '				점검일정 : '+ item.yyyymmdd + '<br/>';
							html +=  '			</span>';
							html += '		</a>';
							html += '	</div>';
							html += '</li>';
						});
						$("#mntncList").addClass("type2");
					} else {
						html += '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#mntncList").removeClass("type2");
					}
					
					// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
					if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
						$("#btn_more").show();
					} else {
						$("#btn_more").hide();
					}
				}
				if(moreCnt == 0){
					$("#mntncList").html(html);
				}else{
					$("#mntncList").append(html);
				}
				
			}else {
				$("#mntncList").html('<li class="no_result"><p>조회된 내용이 없습니다.</p></li>');
				$("#mntncList").removeClass("type2");
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	})
}


//더보기 클릭
function fn_VM2002showMoreList() {
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	fn_VM2002RetrieveMntntList();
}

function fn_VM2002PageMoveVM2003(index){
	var paramData = returnData[index];
	paramData.qStrNm = $("#srcStrNm").val();
	
	$("#movePageParam").val(JSON.stringify(paramData));
	
	var form = document.movePageVM2003;
	form.action = '/menu/VM2003';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function fn_VM2001Redirect(){
	$('#returnFrom').attr("action", "/VM2001Redirect");
	$("#returnFrom").submit();
}