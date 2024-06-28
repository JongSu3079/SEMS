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

<h3>개인정보처리방침</h3>
<br />
<p>(주)에스앤아이코퍼레이션(이하 '회사')는 SEMS 엣스퍼트 APP 이용자(이하 '이용자')의 개인정보를 중요시하며, 개인정보의 보호와 관련하여 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 「개인정보보호법」, 「통신비밀보호법」 등 관련법 상의 개인정보 보호 규정을 준수하고 있습니다.</p>

<h4>1. 개인정보의 수집 및 이용목적</h4>
<p>회사는 SEMS 엣스퍼트 APP 운영을 위한 목적으로 아래와 같이 개인정보를 수집 및 이용하고 있습니다.</p>
<ol>
	<li>가. 개인정보 수집/이용목적 내용
		<ol>
			<li>1) SEMS 엣스퍼트 APP 오픈 및 운영
				<ul>
					<li>불편신고 기록수집 </li>
					<li>서비스이용 의견조사 </li>
					<li>Push 기능 알림 제공 </li>
				</ul>
			</li>
		</ol>
	</li>
</ol>
<h4>2. 수집하는 개인정보의 항목 및 수집방법 </h4>
<ol>
	<li>가. 개인정보 수집 항목 
		<ul>
			<li>[필수] : 아이디, 비밀번호 </li>
			<li>[선택] : 전화번호 </li>
		</ul>
		단, 서비스 이용과정에서 서비스 이용기록, 접속 로그, IP정보, IMEI, 녹취, 제9조에 따른 쿠키 등이 수집될 수 있습니다.
	</li>
	<li>나. 개인정보 수집 방법
		<ul>
			<li>인터넷을 통한 이용신청 시 수집 </li>
			<li>점포 내 SEMS 장비 설치 동의 시 수집 </li>
		</ul>
	</li>
</ol>
<h4>3. 개인정보의 보유기간 및 이용기간</h4>
<ol>
	<li>가. 회사는 SEMS 엣스퍼트 서비스 계약 종료 후 3년간 개인정보를 보유하며, 보유목적 종료시 및 이용자의 동의철회 또는 회원탈퇴 요청이 있을시 해당 개인정보를 지체없이 파기합니다.</li>
	<li>나. 기타 이용자의 개별 동의에 따른 서비스별 보존기간은 아래와 같이 법령에 따른 보존기간에 따릅니다.  
		<ol>
			<li>1) 번호 대상 관련 법 조항 보존기간
				<ul>
					<li>본인 확인에 대한 기록 : 정보통신이용촉진 및 정보보호 등에 관한 법률 제44조의 5 제 1항 및 시행령 제 29조 3항 3년</li>
					<li>접속에 관한 기록보존 : 통신비밀보호법 제15조의 2및 시행령 제41조 3년 </li>
				</ul>
			</li>
		</ol>
	</li>
</ol>
<h4>4. 개인정보의 취급위탁</h4>
<p>회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
<ol>
	<li>가. 번호 위탁 받은 자 위탁하는 업무의 내용
		<ol>
			<li>1) (주)티앤엠테크 : APP 및 DB 관리 유지보수</li>
		</ol>
	</li>
</ol>
<h4>5. 개인정보의 제3자 제공</h4>
<p>회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다.</p>
<h4>6. 개인정보의 파기절차 및 방법    </h4>
<p>회사는 개인정보 보유기간의 경과, 처리목적 달성, 회원탈퇴 등 개인정보가 불필요하게 되었을 때에 지체 없이 해당 개인정보를 파기합니다. <br />
	이용자로부터 동의 받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
</p>
<ol>
	<li>가. 파기절차
		<ul>
			<li>회사는 가입자 스스로 회원탈퇴 및 관리자에게 파기요청을 하면 즉시 개인정보를 파기합니다. 또한 계약기간이 지남에 따라 개인정보는 시스템 데이터 유지 목적에 따라 3년간 저장합니다.</li>
		</ul>
	</li>
	<li>나. 파기방법
		<ul>
			<li>회사는 전자적 파일 형태로 기록 저장된 개인정보는 기록을 재생할 수 없도록 파기처리 하며, 종이문서에 기록 저장된 개인정보는 문서파쇄기로 파쇄하거나 소각하여 파기합니다.</li>
		</ul>
	</li>
	<li>다. 예외에 따른 개인정보 보존 시의 별도관리 공지 
		<ul>
			<li>예외 단서에 따른 별도 보존되는 개인정보에 대해서는 보존항목, 보존사유, 보존 방법(또는 형태), 보존 기간, 보존 장소 등에 대해서 분명히 표시하겠습니다.</li>
		</ul>
	</li>
