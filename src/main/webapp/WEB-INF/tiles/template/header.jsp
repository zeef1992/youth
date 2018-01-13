<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<!-- Constants -->
<script type="text/javascript">
	var DIALOG_TITLE = '<spring:message code="dialog_title" />';
	var DIALOG_OK_BUTTON = '<spring:message code="dialog_ok_button" />';
	var DIALOG_YES_BUTTON = '<spring:message code="dialog_yes_button" />';
	var DIALOG_NO_BUTTON = '<spring:message code="dialog_no_button" />';
	// role name value based on languages
	var ROLE_SYSTEM_MANAGER = '<spring:message code="checkbox_authority_system_manager" />';
	var ROLE_BUSINESS_MANAGER = '<spring:message code="checkbox_authority_business_manager" />';
	var ROLE_FARM_MANAGER = '<spring:message code="checkbox_authority_farm_manager" />';
	var ROLE_AREA_MANAGER = '<spring:message code="checkbox_authority_area_manager" />';
	// enable/disable status value based on languages
	var STATUS_ENABLED = '<spring:message code="status_enabled" />';
	var STATUS_DISABLED = '<spring:message code="status_disabled" />';
	// alert message based on languages
	var ERROR_MESSAGE = '<spring:message code="message_error_generic" />';
	var ERROR_SELECT = '<spring:message code="message_error_select" />';
	var SEARCH_RESULT_OUT_OF_MEMORY_MESSAGE = '<spring:message code="message_search_result_out_of_memory" />';
	var SEARCH_RESULT_NO_DATA_MESSAGE = '<spring:message code="message_search_result_no_data" />';
	var VALIDATE_BLANK_FIELDS_MESSAGE = '<spring:message code="message_validate_blank_fields" />';
	var VALIDATE_WRONG_FORMAT_MESSAGE = '<spring:message code="message_validate_wrong_format" />';
	var VALIDATE_PASSWORD_NOT_MATCH_MESSAGE = '<spring:message code="message_validate_password_not_match" />';
	var VALIDATE_PASSWORD_NOT_CORRECT_MESSAGE = '<spring:message code="message_validate_password_not_correct" />';
	var UPDATE_RESULT_SUCCESSFUL_MESSAGE = '<spring:message code="message_update_result_successful" />';
	var UPDATE_RESULT_FAILED_MESSAGE = '<spring:message code="message_update_result_failed" />';
	var INSERT_RESULT_SUCCESSFUL_MESSAGE = '<spring:message code="message_insert_result_successful" />';
	var INSERT_RESULT_DUPLICATED_MESSAGE = '<spring:message code="message_insert_result_duplicated" />';
	var INSERT_RESULT_CONFIG_NOT_CORRECT_MESSAGE = '<spring:message code="message_insert_result_config_not_correct" />';
	var INSERT_RESULT_FAILED_MESSAGE = '<spring:message code="message_insert_result_failed" />';
	var DELETE_CONFIRM_MESSAGE = '<spring:message code="message_delete_confirm" />';
	var DELETE_RESULT_SUCCESSFUL_MESSAGE = '<spring:message code="message_delete_result_successful" />';
	var DELETE_RESULT_FAILED_MESSAGE = '<spring:message code="message_delete_result_failed" />';
	var UPLOAD_IMAGE_WRONG_FILE_TYPED_MESSAGE = '<spring:message code="message_upload_wrong_file_type" />';
	var UPLOAD_IMAGE_RESULT_FAILED_MESSAGE = '<spring:message code="message_upload_result_failed" />';
	// day of week based on languages
	var DAY_OF_WEEK = "";
	var currentDay = new Date().getDay();
	if (currentDay == 0) { // Sunday
		DAY_OF_WEEK = '<spring:message code="week_day_sunday" />';
	} else if (currentDay == 1) { // Monday
		DAY_OF_WEEK = '<spring:message code="week_day_monday" />';
	} else if (currentDay == 2) { // Tuesday
		DAY_OF_WEEK = '<spring:message code="week_day_tuesday" />';
	} else if (currentDay == 3) { // Wednesday
		DAY_OF_WEEK = '<spring:message code="week_day_wednesday" />';
	} else if (currentDay == 4) { // Thursday
		DAY_OF_WEEK = '<spring:message code="week_day_thursday" />';
	} else if (currentDay == 5) { // Friday
		DAY_OF_WEEK = '<spring:message code="week_day_friday" />';
	} else if (currentDay == 6) { // Saturday
		DAY_OF_WEEK = '<spring:message code="week_day_saturday" />';
	}
	var KSKQUANSTT = '<spring:message code="kskquan_stt" />';
	var LLTNSTT = '<spring:message code="lltn_stt" />';
	var PERSON_NAME = '<spring:message code="person_name" />';
	var IDENTITY_CARD = '<spring:message code="identity_card" />';
	var PERMANENT_ADDRESS = '<spring:message code="permanent_address" />';
	var TEMPORARY_RESIDENCE_ADDRESS = '<spring:message code="temporary_residence_address" />';
	var PHONE = '<spring:message code="phone" />';
	var LEVEL = '<spring:message code="level" />';
	var NUMBER_OF_RELATION = '<spring:message code="numberOfRelation" />';
	var COUNTRY_NAME = '<spring:message code="country_name" />';
	var CITY_NAME = '<spring:message code="city_name" />';
	var DISTRICT_NAME = '<spring:message code="district_name" />';
	var WARDS_NAME = '<spring:message code="wards_name" />';
	var TOWN_NAME = '<spring:message code="town_name" />';
	var GROUPS_NAME = '<spring:message code="groups_name" />';
	var FROM_YEAR_IS_MUST_SMALL_TO_YEAR = '<spring:message code="from_year_is_must_small_to_year" />'
