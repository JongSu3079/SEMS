<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 에너지 사용량 분석</title>
	<%@ include file="../include/commonHead.jsp"%>
	<!-- chart 구현 lib -->
	<script src="/resources/js/highcharts/highcharts.js"></script>
	<script src="/resources/js/highcharts/modules/data.js"></script>
	<script src="/resources/js/highcharts/modules/drilldown.js"></script>
	<!-- /chart 구현 lib -->
</head>
<body>
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common/vm/VM0201.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->

	<script>
	$(function() {
		// 1. data
		var categories = [
			'2019-04', '2019-03', '2019-02',
			'2018-12', '2018-11', '2018-10', 
			'2018-09', '2018-08', '2018-06', 
			'2018-05', '2018-04', '2018-03'
		];
		
		var chartDataContPower_M = [
			22.0, 22.0, 22.0,
			22.0, 22.0, 22.0,
			22.0, 22.0, 22.0,
			22.0, 22.0, 22.0,
		];
	
		var chartDataMaxContPower_M = [
			8.6, 10.1, 8.0,
			10.0, 10.3, 10.5,
			8.1, 7.9, 9.6,
			8.4, 11.5, 10.3
		];
	
		
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
		
		var graphStyle = setGraphStyle["common"];
		Highcharts.theme = {
			colors: [graphStyle.chart_1, graphStyle.chart_2],
			chart: {
				backgroundColor: ""/*{
				linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
				stops: [ [0, '#4d4f50'], [1, '#4d4f50'] ]
				}*/,
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
				tickColor:graphStyle.line,
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
						color: graphStyle.txt
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
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
					color: graphStyle.txt
				},
				itemHoverStyle: {
					color: graphStyle.txt
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
						return this.value + " kW";
					}
				}
			},
			plotOptions: {
				series: {
				//	borderColor: Highcharts.getOptions().colors[0],
					borderWidth:0,
				}
			},
			series: [{
				type: 'column',
				name: '최대수요전력',
				data: chartDataMaxContPower_M,
	// 			data: (function() {
					
	
					
	// 			}()),
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
				name: '계약전력',
				data: chartDataContPower_M,
				marker: {
					radius: 4
				},
				tooltip: {
					valueSuffix: ' kW'
				}
			}],
			exporting: {
				buttons: {
					contextButton: {
						enabled: false
					}
				}
			}
		});
	});
	</script>
</body>
</html>