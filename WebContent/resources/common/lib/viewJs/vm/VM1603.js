let checkResult = {};
let partList = {};			// 부품 array
let partItems = {};			// 부품 item( 초성검색 전용 )
let errorList = [];
let signature;
var actingInput = '';
var initFlag = false;
let showSemsTemp = 'N'

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
		if($(this).val() !== '해당없음'){
			$("#checkListDiv").hide();
			$("#repairYnDiv").hide();
			$("#repairYn").val('N').change();
			$("#partRepairDiv").hide();
			$("#noteDiv").hide();
			
			// 점검 종료 > 폐점 / 휴점인 경우 경영주 확인 X
			$("#ownerNm, #telNo").attr('readonly','readonly');
			$("#signImgDiv").hide();
			
			// 특이사항선택 점검 > 특이사항 입력창 show
			$("#operNoteDiv").show();
			
			$("#noteDiv").hide();
		}else{
			$("#checkListDiv").show();	// 체크리스트 영역
			$("#repairYnDiv").show();	// 부품교체여부 영역
			$("#noteDiv").show();		// 점검특이사항, 비고 영역
			// 특이사항선택 점검 > 특이사항 입력창 hide
			$("#operNoteDiv").hide();
			
			// 점검 종료
			$("#ownerNm, #telNo").attr('readonly',false);
			$("#signImgDiv").show();
		}
	})
	
	// 부품교체 여부 select change event
	$("#repairYn").change(function(){
		if($(this).val() === 'Y'){
			$("#partRepairDiv").show();
			checkResult.repairYn = 'Y';
			fn_VM1603GetPartList();			// 부품리스트 조회
		}else{
			$("#partRepairDiv").hide();
			checkResult.repairYn = 'N';
			partList = {};					// 부품리스트 초기화
		}
	})
	
	// 구분 select change event
	$("#target").off();
	$("#target").change(function(){
		if($(this).val() == 'maker'){
			$("#maker").show();
			
			// 검색 대상 변경 무상 부품
			$( "#searchBox" ).autocomplete({
				source: partItems.free
			});
		}else{
			$("#maker").hide();
			
			// 검색 대상 변경 유상 부품
			$( "#searchBox" ).autocomplete({
				source: partItems.paid
			});
		}
	})
	
	// 기존 점검 내역이 있으면 불러오기.
	fn_VM1603SetTempData();
	
	// Android/iOS OS 별 기본 동작 처리
	setOSDefault();
	
	// 1. ResizeObserver 객체 만들기
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
function fn_VM1603SetTempData(){
	var storedData = JSON.parse(localStorage.getItem('BsTemp_'+initStrCd+'_'+mntncType));
	if(storedData!= undefined && storedData.checkJson){
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
				html += "			<select onChange='fn_VM1603CheckItem(\""+item.id+"\", this);'>";
				html += "				<option value = ''>선택</option>";
				html += "				<option value = 'Y' "+ (item.checkYn == 'Y' ? 'selected' : '') +">정상</option>";
				html += "				<option value = 'defect' "+ (item.checkYn == 'defect' ? 'selected' : '') +">불량</option>";
				html += "			</select>";
				html += "		</div>";
			}
			html += "	</td>";
			
			html += "	<td>";
			if(item.checkType != 'B'){
				if(!item.note || item.note === ""){
					html += "		<div class='btn_grp' id='noteBtn_"+item.id+"'><button type='button' id='note_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM1603NotePop(\""+item.id+"\", \""+item.checkType+"\",\""+item.defaultNote+"\",\""+item.semsYn+"\");' >입력</button></div>";
					html += "		<div class='btn_grp' id='noteModBtn_"+item.id+"' style='display:none;'><button type='button' id='noteMod_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM1603NoteModPop(\""+item.id+"\", \""+item.checkType+"\");' >수정</button></div>";
				}else{
					html += "		<div class='btn_grp' id='noteModBtn_"+item.id+"'><button type='button' id='noteMod_"+item.id+"' class='mntnc_popup_open' onclick='javascript:fn_VM1603NoteModPop(\""+item.id+"\", \""+item.checkType+"\");' >수정</button></div>";
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
		
		fn_VM1603CheckboxChangeEvent();
	}
}

// 임시저장
function fn_VM1603TempSave(){
	var param = new Object;
	param.initStrCd = initStrCd;
	param.mntncType = mntncType;
	param.yyyymm 	= yyyymm;
	param.checkJson = JSON.stringify(checkResult);
	
	localStorage.setItem('BsTemp_'+initStrCd+'_'+mntncType, JSON.stringify(param));

//	var storedData = JSON.parse(localStorage.getItem('BsTemp'));
//	console.log(storedData)
//	$.ajax({
//		url:'/VM1603TempSave',
//		type:'POST',
//		async: false,
//		data:param
//	})
}

//점검 시작 버튼
function fn_VM1603StartMntnc(){
	var param = new Object;
	param.initStrCd = initStrCd;
	param.yyyymm = yyyymm;
	param.mntncType = mntncType;
	
	$.ajax({
		url:'/VM1603retrieveCheckList',
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
							checkResult.mntncType	= mntncType;		// 점검 pk
							checkResult.startTime 	= item.now;			// 점검 시작시간
							checkResult.repairYn 	= 'N';				// 부품교체 여부
							checkResult.partGrpCd 	= item.partGrpCd;	// 부품그룹코드
						}
						if(item.seq.length == 8){
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
								"semsYn":item.semsYn				// sems 온도데이터 표시 여부
						}
						if(item.checkType === "M"){
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
							html += "			<select onChange='fn_VM1603CheckItem(\""+item.checkId+"\", this);'>";
							html += "				<option value = ''>선택</option>";
							html += "				<option value = 'Y' >정상</option>";
							html += "				<option value = 'defect' >불량</option>";
							html += "			</select>";
							html += "		</div>";
						}
						html += "	<td>";
						if(item.checkType != 'B'){
							html += "	<div class='btn_grp' id='noteBtn_"+item.checkId+"'><button type='button' id='note_"+item.checkId+"' class='mntnc_popup_open' onclick='javascript:fn_VM1603NotePop(\""+item.checkId+"\", \""+item.checkType+"\",\""+item.defaultNote+"\",\""+item.semsYn+"\");' >입력</button></div>";
							html += "	<div class='btn_grp' id='noteModBtn_"+item.checkId+"' style='display:none;'><button type='button' id='noteMod_"+item.checkId+"' class='mntnc_popup_open' onclick='javascript:fn_VM1603NoteModPop(\""+item.checkId+"\", \""+item.checkType+"\");' >수정</button></div>";
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
					fn_VM1603TempSave();	// checkResult가 변경되면 임시저장
				}
				$("#checkListArea").html(html);
				$("#checkListDiv").show();
				$("#operStatdiv").show();
				$("#repairYnDiv").show();
				$("#noteDiv").show();
				$("#startBtn").hide();
				$("#endBtn").show();
				
				fn_VM1603CheckboxChangeEvent();
			}else{
				alert("(조회실패) 다시 시도해주세요.")
			}
		}
	})
	//로컬스토리지 변수 삭제
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
	
		// 'BsTemp_'로 시작하는 변수인지 확인
		if (key.startsWith('BsTemp_')) {
			// '_'를 기준으로 분할하여 뒷부분 추출
			var suffix = key.split('_')[1];
	
			if (suffix !== initStrCd+'_'+mntncType) {
				localStorage.removeItem(key);
			}
		}
	}
}