</ol>
<h4>7. 이용자 및 법정대리인의 권리와 그 행사 방법</h4>
<p>이용자 및 법정대리인(본인의 위임을 받지 않고도 법률의 규정에 의하여 대리권의 효력이 발생하는 자로 미성년자에 대한 친권자나 후견인 등)은 등록되어 있는 자신 혹은 당해 만 14세 미만 아동(이하 ‘아동’)의 가입 해지를 요청할 수 있습니다.<br/>
	이용자 혹은 아동의 가입 해지(동의철회)를 위해서는 ‘회원탈퇴’를 클릭하여 본인 확인 절차를 거친 후 탈퇴가 가능합니다. 혹은 개인정보관리책임자에게 서면, 전화 또는 이메일로 연락 하시면 본인 확인 절차를 거친 후 지체 없이 조치하겠습니다. 다만, 가입 해지 시 전체 혹은 일부 서비스의 이용에 어려움이 있거나 불가능할 수 있습니다. <br/>
	이용자가 개인정보의 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다. <br />
	회사는 이용자 혹은 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는 "개인정보취급방침"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다. 
</p>
<h4>8. 개인정보의 수집이용, 제공에 대한 동의 철회</h4>
<p>이용자는 개인정보의 수집, 이용, 제공에 대하여 이용자가 동의한 내용을 언제든지 철회할 수 있습니다. <br />
	동의철회는 개인정보관리책임자에게 서면, 전화, 이메일로 연락하시면 즉시 개인정보 삭제 등 필요한 조치를 하겠습니다. <br />
	회사는 개인정보 수집에 대한 동의철회를 개인정보 수집 방법보다 더 쉽게 할 수 있도록 필요한 조치를 취하겠습니다.
</p>
<h4>9. 이용자에 대한 개인정보 고지사항</h4>
<ol>
	<li>가. 회사가 영업의 전부 또는 일부를 양도 합병 등으로 타인에게 이용자의 개인정보를 이전하면, 회사는 법령에 따라 인터넷 홈페이지 게시, 전자메일 등으로 이용자에게 공지하겠습니다.</li>
	<li>나. 회사가 이용자의 개인정보에 대한 분실, 도난, 누출사실을 알게 되면, 회사는 지체 없이 법령에 따라 이용자에게 알리고, 피해를 최소화할 수 있는 조치를 강구하겠습니다.</li>
	<li>다. 회사는 이용자 개인정보의 이용내역을 주기적으로 이용자에게 법령에 따라 통지하겠습니다.</li>
</ol>
<h4>10. 개인정보 자동수집 장치(쿠키 등)의 설치 운영 및 그 거부에 관한 사항 </h4>
<p>회사는 이용자들에게 보다 적합하고 유용한 서비스를 제공하기 위하여 이용자의 정보를 수시로 저장하고 불러오는 '쿠키(Cookie)를 사용합니다. <br />
	쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 이용자의 컴퓨터로 전송하는 아주 작은 텍스트 파일로서 이용자의 컴퓨터 하드디스크에 저장됩니다. <br />
	이용자는 쿠키 설치에 대한 선택권을 가지고 있으므로, 사용여부를 선택할 수 있습니다. 
</p>
<ul>
	<li>[쿠키 설정 거부 방법(예: 인터넷 익스플로러의 경우)]</li>
	<li>웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인정보 탭 &gt; 개인정보취급 수준에서 설정 이용자가 사용하시는 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 단, 쿠키의 저장을 거부할 경우 로그인이 필요한 일부 서비스의 이용에 제한을 받을 수 있습니다.</li>
</ul>
<h4>11. 개인정보의 보호조치</h4>
<p>회사는 개인정보의 보호조치 확보를 위해 다음과 같은 기술적 관리적 물리적 조치를 취하고 있습니다.</p>
<ol>
	<li>가. 관리적 조치: 내부관리계획 수립 시행, 개인정보취급자의 제한 및 교육 등 </li>
	<li>나. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 침입차단시스템 같은 접근통제시스템 설치, 비밀번호와 중요 개인정보에 대한 암호화 적용, 백신 소프트웨어 같은 보안프로그램 설치, 접속기록 백업</li>
	<li>다. 물리적 조치: 데이터센터, 문서고 등 보호구역 접근통제</li>
</ol>
<h4>12. 의견수렴 및 불만처리</h4>
<p>회사는 이용자의 의견을 소중하게 생각하며, 이용자의 문의사항으로부터 언제나 성실한 답변을 하겠습니다. 회사는 전자우편이나 팩스 및 우편 상담을 접수한 후 신속하고 성실하게 답변 드리겠습니다.</p>
<p>기타 개인정보에 관한 상담이 필요한 경우에는 아래의 기관으로 문의하시기 바랍니다.</p>
<ul>
	<li>개인정보 침해신고센터: (국번없이)118 (http://privacy.kisa.or.kr)</li>
	<li>개인정보 분쟁조정위원회: 02-405-5150 (http://www.kopico.or.kr)</li>
	<li>대검찰청 사이버범죄수사단: 02-3480-3573 (http://www.spo.go.kr) </li>
	<li>경찰청 사이버범죄수사단: 1566-0112 (http://www.netan.go.kr) </li>   
</ul>
<h4>13. 개인정보관리 책임자</h4>
<ul>
	<li>이름 : 정연기</li>
	<li>소속/지위 : FM사업부/책임</li>
	<li>e-메일 : yg1204@serveone.co.kr</li>
	<li>전화 : 02-6924-5034</li>
</ul>