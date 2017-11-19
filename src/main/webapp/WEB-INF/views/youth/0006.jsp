<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>

<!DOCTYPE html>
<script type="text/javascript">
	var reportData =  ${reportData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
		<link rel="stylesheet"
			href="${pageContext.request.contextPath}/resources/css/youth/0005.css">
		<script
			src="${pageContext.request.contextPath}/resources/js/youth/0006.js"
			type="text/javascript"></script>
		<!-- HTML code -->
		<div id="right">
			<div class="header"></div>
			<div class="tab">
				<button class="tablinks active"
					onclick="openCity(event, '<spring:message code="title_detail_report_information_search" />')">
					<spring:message code="title_detail_report_information_search" />
				</button>
			</div>

			<div id="<spring:message code="title_detail_report_information_search" />" class="tabcontent" style="display: block;">
				<div class="panel-body">
					<form class="form-horizontal">
						<div class="col-sm-12">
							<div class="col-sm-5">
								<div class="form-group">
									<label class="control-label col-sm-6" for="reportName"><spring:message
											code="report_name" /></label>
									<div class="col-sm-6">
										<select id="cbbReport" class="form-control"></select>
									</div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<label class="control-label col-sm-6" for="detailReportName"><spring:message
											code="detail_report_name" /></label>
									<div class="col-sm-6">
										<input type="text" class="form-control" id="detailReportName"
											placeholder="<spring:message code="detail_report_name" />" />
									</div>
								</div>
							</div>
							<div class="col-sm-2">
								<button id="btnSearch" class="btn btn-success" type="button">
									<spring:message code="button_search" />
								</button>
							</div>
							<input type="hidden" id="reportIdDefault"
								value="${reportIdDefault}" />
						</div>
						<table class="table table-striped display-none" id="divHead">
							<thead>
							<col width="20%">
							<col width="">
							<col width="40">
							<col width="40">
							<col width="40">
							<tr>
								<th colspan="2" class="align-center colr_53BBF4"><b><spring:message
											code="detail_report_name" /></b></th>
								<th></th>
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
								<col width="40">
								<tr>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</table>
						</div>
						<div class="tblPager display-none pager float-right margin-top5">
							<div class="float-left padding-top2 margin-right20">
								<span id="btnFirst" class="page-number-first"></span> <span
									id="btnPrevious" class="page-number-pre"></span> <span
									id="lblCurrentPage" class="padding-left5 float-left">0</span> <span
									id="lblPageSeperator" class="float-left">/</span> <span
									id="lblMaxPage" class="padding-right5 float-left">0</span> <span
									id="btnNext" class="page-number-next"></span> <span
									id="btnLast" class="page-number-last"></span>
							</div>
							<div class="float-left">
								<input id="txtGoToPage" class="width40" type="text"
									maxlength="5" onpaste="return false;" /> <input
									id="btnGoToPage" class="btn btn-success" type="button"
									value="<spring:message code="button_pager" />" />
							</div>
						</div>
						<div>
							<button type="button" id="btnRegister" class="register">Đăng
								Ký</button>
							<button type="button" class="back">Quay Lại</button>
						</div>
					</form>
				</div>
				<div id="overlay" class="web-popup-overlay"></div>
				<div id="popupWrapper" class="reportinfo-popup">
					<div class="panel panel-default">
						<div class="panel-heading">
							<spring:message code="title_popup_detail_report_information" />
							<div title="Quay Lại" class="cancel cursor-pointer"></div>
						</div>
					</div>
					<div class="panel-body">
						<div class="col-sm-12">
							<div class="col-sm-1"></div>
							<div class="col-sm-10">
								<div class="form-group">
									<label class="control-label col-sm-4" for=""><spring:message
											code="report_name" /></label>
									<div class="col-sm-8">
										<select class="cbbReportPopup form-control"></select>
									</div>
								</div>
								<div class="height10 clearfix"></div>
								<div class="form-group">
									<label class="control-label col-sm-4" for="txtUsersIdPopup"><spring:message
											code="detail_report_name" /></label>
									<div class="col-sm-8">
										<input type="text" class="form-control"
											id="txtDetailReportNamePopup"
											placeholder="<spring:message code="detail_report_name" />" />
										<input type="hidden" class="form-control"
											id="txtDetailReportIdPopup" />
									</div>
								</div>
								<div class="height10 clearfix"></div>
								<div class="form-group">
									<div class="col-sm-offset-4 col-sm-8">
										<div class="checkbox">
											<label><input type="checkbox" id="chbDeletePopup">
												<spring:message code="delete_flag" /></label>
										</div>
									</div>
								</div>
								<div class="clear"></div>
								<div class="form-group margin-top20">
									<div class="col-sm-offset-4 col-sm-8">
										<div class="checkbox">
											<button id="btnRegisterPopup"
												class="btn margin-right10 btn-success align-center"
												type="button">
												<spring:message code="button_register" />
											</button>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-1"></div>
						</div>
					</div>
				</div>
	</tiles:putAttribute>
</tiles:insertDefinition>