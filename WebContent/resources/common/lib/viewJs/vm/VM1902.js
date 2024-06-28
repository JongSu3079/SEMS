// 전역변수

let maintenanceNo = null;
let description1 = null;
let description2 = null;
let description3 = null;
let descriptionCnt = null;
var g_scrollTop = 0;

let imgCnt = 0;
var urlArr = [];
var typeArr = [];
var urlCheckArr = [];

let data = null;

$(function(){

	// 유지보수 내용 상세보기
	fn_VM1902getMntDetail();

	// 유지보수 사진
	fn_VM1902getMntImgList();
	
	// 로딩 없애기
	$('#viewLoadingDiv').fadeOut();

	// 보수품목 - 보수교체내용 매핑
	$('#mntItem').on('change', function(){
		let mntItemVal = $('#mntItem').val();
		$('#mntDescription').val(mntItemVal);
	})

	// 썸네일 뒤로가기 감지
	window.onpopstate = function(e){
		hideThumb();
	}

	fn_VM1902getMntCodeChange1();
	fn_VM1902getMntCodeChange3();

	addImg();
})

function fn_VM1902getMntImgList(){
	var param = new Object();
	param.maintenanceNo = $("#maintenanceNo").val();

	$.ajax({
		url:'/VM1902GetMntImgList',
		data:param,
		success:function(response){
			if(response.success){
				data = response.data;

				$('#imgs').show();

				let url = null;

				// 사진 여러개 썸네일 한번에 보여주기
				for (let i = 0; i < data.length; i++) {

					url = "https://kr.object.ncloudstorage.com/" + data[i].fileUrl;

					urlArr.push(url);
					urlCheckArr.push(2);

					showImg(url);

					imgCnt++;

					thumbnailZoom();
				}

			}
		}
	})
}

// 썸네일 크게 보기
// 이미지 가로, 세로 여부 판단
function thumbnailZoom() {
	$(".thumbBox .imgBox.be").off("click");
	$(".thumbBox .imgBox.be").on("click", function(){
		// history 추가
		history.pushState({}, "", "");

		// widndow scroll
		g_scrollTop = $(window).scrollTop();

		// 클릭한 이미지의 url
		var base64 = $(this).find("img").attr("src");

		// 이미지 사이즈
		var width = $(this).find("img").get(0).naturalWidth;
		var height = $(this).find("img").get(0).naturalHeight;

		// canvas 생성
		$("body").append($("<div id='thumbWhole' class='whole'><img /></div>)"));

		// 가로 또는 세로로 보이게 사이즈 조정
		if(width > height) {
			// horizontal
			$("#thumbWhole img").addClass("rotate");
			$("#thumbWhole img").attr('width', width*$(window).width()/height);
			$("#thumbWhole img").attr('height', $(window).width());
		}
		else {
			// vertical
			$("#thumbWhole img").attr('width', $(window).width());
			$("#thumbWhole img").attr('height', height*$(window).width()/width);
		}

		// 생성한 canvas에 src 적용
		$("#thumbWhole img").attr('src', base64);
		$("#thumbWhole").width($(window).width());
		$("#thumbWhole").height($(window).height());

		// 전체 화면 가리기
		$("#wrap").hide();

		// thumbnail whole mode
		// 뒤로 버튼 누르면 전체 화면 없애기
		$("#thumbWhole").off("click");
		$("#thumbWhole").on("click", function(){
			window.history.back();
		});
	});
}

// 사진 줌 취소
function hideThumb(){
	$("#wrap").show();
	$("#thumbWhole").remove();
	$(window).scrollTop(g_scrollTop);
}


function addImg() {

	$('#fileUpload').click();

	$("input[type=file]").off("change");
	$("input[type=file]").on("change", function(){
		console.log(this);
		readURL(this);
	});
}

//이미지 파일 섬네일 띄우기
function readURL(input) {
	if (imgCnt + input.files.length > 30) {
		alert("이미지는 최대 30개까지 가능합니다.")
		return false;
	}

	// 기존 칸 다음 칸에 이미지 추가
	for (let i = 0; i < input.files.length; i++) {
		const currentImageUrl = URL.createObjectURL(input.files[i])
		urlArr.push(currentImageUrl);
		urlCheckArr.push(0);
		showImg(currentImageUrl);
		imgCnt++;
	}

	fn_imgCompress(input)

	thumbnailZoom();
}

// 이미지 칸
function showImg(url) {
	var imgBox =
		'<div class="imgBox">' +
			'<div class="imgCon"  style="position: relative">' +
			'	<img src=' + url + ' style="width:150px; height:100px;"/>' +
				'<div class="btn_delete" title="사진 삭제" onclick="javascript:deleteImg(this)" style="border-radius: 50%; background-color: red; width: 17px; height: 17px; text-align: center; line-height: 16px; position: absolute; top: 5px; left: 5px;">' +
					'<span style="font-size: 12px; color: white;">X</span>' +
				'</div>' +
			'</div>' +
		'</div>';

	$('#imgContainer').append(imgBox);
}


