<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>
		<!-- HTML code -->
		<div id="wrapper">
			<div class="panel panel-default">
				<div class="panel-heading">
					<spring:message code="title_create_relationship_of_person" />
					<div title="Quay Lại" id = "addNewRelation" class="add_new_relation cursor-pointer"></div>
				</div>
			</div>
			<div class="panel-body">
				<form class="form-horizontal">
					<div><label class="control-label">Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ (hoặc chồng), con</label></div>
					<table class="table table-striped table-bordered table-hover table-condensed" id="divHead" style = "width: 99%!important">
						<thead>
								<col width="15%">
								<col width="20%">
								<col width="10%">
								<col width="20%">
								<col width="25%">
							<tr>
								<th class="align-center"><b><spring:message code="relation" /></b></th>
								<th class="align-center"><b><spring:message code="firstAndLastName" /></b></th>
								<th class="align-center"><b><spring:message code="yearOfBirth" /></b></th>
								<th class="align-center"><b><spring:message code="job" /></b></th>
								<th class="align-center"><b><spring:message code="work_place" /></b></th>
							</tr>
						</thead>
					</table>
					<div id="divBody" style = "width: 100%!important; margin-top: -6px;">
						<table id="tblBody" class="table table-striped table-bordered table-hover table-condensed">
							<col width="15%">
							<col width="20%">
							<col width="10%">
							<col width="20%">
							<col width="25%">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
					<button id="btnComfirmRelation" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
					<button id="btnEditRelation" class="btn btn-success" type="button">Chĩnh Sữa</button>
					<input type = "hidden" id= "numberOfRelation" value = "${numberOfRelation}" /> 
					<input type = "hidden" id= "personId" value = "${personId}" /> 
				</form>
			</div>
		</div>