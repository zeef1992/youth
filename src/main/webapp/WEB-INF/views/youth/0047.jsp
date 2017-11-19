<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>


		<!-- HTML code -->
		<div id="wrapper">
			<div class="panel panel-default">
				<div class="panel-heading">
					<spring:message code="Process_of_yourself" />
					<div title="Quay Lại" id = "addProcess" class="add_new_relation cursor-pointer"></div>
				</div>
			</div>
			<div class="panel-body">
				<form class="form-horizontal">
					<table class="table table-striped table-bordered table-hover table-condensed" id="divHeadProcess" style = "width: 99%!important">
						<thead>
								<col width="10%">
								<col width="10%">
								<col width="">
							<tr>
								<th class="align-center"><b><spring:message code="fromYear" /></b></th>
								<th class="align-center"><b><spring:message code="fromTo" /></b></th>
								<th class="align-center"><b><spring:message code="school_workPlace" /></b></th>
							</tr>
						</thead>
					</table>
					<div id="divBodyProcess" style = "width: 100%!important; margin-top: -6px;">
						<table id="tblBodyProcess" class="table table-striped table-bordered table-hover table-condensed" style = "width: 100%!important">
							<col width="10%">
							<col width="10%">
							<col width="">
							<tr>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
					<div><label class="control-label" style="text-align: left;">Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.</label></div>
					<button id="btnComfirmProcessYourselt" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
					<input type = "hidden" id= "numberOfRelation" value = "${numberOfRelation}" /> 
					<input type = "hidden" id= "personId" value = "${personId}" /> 
				</form>
			</div>
		</div>