</script>
<div class="wrapper">

	<header class="main-header">
		<!-- Logo -->
		<a href="index2.html" class="logo"> <!-- mini logo for sidebar mini 50x50 pixels -->
			<span class="logo-mini"><b>S</b>YM</span> <!-- logo for regular state and mobile devices -->
			<span class="logo-lg"><b>Youth</b>SYM</span>
		</a>
		<!-- Header Navbar: style can be found in header.less -->
		<nav class="navbar navbar-static-top">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="push-menu"
				role="button"> <span class="sr-only">Toggle navigation</span>
			</a>

			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<!-- User Account: style can be found in dropdown.less -->
					<li class="dropdown user user-menu"><a href="#"
						class="dropdown-toggle" data-toggle="dropdown"> <img
							src="${pageContext.request.contextPath}/resources/dist/img/user2-160x160.jpg" class="user-image"
							alt="User Image"> <span class="hidden-xs"><security:authentication property="principal.USERFULLNAME" /></span>
					</a>
						<ul class="dropdown-menu">
							<!-- User image -->
							<li class="user-header"><img
								src="${pageContext.request.contextPath}/resources/dist/img/user2-160x160.jpg" class="img-circle"
								alt="User Image">

								<p>
									<security:authentication property="principal.USERFULLNAME" /> - Web Developer <small>Member since
										Nov. 2012</small>
								</p></li>
							<!-- Menu Footer-->
							<li class="user-footer">
								<div class="pull-right">
									<a class="btn btn-default btn-flat pull-left" href="${pageContext.request.contextPath}/changePassword/"><spring:message code="menu_change_password" /></a>
									<a class="btn btn-default btn-flat" href="${pageContext.request.contextPath}/login"
						onclick="javascript:return confirm('<spring:message code="message_log_out_confirm" />');"><spring:message code="menu_log_out" /></a>
								</div>
							</li>
						</ul></li>
					<!-- Control Sidebar Toggle Button -->
					<li><a href="#"><i
							class="fa fa-fw fa-calendar" id = "txtCurrentDate"></i></a></li>
					<li><a href="#" data-toggle="control-sidebar"><i
							class="fa fa-gears"></i></a></li>
				</ul>
			</div>
		</nav>
	</header>
	<!-- Left side column. contains the logo and sidebar -->
	<aside class="main-sidebar">
		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">
			<!-- Sidebar user panel -->
			<div class="user-panel">
				<div class="pull-left image">
					<img src="${pageContext.request.contextPath}/resources/dist/img/user2-160x160.jpg" class="img-circle"
						alt="User Image">
				</div>
				<div class="pull-left info">
					<p><security:authentication property="principal.USERFULLNAME" /></p>
					<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
				</div>
			</div>
			<!-- search form -->
			<!-- <form action="#" method="get" class="sidebar-form">
				<div class="input-group">
					<input type="text" name="q" class="form-control"
						placeholder="Search..."> <span class="input-group-btn">
						<button type="submit" name="search" id="search-btn"
							class="btn btn-flat">
							<i class="fa fa-search"></i>
						</button>
					</span>
				</div>
			</form> -->
			<!-- /.search form -->
			<!-- sidebar menu: : style can be found in sidebar.less -->
			<ul class="sidebar-menu" data-widget="tree">
				<li class="header">MAIN NAVIGATION</li>
				<li class="active treeview"><a href="${pageContext.request.contextPath}/0003/"> <i
						class="fa fa-dashboard"></i> <span>Home</span> <span
						class="pull-right-container"> <i
							class="fa fa-angle-left pull-right"></i>
					</span>
				</a></li>
				<li class="treeview"><a href="#"> <i class="fa fa-table"></i>
						<span>Administrator</span> <span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
					<ul class="treeview-menu">
						<li><a href="${pageContext.request.contextPath}/0003/ "><i class="fa fa-circle-o"></i>Quản Lý</a></li>
						<li class="treeview"><a href="#"><i
								class="fa fa-circle-o"></i>Thanh Niên <span
								class="pull-right-container"> <i
									class="fa fa-angle-left pull-right"></i>
							</span> </a>
							<ul class="treeview-menu">
								<li><a href="${pageContext.request.contextPath}/0040/"><i class="fa fa-share"></i>Thanh Niên</a></li>
								<li><a href="${pageContext.request.contextPath}/0009/"><i class="fa fa-share"></i>Loại Thanh
										Niên</a></li>
								<li><a href="${pageContext.request.contextPath}/0047/"><i class="fa fa-share"></i>Người Thân</a></li>
								<li><a href="${pageContext.request.contextPath}/0045/"><i class="fa fa-share"></i>Quá Trình Bản Thân</a></li>
								<li><a href="${pageContext.request.contextPath}/0007/"><i class="fa fa-share"></i>Tình Trạng</a></li>
								<li><a href="${pageContext.request.contextPath}/0008/"><i class="fa fa-share"></i>Công Việc</a></li>
								<li><a href="${pageContext.request.contextPath}/0002/"><i class="fa fa-share"></i>Vùng Sinh
										Sống</a></li>
							</ul></li>
						<li class="treeview"><a href="#"><i
								class="fa fa-circle-o"></i>Báo Cáo <span
								class="pull-right-container"> <i
									class="fa fa-angle-left pull-right"></i>
							</span> </a>
							<ul class="treeview-menu">
								<li><a href="${pageContext.request.contextPath}/0005/"><i class="fa fa-share"></i>Mẫu Báo Cáo</a></li>
								<li><a href="${pageContext.request.contextPath}/0006/"><i class="fa fa-share"></i>Chi Tiết Báo
										Cáo</a></li>
								<li><a href="${pageContext.request.contextPath}/0025/"><i class="fa fa-share"></i>Tiêu Chí Báo
										Cáo</a></li>
								<li><a href="${pageContext.request.contextPath}/0010/"><i class="fa fa-share"></i>Chữ Ký</a></li>
							</ul></li>
					</ul></li>
					<li class="treeview"><a href="#"> <i class="fa fa-table"></i>
						<span>Report</span> <span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
					</span>
				</a>
					<ul class="treeview-menu">
						<li><a href="${pageContext.request.contextPath}/0043/ "><i class="fa fa-circle-o"></i>Report List</a></li>
						</ul>
					</li>
			</ul>
		</section>
		<!-- /.sidebar -->
	</aside>