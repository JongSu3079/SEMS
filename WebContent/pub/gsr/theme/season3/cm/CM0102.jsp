<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 사용자 약관</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 공통 -->
		<%@ include file="/pub/common/cm/CM0102.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
	$(function() {
		$.ajax({
			url : "CM010201.jsp",
			success : function(result) {
				var refine = $("<div>").html(result).find('.clause').html();
				$('.clauseTxt').eq(0).prepend(refine);
			}
		});
		
		$.ajax({
			url : "CM010202.jsp",
			success : function(result) {
				var refine = $("<div>").html(result).find('.clause').html();
				$('.clauseTxt').eq(1).prepend(refine);
			}
		});
		
		$(".clause input[type=checkbox]").off("change");
		$(".clause input[type=checkbox]").on("change", function() {
			var checks = true;
			$(".clause input[type=checkbox]").each(function(index) {
				if(!this.checked) {
					return checks = false;
				}
			});
			
			if(checks) {
				$(".btn_aree_start a").removeClass("disabled");
			}
			else {
				$(".btn_aree_start a").addClass("disabled");
			}
		});
	});
	</script>
</body>
</html>