<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<!DOCTYPE html>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
		<link rel="stylesheet"
			href="${pageContext.request.contextPath}/resources/css/youth/0005.css">
		<script
			src="${pageContext.request.contextPath}/resources/js/youth/0005.js"
			type="text/javascript"></script>

		<!-- DataTables -->
		<script
			src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>

		<script
			src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap.min.js"></script>
		<!-- HTML code -->
		<script>
</script>
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					Quản Lý Báo Cáo <small>Control panel</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="${pageContext.request.contextPath}/main/"><i class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Mẫu Báo Cáo</li>
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
							<!-- Horizontal Form -->
							<div class="box box-info">
								<!-- form start -->
								<form class="form-horizontal">
									<div class="box-body">
										<div class="form-group">
											<label for="reportId" class="col-sm-1 control-label">Report
												ID</label>

											<div class="col-sm-4">
												<input type="text" class="form-control input-sm" id="reportId"
													placeholder="User ID">
											</div>
											<label for="reportName" class="col-sm-2 control-label">Report Name</label>
											<div class="col-sm-4">
												<input type="text" class="form-control input-sm"
													id="reportName" placeholder="Report Name">
											</div>
										</div>
									</div>
									<!-- /.box-body -->
									<div class="box-footer">
										<button type="button" id = "btnSearch" class="btn bg-info pull-right">Search</button>
										<button type="button" id = "btnRegister" class="btn bg-info margin pull-left"  data-toggle="modal" data-target="#modal-default">Add New</button>
									</div>
									<!-- /.box-footer -->
								</form>
							</div>
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
											<b>Tổng Cộng: </b><span id ="txtCounts"></span>
											<table id="example2" class="table table-bordered table-hover">
												<thead>
													<tr>
														<th>STT</th>
														<th><b><spring:message code="report_id" /></b></th>
														<th><b><spring:message code="report_name" /></b></th>
														<th>Create By</th>
														<th>Create On</th>
														<th></th>
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
										<div class="tblPager display-none pager float-right margin-top5">
											<div class="float-left padding-top2 pull-right margin-right20">
												
												<span id="btnFirst" class="page-number-first btn btn-default">First</span> 
												<span id="btnPrevious" class="page-number-pre  btn btn-default">Previous</span> 
												<span id="lblPageSeperator" class="float-left btn btn-default">
													<span id="lblCurrentPage" class="padding-left5 float-left ">0</span>/
													<span id="lblMaxPage" class="padding-right5 float-left">0</span>
												</span> 
												<span id="btnNext" class="page-number-next  btn btn-default">Next</span> <span
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
						<h4 class="modal-title">
							<spring:message code="title_popup_user_information" />
						</h4>
					</div>
					<div class="modal-body">
						<!-- Horizontal Form -->
						<div class="box box-info">
							<!-- 
							<div class="box-header with-border">
								<span class="box-title" id = "update">Thêm Mới</span>
								<span class="box-title" id = "addNew">Cập Nhật</span>
							</div> -->
							<!-- /.box-header -->
							<!-- form start -->
							<form class="form-horizontal">
								<div class="box-body">
									<div class="form-group">
										<label for="txtReportNamePopup" class="col-sm-3 control-label">Report Name</label>
										<div class="col-sm-9">
											<input type="text" class="form-control" id="txtReportNamePopup" maxlength="20" placeholder="Report Name">
											<input type="hidden" class="form-control" id="txtReportIdPopup" />
										</div>
									</div>
								</div>
								<div class="form-group">
									<div class="col-sm-offset-3 col-sm-9">
										<div class="checkbox">
											<label> <input id="chbDeletePopup" type="checkbox">
												Delete Flag
											</label>
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
		<!-- /.content -->
	</tiles:putAttribute>
</tiles:insertDefinition>