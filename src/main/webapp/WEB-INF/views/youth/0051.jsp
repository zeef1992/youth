<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<!-- HTML code -->
  <script>
  $( function() {
    $( "#tabs" ).tabs({
      collapsible: true
    });
  } );
  </script>
  	<div class="panel panel-default">
		<div class="panel-heading">
			<spring:message code="title_report_information_search" />
			<div title="Quay Lại" class="cancel cursor-pointer"></div>
		</div>
	</div>
	<div class="panel-body">
		<div id="tabs" style="margin-top: -30px; height: 230px;">
		  <ul>
		  <c:forEach var="value" items="${list0051}">
		  	<li><a id = "${value.reportId}" href='#tabs-${value.reportId}'>${value.reportName}</a></li>
		  </c:forEach>
		  </ul>
		  <c:forEach var="value" items="${list0051}">
			  <div id="tabs-${value.reportId}">
			    	<table class="table table-striped" id="divHeadDetailReport">
						<thead>
						<col width="30%">
						<col width="">
						<tr>
							<th class="align-center colr_53BBF4"><b><spring:message code="detail_report_name" /></b></th>
							<th class="align-center colr_53BBF4"><b><spring:message code="criteria_name" /></b></th>
						</tr>
						</thead>
					</table>
					<div id="divBodyDetailReport" class = "height400 overflow-y">
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
		<div class = "clear height10"></div>
		<button id="btnComfirmReport" class="btn btn-success" type="button"><spring:message code="dialog_ok_button" /></button>
		
	</div>
<div class="loader display-none"></div>
<input type = "hidden" id="reportIdStr" value = "${reportIdStr}" />