//점검 유형 check box change event
function fn_VM1603CheckboxChangeEvent(){
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
			fn_VM1603TempSave();	// checkResult가 변경되면 임시저장
		});
	}
}

//점검 확인 버튼
function fn_VM1603CheckItem(id, _this){
	var index = checkResult.checkList.findIndex( item => item.id == id);
	checkResult.checkList[index].checkYn = $(_this).val();
	fn_VM1603TempSave();	// checkResult가 변경되면 임시저장
}

//입력 버튼
function fn_VM1603NotePop(id, checkType, defaultNote, semsYn){
	var html = "";
	showSemsTemp = 'N'

	if(checkType === 'M' || checkType === 'S' ){	// 주관식, 객관식
		html += "<h3>특이사항 :</h3>";
		html += "<textarea id='notes' cols='5' rows='5' placeholder='특이사항을 입력하세요' style='resize: none;'>";
		if(defaultNote && defaultNote != 'undefined')
			html += defaultNote;
		html += "</textarea>";

		if (id == 13) {
			if(semsYn && semsYn == 'Y'){
				var param = new Object;
				param.initStrCd 	= initStrCd;
				param.yyyymm 		= yyyymm;
				param.mntncType 	= mntncType;

				$('#viewLoadingDiv').show().fadeIn('fast');
				setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
					$.ajax({
						url:'/VM1603RetrieveSemsData',
						data:param,
						async: false,
						success:function(response){
							if(response.success){
								if (response.total > 0) {
									showSemsTemp = 'Y'
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

									$("#contentsArea").html(html);
								}
							}
						},
						complete: function(){
							$('#viewLoadingDiv').fadeOut();
						}
					})
				}, 1000);
			}
		}
	}else if(checkType === 'C'){					// 달력
		html += "<h3>달력 :</h3>";
		html += "<input type='text' id='calendar' oninput='calAutoHyphen(this)' maxlength='10' placeholder='ex)yyyy-mm-dd' style='width: 100%;' />";
		html += "<div class='errorMsg' id='calErrorMsg' style='display:none;'>날짜 형식에 맞게 입력해주세요.</div>";
	}
	$("#hCheckId").val(id);

	if (showSemsTemp = 'N') {
		$("#contentsArea").html(html);
	}

	$('#mntnc_popup').show();
}

