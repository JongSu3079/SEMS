// 스크립트 시작
window.onpageshow = function(event) {
	// 날짜 세팅
	fn_CM0501SetDate();
	
	// 새로고침
	fn_CM0501refresh();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

function fn_CM0501SetDate() {
//	var date = new Date();
//	var d = date.getDate();
//	var m = date.getMonth()+1;
//	var y = date.getFullYear();
//	
//	d<10 ? d='0'+d : d;
//	m<10 ? m='0'+m : m;
//	
//	var ymd = y + '-' + m + '-' + d;
//	
//	$('#startDate, #endDate').val( ymd );
	
	//날짜 계산
	function fn_MakeDate(day){
		var YYYY, MM, DD;
		var date = new Date();
		var d = new Date(Date.parse(date)-86400000*day);
		
		YYYY = d.getFullYear();
		
		//한자릿수 월 앞에 0을 붙이기 위한 if문
		if(d.getMonth() < 9)
			MM = '0'+(d.getMonth()+1);
		else
			MM = d.getMonth()+1;
		
		if(d.getDate() < 10)
			DD = '0'+(d.getDate());
		else
			DD = d.getDate();
		
		return YYYY+"-"+ MM +"-"+ DD;
	}
	
	$('#startDate').val( fn_MakeDate(6) );
	$('#endDate').val( fn_MakeDate(0) );
}

function fn_CM0501SrcDate(date) {
	var d = new Date(date);
	var day = d.getDate();
	var month = d.getMonth()+1;
	return ''+d.getFullYear() + (month<10 ? '0'+month : month) + (day<10 ? '0'+day : day);
}

// 날짜 유효성 검사
function fn_CM0501DateValidation() {
	let startDate = new Date($('#startDate').val());
	let endDate = new Date($('#endDate').val());
	if(startDate == 'Invalid Date') {
		$('#startDate').focus();
		alert('입력한 날짜가 유효하지 않습니다.(연-월-일 형태로 입력해주세요)');
		return false;
	} else if(endDate == 'Invalid Date') {
		$('#endDate').focus();
		alert('입력한 날짜가 유효하지 않습니다.(연-월-일 형태로 입력해주세요)');
		return false;
	}
	if(Number(endDate)-Number(startDate) > 518400000) {
		alert('일주일 이내의 데이터만 검색할 수 있습니다.');
		return false;
	}
	return true;
}

// 새로고침
function fn_CM0501refresh(){
	var fromView = $('#fromView').val();
	
	if(!fn_CM0501DateValidation()) {
		return false;
	}
	
	if( fromView == "VM0501" ){
		fn_CM0501FromVM0501();
	} else if( fromView == "VM0701" ){
		fn_CM0501FromVM0701();
	}
}

// 뒤로가기
function fn_CM0501Redirect() {
	var fromView = $('#fromView').val();
	
	if( fromView == "VM0501" ){
		$('#returnFrom').attr("action", "/VM0501Redirect");
		$("#returnFrom").submit();
	} else if( fromView == "VM0701" ){
		$('#returnFrom').attr("action", "/VM0701Redirect");
		$("#returnFrom").submit();
	}
}

// 냉장비 그래프 그리기
function fn_CM0501FromVM0501(){
	var strCd		= $('#strCd').val();
	var moduleId	= $('#moduleId').val();
	var portNo		= $('#portNo').val();
	var temonType	= $('#temonType').val();
	var deviceType	= $('#deviceType').val();
	var moduleNm	= $('#moduleNm').val();
	var deviceLoc	= $('#deviceLoc').val();
	var contents	= $('#contents').val();
	var startDate	= fn_CM0501SrcDate($('#startDate').val());
	var endDate		= fn_CM0501SrcDate($('#endDate').val());
	
	if( contents != '' ){
		contents = '  :  '+ contents;
	}
	
	var fromView = $('#fromView').val();
	
	var paramDataset = new Object();
	paramDataset.strCd		= strCd;
	paramDataset.moduleId	= moduleId;
	paramDataset.portNo		= portNo;
	paramDataset.temonType	= temonType;
	paramDataset.deviceType	= deviceType;
	paramDataset.moduleNm	= moduleNm;
	paramDataset.deviceLoc	= deviceLoc;
	paramDataset.startDate	= startDate;
	paramDataset.endDate	= endDate;

	$.ajax({
		type : "POST",
		cache : false,
		url : "/CM0501Chart/"+fromView,
		data : JSON.stringify(paramDataset),
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if(returnJSON.success){
				$("#container_graph").empty();
				
				var result = returnJSON.items;
				
				var yyyymmdd	= new Array();
				var hhmin		= new Array();
				var sensTemp	= new Array();
				var maxTemp		= new Array();
				var minTemp		= new Array();
				var delayTime	= new Array();
				var pushTerm	= new Array();
				
				var minmaxFlag	= 0;
				var maxTempLine	= 0;
				var minTempLine	= 0;
				
				for(var i = 0 ; i < result.length; i++){
					yyyymmdd.push(result[i].yyyymmdd);
					hhmin.push(result[i].hhmin);
					sensTemp.push(result[i].sensTemp);
					
					minmaxFlag = result[i].sensTemp;
					
					if( maxTempLine < minmaxFlag )
						maxTempLine = minmaxFlag;
					
					if( minTempLine > minmaxFlag )
						minTempLine = minmaxFlag;
					
					maxTemp.push(result[i].maxTemp);
					minTemp.push(result[i].minTemp);
					delayTime.push(result[i].delayTime);
					pushTerm.push(result[i].pushTerm);
				}
				
				if( maxTemp[0] == null ){
					maxTemp[0] = 50;
				}
				
				if( minTemp[0] == null ){
					minTemp[0] = -50;
				}
				
				if( Number( maxTemp[0] ) < Number( maxTempLine ) ){
					if( Number( maxTempLine ) < 0 ){
						maxTempLine = maxTempLine * 0.9;
					} else {
						maxTempLine = maxTempLine * 1.1;
					}
				}else{
					if( Number( maxTempLine ) < 0 ){
						maxTempLine = Number( maxTemp[0] ) * 0.9;
					} else {
						maxTempLine = Number( maxTemp[0] ) * 1.1;
					}
				}
				
				if( Number( minTemp[0] ) < Number( minTempLine ) ){
					if( Number( minTemp[0] ) == -50 ){
						minTempLine = minTempLine;
					} else {
						if( Number( minTempLine ) < 0 ){
							minTempLine = Number( minTemp[0] ) * 0.9;
						} else {
							minTempLine = Number( minTemp[0] ) * 1.1;
						}
					}
				} else {
					if( Number( minTempLine ) < 0 ){
						minTempLine = minTempLine * 0.9;
					} else {
						minTempLine = minTempLine * 1.1;
					}
				}
				
				var Day_data = [];
				
				for(var i = 0; i < yyyymmdd.length; i++ ){
					var utc_yyyy	= Number(yyyymmdd[i].substring(0,4));
					var utc_mm		= Number(yyyymmdd[i].substring(4,6))-1;
					var utc_dd		= Number(yyyymmdd[i].substring(6,8));
					var utc_hh		= Number(hhmin[i].substring(0,2));
					var utc_min		= Number(hhmin[i].substring(2,4));
					
					UTC_str = Date.UTC( utc_yyyy, utc_mm, utc_dd, utc_hh, utc_min );
					
					if( sensTemp[i] == null || sensTemp[i] == '50' || sensTemp[i] == '-50'){
						Day_data.push([ Number(UTC_str), null ]);
					} else {
						Day_data.push([ Number(UTC_str), Number(sensTemp[i]) ]);
					}
				}
				
				var setGraphStyle = { 
					gsr:{
						color:"#34b5ff",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					gsr_theme_season1:{
						color:"#0ccb46",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season2:{
						color:"#34b5ff",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season3:{
						color:"#ed8a21",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season4:{
						color:"#a39e09",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season5:{
						color:"#9299ed",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					ldc:{
						color:"#1b932a",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					},
					bgf:{
						color:"#9dc92a",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					poc:{
						color:"#e5a51c",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
				}
				var graphStyle = setGraphStyle[smGraphStyleForCm];
				// 그래프 그리기
				Highcharts.setOptions({
				lang: {
					weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
					shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					}
				});
				
				$('#container_graph').highcharts('StockChart', {
					loading : {
						style : {
							backgroundColor : 'silver'
						},
						labelStyle : {
							color : 'white'
						}
					},
					chart : {
						backgroundColor : 'transparent',
						//borderColor: '#EBBA95',
						borderWidth: 0,
						borderRadius: 10,
						plotBorderWidth: 1,
						plotBorderColor:graphStyle.line,
						spacingRight: 15,
						spacingLeft: 15,
						panning: true,
						height: 500,
						resetZoomButton: {
							position: {
								align:""
							}
						}
					},
					credits : {
						enabled : false
					},
					exporting : {
						enabled : false
					},
					title : {},
					xAxis : {
						title: {
							text: '[월/일 시:분] - '+ deviceLoc + contents,
							align: 'low',
							style:{color : graphStyle.txt}
						},
						type : 'datetime',
						dateTimeLabelFormats : {
							second	: '%H:%M',
							minute	: '%m/%d<br>%H:%M',
							hour	: '%m/%d<br>%H:%M',
							day		: '%m/%d<br>%H:%M',
							week	: '%m/%d<br>%H:%M',
							month	: '%Y/%m-%d<br>%H:%M',
							year	: '%Y/%m-%d<br>%H:%M'
						},
						tickPixelInterval : 55,
						gridLineWidth : 1,
						lineColor:graphStyle.line,
						tickColor:graphStyle.line,
						gridLineColor:graphStyle.line,
						labels : {
							style : {
								fontSize : '1em',
								color:graphStyle.txt
							},
						},
					},
					plotOptions : {
						series : {
							color : '#8C8C8C',
							dataLabels : {
								enabled : false,
							},
						},
						spline: {
							connectNulls: true
						}
					},
					yAxis : {
						min : Number(minTempLine)*1.1,
						max : Number(maxTempLine)*1.1,
						gridLineDashStyle : 'dash',
						gridLineColor:graphStyle.grid_line,
						minorTickInterval : 'auto',
						minorGridLineColor:graphStyle.line,
						labels: {
							format: '{value}℃',
							style : {
								fontSize : '1em',
								color:graphStyle.txt,
							}
						},
						plotBands : [ {
							from : minTemp[0],
							to : maxTemp[0],
						//	color : "#37424b",
							label : {
								text : '',
								align : 'left',
								verticalAlign : 'top',
							}
						} ],
						plotLines : [ {
							value : minTemp[0],
							width : 3,
							color : graphStyle.min,
							//dashStyle : 'shortdash',
							label : {
								text : minTemp[0] + '℃',
								align : 'left',
								y : 12,
								style : {
									color : graphStyle.min,
								}
							}
						}, {
							value : maxTemp[0],
							width : 3,
							color : graphStyle.max,
							label : {
								text : maxTemp[0] + '℃',
								align : 'left',
								y : -5,
								style : {
									color : graphStyle.max,
								}
							}
						} ],
					},
					navigator : {
						enabled : false,
					},
					scrollbar : {
						enabled : false,
					},
					rangeSelector : {
						enabled : false,
					},
					tooltip : {
						valueDecimals : 0,	// 소수점 몇자리까지 나타낼지
						shared : false,
					//	pointFormat: '<span style="color:#34b5ff">\u25CF</span> {series.name}: <b>{point.y} ℃</b>',
						valueSuffix : ' ℃',
						positioner : function() {
							return {
								x : 10,
								y : 40
							};
						},
					},
					series : [{
						name : '온도',
						data : Day_data,
						type: 'spline',
						color : graphStyle.color,
						dataGrouping: {
							enabled: false
						}
					}]
				});
			}
		},
		error: function(result) {
			alert("오류가 발생했습니다.");
		}
	});
}

// 알람 그래프 그리기
function fn_CM0501FromVM0701(){
	var strCd		= $('#strCd').val();
	var moduleId	= $('#moduleId').val();
	var portNo		= $('#portNo').val();
	var moduleNm	= $('#moduleNm').val();
	var startDate	= fn_CM0501SrcDate($('#startDate').val());
	var endDate		= fn_CM0501SrcDate($('#endDate').val());
	var deviceLoc	= "";
	var deviceType	= "";
	
	var fromView = $('#fromView').val();
	
	var btFormat	= '';
	var btSuffix	= '';
	var btName		= '';
	
	$('#title_temp_or_battery').html('냉장비온도');
	btFormat	= '℃'; 
	btSuffix	= ' ℃';
	btName		= '온도';
	
	var paramDataset = new Object();
	paramDataset.strCd		= strCd;
	paramDataset.moduleId	= moduleId;
	paramDataset.portNo		= portNo;
	paramDataset.moduleNm	= moduleNm;
	paramDataset.startDate	= startDate;
	paramDataset.endDate	= endDate;
	
	$.ajax({
		type : "POST",
		cache : false,
		url : "/CM0501Chart/"+fromView,
		data : JSON.stringify(paramDataset),
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if( returnJSON.success ){
				$("#container_graph").empty();
				
				var result = returnJSON.items;
				
				var yyyymmdd	= new Array();
				var hhmin		= new Array();
				var sensTemp	= new Array();
				var maxTemp		= new Array();
				var minTemp		= new Array();
				var delayTime	= new Array();
				var pushTerm	= new Array();
				
				var minmaxFlag	= 0;
				var maxTempLine	= 0;
				var minTempLine	= 0;
				
				if( typeof(result) != "undefined" && result != null && result.length > 0) {	
					deviceLoc = result[0].deviceLoc;
					contents = result[0].contents;
					if( contents != '' ){
						contents = '  :  '+ contents;
					}
					
					for( var i = 0 ; i < result.length; i++ ){
						yyyymmdd.push(result[i].yyyymmdd);
						hhmin.push(result[i].hhmin);
						sensTemp.push(result[i].sensTemp);
						
						minmaxFlag = result[i].sensTemp;
						
						if( maxTempLine < minmaxFlag )
							maxTempLine = minmaxFlag;
						
						if( minTempLine > minmaxFlag )
							minTempLine = minmaxFlag;
						
						maxTemp.push(result[i].maxTemp);
						minTemp.push(result[i].minTemp);
						delayTime.push(result[i].delayTime);
						pushTerm.push(result[i].pushTerm);
					}
					
					if( maxTemp[0] == null ){
						maxTemp[0] = 50;
					}
					
					if( minTemp[0] == null ){
						minTemp[0] = -50;
					}
					
					if( Number( maxTemp[0] ) < Number( maxTempLine ) ){
						if( Number( maxTempLine ) < 0 ){
							maxTempLine = maxTempLine * 0.9;
						} else {
							maxTempLine = maxTempLine * 1.1;
						}
					} else {
						if( Number( maxTempLine ) < 0 ){
							maxTempLine = Number( maxTemp[0] ) * 0.9;
						}else{
							maxTempLine = Number( maxTemp[0] ) * 1.1;
						}
					}	
					
					if( Number( minTemp[0] ) < Number( minTempLine ) ){
						if( Number( minTemp[0] ) == -50 ){
							minTempLine = minTempLine;
						} else {
							if( Number( minTempLine ) < 0 ){
								minTempLine = Number( minTemp[0] ) * 0.9;
							} else {
								minTempLine = Number( minTemp[0] ) * 1.1;
							}
						}
					} else {
						if( Number( minTempLine ) < 0 ){
							minTempLine = minTempLine * 0.9;
						} else {
							minTempLine = minTempLine * 1.1;
						}
					}
				}
				
				var Day_data = [];
				
				for(var i = 0; i < yyyymmdd.length; i++ ){
					var utc_yyyy	= Number(yyyymmdd[i].substring(0,4));
					var utc_mm		= Number(yyyymmdd[i].substring(4,6))-1;
					var utc_dd		= Number(yyyymmdd[i].substring(6,8));
					var utc_hh		= Number(hhmin[i].substring(0,2));
					var utc_min		= Number(hhmin[i].substring(2,4));
					
					UTC_str = Date.UTC( utc_yyyy, utc_mm, utc_dd, utc_hh, utc_min );
					
					if( sensTemp[i] == null || sensTemp[i] == '50' || sensTemp[i] == '-50' ){
						Day_data.push([ Number(UTC_str), null ]);
					} else {
						Day_data.push([ Number(UTC_str), Number(sensTemp[i]) ]);
					}
				}
				
				var setGraphStyle = { 
					gsr:{
						color:"#34b5ff",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					gsr_theme_season1:{
						color:"#0ccb46",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season2:{
						color:"#34b5ff",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season3:{
						color:"#ed8a21",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season4:{
						color:"#a39e09",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					gsr_theme_season5:{
						color:"#9299ed",
						min:"#88c0c0",
						max:"#e89d9d",
						txt:"#222",
						line:"#888",
						grid_line:"#222"
					}, 
					ldc:{
						color:"#1b932a",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					},
					bgf:{
						color:"#9dc92a",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					poc:{
						color:"#e5a51c",
						min:"#35bd95",
						max:"#e83b3e",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
				}
				var graphStyle = setGraphStyle[smGraphStyleForCm];
				// 그래프 그리기
				Highcharts.setOptions({
					lang: {
						weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
						shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					}
				});
				
				$('#container_graph').highcharts('StockChart', {
					loading : {
						style : {
							backgroundColor : 'silver'
						},
						labelStyle : {
							color : 'white'
						}
					},
					chart : {
						backgroundColor : 'transparent',
						borderWidth: 0,
						borderRadius: 10,
						plotBorderWidth: 1,
						plotBorderColor:graphStyle.line,
						spacingRight: 15,
						spacingLeft: 15,
						panning: true,
						height:500,
						resetZoomButton: {
							position: {
								align:""
							}
						}
					},
					credits : {
						enabled : false
					},
					exporting : {
						enabled : false
					},
					title : {},
					xAxis : {
						title: {
							text: '[월/일 시:분] - '+ deviceLoc + contents,
							align: 'low',
							style:{color : graphStyle.txt,}
						},
						type : 'datetime',
						dateTimeLabelFormats : {
							second	: '%H:%M',
							minute	: '%m/%d<br>%H:%M',
							hour	: '%m/%d<br>%H:%M',
							day		: '%m/%d<br>%H:%M',
							week	: '%m/%d<br>%H:%M',
							month	: '%Y/%m-%d<br>%H:%M',
							year	: '%Y/%m-%d<br>%H:%M'
						},
						tickPixelInterval : 55,
						gridLineWidth : 1,
						lineColor:graphStyle.line,
						tickColor:graphStyle.line,
						gridLineColor:graphStyle.line,
						labels : {
							style : {
								fontSize : '1em',
								color:graphStyle.txt,
							},
						},
					},
					plotOptions : {
						series : {
							color : '#8C8C8C',
							dataLabels : {
								enabled : false,
							},
						},
						spline : {
							connectNulls: true
						}
					},
					yAxis : {
						min : Number(minTempLine)*1.1,
						max : Number(maxTempLine)*1.1,
						gridLineDashStyle : 'dash',
						gridLineColor:graphStyle.grid_line,
						minorTickInterval : 'auto',
						minorGridLineColor:graphStyle.line,
						labels: {
							format: '{value}℃',
							style : {
								fontSize : '1em',
								color:graphStyle.txt,
							}
						},
						plotBands : [ {
							from : minTemp[0],
							to : maxTemp[0],
						//	color : "#37424b",
							label : {
								text : '',
								align : 'left',
								verticalAlign : 'top',
							}
						} ],
						plotLines : [ {
							value : minTemp[0],
							width : 3,
							color : graphStyle.min,
							label : {
								text : minTemp[0] + '℃',
								align : 'left',
								y : 12,
								style : {
									color : graphStyle.min,
								}
							}
						}, {
							value : maxTemp[0],
							width : 3,
							color : graphStyle.max,
							label : {
								text : maxTemp[0] + '℃',
								align : 'left',
								y : -5,
								style : {
									color : graphStyle.max,
								}
							}
						}],
					},
					navigator : {
						enabled : false,
					},
					scrollbar : {
						enabled : false,
					},
					rangeSelector : {
						enabled: false,
					},
					tooltip : {
						valueDecimals : 0,	// 소수점 몇자리까지 나타낼지
						shared : false,
						valueSuffix : btSuffix,
						positioner : function() {
							return {
								x : 10,
								y : 40
							};
						},
					},
					series : [{
						name : btName,
						data : Day_data,
						type: 'spline',
						color : setGraphStyle.color,
						dataGrouping: {
							enabled: false
						}
					}]
				});
			}
		},
		error: function(result) {
			alert("오류가 발생했습니다.");
		}
	});
}