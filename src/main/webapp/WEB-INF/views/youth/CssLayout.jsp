<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/CssLayout.css"/>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.1.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-ui.min.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.ui.datepicker-jp.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/load_calendar.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/common.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/youth/main.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<script>
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
</script>
</head>
<body>
<div id = "wrapper">
	<div id= "menu">
		<div id = "logo">
			<div class = "text"><img width = "24px" style="margin-left: 2px;"alt="User" src="../resources/img/logo.png"></div>	
		</div>
		<div id = "title">
			<div class = "text">Youth Manager System</div>	
		</div>
	</div>
	<div id = "menu_action">
		<div class = "images_logo">
			<img width = "16px" style="margin-left: 2px;" src="../resources/img/settings-icon.png">
		</div>
		<div class = "text">
			<a href = "">Tạo Biểu Mẫu Mới </a>
			<img width = "5px" style="margin-left: 2px; margin-top: -3px;" src="../resources/img/dropdown.png">
		</div>
		<div class = "text">
			<a href = "">Xuất Excel </a>
		</div>
		<div class = "text">
			<a href = "">Xuất Word/PDF </a>
		</div>
		<div class = "user_info">
			<div class="dropdown">
				<button class="btn btn-primary dropdown-toggle" type="button"
					data-toggle="dropdown">
					<security:authentication property="principal.USERFULLNAME" />
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu">
					<li><a
						href="${pageContext.request.contextPath}/changePassword/"><spring:message
								code="menu_change_password" /></a></li>
					<li><a href="#"><spring:message code="menu_display_guide" /></a></li>
					<li><a href="${pageContext.request.contextPath}/login"
						onclick="javascript:return confirm('<spring:message code="message_log_out_confirm" />');">
							<spring:message code="menu_log_out" />
					</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id = "content">
		<div id = "left">
			<div class = "header"></div>
			<div class = "content"  ng-app="System" ng-controller="Manager">
				<ul>
					<li ng-repeat = "manager in Manager.Manager">
						&#43; <a href="{{ manager.link }}">
							<img width = "12px" style="margin-left: 2px;"alt="User" src="{{ manager.image }}">
							{{ manager.kind }}
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div id = "right">
			<div class = "header"></div>
			
<div class="tab">
  <button class="tablinks" onclick="openCity(event, 'London')">London</button>
  <button class="tablinks" onclick="openCity(event, 'Paris')">Paris</button>
  <button class="tablinks" onclick="openCity(event, 'Tokyo')">Tokyo</button>
</div>

<div id="London" class="tabcontent">
  <h3>London</h3>
  <p>London is the capital city of England.</p>
</div>

<div id="Paris" class="tabcontent">
  <h3>Paris</h3>
  <p>Paris is the capital of France.</p> 
</div>

<div id="Tokyo" class="tabcontent">
  <h3>Tokyo</h3>
  <p>Tokyo is the capital of Japan.</p>
</div>
		</div>
	</div>
</div>
</body>
</html>