// 수정버튼
function fn_VM1603NoteModPop(id, checkType){
	var html = "";
	var index = checkResult.checkList.findIndex( item => item.id == id);
	var note = checkResult.checkList[index].note;
	
	if(checkType === 'M' || checkType === 'S' ){	// 주관식, 객관식
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
function fn_VM1603SaveNote(){
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
	fn_VM1603TempSave();	// checkResult가 변경되면 임시저장
	$("#noteStr_" + id).text(html);							// 내용 칸에 특이사항 내용 입력
	// 특이사항 버튼  '입력' -> '수정' 변경
	$("#noteBtn_" + id).hide();
	$("#noteModBtn_" + id).show();
	
	if(typeof($('#mntnc_popup_close')) != "undefined") {
		$('#mntnc_popup_close').trigger('click');		// 팝업 닫기
	}
}

//전체 부품 리스트 조회
function fn_VM1603GetPartList(){
	var param = new Object;
	param.partGrpCd = checkResult.partGrpCd;
	
	$.ajax({
		url:'/VM1603GetPartList',
		data:param,
		async:false,
		success:function(response){
			let items = response.items;
			partList.paid = [];		// 유상부품	list
			partList.free = [];		// 무상부품 list
			
			partItems.paid = [];
			partItems.free = [];
			if(Array.isArray(response.items)){
				items.forEach( item => {
					if(item.seq.length == 4){
						item.children = [];
						item.value = item.partNm;
						item.label = item.partNm + "|" + item.partInitial
						if(item.partType == 'P'){
							// 유상 부품
							partList.paid.push(item);
							partItems.paid.push(item);
						}else if(item.partType == 'F'){
							// 무상 부품
							partList.free.push(item);
							partItems.free.push(item);
						}
					}else{
						let parent = [];
						if(item.partType == 'P'){
							parent = partList.paid;
							partItems.paid.push(item);
						}else if(item.partType == 'F'){
							parent = partList.free;
							partItems.free.push(item);
						}
						fn_VM603SetChildren(parent, item);
					}
				})
				
				var el = $("#part_1");
				fn_VM1603SetPartOptions(el, partList.paid);
				
				// 부품 검색
				$("#searchBox").autocomplete({
					source : partItems.paid,	// source 는 자동 완성 대상
					select : function(event, ui) {	//아이템 선택시
						if($("[id^=partDiv_]").length == 0 || $("option:selected",$("[id^=partDiv_]").last().children('select').last()).val()){
							// 마지막 부품 선택 select가 선택이 되어있으면 부품 추가
							fn_VM1603AddPart({partCd:ui.item.seq});
						}else{
							// 마지막 부품 선택 select가 선택이 안되있으면  그 자리에 setting
							let parts = [];
							if(ui.item.partType == 'F'){
								parts = partList.free;
							}else{
								parts = partList.paid;
							}
							// 마지막 부품 선택 select가 선택이 안되있으면  그 자리에 setting
							fn_VM1603SetPartOptions($("[id^=partDiv_]").last().children('select').first(), parts, {partCd:ui.item.seq});
						}
						
						// 선택 후 입력 창 비우기
						$(this).val("");
						event.preventDefault();
					},
					focus : function(event, ui) {	//포커스 가면
						return false;//한글 에러 잡기용도로 사용됨
					}
				}).autocomplete( "instance" )._renderItem = function( ul, item ) {
				//.autocomplete( "instance" )._renderItem 설절 부분이 핵심
					return $( "<li>" )	//기본 tag가 li로 되어 있음 
						.append( "<div>" + item.value + "</div>" )	//여기에다가 원하는 모양의 HTML을 만들면 UI가 원하는 모양으로 변함.
						.appendTo( ul );	//웹 상으로 보이는 건 정상적인 "김치 볶음밥" 인데 내부에서는 ㄱㅊㅂㅇㅂ,김치 볶음밥 에서 검색을 함.
				};
			}
		}
	})
}

//장애유형, 부품 array setting 재귀함수
function fn_VM603SetChildren(parentArray, childrenObj){
	var index = parentArray.findIndex( item => childrenObj.seq.indexOf(item.seq) == 0 );
	var value = (parentArray[index].value ? parentArray[index].value + '>' : '') + childrenObj.partNm;
	childrenObj.value = value;
	childrenObj.label = childrenObj.partNm + "|" + childrenObj.partInitial
	if( childrenObj.seq.length == parentArray[index].seq.length + 4){	// 뎁스 1차이는 seq길이 4차이
		// 다음 뎁스의 obj면 children에 저장
		childrenObj.children = [];
		parentArray[index].children.push(childrenObj);
	}else{
		// 뎁스 차이가 2이상 나면 재귀함수 호출
		fn_VM603SetChildren(parentArray[index].children, childrenObj);
	}
}

//부품 select box
function fn_VM1603SetPartOptions(el, array, obj){
	let elIdArr = $(el).attr('id').split('_');
	
	let html = '';
	html += '<option value="">선택</option>';
	// 데이터 확인 후 처리로 수정
	if( typeof(array) != "undefined" && array.length > 0 ) {
		array.forEach( item => {
			html += '<option value="'+item.seq+'"';
			if(item.partNo != 0){
				html += 'priceTarget="'+item.priceTargetGroup+'"';
				html += 'price="'+item.priceGroup+'"';
				html += 'partType="'+item.partType+'"';
				html += 'partGrpCd="'+item.partGrpCd+'"';
				html += 'partNo="'+item.partNo+'"';
			}
			html += '>'+item.partNm+'</option>';
		});
	}
	
	$(el).html(html);
	
	$(el).off();
	$(el).change(function(){
		$(this).nextAll('select').remove();	// 변경한 select의 하위 뎁스 select 삭제
		let index = array.findIndex( item => $(this).val() === item.seq);	// 선택한 유형의 index 찾기
		// 선택한 유형의 하위 뎁스가 있으면 select 생성
		if(index != -1 && array[index].children && array[index].children.length > 0){
			// 하위 뎁스 select 생성
			let newHtml = '';
			
			newHtml += '<select id="'+elIdArr[0]+'_'+(Number(elIdArr[1])+1)+'" style="width: calc(20% - 3px);">';
			newHtml += '</select>';
			$(el).after(newHtml);
			fn_VM1603SetPartOptions($(el).next('#'+elIdArr[0]+'_'+(Number(elIdArr[1])+1)), array[index].children, obj);
		}
		
		if($("option:selected", this).attr('priceTarget') != 'undefined'){
			VM1603UsedPart($("option:selected", this).attr('partno'));
			// 부품 선택시 구분 설정
			var target 		= $("#target option:selected").val();
			var prevTarget 	= $(this).siblings('[id^=partTarget_]').val();
			
			$(this).siblings('[id^=partTarget_]').val(target)
			$(this).siblings('[id^=partTagetText_]').text($("#target option:selected").text());
			
			if($(this).siblings('[id^=compareYn_]').val() == 'Y'){
				$('[id^=compareYn_]').val('Y');
			}
			fn_VM1603ComparePricePart($(this).siblings('[id^=compareYn_]'));	// 마지막 depth 선택 시 비용 표시
			
			if(target != prevTarget && prevTarget != ''){
				$("[id^=partTarget_]").each(function(){
					if($(this).val() == prevTarget){
						fn_VM1603ComparePricePart(this);
						return;
					}
				})
			}
		}
	})
	
	// 선택된 값이 있으면 setting
	if(obj){
		let index = array.findIndex( item => obj.partCd.indexOf(item.seq) == 0);
		if(index != -1){
			$(el).val(array[index].seq).change();
		}
	}
}

function VM1603UsedPart(partNo){
	let param = {
		strNm : strNm,
		partNo : partNo
	}
	
	$('#viewLoadingDiv').show().fadeIn('fast');
	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$.ajax({
			url:'/VM1603UsedPart',
			data:param,
			type:'POST',
			success:function(response){
				if(response.success){
					if(response.data){
						alert(strNm + "에서 6개월 이내에 해당 부품 교체 내역이 있습니다.");
					}
				}else{
					alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
				}
			},
			complete:function(){
				$('#viewLoadingDiv').fadeOut();
			}
		})
	}, 1000);
}

