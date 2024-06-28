/*
 * value
 * -1 : 비활성화
 *  0 : 첫번째 토글 버튼 선택
 *  1 : 두번째 토글 버튼 선택
 * 그외 : 아무 것도 선택 안함
 */
$.fn.cmToggle = function(value, fun) {
	var obj = $(this);
	var btn = $(this).children();
	
	// 초기화
	btn.removeClass("on , disabled");
	if(value == -1) {
		// disabled
		btn.addClass("disabled");
		return;
	}
	else if(value == 0) {
		btn.eq(0).addClass("on");
	}
	else if(value == 1) {
		btn.eq(1).addClass("on");
	}
	
	btn.off("click");
	btn.on("click", function() {
		obj.children().not(this).removeClass("on");
		$(this).addClass("on");
		fun();
	});
}
/*
$.fn.tnmCtrlBotton = function(value) {
	var btn = $(this);
	
	if(value == 1) {
		btn.addClass("on");
	}
	else if(value == 0) {
		// disabled
		btn.addClass("disabled");
		return;
	}
	
	btn.off("click");
	btn.on("click", function() {
		if( btn.hasClass("on") ) {
			// off
			btn.removeClass("on");
		}
		else {
			// on
			btn.addClass("on");
		}
	});
}
*/



// scroll fixed

var delta = 0;
/*
$(window).scroll(function(event){ 
	
	delta = $("header").height();
	
	var st = $(this).scrollTop();
	
	if(st >= delta) {
		hasScrolled(); 
	}
	else {
		endScrolled();
	}
	
});
*/
function hasScrolled() { // 동작을 구현
//	$("header").addClass("navi_fixed");
	delta = $("header").height() - $(".statusBar").height();
	if(delta > 48) {
		$("#container").addClass("navi_fixed");
	}
	else if(delta <= 48 && delta > 0) {
		$("#container").addClass("navi_fixed_2");
	}
}
/*
function endScrolled() {
	$("#container").removeClass("navi_fixed, navi_fixed_2");
}
*/

function eventMenu() {
	$(".btn_gnb").off("click");
	$(".btn_gnb").on("click", function() {
		// gnb open
		$(".nav").addClass("open");
		$("body").css({"overflow":"hidden"});
		$(".trunk").css({"display":"none"});
	});
	$(".btn_close_all_menu").off("click");
	$(".btn_close_all_menu").on("click", function() {
		// gnb close
		$(".nav").removeClass("open");
		$("body").css({"overflow":"auto"});
		$(".trunk").css({"display":"block"});
	});
}

$(function() {
	hasScrolled();
	eventMenu();
});
