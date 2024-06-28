<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

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

<h3>사이트 이용 약관</h3>
<h4>제 1 조 (목적)</h4>
<p>이 약관은 (주)에스앤아이코퍼레이션(이하 "회사”라 한다)가 제공하는 SEMS 엣스퍼트 서비스 및 관련 제반 서비스(이하 ”서비스”)의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
<h4>제 2 조 (정의)</h4>
<p>이 약관에서 사용하는 용어는 아래와 같습니다.</p>
<ul>
	<li>"회원"이라 함은 회사의 "서비스"에 접속하여 이 약관에 따라 "회사"와 이용계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.</li>
	<li>"아이디(ID)"라 함은 "회원"의 식별과 서비스 이용을 위하여 "회사" 혹은 "회원"이 정하고 "회사"가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
	<li>"비밀번호"라 함은 "회원"이 부여 받은 "아이디와 일치되는 "회원"임을 확인하고 비밀보호를 위해 "회원" 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
	<li>"게시물" 혹은 "콘텐츠"이라 함은 회원이 서비스를 이용함에 있어 서비스상에 게시한 부호ᆞ문자ᆞ음성ᆞ음향ᆞ화상ᆞ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
</ul>
<h4>제 3 조 (약관의 게시와 개정)</h4>
<ul>
	<li>"회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 최초 이용 시 게시합니다.</li>
	<li>"회사"는 "약관의규제에관한법률", "정보통신망이용촉진및정보보호에관한법률(이하 "정보통신망법")" 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
</ul>
<h4>제4조(약관의 해석)</h4>
<ul>
	<li>회사는 개별 서비스에 대해서는 별도의 이용약관 및 정책("기타 약관 등"이라 함)을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 "기타 약관 등"이 우선하여 적용됩니다.</li>
	<li>이 약관에서 정하지 아니한 사항이나 해석에 대해서는 "기타 약관 등" 및 관계법령 또는 상관례에 따릅니다.</li>
</ul>
<h4>제 5 조(이용계약 체결)</h4>
<ul>
	<li>이용신청은 인터넷을 통하여 "회원"이 "회사"에 요청하면, "회사"가 ID와 비밀번호를 설정하여 "회원"에게 통보합니다.</li>
	<li>점포 내 SEMS 장비 설치에 동의한 경우 "회원"의 별도의 신청이 없어도 이용신청을 한 것으로 봅니다.</li>
</ul>
<h4>제 6조 (회원정보의 변경)</h4>
<ul>
	<li>"회원"은 개인정보관리화면을 통하여 언제든지 본인의 개인정보를 열람하고 수정할 수 있습니다. 다만, 서비스 관리를 위해 필요한 아이디 등은 수정이 불가능합니다.</li>
	<li>"회원"은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 "회사"에 대하여 그 변경사항을 알려야 합니다.</li>
	<li>제2항의 변경사항을 "회사"에 알리지 않아 발생한 불이익에 대하여 "회사"는 책임지지 않습니다.</li>	
</ul>
<h4>제7조 (개인정보보호 의무)</h4>
<p>"회원이" "회사"의 "서비스"에 제공하는 정보 일체는 개인정보처리방침에 따르며, "회사"가 귀하의 정보를 수집 및 이용하는 행위는 동 정책에 따라 규율됩니다. "회원"은 본 서비스를 이용함으로써 "회사"가 "회원"의 정보를 수집 및 이용(개인정보처리방침에서 규정하는 바와 같음)하는 것에 동의하는 것으로 간주된다는 사실을 인지하고 있습니다. "회원"에게 본 서비스를 제공하는 것의 일환으로, "회사"는 서비스 관련 공지사항 및 행정적 사안에 관한 메시지를 비롯한 전달사항을 제공할 필요가 있을 수 있습니다.</p>
<h4>제 8 조 ("회원"의 "아이디" 및 "비밀번호"의 관리에 대한 의무)</h4>
<p>"회원"은 본 서비스에서 사용하는 비밀번호와 관련된 모든 행동을 보호/관리해야 합니다. "회사"는 귀하의 계정에 비밀번호를 강력한 암호(대문자, 소문자 및 숫자, 기호의 조합)로 설정할 것을 권장합니다. "회사"는 위 사항을 만족하지 못했을 때 일어난 어떠한 손실이나 피해에 대해 책임지지 않습니다. "회사"는 "서비스"를 안전하게 유지하기 위해 최선을 다하고 있지만 안전을 보장할 수는 없습니다.</p>
<h4>제 9조 ("회원"에 대한 통지)</h4>
<ul>
	<li>"회사"가 "회원"에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 "서비스" 내 공지 등으로 할 수 있습니다.</li>
	<li>"회사"는 "회원" 전체에 대한 통지의 경우 7일 이상 "회사"의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.</li>
</ul>
<h4>제 10조 ("회사"의 의무)</h4>
<ul>
	<li>"회사"는 관련법과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 "서비스"를 제공하기 위하여 최선을 다하여 노력합니다.</li>
	<li>"회사"는 "회원"이 안전하게 "서비스"를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고 준수합니다.</li>
	<li>"회사"는 서비스이용과 관련하여 "회원"으로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다. 회원이 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 "회원"에게 처리과정 및 결과를 전달합니다.</li>
</ul>
<h4>제 11조 (서비스 이용의 중지 또는 계약의 해지)</h4>
<ul>
	<li>"회원"은 다음 행위를 하여서는 안 됩니다.
		<ul>
			<li>신청 또는 변경 시 허위내용의 등록</li>
			<li>타인의 정보도용</li>
			<li>"회사"에 게시된 정보의 변경</li>
			<li>"회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
			<li>"회사"와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
			<li>"회사" 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
			<li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 "회사"에 공개 또는 게시하는 행위</li>
			<li>회사의 동의 없이 영리를 목적으로 서비스를 사용하는 행위</li>
			<li>기타 불법적이거나 부당한 행위</li>
		</ul>
	<li>"회원"은 관계법, 본 약관의 규정, 이용안내 및 "서비스"와 관련하여 공지한 주의사항, "회사"가 통지하는 사항 등을 준수하여야 하며, 기타 "회사"의 업무에 방해되는 행위를 하여서는 안 됩니다.</li>
</ul>
<h4>제 12조 (서비스의 제공 등)</h4>
<ul>
	<li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.</li>
	<li>"회사"는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 "회사"는 제9조("회원"에 대한 통지)에 정한 방법으로 "회원"에게 통지합니다. 다만, "회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.</li>
	<li>"회사"는 서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공시한 바에 따릅니다.</li>
</ul>
<h4>제 13조 (서비스의 변경))</h4>
<ul>
	<li>"회사"는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.
	<li>"회사"는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련법에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</li>
