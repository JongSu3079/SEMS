$(function(){
	var outputContents = '';
	var jDoc;
	
	try {
		jDoc = $(contents);
		
		var imgs = jDoc.find('img');
		if(imgs.length > 0) {
			imgs.css('width', '100%');
		}
		
		var videos = jDoc.find('video');
		if(videos.length > 0) {
			videos.removeClass('note-video-clip');
			videos.prop('autoplay', true);
			videos.attr('controls', true);
			videos.attr('muted', 'muted');
			videos.attr('playsinline', "");
			videos.attr('type', 'video/mp4');
			let html = '';
			for(var i=0; i<jDoc.length; i++) {
				html += jDoc[i].innerHTML;
			}
			
			outputContents = html;
		} else {
			outputContents = contents;
		}
	}
	catch (exception) {
		outputContents = contents;
	}
	finally {
		$('#summernote').html(outputContents);
	}
	
	//이미지 클릭 이벤트 설정
	fn_VM1402ImageEventListener();
	
	let currentUrl = window.location.href;
	if(currentUrl.endsWith('VM1421')||currentUrl.endsWith('VM1421#')){
		fn_VM1421SetTab('VDO');
	}
	
})

// 이미지 클릭이벤트 설정
function fn_VM1402ImageEventListener() {
	$('.container_grp img').addClass("imageZoomDiv_open");
	$('.container_grp img').off('click');
	$('.container_grp img').on('click', function() {
		fn_VM1402ImageZoomPop(this.src);
	})
}

// 이미지 줌 팝업 띄우기
function fn_VM1402ImageZoomPop(src) {
	$('#imageZoomImg').prop("src", src);
	$('#imageZoomDiv').popup();
	$('#imageZoomDiv').css({
		'position':'absolute',
		'top':0,
		'left':0 
	});
}

function fn_VM1421SetTab(tabCd){
	$("#moreCnt").val('0');
	
	fn_VM1421changeTab(tabCd);
}

//탭 변경 - tabCd :ICC,RIF1DOOR, RIF2DOOR, FC
function fn_VM1421changeTab(tabCd) {
	$("#tabCd").val(tabCd);
	
	$("[id^='tab_']").each(function(){
		if($(this).attr('id') === ('tab_' + tabCd)){
			$(this).attr("class", "tab_on");
		}else{
			$(this).attr("class", "tab_off");
		}
	})
	
	let content = '';
	if(tabCd == 'VDO'){
		content += '<div style="padding:2%;">';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동장비 온도 이상 알람 안내</span>';
		content += '	</div>';
		content += '</div>';
		content += '<video class="" src="/images_theme/faq/21/FREEZER_ALARM.mp4" autoplay="" controls="controls" muted="muted" playsinline="" type="video/mp4"></video>';
		$("#content").html(content);
	}
	else if(tabCd === 'ICC'){
		content += '<div style="padding:2%;">';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>ICC 장비사진</span>';
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/ICC_FULL.png" style="width:100%;"></p>';
		content += '	<p><img src="/images_theme/faq/21/ICC_FULL_2.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>ICC 센서부착 사진(BT센서)</span>';
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/ICC_1.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>ICC 센서부착 사진(BT-I센서)</span>';
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/ICC_2.png" style="width:100%;"></p>';
		content += '</div>';
		$("#content").html(content);
	}
//	else if(tabCd === 'RIF1'){
//		content += '<div style="padding:2%;">'; 
//		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
//		content += '		<span>RIF1DOOR 장비사진</span>'; 
//		content += '	</div>';
//		content += '	<p><img src="/images_theme/faq/21/RIF1DOOR_1.png" style="width:100%;"></p>';
//		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
//		content += '		<span>RIF1DOOR 장비사진</span>';
//		content += '	</div>';
//		content += '	<p><img src="/images_theme/faq/21/RIF1DOOR_2.png" style="width:100%;"></p>';
//		content += '</div>';
//		$("#content").html(content);
//	}
	else if(tabCd === 'RIF'){
		content += '<div style="padding:2%;">'; 
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>RIF 장비사진</span>'; 
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/RIF2DOOR_1.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>RIF 센서 부착 사진</span>';
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/RIF2DOOR_2.png" style="width:100%;"></p>';
		content += '</div>';		
		$("#content").html(content);
	}else if(tabCd === 'FF'){
		content += '<div style="padding:2%;">'; 
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동평대 장비사진</span>'; 
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/FF_FULL.png" style="width:100%;"></p>';
		content += '	<p><img src="/images_theme/faq/21/FF_FULL_2.png" style="width:100%;"></p>';
		content += '	<p><img src="/images_theme/faq/21/FF_FULL_3.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동평대 센서 부착 사진</span>';
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/FF_BT.png" style="width:100%;"></p>';
		content += '</div>';		
		$("#content").html(content);
	}else{
		content += '<div style="padding:2%;">'; 
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동콤비 장비사진</span>'; 
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/FC_FULL.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동콤비 상 센서 부착 사진</span>'; 
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/FC_UP_BT.png" style="width:100%;"></p>';
		content += '	<div style="background-color:#B4B4B4;display:flex;justify-content:center;padding:2%;margin:2% 0">';
		content += '		<span>냉동콤비 하 센서 부착 사진</span>'; 
		content += '	</div>';
		content += '	<p><img src="/images_theme/faq/21/FC_DOWN_BT.png" style="width:100%;"></p>';

		content += '</div>';		
		$("#content").html(content);
	}
}


