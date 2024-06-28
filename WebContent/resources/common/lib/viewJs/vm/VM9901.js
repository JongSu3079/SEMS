// 스크립트 시작 
window.onpageshow = function(event) {
	// 점포 등록 기본 정보 가져오기
	fn_VM9901searchInfo();
	
	// 날짜 세팅
	gfn_getToday( setTodayCallBack );
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

// 현재 시간 표시 콜백 함수
var setTodayCallBack = function fn_VM9901setToday( objDate ){
	var d = objDate.getDate();
	var m = objDate.getMonth()+1;
	var y = objDate.getFullYear();
	
	d<10 ? d='0'+d : d;
	m<10 ? m='0'+m : m;
	
	var ymd = y + '-' + m + '-' + d;
	
	$('#srcReadyDt, #srcStartDt').val( ymd );
}

// 점포 등록 기본 정보 가져오기
function fn_VM9901searchInfo(){
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		beforeSend:function(){ 
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){ 
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/searchInfo',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var items = returnJSON.items;
				
				var html = '';
				html += '<option value="">선택</option>';
				for( var i=0; i<items[0].length; i++ ){
					html += '<option value="' + items[0][i].code + '">' + items[0][i].commCdNm +'</option>';
				}
				$('#srcSido').html( html );
				
				var html2 = '';
				html2 += '<option value="">선택</option>';
				for( var i=0; i<items[1].length; i++ ){
					html2 += '<option value="' + items[1][i].value + '">' + items[1][i].name +'</option>';
				}
				$('#srcElec').html( html2 );
			}
			fn_VM9901setParams();
		}
	});
}

// 기상 지역 검색 페이지에서 온 경우 입력된 값 세팅
function fn_VM9901setParams(){
	if( paramJson.srcSet == 'Y' ){
		$('#srcStrNm').val(			paramJson.srcStrNm );
		$('#srcNewYn').val(			paramJson.srcNewYn );
		$('#srcSido').val(			paramJson.srcSido );
		$('#srcAddr').val(			paramJson.srcAddr );
		$('#srcLocalAreaNm').val(	paramJson.srcAreaNm );
		$('#srcLocalAreaCd').val(	paramJson.srcAreaCd );
		$('#srcElec').val(			paramJson.srcElec );
		$('#srcReadyDt').val(		paramJson.srcReadyDt );
		$('#srcStartDt').val(		paramJson.srcStartDt );
		$('#strType').val(			paramJson.strType );
	}
}

// object 형식으로 시리얼라이즈
$.fn.serializeObject = function(){
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

// 입력값 물고 기상지역 검색 이동
$('#searchLocalArea').on('click', function(){
	var params = JSON.stringify($("#inputForm").serializeObject());
	
	$("#goLocalAreaParamData").val(params);
	var form = document.goLocalAreaForm;
	form.action = '/VM9902';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
});

// 저장
function fn_VM9901saveVM9901(){
	if( $('#srcStrNm').val() == ''){
		alert('점포명을 입력하세요.');
		return;
	}
	if( $('#strType').val() == ''){
		alert('점포종류를 선택하세요.');
		return;
	}
	if( $('#srcSido').val() == ''){
		alert('간략주소의 지역을 선택하세요.');
		return;
	}
	if( $('#srcLocalAreaNm').val() == ''){
		alert('기상 지역을 선택하세요.');
		return;
	}
	if( $('#srcElec').val() == ''){
		alert('설치업체를 선택하세요');
		return;
	}
	
	var reg = /2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-2])/;
	var regFlag = reg.test( $('#srcReadyDt').val() ) && reg.test( $('#srcStartDt').val() );		// true면 통과
	var lenFlag = $('#srcReadyDt').val().length == 10 && $('#srcStartDt').val().length == 10;	// true면 통과
	if( !regFlag || ( regFlag && !lenFlag ) ){
		alert('착공일자, 준공일자를 다시 확인해주세요.\n(ex)2018-11-11)');
		return;
	}
	
	// 파라미터
	var strInfo = $("#inputForm").serializeObject();
	
	// 이미 등록한 경우 수정
	if( $('#savedStrCd').val() != '' ){
		var updateYn = confirm('이미 등록한 점포입니다.\n내용을 수정하시겠습니까?');
		if( updateYn ){
			$.ajax({
				type : 'POST',
				dataType : 'JSON',
				data : JSON.stringify(strInfo),
				beforeSend:function(){ 
					$('#viewLoadingDiv').show().fadeIn('fast');
				},
				complete:function(){ 
					$('#viewLoadingDiv').fadeOut();
				},
				contentType : "application/json; charset=UTF-8",
				url : '/VM9901Update',
				error : function() {
					alert("(오류발생)다시 시도해주세요.");
				},
				success : function(returnJSON) {
					if (returnJSON.success) {
						alert("점포 정보 수정에 성공했습니다.");
					} else {
						alert("(등록실패)다시 시도해주세요.");
					}
				}
			});
		}
	// 점포 등록
	} else {
		$.ajax({
			type : 'POST',
			dataType : 'JSON',
			data : JSON.stringify(strInfo),
			beforeSend:function(){ 
				$('#viewLoadingDiv').show().fadeIn('fast');
			},
			complete:function(){ 
				$('#viewLoadingDiv').fadeOut();
			},
			contentType : "application/json; charset=UTF-8",
			url : '/VM9901Save',
			error : function() {
				alert("(오류발생)다시 시도해주세요.");
			},
			success : function(returnJSON) {
				if (returnJSON.success) {
					alert("점포 등록에 성공했습니다.");
					$('#savedStrCd').val(returnJSON.data);
				} else {
					if( returnJSON.msg == 'dup' ){
						alert( '이미 등록된 점포입니다. 점포명을 다시 확인해주세요.' );
					} else {
						alert("(등록실패)다시 시도해주세요.");
					}
				}
			}
		});
	}
}