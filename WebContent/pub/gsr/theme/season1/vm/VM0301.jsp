<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>에너지 관제시스템 모바일웹 - 냉난방설정</title>
	<%@ include file="../include/commonHead.jsp"%>
	<!-- chart 구현 lib -->
	<script src="/resources/js/highcharts/stock/highstock.js"></script>
	<script src="/resources/js/highcharts/stock/modules/exporting.js"></script>
	<script src="/resources/js/highcharts/stock/modules/export-data.js"></script>
	<!-- //chart 구현 lib -->
</head>
<body>
	<div id="wrap">
		<!-- 전체메뉴 -->
		<%@ include file="/pub/common/cm/CM0301.jsp"%>
		<!-- //전체메뉴 -->
		
		<!-- 공통 -->
		<%@ include file="/pub/common_theme/vm/VM0301.jsp"%>
		<!-- //공통 -->
	</div>
	<!-- //wrap -->

	<script>
	$(function() {
		// toggle
		$(".condition .cmToggle").cmToggle(0, 
			function() {
			}
		);
		$(".setting .cmToggle").cmToggle(2, 
			function() {
			}
		);
		
		// high chart
		// Apply the theme
		Highcharts.theme = {
			tooltip: {
				backgroundColor: 'rgba(51, 51, 51, 0.9)',
				style: {
					color: '#fff'
				}
			}
		};
	
		Highcharts.setOptions(Highcharts.theme);
		
		var tempData = [
			['20181005',	'01',	'2.5'],
			['20181005',	'02',	'3.0'],
			['20181005',	'03',	'4.2'],
			['20181005',	'04',	'3.8'],
			['20181005',	'05',	'3.4'],
			['20181005',	'06',	'3.3'],
			['20181005',	'07',	'3.0'],
			['20181005',	'08',	'2.0'],
			['20181005',	'09',	'2.2'],
			['20181005',	'10',	'2.4'],
			['20181005',	'11',	'2.5'],
			['20181005',	'12',	'3.9'],
			['20181005',	'13',	'3.8'],
			['20181005',	'14',	'3.8'],
			['20181005',	'15',	'2.1'],
			['20181005',	'16',	'4.6'],
			['20181005',	'17',	'3.4'],
			['20181005',	'18',	'3.9'],
			['20181005',	'19',	'3.1'],
			['20181005',	'20',	'3.6'],
			['20181005',	'21',	'3.0'],
			['20181005',	'22',	'4.0'],
			['20181005',	'23',	'3.2'],
			['20181006',	'00',	'2.8'],
			['20181006',	'01',	'2.6'],
			['20181006',	'02',	'2.9'],
			['20181006',	'03',	'4.8'],
			['20181006',	'04',	'2.6'],
			['20181006',	'05',	'2.9'],
			['20181006',	'06',	'2.1'],
			['20181006',	'07',	'1.8'],
			['20181006',	'08',	'1.8'],
			['20181006',	'09',	'2.7'],
			['20181006',	'10',	'4.2'],
			['20181006',	'11',	'4.9'],
			['20181006',	'12',	'4.0'],
			['20181006',	'13',	'3.3'],
			['20181006',	'14',	'4.7'],
			['20181006',	'15',	'3.3'],
			['20181006',	'16',	'2.9'],
			['20181006',	'17',	'2.2'],
			['20181006',	'18',	'5.2'],
			['20181006',	'19',	'2.3'],
			['20181006',	'20',	'1.9'],
			['20181006',	'21',	'2.2'],
			['20181006',	'22',	'3.6'],
			['20181006',	'23',	'2.8'],
			['20181007',	'00',	'4.7'],
			['20181007',	'01',	'4.8'],
			['20181007',	'02',	'3.4'],
			['20181007',	'03',	'5.0'],
			['20181007',	'04',	'5.0'],
			['20181007',	'05',	'3.4'],
			['20181007',	'06',	'3.2'],
			['20181007',	'07',	'4.4'],
			['20181007',	'08',	'2.8'],
			['20181007',	'09',	'3.8'],
			['20181007',	'10',	'4.2'],
			['20181007',	'11',	'4.6'],
			['20181007',	'12',	'5.1'],
			['20181007',	'13',	'5.2'],
			['20181007',	'14',	'5.8'],
			['20181007',	'15',	'4.0'],
			['20181007',	'16',	'5.6'],
			['20181007',	'17',	'5.5'],
			['20181007',	'18',	'5.4'],
			['20181007',	'19',	'3.7'],
			['20181007',	'20',	'5.3'],
			['20181007',	'21',	'5.9'],
			['20181007',	'22',	'4.3'],
			['20181007',	'23',	'4.1'],
			['20181008',	'00',	'3.6'],
			['20181008',	'01',	'2.5'],
			['20181008',	'02',	'2.0'],
			['20181008',	'03',	'2.5'],
			['20181008',	'04',	'2.3'],
			['20181008',	'05',	'2.5'],
			['20181008',	'06',	'2.2'],
			['20181008',	'07',	'2.2'],
			['20181008',	'08',	'1.8'],
			['20181008',	'09',	'3.0'],
			['20181008',	'10',	'3.1'],
			['20181008',	'11',	'3.8'],
			['20181008',	'12',	'4.9'],
			['20181008',	'13',	'4.0'],
			['20181008',	'14',	'4.4'],
			['20181008',	'15',	'4.5'],
			['20181008',	'16',	'4.4'],
			['20181008',	'17',	'2.9'],
			['20181008',	'18',	'4.4'],
			['20181008',	'19',	'2.9'],
			['20181008',	'20',	'3.9'],
			['20181008',	'21',	'3.5'],
			['20181008',	'22',	'4.8'],
			['20181008',	'23',	'2.9'],
			['20181009',	'00',	'2.8'],
			['20181009',	'01',	'1.9'],
			['20181009',	'02',	'2.5'],
			['20181009',	'03',	'2.7'],
			['20181009',	'04',	'2.3'],
			['20181009',	'05',	'2.6'],
			['20181009',	'06',	'2.1'],
			['20181009',	'07',	'2.5'],
			['20181009',	'08',	'2.0'],
			['20181009',	'09',	'2.8'],
			['20181009',	'10',	'2.3'],
			['20181009',	'11',	'5.3'],
			['20181009',	'12',	'5.5'],
			['20181009',	'13',	'5.4'],
			['20181009',	'14',	'4.4'],
			['20181009',	'15',	'3.7'],
			['20181009',	'16',	'4.4'],
			['20181009',	'17',	'6.9'],
			['20181009',	'18',	'5.4'],
			['20181009',	'19',	'3.5'],
			['20181009',	'20',	'5.3'],
			['20181009',	'21',	'4.9'],
			['20181009',	'22',	'7.9'],
			['20181009',	'23',	'3.4'],
			['20181010',	'00',	'5.1'],
			['20181010',	'01',	'4.6'],
			['20181010',	'02',	'3.9'],
			['20181010',	'03',	'2.3'],
			['20181010',	'04',	'3.7'],
			['20181010',	'05',	'4.0'],
			['20181010',	'06',	'3.2'],
			['20181010',	'07',	'2.4'],
			['20181010',	'08',	'2.2'],
			['20181010',	'09',	'2.8'],
			['20181010',	'10',	'2.5'],
			['20181010',	'11',	'2.6'],
			['20181010',	'12',	'1.9'],
			['20181010',	'13',	'3.7'],
			['20181010',	'14',	'2.8'],
			['20181010',	'15',	'2.1'],
			['20181010',	'16',	'1.7'],
			['20181010',	'17',	'3.6'],
			['20181010',	'18',	'2.7'],
			['20181010',	'19',	'2.4'],
			['20181010',	'20',	'2.3'],
			['20181010',	'21',	'2.2'],
			['20181010',	'22',	'2.7'],
			['20181010',	'23',	'2.5'],
			['20181011',	'00',	'1.7'],
			['20181011',	'01',	'1.5'],
			['20181011',	'02',	'2.3'],
			['20181011',	'03',	'1.8'],
			['20181011',	'04',	'1.9'],
			['20181011',	'05',	'1.8'],
			['20181011',	'06',	'1.7'],
			['20181011',	'07',	'1.9'],
			['20181011',	'08',	'1.9'],
			['20181011',	'09',	'1.9'],
			['20181011',	'10',	'2.3'],
			['20181011',	'11',	'2.1'],
			['20181011',	'12',	'2.2'],
			['20181011',	'13',	'2.1'],
			['20181011',	'14',	'1.7'],
			['20181011',	'15',	'2.3'],
			['20181011',	'16',	'2.3'],
			['20181011',	'17',	'2.3'],
			['20181011',	'18',	'1.9'],
			['20181011',	'19',	'2.9'],
			['20181011',	'20',	'2.2'],
			['20181011',	'21',	'2.5'],
			['20181011',	'22',	'1.8'],
			['20181011',	'23',	'2.7'],
			['20181012',	'00',	'2.7'],
			['20181012',	'01',	'2.2'],
			['20181012',	'02',	'2.5'],
			['20181012',	'03',	'1.9'],
			['20181012',	'04',	'2.2'],
			['20181012',	'05',	'2.1'],
			['20181012',	'06',	'2.0'],
			['20181012',	'07',	'1.8'],
			['20181012',	'08',	'2.2'],
			['20181012',	'09',	'2.1'],
			['20181012',	'10',	'2.1'],
			['20181012',	'11',	'0.4'],
			['20181012',	'12',	'3.5'],
		];
		
		var DATA = [];
		for( var i=0; i<tempData.length; i++ ){
			var y = Number( tempData[i][0].substring(0,4) );
			var m = Number( tempData[i][0].substring(4,6) )-1;
			var d = Number( tempData[i][0].substring(6,8) );
			var h = Number( tempData[i][1] );
			
			var UTC_str = Date.UTC( y, m, d, h, 0 );
			console.log(UTC_str);
			
			DATA.push( [ Number(UTC_str), Number(tempData[i][2]) ] );
		}
		
		
		/* 
		var DATA = [
			[1529452800000,0.1],
			[1529456400000,0.1],
			[1529460000000,0.1],
			[1529463600000,0.2],
			[1529467200000,0.1],
			[1529470800000,0.1],
			[1529474400000,0.1],
			[1529478000000,0.1],
			[1529481600000,2],
			[1529485200000,4.6],
			[1529488800000,3.2],
			[1529492400000,2.4],
			[1529496000000,2.3],
			[1529499600000,1.3],
			[1529503200000,0.8],
			[1529506800000,0],
			[1529510400000,0],
			[1529514000000,0],
			[1529517600000,0],
			[1529521200000,0],
			[1529524800000,0],
			[1529528400000,0],
			[1529532000000,0],
			[1529535600000,0]
		];
		DATA = [];
		 */
		
		Highcharts.setOptions({
			lang: {
				weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
				shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				}
			});
		
		var setGraphStyle = { 
			gsr:{
				color:"#34b5ff",
				button:"#407c9f",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			}, 
			gsr_theme_season1:{
				color:"#0ccb46",
				button:"#407c9f",
				txt:"#222",
				line:"#888",
				grid_line:"#222"
			}, 
			gsr_theme_season2:{
				color:"#34b5ff",
				button:"#407c9f",
				txt:"#222",
				line:"#888",
				grid_line:"#222"
			}, 
			gsr_theme_season3:{
				color:"#ed8a21",
				button:"#407c9f",
				txt:"#222",
				line:"#888",
				grid_line:"#222"
			}, 
			gsr_theme_season4:{
				color:"#a39e09",
				button:"#407c9f",
				txt:"#222",
				line:"#888",
				grid_line:"#222"
			}, 
			gsr_theme_season5:{
				color:"#9299ed",
				button:"#407c9f",
				txt:"#222",
				line:"#888",
				grid_line:"#222"
			}, 
			ldc:{
				color:"#1b932a",
				button:"#518a58",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			},
			bgf:{
				color:"#9dc92a",
				button:"#728346",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			}, 
			poc:{
				color:"#e5a51c",
				button:"#728346",
				txt:"#fff",
				line:"#5a5a5a",
				grid_line:"#999"
			}, 
			
		};
		var graphStyle = setGraphStyle["gsr_theme_season1"];
	//	Highcharts.stockChart('container_graph', {	
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
				//borderColor: '#5a5a5a',
				//borderWidth: 1,
				//borderRadius: 10,
				plotBorderWidth: 1,
				plotBorderColor: graphStyle.line,//"#5a5a5a",
				spacingRight: 7,
				spacingLeft: 7,
				panning: true,
				height: 350,
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
					text: '[월/일 시:분]',
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
				lineColor: graphStyle.line,//"#5a5a5a",
				tickColor: graphStyle.line,//"#5a5a5a",
				gridLineColor: graphStyle.line,//"#5a5a5a",
				labels : {
					style : {
						fontSize : '1em',
						color: graphStyle.txt //"#ffffff"
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
	// 			min: 0,
	// 			max: 5,
				gridLineDashStyle : 'dash',
				gridLineColor: graphStyle.grid_line,//"#999999",
				minorTickInterval : 'auto',
				minorGridLineColor: graphStyle.line,//"#5a5a5a",
				labels: {
					format: '{value} kWh',
					style : {
						fontSize : '1em',
						color: graphStyle.txt//"#ffffff"
					}
				}
			},
			navigator : {
				series : {
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
				enabled : false,
			},
			scrollbar : {
				//enabled : true,
				enabled : false,
				
			},
			rangeSelector : {
				enabled: false,
			//	allButtonsEnabled : true,
				selected : 0,
				buttonTheme: { // styles for the buttons
					fill: 'none',
					stroke: 'none',
					'stroke-width': 0,
					r: 8,
					style: {
						color: graphStyle.color,
						fontWeight: 'bold'
					},
					states: {
						hover: {
							fill: graphStyle.button,
							style: {
								color: 'white'
							}
						},
						select: {
							fill: graphStyle.button,
							style: {
								color: 'white'
							}
						},
						disabled: {
							style: {
								color : '#545b64'
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
				}, /*{
					type : 'minute',
					count : 60,
					text : '1h'
				}, {
					type : 'minute',
					count : 180,
					text : '3h'
				}, */{
					type : 'minute',
					count : 360,
					text : '6h'
				}, {
					type : 'minute',
					count : 720,
					text : '12h'
				} ],
				inputEnabled : false
			},
			tooltip : {
				valueDecimals : 1,
				shared : false,
				valueSuffix : ' kWh',
				positioner : function() {
					return {
						x : 10,
						y : 40
					};
				},
			},
			series : [ {
				name : '전력량',
				data : DATA,
				type: 'spline',
				color : graphStyle.color//'#34b5ff'
			}],/*
			lang: {
				noData: "Nichts zu anzeigen"
			},
			noData: {
				style: {
					fontWeight: 'bold',
					fontSize: '15px',
					color: '#303030'
				}
			}*/
		});
	});
	</script>
</body>
</html>