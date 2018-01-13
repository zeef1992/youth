<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!-- HTML code -->
<div class='col-sm-12'>
	<div class='col-sm-4'>
		<table class="table table-bordered table-hover" id="divHeadReport">
			<thead>
			<tr>
				<th><b><spring:message code="report_name" /></b></th>
			</tr>
			</thead>
		</table>
		<div id="divBodyReport" class="height300 overflow-y mt-20">
			<table id="tblBodyReport" class="table table-bordered table-hover">
				<tr>
					<td></td>
				</tr>
			</table>
		</div>
		<div class="clear height10"></div>
	</div>
	<div class = "col-sm-4" id = "noteReport_popup"></div>
	<div class="col-sm-4 display-none" id="criteriaReport_popup">
		<table class="table table-bordered table-hover" id="divHeadCriteria">
			<thead>
			<tr>
				<th style="width: 10%"><input type = "checkbox" id = "chkAll"></th>
				<th class="align-center colr_53BBF4"><b><spring:message code="criteria_name" /></b></th>
			</tr>
			</thead>
		</table>
		<div id="divBodyCriteria" class="height300 mt-20">
			<table id="tblBodyCriteria" class="table table-bordered table-hover">
				<tr>
					<td></td>
					<td></td>
				</tr>
			</table>
		</div>
	</div>
</div>