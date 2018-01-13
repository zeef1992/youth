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
	<div class="panel-body">
		<div id="tabs" style="margin-top: -25px; height: 230px;">
		  <ul>
		  
		  </ul>
		  <c:forEach var="value" items="${list0051}">
			  <div id="tabs-${value.reportId}">
			    	<table class="table table-bordered table-hover" id="divHeadDetailReport">
						<thead>
						<tr>
							<th class="align-center colr_53BBF4"><b><spring:message code="detail_report_name" /></b></th>
						</tr>
						</thead>
					</table>
					<div id="divBodyDetailReport" class = "height300 mt-20">
						<table id="tblBodyDetailReport" class="table table-bordered table-hover">
							<tr>
								<td></td>
							</tr>
						</table>
					</div>
			  </div>
		  </c:forEach>
		</div>
		<div class = "clear height10"></div>
	</div>
<div class="loader display-none"></div>
<input type = "hidden" id="reportIdStr" value = "${reportIdStr}" />