// 정기점검 비용 적용 규칙
function fn_VM1603MntncPriceRule(el, priceTargetArr, priceArr, thisTarget){
	if( priceTargetArr.length > 0) {
		// 출장비는 무조건 0원
		// 부품 당 수리비가 10000원 미만인 경우 수리비는 0원
		priceTargetArr.forEach( (priceTarget,i) => {
			if(priceTarget.indexOf(thisTarget) > -1){	// 선택한 구분에 대한 비용만 저장
				if(priceTarget.indexOf('part') > -1){	// 부품비
					$(el).siblings('[id^=partPrice_]').val(priceArr[i]);
				}else if(priceTarget.indexOf('repair') > -1){	// 수리비
					// 정기점검 수리비가 만원 미만이면 0원
					if(priceArr[i] >= 10000){
						$(el).siblings('[id^=repairPrice_]').val(priceArr[i]);
					}else{
						$(el).siblings('[id^=repairPrice_]').val(0);
					}
				}else if(priceTarget.indexOf('business') > -1){	// 출장비
					// 정기점검 출장비 무조건 0원
					$(el).siblings('[id^=businessPrice_]').val(0);
				}
			}
		})
	}
	
	fn_VM1603SumPricePart();	// 비용 표시
}

//부품 비용 합계
function fn_VM1603SumPricePart(){
	fn_VM1603InitPriceInput();
	var priceObj = {
			total:0
	};
	$("div[id^=partDiv_]").each(function(){
		var thisTarget = $(this).children('[id^=partTarget_]').val();		// 해당 부품의 선택된 구분
		var partPrice = $(this).children('[id^=partPrice]').val();			// 부품비
		var repairPrice = $(this).children('[id^=repairPrice]').val();		// 수리비
		var businessPrice = $(this).children('[id^=businessPrice]').val();	// 출장비
		
		// '구분' 부품비
		priceObj[thisTarget + '_' + 'part'] 	= Number( priceObj[thisTarget + '_' + 'part'] ? priceObj[thisTarget + '_' + 'part'] : 0 ) + Number(partPrice);
		// 부품비 총계
		priceObj['total_part']					= Number( priceObj['total_part'] ? priceObj['total_part'] : 0 ) + Number(partPrice);
		// '구분' 수리비
		priceObj[thisTarget + '_' + 'repair'] 	= Number( priceObj[thisTarget + '_' + 'repair'] ? priceObj[thisTarget + '_' + 'repair'] : 0 ) + Number(repairPrice);
		// 수리비 총계
		priceObj['total_repair'] 				= Number( priceObj['total_repair'] ? priceObj['total_repair'] : 0 ) + Number(repairPrice);
		// '구분' 출장비
		priceObj[thisTarget + '_' + 'business'] = Number( priceObj[thisTarget + '_' + 'business'] ? priceObj[thisTarget + '_' + 'business'] : 0 ) + Number(businessPrice);
		// 출장비 총계
		priceObj['total_business'] 				= Number( priceObj['total_business'] ? priceObj['total_business'] : 0 ) + Number(businessPrice);
		// 총 처리비용
		priceObj['totalPrice'] 					= Number( priceObj['totalPrice'] ? priceObj['totalPrice'] : 0 ) + Number(partPrice) + Number(repairPrice) + Number(businessPrice);
		
	})
	for(key in priceObj){
		$("#" + key).val(gfn_numberWithCommas(priceObj[key]));
	}
	
}

