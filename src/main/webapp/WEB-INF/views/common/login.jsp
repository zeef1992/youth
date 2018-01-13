<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" %>



<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Youth Manager System | Log in</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/dist/css/AdminLTE.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/iCheck/square/blue.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <a href="${pageContext.request.contextPath}/resources/index2.html"><b>Youth</b> Manager System</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">Sign in to start your session</p>

    <form action="j_spring_security_check" method="POST">
      <div class="form-group has-feedback">
        <input type="text" class="form-control" placeholder="Email" id="j_username" name="j_username">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" id="j_password" name="j_password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" id = "btnLogin" class="btn btn-primary btn-block btn-flat">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>

    <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>
    <!-- /.social-auth-links -->

    <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<script src="${pageContext.request.contextPath}/resources/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="${pageContext.request.contextPath}/resources/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="${pageContext.request.contextPath}/resources/plugins/iCheck/icheck.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/common.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/login.js" type="text/javascript"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });
</script>
</body>
</html>

<%-- 
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

		<script
	src="${pageContext.request.contextPath}/resources/bower_components/jquery/dist/jquery-3.2.1.min.js"></script>
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
</html> --%>


