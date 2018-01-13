<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<script type="text/javascript">
	var specializedData = ${specializedData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/youth/0019.css">
	<script src="${pageContext.request.contextPath}/resources/js/youth/0019.js" type="text/javascript"></script>
	<!-- DataTables -->
	<script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js"></script>
	<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					Quản Lý Thành Phố<small>Control panel</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="${pageContext.request.contextPath}/main/"><i
							class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Quản Lý Thành Phố</li>
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
											<label class="control-label col-sm-6" for="cbbUniversity"><spring:message code="university_name" /></label>
											<div class="col-sm-6">
												<select id = "cbbUniversity" class="form-control "></select>
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-6" for="txtSpecializedCode"><spring:message code="specialized_code" /></label>
											<div class="col-sm-6">
												<input type="text" class="form-control" id="txtSpecializedCode" placeholder="<spring:message code="specialized_code" />">
											</div>
										</div>
									</div>
									<div class="col-sm-4">
										<div class="form-group">
											<label class="control-label col-sm-6" for="txtSpecializedName"><spring:message code="specialized_name" /></label>
											<div class="col-sm-6">
												<input type="text" class="form-control" id="txtSpecializedName" placeholder="<spring:message code="specialized_name" />">
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
								<input type="hidden" id = "universityIdDefault" value = "${universityIdDefault}" />
							</form>
							<!-- /.box -->
							<section class="content">
								<div class="row">
									<div class="box-body">
										<div class="alert alert-dismissible display-none">
											<span></span>
											<button type="button" class="close"></button>
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
														<th><b><spring:message code="city_code" /></b></th>
														<th><b><spring:message code="city_name" /></b></th>
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
						<h4 class="modal-title">Specialized Information</h4>
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
										<label class="control-label col-sm-4" for="txtUniversityNamePopup"><spring:message code="university_name" /></label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="txtUniversityNamePopup" placeholder="<spring:message code="university_name" />" />
											<input type="hidden" class="form-control" id="txtUniversityIdPopup" />
										</div>
									</div>
									<div class = "clear height10"></div>
									<div class="form-group">
										<label class="control-label col-sm-4" for="txtSpecializedCodePopup"><spring:message code="specialized_code" /></label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="txtSpecializedCodePopup" placeholder="<spring:message code="specialized_code" />" />
										</div>
									</div>
									<div class = "clear height10"></div>
									<div class="form-group">
										<label class="control-label col-sm-4" for="txtSpecializedNamePopup"><spring:message code="specialized_name" /></label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="txtSpecializedNamePopup" placeholder="<spring:message code="specialized_name" />" />
											<input type="hidden" class="form-control" id="txtSpecializedIdPopup" />
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
		<!-- HTML code -->
		<div id="right">
			<div class="header"></div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_specialized_information_search" />')">
					<spring:message code="title_specialized_information_search" />
				</button>
			</div>
			<div id="<spring:message code="title_specialized_information_search" />" class="tabcontent" style="display: block;">
			<div class="panel-body">
				<form class="form-horizontal">
					<div class="col-sm-12">
						<div class="col-sm-3">
							<div class="form-group">
								<label class="control-label col-sm-6" for="cbbUniversity"><spring:message code="university_name" /></label>
								<div class="col-sm-6">
									<select id = "cbbUniversity" class="form-control "></select>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="form-group">
								<label class="control-label col-sm-6" for="txtSpecializedCode"><spring:message code="specialized_code" /></label>
								<div class="col-sm-6">
									<input type="text" class="form-control" id="txtSpecializedCode" placeholder="<spring:message code="specialized_code" />">
								</div>
							</div>
						</div>
						<div class="col-sm-5">
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtSpecializedName"><spring:message code="specialized_name" /></label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="txtSpecializedName" placeholder="<spring:message code="specialized_name" />">
								</div>
								<div class="col-sm-4">
									<button id="btnSearch" class="btn btn-success" type="button"><spring:message code="button_search" /></button>
								</div>
								
							</div>
						</div>
					</div>
					<input type="hidden" id = "universityIdDefault" value = "${universityIdDefault}" />
					<p id="universityName"><spring:message code="university_name" />: <b id = "textUniversityName"></b></p>
					<table class="table table-striped display-none" id = "divHead">
						<thead>
								<col width="20%">
								<col width="">
								<col width="40">
								<col width="40">
								<col width="40">
							<tr>
								<th class="align-center colr_53BBF4"><b><spring:message code="specialized_code" /></b></th>
								<th class="align-center colr_53BBF4"><b><spring:message code="specialized_name" /></b></th>
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
							<button type="button" id="btnRegister" class="register">Đăng Ký</button>
							<button type="button" class="back">Quay Lại</button>
						</div>
					</div>
				</form>
			</div>
			<div id="overlay" class="web-popup-overlay"></div>
			<div id="popupWrapper" class="specializedinfo-popup">
				<div class="panel panel-default">
					<div class="panel-heading">
						<span id = "update"><spring:message code="title_popup_specialized_edit_information" /></span>
						<span id = "addNew"><spring:message code="title_popup_specialized_add_information" /></span>
						<div title="Quay Lại" class="cancel cursor-pointer"></div>
					</div>
				</div>
				<div class="panel-body">
					<div class="col-sm-12">
						<div class="col-sm-1"></div>
						<div class="col-sm-10">
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtUniversityNamePopup"><spring:message code="university_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtUniversityNamePopup" placeholder="<spring:message code="university_name" />" />
									<input type="hidden" class="form-control" id="txtUniversityIdPopup" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtSpecializedCodePopup"><spring:message code="specialized_code" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtSpecializedCodePopup" placeholder="<spring:message code="specialized_code" />" />
								</div>
							</div>
							<div class = "clear height10"></div>
							<div class="form-group">
								<label class="control-label col-sm-4" for="txtSpecializedNamePopup"><spring:message code="specialized_name" /></label>
								<div class="col-sm-8">
									<input type="text" class="form-control" id="txtSpecializedNamePopup" placeholder="<spring:message code="specialized_name" />" />
									<input type="hidden" class="form-control" id="txtSpecializedIdPopup" />
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