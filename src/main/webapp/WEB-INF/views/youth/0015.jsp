<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<script type="text/javascript">
	var countryData = ${countryData};
	var cityData = ${cityData};
	var districtData = ${districtData};
	var wardsData = ${wardsData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/0015.css">
	<script src="${pageContext.request.contextPath}/resources/js/youth/0015.js" type="text/javascript"></script>
		<!-- HTML code -->
		<div id="right">
			<div class="header"></div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_town_information_search" />')">
					<spring:message code="title_town_information_search" />
				</button>
			</div>
			<div id="<spring:message code="title_town_information_search" />" class="tabcontent" style="display: block;">
			<div class="panel-body">
				<form class="form-horizontal">
					<div class="col-sm-12">
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="cbbCountry"><spring:message code="country_name" /></label>
								<div class="col-sm-6">
									<select id = "cbbCountry" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="cbbCity"><spring:message code="city_name" /></label>
								<div class="col-sm-6">
									<select id = "cbbCity" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="cbbDistrict"><spring:message code="district_name" /></label>
								<div class="col-sm-6">
									<select id = "cbbDistrict" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="cbbWards"><spring:message code="wards_name" /></label>
								<div class="col-sm-6">
									<select id = "cbbWards" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="txtTownCode"><spring:message code="town_code" /></label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="txtTownCode" placeholder="<spring:message code="town_code" />">
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="txtTownName"><spring:message code="town_name" /></label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="txtTownName" placeholder="<spring:message code="town_name" />">
								</div>
							</div>
						</div>
						<div class="col-sm-4"></div>
						<div class="col-sm-4">
							<button id="btnSearch" class="btn btn-success" type="button"><spring:message code="button_search" /></button>
						</div>
						<div class="col-sm-4"></div>
					</div>
					<input type="hidden" id = "countryIdDefault" value = "${countryIdDefault}" />
					<input type="hidden" id = "cityIdDefault" value = "${cityIdDefault}" />
					<input type="hidden" id = "districtIdDefault" value = "${districtIdDefault}" />
					<input type="hidden" id = "wardsIdDefault" value = "${wardsIdDefault}" />
					<span id="countryName"><spring:message code="country_name" />: <b id = "textCountryName"></b></span>
					<span id="cityName"><spring:message code="city_name" />: <b id = "textCityName"></b></span>
					<span id="districtName"><spring:message code="district_name" />: <b id = "textDistrictName"></b></span>
					<span id="wardsName"><spring:message code="wards_name" />: <b id = "textWardsName"></b></span>
					<div class = "clear height10"></div>
					<table class="table table-striped display-none" id = "divHead">
						<thead>
								<col width="20%">
								<col width="">
								<col width="40">
								<col width="40">
								<col width="40">
							<tr>
								<th class="align-center colr_53BBF4"><b><spring:message code="wards_code" /></b></th>
								<th class="align-center colr_53BBF4"><b><spring:message code="wards_name" /></b></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
					</table>
					<div id="divBody" class="height400">
						<table id="tblBody" class="table table-striped">
							<col width="20%">
							<col width="">
							<col width="40">
							<col width="40">
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
					<div class="tblPager pager display-none float-right margin-top5">
						<div class="float-left padding-top2 margin-right20">
							<span id="btnFirst" class="page-number-first"></span>
							<span id="btnPrevious" class="page-number-pre"></span>
							<span id="lblCurrentPage" class="padding-left5 float-left">0</span>
							<span id="lblPageSeperator" class="float-left">/</span>
							<span id="lblMaxPage" class="padding-right5 float-left">0</span>
							<span id="btnNext" class="page-number-next"></span>
							<span id="btnLast" class="page-number-last"></span>
						</div>
						<div class="float-left">
							<input id="txtGoToPage" class="width40" type="text" maxlength="5" onpaste="return false;"/>
							<input id="btnGoToPage" class="btn btn-success" type="button" value="<spring:message code="button_pager" />" />
						</div>
						<div>
							<button type="button" id="btnRegister" class="register">Đăng
								Ký</button>
							<button type="button" class="back">Quay Lại</button>
						</div>
					</div>
				</form>
			</div>
			<div id="overlay" class="web-popup-overlay"></div>
			<div id="popupWrapper" class="wardsinfo-popup">
				<div class="panel panel-default">
					<div class="panel-heading">
						<span id = "update"><spring:message code="title_popup_town_edit_information" /></span>
						<span id = "addNew"><spring:message code="title_popup_town_add_information" /></span>
						<div title="Quay Lại" class="cancel cursor-pointer"></div>
					</div>
				</div>
				<div class="panel-body">
					<div class="col-sm-12">
						<div class="col-sm-1"></div>
						<div class="col-sm-10">
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtCountryNamePopup"><spring:message code="country_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtCountryNamePopup" placeholder="<spring:message code="country_name" />" />
									<input type="hidden" class="form-control" id="txtCountryIdPopup" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtCityNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtCityNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtCityIdPopup" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtDistrictNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtDistrictNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtDistrictIdPopup" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtWardsNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtWardsNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtWardsIdPopup" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtTownCodePopup"><spring:message code="town_code" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtTownCodePopup" placeholder="<spring:message code="town_code" />" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtTownNamePopup"><spring:message code="town_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtTownNamePopup" placeholder="<spring:message code="town_name" />" />
									<input type="hidden" class="form-control" id="txtTownIdPopup" />
								</div>
							</div>
							<div class="clear height10"></div>
							<div class="form-group ">
								<label class="control-label col-sm-4" ></label>
								<div class="col-sm-8">
									<button id="btnRegisterPopup"
										class="btn margin-right10 btn-success align-center"
										type="button">
										<spring:message code="button_register" />
									</button>
								</div>
							</div>
						</div>
						<div class="col-sm-1"></div>
					</div>
					
				</div>
			</div>
		
		</div>
	</div>
</div>
</div>
	</tiles:putAttribute>
</tiles:insertDefinition>