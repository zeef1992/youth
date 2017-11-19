<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/reset.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/youth/style.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/youth/bootstrap.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/jquery-ui.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resources/css/messageHandler.css" />

<script
	src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.1.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/common/jquery-ui.min.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/common/jquery.ui.datepicker-jp.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/common/load_calendar.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/common/common.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/common/bootstrap.min.js"
	type="text/javascript"></script>
<script
	src="${pageContext.request.contextPath}/resources/js/youth/login.js"
	type="text/javascript"></script>
<title>Youth Manager System</title>
</head>
<body>
	<div class="container">
		<section id="content">
		<form action="">
			<h1>Login Form</h1>
			<div>
				<input type="text" placeholder="Tài Khoản" required="" id="username" />
			</div>
			<div>
				<input type="password" placeholder="Mật Khẩu" required=""
					id="password" />
			</div>
			<div>
				<input type="button" value="Đăng Nhập" id="btnLogin" /> <a href="#">Lost
					your password?</a> <a href="#">Register</a>
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