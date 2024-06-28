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
//	fn_VM0201getTopInfo();
	fn_VM0201DemandMonth();
}

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

//월별 계약전력량
function fn_VM0201DemandMonth(){
	$.ajax({
		url : '/storeVM0201DemandMonth',
		type : 'POST',
		dataType : 'json',
		success : function(resultJSON){
			if(resultJSON.success){
				var data = resultJSON.data;
				
				if( data != "undefined" && data != null && data.length > 0 ) {
					// 차트 그리기
					fn_VM0201DemandChart_M(data);
					
					// 데이터 역순 정렬
					data.reverse();
	
					// 컬럼명 변경 (계약사용량 or 계약전력)
					if (data[0].actualContPower < 20 && data[0].elecKind == '일반용(갑)저압') {
						// $("#contTotalOrElec").html((data[0].totalUsage !== undefined ? '계약사용량(kW)' : '계약전력(kW)'));
						$("#contTotalOrElec").html('계약<br>사용량<br>(kWh)');
						$("#usageOrMaxDemand").html('사용량<br>(kWh)');
					} else {
						$("#contTotalOrElec").html('계약<br>전력<br>(kW)');
						$("#usageOrMaxDemand").html('최대수요<br>전력<br>(kW)');
					}
	
					
					// 표 그리기
					var demandList = '';
					for(var i = 0; i < data.length; i++ ){
	
						// 시간
						let hourVal = data[i].opTime === 'Y' ? 720 : 450;
	
	
						let contPower 		= data[i].contPower;		// 추천 계약전력
						let actualContPower = data[i].actualContPower;	// 한전 계약전력
	
						// 계약종별
						let elecKind = data[i].elecKind == '일반용(갑)저압' ? 'L' : 'H';
	
						// 계약사용량
						let contTotalUsage = null;
						if (actualContPower < 20 && elecKind == 'L') {
							contTotalUsage = actualContPower != 0 ? gfn_numberWithCommas(contPower * hourVal) : '미확인';
						}
	
						// 사용량
						let totalUsage = null;
						if (data[i].totalUsage !== undefined) {
							totalUsage = gfn_numberWithCommas(data[i].totalUsage);
						}
	
						// 최대수요전력
						let maxDemand = null;
						if (data[i].maxDemand !== undefined) {
							maxDemand = gfn_numberWithCommas(data[i].maxDemand);
						}
	
						let yyyyMm = data[i].yyyymm.replace('-', '');
	
						demandList += "<tr>" ;
						demandList += 	"<td style=\"color: #4a5cc7; text-decoration: underline;\" onclick=\"fn_VM0201getDayUsage(" + yyyyMm + "); return false;\">" + data[i].yyyymm + "</td>";
	
						if (actualContPower < 20  && elecKind == 'L') {
							demandList += 	"<td class='unit'>"+ contTotalUsage + "</td>";
							demandList += 	"<td class='unit'>"+ totalUsage +"</td>";
						} else {
							demandList += 	"<td class='unit'>"+ (actualContPower != 0 ? actualContPower  : '미확인') + "</td>";
							demandList += 	"<td class='unit'>"+ maxDemand + "</td>";
						}
	
						demandList += 	"<td class='unit'>"+data[i].freePower+"</td>";
						demandList += 	"<td class='unit'>"+data[i].temp+"</td>";
						demandList += "</tr>";
					}
	
					$("#demandMonthDetail").html(demandList);
					$("#elecKind").html(data[0].elecKind);
					$("#contPower").html(data[0].actualContPower != 0 ? data[0].actualContPower + 'kW' : '계약전력 미확인');
				}
			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

//월별 상세 계약전력량 차트
function fn_VM0201DemandChart_M( data ){
	// 1. data
	var categories = [data.length];
	var chartDataContPower_M = [data.length];
	var chartDataMaxContPower_M = [data.length];

	let colCate;
	
	var valUnit = "";

	if (data.length > 0) {
		if (data[0].totalUsage != undefined) {
			colCate = '사용량';
			valUnit = "kWh";
		} else {
			colCate = '최대수요전력';
			valUnit = "kW";
		}
	}

	for(var i=0; i<data.length;i++){
		categories[i] = [data[i].yyyymm];
		chartDataContPower_M[i] = [data[i].contPower];
		chartDataMaxContPower_M[i] = [data[i].totalUsage !== undefined ? data[i].totalUsage : data[i].maxDemand];
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
		lang: {
			thousandsSep: ','
		},
		chart: {
			backgroundColor: "",
			plotBorderColor: '#606063'
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
		xAxis: {
			min: -0.5,
			max: 5.5
		},
		yAxis: {
			min: 0
		},
		title: {
			text: ''
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
			categories: categories
		}],
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				formatter: function () {
				//	return (this.value > 0 ? '' : '') + numberWithCommas (this.value ) + ' kW';
					return (this.value > 0 ? '' : '') + gfn_numberWithCommas (this.value ) + valUnit ;
				}
			}
		},
		plotOptions: {
			series: {
				borderColor: Highcharts.getOptions().colors[0]
			}
		},
		series: [{
			type: 'column',
			name: colCate,
			data: chartDataMaxContPower_M,
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


//월별 계약전력량 페이지 이동
function fn_VM0201getDayUsage( yyyyMm ) {

	$("#yyyyMm").val(yyyyMm);

	var form = document.form;
	form.action = '/VM0202';
	form.method = "post";
	form.enctype = "application/x-www-form-urlencoded";
	form.submit();
}
