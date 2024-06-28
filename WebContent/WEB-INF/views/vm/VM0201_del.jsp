<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="../cm/message.jsp" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=0.1, user-scalable=no, target-densitydpi=medium-dpi" />
<meta name="format-detection" content="telephone=no, address=no, email=no" />
<!-- <meta name="theme-color" content="#353942" /> 주소창 컬러 -->
<title>에너지 관제시스템 모바일웹 - 사용량</title>
<link rel="icon" href="data:,">
<!-- <link rel="shortcut icon" href="/resources/favico.ico" type="image/x-icon" /> -->
<!-- <link rel="icon" href="/resources/favico.ico" type="image/x-icon" /> -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/images/app_icon.png" />
<link rel="apple-touch-icon-precomposed" href="/images/app_icon.png" />
<link rel="stylesheet" type="text/css" href="/resources/css/common.css?ver=${toDay}" />
<link rel="stylesheet" type="text/css" href="/${smCompanyCd}/lib/css/customer.css?ver=${toDay}" />
<script src="/resources/js/jquery-1.8.2.min.js"></script>
<script src="/resources/js/jquery.popupoverlay.js"></script>
<script src="/resources/js/common.js?ver=${toDay}"></script>

<!-- chart 구현 lib -->
<script src="/resources/js/highcharts/highcharts.js"></script>
<script src="/resources/js/highcharts/modules/data.js"></script>
<script src="/resources/js/highcharts/modules/drilldown.js"></script>
<!-- /chart 구현 lib -->
	<script>
		var _rollbarConfig = {
			accessToken: localStorage.getItem('rollBarToken'),
			captureUncaught: true,
			captureUnhandledRejections: true,
			payload: {
				environment: localStorage.getItem('envMode'),
				// context: 'rollbar/test'
				client: {
					javascript: {
						code_version: '1.0',
						// source_map_enabled: true,
						// guess_uncaught_frames: true
					}
				}
			}
		};
		// Rollbar Snippet
		!function(r){var e={};function o(n){if(e[n])return e[n].exports;var t=e[n]={i:n,l:!1,exports:{}};return r[n].call(t.exports,t,t.exports,o),t.l=!0,t.exports}o.m=r,o.c=e,o.d=function(r,e,n){o.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},o.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},o.t=function(r,e){if(1&e&&(r=o(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var t in r)o.d(n,t,function(e){return r[e]}.bind(null,t));return n},o.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(e,"a",e),e},o.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},o.p="",o(o.s=0)}([function(r,e,o){"use strict";var n=o(1),t=o(5);_rollbarConfig=_rollbarConfig||{},_rollbarConfig.rollbarJsUrl=_rollbarConfig.rollbarJsUrl||"https://cdn.rollbar.com/rollbarjs/refs/tags/v2.26.0/rollbar.min.js",_rollbarConfig.async=void 0===_rollbarConfig.async||_rollbarConfig.async;var a=n.setupShim(window,_rollbarConfig),l=t(_rollbarConfig);window.rollbar=n.Rollbar,a.loadFull(window,document,!_rollbarConfig.async,_rollbarConfig,l)},function(r,e,o){"use strict";var n=o(2),t=o(3);function a(r){return function(){try{return r.apply(this,arguments)}catch(r){try{console.error("[Rollbar]: Internal error",r)}catch(r){}}}}var l=0;function i(r,e){this.options=r,this._rollbarOldOnError=null;var o=l++;this.shimId=function(){return o},"undefined"!=typeof window&&window._rollbarShims&&(window._rollbarShims[o]={handler:e,messages:[]})}var s=o(4),d=function(r,e){return new i(r,e)},c=function(r){return new s(d,r)};function u(r){return a((function(){var e=this,o=Array.prototype.slice.call(arguments,0),n={shim:e,method:r,args:o,ts:new Date};window._rollbarShims[this.shimId()].messages.push(n)}))}i.prototype.loadFull=function(r,e,o,n,t){var l=!1,i=e.createElement("script"),s=e.getElementsByTagName("script")[0],d=s.parentNode;i.crossOrigin="",i.src=n.rollbarJsUrl,o||(i.async=!0),i.onload=i.onreadystatechange=a((function(){if(!(l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState)){i.onload=i.onreadystatechange=null;try{d.removeChild(i)}catch(r){}l=!0,function(){var e;if(void 0===r._rollbarDidLoad){e=new Error("rollbar.js did not load");for(var o,n,a,l,i=0;o=r._rollbarShims[i++];)for(o=o.messages||[];n=o.shift();)for(a=n.args||[],i=0;i<a.length;++i)if("function"==typeof(l=a[i])){l(e);break}}"function"==typeof t&&t(e)}()}})),d.insertBefore(i,s)},i.prototype.wrap=function(r,e,o){try{var n;if(n="function"==typeof e?e:function(){return e||{}},"function"!=typeof r)return r;if(r._isWrap)return r;if(!r._rollbar_wrapped&&(r._rollbar_wrapped=function(){o&&"function"==typeof o&&o.apply(this,arguments);try{return r.apply(this,arguments)}catch(o){var e=o;throw e&&("string"==typeof e&&(e=new String(e)),e._rollbarContext=n()||{},e._rollbarContext._wrappedSource=r.toString(),window._rollbarWrappedError=e),e}},r._rollbar_wrapped._isWrap=!0,r.hasOwnProperty))for(var t in r)r.hasOwnProperty(t)&&(r._rollbar_wrapped[t]=r[t]);return r._rollbar_wrapped}catch(e){return r}};for(var p="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,captureEvent,captureDomContentLoaded,captureLoad".split(","),f=0;f<p.length;++f)i.prototype[p[f]]=u(p[f]);r.exports={setupShim:function(r,e){if(r){var o=e.globalAlias||"Rollbar";if("object"==typeof r[o])return r[o];r._rollbarShims={},r._rollbarWrappedError=null;var l=new c(e);return a((function(){e.captureUncaught&&(l._rollbarOldOnError=r.onerror,n.captureUncaughtExceptions(r,l,!0),e.wrapGlobalEventHandlers&&t(r,l,!0)),e.captureUnhandledRejections&&n.captureUnhandledRejections(r,l,!0);var a=e.autoInstrument;return!1!==e.enabled&&(void 0===a||!0===a||"object"==typeof a&&a.network)&&r.addEventListener&&(r.addEventListener("load",l.captureLoad.bind(l)),r.addEventListener("DOMContentLoaded",l.captureDomContentLoaded.bind(l))),r[o]=l,l}))()}},Rollbar:c}},function(r,e,o){"use strict";function n(r,e,o,n){r._rollbarWrappedError&&(n[4]||(n[4]=r._rollbarWrappedError),n[5]||(n[5]=r._rollbarWrappedError._rollbarContext),r._rollbarWrappedError=null);var t=e.handleUncaughtException.apply(e,n);o&&o.apply(r,n),"anonymous"===t&&(e.anonymousErrorsPending+=1)}r.exports={captureUncaughtExceptions:function(r,e,o){if(r){var t;if("function"==typeof e._rollbarOldOnError)t=e._rollbarOldOnError;else if(r.onerror){for(t=r.onerror;t._rollbarOldOnError;)t=t._rollbarOldOnError;e._rollbarOldOnError=t}e.handleAnonymousErrors();var a=function(){var o=Array.prototype.slice.call(arguments,0);n(r,e,t,o)};o&&(a._rollbarOldOnError=t),r.onerror=a}},captureUnhandledRejections:function(r,e,o){if(r){"function"==typeof r._rollbarURH&&r._rollbarURH.belongsToShim&&r.removeEventListener("unhandledrejection",r._rollbarURH);var n=function(r){var o,n,t;try{o=r.reason}catch(r){o=void 0}try{n=r.promise}catch(r){n="[unhandledrejection] error getting `promise` from event"}try{t=r.detail,!o&&t&&(o=t.reason,n=t.promise)}catch(r){}o||(o="[unhandledrejection] error getting `reason` from event"),e&&e.handleUnhandledRejection&&e.handleUnhandledRejection(o,n)};n.belongsToShim=o,r._rollbarURH=n,r.addEventListener("unhandledrejection",n)}}}},function(r,e,o){"use strict";function n(r,e,o){if(e.hasOwnProperty&&e.hasOwnProperty("addEventListener")){for(var n=e.addEventListener;n._rollbarOldAdd&&n.belongsToShim;)n=n._rollbarOldAdd;var t=function(e,o,t){n.call(this,e,r.wrap(o),t)};t._rollbarOldAdd=n,t.belongsToShim=o,e.addEventListener=t;for(var a=e.removeEventListener;a._rollbarOldRemove&&a.belongsToShim;)a=a._rollbarOldRemove;var l=function(r,e,o){a.call(this,r,e&&e._rollbar_wrapped||e,o)};l._rollbarOldRemove=a,l.belongsToShim=o,e.removeEventListener=l}}r.exports=function(r,e,o){if(r){var t,a,l="EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload".split(",");for(t=0;t<l.length;++t)r[a=l[t]]&&r[a].prototype&&n(e,r[a].prototype,o)}}},function(r,e,o){"use strict";function n(r,e){this.impl=r(e,this),this.options=e,function(r){for(var e=function(r){return function(){var e=Array.prototype.slice.call(arguments,0);if(this.impl[r])return this.impl[r].apply(this.impl,e)}},o="log,debug,info,warn,warning,error,critical,global,configure,handleUncaughtException,handleAnonymousErrors,handleUnhandledRejection,_createItem,wrap,loadFull,shimId,captureEvent,captureDomContentLoaded,captureLoad".split(","),n=0;n<o.length;n++)r[o[n]]=e(o[n])}(n.prototype)}n.prototype._swapAndProcessMessages=function(r,e){var o,n,t;for(this.impl=r(this.options);o=e.shift();)n=o.method,t=o.args,this[n]&&"function"==typeof this[n]&&("captureDomContentLoaded"===n||"captureLoad"===n?this[n].apply(this,[t[0],o.ts]):this[n].apply(this,t));return this},r.exports=n},function(r,e,o){"use strict";r.exports=function(r){return function(e){if(!e&&!window._rollbarInitialized){for(var o,n,t=(r=r||{}).globalAlias||"Rollbar",a=window.rollbar,l=function(r){return new a(r)},i=0;o=window._rollbarShims[i++];)n||(n=o.handler),o.handler._swapAndProcessMessages(l,o.messages);window[t]=n,window._rollbarInitialized=!0}}}}]);
		// End Rollbar Snippet

		// Rollbar.info('Hello world!'); // Sending an arbitrary message to Rollbar
		//
		// var a = null;
		// a.hello(); // Creating an error with an invalid line of code. The SDK will automatically catch and report it.

	</script>

