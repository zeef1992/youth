<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<script type="text/javascript">
	var cateData = ${cateData};
	var statusData = ${StatusData};
	var countryData = ${countryData};
	var eduactionData = ${educationData};
	var reportData = ${reportData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
		<script
			src="${pageContext.request.contextPath}/resources/js/youth/0043.js"
			type="text/javascript"></script>
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					Danh Sách Mẫu Báo Cáo<small>Control panel</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="${pageContext.request.contextPath}/main/"><i
							class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Danh Sách Mẫu Báo Cáo</li>
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
										<b>Tổng Cộng: </b><span id="txtCounts"></span>
										<div class="box-body table-responsive">
											<table class="table table-bordered table-hover"
												id="divHeadReport">
												<thead>
													<tr>
														<th style="width: 10%">STT</th>
														<th><b><spring:message code="report_name" /></b></th>
													</tr>
												</thead>
											</table>
											<div id="divBodyReport" class="height300 overflow-y mt-20">
												<table id="tblBodyReport"
													class="table table-bordered table-hover">
													<tr>
														<td></td>
														<td></td>
													</tr>
												</table>
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
			<div class="modal-dialog" style="width: 90%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title"></h4>
					</div>
					<div class="modal-body" style="height: 230px;">
						
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6">Trình
									Độ:</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-level-up"></i>
									</div>
									<select id="cbbEducation" class="form-control"></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6">Trường
									Học:</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-university"></i>
									</div>
									<select id="cbbUniversity" class="form-control"></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6">Chuyên
									Ngành:</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-graduation-cap"></i>
									</div>
									<select id="cbbSpecialized" class="form-control"></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="country_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbCountry" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="city_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbCity" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="district_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbDistrict" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="wards_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbWards" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="town_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbTown" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6"><spring:message
										code="groups_name" /> :</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-globe"></i>
									</div>
									<select id="cbbGroups" class="form-control "></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6">Tình
									Trang:</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-map"></i>
									</div>
									<select id="cbbStatus" class="form-control"></select>
								</div>
							</div>
							<div class="form-group col-sm-4">
								<label style="line-height: 35px;" class="control-label col-sm-6">Phân
									Loại:</label>
								<div class="input-group date col-sm-6">
									<div class="input-group-addon">
										<i class="fa fa-sitemap"></i>
									</div>
									<select id="cbbCate" class="form-control"></select>
								</div>
							</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default pull-left"
							data-dismiss="modal">Close</button>
						<button type="button" id="btnRegister" class="btn btn-primary"
							data-dismiss="modal">Save changes</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<!-- /.modal -->

	</tiles:putAttribute>
</tiles:insertDefinition>