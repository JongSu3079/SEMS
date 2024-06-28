$(function(){
	fn_VM1803RetrieveAs();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
})

function fn_VM1803RetrieveAs(){
	let param = new Object();
	param.asNo = $("#asNo").val();
	let tabCd = $("#tabCd").val();
	let url='';
	if(tabCd=='SA'){
		url='/VM1803RetrieveSignAs';
	}else{
		url='/VM1803RetrieveAs';
	}
	$.ajax({
		url:url,
		data:param,
		success:function(response){
			console.log(response)
			let data = response.data;
			$("#viewStrCd").val(data.viewStrCd);
			$("#strNm").val(data.strNm);
			$("#asDttm").val(data.asDttm);
			$("#resolveDttm").val(data.resolveDttm);
			$("#errorType").val(data.errorType);
			$("#emergencyLevel").val(data.emergencyLevel);
			$("#vendorUserNm").val(data.vendorUserNm + '(' + data.vendorNm + ')');
			$("#asTitle").val(data.asTitle);
			$("#asNote").val(data.asNote);
			
			$("#resolveNote").val(data.resolveNote);
			$("#subNote").val(data.subNote);
			$("#ownerNm").val(data.ownerNm);
			$("#ownerTelNo").val(data.ownerTelNo);
			$("#ownerNote").val(data.ownerNote);
			let signHtml = '';
			if(data.ownerSignYn == 'Y'){
				signHtml += '<img id="signImg_pop" style="width: 259px; background-color:#fff;" src="'+data.storageEndpoint + data.signImg+'" />';
			}else if(data.ownerSignYn == 'N'){
				signHtml += '<input type="text" value="경영주 서명 거부" readonly/>';
			}else if(data.ownerSignYn == 'P'){
				signHtml += '<input type="text" value="전화설명(미방문)" readonly/>';
			}
			$("#signImg").html(signHtml);
			// 데이터 확인 후 처리로 수정
			if( typeof(data.resolveCdText) != "undefined" && data.resolveCdText != null) {
				let resolveCds = data.resolveCdText.split('|');
				
				if( resolveCds.length > 0) {
					resolveCds.forEach((item, index) => $("#resolveCd_" + index).val(item))
				}
			}
		}
	})
}

function fn_VM1803RetrieveAsRepairPart(){
	let param = new Object();
	param.asNo = $("#asNo").val();
	
	$.ajax({
		url:'/VM1803RetrieveAsRepairPart',
		data:param,
		success:function(response){
			let html = '';
			let priceObj = {
					total_part:0, total_repair:0, total_business:0
			};
			response.items.forEach( item => {
				html += '<div class="inputBox" style="margin-top:3px;">';
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
			})
			$("#partListDiv").html(html);
			
			Object.keys(priceObj).forEach(key => {
				$("#" + key).val(gfn_numberWithCommas(priceObj[key]));
			});
			$("#totalPrice").val(gfn_numberWithCommas(priceObj['total_part'] + priceObj['total_repair'] + priceObj['total_business']));
		}
	})
}

//뒤로가기 버튼
function fn_VM1803Redirect() {
	$('#returnFrom').attr("action", "/VM1801Redirect");
	$("#returnFrom").submit();
}