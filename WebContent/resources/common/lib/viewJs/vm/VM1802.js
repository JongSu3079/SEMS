$(function(){
	fn_VM1802RetrieveMntnc();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

function fn_VM1802RetrieveMntnc(){
	var param = new Object();
	param.initStrCd = $("#initStrCd").val();
	param.yyyymm = $("#yyyymm").val();
	param.mntncType = $("#mntncType").val();
	let tabCd = $("#tabCd").val();
	let url='';
	if(tabCd=='SB'){
		url='/VM1802RetrieveSignMntnc';
	}else{
		url='/VM1802RetrieveMntnc';
	}
	$.ajax({
		url:url,
		data:param,
		success:function(response){
			if(response.success){
				let data = response.data;
				
				$("#strNm").text(data.strNm);
				$("#yyyymmdd").text(data.startDttm + ' ~ ' + data.endDttm);
				$("#vendorUser").text(data.vendorUserNm + '(' + data.vendorNm + ')');
				$("#sector").text(data.sectorFull);
				
				$("#operStat").val(data.operStat);
				$("#operNote").val(data.operNote);
				if(data.operStat == "해당없음"){
					$("#operNoteDiv").hide();
					$("#operNote").val(data.operNote);
					
					$("#checkListDiv").show();
					let checkList = JSON.parse(data.checkJson);
					let checkHtml = "";
					checkList.forEach( item => {
						checkHtml += '<tr>';
						
						checkHtml += "	<td>";
						checkHtml += "[" + item.title + "]<span>" + item.checkContents + "</span>";
						checkHtml += "	</td>";
						
						checkHtml += '	<td>';
						checkHtml += '		<div class="inputBox">';
						if(item.checkType == 'M'){	// 객관식
							checkHtml += '			<span>'+( item.checkYn == 'Y' ? '정상' : (item.checkYn == 'defect' || item.checkYn == 'N' ? '불량' : '-') )+'</span>';
						}else if(item.checkType == 'S'){	// 주관식
							checkHtml += '			<span>'+ (item.note != '' ? '조치사항' : '미조치') +'</span>';
						}else if(item.checkType == 'B'){	// 체크박스
							checkHtml += '			<span>' + (item.note != '' ? '점검완료' : '점검점') + '</span>';
						}else if(item.checkType == 'O'){	// 체크박스
							checkHtml += '			<span>' + (item.checkYn != '' ? item.checkYn : '-') + '</span>';
						}
						checkHtml += '		</div>';
						checkHtml += '	</td>';
						
						checkHtml += '	<td>';
						checkHtml += '		<span>'+item.note+'</span>';
						checkHtml += '	</td>';
						
						checkHtml += '</tr>';
					})
					$("#checkListArea").html(checkHtml);
					
					$("#noteDiv").show();
					$("#note").val(data.resolveNote);
					$("#subNote").val(data.resolveSubNote);
					
					$("#repairYnDiv").show();
					$("#repairYn").val(data.repairYn == 'Y' ? '부품교체' : '해당없음');
					
					if(data.repairYn == 'Y'){
						$("#partRepairDiv").show();
						fn_VM1802RetrieveRepairPart();
					}
					$("#repairNote").val(data.repairNote);
					
				}
				$("#ownerNm").val(data.ownerNm);
				$("#telNo").val(data.ownerTelNo);
				
				let signHtml = '';
				if(data.ownerSignYn == 'Y'){
					signHtml += '<img id="signImg_pop" style="width: 259px; background-color:#fff;" src="'+data.storageEndpoint + data.signImg+'" />';
				}else{
					if(tabCd=='SB'){
						signHtml += '<input type="text" value="근무자 서명 거부" readonly/>';												
					}else{
						signHtml += '<input type="text" value="경영주 서명 거부" readonly/>';						
					}
				}
				$("#signImg").html(signHtml);
			}
		}
	})
	
}

function fn_VM1802RetrieveRepairPart(){
	let param = new Object();
	param.initStrCd = $("#initStrCd").val();
	param.yyyymm = $("#yyyymm").val();
	param.mntncType = $("#mntncType").val();
	
	$.ajax({
		url:'/VM1802RetrieveMntncRepairPart',
		data:param,
		success:function(response){
			let html = '';
			let priceObj = {
					total_part:0, total_repair:0, total_business:0
			};
			response.items.forEach( item => {
				html += '<div class="inputBox" style="margin-top: 3px;">';
				html += '	<span class="notification" style="width: calc(10% - 3px);">';
				if(item.partTarget == 'head'){
					html += '본부';
				}else if(item.partTarget == 'owner'){
					html += '경영주';
				}else if(item.partTarget == 'maker'){
					html += '제조사무상';
				}
				html += '	</span>';
				html += '	<input type="text" style="width: calc(20% - 3px); margin-left: 5px;" value="'+item.makerNm+'" readonly/>';
				html += '	<input type="text" style="width: calc(20% - 3px); margin-left: 5px;" value="'+item.middleNm+'" readonly/>';
				html += '	<input type="text" style="width: calc(20% - 3px); margin-left: 5px;" value="'+item.smallNm+'" readonly/>';
				html += '	<input type="text" style="width: calc(20% - 3px); margin-left: 5px;" value="'+item.partNm+'" readonly/>';
				html += '</div>';
				
				priceObj[item.partTarget + '_part'] = ( priceObj[item.partTarget + '_part'] ? priceObj[item.partTarget + '_part'] :  0 ) + Number(item.partPrice);
				priceObj[item.partTarget + '_repair'] = ( priceObj[item.partTarget + '_repair'] ? priceObj[item.partTarget + '_repair'] : 0 ) + Number(item.repairPrice);
				priceObj[item.partTarget + '_business'] = ( priceObj[item.partTarget + '_business'] ? priceObj[item.partTarget + '_business'] : 0 ) + Number(item.businessPrice);
				
				priceObj['total_part'] += Number(item.partPrice);
				priceObj['total_repair'] += Number(item.repairPrice);
				priceObj['total_business'] += Number(item.businessPrice);
			});
			$("#partListDiv").html(html);
			
			Object.keys(priceObj).forEach(key => {
				$("#" + key).val(gfn_numberWithCommas(priceObj[key]));
			});
			$("#totalPrice").val(gfn_numberWithCommas(priceObj['total_part'] + priceObj['total_repair'] + priceObj['total_business']));
		}
	})
}

//뒤로가기 버튼
function fn_VM1802Redirect() {
	$('#returnFrom').attr("action", "/VM1801Redirect");
	$("#returnFrom").submit();
}