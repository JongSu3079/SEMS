// 전역변수 
var gwApResult0602 = false;
var parentPage0602 = '';
var signSetFlag = 0;
var signMoffVal = 2; // (0: 항상 켜짐, 1: 매 시각 2분마다 꺼짐, 2: 설정 미조회)

// 스크립트 시작 
//새로고침
function fn_VM0602refresh( parent ){
	signSetFlag = 0;
	if( parent == 'VM0101' ){
		parentPage0602 = parent;
		$('#viewLoadingDiv').show();
	}
	// 간판 on/off 토글
	$("#signTg").cmToggle(1, function() {
		fn_VM0601changeSingOnOff();
	});
	fn_VM0601controlYn("N");
	fn_VM0601GetGwData();
}

//간판 상태 조회
function fn_VM0601GetGwData(){
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0601GetSignGw',
		dataType : "JSON",
		timeout : 20000,
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
		},
		error : function() {
			signSetFlag = 2;
		},
		complete:function(){
			// 통신 성공/실패에 따라 토글 활성화/비활성화
			signSetFlag == 1 ? fn_VM0601controlYn("Y") : fn_VM0601controlYn("N");
			
			// 로딩창 없애기
			if( parentPage0602 == 'VM0101' ){
				$('#viewLoadingDiv').fadeOut();
				if( signSetFlag == 2){
					alert( '(오류발생)다시 시도해주세요.' );
				}
			} else {
				fn_VM0601SetDataComplete();
			}
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				signSetFlag = 1;
				
				var signOnOffInfo = returnJSON.data;
				var gwApStat = signOnOffInfo.gwApStat;
				signMoffVal = signOnOffInfo.signMoffVal;
				
				// gwId
				$("#gwId").val(returnJSON.data.gwId);
				
				// 간판 ON/OFF 설정
				$("#signTg").cmToggle(gwApStat.signOnOff == 1 ? 0 : 1 , function() {
					fn_VM0601changeSingOnOff();
				});
				
				// 대시보드에서 간판 컨트롤하고 대시보드 간판 상태 업데이트
				if(parentPage0602 == 'VM0101'){
					// 간판 상태 설정(대시보드)
					gwApStat.signOnOff == 0 ? $("#SignSt").attr("class","off") : $("#SignSt").attr("class","on");
					$("#SignSt").html(gfn_checkStringNull(gwApStat.signOnOffText, "-"));
				}
				
				gwApResult0602 = true;
				fn_VM0601controlYn("Y");
			} else {
				// 제어불가능
				gwApResult0602 = false;
				fn_VM0601controlYn("N");
				signSetFlag = 2;
			}
		}
	});
}

//간판 on/off 설정
function fn_VM0601saveSignOnoff() {
	var gwId = $("#gwId").val();
	var onOffVal = $("#signCtrlVal").val(); //1:켜짐, 0:꺼짐

	// 매 시각 2분마다 꺼짐인 경우 켜질때 confirm 메시지 표시
	if (onOffVal == 1 && signMoffVal == 1) {
		const onOffYn = confirm("2시간 후에 간판이 꺼집니다. 간판을 켜시겠습니까? \n(일몰시에는 유지)");
		if (!onOffYn) {
			return;
		}
	}
	
	if(!gwApResult0602 || gwId == "") {
		alert("(통신실패)화면을 다시 조회해주세요.");
		$('#viewLoadingDiv').fadeOut();
		return;
	}
	
	var gwApInfo = {
		"gwId"		:	gwId,
		"onOffVal"	:	onOffVal,
	};
	
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM0601SaveSign',
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
//			fn_VM0601getSignOnoff();
			fn_VM0601GetGwData();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				alert(returnJSON.msg);
				// 새로 고침
				if( parentPage0602 == 'VM0101' ){
					fn_VM0602refresh( 'VM0101' );
				} else {
					fn_VM0601refresh();
				}
			} else {
				alert(returnJSON.msg);
			}
		}
	});
}

// 간판 설정 클릭시 변경 : 0(간판 끄기), 1(간판 켜기)
function fn_VM0601changeSingOnOff(){
	if( $('#signTg').children().eq(0).hasClass('on') ){
		$("#signCtrlVal").val('1');
	} else {
		$("#signCtrlVal").val('0');
	}

	$("#signCtrlVal").val();
}

// 통신 결과에 따른 제어 가능 여부 : Y(제어가능), N(제어불가능)
function fn_VM0601controlYn(val){
	if(val =="N") {
		$("#signTg").cmToggle(-1, function() {
		});
	}
}