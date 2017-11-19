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
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/0040.css">
	<script src="${pageContext.request.contextPath}/resources/js/youth/0040.js" type="text/javascript"></script>
		<!-- HTML code -->
		<div id="right">
			<div class="header"></div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_person_information_search" />')">
					<spring:message code="title_person_information_search" />
				</button>
			</div>
			<div id="<spring:message code="title_person_information_search" />" class="tabcontent" style="display: block;">
			<div class="panel-body">
				<form class="form-horizontal">
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
				</form>
			</div>
		</div>
		</div>	
</div>
</div>
	</tiles:putAttribute>
</tiles:insertDefinition>