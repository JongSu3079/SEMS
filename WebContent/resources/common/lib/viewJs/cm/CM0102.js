window.onpageshow = function(event) {
	fnAutoLoginChk();
}

var eulaFlag = 'N';
$(".clause input[type=checkbox]").off("change");
$(".clause input[type=checkbox]").on("change", function() {
	var checks = true;
	$(".clause input[type=checkbox]").each(function(index) {
		if(!this.checked) {
			return checks = false;
		}
	});

	if(checks) {
		$(".btn_aree_start a").removeClass("disabled");
		eulaFlag = 'Y';
	}
	else {
		$(".btn_aree_start a").addClass("disabled");
		eulaFlag = 'N';
	}
})

function fn_CM0102Agree() {
	fn_CM0102Save(eulaFlag);
}

function fn_CM0102Save(val) {
	if (val == "Y") {
		fnAutoLoginChk( 'T' );

		document.forms["formEula"].method = 'POST';
		document.forms["formEula"].submit();
	} else {
		location.href = "/logout";
	}
}

function fn_CM0102Back(){
	location.href = "/logout";
}
