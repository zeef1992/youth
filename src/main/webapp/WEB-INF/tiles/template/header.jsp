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
<div id = "wrapper">
	<div id= "menu">
		<div id = "logo">
			<div class = "text"><img width = "24px" style="margin-left: 2px;"alt="User" src="../resources/img/logo.png"></div>	
		</div>
		<div id = "title">
			<div class = "text">Youth Manager System</div>	
		</div>
		<div class = "user_info" style = "float: right; margin-right: 10px; margin-top: 5px;">
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
