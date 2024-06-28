// 전역 변수
var timeSetFalg = 0;

// 스크립트 시작 
window.onpageshow = function(event) {
	fn_setHeaderCombo();

	if(gfn_checkOnload()){
		fn_VM2201refresh();
		setForm();
	}
	$('#viewLoadingDiv').fadeOut();
	
};

function checkYn(arr){
	return arr.some(item => item.useYn === 'Y');
}
function filterYn(arr) {
    return arr.filter(item => item.useYn === 'Y');
}
function setForm(){
	let strCd = $("#hStrCd").val();
	if(strCd == undefined){
		return;
	}
	let param = new Object();
	//ajax 
	$.ajax({
		url:'/searchDimmStrPolicy',
		type:'POST',
		cache:false,
		data:{strCd:strCd},
		dataType:'json',
		success:function(data){
			
			if(data.length>0){
				//돌면서 useYn y확인
				if(checkYn(data)){
					data=filterYn(data);
					let sliderContent = '';
					$('#basic_y').prop('checked', true);
					for(let p = 0;p<data.length;p++){
						let row = data[p] ;
							
						sliderContent += '<tr>';
						if(p==0){
							sliderContent += '<th colspan="2">주간</th></tr><tr>';
						}else if(p==data.length-1){
							sliderContent += '<th colspan="2">야간</th></tr><tr>';
						}
						if(row.weather != undefined){
							sliderContent += '<th >'+row.weather+'</th>';						
						}else{
							sliderContent += '<td></td>';
						}
						sliderContent += '<td scope="row">';
						sliderContent += '	<div class="slider-container" style="display: flex;lign-items: center;margin:10px;">';
						sliderContent += '		<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">';
						sliderContent += '		<input type="range" min="0" max="100" value="'+row.value+'" step="10" class="slider" id="myRange_'+row.weatherCd+'" onchange="changeValue('+row.weatherCd+')">';
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
					
					$("#strSettings").html(sliderContent);
					$("#strSettings").show();
					$('#activeYn').prop('checked', true);
					
				}else{
					$('#basic_y').prop('checked', false);
					$("#strSettings").hide();
				}
				
			}else{
				$('#activeYn').prop('checked', true);
				//일괄설정 가져오기
				$.ajax({
					url:'/searchDimmSystemPolicy',
					type:'POST',
					cache:false,
					dataType:'json',
					data:{strCd:strCd},
					success:function(data){
						//돌면서 useYn y확인
						if(data.length>0){
							if(data[0].targetYn=='Y'){
								let sliderContent = '';
								for(let p = 0;p<data.length;p++){
									let row = data[p] ;
									sliderContent += '<tr>';
									if(p==0){
										sliderContent += '<th colspan="2">주간</th></tr><tr>';
									}else if(row.weather==undefined){
										sliderContent += '<th colspan="2">야간</th></tr><tr>';
									}
									if(row.weather != undefined){
										sliderContent += '<th >'+row.weather+'</th>';
									}else{
										sliderContent += '<td></td>';
									}
									sliderContent += '<td scope="row">';
									sliderContent += '	<div class="slider-container" style="display: flex;lign-items: center;margin:10px;">';
									sliderContent += '		<img src="/images/icon_signOff.png" style="width:25px;height:25px;margin:0 10px;">';
									sliderContent += '		<input type="range" min="0" max="100" value="'+row.value+'" step="10" class="slider" id="myRange_'+row.weatherCd+'" onchange="changeValue('+row.weatherCd+')">';
									sliderContent += '		<img src="/images/icon_signOn.png" style="width:25px;height:25px;margin:0 10px;">';
									sliderContent += '	</div>';
									sliderContent += '	</td>';
									sliderContent += '</tr>';
									if(row.weather==undefined || p==data.length-2){//주간에 datalist어케붙이지
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
								
								$("#strSettings").html(sliderContent);
								$("#strSettings").show();
								$('#activeYn').prop('checked', true);
							}else{
								$("#strSettings").hide();
								$('#activeYn').prop('checked', false);
							}
						}else{
							$("#strSettings").hide();
							$('#activeYn').prop('checked', false);
						}
					}
				});
				
			}
		},
		error:function(result){
			alert("에러가 발생했습니다.");
		}
	});
	$.ajax({
		url:'/searchDimmGrpList',
		type:'POST',
		cache:false,
		data:{strCd:strCd},
		dataType:'json',
		success:function(data){
			let groupList = '';
			for(let l=0;l<data.length;l++){
				let row = data[l]
				groupList += '<tr id="'+row.grpId+'">';
				groupList += '<td scope="row">'+row.grpNm+'</td>';
				groupList += '<td scope="row">'+row.count+'</td>';
				if(row.basicYn=='Y'){
					groupList += '<td scope="row"><button class="policyBtn" type="click" style="background-color:#9298EC;" onclick="GroupPolicyPop(\''+row.strCd+'\',\''+row.hubId+'\',\''+row.grpId+'\',\''+row.grpNm+'\',\''+row.basicYn+'\',\''+row.count+'\')">기본 정책 적용중</button></td>';			
				}else{
					groupList += '<td scope="row"><button class="policyBtn" type="click" style="background-color:#A9D18E;" onclick="GroupPolicyPop(\''+row.strCd+'\',\''+row.hubId+'\',\''+row.grpId+'\',\''+row.grpNm+'\',\''+row.basicYn+'\',\''+row.count+'\')">개별 정책 적용중</button></td>';						
				}
//				groupList += '<td scope="row"><button type="button" onclick="GroupPolicyPop(\''+row.strCd+'\',\''+row.hubId+'\',\''+row.grpId+'\',\''+row.grpNm+'\',\''+row.basicYn+'\',\''+row.count+'\')">정책 변경하기</button></td>';
				groupList += '</tr>';
			}
			
			$("#groupContent").html(groupList);
		}
	});
	
}
function GroupPolicyPop(strCd, hubId, grpId, grpNm, basicYn, count){
	let href='/menu/VM2202?strCd='+strCd+'&hubId='+hubId+'&grpId='+grpId+'&grpNm='+grpNm+'&basicYn='+basicYn+'&count='+count;
	window.location.href=href;
}
function changeToggle(){
	if ($('#activeYn').is(':checked')) {
		$("#strSettings").show();
	} else {
		$("#strSettings").hide();
	}
}
// 헤더에 점포 정보 세팅
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

//점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

// 새로고침
function fn_VM2201refresh() {
	timeSetFalg = 0;
	// 로딩 바 표시
	$('#viewLoadingDiv').show().fadeIn('fast');
	setForm();
	// 간판 상태 조회
//	fn_VM2202refresh();
//	
//	// 일출몰/간판 시간 정보 조회
//	fn_VM2201GetDbData();
}
//
//
function fn_VM0601ControlSignRealTime(){
	if(confirm('전체 조명에 밝기를 조절합니다. 진행 하시겠습니까?')){
		let strCd = $("#hStrCd").val();
		let value = $("#realTimeDimm").val();
		var selected = $("#selected").val();
		let param = new Object();
		param.strCd = strCd;
		param.value = value;
		param.selected = selected;
		
		$.ajax({
			type : "POST",
			cache : false,
			url : "/VM2201setDimming",
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
				alert(returnJSON.msg);
			}
		});
	}
	//ajax
}

function fn_VM2201SaveStrDimmSet(){
	if(confirm('디밍 정책을 적용합니다. 적용 하시겠습니까?')){
		let strCd = $("#hStrCd").val();
		
		let param = new Object();
		
		param.strCd = strCd;
		
		if($("#activeYn").is(':checked')){
			param.basicYn = 'Y';
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
			param.basicYn = 'N';
		}
		$.ajax({
			type : "POST",
			cache : false,
			url : "/VM2202SaveStrDimm",
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
			}
		});
	}
}