// 부품 추가 버튼
function fn_VM1603AddPart(obj){
	var flag = true;
	$("select[id^=part]").each(function(){
		if($("option:selected", this).val() == ""){
			flag = false;
		}
	})
	if(!flag){
		alert('이전 항목에 선택된 값이 없습니다.');
		return;
	}
	var el = $("#partDiv").children('div[id^=partDiv_]').last();
	var partIndex = Number((el.attr('id')).split('_')[1]) + 1;
	
	let parts = [];
	if($("#target").val() != 'maker'){
		parts = partList.paid;
	}else{
		parts = partList.free;
	}
	
	html = '';
	html += '<div class="inputBox" id="partDiv_'+partIndex+'">';
	html += '	<span id="partTagetText_'+partIndex+'" class="notification" style="width: calc(10% - 3px);">구분</span>';
	html += '	<select title="대분류" id="part_1" style="width: calc(15% - 3px);">';
	html += '		<option value="">선택</option>';
	parts.forEach( item => {
		html += "<option value='"+item.code+"'>"+item.contents+"</option>";
	})
	html += '	</select>';
	html += '	<input type="hidden" id="partTarget_'+partIndex+'"/>';
	html += '	<input type="hidden" id="partPrice_'+partIndex+'" 		value="0"/>';
	html += '	<input type="hidden" id="repairPrice_'+partIndex+'"		value="0"/>';
	html += '	<input type="hidden" id="businessPrice_'+partIndex+'"	value="0"/>';
	html += '	<input type="hidden" id="compareYn_'+partIndex+'"		value=""/>';
	html += '	<button type="button" onclick="fn_VM1603RemovePart(this)">삭제</button>';
	html += '</div>';
	
	el.after(html);
	
	var selectEl = $("#partDiv_"+partIndex).children("#part_1");
	fn_VM1603SetPartOptions(selectEl, parts, obj);
}

