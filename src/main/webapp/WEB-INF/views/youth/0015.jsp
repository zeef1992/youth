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
	<!-- DataTables -->
	<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js"></script>
	<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					Quản Lý Phường/Xã<small>Control panel</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="${pageContext.request.contextPath}/main/"><i
							class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Quản Lý Phường/Xã</li>
				</ol>
			</section>
			<!-- Main content -->
			<section class="content">
				<!-- Main row -->
				<div class="row">
					<!-- right col (We are only adding the ID to make the widgets sortable)-->
					<!-- Default box -->
					<div class="box">
						<div class="box-header with-border">
							<h3 class="box-title">Search Criteria</h3>
							<div class="box-tools pull-right">
								<button type="button" class="btn btn-box-tool"
									data-widget="collapse" data-toggle="tooltip" title="Collapse">
									<i class="fa fa-minus"></i>
								</button>
								<button type="button" class="btn btn-box-tool"
									data-widget="remove" data-toggle="tooltip" title="Remove">
									<i class="fa fa-times"></i>
								</button>
							</div>
						</div>
						<div class="box-body">
							<!-- form start -->
							<form class="form-horizontal">
								<div class="box-body">
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
								</div>
								<!-- /.box-body -->
								<div class="box-footer">
									<button type="button" id="btnSearch"
										class="btn bg-info pull-right">Search</button>
									<button type="button" id="btnRegister"
										class="btn bg-info margin pull-left" data-toggle="modal"
										data-target="#modal-default">Add New</button>
								</div>
								<input type="hidden" id = "countryIdDefault" value = "${countryIdDefault}" />
								<input type="hidden" id = "cityIdDefault" value = "${cityIdDefault}" />
								<input type="hidden" id = "districtIdDefault" value = "${districtIdDefault}" />
								<input type="hidden" id = "wardsIdDefault" value = "${wardsIdDefault}" />
							</form>
							<!-- /.box -->
							<section class="content">
								<div class="row">
									<div class="box-body">
										<div class="alert alert-dismissible display-none">
											<span></span>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12">
										<div class="box-body">
											<b>Tổng Cộng: </b><span id="txtCounts"></span>
											<table id="example2" class="table table-bordered table-hover">
												<thead>
													<tr>
														<th>STT</th>
														<th><b><spring:message code="town_code" /></b></th>
														<th><b><spring:message code="town_name" /></b></th>
														<th>Create By</th>
														<th>Update By</th>
														<th class="align-center" style="width: 11%"></th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div
											class="tblPager display-none pager float-right margin-top5">
											<div
												class="float-left padding-top2 pull-right margin-right20">

												<span id="btnFirst"
													class="page-number-first btn btn-default">First</span> <span
													id="btnPrevious" class="page-number-pre  btn btn-default">Previous</span>
												<span id="lblPageSeperator"
													class="float-left btn btn-default"> <span
													id="lblCurrentPage" class="padding-left5 float-left ">0</span>/
													<span id="lblMaxPage" class="padding-right5 float-left">0</span>
												</span> <span id="btnNext"
													class="page-number-next  btn btn-default">Next</span> <span
													id="btnLast" class="page-number-last  btn btn-default">Last</span>
											</div>
										</div>
										<!-- /.box-body -->
									</div>
									<!-- /.box -->
								</div>
								<!-- /.box -->
							</section>
						</div>
					</div>
				</div>
			</section>
		</div>

		<!-- /.modal -->
		<div class="modal fade" id="modal-default">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">Town Information</h4>
					</div>
					<div class="modal-body">
						<!-- Horizontal Form -->
						<div class="box box-info">

							<!-- <div class="box-header with-border">
								<span class="box-title" id = "update">Thêm Mới</span>
								<span class="box-title" id = "addNew">Cập Nhật</span>
							</div> -->
							<!-- /.box-header -->
							<!-- form start -->
							<form class="form-horizontal">
								<div class="box-body">
									<div class="form-group">
								<label class="control-label col-sm-4" for="txtCountryNamePopup"><spring:message code="country_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtCountryNamePopup" placeholder="<spring:message code="country_name" />" />
									<input type="hidden" class="form-control" id="txtCountryIdPopup" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtCityNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtCityNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtCityIdPopup" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtDistrictNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtDistrictNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtDistrictIdPopup" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtWardsNamePopup"><spring:message code="city_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtWardsNamePopup" placeholder="<spring:message code="city_name" />" />
									<input type="hidden" class="form-control" id="txtWardsIdPopup" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtTownCodePopup"><spring:message code="town_code" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtTownCodePopup" placeholder="<spring:message code="town_code" />" />
								</div>
							</div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtTownNamePopup"><spring:message code="town_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtTownNamePopup" placeholder="<spring:message code="town_name" />" />
									<input type="hidden" class="form-control" id="txtTownIdPopup" />
								</div>
							</div>
								</div>
								<!-- /.box-body -->
							</form>
						</div>
						<!-- /.box -->
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default pull-left"
							data-dismiss="modal">Close</button>
						<button type="button" id="btnRegisterPopup"
							class="btn btn-primary" data-dismiss="modal">Save
							changes</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->
	</tiles:putAttribute>
</tiles:insertDefinition>