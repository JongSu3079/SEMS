let checkResult = {};
let partList = {};			// 부품 array
let partItems = {};			// 부품 item( 초성검색 전용 )
let errorList = [];
let signature;
var actingInput = '';
var initFlag = false;

$(function(){
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
	
	// 특이사항 입력 팝업
	$('#mntnc_popup').popup();
	// BS접수 팝업
	$("#receipt_popup").popup();
	// 점검완료 팝업
	$('#complete_popup').popup();
	
	// 휴점/폐점 여부 select change event
	$("#operStat").change(function(){
		if($(this).val() !== '해당없음' || $(this).val() !== 'null' || $(this).val() !== ''){
			$("#checkListDiv").hide();
			$("#noteDiv").hide();
			
			// 점검 종료 > 폐점 / 휴점인 경우 경영주 확인 X
			$("#ownerNm, #telNo").attr('readonly','readonly');
			$("#signImgDiv").hide();
			
			// 특이사항선택 점검 > 특이사항 입력창 show
			$("#operNoteDiv").show();
			
			$("#noteDiv").hide();
		}else{
			$("#checkListDiv").show();	// 체크리스트 영역
			$("#noteDiv").show();		// 점검특이사항, 비고 영역
			// 특이사항선택 점검 > 특이사항 입력창 hide
			$("#operNoteDiv").hide();
			
			// 점검 종료
			$("#ownerNm, #telNo").attr('readonly',false);
			$("#signImgDiv").show();
		}
	})

	// 기존 점검 내역이 있으면 불러오기.
	fn_VM2003SetTempData();
	
	// Android/iOS OS 별 기본 동작 처리
	setOSDefault();
	
//	// 1. ResizeObserver 객체 만들기
//	const observer = new ResizeObserver(entries => {
//		for (let entry of entries) {
//			const {width} = entry.contentRect;
//			$("#signature").width(width-30);
//		}
//	});
//	var el = document.querySelector('#signImgArea');
//	observer.unobserve(el);
//	observer.observe(el);
//	
	// 서명
	var canvas = $("#signature")[0];
	signature = new SignaturePad(canvas, {
		minWidth : 2,
		maxWidth : 2,
		penColor : "rgb(0, 0, 0)"
	});
	// 서명 clear 버튼
	$("#clear").off();
	$("#clear").on("click", function() {
		signature.clear();
	});
	
	// 경영주 서명 거부 event
	$("#ownerSignYnChk").click(function(){
		if ($(this).attr('checked')) {
			// pad 그리기 막기
			signature.clear();
			signature.off();
		} else {
			// pad 그리기 허용
			signature.on();
		}
	})
	
	// 서명란 터치 시 키보드 생성 막기
	canvas.addEventListener("touchstart", fn_VM1702TouchStart, false);
	function fn_VM1702TouchStart(e){
		e.preventDefault();
		$('input[type=text], textarea').blur();
	}
})

