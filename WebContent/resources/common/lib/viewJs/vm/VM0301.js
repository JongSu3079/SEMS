// 전역 변수
var graphSetFalg = 0;

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
		fn_VM0301refresh();
	}
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

// 점포 상세 정보 팝업 세팅
function fn_setPopupData(){
	var strCd = $('#hStrCd').val();
	gfn_setPopupData(strCd);
}

//새로고침
function fn_VM0301refresh() {
	graphSetFalg = 0;
	// 로딩 바 표시
	$('#viewLoadingDiv').show().fadeIn('fast');
	
	// 상단 냉난방기 설정 부분
	fn_VM0302refresh();
	
	// 하단 그래프 부분
	fn_VM0301popupTempGraph();
}

// 그래프 그리기
function fn_VM0301popupTempGraph(){
	$("#container_graph").empty();
	
	$.ajax({
		type : "POST",
		dataType : "JSON",
		contentType : "application/json; charset=UTF-8",
		url : "/VM0301Chart",
		async : false,
		beforeSend:function(){
		},
		error : function() {
			graphSetFalg = 2;
		},
		complete:function(){
			// 데이터 가져오기 종료
			fn_VM0301SetDataComplete();
		},
		success : function(returnJSON) {
			if (returnJSON.success) {
				graphSetFalg = 1;
				
				$("#container_graph").empty();
				
				var listmap = returnJSON.items;
				var DATA = [];
				/*
				if( listmap.length == 0 ){
					html = '<div><span class="no_result">조회된 내용이 없습니다.</span></div>';
					$("#container_graph").html(html);
					return;
				}
				*/
				
				for(var i = 0; i < listmap.length; i++ ){
					var utc_yyyy = Number(listmap[i].yyyymmdd.substring(0,4));
					var utc_mm = Number(listmap[i].yyyymmdd.substring(4,6))-1;
					
					var utc_dd = Number(listmap[i].yyyymmdd.substring(6,8));
					var utc_hh = Number(listmap[i].hh);
					var utc_min = Number("00");
					
					UTC_str = Date.UTC( 
							utc_yyyy, 
							utc_mm,
							utc_dd,
							utc_hh, 
							utc_min
							);
					
					DATA.push( [ Number(UTC_str), Number(listmap[i].useWatage)] );
				}
				
				Highcharts.setOptions({
					lang: {
						weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
						shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
					}
				});
				/*
				var setGraphStyle = {
					gsr:{
						color:"#34b5ff",
						button:"#407c9f"
					}, 
					ldc:{
						color:"#1b932a",
						button:"#518a58"
					}
				};
				*/
				var setGraphStyle = { 
					gsr:{
						color:"#34b5ff",
						button:"#407c9f",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
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
						line:"#999",
						grid_line:"#5a5a5a"
					},
					bgf:{
						color:"#9dc92a",
						button:"#728346",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					poc:{
						color:"#e5a51c",
						button:"#728346",
						txt:"#fff",
						line:"#999",
						grid_line:"#5a5a5a"
					}, 
					
				};
				var graphStyle = setGraphStyle[smGraphStyleForCm];
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
						//borderRadius: 10,
						plotBorderWidth: 1,
						plotBorderColor: graphStyle.line,
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
							hour : '%m/%d',
							day : '%m/%d',
							week : '%m/%d',//'%m/%d<br>%H:%M',
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
//						min: 0,
//						max: 5,
						gridLineDashStyle : 'dash',
						gridLineColor: graphStyle.grid_line,
						minorTickInterval : 'auto',
						minorGridLineColor: graphStyle.line,
						labels: {
							format: '{value}kWh',
							style : {
								fontSize : '1em',
								color: graphStyle.txt
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
						enabled : false,
					},
					rangeSelector : {
						selected : 5,	// 전체 데이터
						labelStyle: {
							visibility: 'hidden',	// 줌 영역 영역 숨기기
						},
						buttonTheme: {
							visibility: 'hidden',	// 줌 버튼 영역 숨기기
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
						dataGrouping: {
							enabled: false,		// 데이터 그루핑 해제
						},
						color : graphStyle.color
					},
					]
				});
			} else {
				graphSetFalg = 2;
			}
		}
	});
}

// 데이터 가져오기 종료
function fn_VM0301SetDataComplete(){
	// 둘 중 하나가 수행 중
	if( gwApSetFlag == 0 || graphSetFalg == 0 ){
		return false;
	// 둘 다 완료
	} else {
		$('#viewLoadingDiv').fadeOut();
		
		// 둘 다 성공
		if( gwApSetFlag == 1 && graphSetFalg == 1 ){
			return false;
		// 둘 다 실패
		} else if( (gwApSetFlag + graphSetFalg) == 4 ){
			alert( '(오류발생)다시 시도해주세요.' );
		// 하나만 실패
		} else {
			alert( '(오류발생)일부 데이터를 가져오는데 실패했습니다. 다시 시도해주세요.' );
		}
	}
}