/**
 * VM0102.jsp
 */
$(function(){
	fn_VM0102Accordion();
	fn_VM0102ImageEventListener();
})

window.onload = function() { 
	// 특보 내용보기 진입 시
	if(warnCode){
		fn_VM0102OpenWarnGuide(warnCode);
	}
}

function fn_VM0102ImageEventListener() {
	$('.container_grp img').addClass("imageZoomDiv_open");
	$('.container_grp img').off('click');
	$('.container_grp img').on('click', function() {
		fn_VM0102ImageZoomPop(this.src);
	})
}

function fn_VM0102ImageZoomPop(src) {
	$('#imageZoomImg').prop("src", src);
	$('#imageZoomDiv').popup();
	$('#imageZoomDiv').css({
		'position':'absolute',
		'top':0,
		'left':0 
	});
}

function fn_VM0101Redirect(){
	$('#returnFrom').attr("action", "/VM0101Redirect");
	$("#returnFrom").submit();
}

//아코디언 상세 정보
function fn_VM0102Accordion(){
	$(".search_list .list li .list_text").off("click");
	$(".search_list .list li span.list_text").on("click", function() {
		var listItem = $(this).parent("li");
		if (listItem.find(".list_text_detail").hasClass("height-transition-hidden")) {
			// 상세화면 열기
			listItem.find(".list_text_detail").slideDownTransition();
			listItem.addClass("open");
		}
		else {
			// 상세화면 닫기
			listItem.find(".list_text_detail").slideUpTransition();	
			listItem.removeClass("open");
		}
	});
	
	// 닫기버튼으로 닫기
	$("[id^='closeBtn'").off("click");
	$("[id^='closeBtn'").on("click", function() {
		var listItem = $(this).parent().parent().parent("li");
		// 상세화면 닫기
		listItem.find(".list_text_detail").slideUpTransition();	
		listItem.removeClass("open");
	});
	
	// 닫기
	$.fn.slideUpTransition = function() {
		return this.each(function() {
			var $el = $(this);
			$el.css("max-height", "0");
			$el.removeClass("height-transition");
			$el.addClass("height-transition-hidden");
		});
	};
	
	// 열기
	$.fn.slideDownTransition = function() {
		return this.each(function() {
			var $el = $(this);
			// temporarily make visible to get the size
			$el.css("max-height", "none");
			var height = $el.outerHeight();
			$el.removeClass("height-transition-hidden");
			$el.addClass("height-transition");
			
			// reset to 0 then animate with small delay
			$el.css("max-height", "0");
			setTimeout(function() {
				$el.css({"max-height": height});
			}, 1);
		});
	};
}

// 해당 특보내용 보기
function fn_VM0102OpenWarnGuide(warnCode){
	$("#warnDiv ul li").each(function(){
		var warnList = $(this).children('span').children('span').text();
		// 해당 특보 내용 open
		if(warnList.indexOf(warnCode) > -1){
			$(this).children('span').children('span').trigger('click');
			// 해당 내용으로 이동
			var offset = $(this).offset();
			$('html, body').animate({scrollTop : offset.top}, 400);
		}
		
	});
}