// 임시저장 데이터 setting
function fn_VM2003SetTempData(){
	var param = new Object;
	param.initStrCd = initStrCd;
	param.yyyymm 	= yyyymm;
	param.mntncType = 'S';
	var storedData = JSON.parse(localStorage.getItem('SignBsTemp_'+initStrCd));
	if(storedData!= undefined && storedData.checkJson){
//	if(storedData && storedData.checkJson){
		checkResult = JSON.parse(storedData.checkJson);
		var html = "";
		
		checkResult.checkList.forEach( (item, index) => {
			html += "<tr id='checkList_"+item.id+"'>";
			
			html += "	<td>";
			if(item.requiredYn === 'Y'){
				html += "(*)";
			}
			html += "[" + item.title + "]<span id='contents_"+item.id+"'>" + item.checkContents + "</span></td>";
			html += "	<td>";
			if(item.checkType === "M"){
				html += "		<div class='inputBox' id='check_"+item.id+"'>";
				html += "			<select onChange='fn_VM2003CheckItem(\""+item.id+"\", this);' defaultValue='Y'>";
//						html += "				<option value = ''>선택</option>";
				html += "				<option value = 'Y' "+ (item.checkYn == 'Y' ? 'selected' : '') +">정상</option>";
				html += "				<option value = 'defect' "+ (item.checkYn == 'defect' ? 'selected' : '') +">불량</option>";
				html += "			</select>";
				html += "		</div>";
			}else if(item.checkType === "O"){
				html += "		<div class='inputBox' id='check_"+item.id+"'>";
				if(item.checkOptions!=undefined){
					let options = item.checkOptions.split(',');
					html += "			<select onChange='fn_VM2003CheckItem(\""+item.id+"\", this);' defaultValue='"+options[0]+"'>";
					html += "				<option value = ''>선택</option>";
					for(let o = 0 ; o<options.length;o++){
						html += "				<option value = '"+options[o]+"' "+ (item.checkYn == 'Y' ? 'selected' : '') +">"+options[o]+"</option>";
					}
					html += "			</select>";							
				}
				html += "		</div>";
			}else if(item.checkType === "S"){
				html += "		<div class='inputBox' id='check_"+item.checkId+"'> 입력버튼을 누르고 값을 입력해주세요</div>";
			}
			html += "	</td>";
			
			html += "	<td>";
			if(item.checkType != 'B'){
				if(!item.note || item.note === ""){
					html += "		<div class='btn_grp' id='noteBtn_"+item.id+"'><button type='button' id='note_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM2003NotePop(\""+item.id+"\", \""+item.checkType+"\",\""+item.defaultNote+"\",\""+item.semsYn+"\");' >입력</button></div>";
					html += "		<div class='btn_grp' id='noteModBtn_"+item.id+"' style='display:none;'><button type='button' id='noteMod_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM2003NoteModPop(\""+item.id+"\", \""+item.checkType+"\");' >수정</button></div>";
				}else{
					html += "		<div class='btn_grp' id='noteModBtn_"+item.id+"'><button type='button' id='noteMod_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM2003NoteModPop(\""+item.id+"\", \""+item.checkType+"\");' >수정</button></div>";
				}
			}else{
				html += "	<div class='btn_grp checkbox'>";
				html += "		<input type='checkbox' id='note_"+item.id+"' name='note_"+item.id+"'";
				if(item.note && item.note !== ""){
					html += "	checked";
				}
				html += "		/><label for='note_"+item.id+"'></label>";
				html += "		<input type='hidden' id='defaultNote_"+item.id+"' value='"+item.defaultNote+"'";
				html += "	</div>";
			}
			html += "	</td>";
			
			if(item.note && item.note !== ""){
				html += "	<td><span id='noteStr_"+item.id+"'>"+item.note+"<span></td>";
			}else{
				html += "	<td><span id='noteStr_"+item.id+"'>-<span></td>";
			}
			html += "</tr>";
		})
		$("#checkListArea").html(html);
		$("#checkListDiv").show();
		$("#operStatdiv").show();
		$("#repairYnDiv").show();
		$("#noteDiv").show();
		$("#startBtn").hide();
		$("#endBtn").show();
		
		fn_VM2003CheckboxChangeEvent();
	}
}

// 임시저장
function fn_VM2003TempSave(){
	var param = new Object;
	param.initStrCd = initStrCd;
	param.mntncType = 'S';
	param.yyyymm 	= yyyymm;
	param.checkJson = JSON.stringify(checkResult);
	
	localStorage.setItem('SignBsTemp_'+initStrCd, JSON.stringify(param));
	
//	$.ajax({
//		url:'/VM1603TempSave',
//		type:'POST',
//		async: false,
//		data:param
//	})
}

