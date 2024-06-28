// 전역변수
var scrStrCd = strCd;
var scrYyyymm = yyyyMm;

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
		fn_VM0202refresh();
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
function fn_VM0202refresh() {
	fn_VM0202getDayUsage();
}

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

//월별 계약전력량
function fn_VM0202getDayUsage(){

	var paramInfo = {
		strCd	: scrStrCd,
		yyyyMm	: scrYyyymm
	};

	$.ajax({
		url : '/storeVM0202DemandDay',
		type : 'POST',
		data : paramInfo,
		dataType : 'json',
		success : function(resultJSON){
			if(resultJSON.success){

				let data = resultJSON.data;

				// 표 그리기
				var demandList = '';
				for(var i = 0; i < data.length; i++ ){

					let yyyymmdd = gfn_changeYyyymmdd(data[i].yyyymmdd);
					let forecastTemp = data[i].forecastTemp == undefined ? 0 : data[i].forecastTemp;

					demandList += "<tr>";
					demandList += 	"<td style='color: #4a5cc7; text-decoration: underline;' onclick=\"fn_VM0202PopShow(" + data[i].yyyymmdd + "); return false;\">" + yyyymmdd + "</td>";
					demandList += 	"<td class='unit'>"+ data[i].total + "</td>";	// 20미만 + 저압 : 계약사용량, 나머지는 최대수요전력
					demandList += 	"<td class='unit'>"+ data[i].temp +"</td>";
					demandList += 	"<td class='unit'>"+ data[i].tSensorTemp +"</td>";
					demandList += 	"<td class='unit'>"+ forecastTemp +"</td>";
					demandList += "</tr>";
				}

				$("#demandDayDetail").html(demandList);
			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}
		
	});
}

// 냉장비 목록 팝업
function fn_VM0202PopShow(yyyymmdd) {
	$('#VM0202_popup').popup({autoopen: true,background:false});
	fn_VM0202refreshHour( 'VM0202', yyyymmdd );
}

// 스크립트 시작
function fn_VM0202refreshHour( parent, yyyymmdd ){
	if( parent == 'VM0202' ){
		$('#viewLoadingDiv').show();
	}
	fn_VM0202getHourUsage(parent, yyyymmdd);
}


// 시간대별 전력 사용량
function fn_VM0202getHourUsage(parent, yyyymmdd){

	var paramInfo = {
		strCd	: scrStrCd,
		yyyymmdd: yyyymmdd
	};

	$.ajax({
		url : '/storeVM0202DemandHour',
		type : 'POST',
		data : paramInfo,
		dataType : 'json',
		success : function(resultJSON){
			if(resultJSON.success){

				let data = resultJSON.data;

				// 차트 그리기
				fn_VM0202hourElecUsageChart(yyyymmdd, data);

				if( parent == 'VM0202' ){
					$('#viewLoadingDiv').fadeOut();
				}

			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

function fn_VM0202Redirect(){
	$('#returnFrom').attr("action", "/VM0201Redirect");
	$("#returnFrom").submit();
}


// 시간대별 전력 사용량 차트
function fn_VM0202hourElecUsageChart(yyyymmdd, data) {

	let newYyyymmdd = gfn_changeYyyymmdd(yyyymmdd);

	let categArr = [data.length];
	let mainArr = [data.length];
	let tempArr = [data.length];

	for (let i = 0; i < data.length; i++) {
		categArr[i] = data[i].hh + ':00';
		tempArr[i] = data[i].main;
		mainArr[i] = data[i].temp;
	}

	// 2. chart theme
	var setGraphStyle = {
		common:{
			txt:"#E0E0E3",
			line:"#707073",
			chart_1:"#2b9492",
			chart_2:"#91f27f"
		},
		gsr_theme:{
			txt:"#222",
			line:"#888",
			chart_1:"#9f6593",
			chart_2:"#fc986a"
		},
	};
	var graphStyle = setGraphStyle[smGraphStyleForVm];
	Highcharts.theme = {
		colors: [graphStyle.chart_1, graphStyle.chart_2],
		chart: {
			backgroundColor: "",
			plotBorderColor: '#606063'
		},
		title: {
			style: {
				fontSize: '10px'
			}
		},
		subtitle: {
			style: {
				color: '#E0E0E3',
				fontSize: '10px'
			}
		},
		xAxis: {
			gridLineColor: '#707073',
			labels: {
				style: {
					color: graphStyle.txt
				}
			},
			lineColor: graphStyle.line,
			minorGridLineColor: '#505053',
			tickColor: graphStyle.line,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		yAxis: {
			gridLineColor: graphStyle.line,
			labels: {
				style: {
					color: graphStyle.txt,
				}
			},
			lineColor: '#707073',
			minorGridLineColor: '#505053',
			tickColor: graphStyle.line,
			tickWidth: 1,
			title: {
				style: {
					color: '#A0A0A3'
				}
			}
		},
		tooltip: {
			backgroundColor: 'rgba(0, 0, 0, 0.85)',
			style: {
				color: '#F0F0F0'
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
				color: graphStyle.txt,
			},
			itemHoverStyle: {
				color: graphStyle.txt,
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

	// 3. set chart
	Highcharts.chart('container_graph', {
		chart: {
			type: 'line'
		},
		title: {
			text: newYyyymmdd,
			style: {
				fontSize: '20px'
			}
		},
		xAxis: {
			min: -0.5,
			max: 5.5
		},
		yAxis: {
			min: 0
		},
		credits: {
			enabled: false
		},
		legend: {
			align:'center',
			verticalAlign:'top'
		},
		xAxis: [{
			crosshair: true,
			categories: categArr
		}],
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
					//	return (this.value > 0 ? '' : '') + numberWithCommas (this.value ) + ' kW';
					return this.value + " kW";
				}
			}
		},
		plotOptions: {
			series: {
				borderColor: Highcharts.getOptions().colors[0]
			}
		},
		series: [{
			type: 'line',
			name: '냉난방',
			data: mainArr,
			marker: {
				enabled: false
			},
			states: {
				hover: {
					lineWidth: 0
				}
			},
			tooltip: {
				valueSuffix: ' kW'
			}
			//	enableMouseTracking: false
		}, {
			type: 'line',
			name: '기타',
			data: tempArr,
			marker: {
				enabled: false
			},
			states: {
				hover: {
					lineWidth: 0
				}
			},
			tooltip: {
				valueSuffix: ' kW'
			}
			//	enableMouseTracking: false
		}],
		exporting: {
			buttons: {
				contextButton: {
					enabled: false
				}
			}
		}
	});
}