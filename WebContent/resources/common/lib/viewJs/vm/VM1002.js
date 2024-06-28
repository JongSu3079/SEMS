var g_scrollTop = 0;
var actingInput = '';
var initFlag = false;

// 스크립트 시작 
window.onpageshow = function(event) {
	// 신규접근 시 날짜 세팅
	if("new" == mode){
		gfn_getToday( setTodayCallBack );
	} else {
		fn_VM1002SetImg();
	}
	
	// 썸네일 뒤로가기 감지
	window.onpopstate = function(e){
		hideThumb();
	}
	
	// Android/iOS OS 별 기본 동작 처리
	setOSDefault();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 서버에서 가져온 이미지 세팅
function fn_VM1002SetImg(){
	for( var i=0; i<imgDataArr.length; i++ ){
		if( imgDataArr[i] != '' ){
			var imgObj = new Image();
			imgObj.src = imgDataArr[i];
			
			var targetId = '#img'+(i+1);
			$(targetId).attr('src', imgDataArr[i]);
			$(targetId).closest(".imgBox").addClass("be");
		}
	}
	thumbnailZoom();
}

// Android/iOS OS 별 기본 동작 처리
function setOSDefault(){
	var devName = OSInfoDev();
	if(devName.indexOf("Android") != -1) {
		// android - 파일첨부가 바로 되지 않는 문제로 처음 파일 첨부버튼은 비활성화
		$(".thumbBox .fileBox input[type=file]").css('pointer-events', 'none');
		$(".thumbBox .fileBox input[type=file]").off("click");
		$(".thumbBox .fileBox input[type=file]").on("click", function(event){
			event.preventDefault();
			event.stopPropagation();
		});
		
		// 카메라 권한(네이티브 함수)
		$('.thumbBox .filebox').off('click');
		$('.thumbBox .filebox').on('click', function(){
			actingInput = $(this).children('input[type=file]').attr('id');
			callNativeFunction('getCameraAuth', 'single', 'onSuccessGetCameraAuth', 'onErrorGetCameraAuth', false);
		});
	} else {
		$("input[type=file]").off("change");
		$("input[type=file]").on("change", function(){
			var thumbnail = $(this).closest("td").find("img");
			readURL(this, thumbnail);
		});
	}
}

// 카메라 권한 획득 성공 시(Android only)
function fn_getCamAuthSuc(){
	if( cameraAuth == 'OK' ){
		// 점포사진 리스트(비활성화)
		$(".thumbBox .filebox").off("click");
		$(".thumbBox .filebox").on("click", function() {
			
			var input_url = $(this).find("input[name$=url]");
			var thumbnail = $(input_url).closest("td").find("img");
			$(".dim").css({
				"width" : $(window).width(),
				"height" : $(window).height()
			});
			
			// 하단 메뉴 open
			$(".dim, .comboBox").removeClass("none");
			$(".comboBox").addClass("show");
			
			$(".dim").off("click");
			$(".dim").on("click", function() {
				$(".dim, .comboBox").addClass("none");
				$(".comboBox").removeClass("show");
			});
			
			// 하단 메뉴 event
			$(".comboBox input[type=file]").off("change");
			$(".combobox input[type=file]").val("");
			$(".comboBox input[type=file]").on("change", function(){
				readURL(this, thumbnail);
				
				if($(".comboBox").hasClass("show")) {
					$(".dim, .comboBox").addClass("none");
					$(".comboBox").removeClass("show");
					
					input_file.css({"pointer-events":"none"});
					input_file.removeClass("action");
					input_file.removeAttr("capture");
				}
			});
		});

		
		$('#cameraAuth').val('OK');
		if( !initFlag ){
			$('#'+actingInput).closest('.filebox').trigger('click');
		}
		initFlag = true;
	}
}

//3. load input file
function readURL(input, thumbnail) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$(thumbnail).attr('src', e.target.result);
			$(thumbnail).closest(".imgBox").addClass("be");
			$(thumbnail).closest(".thumbBox").find('input[name$=flag]').val('true');
			
			thumbnailZoom();
		}
		
		reader.readAsDataURL(input.files[0]);
	}
}