// 부품 제거 버튼
function fn_VM1603RemovePart(_this){
	if($(_this).parent().parent().children('div').length <= 2){
		// 부품이 한개인 경우
		$(_this).parent().parent().children('div').children('[id^=part_1]').val('').change();
		fn_VM1603InitPriceInput();
	}else{
		// 부품이 여러개인 경우
		$(_this).closest('div').detach();
		if($(_this).siblings('[id^=compareYn_]').val() == 'N'){
			// 수리비 + 출장비가 가장 큰값이 아니면 그냥 삭제 후 나머지 비용 더하기
			fn_VM1603SumPricePart();
		}else{
			// 수리비 + 출장비가 가장 큰값
			// 나머지 부품들로 비용 비교 후 비용 더하기
			fn_VM1603ComparePricePart(_this);
		}
	}
}

function fn_VM1603ComparePricePart(_this){
	// 부품 중 수리비 + 출장비가 가장 많은 부품
	var lgEl 				= $(_this).siblings('[id=part_4]');
	var lgTarget			= "";
	var lgPriceTargetArr	= new Array();
	var lgPriceArr			= new Array();
	var lgPrice 			= 0;
	
	// 객체 확인 후 처리로 수정
	if( typeof(lgEl) != "undefined" && lgEl != null ) {
		lgTarget = $(lgEl).siblings('[id^=partTarget_]').val();
		
		var lgPriceTargetTmp 	= $("option:selected", lgEl).attr('priceTarget');
		var lgPriceTmp 			= $("option:selected", lgEl).attr('price');
		// 데이터 확인 후 처리로 수정
		if( typeof(lgPriceTargetTmp) != "undefined" && typeof(lgPriceTmp) != "undefined"
			&& lgPriceTargetTmp.length > 0 && lgPriceTmp.length > 0 ) {
			
			lgPriceTargetArr = $("option:selected", lgEl).attr('priceTarget').split(',');
			lgPriceArr =  $("option:selected", lgEl).attr('price').split(',');
			
			var partIndex = lgPriceTargetArr.findIndex( item => item == lgTarget + '_' + 'part');
			$(lgEl).siblings('[id^=partPrice_]').val(lgPriceArr[partIndex]);
			
			// 같은 장비(중분류) 내의 복수의 부품을 교체한 경우에
			// 수리비+출장비가 가장 큰 값만 남기고 나머지는 0원
			$('select[id=part_4]').each(function(){
				// 중분류 같은 부품들 비교
				if($(this).val().substr(0 , 8) == $(lgEl).val().substr(0 , 8)){
					var compareTarget = $(this).siblings('[id^=partTarget_]').val();
					// 구분이 같은 부품 비교
					if(lgTarget == compareTarget){
						$(this).siblings('[id^=compareYn_]').val('');
						var comparePriceTargetArr 	= $("option:selected", this).attr('priceTarget').split(',');	// priceTarget 속성값 가져오기
						var comparePriceArr 		= $("option:selected", this).attr('price').split(',');			// price 속성값 가져오기
						
						var comparePrice = 0;
						var compareRepairIndex = comparePriceTargetArr.findIndex( item => item == compareTarget + '_' + 'repair');
						if(compareRepairIndex > -1){
							comparePrice += Number(comparePriceArr[compareRepairIndex]);
						}
						
						var compareBusinessIndex = comparePriceTargetArr.findIndex( item => item == compareTarget + '_' + 'business');
						if(compareBusinessIndex > -1){
							comparePrice += Number(comparePriceArr[compareBusinessIndex]);
						}
						
						// 수리비 + 출장비 비교
						if(lgPrice > comparePrice){
							// 비교 값이 작을 경우 비교 부품 수리비, 출장비 0원 저장
							$(this).siblings('[id^=compareYn_]').val('N');	// 다음 부터 비교 안함.
							$(this).siblings('[id^=repairPrice_]').val(0);
							$(this).siblings('[id^=businessPrice_]').val(0);
							
							$(lgEl).siblings('[id^=compareYn_]').val('Y');
						}else{
							$(lgEl).siblings('[id^=compareYn_]').val('N');	// 다음 부터 비교 안함.
							$(lgEl).siblings('[id^=repairPrice_]').val(0);
							$(lgEl).siblings('[id^=businessPrice_]').val(0);
							
							$(this).siblings('[id^=compareYn_]').val('Y');
							
							// 가장 큰값 변경
							lgEl = this;
							lgTarget = compareTarget;
							lgPriceTargetArr = comparePriceTargetArr;
							lgPriceArr = comparePriceArr;
							lgPrice = comparePrice;
						}
					}
				}
			})
		}
	}
	// 출장비는 무조건 0원
	// 부품 당 수리비가 10000원 미만인 경우 수리비는 0원
	fn_VM1603MntncPriceRule(lgEl, lgPriceTargetArr, lgPriceArr, lgTarget);
}

