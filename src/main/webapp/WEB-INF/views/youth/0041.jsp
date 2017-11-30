<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<script type="text/javascript">
	var cateData = ${cateData};
	var statusData = ${StatusData};
	var countryData = ${countryData};
	var universityData = ${universityData};
	var eduactionData = ${educationData};
	// MESSAGE
	var KSKQUANSTT = '<spring:message code="kskquan_stt" />';
	var PERSONNAME = '<spring:message code="person_name" />';
	var LLTNSTT = '<spring:message code="lltn_stt" />';
	var PERSONID = '<spring:message code="person_id" />';
	var PERSONNAME1 = '<spring:message code="name" />';
	var DATEOFBIRTH = '<spring:message code="dateOfBirth" />';
	var MONTHOFBIRTH = '<spring:message code="monthOfBirth" />';
	var YEAROFBIRTH = '<spring:message code="yearOfBirth" />';
	var PLACEOFBIRTH = '<spring:message code="placeOfBirth" />';
	var NATIVECOUNTRY = '<spring:message code="native_country" />';
	var NATION = '<spring:message code="nation" />';
	var RELIGION = '<spring:message code="religion" />';
	var PERMANENTADDRESS = '<spring:message code="permanent_address" />';
	var TEMPORARYRESIDENCEADDRESS = '<spring:message code="temporary_residence_address" />';
	var IDENTITYCARD = '<spring:message code="identity_card" />';
	var ELEMENT = '<spring:message code="element" />';
	var NATIONAL = '<spring:message code="national" />';
	var GRADUATIONYEAR = '<spring:message code="graduation_year" />';
	var JOBID = '<spring:message code="job_id" />';
	var WORKPLACE = '<spring:message code="work_place" />';
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/0041.css">
	<script src="${pageContext.request.contextPath}/resources/js/youth/0041.js" type="text/javascript"></script>
		<!-- HTML code -->
		<!-- HTML code -->
		<div id="right">
			<div class="header">
				
			</div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_person_information_search" />')">
					<spring:message code="title_person_list" />
				</button>
			</div>
			
			<div id="<spring:message code="title_person_list" />" class="tabcontent" style="display: block;">
			<div class="panel-body">
			<div title="Quay Lại" class="back cursor-pointer"></div>
					<div>
							<button type="button" id="btnRegister" class="register btn btn-success">Đăng Ký</button>
							<button type="button" class="back btn btn-success">Quay Lại</button>
						</div>
					<div title="Tìm Kiếm" class="search cursor-pointer" id="btnSearchIcon"></div>
					<div title=" Xuất Excel" class="excel cursor-pointer"></div>
				<form class="form-horizontal">
					<%-- <table class="table table-hover display-none" id="divHead">
						<thead>
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="40">
							<tr>
								<th class="align-center"><b><spring:message code="kskquan_stt" /></b></th>
								<th><b><spring:message code="person_name" /></th>
								<th><b><spring:message code="lltn_stt" /></th>
								<th><b><spring:message code="person_id" /></th>
								<th><b><spring:message code="name" /></th>
								<th><b><spring:message code="dateOfBirth" /></th>
								<th><b><spring:message code="monthOfBirth" /></th>
								<th><b><spring:message code="yearOfBirth" /></th>
								<th><b><spring:message code="placeOfBirth" /></th>
								<th><b><spring:message code="identity_card" /></th>
								<th><b><spring:message code="native_country" /></th>
								<th><b><spring:message code="nation" /></th>
								<th><b><spring:message code="religion" /></th>
								<th><b><spring:message code="permanent_address" /></th>
								<th><b><spring:message code="temporary_residence_address" /></th>
								<th><b><spring:message code="national" /></th>
								<th><b><spring:message code="element" /></th>
								<th><b><spring:message code="graduation_year" /></th>
								<th><b><spring:message code="job_id" /></th>
								<th><b><spring:message code="work_place" /></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
					</table> --%>
					<div id="divBody">
						 <div id="myGrid" style="width:100%;height:380px;"></div>
						<%-- <table id="tblBody" class="table table-striped">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="5%">
								<col width="40">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table> --%>
					</div>
					<input type="hidden" id="cateId" value="${cateId}" />
					<input type="hidden" id="statusId" value="${statusId}" />
					<input type="hidden" id="personName" value="${personName}" />
					<input type="hidden" id="identityCard" value="${identityCard}" />
					<input type="hidden" id="countryId" value="${countryId}" />
					<input type="hidden" id="cityId" value="${cityId}" />
					<input type="hidden" id="districtId" value="${districtId}" />
					<input type="hidden" id="wardsId" value="${wardsId}" />
					<input type="hidden" id="townId" value="${townId}" />
					<input type="hidden" id="groupsId" value="${groupsId}" />
					<input type="hidden" id="educationId" value="${educationId}" />
					<input type="hidden" id="universityId" value="${universityId}" />
					<input type="hidden" id="specializedId" value="${specializedId}" />
				</form>
			</div>
			<div id="overlay" class="web-popup-overlay"></div>
			<div id="popupWrapper" class="personinfo-popup">
				<div class="panel panel-default">
					<div class="panel-heading">
						<spring:message code="title_popup_detail_report_information" />
						<div title="Quay Lại" class="cancel cursor-pointer"></div>
					</div>
				</div>
				<div class="panel-body">
					<div class="col-sm-12">
						<div class = "row">
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="cate_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbCate" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="status" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbStatus" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4"></div>
						</div>
						<div class="clear height10"></div>
						<div class = "row">
							<div class="col-sm-4">
								<div class="form-group">
									<label class="control-label col-sm-5" for="txtPersonName"><spring:message code="person_name" /> :</label>
									<div class="col-sm-7">
										<input type="text" class="form-control" id="txtPersonName" placeholder="<spring:message code="person_name" />" />
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<label class="control-label col-sm-5" for="txtIdentityCard"><spring:message code="identity_card" /> :</label>
									<div class="col-sm-7">
										<input id="txtIdentityCard" class="form-control col-sm-7" type="text" value="" name="" placeholder="<spring:message code="identity_card" />">
									</div>
								</div>
							</div>
						</div>
						<div class = "row">
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="country_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbCountry" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="city_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbCity" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="district_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbDistrict" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class = "row">
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="wards_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbWards" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="town_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbTown" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="groups_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbGroups" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class = "row">
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbCate"><spring:message code="level" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbEducation" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbUniversity"><spring:message code="university_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbUniversity" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-4">
								<div class="form-group">
									<div class="form-group">
										<label class="control-label col-sm-5" for="cbbSpecialized"><spring:message code="specialized_name" /> :</label>
										<div class="col-sm-7">
											<select id = "cbbSpecialized" class="form-control "></select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<button id="btnSearch" class="btn btn-success" type="button"><spring:message code="button_search" /></button>
							<button id="btnClear" class="btn btn-success" type="button"><spring:message code="button_clear" /></button>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>	
</div>
</div>

</div>
		
 <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/slick.grid.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/jquery-ui-1.8.16.custom.css" type="text/css"/>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/examples.css" type="text/css"/>
<script src="${pageContext.request.contextPath}/resources/js/common/firebugx.js"></script>

<script src="${pageContext.request.contextPath}/resources/js/common/jquery-1.7.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery-ui-1.8.16.custom.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/jquery.event.drag-2.2.js"></script>

<script src="${pageContext.request.contextPath}/resources/js/common/slick.core.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/slick.editors.js"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/slick.grid.js"></script>

	</tiles:putAttribute>
</tiles:insertDefinition>