<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<script src="${pageContext.request.contextPath}/resources/js/youth/main.js" type="text/javascript"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
		<!-- HTML code -->
		<div id="wrapper">
			<div class="panel panel-default">
			  <div class="panel-heading">Menu Quản Lý Hệ Thống
			  	
			  </div>
			  <div class="panel-body">
			  <div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" type="button"
						data-toggle="dropdown">
						ALL <span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						<li><a href="#">Mẫu Báo Cáo & Thanh Niên</a></li>
						<li><a href="#">Hệ Thống TP/P.</a></li>
						<li><a href="#">Hệ Thống Quản Lý Trình Độ</a></li>
					</ul>
				</div>
			  	<div class="col-sm-12" ng-app="System" ng-controller="Manager">
			  	<div class="clearfix mt_10"></div>
			  			<div id="user" class="col-sm-4" ng-repeat = "manager in Manager.Manager" >
				  			<div class="panel panel-default">
							  <div class="panel-heading">{{ manager.title }}</div>
								  <div class="panel-body">
								  	<div class="col-sm-12">
								  		<div class="col-sm-5">
								  			<a href="../">
								  				<button type="button" class="btn btn-default btn-lg center">
													<img alt="User" src="{{ manager.image }}">
												</button>
											</a>
								  		</div>
								  		<div class="col-sm-7">
								  			  <span class="label label-success">Tìm Kiếm {{ manager.kind }}</span><br>
											  <span class="label label-success">Thêm mới {{ manager.kind }}</span><br>
											  <span class="label label-success">Chỉnh sữa {{ manager.kind }}</span><br>
											  <span class="label label-success">Xóa thông {{ manager.kind }}</span><br>
								  		</div>
								  	</div>
								</div>
							</div>
				  		</div>
			  </div>
			</div>
		</div>
		</div>
		<script>

</script>
	</tiles:putAttribute>
</tiles:insertDefinition>