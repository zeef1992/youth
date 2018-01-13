<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>
		<!-- HTML code -->
		<div id="wrapper">
				<form class="form-horizontal">
					<div><label class="control-label">Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ, anh chị em ruột, vợ (hoặc chồng), con</label></div>
					<table class="table table-bordered table-hover" id="divHeadRelation">
						<thead>
							<tr>
								<th style="width: 20%" class="align-center"><b><spring:message code="relation" /></b></th>
								<th style="width: 20%" class="align-center"><b><spring:message code="firstAndLastName" /></b></th>
								<th style="width: 20%" class="align-center"><b><spring:message code="yearOfBirth" /></b></th>
								<th style="width: 20%" class="align-center"><b><spring:message code="job" /></b></th>
								<th style="width: 20%" class="align-center"><b><spring:message code="work_place" /></b></th>
							</tr>
						</thead>
					</table>
					<div id="divBodyRelation">
						<table id="tblBodyRelation" class="table table-bordered table-hover" style="margin-top: -22px;">
							<tr>
								<td style="width: 20%"></td>
								<td style="width: 20%"></td>
								<td style="width: 20%"></td>
								<td style="width: 20%"></td>
								<td style="width: 20%"></td>
							</tr>
						</table>
					</div>
					<%-- <button id="btnComfirmRelation" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
					<button id="btnEditRelation" class="btn btn-success" type="button">Chĩnh Sữa</button> --%>
					<input type = "hidden" id= "numberOfRelation" value = "${numberOfRelation}" /> 
					<input type = "hidden" id= "personId" value = "${personId}" /> 
				</form>
		</div>