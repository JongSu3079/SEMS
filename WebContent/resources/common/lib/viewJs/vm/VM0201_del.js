// 스크립트 시작 
window.onpageshow = function(event) {
	// 헤더에 점포 정보 세팅
	fn_setHeaderCombo();
	
	// 알람 개수 가져오기
	gfn_getAlarmCnt();
	
	// 점포 상세 정보 팝업
	fn_strInfoPopup();
	
	// 새로고침
	if(gfn_checkOnload()){
		fn_VM0201refresh();
	}
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();
};

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

// 새로고침
function fn_VM0201refresh() {
	fn_VM0201getTopInfo();
}

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

// 사용량 상단 정보
function fn_VM0201getTopInfo() {
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		async : true,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		contentType : "application/json; charset=UTF-8",
		url : '/VM0201Top',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var topInfo = returnJSON.data;
				
				// 사용량 상단 차트
				fn_VM0201chartTopArea( topInfo );
				
				// 사용량 하단 정보
				fn_VM0201getBottomInfo();
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
};

// 사용량 상단 차트
function fn_VM0201chartTopArea( topInfo ){
	var strMin	= topInfo.storeMin * 1;
	var strAvg	= topInfo.storeAvg * 1;
	var mystr	= topInfo.myStore * 1;
	var strMax	= topInfo.storeMax * 1;
	
	Highcharts.theme = {
		colors: ['#78bb6b', '#2b908f', '#e83b3e', '#7798bf'],
		chart: {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [
					[0, '#37424b'], [1, '#37424b']
				]
			},
			style: {
				fontFamily: '\'Unica One\', sans-serif'
			},
			plotBorderColor: '#606063',
			spacingLeft:0
		},
		title: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase',
				fontSize: '20px'
			}
		},
		subtitle: {
			style: {
				color: '#E0E0E3',
				textTransform: 'uppercase'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: '#E0E0E3',
					fontSize: '9px'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		yAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: '#E0E0E3'
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: '#707073',
			tickWidth: 1,
			title: {
				style: {
					color: '#A0A0A3',
					fontSize:"9px"
				}
			}
		},
		tooltip: {
			backgroundColor: 'rgba(51, 51, 51, 0.9)',
			style: {
				color: '#fff'
			}
		},
		plotOptions: {
			series: {
				dataLabels: {
					color: '#B0B0B3'
				},
				marker: {
					lineColor: '#333'
				}
			},
			boxplot: {
				fillColor: '#505053'
			},
			candlestick: {
				lineColor: 'white'
			},
			errorbar: {
				color: 'white'
			}
		},
		legend: {
			itemStyle: {
				color: '#E0E0E3'
			},
			itemHoverStyle: {
				color: '#FFF'
			},
			itemHiddenStyle: {
				color: '#606063'
			}
		},
		credits: {
			style: {
				color: '#666'
			}
		},
		labels: {
			style: {
				color: '#707073'
			}
		},
		drilldown: {
			activeAxisLabelStyle: {
				color: '#F0F0F3'
			},
			activeDataLabelStyle: {
				color: '#F0F0F3'
			}
		},
		navigation: {
			buttonOptions: {
				symbolStroke: '#DDDDDD',
				theme: {
					fill: '#505053'
				}
			}
		},
		// scroll charts
		rangeSelector: {
			buttonTheme: {
				fill: '#505053',
				stroke: '#000000',
				style: {
					color: '#CCC'
				},
				states: {
					hover: {
						fill: '#707073',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					},
					select: {
						fill: '#000003',
						stroke: '#000000',
						style: {
							color: 'white'
						}
					}
				}
			},
			inputBoxBorderColor: '#505053',
			inputStyle: {
				backgroundColor: '#333',
				color: 'silver'
			},
			labelStyle: {
				color: 'silver'
			}
		},
		navigator: {
			handles: {
				backgroundColor: '#666',
				borderColor: '#AAA'
			},
			outlineColor: '#CCC',
			maskFill: 'rgba(255,255,255,0.1)',
			series: {
			color: '#7798BF',
				lineColor: '#A6C7ED'
			},
			xAxis: {
				gridLineColor: '#505053'
			}
		},
		scrollbar: {
			barBackgroundColor: '#808083',
			barBorderColor: '#808083',
			buttonArrowColor: '#CCC',
			buttonBackgroundColor: '#606063',
			buttonBorderColor: '#606063',
			rifleColor: '#FFF',
			trackBackgroundColor: '#404043',
			trackBorderColor: '#404043'
		},
		// special colors for some of the
		legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
		background2: '#505053',
		dataLabelsColor: '#B0B0B3',
		textColor: '#C0C0C0',
		contrastTextColor: '#F0F0F3',
		maskColor: 'rgba(255,255,255,0.3)'
	};
	
	// Apply the theme
	Highcharts.setOptions(Highcharts.theme);
	
	// Create the chart
	Highcharts.chart('container_graph', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: '전력사용량 비교'
		},
		credits: {
			enabled:false
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'kWh/m²'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
			borderWidth: 0,
			dataLabels: {
				enabled: true,
				format: '{point.y:.1f}'//'{point.y:.1f}%'
				}
			}
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> kWh/m²<br/>'
		},
		"series": [
			{
				"name": "전력사용량",
				"colorByPoint": true,
				"data": [
					{"name": "비교점포 최소",	"y": strMin,	/*"drilldown": "Internet Explorer"*/},
					{"name": "비교점포 평균",	"y": strAvg,	/*"drilldown": "Chrome"*/},
					{"name": "나의 점포",		"y": mystr,		/*"drilldown": "Firefox"*/},
					{"name": "비교점포 최대",	"y": strMax,	/*"drilldown": "Safari"*/},
				]
			}
		],
		/*
		"drilldown": {
			"series": [
				{
					"name": "Chrome",
					"id": "Chrome",
					"data": [
						["v65.0", 0.1],
						["v64.0", 1.3],
						["v63.0", 53.02],
						["v62.0", 1.4],
						["v61.0", 0.88],
						["v60.0", 0.56],
						["v59.0", 0.45],
						["v58.0", 0.49],
						["v57.0", 0.32],
						["v56.0", 0.29],
						["v55.0", 0.79],
						["v54.0", 0.18],
						["v51.0", 0.13],
						["v49.0", 2.16],
						["v48.0", 0.13],
						["v47.0", 0.11],
						["v43.0", 0.17],
						["v29.0", 0.26]
					]
				},
				{
					"name": "Firefox",
					"id": "Firefox",
					"data": [
						["v58.0", 1.02],
						["v57.0", 7.36],
						["v56.0", 0.35],
						["v55.0", 0.11],
						["v54.0", 0.1],
						["v52.0", 0.95],
						["v51.0", 0.15],
						["v50.0", 0.1],
						["v48.0", 0.31],
						["v47.0", 0.12]
					]
				},
				{
					"name": "Internet Explorer",
					"id": "Internet Explorer",
					"data": [
						["v11.0", 6.2],
						["v10.0", 0.29],
						["v9.0", 0.27],
						["v8.0", 0.47]
					]
				},
				{
					"name": "Safari",
					"id": "Safari",
					"data": [
						["v11.0", 3.39],
						["v10.1", 0.96],
						["v10.0", 0.36],
						["v9.1", 0.54],
						["v9.0", 0.13],
						["v5.1", 0.2]
					]
				}
			]
		}*/
	});
}


