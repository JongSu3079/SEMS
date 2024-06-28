<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 냉장비온도</title>
	<%@ include file="../include/commonHead.jsp"%>
	<!-- chart 구현 lib -->
	<script src="/resources/js/highstock.js" ></script>
	<script src="/resources/js/exporting.js" ></script>
	<!-- /chart 구현 lib -->
</head>
<body>
	<div id="wrap">
		<!-- 공통 -->
		<%@ include file="/pub/common/cm/CM0501.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->
	<script>
	$(function() {
		var Day_data = [
			[1529452800000,12.37],
			[1529453100000,12.56],
			[1529453400000,12.37],
			[1529453700000,12.02],
			[1529454000000,12.02],
			[1529454300000,12.37],
			[1529454600000,12.56],
			[1529454900000,12.56],
			[1529455200000,12.37],
			[1529455500000,12.02]
		];	
		var deviceLoc = "WIC";
		var contents = "";
		var minTempLine = 0;
		var maxTempLine = 18.161000000000005;
		var minTemp = [2];
		var maxTemp = [13];
		Highcharts.setOptions({
			lang: {
				weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
				shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			}
		});
	
		var setGraphStyle = { 
			gsr:{
				color:"#34b5ff",
				min:"#35bd95",
				max:"#e83b3e",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
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
				line:"#5a5a5a",
				grid_line:"#999"
			},
			bgf:{
				color:"#9dc92a",
				min:"#35bd95",
				max:"#e83b3e",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			}, 
			poc:{
				color:"#e5a51c",
				min:"#35bd95",
				max:"#e83b3e",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			}, 
		};
		
		var graphStyle = setGraphStyle["gsr_theme_season4"];
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
				plotBorderColor: graphStyle.line,
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
					second : '%H:%M',
					minute : '%m/%d<br>%H:%M',
					hour : '%m/%d<br>%H:%M',
					day : '%m/%d<br>%H:%M',
					week : '%m/%d<br>%H:%M',
					month : '%Y/%m-%d<br>%H:%M',
					year : '%Y/%m-%d<br>%H:%M'
				},
				tickPixelInterval : 55,
				gridLineWidth : 1,
				lineColor: graphStyle.line,
				tickColor: graphStyle.line,
				gridLineColor: graphStyle.line,
				labels : {
					style : {
						fontSize : '1em',
						color: graphStyle.txt
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
			},
			yAxis : {
				min : Number(minTempLine)*1.1,
				max : Number(maxTempLine)*1.1,
				gridLineDashStyle : 'dash',
				gridLineColor: graphStyle.grid_line,
				minorTickInterval : 'auto',
				minorGridLineColor: graphStyle.line,
				labels: {
					format: '{value}℃',
					style : {
						fontSize : '1em',
						color: graphStyle.txt
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
				plotLines : [ 
					{	// 하한선(min)
						value : minTemp[0],
						width : 3,
						color : graphStyle.min,
					//	dashStyle : 'shortdash',
						label : {
							text : minTemp[0] + '℃',
							align : 'left',
							y : 12,
							style: {
								color: graphStyle.min
							}
						}
					}, 
					{	// 상한선(max)
						value : maxTemp[0],
						width : 3,
						color : graphStyle.max,
					//	dashStyle : 'shortdash',
						label : {
							text : maxTemp[0] + '℃',
							align : 'left',
							style: {
								color: graphStyle.max
							}
						}
					}
				],
			},
			navigator : {
				/*
				series : [
					{
						type : 'line',
						color : '#4572A7',
						fillOpacity : 0.05,
						dataGrouping : {
							smoothed : true
						},
						lineWidth : 1,
						marker : {
							enabled : false
						}
					},
					{
						type : 'line',
						//color : '#4572A7',
						fillOpacity : 0.05,
						dataGrouping : {
							smoothed : true
						},
						lineWidth : 1,
						marker : {
							enabled : false
						}
					},
					{
						type : 'line',
						//color : '#4572A7',
						fillOpacity : 0.05,
						dataGrouping : {
							smoothed : true
						},
						lineWidth : 1,
						marker : {
							enabled : false
						}
					}
				
				],
				*/
				enabled : false,
			},
			scrollbar : {
				//enabled : true,
				enabled : false,
				
			},
			rangeSelector : {
				enabled: false,
				/*
			//	allButtonsEnabled : true,
				selected : 0,
				buttonTheme: { // styles for the buttons
					fill: 'none',
					stroke: 'none',
					'stroke-width': 0,
					r: 8,
					style: {
						color: '#34b5ff',//'#039',
						fontWeight: 'bold'
					},
					states: {
						hover: {
							fill: '#407c9f',
							style: {
								color: 'white'
							}
						},
						select: {
							fill: '#407c9f',//'#039',
							style: {
								color: 'white'
							}
						},
						disabled: {
							style: {
								color: '#545b64'
							}
						}
					}
				},
				buttons : [ {
					type : 'day',
					count : 1,
					text : '1day'
				}, {
					type : 'day',
					count : 3,
					text : '3day'
				}, {
					type : 'day',
					count : 7,
					text : '7day'
				}, {
					type : 'minute',
					count : 60,
					text : '1h'
				}, {
					type : 'minute',
					count : 180,
					text : '3h'
				}, {
					type : 'minute',
					count : 360,
					text : '6h'
				}, {
					type : 'minute',
					count : 720,
					text : '12h'
				} ],
				inputEnabled : false
				*/
			},
			tooltip : {
				valueDecimals : 0,
				shared : false,
				valueSuffix : ' ℃',
				positioner : function() {
					return {
						x : 10,
						y : 40
					};
				},
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
				style: {
					color: '#F0F0F0'
				}
			},
			series : [ 
				{
					name : '온도',
					data : Day_data,
					type: 'spline',
					color : graphStyle.color
				},
			]
		});
	});
	</script>
</body>
</html>