//3-1. view thumbnail
function thumbnailZoom() {
	$(".thumbBox .imgBox.be").off("click");
	$(".thumbBox .imgBox.be").on("click", function(){
		// history 추가
		history.pushState({}, "", "");
		
		// widndow scroll
		g_scrollTop = $(window).scrollTop();
		
		// img url (base64)
		var base64 = $(this).find("img").attr("src");
		
		// img size
		var width = $(this).find("img").get(0).naturalWidth;
		var height = $(this).find("img").get(0).naturalHeight;
		
		// thumbnail canvas
		$("body").append($("<div id='thumbWhole' class='whole'><img /></div>)"));
		if(width > height) {
			// horizontal
			$("#thumbWhole img").addClass("rotate");
			$("#thumbWhole img").attr('width', width*$(window).width()/height);
			$("#thumbWhole img").attr('height', $(window).width());
		}
		else {
			// vertical
			$("#thumbWhole img").attr('width', $(window).width());
			$("#thumbWhole img").attr('height', height*$(window).width()/width);
		}
		
		// thumbnail apply
		$("#thumbWhole img").attr('src', base64);
		$("#thumbWhole").width($(window).width());
		$("#thumbWhole").height($(window).height());
		$("#wrap").hide();
		
		// thumbnail whole mode
		$("#thumbWhole").off("click");
		$("#thumbWhole").on("click", function(){
			window.history.back();
		});
	});
}

// 사진 줌 취소
function hideThumb(){
	$("#wrap").show();
	$("#thumbWhole").remove();
	$(window).scrollTop(g_scrollTop);
}

//현재 시간 표시 콜백 함수
var setTodayCallBack = function fn_VM1002setToday( objDate ){
	var d = objDate.getDate();
	var m = objDate.getMonth()+1;
	var y = objDate.getFullYear();
	
	d<10 ? d='0'+d : d;
	m<10 ? m='0'+m : m;
	
	var ymd = y + '-' + m + '-' + d;
	
	$('#recvDate, #solveDate').val( ymd );
}

// 이미지 압축
function fn_imgCompress(){
	$('.thumbBox .imgBox img').each(function(i,ele){
		if( $(ele).closest('.thumbBox').find('input[name$=flag]').val() == 'true' ){
			var oriImgObj = $(ele).get(0);
			var imgType = $(ele).attr('src').split(';')[0].split(':')[1];
			var width = oriImgObj.naturalWidth;
			var height = oriImgObj.naturalHeight;
			
			var upWidth = 0;
			var upHeight = 0;
			if( width >= height ){
				upWidth = (width>=1920 ? 1920 : width);
				upHeight = (width>=1920 ? Math.round(1920*height/width) : height);
			} else {
				upHeight = (height>=1920 ? 1920 : height);
				upWidth = (height>=1920 ? Math.round(1920*width/height) : width);
			}
			
			var canvas = $('#tempCanvas')[0];
			canvas.width = upWidth;
			canvas.height = upHeight;
			var ctx = canvas.getContext('2d').drawImage(oriImgObj, 0, 0, upWidth, upHeight);
			var cnvImg64 = canvas.toDataURL('image/jpeg', 70/100);
			var cnvImgObj = new Image();
			cnvImgObj.src = cnvImg64;
			
			var gap = '[' + i + '] '
				+ $(ele).attr('src').length + ' > ' + cnvImg64.length + ', '
				+ width + ' x ' + height + ' > ' + upWidth + ' x ' + upHeight;
			$(ele).attr('src', cnvImg64);
			$(ele).closest('.thumbBox').find('input[name$=url]').val(cnvImg64);
		}
	})
}

function fn_VM1002save(){
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	// 필수항목 유효성 검사, null 체크
	var reg = /2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-2])/;
	var regFlag = reg.test( $('#recvDate').val() ) && reg.test( $('#solveDate').val() );		// true면 통과
	var lenFlag = $('#recvDate').val().length == 10 && $('#solveDate').val().length == 10;	// true면 통과
	
	if( !regFlag || ( regFlag && !lenFlag ) ){
		alert('접수일자, 처리일자를 다시 확인해주세요.\n(ex)2018-11-11)');
		$('#viewLoadingDiv').fadeOut();
		return;
	}
	
	if($("#solveName").val() == ''){
		alert('처리자 이름을 입력하세요');
		$('#viewLoadingDiv').fadeOut();
		return;
	}
	
	if($("#img1").attr('src') == '/images/bg_thumb.png'){
		alert("간판 사진을 등록하세요");
		$('#viewLoadingDiv').fadeOut();
		return ;
	}
	
	// 이미지 압축
	fn_imgCompress();
	
	$("#inputForm").ajaxForm({
		type: "POST",
		cache: false,
		async: false,
		url: "/VM1002Save",
		enctype: "multipart/form-data",
		dataType : "json",
		success : function(data){
			alert(data.msg);
			if( data.success ){
				window.location.replace('/VM1001');
			}
		},
		error : function() {
			alert("[오류발생:EE01] 다시 시도해주세요.\n유지보수 목록 페이지로 이동합니다.");
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
	});
	$("#inputForm").submit();
}

