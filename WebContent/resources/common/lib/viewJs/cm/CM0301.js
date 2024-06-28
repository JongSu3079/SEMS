// 메뉴 동작 스크립트 시작
$(function() {
	// 메뉴 버튼 동작
	$(".btn_gnb").on("click", function() {
		// gnb open
		$(".nav").addClass("open");
		$("body").css({"overflow":"hidden"});
		$(".trunk").css({"display":"none"});
	});
	//$(".nav").on("click", function() {
	$(".btn_close_all_menu").on("click", function() {
		// gnb close
		$(".nav").removeClass("open");
		$("body").css({"overflow":"auto"});
		$(".trunk").css({"display":"block"});
	});
	
	// 메뉴 목록 가져오기
	var records = "";
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/json; charset=UTF-8",
		url : '/CM0301Search',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.total > 0) {
					$.each(returnJSON.items, function(i, menuInfoList) {
						var newAlarm = menuInfoList.menuId == "VM0701" && returnJSON.data.alaramCnt > 0;
						var newSignAlarm = menuInfoList.menuId == "VM0704" && returnJSON.data.signAlarmCnt > 0;
						var newNotice = menuInfoList.menuId == "VM0801" && returnJSON.data.newNoticeCnt > 0;
						var menuWidth = (returnJSON.total === (i+1) && i%2 === 0) ? '100%' : '50%';
						records += '<li data-width="' + menuWidth + '">';
						records += '	<a href="/menu/' + menuInfoList.menuId + '" data-menu="' + menuInfoList.menuId + '">';
						records += '		<span class="menu_text" data-new="' + (newAlarm || newNotice || newSignAlarm) + '">';
						records += 				menuInfoList.menuNm + '<em class="msg">새로운 내용이 있습니다.</em>';
						records += '		</span>';
						records += '	</a>'
						records += '</li>';
					});
				}
				$("#all_menu").html(records);
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
});