//점검 시작 버튼
function fn_VM2003StartMntnc(){
	var param = new Object;
	param.initStrCd = initStrCd;
	param.yyyymm = yyyymm;
	param.mntncType = mntncType;
	
	$.ajax({
		url:'/VM2003retrieveCheckList',
		dataType:'json',
		data:param,
		success:function(response){
			if(response.success){
				if (response.total > 0) {
					var subTitle = "";
					var html = "";
					var checkListArr = [];
					response.items.forEach( (item, index) => {
						if(index == 0){
							checkResult.initStrCd	= initStrCd;		// 점검 pk
							checkResult.yyyymm		= yyyymm;			// 점검 pk
							checkResult.startTime 	= item.now;			// 점검 시작시간
						}
						if(item.seq.length == 5){
							subTitle = item.checkContents;
							return;
						}
						
						var temp = {
								"id":item.checkId,
								"title":subTitle,
								"checkContents":item.checkContents,
								"checkType":item.checkType,
								"note":"",							// 특이사항
								"requiredYn":item.requiredYn,		// 필수입력 여부
								"defaultNote":item.defaultNote,		// 기본값
						}
						if(item.checkType === "M" || item.checkType === "O"){
							temp.checkYn = "";		// 객관식 항목 일때만 추가
						}
						checkListArr.push(temp);
						html += "<tr id='checkList_"+item.checkId+"'>";
						html += "	<td>";
						if(item.requiredYn === 'Y'){
							html += "(*)";
						}
							html += "[" + subTitle + "]<span id='contents_"+item.checkId+"'>" + item.checkContents + "</span></td>";
						html += "	<td>";
						if(item.checkType === "M"){
							html += "		<div class='inputBox' id='check_"+item.checkId+"'>";
							html += "			<select onChange='fn_VM2003CheckItem(\""+item.checkId+"\", this);' defaultValue='Y'>";
//							html += "				<option value = ''>선택</option>";
							html += "				<option value = 'Y' >정상</option>";
							html += "				<option value = 'defect' >불량</option>";
							html += "			</select>";
							html += "		</div>";
						}else if(item.checkType === "O"){
							html += "		<div class='inputBox' id='check_"+item.checkId+"'>";
							if(item.checkOptions!=undefined){
								let options = item.checkOptions.split(',');
								html += "			<select onChange='fn_VM2003CheckItem(\""+item.checkId+"\", this);' defaultValue='"+options[0]+"'>";
								html += "				<option value = ''>선택</option>";
								for(let o = 0 ; o<options.length;o++){
									html += "				<option value = '"+options[o]+"' "+ (item.checkYn == 'Y' ? 'selected' : '') +">"+options[o]+"</option>";
								}
								html += "			</select>";								
							}
							html += "		</div>";
						}else if(item.checkType === "S"){
							html += "		<div class='inputBox' id='check_"+item.checkId+"'> 입력버튼을 누르고 값을 입력해주세요</div>";
						}
						html += "	<td>";
						if(item.checkType != 'B'){
							html += "	<div class='btn_grp' id='noteBtn_"+item.checkId+"'><button type='button' id='note_"+item.checkId+"' class='mntnc_popup_open' onclick='javascript:fn_VM2003NotePop(\""+item.checkId+"\", \""+item.checkType+"\",\""+item.defaultNote+"\",\""+item.semsYn+"\");' >입력</button></div>";
							html += "	<div class='btn_grp' id='noteModBtn_"+item.checkId+"' style='display:none;'><button type='button' id='noteMod_"+item.checkId+"' class='mntnc_popup_open' onclick='javascript:fn_VM2003NoteModPop(\""+item.checkId+"\", \""+item.checkType+"\");' >수정</button></div>";
						}else{
							html += "	<div class='btn_grp checkbox'>";
							html += "		<input type='checkbox' id='note_"+item.checkId+"' name='note_"+item.checkId+"' /><label for='note_"+item.checkId+"'></label>";
							html += "		<input type='hidden' id='defaultNote_"+item.idcheckId+"' value='"+item.defaultNote+"'";
							html += "	</div>";
						}
						html += "	</td>";
						
						html += "	<td>";
						html += "		<span id='noteStr_"+item.checkId+"'>-<span>";
						html += "	</td>";
						html += "</tr>";
					})
					checkResult.checkList = checkListArr;
					fn_VM2003TempSave();	// checkResult가 변경되면 임시저장
				}
				$("#checkListArea").html(html);
				$("#checkListDiv").show();
				$("#operStatdiv").show();
				$("#repairYnDiv").show();
				$("#noteDiv").show();
				$("#startBtn").hide();
				$("#endBtn").show();
				
				fn_VM2003CheckboxChangeEvent();
			}else{
				alert("(조회실패) 다시 시도해주세요.")
			}
		}
	})
	//로컬스토리지 변수 삭제
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
	
		// 'BsTemp_'로 시작하는 변수인지 확인
		if (key.startsWith('SignBsTemp_')) {
			// '_'를 기준으로 분할하여 뒷부분 추출
			var suffix = key.split('_')[1];
	
			if (suffix !== initStrCd) {
				localStorage.removeItem(key);
			}
		}
	}
}

