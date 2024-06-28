var deviceList = [];

$(function(){
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	if($("#scrStrNm").val() == ""){
		$("#scrStrNm").val($("#hStrNm").val());
		$("#scrStrCd").val($("#hStrCd").val());
	}
	
	//선택한 점포 냉장비 리스트
	fn_VM1202SetDeviceList();
	
	//오류점검요청 타입 세팅
	fn_VM1202SetReqType();
	
	$("#reqType").change(function(){
		if($(this).val()){
			$("#reqMsgDiv").show();
		}else{
			$("#reqMsgDiv").hide();
		}
	})
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
});

//헤더에 점포 정보 세팅
function fn_setHeaderCombo(){
	/** 
	 * 필수 태그
	 * <div class="shop_name" id="strDataCombo" ></div>
	 * <input type="hidden" id="hStrCd"/>
	 * <input type="hidden" id="hStrNm"/>
	 */
	gfn_getStrDataList();
}

//선택한 점포 냉장비 리스트
function fn_VM1202SetDeviceList(){
	$.ajax({
		url:'/VM1202DeviceList',
		type:'POST',
		data:{
			strCd : $("#scrStrCd").val(),
			no : $("#no").val()
		},
		dataType:'json',
		success:function(result){
			if(result.success){
				var html = '';
				var items = result.items;
				deviceList = items;
				
				for(var i in items){
					if(items[i].checkYn === 'Y'){
						html += '<input type="checkbox" id="device_'+i+'" name="device_'+i+'" checked /><label for="device_'+i+'" >'+items[i].deviceLoc+' </label>'
					}else{
						html += '<input type="checkbox" id="device_'+i+'" name="device_'+i+'" /><label for="device_'+i+'" >'+items[i].deviceLoc+' </label>'
					}
				}
				
				$("#deviceList").html(html);
			}
		}
	})
}

//오류점검요청 타입 세팅
function fn_VM1202SetReqType(){
	$.ajax({
		url:'/VM1202ReqType',
		type:'POST',
		dataType:'json',
		success:function(resultJson){
			if(resultJson.success){
				var items = resultJson.items;
				var html = "";
				
				for(var i=0; i<items.length;i++){
					if(items[i].code != reqType){
						html += "<option value='"+items[i].code+"'>"+items[i].commCdNm+"</option>";
					}else{
						html += "<option value='"+items[i].code+"' selected>"+items[i].commCdNm+"</option>";
					}
				}
				
				$("#reqType").append(html);
				
				$("#reqType").change();
			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	})
}

// 저장
function fn_VM1202Save(){
	if($("#scrStrNm").val() == ""){
		alert("점포를 선택해 주세요.");
		return;
	}
	
	if($("#reqType").val() === ""){
		var exit = true;
		$("[id^=device_]").each(function(){
			if(!$(this).is(":checked")){
				alert("점검을 완료하지 못한 냉장비에 대한 점검요청을 해주세요.");
				exit = false;
				return exit;
			}
		})
		if(!exit) return;
	}else{
		if($("#reqMsg").val() === ""){
			alert("점검 요청내용을 입력해주세요.");
			return;
		}
	}
	
	// 폼 내용 json으로 변환
	var inputForm = $("#inputForm").serializeArray();
	var param = {};
	$.map(inputForm, function(n, i){
		if(n['name'].indexOf('device_') != -1){
			var id = n['name'].replace("device_","");
			if(id==99){
				// 기타로 선택했을때
				param[n['name']] = {
						temonId:deviceList[0].temonId,
						temonType:deviceList[0].temonType,
						portNo:'99',
						deviceType:'E',
						deviceLoc:'기타'
				};
			}else{
				param[n['name']] = deviceList[id];
			}
		}else{
			param[n['name']] = n['value'];
		}
	})
	
	$.ajax({
		type:'POST',
		dataType:'JSON',
		data: JSON.stringify(param),
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		url:'/VM1202Save',
		contentType : "application/json; charset=UTF-8",
		success : function(resultJson) {
			if(resultJson.success){
				alert("(등록완료)오류점검 요청 등록을 완료하였습니다.");
				// 등록, 수정 완료 후 리스트로 이동 
				$("#mode").val('modify');
				fn_VM1202Redirect();
			}else{
				alert("(등록실패)이미 등록된 요청입니다.");
			}
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		}
	});
}

function fn_VM1202Redirect(){
	if($("#mode").val() != 'modify'){
		// 신규 요청
		$('#returnFrom').attr("action", "/CM0401FRedirect");
	}else{
		// 요청 수정
		$('#returnFrom').attr("action", "/VM1201Redirect");
	}
	
	$("#returnFrom").submit();
}