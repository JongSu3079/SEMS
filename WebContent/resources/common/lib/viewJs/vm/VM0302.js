// 전역변수 
var gwApResult0302 = false;
var parentPage0302 = '';
var gwApSetFlag = 0;

// 스크립트 시작 
// 새로고침
function fn_VM0302refresh( parent ){
	gwApSetFlag = 0;
	if( parent == 'VM0101' ){
		parentPage0302 = parent;
		$('#viewLoadingDiv').show();
	}
	$("#powerMode").cmToggle(1, function() {
		fn_VM0301changePowerOnOff();
	});
	$("#operMode").cmToggle(2, function() {
		fn_VM0301changeOperationMode('r');
	});
	fn_VM0301controlYn("N");
	fn_VM0301getGwApStat();
}

// 냉난방 설정 조회 - on/off
function fn_VM0301getGwApStat() {
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0301GetGw',
		dataType : "JSON",
		timeout : 10000,
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
		},
		error : function() {
			gwApSetFlag = 2;
		},
		complete:function(){
			// 통신 성공/실패에 따라 토글 활성화/비활성화
			gwApSetFlag == 1 ? fn_VM0301controlYn("Y") : fn_VM0301controlYn("N");
			
			// 로딩창 없애기
			if( parentPage0302 == 'VM0101' ){
				$('#viewLoadingDiv').fadeOut();
				if( gwApSetFlag == 2 ){
					alert( '(오류발생)다시 시도해주세요.' );
				}
			} else {
				fn_VM0301SetDataComplete();
			}
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				gwApSetFlag = 1;
				
				var hacCtrInfo = returnJSON.data;
				var gwApStat = hacCtrInfo.gwApStat;
				
				// gwId
				$("#gwId").val(hacCtrInfo.gwId);
				
				// 권고 온도
				$("#tempVal").val(hacCtrInfo.recommTemp);
				
				//냉난방 설정
				$("#powerMode").cmToggle( gwApStat.haconOnOff1 ? 0 : 1 , function() {
					fn_VM0301changePowerOnOff();
				});
				$('#onOffVal').val( gwApStat.haconOnOff1 ? 1 : 0 );
				gwApResult0302 = true;
				fn_VM0301controlYn("Y");
			} else {
				// 제어 불가능
				gwApResult0302 = false;
				fn_VM0301controlYn("N");
				gwApSetFlag = 2;
			}
		}
	});
}

// 냉난방 설정 저장 - jobMode : p(전원모드), t(온도모드)
function fn_VM0301setGwApStat() {
	var gwId = $("#gwId").val();
	var onOffVal = $("#onOffVal").val();	//1:켜짐, 0:꺼짐
	var operMode = $("#operVal").val();		//c:냉방, h:난방
	var confVal = $("#tempVal").val();		//온도값
	
	if(!gwApResult0302 || gwId == "") {
		alert("(통신실패)화면을 다시 조회해주세요.");
		return;
	}
	
	if(operMode == "") {
		alert("냉방/난방을 선택해주세요.");
		return;
	}
	
	if(confVal < 18 || confVal > 30) {
		alert("온도는 최소 18도 이상, 최대 30도 이하 입니다.");
		confVal.focus();
		return;
	}
	
	var gwApInfo = {
		"gwId"		: gwId,
		"jobMode"	: "",
		"onOffVal"	: onOffVal,
		"operMode"	: operMode,
		"confVal"	: confVal
	};
	
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0301SetGw',
		timeout : 10000,
		data : JSON.stringify(gwApInfo),
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert("냉난방 설정 저장을 완료하였습니다.");
				//냉난방은 제어 후 바로 상태를 알 수 없으므로 재조회 하지 않음!
			} else {
				alert(returnJSON.msg);
			}
		}
	});
}

// 냉난방 On/Off 토글
function fn_VM0301changePowerOnOff(){
	if( $('#powerMode').children().eq(0).hasClass('on') ){
		$("#onOffVal").val("1");
	} else {
		$("#onOffVal").val("0");
	}
}

// 냉방/난방 토글 
function fn_VM0301changeOperationMode( reset ){
	// 초기화
	if( reset == 'r' ){
		$("#operVal").val("");
		$("#operVal").val("");
	} else {
		// 냉방
		if( $('#operMode').children().eq(0).hasClass('on') ){
			$("#operVal").val("C");
		// 난방
		} else {
			$("#operVal").val("H");
		}
	}
}

// 온도 설정 : P(증가), M(감소)
function fn_VM0301changeTempVal(mode) {
	var tempVal = $("#tempVal").val();
	if(mode =="P") {
		if(tempVal < 30) {
			$("#tempVal").val(++tempVal);
		}
	} else {
		if(tempVal > 18) {
			$("#tempVal").val(--tempVal);
		}
	}
}

// 통신 결과에 따른 제어 가능 여부 : Y(제어가능), N(제어불가능)
function fn_VM0301controlYn(val){
	if(val =="Y") {
		$("#operMode").cmToggle(2, function() {
			fn_VM0301changeOperationMode();
		});
	} else {
		$("#powerMode, #operMode").cmToggle(-1, function() {
		});
	}
}