//점검 유형 check box change event
function fn_VM2003CheckboxChangeEvent(){
	// checkType이 체크박스일때
	// 체크 시 특이사항 바로 입력
	if($("input:checkbox[id^='note_']").length > 0){
		$("input:checkbox[id^='note_']").off();
		$("input:checkbox[id^='note_']").change(function() {	// 특이사항 체크박스
			var noteEl = $(this).parent().parent().parent().children("td").children("span[id^='noteStr_']");		// 내용 element
			var note = $(this).siblings('[id^=defaultNote_]').val();	// 점검내용 text

			var id = $(this).attr('id').split('_')[1];
			var index = checkResult.checkList.findIndex( item => item.id == id);
			if($(this).is(":checked") && note != 'undefined'){
				noteEl.text(note);
				checkResult.checkList[index].note = note;	// 특이사항 내용 결과 값 array에 저장
			}else{
				checkResult.checkList[index].note = '';
				noteEl.text("-");
			}
			fn_VM2003TempSave();	// checkResult가 변경되면 임시저장
		});
	}
}

//점검 확인 버튼
function fn_VM2003CheckItem(id, _this){
	var index = checkResult.checkList.findIndex( item => item.id == id);
	checkResult.checkList[index].checkYn = $(_this).val();
	fn_VM2003TempSave();	// checkResult가 변경되면 임시저장
}

//입력 버튼
function fn_VM2003NotePop(id, checkType, defaultNote, semsYn){
	var html = "";
	if(checkType === 'M' || checkType === 'S' || checkType === 'O' ){	// 주관식, 객관식
		html += "<h3>특이사항 :</h3>";
		html += "<textarea id='notes' cols='5' rows='5' placeholder='특이사항을 입력하세요' style='resize: none;'>";
		if(defaultNote && defaultNote != 'undefined')
			html += defaultNote;
		html += "</textarea>";
		
		if(semsYn && semsYn == 'Y'){
			var param = new Object;
			param.initStrCd 	= initStrCd;
			param.yyyymm 		= yyyymm;
			param.mntncType 	= mntncType;
			$.ajax({
				url:'/VM2003RetrieveSemsData',
				data:param,
				async: false,
				success:function(response){
					if(response.success){
						if (response.total > 0) {
							html += '<div class="form_row wide devicecheckboxList">';
							html += '	<div class="inputBox">';
							html += '		<div class="tblBox">';
							html += '			<table>';
							html += '				<colgroup>';
							html += '					<col />';
							html += '					<col style="width: 55%;" />';
							html += '				</colgroup>';
							html += '				<thead>';
							html += '					<tr>';
							html += '						<th scope="colgroup" colspan="2">SEMS 장비</th>';
							html += '					</tr>';
							html += '				</thead>';
							response.items.forEach( (item, i) => {
								html += '				<tr>';
								html += '					<td>';
								html += 						'<input type="checkbox" id="device_'+i+'" name="device_'+i+'" /><label for="device_'+i+'" >'+item.deviceLoc+'</label>'; 
								html += '					</td>';
								html += '					<td>';
								html += 						'<input type="text" readonly value="'+item.sensTemp+'"/>'; 
								html += '					</td>';
								html += '				</tr>';
							})
							html += '			</table>';
							html += '		</div>';
							html += '	</div>';
							html += '</div>';
						}
					}
				}
			})
		}
		
	}else if(checkType === 'C'){					// 달력
		html += "<h3>달력 :</h3>";
		html += "<input type='text' id='calendar' oninput='calAutoHyphen(this)' maxlength='10' placeholder='ex)yyyy-mm-dd' style='width: 100%;' />";
		html += "<div class='errorMsg' id='calErrorMsg' style='display:none;'>날짜 형식에 맞게 입력해주세요.</div>";
	}
	$("#hCheckId").val(id);
	$("#contentsArea").html(html);
	$('#mntnc_popup').show();
}

// 수정버튼
function fn_VM2003NoteModPop(id, checkType){
	var html = "";
	var index = checkResult.checkList.findIndex( item => item.id == id);
	var note = checkResult.checkList[index].note;
	
	if(checkType === 'M' || checkType === 'S' || checkType === 'O' ){	// 주관식, 객관식
		html += "<h3>특이사항 :</h3>";
		html += "<textarea id='notes' cols='5' rows='5' placeholder='특이사항을 입력하세요' style='resize: none;'>"+note+"</textarea>";
	}else if(checkType === 'C'){					// 달력
		html += "<h3>달력 :</h3>";
		html += "<input type='text' id='calendar' placeholder='ex) yyyy-mm-dd' style='width: 100%;' value='"+note+"'/>";
		html += "<div class='errorMsg' id='calErrorMsg' style='display:none;'>날짜 형식에 맞게 입력해주세요.</div>";
	}
	$("#hCheckId").val(id);
	$("#contentsArea").html(html);
	$('#mntnc_popup').show();
}

