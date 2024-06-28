<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<!DOCTYPE html>
<html lang="ko">
<head>
<title>WebView test page</title>
</head>
<body>
	web view test 용 페이지. 테스트 완료 후 삭제 요망
<script>
window.onpageshow = function(event) {
	console.log('page loaded');
};
</script>
</body>
</html>