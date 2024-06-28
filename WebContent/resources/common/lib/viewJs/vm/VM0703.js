$(document).ready(function(){
	$('#viewLoadingDiv').fadeOut();
	fn_VM0703getAlarmList();
});

// 스크립트 시작
window.onpageshow = function(event) {
	//헤더 점포정보 set
	fn_setHeaderCombo();
	$("#strNm").text($("#hStrNm").val());
};

function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}
// function fn_PageMoveToVM0102(warnCode) {
// 	var paramDataset = new Object();
//
// 	paramDataset.fromView = "VM0102";
// 	paramDataset.warnCode = 'vm1402';
//
// 	var paramJson = JSON.stringify(paramDataset);
//
// 	$("#paramData").val(paramJson);
//
// 	var form = document.form;
// 	form.action = "/VM0102";
// 	form.method = "post";
// 	form.enctype = "application/x-www-form-urlencoded";
// 	form.submit();
// }

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

// 분류별 알람리스트 가져오기
// 전체랑 냉장비가 동일(2023. 11. 20. 기준)
function fn_VM0703getAlarmCategory(type) {

	$('#viewLoadingDiv').show().fadeIn('fast');

	fn_VM0703getAlarmList();

	if (type == 'total') {
		$('#totalDiv').css('background', '#595959');
		$('#fridgeDiv').css('background', '#a5a5a5');
	} else {
		$('#totalDiv').css('background', '#a5a5a5');
		$('#fridgeDiv').css('background', '#595959');
	}
}

// 알람 리스트 불러오기
function fn_VM0703getAlarmList() {

	$.ajax({
		url:'/VM0703GetAlarmList',
		type:'POST',
		success:function(response){
			let alarmHtml = ''
			if(response.success){

				let alarmData = response.items;
				let alarmCount = response.data;

				$('#alarmCount').html(alarmCount);

				// list가 있는 경우
				if (alarmData.length > 0) {
					alarmData.forEach((item, i) => {
						alarmHtml += '<li onclick="fn_showDetail(this)">'
						alarmHtml += 	'<div style="display: flex; justify-content: space-between;" >';
						alarmHtml += 		'<div style="font-weight: bold;">';
						alarmHtml += 			'<span class="branch">[' + item.deviceLoc + '] ' + item.title + '</span>';
						alarmHtml += 		'</div>';
						alarmHtml += 		'<div>';
						alarmHtml += 			'<span id="arrow'+item.pushNo+'" style="font-size: 16px;">▼</span>';
						alarmHtml += 		'</div>';
						alarmHtml += 	'</div>';
						alarmHtml += 	'<div class="detail_area">';
						alarmHtml += 		'<span class="detail">' + (item.message.includes(']')?item.message.split(']')[1]:item.message) + '</span>';
						alarmHtml += 	'</div>';

						alarmHtml += 	'<div id="alDetail'+item.pushNo+'" style="display:none;padding:2%;margin:3% 0px;">';

						alarmHtml += 		'<p>1. 냉장비의 온도가 정상 범위를 벗어났습니다. ('+item.deviceLoc+' 적정 온도 범위 : '+item.minTemp+'도~ '+item.maxTemp+'도)</p><br>';
						alarmHtml += 		'<p>2. 냉장비의 디스플레이 온도를 확인해주세요.</p><br>';
						alarmHtml += 		'<p>3. 성에 제거 및 상품 진열 시 알람은 참고해주세요.</p><br><br>';
						
						alarmHtml += 		'<p>※SEMS 냉장비 알람 기능은 유지보수를 위한 보조장치입니다.</p><br>';
						alarmHtml += 		'<p>※점포에서는 매일 2시간마다 1회씩 냉장비의 온도를 확인해주세요.</p><br>';
						alarmHtml += 		'<p>※장비 온도 이상 시 상품은 점포에서 직접 이동시켜주세요.</p><br>';
						alarmHtml += 		'<p>※상품 진열 시 무선온도계 이동 및 고장 등으로 알람이 미발생할 수 있습니다.</p><br><br>';
						
						alarmHtml += 		'<p>관련 문의 사항은 GS25 해피콜 센터(080-555-2525)로 접수해주세요.</p><br>';
						alarmHtml += 	'</div>';
							
							
						alarmHtml += '</li>'
					})
				} else {
					alarmHtml += '<li>'
					alarmHtml += 	'<div className="detail_area">'
					alarmHtml += 		'<span className="detail">'
					alarmHtml += 			'알람이 없습니다.'
					alarmHtml += 		'</span>'
					alarmHtml += 	'</div>'
					alarmHtml += '</li>'
				}
				$('#alarmDataList').html(alarmHtml)
			}
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
			if(pushNo == null || pushNo == ''){
				var currentUrl = window.location.href;
				var urlParams = new URLSearchParams(window.location.search);
				pushNo = urlParams.get('pushNo');
			}
			if(pushNo != null && pushNo != ''){
//				$('#alDetail'+pushNo).css('display', 'block');
//				$('#arrow'+pushNo).text('▲');
			}
		}
	})
}

function fn_showDetail(element) {
	var $detailDiv = $(element).find('.detail_area');
	var $alDetailDiv = $(element).find("[id^='alDetail']");
	var $arrow = $(element).find("[id^='arrow']");

	if ($alDetailDiv.css('display') === 'none') {
		$alDetailDiv.css('display', 'block');
		$arrow.text('▲');
		
	} else {
		$alDetailDiv.css('display', 'none');
		$arrow.text('▼');
	}
}




