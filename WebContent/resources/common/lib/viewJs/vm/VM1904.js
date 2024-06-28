var g_scrollTop = 0;
var actingInput = '';
var initFlag = false;

$(function(){

	gfn_getToday( setTodayCallBack );

	fn_VM1902getMntCodeChange1();
	fn_VM1902getMntCodeChange3();

	// 보수품목 - 보수교체내용 매핑
	$('#mntItem').on('change', function(){
		let mntItemVal = $('#mntItem').val();
		$('#mntDescription').val(mntItemVal);
	})

	// 썸네일 뒤로가기 감지
	window.onpopstate = function(e){
		hideThumb();
	}

	// Android/iOS OS 별 기본 동작 처리
	setOSDefault();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})


// Android/iOS OS 별 기본 동작 처리
function setOSDefault(){
	var devName = OSInfoDev();

	// 안드로이드
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
			callNativeFunction('getCameraAuth', 'multi', 'onSuccessGetCameraAuth', 'onErrorGetCameraAuth', false);
		});
	} else {
		$("input[type=file]").off("change");
		$("input[type=file]").on("change", function(){
			readURL(this);
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

				readURL(this);

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
		// if( !initFlag ){
		// 	$('#'+actingInput).closest('.filebox').trigger('click');
		// }
		// initFlag = true;
	}
}

//이미지 파일 섬네일 띄우기
function readURL(input) {

	if (input.files.length > 30) {
		alert("이미지 첨부는 최대 30개까지 가능합니다.")
		return false;
	}

	// No image 세팅
	for (let i = 0; i < 30; i++) {
		$('#img' + (i+1)).attr('src', "/images_theme/bg_thumb.png");
		$('#img' + (i+1)).css('width', 78);
		$('#img' + (i+1)).css('height', 120);
		$('#img' + (i+1)).closest(".imgBox").removeClass("be");
		$('#img' + (i+1)).closest(".thumbBox").find('input[name*=Flag]').val('false');
		$('#img' + (i+1)).closest(".thumbBox").find('input[name*=Url]').val('');
	}

	// 사진 여러개 썸네일 한번에 보여주기
	for (let i = 0; i < input.files.length; i++) {
		const currentImageUrl = URL.createObjectURL(input.files[i])
		$('#img' + (i+1)).attr('src', currentImageUrl);
		$('#img' + (i+1)).closest(".imgBox").addClass("be");
		$('#img' + (i+1)).closest(".thumbBox").find('input[name*=Flag]').val('true');
		$('#img' + (i+1)).closest(".thumbBox").find('input[name*=Url]').val(currentImageUrl);

		thumbnailZoom();
	}
}

// 썸네일
function thumbnailZoom() {
	$(".thumbBox .imgBox.be").off("click");
	$(".thumbBox .imgBox.be").on("click", function(){
		// history 추가
		history.pushState({}, "", "");

		// window scroll
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
var setTodayCallBack = function fn_VM1002setToday( objDate ) {
	var d = objDate.getDate();
	var m = objDate.getMonth()+1;
	var y = objDate.getFullYear();

	d<10 ? d='0'+d : d;
	m<10 ? m='0'+m : m;

	var ymd = y + '-' + m + '-' + d;

	$('#actionDate').val( ymd );
}

// 이미지 압축
function fn_imgCompress(){

	$('.thumbBox .imgBox img').each(function(i,ele){

		if( $(ele).closest('.thumbBox').find('input[name*=Flag]').val() == 'true' ){

			var oriImgObj = $(ele).get(0);
			var imgType = $(ele).attr('src').split(';')[0].split(':')[1];
			var width = oriImgObj.naturalWidth;
			var height = oriImgObj.naturalHeight;

			// 비율 변환
			var upWidth = 0;
			var upHeight = 0;

			// 기준 사이즈
			const anchorSize = 720;

			if( width >= height ) {
				upWidth = (width >= anchorSize ? anchorSize : width);
				upHeight = (width >= anchorSize ? Math.round(anchorSize * height/width) : height);
			} else {
				upHeight = (height >=anchorSize ? anchorSize : height);
				upWidth = (height >=anchorSize ? Math.round(anchorSize * width/height) : width);
			}

			var canvas = $('#tempCanvas')[0];
			canvas.width = upWidth;
			canvas.height = upHeight;

			canvas.getContext('2d').drawImage(oriImgObj, 0, 0, upWidth, upHeight);

			var cnvImg64 = canvas.toDataURL('image/jpeg', 70/100);
			var cnvImgObj = new Image();
			cnvImgObj.src = cnvImg64;

			// var gap = '[' + i + '] '
			// 	+ $(ele).attr('src').length + ' > ' + cnvImg64.length + ', '
			// 	+ width + ' x ' + height + ' > ' + upWidth + ' x ' + upHeight;
			// $(ele).attr('src', cnvImg64);

			$(ele).closest('.thumbBox').find('input[name*=Url]').val(cnvImg64);
		}
	})
}

// 주요내용 선택시
function fn_VM1902getMntCodeChange1() {

	$('#description1').on('change', function() {

		let des1 = $('#description1').val();

		let params = {
			desVal : des1
		};

		$.ajax({
			type: "POST",
			cache: false,
			url: '/VM1902GetMntDescList',
			data: params,
			dataType: 'json',
			success: function (rslt) {

				// 하위 카테고리 없는 코드들
				let notDes1ValList = ['', 'MAIN', 'CH', 'ETC'];

				if (notDes1ValList.includes(des1)) {
					$('#des2Box').hide();
					$('#des3Box').hide();
					$('#desCntBox').hide();

					// 안보이는 칸은 값 value 없음
					$('#description2').val("");
					$('#description3').val("");
					$('#descriptionCnt').val("");

					// 상세내용(품목)
				} else {
					$('#des2Box').show();
					$('#des3Box').hide();
					$('#desCntBox').hide();

					$('#description3').val("");
					$('#descriptionCnt').val("");

					// 주요 내용별로 하위 목록 보이기
					$('#description2').children().remove();

					$('#description2').append("<option value=''>선택</option>");

					for (let i = 0; i < rslt.length; i++) {
						$('#description2').append("<option value='"+ (rslt[i].code)+"'>" + rslt[i].commCdNm + "</option>")
					}

					// 냉장비 온도수집 오류 선택시 조치내용까지 나오기
					if (des1 == 'FR') {
						VM1902getMntDescFrList();
					}
				}
			}
		})
	})
}

// 처음에 주요내용에서 '냉장비 온도수집 오류' 선택시 조치내용 나오기
function VM1902getMntDescFrList() {

	$('#des3Box').show();

	if ( $('#description3').val() == "B209") {
		$('#desCntBox').show();
	}
}

// 조치내용 선택시
function fn_VM1902getMntCodeChange3() {

	$('#description3').on('change', function(){

		description3 = $('#description3').val();

		// 조치내용 - BT추가 선택시 수량 입력칸
		if (description3 == "B209") {
			$('#desCntBox').show();
			$('#descriptionCnt').val("");
		} else {
			$('#desCntBox').hide();
			$('#descriptionCnt').val("");
		}
	})
}

function fn_VM1904Save() {

	// 필수항목 유효성 검사, null 체크
	var reg = /2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-2])/;
	var regFlag = reg.test($('#actionDate').val());		// true면 통과
	var lenFlag = $('#actionDate').val().length == 10;	// true면 통과

	if( !regFlag || ( regFlag && !lenFlag ) ){
		alert('조치일을 다시 확인해주세요.\n(ex. 2018-11-11)');
		return;
	}

	if ( $('#inspector').val() == '' || $('#inspector').val() == null) {
		alert('점검자를 입력하세요.');
		return;
	}

	// 이미지 압축
	fn_imgCompress();

	let params = $('#inputForm').serialize();

	$('#viewLoadingDiv').show().fadeIn('fast');
	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$.ajax({
			type : "POST",
			cache : false,
			enctype: 'multipart/form-data',
			url : '/VM1904SaveMntFinish',
			data : params,
			// dataType:'json',
			success : function(response) {
				if (response.success) {
					alert('등록했습니다.');
					fn_VM1904Redirect();
				}
			},
			error: function() {
				alert('에러가 발생했습니다.');
			},
			complete:function(){
				$('#viewLoadingDiv').fadeOut();
			}
		});
	}, 0);
}

//뒤로가기 버튼
function fn_VM1904Redirect() {
	$('#returnFrom').attr("action", "/VM1901Redirect");
	$("#returnFrom").submit();
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