// 특이사항 저장
function fn_VM2003SaveNote(){
	var id = $("#hCheckId").val();
	
	var html = "";
	if($("#calendar").length > 0){			// 달력일때
		var date = $("#calendar").val();
		if(!checkValidDate(date)){
			$("#calErrorMsg").show();
			return;
		}
		html = date;
		}else if($("#notes").length > 0){		// 특이사항 입력 값
		html = $("#notes").val();
		}
	
	if($("[id^='device_']").length > 0){
		$("[id^='device_']").each(function() {	// 냉장비 온도값
			if($(this).is(":checked")){
				if(html.length > 0){
					html += "/"
				}
				html += $(this).next('label').text() + ":" + $(this).parent().parent().children("td").children("input:text").val() + " "; 
			}
		});
	}
	
	var index = checkResult.checkList.findIndex( item => item.id == id);
	checkResult.checkList[index].note = html;	// 특이사항 내용 결과 값 array에 저장
	fn_VM2003TempSave();	// checkResult가 변경되면 임시저장
	$("#noteStr_" + id).text(html);							// 내용 칸에 특이사항 내용 입력
	// 특이사항 버튼  '입력' -> '수정' 변경
	$("#noteBtn_" + id).hide();
	$("#noteModBtn_" + id).show();
	
	$('#mntnc_popup_close').trigger('click');		// 팝업 닫기
}

// 정기점검 저장
function fn_VM2003Save(){
	if($("#operStat option:selected").val() == '해당없음' 
		|| $("#operStat option:selected").val() == ''
		||	$("#operStat option:selected").val() == null){
		// checkList validate
		var checkListvalidateFlag = true;
		var rsltCheckList = [];
		checkResult.checkList.forEach( item => {
			var temp = {};
			if(item.requiredYn === 'Y'){
				if(item.checkType == "M"){
					// 객관식
					if(item.checkYn == ''){
						// 확인을 입력하지 않으면 경고메세지 표시
//						$("#checkList_" + item.id).addClass('errorMsg')
//						checkListvalidateFlag = false;
						item.checkYn='Y';
					}else{
						$("#checkList_" + item.id).removeClass('errorMsg')
					}
				}else if(item.checkType == "S" || item.checkType == "C"){
					// 주관식, 달력
					if(item.note == ""){
						// 특이사항을 입력하지 않으면 경고메세지 표시
						$("#checkList_" + item.id).addClass('errorMsg')
						checkListvalidateFlag = false;
					}else{
						$("#checkList_" + item.id).removeClass('errorMsg')
					}
				}else if(item.checkType == "B"){
					// 체크 박스 => 체크를 하지 않으면 경고메세지 표시
					if(item.note == ""){
						// 특이사항을 입력하지 않으면 경고메세지 표시
						$("#checkList_" + item.id).addClass('errorMsg')
						checkListvalidateFlag = false;
					}else{
						$("#checkList_" + item.id).removeClass('errorMsg')
					}
				}else if(item.checkType == "O"){
					// 객관식 => 선택하지 않으면 경고메세지 표시
					if(item.checkYn == ""){
						// 특이사항을 입력하지 않으면 경고메세지 표시
						$("#checkList_" + item.id).addClass('errorMsg')
						checkListvalidateFlag = false;
					}else{
						$("#checkList_" + item.id).removeClass('errorMsg')
					}
				}
			}
			
			temp = {
					id:item.id,
					title:item.title,
					checkContents:item.checkContents,
					checkType:item.checkType,
					checkYn:item.checkYn,
					note:item.note
			}
			rsltCheckList.push(temp);	// 필요없는 정보는 삭제 후 list 재생성
		});
		
		if(!checkListvalidateFlag){
			alert("확인하지 않은 점검항목을 확인해주세요.")
			return;
		}
		// 점검종료 팝업 validate
//		if($("#ownerNm").val() === ""){
//			alert("경영주확인란 항목을 입력해주세요");
//			return;
//		}
//		var telRegExp =/^\d{2,3}-\d{3,4}-\d{4}$/;
//		if(!telRegExp.test($("#telNo").val())){
//			alert("전화번호 항목을 입력해주세요");
//			return;
//		}
		
		if(!$('#ownerSignYnChk').is(':checked')){
			if(signature.isEmpty()) {
				alert("서명 항목을 입력해주세요.");
				return;
			}else{
				var data = signature.toDataURL("image/png");
				$("#file0url").val(data);
			}
			$('#ownerSignYn').val('Y');		// 서명이미지가 있으면 'Y'
		}else{
			$('#ownerSignYn').val('N');		// 서명이미지가 없으면 'N'
		}
		if(!$("#agreeYnChk").is(':checked')){
			alert("개인정보 수집 약관에 동의해주세요");
			$("#agreeYn").val('N');
			return;
		}else{
			$("#agreeYn").val('Y')
		}
		
		// 점검특이사항
		$("#srcNote").val($("#note").val());
		$("#srcSubNote").val($("#subNote").val());
	}else{
		// 특이사항 선택 점검
		$("#srcOperNote").val($("#operNote").val());
	}
	$("#srcInitStrCd").val(initStrCd);
	$("#srcYyyymm").val(yyyymm);
	$("#srcOperStat").val($("#operStat option:selected").val());
	
	if($("#srcOperStat").val()==null || $("#srcOperStat").val()==''){
		$("#srcOperStat").val('해당없음');
	}
	
	$("#startTime").val(checkResult.startTime);
	$("#checkList").val(JSON.stringify(rsltCheckList));
	
	// 이미지 압축
	fn_imgCompress();
	
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$("#inputForm").ajaxForm({
			type: "POST",
			cache: false,
			async: false,
			url:"/VM2003Save",
			enctype: "multipart/form-data",
			dataType : "json",
			success : function(response){
				if(response.success){
					if($("#operStat option:selected").val() == '해당없음'
						|| $("#operStat option:selected").val() == ''
							||	$("#operStat option:selected").val() == null){
						let number = $("#telNo").val();
						if(number&&number!=null&&number!=''){
							fn_VM2003SendMessage(response.data);							
						}
					}
					localStorage.removeItem('SignBsTemp_'+initStrCd);
					alert("저장되었습니다.");
					fn_VM2003Redirect();
				}else{
					alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
				}
			},
			error : function (e){
				$("body").html(e.responseText);
			},
			complete: function(){
				$('#viewLoadingDiv').fadeOut();
			}
		})
		$("#inputForm").submit();
	}, 1000);
	
}

