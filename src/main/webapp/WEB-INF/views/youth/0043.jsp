<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>

<!DOCTYPE html>
<script type="text/javascript">
	var cateData = ${cateData};
	var statusData = ${StatusData};
	var countryData = ${countryData};
	var universityData = ${universityData};
	var eduactionData = ${educationData};
	var reportData = ${reportData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/0043.css">
	<script src="${pageContext.request.contextPath}/resources/js/youth/0043.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/common/load_message.js" type="text/javascript"></script>
	
		<!-- HTML code -->
		<div id="right">
			<div class="header"></div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_person_information_search" />')">
					<spring:message code="title_person_information_search" />
				</button>
			</div>
					<span id = "addNew"><spring:message code="title_add_new_person" /></span>
					<span id = "update"><spring:message code="title_edit_person" /></span>
					<input type = "hidden" id = "modeScreen" value = "${modeScreen}" />
					<!-- <div title="Quay Lại" class="back cursor-pointer"></div> -->
			<div class="panel-body">
				<form class="form-horizontal">
					
					<!-- Content -->
					<div id = "content">
						<div id = "title">
							<div class = "col-sm-12">
								<div class = "row">
									<div class = "col-sm-4"></div>
									<div class = "col-sm-4">
										<div class = " head align-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
									</div>
									<div class = "col-sm-4"></div>
								</div>
								<div class = "row">
									<div class = "col-sm-4"></div>
									<div class = "col-sm-4">
										<div class = "head align-center">Độc lập - Tự do- Hạnh phúc</div>
									</div>
									<div class = "col-sm-4"></div>
								</div>
								<div class = "row">
									<div class = "col-sm-4">
										<div class = "personImg cursor-pointer"></div>
									</div>
									<div class = "col-sm-4">
										<div class = "soyeulylich align-center">SƠ YẾU LÝ LỊCH</div>
									</div>
									<div class = "col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-6" id = "lblKskQuanStt" for="txtKskQuanStt"><spring:message code="kskquan_stt" /> :</label>
											<div class="col-sm-6">
												<input type="text" class="form-control" id="txtKskQuanStt" placeholder="<spring:message code="kskquan_stt" />" />
											</div>
											<div class = "clear height10"></div>
											<label class="control-label col-sm-6" id = "lblLltnStt" for="txtLltnStt"><spring:message code="lltn_stt" /> :</label>
											
											<div class="col-sm-6">
												<input type="text" class="form-control" id="txtLltnStt" placeholder="<spring:message code="lltn_stt" />" />
											</div>
										</div>
									</div>
								</div>
								<div class = "clear height10"></div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-8">
											<div class="form-group">
												<label class="control-label col-sm-3 align-right" for="txtPersonName"><spring:message code="person_name" />:</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="txtPersonName" placeholder="<spring:message code="person_name" />" />
													<input type = "hidden" id = "txtPersonId" />
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6" for="cbbCate"><spring:message code="cate_name" />:</label>
												<div class="col-sm-6">
													<select id = "cbbCate" class="form-control"></select>									
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="txtDateOfBirth"><spring:message code="dateOfBirth" />:</label>
												<div class="col-sm-6">
													<select id = "cbbDateOfBirth" class="form-control"></select>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="txtMonthOfBirth"><spring:message code="monthOfBirth" />:</label>
												<div class="col-sm-6">
													<select id = "cbbMonthOfBirth" class="form-control"></select>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-rigtht" for="txtYearOfBirth"><spring:message code="yearOfBirth" />:</label>
												<div class="col-sm-6">
													<select id = "cbbYearOfBirth" class="form-control"></select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="cbbPlaceOfBirth"><spring:message code="placeOfBirth" />:</label>
												<div class="col-sm-6">
													<select id = "cbbPlaceOfBirth" class="form-control"></select>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="cbbStatus"><spring:message code="status" />:</label>
												<div class="col-sm-6">
													<select id = "cbbStatus" class="form-control"></select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="cbbNativeCountry"><spring:message code="native_country" />:</label>
												<div class="col-sm-6">
													<select id = "cbbNativeCountry" class="form-control"></select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-8">
											<div class="form-group">
												<label class="control-label col-sm-3 align-right" for="txtIdentityCard"><spring:message code="identity_card" />:</label>
												<div class="col-sm-9">
													<input type="text" class="form-control" id="txtIdentityCard" placeholder="<spring:message code="identity_card" />" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="txtNation"><spring:message code="nation" />:</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="txtNation" placeholder="<spring:message code="nation" />" />
												</div>
											</div>
										</div>
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="txtReligion"><spring:message code="religion" />:</label>
												<div class="col-sm-6">
													<input type="text" class="form-control" id="txtReligion" placeholder="<spring:message code="religion" />" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-12">
											<div class="form-group">
												<label class="control-label col-sm-2 align-right" for="txtPermanentAddress"><spring:message code="permanent_address" />:</label>
												<div class="col-sm-10">
													<textarea rows="3" class = "form-control" id = "txtPermanentAddress"></textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-12">
											<div class="form-group">
												<label class="control-label col-sm-2 align-right" for="txtTemporaryResidenceAddress"><spring:message code="temporary_residence_address" />:</label>
												<div class="col-sm-10">
													<textarea rows="3" class = "form-control" id = "txtTemporaryResidenceAddress"></textarea>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="txtPhone"><spring:message code="phone" />:</label>
												<div class="col-sm-6">
													<input type="text" maxlength="12" class="form-control" id="txtPhone" placeholder="<spring:message code="phone" />" />
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-6 align-right" for="cbbEducation"><spring:message code="level" />:</label>
												<div class="col-sm-6">
													<select id = "cbbEducation" class="form-control"></select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-8">
											<div class="form-group">
												<label class="control-label col-sm-3 align-right" for="cbbUniversity"><spring:message code="university_name" />:</label>
												<div class="col-sm-9">
													<select id = "cbbUniversity" class="form-control"></select>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="country_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbCountry" class="form-control "></select>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="city_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbCity" class="form-control "></select>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="district_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbDistrict" class="form-control "></select>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="wards_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbWards" class="form-control "></select>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="town_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbTown" class="form-control "></select>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-5" for="cbbCate"><spring:message code="groups_name" /> :</label>
											<div class="col-sm-7">
												<select id = "cbbGroups" class="form-control "></select>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-2"></div>
										<div class = "col-sm-4">
											<div class="form-group">
												<button id="btnProcessOfYourSelt" class="btn btn-success" type="button">Thiết Lập Quá Trình Đào Tạo Làm Việc</button>
											</div>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "processOfYourSelt"></div>
									<div class = "processOfYourSeltEdit"></div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-7">
											<div class="form-group">
												<label id = "lblNumberOfRelation" class="control-label col-sm-4 align-right" for="txtNumberOfRelation"><spring:message code="numberOfRelation" />:</label>
												<div class="col-sm-8">
													<input type="number" class="form-control" id="txtNumberOfRelation" placeholder="<spring:message code="numberOfRelation" />" />
												</div>
											</div>
										</div>
										<div class = "col-sm-4">
											<button id="btnNumberOfRelation" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
										</div>
									</div>
								</div>
								<div class = "row">
									<div class = "relationContent"></div>
									<div class = "relationContentEdit"></div>
									<div class = "noteReportEdit"></div>
								</div>
								<div class = "row">
									<div class = "contentBox">
										<div class = "col-sm-2"></div>
										<div class = "col-sm-4">
											<div class="form-group"></div>
										</div>
									</div>
								</div>
								<div id="overlay" class="web-popup-overlay"></div>
								<div id="overlay2" class="web-popup-overlay2"></div>
								<div class = "row">
									<div id="popupWrapper" class="report_popup">
											
									</div>
									</div>
								</div>
								<div class = "row">
									<div id="popupWrapper1" class="noteReport_popup"></div>
									
								</div>
								<div class = "row">
									<div id="popupWrapper2" class="criteria_popup">
										<div class="panel panel-default">
											<div class="panel-heading">
												<span id = "addNew"><spring:message code="title_add_new_person" /></span>
												<input type = "hidden" id = "modeScreen" value = "${modeScreen}" />
												<input type = "hidden" id= "personIdEdit" value="${personId}" />
											</div>
										</div>
										<div class="panel-body">
											<table class="table table-striped table-bordered table-hover table-condensed" id="divHeadCriteria">
												<thead>
												<col width="100%">
												<tr>
													<th class="align-center colr_53BBF4"><b><spring:message code="criteria_name" /></b></th>
												</tr>
												</thead>
											</table>
											<div id="divBodyCriteria" class = "height150 overflow-y">
												<table id="tblBodyCriteria" class="table table-striped table-bordered table-hover table-condensed">
													<col width="100%">
													<tr>
														<td></td>
													</tr>
												</table>
											</div>
											<div class="form-group align-center">
												<button id="btnSelectCriteria" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
											</div>	
										</div>
									</div>
									</div>
								</div>
							</div>
						</div>
									</div>
								</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertDefinition>