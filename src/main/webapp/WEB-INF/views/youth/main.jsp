<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<script src="${pageContext.request.contextPath}/resources/js/youth/main.js" type="text/javascript"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
		<div id = "right">
			<div class = "header"></div>
			<div class="tab">
			  <button class="tablinks active" onclick="openCity(event, 'London')">Home</button>
			</div>
			
			<div id="London" class="tabcontent" style="display: block;">
			  <h3>London</h3>
			  <p>London is the capital city of England.</p>
			</div>
		</div>
	</div>
</div>
	</tiles:putAttribute>
</tiles:insertDefinition>