//만족도 조사 문자 발송
function fn_VM2003SendMessage(smsUrls){
	let param = {
		number 		: ($("#telNo").val()).split('-').join(''),	// 전화번호
		initStrCd 	: initStrCd,
		yyyymm 		: yyyymm,
		type 		: mntncType,
		strNm		: strNm,
		vendorNm	: vendorNm
	};
	fn_uptSemResLog(param);
	fnSendMessage(smsUrls[1], param, smsUrls[0] == undefined || smsUrls[0] == null ? '' : smsUrls[0]);
}

function fnSendMessage(smsUrl, param, nextUrl) {
	fn_uptSemReqLog(param);
	$.ajax({
		url: smsUrl + '/api/sign/maintenance/survey',
		data: JSON.stringify(param),
		type: 'POST',
		cache: false,
		async: false,
		contentType: 'application/json',
		success: function(response) {
			param.aligoRes = JSON.stringify(response);
			fn_uptAlgResLog(param);
			//LOG RESPONSE 기록
		},
		error : function(error, textStatus, message) {
			console.log(error, textStatus, message)
			let responseText = error.responseText == undefined || error.responseText == null || error.responseText == '' ? '' : JSON.parse(error.responseText);
			
			if(nextUrl != '') // 다음 url 있으면 재시도
				fnSendMessage(nextUrl, param, '');
			else{
				let errResponse={code : "-98", message: "서버 다운"};
				param.code=errResponse.code;
				param.aligoRes = JSON.stringify(errResponse);
				fn_uptAlgResLog(param);
			}
		},
	});
}
//log
function fn_uptSemResLog(param){
	$.ajax({
		url: '/VM2003uptSemResLog',
		data: param,
		type: 'POST',
		async:false,
		success: function(response) {
			console.log(response);
		},
		error : function(error) {
			console.log(error)
		},
	});
}
function fn_uptSemReqLog(param){
	$.ajax({
		url: '/VM2003uptSemReqLog',
		data: param,
		type: 'POST',
		async:false,
		success: function(response) {
			console.log(response);
		},
		error : function(error) {
			console.log(error)
		},
	});
}
function fn_uptAlgResLog(param){
	$.ajax({
		url: '/VM2003uptAlgResLog',
		data: param,
		type: 'POST',
		async:false,
		success: function(response) {
			console.log(response);
		},
		error : function(error) {
			console.log(error)
		},
	});
}
//log