//OS 버전 보기 
var uanaVigatorOs = navigator.userAgent; 
var AgentUserOs= uanaVigatorOs.replace(/ /g,''); 
var Ostxt=""; 
var OSName=""; 
var OsVers=""; 

// This script sets OSName variable as follows: 
// "Windows" for all versions of Windows 
// "MacOS" for all versions of Macintosh OS 
// "Linux" for all versions of Linux 
// "UNIX" for all other UNIX flavors 
// "Unknown OS" indicates failure to detect the OS 
new function() { 
	var OsNo = navigator.userAgent.toLowerCase(); 
	jQuery.os = { 
		Linux: /linux/.test(OsNo), 
		Unix: /x11/.test(OsNo), 
		Mac: /mac/.test(OsNo), 
		Windows: /win/.test(OsNo) 
	} 
} 

function OSInfoDev(){ 
	if($.os.Windows) { 
		if(AgentUserOs.indexOf("WindowsCE") != -1) 
			OSName="Windows CE"; 
		else if(AgentUserOs.indexOf("Windows95") != -1) 
			OSName="Windows 95"; 
		else if(AgentUserOs.indexOf("Windows98") != -1) { 
			if (AgentUserOs.indexOf("Win9x4.90") != -1) OSName="Windows Millennium Edition (Windows Me)";
			else OSName="Windows 98"; 
		} 
		else if(AgentUserOs.indexOf("WindowsNT4.0") != -1) OSName="Microsoft Windows NT 4.0"; 
		else if(AgentUserOs.indexOf("WindowsNT5.0") != -1) OSName="Windows 2000"; 
		else if(AgentUserOs.indexOf("WindowsNT5.01") != -1) OSName="Windows 2000, Service Pack 1 (SP1)"; 
		else if(AgentUserOs.indexOf("WindowsNT5.1") != -1) OSName="Windows XP"; 
		else if(AgentUserOs.indexOf("WindowsNT5.2") != -1) OSName="Windows 2003"; 
		else if(AgentUserOs.indexOf("WindowsNT6.0") != -1) OSName="Windows Vista/Server 2008"; 
		else if(AgentUserOs.indexOf("WindowsNT6.1") != -1) OSName="Windows 7"; 
		else if(AgentUserOs.indexOf("WindowsNT6.2") != -1) OSName="Windows 8"; 
		else if(AgentUserOs.indexOf("WindowsNT6.3") != -1) OSName="Windows 8.1"; 
		else if(AgentUserOs.indexOf("WindowsPhone8.0") != -1) OSName="Windows Phone 8.0"; 
		else if(AgentUserOs.indexOf("WindowsPhoneOS7.5") != -1) OSName="Windows Phone OS 7.5"; 
		else if(AgentUserOs.indexOf("Xbox") != -1) OSName="Xbox 360"; 
		else if(AgentUserOs.indexOf("XboxOne") != -1) OSName="Xbox One"; 
		else if(AgentUserOs.indexOf("Win16") != -1) OSName="Windows 3.x"; 
		else if(AgentUserOs.indexOf("ARM") != -1) OSName="Windows RT"; 
		else OSName="Windows (Unknown)"; 
		
		if(AgentUserOs.indexOf("WOW64") != -1) OsVers=" 64-bit(s/w 32-bit)"; 
		else if(AgentUserOs.indexOf("Win64;x64;") != -1) OsVers=" 64-bit(s/w 64-bit)"; 
		else if(AgentUserOs.indexOf("Win16") != -1) OsVers=" 16-bit"; 
		else OsVers=" 32-bit"; 
	} else if ($.os.Linux) { 
		if(AgentUserOs.indexOf("Android") != -1) { OSName = getAndroidDevName(); } 
		else if(AgentUserOs.indexOf("BlackBerry9000") != -1) OSName="BlackBerry9000"; 
		else if(AgentUserOs.indexOf("BlackBerry9300") != -1) OSName="BlackBerry9300"; 
		else if(AgentUserOs.indexOf("BlackBerry9700") != -1) OSName="BlackBerry9700"; 
		else if(AgentUserOs.indexOf("BlackBerry9780") != -1) OSName="BlackBerry9780"; 
		else if(AgentUserOs.indexOf("BlackBerry9900") != -1) OSName="BlackBerry9900"; 
		else if(AgentUserOs.indexOf("BlackBerry;Opera Mini") != -1) OSName="Opera/9.80"; 
		else if(AgentUserOs.indexOf("Symbian/3") != -1) OSName="Symbian OS3"; 
		else if(AgentUserOs.indexOf("SymbianOS/6") != -1) OSName="Symbian OS6"; 
		else if(AgentUserOs.indexOf("SymbianOS/9") != -1) OSName="Symbian OS9"; 
		else if(AgentUserOs.indexOf("Ubuntu") != -1) OSName="Ubuntu"; 
		else if(AgentUserOs.indexOf("PDA") != -1) OSName="PDA"; 
		else if(AgentUserOs.indexOf("NintendoWii") != -1) OSName="Nintendo Wii"; 
		else if(AgentUserOs.indexOf("PSP") != -1) OSName="PlayStation Portable"; 
		else if(AgentUserOs.indexOf("PS2;") != -1) OSName="PlayStation 2"; 
		else if(AgentUserOs.indexOf("PLAYSTATION3") != -1) OSName="PlayStation 3"; 
		else OSName="Linux (Unknown)"; 
		
		if(AgentUserOs.indexOf("x86_64") != -1) OsVers=" 64-bit"; 
		else if(AgentUserOs.indexOf("i386") != -1) OsVers=" 32-bit"; 
		else if(AgentUserOs.indexOf("IA-32") != -1) OsVers=" 32-bit"; 
		else OsVers=""; 
	} else if ($.os.Unix) { 
		OSName="UNIX"; 
	} else if ($.os.Mac) { 
		if(AgentUserOs.indexOf("iPhone") != -1) { 
			if(AgentUserOs.indexOf("iPhoneOS3") != -1) OSName="iPhone OS 3"; 
			else if(AgentUserOs.indexOf("iPhoneOS4") != -1) OSName="iPhone OS 4"; 
			else if(AgentUserOs.indexOf("iPhoneOS5") != -1) OSName="iPhone OS 5"; 
			else if(AgentUserOs.indexOf("iPhoneOS6") != -1) OSName="iPhone OS 6"; 
			else OSName="iPhone"; 
		} else if(AgentUserOs.indexOf("iPad") != -1) { 
			OSName="iPad"; 
		} else if(AgentUserOs.indexOf("MacOS") != -1) { 
			if(AgentUserOs.indexOf("Macintosh") != -1) OSName="Macintosh"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.1")) != -1) OSName="Mac OS X Puma"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.2")) != -1) OSName="Mac OS X Jaguar"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.3")) != -1) OSName="Mac OS X Panther"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.4")) != -1) OSName="Mac OS X Tiger"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.5")) != -1) OSName="Mac OS X Leopard"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.6")) != -1) OSName="Mac OS X Snow Leopard"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.7")) != -1) OSName="Mac OS X Lion"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.8")) != -1) OSName="Mac OS X Mountain Lion"; 
			else if((AgentUserOs.indexOf("MacOSX10_9")||AgentUserOs.indexOf("MacOSX10.9")) != -1) OSName="Mac OS X Mavericks"; 
		} else { 
			OSName="MacOS (Unknown)"; 
		} 
	} else { 
		OSName="Unknown OS"; 
	} 
	var OSDev = OSName + OsVers; 
	return OSDev; 
} 

// Android의 단말 이름을 반환 
function getAndroidDevName() { 
	var uaAdata = navigator.userAgent; 
	var regex = /Android (.*);.*;\s*(.*)\sBuild/; 
	var match = regex.exec(uaAdata); 
	if(match) { 
		var ver = match[1]; 
		var dev_name = match[2]; 
		return "Android " + ver + " " + dev_name; 
	} 
	
	return "Android OS"; 
} 