// 이미지 삭제
function deleteImg(ele) {
	let src = $(ele).parent().children('img')[0].currentSrc;
	if(!confirm("정말 삭제하시겠습니까? \n(확인을 누르시면 바로 삭제가 되고 복원할 수 없습니다.)")) {
		return false;
	}

	for (let i = 0; i < urlArr.length; i++) {
		if (urlArr[i] == src) {
			urlArr.splice(i, 1);

			if (urlCheckArr[i] == 1) {
				urlCheckArr.splice(i, 1);

				// 화면에서 이미지 삭제
				$(ele).parent().closest('.imgBox').remove();

				imgCnt--;
				return;
			} else {
				urlCheckArr.splice(i, 1);
			}
		}
	}

	let dash = src.indexOf('_');
	let lastDot = src.lastIndexOf('.');

	// 이미지 번호
	let orderSeq = src.substring(dash+1, lastDot);

	var params = new Object();
	params.maintenanceNo = maintenanceNo;
	params.orderSeq 	= orderSeq;

	// ajax 삭제 로직 추가
	$.ajax({
		type : "POST",
		cache : false,
		url : '/VM1902deleteMntImg',
		data : params,
		dataType:'json',
		success : function(rslt){

			if (rslt == true) {
				alert('삭제되었습니다.')
			}
		},
		error: function() {
			alert('에러가 발생했습니다.');
		}
	});

	// 화면에서 이미지 삭제
	$(ele).parent().closest('.imgBox').remove();

	imgCnt--;
}


// 사진 압축
function fn_imgCompress() {

	$('.imgBox .imgCon img').each(function (i, ele) {

		let cnvImg64 = null;

		if (urlCheckArr[i] == 0) {
			var image = new Image();
			image.onload = function () {
				var width = this.width;
				var height = this.height;

				// 비율 변환
				var upWidth = 0;
				var upHeight = 0;

				// 기준 사이즈
				const anchorSize = 720;

				// 가로 또는 세로 둘 중 하나의 길이가 720이 넘어갈 경우 압축
				if (width >= height) {
					upWidth = (width >= anchorSize ? anchorSize : width);
					upHeight = (width >= anchorSize ? Math.round(anchorSize * height / width) : height);
				} else {
					upHeight = (height >= anchorSize ? anchorSize : height);
					upWidth = (height >= anchorSize ? Math.round(anchorSize * width / height) : width);
				}

				// 압축된 이미지로 url 변환
				var canvas = $('#tempCanvas')[0];
				canvas.width = upWidth;
				canvas.height = upHeight;
				canvas.getContext('2d').drawImage(image, 0, 0, upWidth, upHeight);
				cnvImg64 = canvas.toDataURL('image/jpeg', 70 / 100);

				// 압축된 url로 변경함
				urlArr[i] = cnvImg64;
				urlCheckArr[i] = 1;
				ele.src = cnvImg64;

			};
			image.src = ele.src;
		}
	});
}


function fn_VM1902getMntDetail(){
	var param = new Object();
	param.maintenanceNo = $("#maintenanceNo").val();

	$.ajax({
		url:'/VM1902GetMntDetail',
		data:param,
		success:function(response){
			if(response.success){
				let data = response.data;

				$("#strNm").text(data.strNm);
				$("#actionDate").text(data.actionDate);
				$("#inspector").text(data.inspector);
				$("#mntType").val(data.mntType);
				$("#mntItem").val(data.mntItem);
				$("#mntDescription").val(data.mntDescription);
				$("#descriptionText").val(data.descriptionText);
				$("#description1").val(data.description1);
				$("#relayCnt").val(data.relayCnt);
				$("#adaptorCnt").val(data.adaptorCnt);
				$("#haconCnt").val(data.haconCnt);
				$("#tSensorCnt").val(data.tSensorCnt);
				$("#btCnt").val(data.btCnt);
				$("#btICnt").val(data.btICnt);
				$("#utpCable").val(data.utpCable);
				$("#comments").val(data.comments);

				maintenanceNo = data.maintenanceNo;
				description1 = data.description1;
				description2 = data.description2;
				description3 = data.description3;
				descriptionCnt = data.descriptionCnt;

				// 선택별 목록 가져오기
				fn_VM1902getMntCode(description1);

				if (description2 != null && description2 != "") {
					$('#des2Box').show();
				}

				if (description3 != null && description3 != "") {
					$('#des3Box').show();
					$('#description3').val(description3);
				}

				if (descriptionCnt != null && descriptionCnt != "") {
					$('#desCntBox').show();
					$('#descriptionCnt').val(descriptionCnt);
				}
			}
		}
	})
}

