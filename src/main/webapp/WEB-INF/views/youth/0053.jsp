<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<script type = "text/javascript">
	var list0053 = ${listJs0053};
</script>
<div class="panel panel-default">
	<div class="panel-heading">
		<spring:message code="title_create_relationship_of_person" />
	</div>
</div>
<ul class="nav nav-tabs">
	<c:forEach var="value" items="${list0053}">
		<li><a id="${value.reportId}" href='#tabs-${value.reportId}'>${value.reportName}</a></li>
	</c:forEach>
</ul>
<div class="tab-content">
	<c:forEach var="value" items="${list0053}">
		<div id="tabs-${value.reportId}" class="tab-pane">
			<table class="table table-striped" id="divHeadDetailReport">
				<thead>
				<col width="30%">
				<col width="">
				<tr>
					<th class="align-center colr_53BBF4"><b><spring:message
								code="detail_report_name" /></b></th>
					<th class="align-center colr_53BBF4"><b><spring:message
								code="criteria_name" /></b></th>
				</tr>
				</thead>
			</table>
			<div id="divBodyDetailReport" class="height400 overflow-y">
				<table id="tblBodyDetailReport" class="table table-striped">
					<col width="30%">
					<col width="">
					<tr>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
	</c:forEach>
</div>