<%@page import="java.util.HashMap"%>
<%@page import="org.springframework.ui.ModelMap"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 유지보수 상세</title>
	<%@ include file="../include/commonHead.jsp"%>
</head>
<body>
	<div id="wrap">
		<!-- 공통 -->
		<%@ include file="/pub/common/vm/VM1002.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
		var g_scrollTop = 0;
		
		// history
		function popState() {
			$("#thumbWhole").trigger("click");
		}
		
		// 1. init
		$(window).load(function () { 
			window.onpopstate = popState; 
	
			getOSInfo(); 
		});
		
		// 2. check device
		function getOSInfo() { 
			var devName = OSInfoDev(); 
		
			if(devName.indexOf("Android") != -1) {
				
				// android - 파일첨부가 바로 되지 않는 문제로 처음 파일 첨부버튼은 비활성화
				$(".thumbBox .fileBox input[type=file]").css('pointer-events', 'none');
				$(".thumbBox .fileBox input[type=file]").off("click");
				$(".thumbBox .fileBox input[type=file]").on("click", function(event){
					event.preventDefault();
					event.stopPropagation();
				});
				
				// 점포사진 리스트(비활성화)
				$(".thumbBox .fileBox").off("click");
				$(".thumbBox .fileBox").on("click", function() {
					
					var input_url = $(this).find("input[name=url]");//var input_file = $(this).find("input[type=file]");
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
					$(".comboBox input[type=file]").val("");
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
				
			}
			else {// other device
				
				$("input[type=file]").off("change");
				$("input[type=file]").on("change", function(){
					
					var thumbnail = $(this).closest("td").find("img");
					readURL(this, thumbnail);
				});
			}
		}
		
		// 3. load input file
		function readURL(input, thumbnail) {
			
			if (input.files && input.files[0]) {
				var reader = new FileReader();
		
				reader.onload = function (e) {
					$(thumbnail).attr('src', e.target.result);
					$(thumbnail).parents("td").find(".fileBox input[name=url]").val(e.target.result);
					$(thumbnail).closest(".imgBox").addClass("be");
					
					thumbnailZoom();
				}
		
				reader.readAsDataURL(input.files[0]);
			}
		}
		
		// 3-1. view thumbnail
		function thumbnailZoom() {
			$(".thumbBox .imgBox.be").off("click");
			$(".thumbBox .imgBox.be").on("click", function(){
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
					$("#thumbWhole img").attr('width', $(window).height());
					$("#thumbWhole img").attr('height', $(window).width());
				}
				else {
					// vertical
					$("#thumbWhole img").attr('width', $(window).width());
					$("#thumbWhole img").attr('height', $(window).height());
					
				}
				
				// thumbnail apply
				$("#thumbWhole img").attr('src', base64);
				$("#thumbWhole").width($(window).width());
				$("#thumbWhole").height($(window).height());
				$("#wrap").hide();
				
				// thumbnail whole mode
				$("#thumbWhole").off("click");
				$("#thumbWhole").on("click", function(){
					$("#wrap").show();
					$(this).remove();
					$(window).scrollTop(g_scrollTop);
				});
			});
		}
	</script>
	
	<script type="text/javascript"> 
	// OS 버전 보기 
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
	</script>
	
	<script>
	$(function() { // 20-03-26 개발에 미추가 된 스크립트, html에서 img 빼고 css로 관리, 추후에 논의하여 개발에 적용
		$("img").on("load", function() {
			$(this).closest(".imgBox").removeClass("error");
		}).on("error", function() {
			$(this).closest(".imgBox").addClass("error");
		});
	});
	</script> 
</body>
</html>