// 처음 조회시 가져올 목록
function fn_VM1902getMntCode(des) {
	let params = {
		desVal : des
	};

	$.ajax({
		type: "POST",
		cache: false,
		url: '/VM1902GetMntDescList',
		data: params,
		dataType: 'json',
		success: function (rslt) {

			// 하위 목록 전체 삭제
			$('#description2').children().remove();

			$('#description2').append("<option value=''>선택</option>");

			for (let i = 0; i < rslt.length; i++) {
				$('#description2').append("<option value='"+ (rslt[i].code)+"'>" + rslt[i].commCdNm + "</option>")
			}

			$('#description2').val(description2);

			// 주요내용 : 냉장비 온도수집 오류 선택시 조치내용 보이기
			if (des == 'FR') {
				$('#des3Box').show();
				$('#description3').val(description3);
			}
		}
	})
}

// 주요내용 선택시
function fn_VM1902getMntCodeChange1() {
	$('#description1').on('change', function() {

		let des1 = $('#description1').val();

		let params = {
			desVal : des1
		};

		$.ajax({
			type: "POST",
			cache: false,
			url: '/VM1902GetMntDescList',
			data: params,
			dataType: 'json',
			success: function (rslt) {

				// 하위 카테고리 없는 코드들
				let notDes1ValList = ['', 'MAIN', 'CH', 'ETC'];

				if (notDes1ValList.includes(des1)) {
					$('#des2Box').hide();
					$('#des3Box').hide();
					$('#desCntBox').hide();

					// 안보이는 칸은 값 value 없음
					$('#description2').val("");
					$('#description3').val("");
					$('#descriptionCnt').val("");

				// 상세내용(품목)
				} else {
					$('#des2Box').show();
					$('#des3Box').hide();
					$('#desCntBox').hide();

					$('#description3').val("");
					$('#descriptionCnt').val("");

					// 주요 내용별로 하위 목록 보이기
					$('#description2').children().remove();

					$('#description2').append("<option value=''>선택</option>");

					for (let i = 0; i < rslt.length; i++) {
						$('#description2').append("<option value='"+ (rslt[i].code)+"'>" + rslt[i].commCdNm + "</option>")
					}

					// 냉장비 온도수집 오류 선택시 조치내용까지 나오기
					if (des1 == 'FR') {
						VM1902GetMntDescFrList();
					}
				}
			}
		})
	})
}

// 조치내용 선택시
function fn_VM1902getMntCodeChange3() {

	$('#description3').on('change', function(){

		description3 = $('#description3').val();

		// 조치내용 - BT추가 선택시 수량 입력칸
		if (description3 == "B209") {
			$('#desCntBox').show();
			$('#descriptionCnt').val(descriptionCnt);
		} else {
			$('#desCntBox').hide();
			$('#descriptionCnt').val("");
		}
	})
}

// 처음에 주요내용에서 '냉장비 온도수집 오류' 선택시 조치내용 나오기
function VM1902GetMntDescFrList() {
	$('#des3Box').show();

	if ( $('#description3').val() == "B209") {
		$('#desCntBox').show();
	}
}

function fn_VM1902Update() {
	let param = new Object();
	param.maintenanceNo = maintenanceNo;
	param.mntType = $('#mntType').val();
	param.mntItem = $('#mntItem').val();
	param.mntDescription = $('#mntDescription').val();
	param.descriptionText = $('#descriptionText').val();
	param.description1 = $('#description1').val();
	param.description2 = $('#description2').val();
	param.description3 = $('#description3').val();
	param.descriptionCnt = $('#descriptionCnt').val();
	param.relayCnt = $('#relayCnt').val();
	param.adaptorCnt = $('#adaptorCnt').val();
	param.haconCnt = $('#haconCnt').val();
	param.tSensorCnt = $('#tSensorCnt').val();
	param.btCnt = $('#btCnt').val();
	param.btICnt = $('#btICnt').val();
	param.utpCable = $('#utpCable').val();
	param.comments = $('#comments').val();
	param.urlArr = urlArr;
	param.urlCheckArr = urlCheckArr;

	$.ajax({
		type : "POST",
		url : '/VM1902UpdateMntFinish',
		data : param,
		dataType:'json',
		success : function(response) {

			if (response.success) {
				alert('수정했습니다.');
				fn_VM1902Redirect();
			}
		},
		error: function() {
			alert('에러가 발생했습니다.');
		}
	});
}

//뒤로가기 버튼
function fn_VM1902Redirect() {
	$('#returnFrom').attr("action", "/VM1901Redirect");
	$("#returnFrom").submit();
}