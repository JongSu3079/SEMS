// 스크립트 시작 
window.onpageshow = function(event) {
	// 공지사항 상세 내용 팝업
	$('#notice_popup').popup();
	
	// 새로고침
	fn_VM0801refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 새로고침
function fn_VM0801refresh(){
	fn_VM0801showList();
	$('#notice_popup').hide();
}

// 공지사항 조회
function fn_VM0801showList() {
	var records = "";
	
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/json; charset=UTF-8",
		url : '/VM0801Search',
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
							records +='			onclick="javascript:fn_VM0801viewNotice(\'' + notice.noticeId + '\',\'' + notice.companyCd + '\',\''+ notice.newYn +'\'); return false;">';
							records += '		<span class="notice_title">'	+ notice.title + '</span>';
							records += '		<span class="write_titme">' + notice.pubDttm;
							if(notice.newYn == "Y") {
								records += '<span class="icon_new"><img src="/images/icon_new.png" alt="NEW" /></span>';
							}
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
function fn_VM0801viewNotice(noticeId, companyCd, newYn) {
	var viewInfo = {
		"noticeId"	: noticeId,
		"companyCd"	: companyCd,
		"newYn"		: newYn
	}
	
	$('#title').html("");
	$('#contents').html("");
	$('#pub_dttm').html("");
	
	$.ajax({
		type : "POST",
		dataType : "JSON",
		data : JSON.stringify(viewInfo),
		contentType : "application/json; charset=UTF-8",
		url : "/VM0801Detail",
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
					if( notice.picData ){
						html += '<div class="imgBox">';
						if(notice.videoYn == 'Y'){
							html += '<video width="100%" controls autoplay muted>';
							html += '<source type="video/mp4" src="/images_theme/faq/temp/'+notice.picData+'">';
							html += '</video>';
						}else{
							html += '<img id="img1" alt="공지사항 이미지" src="'+notice.picData+'" style="max-width:100%;"/>';
						}
						html += '</div>';
						
					}
					$('#contents').html(html);
					
					$('#pub_dttm').html(notice.pubDttm);
					if(newYn == "Y") {
						fn_VM0801showList();
					}
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
	
	$('#notice_popup').show();
}
