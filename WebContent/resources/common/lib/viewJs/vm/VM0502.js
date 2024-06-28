// 전역변수
var parentPage0502 = '';

// 스크립트 시작
function fn_VM0502refresh( parent ){

	if( parent == 'VM0101' ){
		parentPage0502 = parent;
		$('#viewLoadingDiv').show();
	}
	fn_VM0502GetFridgeStat(parent);
}



//간판 상태 조회
function fn_VM0502GetFridgeStat(parent){
	$.ajax({
		url : '/VM0502GetFridgeStat',
		type : 'POST',
		dataType : 'json',
		success : function(resultJSON){
			if(resultJSON.success){
				var data = resultJSON.items;

				// 표 그리기
				var fridgeList = '';
				for(var i = 0; i < data.length; i++ ){


					fridgeList += "<tr>";
					fridgeList += 	"<td class='unit' style='font-size: 15px;'>"+data[i].deviceLoc+"</td>";
					if (data[i].fridgeStat == '이상') {
						fridgeList += 	"<td class='unit' style='color: red; font-size: 15px;'>"+data[i].fridgeStat+"</td>";
					} else {
						fridgeList += 	"<td class='unit' style='font-size: 15px;'>"+data[i].fridgeStat+"</td>";
					}

					fridgeList += "</tr>";
				}
				$("#fridgeListDetail").html(fridgeList);

				if( parent == 'VM0101' ){
					$('#viewLoadingDiv').fadeOut();
				}
			}else{
				alert("(조회실패)다시 시도해주세요.");
			}
		}
	});
}

