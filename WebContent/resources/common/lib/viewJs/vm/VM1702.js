let errorTypeList = [];		// 장애유형 list
let partList = {};			// 부품 array
let partItems = {};			// 부품 item( 초성검색 전용 )
let signature;
var initFlag = false;

$(function(){
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
	
	$("#cancel_popup").popup();
	
	// 담당기사 목록 조회
	fn_VM1702RetrieveVendorUserList($('#vendorCd').val());
	
	// 장애유형 조회
	fn_VM1702RetrieveErrorType();
	// 처리내용 유형 조회
	fn_VM1702RetrieveResolveCd('1');
	// 파라미터 setting
	fn_VM1702SetParamData();
	// tabCd에 따라 보여지는 form setting
	fn_VM1702SetForm();
	// 담당기사 정보 세팅
	fn_VM1702RetriveVendorUser();
	// Android/iOS OS 별 file 기본 동작 처리
	setOSDefault();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

// 장애유형 조회
function fn_VM1702RetrieveErrorType(){
	$.ajax({
		url:'/VM1702RetrieveErrorType',
		async:false,
		success:function(response){
			let items = response.items;
			if(Array.isArray(items)){
				items.forEach( item => {
					if(item.seq.length == 4){
						item.children = [];
						errorTypeList.push(item);
					}else{
						fn_VM1702SetChildren(errorTypeList, item);
					}
				})
			}
		}
	})
}

// 
function fn_VM1702RetrieveResolveCd(index, parentCd, parentType){
	let param = new Object();
	param.depth = index;
	param.parentCd = parentCd;
	param.parentType = parentType;
	
	$.ajax({
		url:'/VM1702RetrieveResolveCd',
		async:false,
		data:param,
		success:function(response){
			let html = '';
			let title = '';
			switch(index + ""){
				case '1':
					title = '집기명'; break;
				case '2':
					title = '제조사'; break;
				case '3':
					title = '불량내용'; break;
				case '4':
					title = '불량원인'; break;
				case '5':
					title = '처리내용'; break;
			}
			$("#resolveCdText_" + index).text(title);
			html += '<option value="">'+title+' 선택</option>';
			if(Array.isArray(response.items)){
				response.items.forEach(item => {
					html += '<option value="'+item.resolveCd+'" type="'+item.resolveType+'">'+item.resolveNm+'</option>';
				})
			}
			$("#resolveCd_"+index).html(html);
			
			if(index != '5'){
				$("#resolveCd_"+index).off();
				$("#resolveCd_"+index).on('change', function(){
					$(this).nextAll().remove();
					
					fn_VM1702ChangeResolveCd($(this), index, $(this).val(), $("option:selected", this).attr('type'));
				})
			}
		}
	})
}

function fn_VM1702ChangeResolveCd(el, index, parentCd, parentType){
	let html = "";
	let nextIndex = Number(index) + 1;
	
	html += '<span id="resolveCdText_'+nextIndex+'" class="notification" style="width: calc(13% - 3px);"></span>';
	html += '<select id="resolveCd_'+nextIndex+'" title="처리내용 선택" style="width: calc(87% - 3px);"></select>';
	$(el).after(html);
	
	fn_VM1702RetrieveResolveCd(nextIndex, parentCd, parentType);
}

//전체 부품 리스트 조회
function fn_VM1702GetPartList(){
	var param = new Object;
	param.asNo 		= asNo;
	param.partGrpCd = partGrpCd;
	
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
			
			if (Array.isArray(items)){
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
						fn_VM1702SetChildren(parent, item);
					}
				})
				
				var el = $("#part_1");
				fn_VM1702SetPartOptions(el, partList.paid);
				
				// 부품 검색
				$("#searchBox").autocomplete({
					source : partItems.paid,	// source 는 자동 완성 대상
					select : function(event, ui) {	//아이템 선택시
						if($("[id^=partDiv_]").length == 0 || $("option:selected",$("[id^=partDiv_]").last().children('select').last()).val()){
							// 마지막 부품 선택 select가 선택이 되어있으면 부품 추가
							fn_VM1702AddPart({partCd:ui.item.seq});
						}else{
							// 마지막 부품 선택 select가 선택이 안되있으면  그 자리에 setting
							let parts = [];
							if(ui.item.partType == 'F'){
								parts = partList.free;
							}else{
								parts = partList.paid;
							}
							fn_VM1702SetPartOptions($("[id^=partDiv_]").last().children('select').first(), parts, {partCd:ui.item.seq});
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
function fn_VM1702SetChildren(parentArray, childrenObj){
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
		fn_VM1702SetChildren(parentArray[index].children, childrenObj);
	}
}

//장애유형
function fn_VM1702SetErrorTypeOptions(el, array, code){
	let elIdArr = ($(el).attr('id')).split('_');
	let target = elIdArr[0];
	let depth = elIdArr[1];
	
	let html = '';
	html += '<option value="">선택</option>';
	array.forEach( item => {
		html += '<option value="'+item.seq+'"';
		if(item.emergencyLevel){
			html += 'level="'+item.emergencyLevel+'"' ;
		}
		html += '>'+item.contents+'</option>';
	});
	$(el).html(html);
	
	$(el).off();
	$(el).change(function(){
		$(this).nextAll().remove();	// 변경한 select의 하위 뎁스 select 삭제
		let index = array.findIndex( item => $(this).val() === item.seq);	// 선택한 유형의 index 찾기
		// 선택한 유형의 하위 뎁스가 있으면 select 생성
		if(index != -1 && array[index].children && array[index].children.length > 0){
			// 하위 뎁스 select 생성
			let newHtml = '';
			newHtml += '<select id="'+target+'_'+(Number(depth)+1)+'">';
			newHtml += '</select>';
			$(el).after(newHtml);
			fn_VM1702SetErrorTypeOptions($('#'+target+'_'+(Number(depth)+1)), array[index].children, code);
		}
		// 긴급도 변경
		if($('option:selected',this).attr('level')){
			$("#emergencyLevel").val($('option:selected',this).attr('level')).change();
		}
	})
	
	// 선택된 값이 있으면 setting
	if(code){
		let index = array.findIndex( item => code.indexOf(item.seq) == 0);
		if(index != -1){
			$(el).val(array[index].seq).change();
		}
	}
}

// 부품 select box
function fn_VM1702SetPartOptions(el, array, obj){
	let elIdArr = $(el).attr('id').split('_');
	
	let html = '';
	html += '<option value="">선택</option>';
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
			fn_VM1702SetPartOptions($(el).next('#'+elIdArr[0]+'_'+(Number(elIdArr[1])+1)), array[index].children, obj);
		}
		
		if($("option:selected", this).attr('pricetarget') != 'undefined'){
			fn_VM1702UsedPart($("option:selected", this).attr('partno'));
			// 부품 선택시 구분 설정
			var target 		= $("#target option:selected").val();
			var prevTarget 	= $(this).siblings('[id^=partTarget_]').val();
			$(this).siblings('[id^=partTarget_]').val(target)
			$(this).siblings('[id^=partTagetText_]').text($("#target option:selected").text());
			
			if($(this).siblings('[id^=compareYn_]').val() == 'Y'){
				$('[id^=compareYn_]').val('Y');
			}
			fn_VM1702ComparePricePart($(this).siblings('[id^=compareYn_]'));	// 마지막 depth 선택 시 비용 표시
			
			if(target != prevTarget && prevTarget != ''){
				$("[id^=partTarget_]").each(function(){
					if($(this).val() == prevTarget){
						fn_VM1702ComparePricePart(this);
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

function fn_VM1702UsedPart(partNo){
	let param = {
		strNm : $("#strNm").val(),
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
						alert(param.strNm + "에서 6개월 이내에 해당 부품 교체 내역이 있습니다.");
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

//부품 비용 setting
function fn_VM1702SetPricePart(el){
	var priceTargetArr 	= $("option:selected", el).attr('priceTarget').split(',');	// priceTarget 속성값 가져오기
	var priceArr 		= $("option:selected", el).attr('price').split(',');		// price 속성값 가져오기
	var thisTarget 		= $(el).siblings('[id^=partTarget_]').val();				// 해당 부품의 선택된 구분
	
	var elPrice = 0;
	var repairIndex = priceTargetArr.findIndex( item => item == thisTarget + '_' + 'repair');
	if(repairIndex > -1){
		elPrice += Number(priceArr[repairIndex]);
	}
	
	var businessIndex = priceTargetArr.findIndex( item => item == thisTarget + '_' + 'business');
	if(businessIndex > -1){
		elPrice += Number(priceArr[businessIndex]);
	}
	
	// 같은 장비(중분류) 내의 복수의 부품을 교체한 경우에
	// 수리비+출장비가 가장 큰 값만 남기고 나머지는 0원
	$('[id=part_4]').each(function(){
		if($(this).siblings('[id^=compareYn_]').val() != 'N'){
			if(el != this){	// 현재 선택한 부품과 같은 행은 비교 X
				// 중분류 같은 부품들 비교
				if($(this).val().substr(0 , 8) == $(el).val().substr(0 , 8)){
					var compareTarget = $(this).siblings('[id^=partTarget_]').val();
					// 구분이 같은 부품 비교
					if(thisTarget == compareTarget){
						var comparePriceTargetArr 	= $("option:selected", this).attr('priceTarget').split(',');	// priceTarget 속성값 가져오기
						var comparePriceArr 		= $("option:selected", this).attr('price').split(',');		// price 속성값 가져오기
						
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
						if(elPrice > comparePrice){
							// 비교 값이 작을 경우 비교 부품 수리비, 출장비 0원 저장
							$(this).siblings('[id^=compareYn_]').val('N');	// 다음 부터 비교 안함.
							$(this).siblings('[id^=repairPrice_]').val(0);
							$(this).siblings('[id^=businessPrice_]').val(0);
							
							$(el).siblings('[id^=compareYn_]').val('Y');
						}else{
							// 현재 값이 작을 경우 현재 수리비, 출장비 0원 저장
							$(el).siblings('[id^=compareYn_]').val('N');	// 다음 부터 비교 안함.
							priceArr[repairIndex] = 0;
							priceArr[businessIndex] = 0;
							
							$(this).siblings('[id^=repairPrice_]').val(comparePriceArr[compareRepairIndex]);
							$(this).siblings('[id^=businessPrice_]').val(comparePriceArr[compareBusinessIndex]);
							
							$(this).siblings('[id^=compareYn_]').val('Y');
						}
					}
				}
			}
		}
	})
	priceTargetArr.forEach( (priceTarget,i) => {
		if(priceTarget.indexOf(thisTarget) > -1){	// 선택한 구분에 대한 비용만 저장
			if(priceTarget.indexOf('part') > -1){	// 부품비
				$(el).siblings('[id^=partPrice_]').val(priceArr[i]);
			}else if(priceTarget.indexOf('repair') > -1){	// 수리비
				$(el).siblings('[id^=repairPrice_]').val(priceArr[i]);
			}else if(priceTarget.indexOf('business') > -1){	// 출장비
				$(el).siblings('[id^=businessPrice_]').val(priceArr[i]);
			}
		}else{
			if(priceTarget.indexOf('part') > -1){	// 부품비
				$(el).siblings('[id^=partPrice_]').val(0);
			}else if(priceTarget.indexOf('repair') > -1){	// 수리비
				$(el).siblings('[id^=repairPrice_]').val(0);
			}else if(priceTarget.indexOf('business') > -1){	// 출장비
				$(el).siblings('[id^=businessPrice_]').val(0);
			}
		}
	})
	
	fn_VM1702SumPricePart();
}

// 부품 추가 버튼
function fn_VM1702AddPart(obj){
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
	if($("#tabCd").val() != 'Y'){
		html += '	<button type="button" onclick="fn_VM1702RemovePart(this)">삭제</button>';
	}
	html += '</div>';
	
	el.after(html);
	
	var selectEl = $("#partDiv_"+partIndex).children("#part_1");
	fn_VM1702SetPartOptions(selectEl, parts, obj);
}

//부품 삭제 버튼
function fn_VM1702RemovePart(_this){
	if($(_this).parent().parent().children('div').length <= 2){
		// 부품이 한개인 경우
		$(_this).parent().parent().children('div').children('[id=part_1]').val('').change();
		fn_VM1702InitPriceInput();
	}else{
		// 부품이 여러개인 경우
		$(_this).closest('div').detach();
		if($(_this).siblings('[id^=compareYn_]').val() == 'N'){
			// 수리비 + 출장비가 가장 큰값이 아니면 그냥 삭제 후 나머지 비용 더하기
			fn_VM1702SumPricePart();
		}else{
			// 수리비 + 출장비가 가장 큰값
			// 나머지 부품들로 비용 비교 후 비용 더하기
			fn_VM1702ComparePricePart(_this);
		}
	}
}

function fn_VM1702ComparePricePart(_this){
	// 부품 중 수리비 + 출장비가 가장 많은 부품
	var lgEl = $(_this).siblings('[id=part_4]');
	var lgTarget = $(lgEl).siblings('[id^=partTarget_]').val();
	
	var lgPriceTargetStr = $("option:selected", lgEl).attr('priceTarget');
	if(lgPriceTargetStr == undefined || lgPriceTargetStr == null){
		return;
	}
	var lgPriceTargetArr = $("option:selected", lgEl).attr('priceTarget').split(',');
	var lgPriceArr = $("option:selected", lgEl).attr('price').split(',');
	var lgPrice = 0;
	
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
				var comparePriceArr 		= $("option:selected", this).attr('price').split(',');		// price 속성값 가져오기
				
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
	lgPriceTargetArr.forEach( (priceTarget,i) => {
		if(priceTarget.indexOf(lgTarget) > -1){	// 선택한 구분에 대한 비용만 저장
			if(priceTarget.indexOf('part') > -1){	// 부품비
				$(lgEl).siblings('[id^=partPrice_]').val(lgPriceArr[i]);
			}else if(priceTarget.indexOf('repair') > -1){	// 수리비
				$(lgEl).siblings('[id^=repairPrice_]').val(lgPriceArr[i]);
			}else if(priceTarget.indexOf('business') > -1){	// 출장비
				// 정기점검 출장비 무조건 0원
				$(lgEl).siblings('[id^=businessPrice_]').val(lgPriceArr[i]);
			}
		}
	})
	
	fn_VM1702SumPricePart();
}

// 부품 비용 합계
function fn_VM1702SumPricePart(){
	fn_VM1702InitPriceInput();
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

//비용 관련 input 0으로 초기화
function fn_VM1702InitPriceInput(){
	$("#head_part,#head_repair,#head_business,#owner_part,#owner_repair,#owner_business,#maker_part,#maker_repair,#maker_business,#total_part,#total_repair,#total_business, #totalPrice").val(0);
}

// 가공이 필요한 pageParam 데이터 setting
function fn_VM1702SetParamData(){
	// 접수번호
	$("#asNo").val(asNo);
	
	// 장애유형
	let el = $("#errorType_1")
	fn_VM1702SetErrorTypeOptions(el, errorTypeList, errorType);
	
	// 긴급도
	$("#emergencyLevel").val(emergencyLevel).change();
}

//냉장비업체 담당기사 리스트 조회
function fn_VM1702RetrieveVendorUserList(vendorCd){
	var optionsHtml = "";
	optionsHtml += "<option value=''>선택</option>";
	if(vendorCd){
		var param = new Object();
		param.vendorCd = vendorCd;
		
		// ABS 담당자 목록 조회. (이름 's'자로 끝나는 사용자)
		$.ajax({
			url:"/VM1703RetrieveVendorUserList",
			data: param,
			async: false,
			dataType: "json",
			success:function(response){
				response.items.forEach( item => {
					if(item.userId == vendorUserId)
						optionsHtml += "<option value='"+item.userId+"' selected>"+item.userNm+"</option>";
					else
						optionsHtml += "<option value='"+item.userId+"'>"+item.userNm+"</option>";
				})
			}
		})
	}
	$("#vendorUser").html(optionsHtml);
	$("#vendorUser").change(); // 담당기사 정보() 세팅
	
	// 미확인 상태가 아닐 경우 : 담당기사 변경 불가
	if($('#tabCd').val() != 'U') {
		$("#vendorUser").hide(); // 담당기사 선택 불가
		$("#vendorUserNm").show(); // 지정된 담당기사 이름 표시
	}
}

function fn_VM1702SetForm(){
	var tabCd = $("#tabCd").val();
	if(tabCd === 'U'){
		// 미확인에서 접근
		// 확인, 기사변경, 접수취소 버튼 표시
		$("#resolveBtn, #modifyBtn").hide();
		$("#checkBtn, #changeBtn, #cancelBtn").show();
		$("#resolveSection, #saveTempBtn").hide();
	}else if(tabCd === 'S'||tabCd === 'O'){
		// 예정에서 접근
		let vUserId=$("#vendorUserId").val();
		let nowUserId=$("#userId").val();
		//담당기사, 로그인 유저 비교		
		if(vUserId != nowUserId){
			$("#resolveBtn, #modifyBtn, #checkBtn, #cancelBtn").hide();
			$("#partSeachDiv").hide();
			$("#resolveSection").children().hide();
			$("#subNoteSection").show();
			$("#changeBtn, #saveTempBtn").show();
			if(tabCd=='O'){
				retrieveTempAs(asNo);
			}
		}else{
			// 현재 사용자와 담당기사 같으면 기사변경 버튼 hide
			$("#checkBtn, #changeBtn").hide();
			// 수정, 처리완료, 접수취소 버튼 표시
			$("#resolveBtn, #modifyBtn, #cancelBtn, #saveTempBtn").show();
			$("#resolveSection").show();
			$("#imgSection").show();
			$("#partAddBtn, #partRemoveBtn").show();
			$("#partSeachDiv").show();
			fn_VM1702GetPartList(); // 부품리스트 조회
			fn_VM1702SetSignPad();	// 서명 항목 setting
			if(tabCd=='O'){
				retrieveTempAs(asNo);
			}
			// 경영주서명거부, 전화설명 check event
			$("#ownerSignYnChk, #visitYnChk").click(function(){
				var id = $(this).attr('id');
				if(id == 'ownerSignYnChk'){
					$("#visitYnChk").attr('checked', false);	// 전화설명 체크 해제
				}else{
					$("#ownerSignYnChk").attr('checked', false);	// 경영주서명거부 체크 해제
				}
				
				// 둘 중 하나라도 체크 되있으면 sign 막기
				var ownerSignYn = $("#ownerSignYnChk").attr('checked');
				var visitYn = $("#visitYnChk").attr('checked');
				if (ownerSignYn || visitYn) {
					// pad 그리기 막기
					signature.clear();
					signature.off();
				} else {
					// pad 그리기 허용
					signature.on();
				}
			})
		}
	}else if(tabCd === 'Y'){
		// 처리완료에서 접근
		// 모든 버튼 표시X
		$("#checkBtn, #resolveBtn, #modifyBtn, #changeBtn, #cancelBtn").hide();
		$("#resolveSection").show();	// 조치내역 영역
		$("#imgSection").hide();		// 경영주 확인, 이미지 영역
		$("#partAddBtn, #partRemoveBtn, #saveTempBtn").hide();		// 부품 추가, 삭제 버튼
		
		fn_VM1702RetriveResolve();	// AS 처리 데이터 조회
		
		// 처리완료된 AS건은 수정 불가
		$("#inputForm, #inputForm2").children().children(".form_row").each(function(){
			$(this).children(".inputBox").children("input").attr("readonly", true);
			$(this).children(".inputBox").children("select").attr("disabled", true);
			$(this).children(".inputBox").children("textarea").attr("readonly", true);
		})
	}
}

function fn_VM1702RetriveVendorUser() {
	// 나에게 접수 체크박스
	if($('#toMeChk').is(':checked')){
		$('#toMe').val('Y');
	}else{
		$('#toMe').val('N');
	}
	
	// 나에게 접수 change event
	$("#toMeChk").click(function(){
		if ($(this).attr('checked')) {
			// 체크 시 현재 계정 선택
			$("#vendorUser").val(userId).change();
		}
	})
	
	$("#vendorUser").change(function() {
		$('#vendorUserId').val($(this).val());
		$('#vendorUserNm').val($(this).find('option:selected').text());
		
		if($('#toMeChk').attr('checked')) {
			if($(this).val() != userId) {
				// '나에게 접수' 체크되어있으면
				$('#toMeChk').attr('checked', false); // 리셋
			}
		}
	});
}

// AS 처리 데이터 조회
function fn_VM1702RetriveResolve(){
	var param = new Object();
	param.asNo = asNo;
	
	$.ajax({
		url:'/VM1702RetriveResolve',
		data:param,
		async:false,
		success:function(response){
			var data = response.data;
			if(data){
				Object.keys(data).forEach(item => {
					if(item === 'partList'){
						if(data.applyFlag != 'Y'){
							fn_VM1702GetPartList(); 	// 부품리스트 조회
							
							for(var i=0; i<data.partList.length; i++){
								if(i>0){
									// 2번째 부터 부품 select 추가
									fn_VM1702AddPart();
								}
								var el = $("#partDiv_" + (i+1)).children("#part_1");
								
								let parts = [];
								if(data.partList[i].partType == 'P'){
									parts = partList.paid;
								}else{
									parts = partList.free;
								}
								fn_VM1702SetPartOptions(el, parts, data.partList[i]);
							}
						}else{
							var html = '<h3>부품명</h3>';
							for(var i=0; i<data.partList.length; i++){
								var item = data.partList[i];
								html += '<div class="inputBox" id="partDiv_'+i+'">';
								if(item.partCd != ""){
									html += '	<span class="notification" style="width: calc(10% - 3px);">';
									if(item.partTarget == 'head'){
										html += '본부';
									}else if(item.partTarget == 'owner'){
										html += '경영주';
									}else if(item.partTarget == 'maker'){
										html += '제조사무상';
									}
									html += '	</span>';
									html += '	<select title="대분류" style="width: calc(15% - 3px);"><option>'+item.makerNm+'</option></select>';
									html += '	<select style="width: calc(20% - 3px);"><option>'+item.middleNm+'</option></select>';
									html += '	<select style="width: calc(20% - 3px);"><option>'+item.smallNm+'</option></select>';
									html += '	<select style="width: calc(20% - 3px);"><option>'+item.partNm+'</option></select>';
									html += '	<input type="hidden" id="partTarget_'+i+'"		value="'+item.partTarget+'"/>';
									html += '	<input type="hidden" id="partPrice_'+i+'"		value="'+item.partPrice+'"/>';
									html += '	<input type="hidden" id="repairPrice_'+i+'"		value="'+item.repairPrice+'"/>';
									html += '	<input type="hidden" id="businessPrice_'+i+'"	value="'+item.businessPrice+'"/>';
								}else{
									html += '	<span class="notification" style="width: calc(10% - 3px);">구분</span>';
									html += '	<select title="대분류" style="width: calc(15% - 3px);"><option>선택</option></select>';
									html += '	<input type="hidden" id="partTarget_'+i+'"		value="0"/>';
									html += '	<input type="hidden" id="partPrice_'+i+'"		value="0"/>';
									html += '	<input type="hidden" id="repairPrice_'+i+'"		value="0"/>';
									html += '	<input type="hidden" id="businessPrice_'+i+'"	value="0"/>';
								}
								html += '</div>';
							}
							
							$("#partDiv").html(html);
							fn_VM1702SumPricePart();
						}
					}else if(item === 'target'){
						$("#target").val(data[item]).change();
						$("#maker").val(data['makerCd']).change();
					}else if(item === 'resolveCdText'){
						let resolveCdArr = data.resolveCdText.split('|');
						let html = "";
						resolveCdArr.forEach( (item, i) => {
							if(item == "") return;
							
							let title = '';
							switch(i){
								case 0:title = '집기명'; break;
								case 1:title = '제조사'; break;
								case 2:title = '불량내용'; break;
								case 3:title = '불량원인'; break;
								case 4:title = '처리내용'; break;
							}
							
							html += '<span class="notification" style="width: calc(13% - 3px);">'+title+'</span>';
							html += '<select title="처리내용 선택" style="width: calc(87% - 3px);"><option>'+item+'</option></select>';
						})
						$("#resolveCdText").nextAll().remove();
						$("#resolveCdText").after(html);
					}else{
						$("#"+item).val(data[item]);
					}
				})
			}
		}
	})
}

function fn_VM1702SetSignPad(){
	// 서명
	var canvas = $("#signature")[0];
	signature = new SignaturePad(canvas, {
		minWidth : 2,
		maxWidth : 2,
		penColor : "rgb(0, 0, 0)",
	});
	
	// 서명 clear 버튼
	$("#clear").off();
	$("#clear").on("click", function() {
		signature.clear();
	});
	
	// 서명란 터치 시 키보드 생성 막기
	canvas.addEventListener("touchstart", fn_VM1702TouchStart, false);
	function fn_VM1702TouchStart(e){
		e.preventDefault();
		$('input[type=text], textarea').blur();
	}
}

// 확인 버튼
function fn_VM1702CheckAs(){
	if($("#vendorUserId").val() == ""){
		alert("담당기사 할당 후에 진행해주세요.")
		return;
	}
	
	if(!confirm("해당 AS건을 확인하셨습니까?")){
		return;
	}
	
	var errorTypeCd = $("[id^='errorType_']").last();
	if($(errorTypeCd).val() == ""){
		alert("장애유형을 선택해주세요.");
		$(errorTypeCd).focus();
		return;
	}
	$("#errorTypeCd").val($(errorTypeCd).val());
	var errorType = '';
	$("[id^=errorType_").each(function(){
		if(errorType.length > 0) errorType += '>';
		errorType += $('option:selected',this).text();
	})
	$("#errorType").val(errorType);
	
	
	let formData = $("#inputForm").serialize();
	
	$.ajax({
		url:'/VM1702Check/' + asNo,
		type:'POST',
		data:formData,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM1702Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

// 기사변경 버튼
function fn_VM1702ChangeAs(){//기사변경
	
	if(!confirm("해당 AS건 기사를 변경하시겠습니까?")){
		return;
	}
	
	$.ajax({
		url:'/VM1702Change/' + asNo,
		type:'POST',
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM1702Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

// 처리완료 버튼
function fn_VM1702resoveAs(){
	var flag = true;
	if($("option:selected", $("#partDiv_1").children("#part_1")).val() != ""){
		$("select[id^=part]").each(function(){
			if($("option:selected", this).val() == ""){
				flag = false;
			}
		})
		if(!flag){
			alert('부품선택을 완료해주세요.');
			return;
		}
	}
	
	var resolveText = '';
//	let resolveFlag = false;
	$("select[id^=resolveCd_]").each( function(i){
//		if($(this).val() == ""){
//			alert('처리내용을 선택해주세요.');
//			$(this).focus();
//			resolveFlag = true;
//			return;
//		}
		if($(this).val() != ''){
			resolveText += $("option:selected", this).text();
			if($("select[id^=resolveCd_]").length > (i + 1)){
				resolveText += '|';
			}
		}
	})
//	if(resolveFlag) return;
	
	if($("#resolveNote").val() == ""){
		alert('처리내용을 입력해주세요.');
		$("#resolveNote").focus();
		return;
	}
	
	if($("#ownerNm").val() == ""){
		alert('경영주확인을 입력해주세요.');
		$("#ownerNm").focus();
		return;
	}
	if($("#ownerTelNo").val() == ""){
		alert('경영주전화번호를 입력해주세요.');
		$("#ownerTelNo").focus();
		return;
	}
	if(!$('#ownerSignYnChk').is(':checked') && !$('#visitYnChk').is(':checked')){
		if(signature.isEmpty()) {
			alert("서명 항목을 입력해주세요.");
			return;
		}else{
			var data = signature.toDataURL("image/png");
			$("#file0url").val(data);
		}
		$('#ownerSignYn').val('Y');// 서명이미지가 있으면 'Y'
	}else{
		// 서명이미지가 없으면 체크 확인
		if($('#ownerSignYnChk').is(':checked')){
			$('#ownerSignYn').val('Y');
		}else if($('#visitYnChk').is(':checked')){
			$('#ownerSignYn').val('P');
		}
	}
	if(!$("#agreeYnChk").is(':checked')){
		alert("개인정보 수집 약관에 동의해주세요");
		$("#agreeYn").val('N');
		return;
	}else{
		$("#agreeYn").val('Y')
	}
	
	// 선택한 부품 => 마지막 뎁스 부품 코드만 저장
	let partArray = [];
	$("#partDiv").children("[id^=partDiv_]").each(function(){
		var temp = {};
		let el 			= $(this).children("[id^=part_]").last();
		temp.partCd 	= $("option:selected", el).val();
		temp.partTarget = $(this).children("[id^=partTarget_]").val();
		temp.partGrpCd 	= $("option:selected", el).attr('partgrpcd');
		temp.partType 	= $("option:selected", el).attr('parttype');
		temp.partNo 	= $("option:selected", el).attr('partNo');
		temp.makerNm	= $("option:selected", $(this).children('#part_1')).text();
		temp.middleNm	= $("option:selected", $(this).children('#part_2')).text();
		temp.smallNm	= $("option:selected", $(this).children('#part_3')).text();
		temp.partNm		= $("option:selected", $(this).children('#part_4')).text();
		temp.priceList	= [
			{target : 'part', price : $(this).children('[id^=partPrice_]').val()},
			{target : 'repair', price : $(this).children('[id^=repairPrice_]').val()},
			{target : 'business', price : $(this).children('[id^=businessPrice_]').val()},
		]
		
		partArray.push(temp);
	})
	$("#partJson").val(JSON.stringify(partArray));
	let resolveCd = "";
	if($("#resolveCd_5").val()){
		resolveCd = $("#resolveCd_2").val() + $("#resolveCd_5").val();
	}
	$("#resolveCd").val(resolveCd);
	$("#resolveCdText").val(resolveText);
	
	// 이미지 압축
	fn_imgCompress();
	
	$('#viewLoadingDiv').show().fadeIn('fast');
	setTimeout(function() {	// setTimeout 함수를 써야 로딩이미지 보임.
		$.ajax({
			url:'/VM1702Resolve/' + asNo,
			type:'POST',
			data:$('#inputForm2').serialize(),
			success:function(response){
				if(response.success){
					fn_VM1702SendMessage(response.data);
					alert("저장되었습니다.");
					fn_VM1702Redirect();
				}else{
					alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
				}
			},
			error : function (e){
				$("body").html(e.responseText);
			},
			complete:function(){
				$('#viewLoadingDiv').fadeOut();
			}
		})
	}, 0);
}

//만족도 조사 문자 발송
function fn_VM1702SendMessage(smsUrls){
	if(($("#ownerTelNo").val()).split('-').join('') == '') {
		alert('전화번호를 입력해주세요.');
		return;
	}
	
	let param = {
		number 		: ($("#ownerTelNo").val()).split('-').join(''),	// 전화번호
		asNo 		: asNo,
		strNm		: $('#strNm').val()
	};
	fn_uptSemResLog(param.asNo);
	fnSendMessage(smsUrls[1], param, smsUrls[0] == undefined || smsUrls[0] == null ? '' : smsUrls[0]);
}

function fnSendMessage(smsUrl, param, nextUrl) {
	fn_uptSemReqLog(param);
	$.ajax({
		url: smsUrl + '/api/as/survey',
		data: JSON.stringify(param),
		type: 'POST',
		cache: false,
		async: false,
		contentType: 'application/json',
		success: function(response) {
			fn_uptAlgResLog(param.asNo, response);
		},
		error : function(error, textStatus, message) {
			let responseText = error.responseText == undefined || error.responseText == null || error.responseText == '' ? '' : JSON.parse(error.responseText);
			
			if(nextUrl != '') // 다음 url 있으면 재시도
				fnSendMessage(nextUrl, param, '');
			else{
				let errResponse={code : "-98", message: "서버 다운"}
				fn_uptAlgResLog(param.asNo, errResponse);
			}
		},
	});
}

//log
function fn_uptSemResLog(){
	$.ajax({
		url: '/VM1702uptSemResLog/'+asNo,
		type: 'POST',
		async:false
	});
}
function fn_uptSemReqLog(param){
	$.ajax({
		url: '/VM1702uptSemReqLog/'+param.asNo,
		data: param,
		type: 'POST',
		async:false
	});
}
function fn_uptAlgResLog(asNo, response){
	var param = new Object();
	param.aligoRes = JSON.stringify(response);
	$.ajax({
		url: '/VM1702uptAlgResLog/'+asNo,
		data: param,
		type: 'POST',
		async:false
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

// 수정 버튼
function fn_VM1702ModifyAs(){
	if($("#vendorUserId").val() == ""){
		alert("담당기사 할당 후에 진행해주세요.")
		return;
	}
	
	var errorTypeCd = $("[id^='errorType_']").last();
	if($(errorTypeCd).val() == ""){
		alert("장애유형을 선택해주세요.");
		$(errorTypeCd).focus();
		return;
	}
	$("#errorTypeCd").val($(errorTypeCd).val());
	var errorType = '';
	$("[id^=errorType_").each(function(){
		if(errorType.length > 0) errorType += '>';
		errorType += $('option:selected',this).text();
	})
	$("#errorType").val(errorType);
	
//	$("#errorTypeCd").val($(errorType).val());
	
	let formData = $("#inputForm").serialize();
	
	$.ajax({
		url:'/VM1702Modify/' + asNo,
		type:'POST',
		data:formData,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM1702Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

// 접수 취소 버튼
function fn_VM1702cancelAs(){
	if($("#cancelReason").val() == ""){
		alert("취소사유를 선택해주세요.");
		return;
	}
	if(!confirm("해당 AS건의 접수를 취소하시겠습니까?")){
		return;
	}
	
	var param = new Object();
	param.cancelReason = $("#cancelReason").val();
	
	$.ajax({
		url:'/VM1702Cancel/'+asNo,
		type:'POST',
		data:param,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		success:function(response){
			if(response.success){
				alert("저장되었습니다.");
				fn_VM1702Redirect();
			}else{
				alert('에러가 발생하였습니다.\n 잠시 후 다시 시도해 주세요.')
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		}
	})
}

//뒤로가기 버튼
function fn_VM1702Redirect() {
	$('#returnForm').attr("action", "/VM1701Redirect");
	$("#returnForm").submit();
}

const telAutoHyphen = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)
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

$('#toggle').click(function() {
	$('#agreement').toggle();
	if($(this).text()=='자세히 ▼'){
		$(this).text('자세히 ▲');
	}else{
		$(this).text('자세히 ▼');
	}
});

function retrieveTempAs(asNo){
	let param = {asNo:asNo};
	$.ajax({
		url:'/VM1702retrieveTempAs',
		type:'POST',
		data:param,
		success:function(response){
			if(response){
				let subNote = response.data;
				$("#subNote").val(subNote);
			}else{
				alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
			}
		}
	})
}
function fn_VM1702saveTempAs(){
	if(!confirm("비고 내용을 임시저장하시겠습니까?")){
		return;
	}
	
	var flag = false;
	if($("#subNote").val()==null || $("#subNote").val()==''){
		alert("비고란을 입력해주세요.");
		return;
	}
	
	var param = new Object;
	param.asNo 			= asNo;
	param.subNote		= $("#subNote").val();
	param.progStat 		= 'O';
	
	$.ajax({
		url:'/VM1702saveTempAs',
		type:'POST',
		data:param,
		success:function(response){
			if(response){
				alert('저장되었습니다.');
				fn_VM1702Redirect();
			}else{
				alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
			}
		}
	})
}