<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!-- HTML code -->
	<div class="panel panel-default">
		<div class="panel-heading">
			<spring:message code="title_report_information_search" />
			<div title="Quay Lại" class="cancel cursor-pointer"></div>
		</div>
	</div>
	<div class="panel-body">
			<table class="table table-striped" id="divHeadReport">
				<thead>
				<col width="100%">
				<tr>
					<th class="align-center colr_53BBF4"><b><spring:message code="report_name" /></b></th>
				</tr>
				</thead>
			</table>
			<div id="divBodyReport" class = "height150 overflow-y">
				<table id="tblBodyReport" class="table table-striped">
					<col width="100%">
					<tr>
						<td></td>
					</tr>
				</table>
			</div>
			<div class ="clear height10"></div>
			<button id="btnDetailReport" class="btn btn-success" type="button">Chọn Chi Tiết Mẫu</button>
	</div>