</ul>
<h4>제 14조 (정보의 제공)</h4>
<ul>
	<li>"회사"는 "회원"이 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로 "회원"에게 제공할 수 있습니다. 다만, "회원"은 관련법에 따른 거래관련 정보, 고객센터 답변 등을 제외하고 언제든지 전자우편 등을 통하여 수신 거절을 할 수 있습니다.</li>
	<li>제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 "회원"의 사전 동의를 받아서 전송합니다.</li>
</ul>
<h4>제 15조 (게시물의 저작권)</h4>
<ul>
	<li>"회원"이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
	<li>"회원"이 "서비스" 내에 게시하는 "콘텐츠"는 검색결과 내지 "서비스" 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, "회원"은 언제든지 고객센터 또는 "서비스" 내 관리기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.</li>
	<li>"회사"는 제2항 이외의 방법으로 회원의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의 동의를 얻어야 합니다.</li>
</ul>
<h4>제 16조 (게시물의 관리)</h4>
<ul>
	<li>"회원"의 게시물이 "정보통신망법" 및 "저작권법"등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, "회사"와 "회원"은 관련법에 따라 조치를 취하여야 합니다.</li>
	<li>"회사"는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치 등을 취할 수 있습니다.</li>
</ul>
<h4>제 17조 (권리의 귀속)</h4>
<ul>
	<li>"서비스"에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 회원의 게시물 및 제휴계약에 따라 제공된 저작물 등은 제외합니다.</li>
	<li>"회사"는 서비스와 관련하여 회원에게 회사가 정한 이용조건에 따라 계정, 아이디, 콘텐츠 등을 이용할 수 있는 이용권만을 부여하며, "회원"은 이를 양도, 판매, 담보제공 등의 처분행위를 할 수 없습니다.</li>
</ul>
<h4>제 18조 ("회원"의 계약해제, 해지 등)</h4>
<ul>
	<li>"회원"은 언제든지 고객센터를 통해 이용계약 해지 신청을 할 수 있으며, "회사"는 관련법 등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.</li>
	<li>"회원"이 계약을 해지할 경우, "회사"는 관련법 및 개인정보취급방침에 따라 "회사"가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 "회원"의 모든 데이터를 소멸하여야 합니다.</li>
</ul>
<h4>제 19조 (이용제한 등)</h4>
<ul>
	<li>"회사"는 "회원"이 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해한 경우, 서비스 이용을 경고, 일시정지, 계약해지로 단계적으로 제한할 수 있습니다 .</li>
	<li>"회사"는 전항에도 불구하고, "주민등록법"을 위반한 명의도용 및 결제도용, "저작권법" 및 "컴퓨터프로그램보호법"을 위반한 불법프로그램의 제공 및 운영방해, "정보통신망법"을 위반한 불법통신 및 해킹, 악성프로그램의 배포, 접속권한 초과행위 등과 같이 관련법을 위반한 경우에는 즉시 계약해지를 할 수 있습니다. 본 항에 따른 계약해지 시 서비스 이용을 통해 획득한 혜택 등도 모두 소멸되며, 회사는 이에 대해 별도로 보상하지 않습니다.</li>
	<li>회사는 본 조의 이용제한 범위 내에서 제한의 조건 및 세부내용은 이용제한정책 등에서 정한 바에 의합니다.</li>
	<li>본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는 "회사"는 제9조["회원"에 대한 통지]에 따라 통지합니다.</li>
	<li>"회원"은 본 조에 따른 이용제한 등에 대해 "회사"가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 서비스의 이용을 재개합니다.</li>
</ul>
<h4>제 20조 (책임의 한계)</h4>
<ul>
	<li>"회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여 "서비스"를 제공할 수 없는 경우에는 "서비스" 제공에 관한 책임이 면제됩니다.</li>
	<li>"회사"는 "회원" 의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
	<li>"회사"는 "회원"이 "서비스"와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.</li>
	<li>"회사"는 "회원" 간 또는 "회원"과 제3자 상호간에 "서비스"를 매개로 하여 거래 등을 한 경우에는 책임이 면제됩니다.</li>
	<li>"회사"는 무료로 제공되는 서비스 이용과 관련하여 관련법에 특별한 규정이 없는 한 책임을 지지 않습니다.</li>
</ul>
<h4>제 21조 (준거법 및 재판관할)</h4>
<ul>
	<li>"회사"와 "회원" 간 제기된 소송은 대한민국법을 준거법으로 합니다.</li>
	<li>"회사"와 "회원"간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다.</li>
</ul>
<h4>부칙</h4>
<ul>
	<li>이 약관은 2018년 11월 1일 부터 적용됩니다.</li>
</ul>