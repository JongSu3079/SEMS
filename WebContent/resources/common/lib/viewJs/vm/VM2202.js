// 스크립트 시작 
window.onpageshow = function(event) {
	
	setForm();
	$('#viewLoadingDiv').fadeOut();
	
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
//	
//	// 냉장비 알람 개수 가져오기
	gfn_getAlarmCnt();
//
//	// 간판 알람 개수 가져오기
	gfn_getSignAlarmCnt();
//
//	// 점포 상세 정보 팝업
//	fn_strInfoPopup();
//	
//	// SIGN_OPER 변화 감지
//	fn_VM0601SignOperSetter();
//	
//	// 새로고침
//	if(gfn_checkOnload()){
//		fn_VM0601refresh();
//	}
	
};

function setForm(){
	$("#groupName").text(grpNm);
	$("#groupCount").text(String(count)+'개');
	if(basicYn == 'N'){
		$("#basicYn").prop('checked', true);
		$("#groupSetting").show();
	}else{
		$("#basicYn").prop('checked', false);
		$("#groupSetting").hide();
	}
	let strCd = $("#strCd").val();
	let hubId = $("#hubId").val();
	let grpId = $("#grpId").val();
	
	let param = new Object();
	param.strCd = strCd;
	param.hubId = hubId;
	param.grpId = grpId;
	$.ajax({
		url:'/searchDimmGrpPolicy',
		type:'POST',
		cache:false,
		data:param,
		dataType:'json',
		success:function(data){
			if(data.length>0){
				let sliderContent = '';
//				$('#basic_y').prop('checked', true);
				for(let p = 0;p<data.length;p++){
					let row = data[p] ;
					sliderContent += '<tr>';
					if(p==0){
						sliderContent += '<th colspan="2">주간</th></tr><tr>';
					}else if(p==data.length-1){
						sliderContent += '<th colspan="2">야간</th></tr><tr>';
					}
					if(row.weather!=undefined){
						sliderContent += '<th >'+row.weather+'</th>';
					}else{
						sliderContent += '<td></td>';
					}
					sliderContent += '<td scope="row">';
					sliderContent += '	<div class="slider-container" style="display: flex;lign-items: center;margin:10px;">';
					sliderContent += '		<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">';
					sliderContent += '		<input type="range" min="0" max="100" value="'+row.value+'" step="10" class="slider" id="myRange_'+row.weatherCd+'" >';
					sliderContent += '		<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">';
					sliderContent += '	</div>';
					sliderContent += '	</td>';
					sliderContent += '</tr>';
					if(p==data.length-1 || p==data.length-2){
						sliderContent += '<tr><td></td><td>';
						sliderContent += '<div class="slider-container" style="display: flex;align-items: center;">';
						sliderContent += '	<datalist id="values">';
						sliderContent += '<option value="0" label="0%"></option>';
						sliderContent += '<option value="10" label="10%"></option>';
						sliderContent += '<option value="20" label="20%"></option>';
						sliderContent += '<option value="30" label="30%"></option>';
						sliderContent += '<option value="40" label="40%"></option>';
						sliderContent += '<option value="50" label="50%"></option>';
						sliderContent += '<option value="60" label="60%"></option>';
						sliderContent += '<option value="70" label="70%"></option>';
						sliderContent += '<option value="80" label="80%"></option>';
						sliderContent += '<option value="90" label="90%"></option>';
						sliderContent += '<option value="100" label="100%"></option>';
						sliderContent += '</datalist>';	
						sliderContent += '</div>';
						sliderContent += '</td>';
						sliderContent += '</tr>';
					}
					
					
				}
				
				$("#grpPolicy").html(sliderContent);
				$("#grpPolicy").show();
//				$('#activeYn').prop('checked', true);
				
			}else{
//				$('#activeYn').prop('checked', false);
				$("#grpPolicy").hide();
			}
		},
		error:function(result){
			alert("에러가 발생했습니다.");
		}
	});
}

function changeSettings(){
	if ($('#basicYn').is(':checked')) {
		$("#groupSetting").show();
		$("#grpPolicy").show();
	} else {
		$("#groupSetting").hide();
		$("#grpPolicy").hide();
	}
}
function fn_VM2201Redirect() {
	$('#returnFrom').attr("action", "/VM2201Redirect");
	$("#returnFrom").submit();
}

//function movePageVM2202(){
//	window.location.href='/VM2202'
//}
//
//// 헤더에 점포 정보 세팅
function fn_setHeaderCombo(){
	/** 
	 * 필수 태그
	 * <div class="shop_name" id="strDataCombo" ></div>
	 * <input type="hidden" id="hStrCd"/>
	 * <input type="hidden" id="hStrNm"/>
	 */
	gfn_getStrDataList();
}

// 점포 상세 정보 팝업
function fn_strInfoPopup(){
	/** 
	 * 필수 태그
	 * <div id="shop_info_popup">
	 * param : V(정보 열람)
	 */
	gfn_strInfoPopup("V");
	$("#shop_info_popup").popup();
}
//
////점포 상세 정보 팝업 세팅
//function fn_setPopupData(){
//	var strCd = $('#hStrCd').val();
//	gfn_setPopupData(strCd);
//}
//
//// 새로고침
//function fn_VM0601refresh() {
//	timeSetFalg = 0;
//	// 로딩 바 표시
//	$('#viewLoadingDiv').show().fadeIn('fast');
//	
//	// 간판 상태 조회
//	fn_VM0602refresh();
//	
//	// 일출몰/간판 시간 정보 조회
//	fn_VM0601GetDbData();
//}
function fn_VM2202SaveGrpDimmSet(){
	if(confirm('해당 그룹에 디밍 정책을 적용합니다. 적용 하시겠습니까?')){
		let strCd = $("#strCd").val();
		let hubId = $("#hubId").val();
		let grpId = $("#grpId").val();
		
		let param = new Object();
		
		param.strCd = strCd;
		param.hubId = hubId;
		param.grpId = grpId;
		
		if($("#basicYn").is(':checked')){
			param.basicYn = 'N';
			let valueList = [];
			for(let w=1;w<100;w++){
				if($("#myRange_"+w).val()!=undefined){
					let inner = {};
					inner.weatherCd = w;
					inner.value = $("#myRange_"+w).val();
					valueList.push(inner);
				}
			}
			param.values = valueList;
		}else{
			param.basicYn = 'Y';
		}
		$.ajax({
			type : "POST",
			cache : false,
			url : "/VM2202SaveGrpDimm",
			data : JSON.stringify(param),
			dataType : "JSON",
			contentType : "application/json; charset=UTF-8",
			beforeSend:function(){
				$('#viewLoadingDiv').show().fadeIn('fast');
			},
			complete:function(){
				$('#viewLoadingDiv').fadeOut();
			},
			success : function(returnJSON) {
				alert('디밍 제어가 적용되었습니다.');
			}, 
			error:function(e){
				Rollbar.info(e);
			}
		});
	}
}
//
