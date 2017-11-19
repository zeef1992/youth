<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<title>Youth Manager System</title>
		
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/bootstrap.min.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/CssLayout.css"/>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery-ui.min.css?date=${jqueryUiCssDate}">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/messageHandler.css?date=${messageHandlerDate}"/>
		<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/bootstrap.min.css"> --%>
		<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.11.1.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/jquery-ui.min.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/jquery.ui.datepicker-jp.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/load_calendar.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/common.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/load_message.js?date=${messageDate}" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/youth/main.js" type="text/javascript"></script>
		<script src="${pageContext.request.contextPath}/resources/js/common/bootstrap.min.js" type="text/javascript"></script>
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
		<tiles:insertAttribute name="header" />
		<tiles:insertAttribute name="body" />
		<tiles:insertAttribute name="footer" />
	</body>
</html>