// 뒤로가기 버튼
function fn_VM1603Redirect() {
	$('#returnFrom').attr("action", "/VM1602Redirect");
	$("#returnFrom").submit();
}

// 정기점검 저장
function fn_VM1603Save(){
	if($("#operStat option:selected").val() == '해당없음'){
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
						$("#checkList_" + item.id).addClass('errorMsg')
						checkListvalidateFlag = false;
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
		if($("#ownerNm").val() === ""){
			alert("경영주확인란 항목을 입력해주세요");
			return;
		}
		var telRegExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
		if(!telRegExp.test($("#telNo").val())){
			alert("전화번호 항목을 입력해주세요");
			return;
		}
		
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
	$("#srcMntncType").val(mntncType);
	$("#srcOperStat").val($("#operStat option:selected").val());
	
	$("#startTime").val(checkResult.startTime);
	$("#partGrpCd").val(checkResult.partGrpCd);
	$("#checkList").val(JSON.stringify(rsltCheckList));
	
	if($("#repairYn").val() === "Y"){
		var selectedPart = [];
		$("div[id^=partDiv_]").each(function(i){
			var temp = {};
				
			temp.partCd 	= $(this).children('select').last().val();
			temp.partTarget = $(this).children('[id^=partTarget_]').val();
			temp.partGrpCd 	= $("option:selected", $(this).children('select').last()).attr('partgrpcd');
			temp.partType 	= $("option:selected", $(this).children('select').last()).attr('parttype');
			temp.partNo 	= $("option:selected", $(this).children('select').last()).attr('partno');
			temp.makerNm	= $("option:selected", $(this).children('#part_1')).text();
			temp.middleNm	= $("option:selected", $(this).children('#part_2')).text();
			temp.smallNm	= $("option:selected", $(this).children('#part_3')).text();
			temp.partNm		= $("option:selected", $(this).children('#part_4')).text();
			temp.priceList	= [
				{target : 'part', price : $(this).children('[id^=partPrice_]').val()},
				{target : 'repair', price : $(this).children('[id^=repairPrice_]').val()},
				{target : 'business', price : $(this).children('[id^=businessPrice_]').val()},
			]
			
			selectedPart.push(temp);
		})
		$("#selectedPart").val(JSON.stringify(selectedPart));
		
		$("#repairData").val(JSON.stringify($("#partRepairInputForm").serializeObject()));
	}
	// 이미지 압축
	fn_imgCompress();
	
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$("#inputForm").ajaxForm({
			type: "POST",
			cache: false,
			async: false,
			url:"/VM1603Save",
			enctype: "multipart/form-data",
			dataType : "json",
			success : function(response){
				if(response.success){
					if($("#operStat option:selected").val() == '해당없음'){
						fn_VM1603SendMessage(response.data);
					}
					localStorage.removeItem('BsTemp_'+initStrCd+'_'+mntncType);
					alert("저장되었습니다.");
					fn_VM1603Redirect();
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
function fn_VM1603SendMessage(smsUrls){
	if(($("#telNo").val()).split('-').join('') == '') {
		alert('전화번호를 입력해주세요.');
		return;
	}
	let param = {
		number 		: ($("#telNo").val()).split('-').join(''),	// 전화번호
		initStrCd 	: initStrCd, // viewStrCd
		yyyymm 		: yyyymm,
		type 		: mntncType,
		strNm		: strNm
	};
	fn_uptSemResLog(param);
	fnSendMessage(smsUrls[1], param, smsUrls[0] == undefined || smsUrls[0] == null ? '' : smsUrls[0]);
}

function fnSendMessage(smsUrl, param, nextUrl) {
	fn_uptSemReqLog(param);
	$.ajax({
		url: smsUrl + '/api/maintenance/survey',
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
		url: '/VM1603uptSemResLog',
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
		url: '/VM1603uptSemReqLog',
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
		url: '/VM1603uptAlgResLog',
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

//비용 관련 input 0으로 초기화
function fn_VM1603InitPriceInput(){
	$("#head_part,#head_repair,#head_business,#owner_part,#owner_repair,#owner_business,#maker_part,#maker_repair,#maker_business,#total_part,#total_repair,#total_business, #totalPrice").val(0);
}

$('#toggle').click(function() {
	$('#agreement').toggle();
	if($(this).text()=='자세히 ▼'){
		$(this).text('자세히 ▲');
	}else{
		$(this).text('자세히 ▼');
	}
});