</head>
<body>
	<form name="form">
		<input type="hidden" id="paramData" name="paramData" />
	</form>

	<!-- wrap -->
	<div id="wrap">

		<!-- 전체메뉴 -->
		<nav class="nav">
			<%@ include file="../cm/CM0301.jsp" %>
		</nav>
		<!-- //전체메뉴 -->

		<!-- trunk -->
		<div class="trunk">
			<!-- header -->
			<header>
				<div id="header_multilayer">
					<h1 class="blind">에너지 관제시스템</h1>

					<!-- 전체메뉴 아이콘 버튼 -->
					<div class="icon_gnb">
						<h2><a title="전체메뉴" class="btn_gnb">전체메뉴</a></h2>
					</div>
					<!-- //전체메뉴 아이콘 버튼 -->

					<!-- 점포명 -->
					<div class="shop_name">
						<a href="#" onclick="javascript:fn_setPopupData(); return false;" class="btn_shop_info shop_info_popup_open" title="팝업창"><span id="strDataCombo"></span></a>
					</div>
					<input type="hidden" id="hStrCd"/>
					<input type="hidden" id="hStrNm"/>
					<!-- //점포명 -->

					<!-- 점포 정보 레이어 팝업 -->
					<div id="shop_info_popup"></div>
					<!-- //점포 정보 레이어 팝업 -->

					<!-- 헤더 우측 아이콘 버튼 그룹 -->
					<ul class="header_button_group">
						<!-- 복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->
						<c:if test="${authSp ne 'S' || ( authSp eq 'S' && storeListCnt ne 1 ) }">
							<li><a href="#" onclick="javascript:gfn_storeSearch( 'energyAnalMobile' ); return false;" class="btn_search">${smStr}조회</a></li>
						</c:if>
						<!-- //복수 점포 소유자가 아닌 점포사용자는 노출하지 않음 -->

						<!-- 알람 표시 영역 -->
						<li>
							<a href="/VM0701Redirect" class="btn_message">
								<span>알람</span>
								<span id="alarmNewImg" style="display:none"><img src="/images/icon_new.png" alt="NEW" class="update" /></span>
							</a>
						</li>
						<!-- //알람 표시 영역 -->
					</ul>
					<!-- //헤더 우측 아이콘 버튼 그룹 -->

				</div>
				<div id="header_sub">

					<!-- 툴바영역 -->
					<div class="toolbar">

						<!-- 타이틀 -->
						<div class="title_header_search">
							<h3>사용량</h3>
						</div>
						<!-- //타이틀 -->

						<!-- 새로고침 버튼영역 -->
						<ul class="header_refesh_button">
							<li><a href="" class="btn_refresh" onclick="javascript:fn_VM0201refresh(); return false;"><img src="/images/btn_refresh.png" alt="새로고침" /></a></li>
						</ul>
						<!-- //새로고침 버튼영역 -->

					</div>
					<!-- //툴바영역 -->
				</div>
			</header>
			<!-- //header -->

			<!-- container -->
			<div id="container">

				<!-- 그래프 section -->
				<section>
					<h3 class="blind">전력사용량 비교</h3>
					<div class="graph_section" id="container_graph"></div>
				</section>
				<!-- //그래프 section -->

				<!-- 데이터 테이블 section -->
				<section>
					<div class="amountInfo">
						<!-- 냉난방 가동시간 -->
						<h3>냉난방 가동시간</h3>
						<div class="amountBox">
							<div class="tblBox">
								<table>
									<colgroup>
										<col span="2" style="width:50%;" />
									</colgroup>
									<thead>
									<tr>
										<th colspan="2">나의 ${smStr}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<div class="dBox">
												<span class="subject">오늘</span><strong class="content blue"><span id="myStrHacOperTimeToday"></span></strong>
											</div>
										</td>
										<td>
											<div class="dBox">
												<span class="subject">일평균</span><strong class="content blue"><span id="myStrHacOperTimeAvg"></span></strong>
											</div>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<div class="tblBox">
								<table>
									<colgroup>
										<col span="2" style="width:50%;" />
									</colgroup>
									<thead>
									<tr>
										<th colspan="2">비교 ${smStr}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<div class="dBox">
												<span class="subject">오늘</span><strong class="content"><span id="similarStrHacOperTimeToday"></span></strong>
											</div>
										</td>
										<td>
											<div class="dBox">
												<span class="subject">일평균</span><strong class="content"><span id="similarStrHacOperTimeAvg"></span></strong>
											</div>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
						<!-- //냉난방 가동시간 -->

						<!-- 냉난방 전력사용량 -->
						<h3>냉난방 전력사용량</h3>
						<div class="amountBox">
							<div class="tblBox">
								<table>
									<colgroup>
										<col span="2" style="width:50%;" />
									</colgroup>
									<thead>
									<tr>
										<th colspan="2">나의 ${smStr}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<div class="dBox">
												<span class="subject">오늘</span><strong class="content blue"><span id="myStrHacOperUseToday"></span> kWh</strong>
											</div>
										</td>
										<td>
											<div class="dBox">
												<span class="subject">일평균</span><strong class="content blue"><span id="myStrHacOperUseAvg"></span> kWh</strong>
											</div>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
							<div class="tblBox">
								<table>
									<colgroup>
										<col span="2" style="width:50%;" />
									</colgroup>
									<thead>
									<tr>
										<th colspan="2">비교 ${smStr}</th>
									</tr>
									</thead>
									<tbody>
									<tr>
										<td>
											<div class="dBox">
												<span class="subject">오늘</span><strong class="content"><span id="similarStrHacOperUseToday"></span> kWh</strong>
											</div>
										</td>
										<td>
											<div class="dBox">
												<span class="subject">일평균</span><strong class="content"><span id="similarStrHacOperUseAvg"></span> kWh</strong>
											</div>
										</td>
									</tr>
									</tbody>
								</table>
							</div>
						</div>
						<!-- //냉난방 전력사용량 -->
					</div>
				</section>
				<!-- //데이터 테이블 section -->

				<!-- 지시문 -->
				<p class="direction">비교${smStr} : 나의 점포와 면적이 비슷한 ${smStr}</p>
				<p class="direction">일평균 : 당월 1일부터 현재까지</p>
				<!-- //지시문 -->

			</div>
			<!-- //container -->
		</div>
		<!-- //trunk -->
	</div>
	<!-- //wrap -->

	<!-- 로딩 -->
	<div id="viewLoadingDiv">
		<div id="viewLoadingImg"></div>
	</div>
	<!-- //로딩 -->

	<!-- viewJs import -->
	<script src="/resources/viewJs/vm/VM0201.js"></script>
	<!-- //viewJs import -->
</body>
</html>