//이미지 압축
function fn_imgCompress(){
	$('.thumbBox .imgBox img').each(function(i,ele){
		if( $(ele).closest('.thumbBox').find('input[name$=flag]').val() == 'true' ){
			var oriImgObj = $(ele).get(0);
			var imgType = $(ele).attr('src').split(';')[0].split(':')[1];
			var width = oriImgObj.naturalWidth;
			var height = oriImgObj.naturalHeight;
			
			var upWidth = 0;
			var upHeight = 0;
			if( width >= height ){
				upWidth = (width>=1920 ? 1920 : width);
				upHeight = (width>=1920 ? Math.round(1920*height/width) : height);
			} else {
				upHeight = (height>=1920 ? 1920 : height);
				upWidth = (height>=1920 ? Math.round(1920*width/height) : width);
			}
			
			var canvas = $('#tempCanvas')[0];
			canvas.width = upWidth;
			canvas.height = upHeight;
			var ctx = canvas.getContext('2d').drawImage(oriImgObj, 0, 0, upWidth, upHeight);
			var cnvImg64 = canvas.toDataURL('image/jpeg', 70/100);
			var cnvImgObj = new Image();
			cnvImgObj.src = cnvImg64;
			
			var gap = '[' + i + '] '
				+ $(ele).attr('src').length + ' > ' + cnvImg64.length + ', '
				+ width + ' x ' + height + ' > ' + upWidth + ' x ' + upHeight;
			$(ele).attr('src', cnvImg64);
			$(ele).closest('.thumbBox').find('input[name$=url]').val(cnvImg64);
		}
	})
}

function dataURLtoFile(dataurl, fileName){
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], fileName, {type:mime});
}

//Android/iOS OS 별 기본 동작 처리
function setOSDefault(){
	var devName = OSInfoDev();
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
			callNativeFunction('getCameraAuth', 'single', 'onSuccessGetCameraAuth', 'onErrorGetCameraAuth', false);
		});
	} else {
		$("input[type=file]").off("change");
		$("input[type=file]").on("change", function(event){
			event.preventDefault();
			event.stopPropagation();
			
			var thumbnail = $(this).closest("td").find("img");
			readURL(this, thumbnail);
		});
	}
}

//카메라 권한 획득 성공 시(Android only)
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
				readURL(this, thumbnail);
				
				if($(".comboBox").hasClass("show")) {
					$(".dim, .comboBox").addClass("none");
					$(".comboBox").removeClass("show");
				}
			});
		});
		
		$('#cameraAuth').val('OK');
		if( !initFlag ){
			$('#'+actingInput).closest('.filebox').trigger('click');
		}
		initFlag = true;
	}
}

//3. load input file
function readURL(input, thumbnail) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function (e) {
			$(thumbnail).attr('src', e.target.result);
			$(thumbnail).closest(".imgBox").addClass("be");
			$(thumbnail).closest(".thumbBox").find('input[name$=flag]').val('true');
		}
		
		reader.readAsDataURL(input.files[0]);
	}
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

//날짜입력 validate
function checkValidDate(value) {
	var result = true;
	try {
		var date = value.split("-");
		var y = parseInt(date[0], 10),
			m = parseInt(date[1], 10),
			d = parseInt(date[2], 10);
		
		var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
		result = dateRegex.test(d+'-'+m+'-'+y);
	} catch (err) {
		result = false;
	}
	return result;
}

const telAutoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
}
const calAutoHyphen = (target) => {
	target.value = target.value
	.replace(/[^0-9]/g, '')
	.replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

$('#toggle').click(function() {
	$('#agreement').toggle();
	if($(this).text()=='자세히 ▼'){
		$(this).text('자세히 ▲');
	}else{
		$(this).text('자세히 ▼');
	}
});

function fn_VM2003Redirect() {
	$('#returnFrom').attr("action", "/VM2002Redirect");
	$("#returnFrom").submit();
}