// 스크립트 시작 
window.onpageshow = function(event) {
	// 공지사항 상세 내용 팝업
	$('#notice_popup').popup();
	
	// 새로고침
	fn_VM2301refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 새로고침
function fn_VM2301refresh(){
	fn_VM2301showList();
	$('#notice_popup').hide();
}

// 공지사항 조회
function fn_VM2301showList() {
	var records = "";
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/json; charset=UTF-8",
		url : '/VM2301Search',
		error : function() {
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
				if (returnJSON.total > 0) {
					$.each(
						returnJSON.items,
						function(i, notice) {
							records += '<li>';
							records += '	<a href="#" class="notice_popup_open"';
							records +='			onclick="javascript:fn_VM2301viewNotice(\'' + notice.noticeId + '\',\'' + notice.companyCd + '\'); return false;">';
							records += '		<span class="notice_title">'	+ notice.title + '</span>';
							records += '		<span class="write_titme">' + notice.pubDttm;
							records += '		</span>';
							records += '	</a>';
							records += '</li>';
						});
				} else {
					records = '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
				}
				
				$('#notice_list').html(records);
				
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
};

// 공지사항 상세 내용 조회
function fn_VM2301viewNotice(noticeId, companyCd) {
	var viewInfo = {
		"noticeId"	: noticeId,
		"companyCd"	: companyCd,
	}
	
	$('#title').html("");
	$('#contents').html("");
	$('#pub_dttm').html("");
	
	$.ajax({
		type : "POST",
		dataType : "JSON",
		data : JSON.stringify(viewInfo),
		contentType : "application/json; charset=UTF-8",
		url : "/VM2301Detail",
		error : function() {
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
				var notice = returnJSON.data;
				if(notice != null) {
					$('#title').html(notice.title);
					
					// 팝업 내용 세팅
					var html = "";
					if(notice.contents){
						html += '<div><span>'+notice.contents+'</span></div>';
					}
					$('#contents').html(html);
					
					$('#pub_dttm').html(notice.pubDttm);
						fn_VM2301showList();
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
	
	$('#notice_popup').show();
}
