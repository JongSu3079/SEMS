<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - SEMS 소개</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- SEMS 소개 -->
		<%@ include file="/pub/common_theme/vm/VM0105.jsp"%>
		<!-- //SEMS 소개 -->
	</div>
	<script src="/pub/resources/gsr/lib/js/img-touch-canvas.js"></script>
	<script>
	$(function() {
		$(".search_list .list li .list_text").off("click");
		$(".search_list .list li span.list_text, .btn_grp button").on("click", function() {
			var listItem = $(this).parents("li");
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
		
		//test
        var gesturableImg = new ImgTouchCanvas({
            canvas: document.getElementById('mycanvas'),
            path: "/images_theme/faq/1/00.png",
            desktop: true
        });
	});
	</script>
</body>
</html>