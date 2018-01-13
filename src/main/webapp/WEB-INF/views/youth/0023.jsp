<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script type="text/javascript">
	var accessData = ${accessData};
	if (accessData != "") {
		var accessManager = "";
		var optionStr = "";
		for (var i = 0; i < accessData.length; i++) {
			if (accessData[i].accessAuthorityId = "1") {
				accessManager = "System Admin"
			} else if (accessData[i].accessAuthorityId = "2") {
				accessManager = "User"
			}
			optionStr += "<option value='" + accessData[i].accessAuthorityId + "'>"
					+ accessManager + "</option>";
		}
		$("#cbbAccess").empty()
		$("#cbbAccess").append(optionStr);
	}
</script>
<div class="box box-info">
	<div class="box-body">
		<div class="col-sm-4">
			<select class="form-control" id="cbbAccess"></select>
		</div>
		<div class="col-sm-12">
			<c:forEach var="entry" items="${screenList}">
				<div class="col-sm-2 btn-screen">
					<button type="button" id="${entry.screenName}"
						class="btn btn-default screen">${entry.screenName}</button>
				</div>
			</c:forEach>
		</div>
		<div class="clear height20"></div>
		<div class="col-sm-12 mt-10">
			<div class="row">
				<button id="btn_access" class="btn btn-info btn-block btn-flat" data-toggle="modal" data-target="#modal-success" data-dismiss="modal">Xác
					Nhận Chọn Màn Hình</button>
			</div>
		</div>
		<input type="hidden" value="${usersId}" id="usersIdPopup" />
	</div>
</div>