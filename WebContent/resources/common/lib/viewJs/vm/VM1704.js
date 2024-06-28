let responseArray = [];
// 스크립트 시작 
window.onpageshow = function(event) {
	fn_VM1704refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 검색
function fn_VM1704refresh(){
	$("#moreCnt").val( 0 );
	
	fn_VM1704RetrieveAbsStr();
}

function fn_VM1704RetrieveAbsStr(){
var srcStrNm = $("#srcStrNm").val();
	
	var moreCnt			= $("#moreCnt").val();
	var pagingRowCnt	= $("#pagingRowCnt").val();
	var startRow		= (Number(moreCnt) * Number(pagingRowCnt)) + '';
	
	var param = new Object();
	param.strNm			= srcStrNm;
	param.startRow 		= startRow;
	param.pagingRowCnt 	= pagingRowCnt;
	
	$.ajax({
		url:'/VM1704RetrieveAbsStrInfo',
		type:'POST',
		dataType:'JSON',
		data:JSON.stringify(param),
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				var html = '';
				if(response.items && response.items.length > 0){
					responseArray = response.items;
					
					var items = response.items;
					
					items.forEach((item,i) => {
						html += '<li>';
						html += '	<a href="#" class="list_text" onclick="fn_VM1704selAbsStr('+i+'); return false;">';
						html += '		<span>' + items[i].strNm + '</span>';
						html += '		<span>' + items[i].viewStrCd + '</span><br/>';
						html += '		<span>' + items[i].addr + '</span>';
						html += '	</a>';
						html += '</li>';
					})
				}else {
					html += '<li class="no_result"><p>검색 결과가 없습니다.</p></li>';
				}
				
				// 검색결과의 개수가 (더보기횟수 * pagingRowCnt)보다 클 때만 [더보기] 버튼 보이기
				if(response.total > ((Number(moreCnt) + 1) * Number(pagingRowCnt))){
					$("#btn_more").show();
				} else {
					$("#btn_more").hide();
				}
				
				if(moreCnt == 0){
					$("#storeList").html(html);
				}else{
					$("#storeList").append(html);
				}
			}else {
				$('#storeList').html( '<li class="no_result"><p>검색 결과가 없습니다.</p></li>' );
				alert("(조회실패)다시 시도해주세요.");
			}
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
	})
}

//더보기 클릭
function fn_VM1704showMoreList() {
	var moreCnt = $("#moreCnt").val();
	$("#moreCnt").val(Number(moreCnt) + 1);
	
	fn_VM1704RetrieveAbsStr();
}

function fn_VM1704selAbsStr(index){
	var selrow = responseArray[index]
	pageParam.strNm = selrow.strNm;
	pageParam.viewStrCd = selrow.viewStrCd;
	pageParam.addr = selrow.addr;
	pageParam.back = 'Y';
	
	$("#backParamData").val(JSON.stringify(pageParam));
	
	var form = document.backForm; 
	form.action = '/VM1703Redirect';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}