$(function(){
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	if(authSp != 'H'){
		$("#solveMsg").attr("readonly",true);
		$("#btn_save").hide();
	}
	
	// 점검한 냉장비 불러오기
	fn_VM1203SetDeviceList();
	
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

function fn_VM1203Redirect(){
	$('#returnFrom').attr("action", "/VM1201Redirect");
	$("#returnFrom").submit();
}

function fn_VM1203Save(){
	if($("#solveMsg").val() == ""){
		alert("조치내용을 입력해주세요");
		return;
	}
	
	var param = $("#inputForm").serialize();
	
	$.ajax({
		type:'POST',
		url:'/VM1203Save',
		data: param,
		dataType:'json',
		success: function(resultJson){
			if(resultJson.success){
				alert("(등록완료)조치내용 등록을 완료하였습니다.");
				fn_VM1203Redirect();
			}else{
				alert("(등록실패)다시 시도해주세요.");
			}
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		}
	});
}
function fn_VM1203Due(){
	if($("#scrDue").val() == ""){
		alert("처리예정일을 입력해주세요");
		return;
	}
	Chk=0;
	dateCheck();
	if(Chk==0){
	var param = $("#inputForm").serialize();

	$.ajax({
		type:'POST',
		url:'/VM1203Due',
		data: param,
		dataType:'json',
		success: function(resultJson){
			if(resultJson.success){
				alert("(등록완료)조치내용 등록을 완료하였습니다.");
			}else{
				alert("(등록실패)다시 시도해주세요.");
			}
		},
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		}
	});
	}
	else{
		alert("처리예정일 날짜 형식을 맞춰주세요 ex)yyyy-mm-dd or yyyymmdd");
	}
}
//선택한 점포 냉장비 리스트
function fn_VM1203SetDeviceList(){
	$.ajax({
		url:'/VM1202DeviceList',
		type:'POST',
		data:{
			strCd : $("#strCd").val(),
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
						html += '<input type="checkbox" id="device_'+i+'" name="device_'+i+'" checked onClick="return false;" /><label for="device_'+i+'" >'+items[i].deviceLoc+' </label>'
					}else{
						html += '<input type="checkbox" id="device_'+i+'" name="device_'+i+'" onClick="return false;" /><label for="device_'+i+'" >'+items[i].deviceLoc+' </label>'
					}
				}
				
				$("#deviceList").html(html);
			}
		}
	})
}
function dateCheck(){//날짜 형식 체크
	
	var date=$("#scrDue").val();
	date=String(date);
	var date2=date.replaceAll("-", "");
	if(isNaN(date2)){//숫자가 아닐때
		return Chk=1;
	}
	var digit=getDigit(date2);
	if(digit!=8){
		return Chk=1;
	}
}
function getDigit(num) {//숫자 자리수 확인
	  num = String(num);
	  var i=0;
	  while(num[i]) { i++; };
	  return i;
	}