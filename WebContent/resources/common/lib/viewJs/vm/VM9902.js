// 스크립트 시작 
window.onpageshow = function(event) {
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 검색
function fn_VM9902refresh(){
	var srcLocalArea = $('#srcLocalArea').val();
	if( srcLocalArea == '' ){
		return;
	}
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		data : srcLocalArea,
		contentType : "application/text; charset=UTF-8",
		url : '/VM9902Search',
		error : function() {
			$('#viewLoadingDiv').fadeOut();
			alert("(오류발생)다시 시도해주세요.");
		},
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.items != null) {
					var items = returnJSON.items;
					var html = '';
					if( items.length > 0 ){
						for( var i=0; i<items.length; i++ ){
							html += '<li>';
							html += '	<a href="#" class="list_text" onclick="fn_VM9902selLocalArea(\'' + items[i].areaCd + '\',\'' + items[i].fullAreaNm + '\'); return false;">';
							html += '		<span>' + items[i].areaNm + '</span>';
							html += '		<span>' + items[i].cityNm + '</span>';
							html += '		<span class="point">' + items[i].dongNm + '</span>';
							html += '	</a>';
							html += '</li>';
						}
					} else {
						html += '<li class="no_result"><p>검색 결과가 없습니다.</p></li>';
					}
					$('#storeList').html( html );
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 목록에서 선택하기
function fn_VM9902selLocalArea( areaCd, areaNm ){
	var rslt = confirm( '기상지역 선택\n[' + areaNm + ']' );
	if( rslt ){
		paramJson.srcAreaCd	= areaCd;
		paramJson.srcAreaNm	= areaNm;
		paramJson.srcSet	= 'Y';
		$("#backParamData").val( JSON.stringify(paramJson) );
		
		var form = document.backForm; 
		form.action = '/VM9901Redirect';
		form.method = "post";
		form.enctype = "application/x-www-form-urlencoded";
		form.submit();
	}
}