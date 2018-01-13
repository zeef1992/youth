<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>


		<!-- HTML code -->
		<div id="wrapper">
				<form class="form-horizontal">
					<table class="table table-bordered table-hover" id="divHeadProcess">
						<thead>
							<tr>
								<th style="width: 10%;" class="align-center"><b><spring:message code="fromYear" /></b></th>
								<th style="width: 10%;" class="align-center"><b><spring:message code="fromTo" /></b></th>
								<th class="align-center"><b><spring:message code="school_workPlace" /></b></th>
							</tr>
						</thead>
					</table>
					<div id="divBodyProcess">
						<table id="tblBodyProcess" class="table table-bordered table-hover" style="margin-top: -20px;">
							<tr>
								<td style="width: 10%;"></td>
								<td style="width: 10%;"></td>
								<td></td>
							</tr>
						</table>
					</div>
					<div><label class="control-label" style="text-align: left;">Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai của mình.</label></div>
					<%-- <button id="btnComfirmProcessYourselt" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
					<button id="btnEditProcessYourselt" class="btn btn-success" type="button">Chĩnh Sữa</button> --%>
					<input type = "hidden" id= "numberOfRelation" value = "${numberOfRelation}" /> 
					<input type = "hidden" id= "personId" value = "${personId}" /> 
				</form>
		</div>