// 사용량 하단 정보
function fn_VM0201getBottomInfo() {
	$.ajax({
		type : 'POST',
		dataType : 'JSON',
		contentType : "application/json; charset=UTF-8",
		url : '/VM0201Bot',
		error : function() {
			alert("(오류발생)다시 시도해주세요.");
		},
		async : true,
		beforeSend:function(){
			$('#viewLoadingDiv').show().fadeIn('fast');
		},
		complete:function(){
			$('#viewLoadingDiv').fadeOut();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				var bottomInfo = returnJSON.data;
				if(bottomInfo.length > 0) {
					if(bottomInfo[0].strCd == "AVG") {
						$("#myStrHacOperTimeToday").html(bottomInfo[1].operTime);		//나의점포 오늘 냉난방 가동시간
						$("#similarStrHacOperTimeToday").html(bottomInfo[0].operTime);	//유사점포 오늘 냉난방 가동시간
						$("#myStrHacOperTimeAvg").html(bottomInfo[1].operDayTime);		//나의점포 평균 냉난방 가동시간
						$("#similarStrHacOperTimeAvg").html(bottomInfo[0].operDayTime);	//유사점포 평균 냉난방 가동시간
						$("#myStrHacOperUseToday").html(bottomInfo[1].operEnergy);		//나의점포 오늘 냉난방 가동량
						$("#similarStrHacOperUseToday").html(bottomInfo[0].operEnergy);	//유사점포 오늘 냉난방 가동량
						$("#myStrHacOperUseAvg").html(bottomInfo[1].operDayEnergy);		//나의점포 평균 냉난방 가동량
						$("#similarStrHacOperUseAvg").html(bottomInfo[0].operDayEnergy);//유사점포 평균 냉난방 가동량
					} else {
						$("#myStrHacOperTimeToday").html(bottomInfo[0].operTime);		//나의점포 오늘 냉난방 가동시간
						$("#similarStrHacOperTimeToday").html(bottomInfo[1].operTime);	//유사점포 오늘 냉난방 가동시간
						$("#myStrHacOperTimeAvg").html(bottomInfo[0].operDayTime);		//나의점포 평균 냉난방 가동시간
						$("#similarStrHacOperTimeAvg").html(bottomInfo[1].operDayTime);	//유사점포 평균 냉난방 가동시간
						$("#myStrHacOperUseToday").html(bottomInfo[0].operEnergy);		//나의점포 오늘 냉난방 가동량
						$("#similarStrHacOperUseToday").html(bottomInfo[1].operEnergy);	//유사점포 오늘 냉난방 가동량
						$("#myStrHacOperUseAvg").html(bottomInfo[0].operDayEnergy);		//나의점포 평균 냉난방 가동량
						$("#similarStrHacOperUseAvg").html(bottomInfo[1].operDayEnergy);//유사점포 평균 냉난방 가동량
					}
				} else {
					alert("(조회실패)다시 시도해주세요.");
				}
			} else {
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}