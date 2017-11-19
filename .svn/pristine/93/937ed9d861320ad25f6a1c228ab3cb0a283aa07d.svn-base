<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<title>Youth Manager System</title>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/reset.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/style.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery-ui.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/messageHandler.css"/>

		<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.1.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/jquery_load_message.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/common.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/login.js" type="text/javascript"></script>
	</head>
	<body class="login-body">
	
		<div class="container">
		<section id="content">
			<h1>Login Form</h1>
			<form action="j_spring_security_check" method="POST">
				<input type="hidden" id="msgContentpopup" name="messages"
				class="MSG_WARNING" value="ユーザー名またはパスワードが間違っている!" title="警告" />
				<img class="language cursor-pointer" name="en" src="${pageContext.request.contextPath}/resources/img/en.png" alt="English">
				<img class="language cursor-pointer" name="vi" src="${pageContext.request.contextPath}/resources/img/vi.png" alt="Tiếng Việt"> 
				<div>
					<input id="j_username" name="j_username" class="txt-lv3" type="text" value="" maxlength="11" placeholder="<spring:message code="user_id" />" />
				</div>
				<div>
					<input id="j_password" name="j_password" class="txt-lv3" type="password" value="" maxlength="11" placeholder="<spring:message code="password" />">
				</div>
				<div>
					<input id="btnLogin" class="btn-login" value="<spring:message code="button_login" />" type="submit" />
					<a href="#">Lost your password?</a> <a href="#">Register</a>
				</div>	
			</form>
			<!-- form -->
		<div class="button">
			<a href="#">Download source file</a>
		</div>
		<!-- button --> </section>
		<!-- content -->
	</div>
	<!-- container -->
</body>
</html>


