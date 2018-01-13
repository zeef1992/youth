<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="box box-info">
	<div class="box-body">
		<table id="example3" class="table table-bordered table-hover">
			<thead>
			<tr>
				<th class="align-center"><b class="colr_53BBF4 "><spring:message
							code="screen_id" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message
							code="display_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message
							code="add_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message
							code="edit_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message
							code="delete_flag" /></b></th>
				<th class="align-center"><b class="colr_53BBF4"><spring:message
							code="reference_flag" /></b></th>
			</tr>
			</thead>
			<tbody>
				<c:forEach var="entry" items="${listId}">
					<tr class="row_access">
						<td class="green_text font_weight align-center">${entry.screenId}</td>
						<td><c:if test="${entry.screenDisplayEnableFlag == true}">
								<div><i class="displable fa fa-fw fa-close color_ac2925"></i></div>
							</c:if> <c:if test="${entry.screenDisplayEnableFlag == false}">
								<div><i class="displable fa fa-fw fa-check color3c8dbc"></i></div>
							</c:if></td>
						<td><c:if test="${entry.addableFlag == true}">
								<div><i class="addable fa fa-fw fa-close color_ac2925"></i></div>
							</c:if> <c:if test="${entry.addableFlag == false}">
								<div><i class="addable fa fa-fw fa-check color3c8dbc"></i></div>
							</c:if></td>
						<td><c:if test="${entry.updatableFlag == true}">
								<div><i class="updatable fa fa-fw fa-close color_ac2925"></i></div>
							</c:if> <c:if test="${entry.updatableFlag == false}">
								<div><i class="updatable fa fa-fw fa-check color3c8dbc"></i></div>
							</c:if></td>
						<td><c:if test="${entry.deletableFlag == true}">
								<div><i class="deletable fa fa-fw fa-close color_ac2925"></i></div>
							</c:if> <c:if test="${entry.deletableFlag == false}">
								<div><i class="deletable fa fa-fw fa-check color3c8dbc"></i></div>
							</c:if></td>
						<td><c:if test="${entry.referenceFlag == true}">
								<div><i class="referencable fa fa-fw fa-close color_ac2925"></i></div>
							</c:if> <c:if test="${entry.referenceFlag == false}">
								<div><i class="referencable fa fa-fw fa-check color3c8dbc"></i></div>
							</c:if></td>
					</tr>
				</c:forEach>

			</tbody>
		</table>
	</div>
	
		
	</div>
	<div class="clear height10"></div>
	<div class="modal-footer">
		<button type="submit" id="btnRegisterPopup" class="btn btn-primary" data-dismiss="modal" 
			value="Đăng Ký">Save Changes</button>
		<button type="submit" id="btnBack" class="btn btn-default pull-left" data-toggle="modal" data-target="#modal-info" data-dismiss="modal"
			value="Quay Lại">Back</button>
	</div>