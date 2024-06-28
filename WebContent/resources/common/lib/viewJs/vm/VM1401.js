$(function(){
	fn_VM1401refresh();
});

function fn_VM1401refresh(){
	var param = {
			"faqGroup" : faqGroup
	}
	
	$.ajax({
		type:'POST',
		dataType:'JSON',
		data:JSON.stringify(param),
		contentType:"application/json; charset=UTF-8",
		url:'/VM1401getList',
		error:function(){
			alert("(오류발생)다시 시도해주세요.");
		},beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},success:function(returnJson){
			if(returnJson.success){
				if(returnJson.items != null){
					var records = '';
					if(returnJson.total > 0){
						data = returnJson.items;
						for(var i=0;i<returnJson.total;i++){
							records += '<li>';
							records += '	<div class="detail_area">';
							

							records += '		<a href="#" onclick="fn_VM1401MovePage(\''+data[i].faqId+'\'); return false;" title="페이지 이동">';
//							records += '		<a href="#" onclick="fn_VM1401MovePageFaqId(\''+data[i].faqId+'\'); return false;" title="">';

							records += '			<span class="detail">'+data[i].title+'</span>';
							records += '		</a>';
							records += '	</div>';
							records += '</li>';
						}
						
						if( returnJson.data == 'S' ){
							$("#message_list").addClass("type3");
						} else {
							$("#message_list").addClass("type2");
						}
					}else{
						records += '<li class="no_result"><p>조회된 내용이 없습니다.</p></li>';
						$("#message_list").removeClass("type2");
					}
				}
				$("#message_list").html(records);
			}
		}
	});
}

// 게시글 페이지 이동
function fn_VM1401MovePage(faqId){
	window.location.href = "/faq/" + faqId;
}

// 게시글 페이지 이동
//function fn_VM1401MovePageFaqId(faqId){
//	window.location.href = "/faq/view/" + faqId;
//}
