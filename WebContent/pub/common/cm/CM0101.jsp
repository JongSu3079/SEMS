<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>

		<div class="statusBar"></div>
		<h1 class="blind">에너지 관제시스템 로그인 페이지</h1>

		<!-- container -->
		<div id="container">
			<h2 class="logo">SEMS(Smartstore Energy Management System)</h2>
			<form name="loginForm" action="/login" enctype="application/x-www-form-urlencoded">
				<fieldset>
					<legend>로그인</legend>
					<div class="form_login">
						<p class="id_input">
							<label for="userId">Username</label>
							<input type="text" id="userId" name="userId" placeholder="아이디" title="아이디 입력" value=""/>
						</p>
						<p class="pw_input">
							<label for="userPw">Password</label>
							<input type="password" id="userPw" name="userPw" placeholder="비밀번호" title="비밀번호 입력" value="" onkeypress="if(event.keyCode==13) {fn_login(); return false;}" />
						</p>
						<p class="btn_login">
							<a href="#" onclick="">로그인</a>
						</p>
						<p class="auto_login">
							<input type="checkbox" id="auto_login" name="auth_chk" /><label for="auto_login" onclick="">자동로그인</label>
						</p>
					</div>
				</fieldset>
			</form>
		</div>
		<!-- //container -->
