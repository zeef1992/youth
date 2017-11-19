<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="panel panel-default">
	<div class="panel-heading">
		<spring:message code="decentralization_manager" />
		<div class="cancel cursor-pointer"></div>
	</div>
	<div class="panel-body">
		<table class="table table-striped" id="">
			<thead>
			<col width="16%">
			<col width="16%">
			<col width="16%">
			<col width="16%">
			<col width="16%">
			<col width="">
			<tr>
				<th class="align-center"><b class="colr_53BBF4 "><spring:message code="screen_id" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message code="display_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message code="add_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message code="edit_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message code="delete_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message code="reference_flag" /></b></th>
			</tr>
			</thead>
		</table>
		<div id="divBody" class="height250">
			<table id="tblBody" class="table table-striped">
				<col width="16%">
				<col width="16%">
				<col width="16%">
				<col width="16%">
				<col width="16%">
				<col width="">
				
					<c:forEach var="entry" items="${listId}">
					<tr class="row_access">
						<td class="green_text font_weight align-center">${entry.screenId}</td>
						<td>
							<c:if test="${entry.screenDisplayEnableFlag == true}">
								<div class="disabled displable cursor-pointer"></div>  
							</c:if>
							<c:if test="${entry.screenDisplayEnableFlag == false}">
								<div class="enabled displable cursor-pointer"></div>  
							</c:if>	
						</td>
						<td>
							<c:if test="${entry.addableFlag == true}">
								<div class="disabled addable cursor-pointer"></div>  
							</c:if>
							<c:if test="${entry.addableFlag == false}">
								<div class="enabled addable cursor-pointer"></div>  
							</c:if>	
						</td>
						<td>
							<c:if test="${entry.updatableFlag == true}">
								<div class="disabled updatable cursor-pointer"></div>  
							</c:if>
							<c:if test="${entry.updatableFlag == false}">
								<div class="enabled updatable cursor-pointer"></div>  
							</c:if>	  
						</td>
						<td>
							<c:if test="${entry.deletableFlag == true}">
								<div class="disabled deletable cursor-pointer"></div>  
							</c:if>
							<c:if test="${entry.deletableFlag == false}">
								<div class="enabled deletable cursor-pointer"></div>  
							</c:if>	
						</td>
						<td>
							<c:if test="${entry.referenceFlag == true}">
								<div class="disabled referencable cursor-pointer"></div>  
							</c:if>
							<c:if test="${entry.referenceFlag == false}">
								<div class="enabled referencable cursor-pointer"></div>  
							</c:if>	
						</td>
					</tr>
					</c:forEach>
			</table>
		</div>
		<div class="clear height10"></div>
		<button type="submit" id="btnRegisterPopup" class="btn btn-success " value="Đăng Ký">Đăng Ký</button>
		<button type="submit" id="btnBack" class="btn btn-success" value="Quay Lại">Quay Lại</button>
	</div>
</div>