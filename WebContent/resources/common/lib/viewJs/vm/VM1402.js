$(function(){
	fn_VM1402ImageEventListener();
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