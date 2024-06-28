<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 점포조회</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 공통 -->
		<%@ include file="/pub/common/cm/CM0401.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
	$(function() {
		$(".order").cmToggle(1);
		
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
	});
	</script>
</body>
</html>