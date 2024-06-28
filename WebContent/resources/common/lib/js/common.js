function gfn_roopFunction(cycle, callback) {
	callback();
	return setInterval(callback, cycle);
}

function gfn_moveMenuItem(url){
	var form = document.form;
	
	form.action = url; 
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

function gfn_setStrCdAtSession(paramStrCd, paramStrNm){
	var strCd = paramStrCd;
	var strNm = paramStrNm;
	
	var paramDataset = new Object();
	paramDataset.strCd = strCd;
	paramDataset.strNm = strNm;
	
	$.ajax({
		type : "POST",
		data : JSON.stringify(paramDataset),
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0101Session',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				$('#hStrCd').val(strCd);
				$('#hStrNm').val(strNm);
				fn_refresh();
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

function gfn_setStrCdAtSessionNoRefresh(paramStrCd, paramStrNm, paramStrAddInfo){
	var strCd = paramStrCd;
	var strNm = paramStrNm;
	var strAddInfo = paramStrAddInfo;
	
	var paramDataset = new Object();
	paramDataset.strCd = strCd;
	paramDataset.strNm = strNm;
	paramDataset.strAddInfo = strAddInfo;
	
	$.ajax({
		type : "POST",
		data : JSON.stringify(paramDataset),
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0101Session',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				$('#hStrCd').val(strCd);
				$('#hStrNm').val(strNm);
				$('#hstrAddInfo').val(strAddInfo);
				
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

function gfn_getStrDataList(){
	var data = null;
	var map = null;
	
	$.ajax({
		type : "POST",
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0101List',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				data = returnJSON.items;
				map = returnJSON.data;
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
	
	var html = "";
	
	// 데이터 확인 후 처리로 수정
	if( map != null && typeof(map) != "undefined") {
	// map.authSp 값이 없으면 1로 대체
		if(map.authSp == null || map.authSp == undefined){
			map.authSp = '1';
		}
		if( map.authSp == "S" ){
			var dataSize = data.length;
			
	//		if( dataSize == 1 ){
			if( (map.strCd != "") && (map.strCd != null) ){
				// 복수점포 점주 점포 변경 시 점포 정보 삽입
				html += '<h2 id="strCombo" class="single" value="'+ map.strCd +'">'+ map.strNm + '</h2>';
	//			html += '<div class="sems_version"><span>'+ map.strAddInfo +'</span></div>'
				$('#strDataCombo').html(html);
				$('#hStrCd').val(map.strCd);
				$('#hStrNm').val(map.strNm);
				$('#hStrAddInfo').val(map.strAddInfo);
				
			}else{
				// 점주 최초 로그인 시 정보 삽입
				html += '<h2 id="strCombo" class="single" value="'+ data[0].strCd+'">'+data[0].strNm+'</h2>';
	//			html += '<div class="sems_version"><span>'+ data[0].strAddInfo +'</span></div>'
				$('#strDataCombo').html(html);
				$('#hStrCd').val(data[0].strCd);
				$('#hStrNm').val(data[0].strNm);
				$('#hStrAddInfo').val(data[0].strAddInfo);
			}
				
			// 복수점포 점주 로그인 시 헤더 점포선택 - 사용안함
	//		} else if( dataSize >= 2 ){
	//			
	//			html += '<div style="display:inline-block; position:realative;">';
	//			html += '<label for="strCombo"></label>';
	//			html += '<div class="sems_version" ><span id="strAddInfo">'+ data[0].strAddInfo +'</span></div>'
	//			html += '<select id="strCombo" title="점포선택" class="multiple">';
	//			
	//			if( (map.strCd != null) || (map.strCd != "") ){
	//				for(var i = 0 ; i < dataSize ; i++ ){
	//					if( map.strCd == data[i].strCd ){
	//						html += '<option value="'+ data[i].strCd +'" value2="'+ data[i].strAddInfo+'" selected="selected">'+ data[i].strNm +'</option>';
	//					} else {
	//						html += '<option value="'+ data[i].strCd +'">'+ data[i].strNm +'</option>';
	//					}
	//				}
	//			}
	//			
	//			html += '</select>';
	//			html += '</div>';
	//			$('#strDataCombo').html(html);
	//			
	//			$('#hStrCd').val($('#strCombo option:selected').val());
	//			$('#hStrNm').val($('#strCombo option:selected').text());
	//			//label값
	//			$("#strCombo").siblings('label').text($('#strCombo option:selected').text());
	//			
	//			$('#strCombo').change(function(){
	//				var strCd = $('#strCombo option:selected').val();
	//				var strNm = $('#strCombo option:selected').text();
	//				gfn_setStrCdAtSession(strCd,strNm);
	//				
	//				//label변경
	//				$("#strCombo").siblings('label').text(strNm);
	//			});
	//			
	//		}else{
	//			alert("점포정보 세팅시 오류가 발생했습니다.");
	//		}
		} else {
			if( (map.strCd != "") && (map.strCd != null) ){
				html += '<h2 id="strCombo" class="single" value="'+ map.strCd +'">'+ map.strNm + '</h2>';
	//			html += '<div class="sems_version"><span>'+ map.strAddInfo +'</span></div>'
				$('#strDataCombo').html(html);
				$('#hStrCd').val(map.strCd);
				$('#hStrNm').val(map.strNm);
				$('#hStrAddInfo').val(map.strAddInfo);
			}else{
				html += '<h2 id="strCombo" class="single" value=""></h2>';
				$('#strDataCombo').html(html);
				$('#hStrCd').val(null);
				$('#hStrNm').val(null);
				$('#hStrAddInfo').val(null);
			}
		}
	}
	
	var strCd = $('#hStrCd').val();
	var strNm = $('#hStrNm').val();
	var strAddInfo = $('#hStrAddInfo').val();
	gfn_setStrCdAtSessionNoRefresh(strCd, strNm, strAddInfo);
}

function gfn_strInfoPopup(paramPopupSp){
	
	$("#shop_info_popup").addClass("wrap_popup");
	
	var popupSp = paramPopupSp;
	
	var html = "";
	html = 
	'<div class="header_popup">'+
		'<h3 class="title_popup" id="pop_strNm"></h3>'+
		'<input type="hidden" value="" id="pop_strCd"/>'+
		'<a href="#" class="shop_info_popup_close" title="닫기"><img src="/images/btn_close_popup.png" alt="닫기" /></a>'+
	'</div>'+	
	'<div class="container_popup">'+
		'<div class="address_area">'+
			'<span class="address" id="pop_addr" ></span>'+
		'</div>'+
		// 2021.08.09 전화번호 항목 삭제
//		'<div class="telephone_area">'+
//			'<a href="">'+
//				'<span class="telephone" id="pop_telNo"></span>'+
//			'</a>'+
//		'</div>'+
		'<div class="storeDate_area">'+
			'<div class="date_area">'+
				'<p>점포 오픈일자 : <span id="pop_remsStart"></span></p>'+
				'<p>SEMS 구축일자 : <span id="pop_networkNotiDate"></span></p>'+
			'</div>'+
		'</div>'+
		'<div class="ownerType_area">'+
			'<div class="ownerType">' +
				'<span id="pop_ownerType"></span>'+
				'<p>SEMS 버전 : <span id="pop_boxVer"></span></p>'+
				'<p id="strClaimArea" style="display:none;" >부과금 산정방식 : <span id="pop_strClaim"></span></p>'+
			'</div>' +
		'</div>'+
	'</div>';
	
	if( popupSp == "S" ){
		html += 
			'<div class="btn_area_popup">'+
				'<a href="" class="btn_single" onclick="gfn_setAllStrCd(); return false;">'+
					'<span class="btn">점포데이터 불러오기</span>'+
				'</a>'+
			'</div>';
	}
	$('#shop_info_popup').html(html);
}

function gfn_setPopupData(strCd){
	//전화번호 정규식
	var regExp = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
	
	$('#pop_strCd').val("");
	$('#pop_strNm').text("");
	$('#pop_addr').text("");
	$('#pop_telNo').text("");
//	$('.telephone_area > a').attr('href','');
	
	$.ajax({
		type : "POST",
		data : JSON.stringify(strCd),
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0201Pop',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var map = returnJSON.data;
				
				if( map.noStr == "Y" ){
					$('#pop_strNm').text("점포 미선택");
				}else{
					$('#pop_strCd').val(map.strCd);
					$('#pop_strNm').text(map.strNm);
					$('#pop_addr').text(map.addr);
					if(map.addr == "내용없음"){
						$('#pop_addr').addClass("null");
					}
//					$('#pop_telNo').text(map.telNo);
//					if(regExp.test(map.telNo)) {
//						$('.telephone_area > a').attr('href','tel:' + map.telNo);
//					} else {
//					}
//					if(map.telNo == "내용없음"){
//						$('.telephone_area > a').addClass("null").attr('href','tel:');
//					}
					
					$("#pop_remsStart").text(map.remsStartDt);
					$("#pop_networkNotiDate").text(map.networkNotiDate);
					$("#pop_ownerType").text(map.ownerType);
					$("#pop_boxVer").text(map.boxVer);
					
					if(map.elecKind == 'H'){
						$("#strClaimArea").show();
						$("#pop_strClaim").text('고압' + (map.claimType ? ' | ' + (map.claimType == 'T' ? '통합청구' : '건물청구') : ''));
					}
				}
				
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

function gfn_getAlarmCnt(){
	var alaramCnt = 0;
	
	$.ajax({
		type : "POST",
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0201AlCnt',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alaramCnt = returnJSON.data;
				if(alaramCnt > 0) {
					$("#alarmNewImg").show();
				} else {
					$("#alarmNewImg").hide();
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
	
	return alaramCnt;
}

// 간판 알람 개수 조회
function gfn_getSignAlarmCnt() {
	var alaramCnt = 0;

	$.ajax({
		type : "POST",
		dataType : "JSON",
		async:false,
		contentType : "application/json; charset=UTF-8",
		url : '/CM0201SignAlCnt',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alaramCnt = returnJSON.data;
				if(alaramCnt > 0) {
					$("#alarmNewImg").show();
				} else {
					$("#alarmNewImg").hide();
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});

	return alaramCnt;
}


function gfn_setAllStrCd(){
	var strCd = $('#pop_strCd').val();
	var strNm = $('#pop_strNm').text();
	var strAddInfo = $('#pop_strAddInfo').val();
	gfn_setStrCdAtSessionNoRefresh(strCd, strNm, strAddInfo);
	fn_getStoreInfo();
}

// 문자열 체크
function gfn_checkStringNull(str, defaultStr) {
	var rntStr = "";
	if(defaultStr == null) {
		defaultStr = "";
	}
	if(str == null || str == undefined || str == "" || str == "N/A") {
		rntStr = defaultStr;
	} else {
		rntStr = str;
	}
	return rntStr;
}

function gfn_checkOnload(){
	var value = $('#hStrCd').val();
	var flag = true;
	if( value == null || value == "" || value == undefined ){
		$('#viewLoadingDiv').fadeOut();
		alert("점포조회를 통해 점포를 선택해주세요.");
		flag = false;
	}
	return flag
}

/*
// 현재 시간 가져오기 - 스크립트
function gfn_getToday( callBack ){
	var today = new Date();
	callBack( today );
}
*/

// 현재 시간 가져오기 - DB
function gfn_getToday( callBack ) {
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/text; charset=UTF-8",
		url : '/VM0101Today',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				if(returnJSON.data != null) {
					var data = returnJSON.data;
					var objDate = new Date( data.split(' ')[0] + ' ' + data.split(' ')[1] );
					
					// 콜백 함수 실행
					callBack( objDate, data.split(' ')[2] );
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

// 점포 조회
function gfn_storeSearch( fromView ){
	var ref = location.href;
	
	var paramDataset = new Object();
	paramDataset.ref = ref;
	
	// 점포 선택 후 이동할 페이지
	paramDataset.fromView = fromView;
	
	var paramJson = JSON.stringify(paramDataset);
	
	$("#paramData").val(paramJson);
	
	var form = document.form;
	form.action = "/CM0401";
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}

// 최상단으로 이동
function gfn_goToTop() {
	$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
}

//천단위 구분자 추가
function gfn_numberWithCommas(x) {
	if(x!=undefined){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");		
	}else{
		return x;
	}
}

// YYYYMMDD -> YYYY-MM-DD
function gfn_changeYyyymmdd(date){

	let newDate = date.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
	return newDate;

}

jQuery.fn.serializeObject = function() {
	var obj = null;
	try {
		if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
			var arr = this.serializeArray();
			if (arr) {
				obj = {};
				jQuery.each(arr, function() {
					obj[this.name] = this.value;
				});
			}
		}
	} catch (e) {
		alert(e.message);
	} finally {
	}
	return obj;
};

//앱 포그라운드 상태 푸시 수신시 알람페이지 이동 
function getForegroundPushData(osType, appVersion, pushMessage, pushNo){//푸시 번호로 타입 구분?
	$('#alarmNewImg').show();//fn_VM0101setPushInfo
	// 앱 신버전
	if((osType=="AND" && parseFloat(appVersion)>2.8) || (osType=="IOS" && parseFloat(appVersion)>2.3)){
		//경영주 권한
		if(authId==4 && authSp=='S'){
			// DR 알람
			if(pushMessage.startsWith("DR")){
				alert(pushMessage);
			// 공지 알람
			}else if(pushMessage.includes('공지')){
				window.location.href = "/menu/VM0101";
			// 냉장비 알람
			}else if(pushMessage.includes('[')){
				let title = pushMessage.split(']')[0].replaceAll('[', '')+' 냉장비 온도알람';
				let message = pushMessage.split(']')[1]
				Swal.fire({
					title:'<span style="font-weight:bold;font-size:20px;">'+title+'</span>',
					text: message,
					confirmButtonText: '확인',
					focusConfirm: false,
					showCancelButton: true,
					cancelButtonText: '취소',
					confirmButtonColor:'#ffffff',
					cancelButtonColor:'#ffffff',
					focusCancel: true,
					reverseButtons: true,
					didOpen: () => {
						// 팝업이 열릴 때 선택된 상태 제거
						$('.swal2-confirm').blur(); 
						$('.swal2-cancel').blur(); 
					}
				}).then((result)=>{	
					if(result.isConfirmed){
						window.location.href = "/menu/VM0703?pushNo="+pushNo;
					}
				})
			}else{//예외처리
				alert(pushMessage);
			}
		// 공지 알람은 무시(alert는 띄울까?//여기서 대시보드 이동이 안됨)
		}else if(pushMessage.includes('공지')){//'공지' 문자열은 대체 가능
			window.location.href = "/menu/VM0101";
			//return;
		//관리자 냉장비알람(경영주랑 같은알람)
		}else if(authId=='2' && pushMessage.includes('[')){
			let title = pushMessage.split(']')[0].replaceAll('[', '')+' 냉장비 온도알람';
			let message = pushMessage.split(']')[1]
			Swal.fire({
				title: title,
				text: message,
				confirmButtonText: '확인',
				confirmButtonColor: '#ffffff',
				didOpen: () => {
					$('.swal2-confirm').blur(); 
				}
			})
		// 경영주알람 외 모든 알람
		}else{
			alert(pushMessage);
		}
	}
}

function validatePw(pw){
	// 길이 확인
	const isValidLength = /^.{8,15}$/.test(pw);
	// 영문자, 숫자, 특수문자 중 최소 두 가지 포함 여부 확인
	const hasTwoTypes = /(?=.*[A-Za-z])(?=.*[\d])|(?=.*[A-Za-z])(?=.*[^A-Za-z\d])|(?=.*[\d])(?=.*[^A-Za-z\d])/.test(pw);
	// 한글 포함 x
	const hasNoKorean = !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(pw);

	return isValidLength && hasTwoTypes && hasNoKorean;
}
