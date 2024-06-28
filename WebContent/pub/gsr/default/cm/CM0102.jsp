<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<!-- <meta name="theme-color" content="#353942" /> 주소창 컬러 -->
<title>에너지 관제시스템 모바일웹 - 사용자 약관</title>
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/app_icon.png" />
<link rel="apple-touch-icon-precomposed" href="/images/app_icon.png" />
<link rel="stylesheet" type="text/css" href="/resources/css/common.css" />
<link rel="stylesheet" type="text/css" href="/gsr/lib/css/customer.css" />
<script src="/resources/js/jquery-1.8.2.min.js"></script>
<script src="/resources/js/jquery.popupoverlay.js"></script>
<script src="/resources/js/common.js"></script>
<script src="/resources/js/commonUI.js"></script>
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
