<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<!DOCTYPE html>
<script type="text/javascript">
	var cateData = ${cateData};
	var statusData = ${StatusData};
	var countryData = ${countryData};
	var universityData = ${universityData};
	var eduactionData = ${educationData};
	var reportData = ${reportData};
</script>
<tiles:insertDefinition name="defaultTemplate">
	<tiles:putAttribute name="body">
	<script src="${pageContext.request.contextPath}/resources/js/common/download.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/resources/js/youth/0040.js" type="text/javascript"></script>
		<link rel="stylesheet"
			href="${pageContext.request.contextPath}/resources/css/youth/0040.css">
  <!-- iCheck for checkboxes and radio inputs -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/iCheck/all.css">
  <!-- Bootstrap Color Picker -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css">
  <!-- Bootstrap time Picker -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/timepicker/bootstrap-timepicker.min.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/select2/dist/css/select2.min.css">

<!-- InputMask -->
<script src="${pageContext.request.contextPath}/resources/plugins/input-mask/jquery.inputmask.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/input-mask/jquery.inputmask.extensions.js"></script>
  	<!-- bootstrap datepicker -->
  	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
	<!-- bootstrap datepicker -->
	<script src="${pageContext.request.contextPath}/resources/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>

<script>
  $(function () {
    /* //Initialize Select2 Elements
    $('.select2').select2()

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro*/
    $('[data-mask]').inputmask() 

    //Date range picker
    /* $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
    //Date range as a button
    $('#daterange-btn').daterangepicker(
      {
        ranges   : {
          'Today'       : [moment(), moment()],
          'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month'  : [moment().startOf('month'), moment().endOf('month')],
          'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        startDate: moment().subtract(29, 'days'),
        endDate  : moment()
      },
      function (start, end) {
        $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
      }
    )
 */
    //Date picker
    $('#datepicker').datepicker({
      autoclose: true
    })

    /* //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
      checkboxClass: 'icheckbox_minimal-blue',
      radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
      checkboxClass: 'icheckbox_minimal-red',
      radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
      checkboxClass: 'icheckbox_flat-green',
      radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()

    //Timepicker
    $('.timepicker').timepicker({
      showInputs: false
    }) */
  })
</script>
	<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
				<h1>
					Tiêu Chí Báo Cáo<small>Control panel</small>
				</h1>
				<ol class="breadcrumb">
					<li><a href="${pageContext.request.contextPath}/main/"><i
							class="fa fa-dashboard"></i> Home</a></li>
					<li class="active">Quản Lý Thanh Niên</li>
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
									<div class = "row">
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="cate_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbCate" class="form-control input-sm"></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="status" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbStatus" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4"></div>
									</div>
									
									<div class = "row">
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-5" for="txtPersonName"><spring:message code="person_name" /> :</label>
												<div class="col-sm-7">
													<input type="text" class="form-control input-sm" id="txtPersonName" placeholder="<spring:message code="person_name" />" />
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<label class="control-label col-sm-5" for="txtIdentityCard"><spring:message code="identity_card" /> :</label>
												<div class="col-sm-7">
													<input id="txtIdentityCard" class="form-control input-sm col-sm-7" type="text" value="" name="" placeholder="<spring:message code="identity_card" />">
												</div>
											</div>
										</div>
									</div>
									<div class = "row">
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="country_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbCountry" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="city_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbCity" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="district_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbDistrict" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class = "row">
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="wards_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbWards" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="town_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbTown" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="groups_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbGroups" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class = "row">
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbCate"><spring:message code="level" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbEducation" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbUniversity"><spring:message code="university_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbUniversity" class="form-control input-sm "></select>
													</div>
												</div>
											</div>
										</div>
										<div class="col-sm-4">
											<div class="form-group">
												<div class="form-group">
													<label class="control-label col-sm-5" for="cbbSpecialized"><spring:message code="specialized_name" /> :</label>
													<div class="col-sm-7">
														<select id = "cbbSpecialized" class="form-control input-sm "></select>
													</div>
												</div>
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
									<button type="button" id="btnExport" data-toggle="modal"
										data-target="#modal-export"
										class="btn bg-info margin pull-left">Export</button>
								</div>
							</form>
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
											<b>Tổng Cộng: </b><span id="txtCounts"></span>
										<div class="box-body table-responsive" style="height: 500px;">
											<table id="example2" class="table table-bordered table-hover">
												<thead>
													<tr>
														<th>STT</th>
														<th style="padding-right: 25px;padding-left: 25px;">All Action of Person</th>
														<!-- <th>View</th>
														<th>Delete</th>
														<th>Quá Trình Bản Thân</th>
														<th>Thân Nhân</th>
														<th>Báo Cáo</th> -->
														<th><b><spring:message code="lltn_stt" /></b></th>
														<th><b><spring:message code="kskquan_stt" /></b></th>
														<th><b><spring:message code="person_id" /></b></th>
														<th><b><spring:message code="person_name" /></b></th>
														<th><b><spring:message code="dateOfBirth" /></b></th>
														<th><b><spring:message code="placeOfBirth" /></b></th>
														<th><b><spring:message code="identity_card" /></b></th>
														<th><b><spring:message code="native_country" /></b></th>
														<th><b><spring:message code="nation" /></b></th>
														<th><b><spring:message code="religion" /></b></th>
														<th><b><spring:message code="permanent_address" /></b></th>
														<th><b><spring:message code="temporary_residence_address" /></b></th>
														<th><b><spring:message code="national" /></b></th>
														<th><b><spring:message code="element" /></b></th>
														<th><b><spring:message code="graduation_year" /></b></th>
														<th><b><spring:message code="job_id" /></b></th>
														<th><b><spring:message code="work_place" /></b></th>
														<th>Create By</th>
														<th>Update By</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<!-- <td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td> -->
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
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
						<h4 class="modal-title">Person Information</h4>
					</div>
					<div class="modal-body">
						<!-- Horizontal Form -->
						<div class="box box-primary" id = "addNewPerson">
							<div class="nav-tabs-custom">
					            <ul class="nav nav-tabs">
					              <li class="active"><a href="#tab_1" data-toggle="tab">Thông Tin Cá Nhân</a></li>
					              <li><a href="#tab_2" data-toggle="tab">Trình Độ Học Vấn</a></li>
					              <li><a href="#tab_3" data-toggle="tab">Quản Lý</a></li>
					              <!-- <li class="dropdown">
					                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
					                  Dropdown <span class="caret"></span>
					                </a>
					                <ul class="dropdown-menu">
					                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
					                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
					                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
					                  <li role="presentation" class="divider"></li>
					                  <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
					                </ul>
					              </li>
					              <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li> -->
					            </ul>
					            <div class="tab-content">
					              <div class="tab-pane active" id="tab_1">
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Họ & Tên:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
						                    	<i class="glyphicon glyphicon-user"></i>
						                  	</div>
					              			<input type="text" class="form-control pull-right" id="txtPersonNamePopup">
					              			<input type="hidden" class="form-control pull-right" id="txtPersonIdPopup">
					              			<input readonly="true" type="hidden" class="form-control" id="txtKskQuanStt" placeholder="<spring:message code="kskquan_stt" />" value = "${lastKskquanStt}" />
					              			<input readonly="true" type="hidden" class="form-control" id="txtLltnStt" placeholder="<spring:message code="kskquan_stt" />" value = "${lastLltnStt}" />
					              		</div>
					              	</div>
					              	<div class="form-group has-warning" id="warning_birthDay">
					              		<label class="control-label display-none" for="inputWarning"><i class="fa fa-bell-o"></i> Chưa chọn ngày sinh</label>
					              	</div>
					                <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3">Ngày Sinh:</label>
						                <div class="input-group date col-sm-9">
						                  	<div class="input-group-addon">
						                    	<i class="fa fa-calendar"></i>
						                  	</div>
						                  	<input type="text" class="form-control pull-right" id="datepicker">
						                </div>
						                <!-- /.input group -->
						            </div>
						            <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3">Nơi Sinh:</label>
						                <div class="input-group date col-sm-9">
						                  	<div class="input-group-addon">
						                    	<i class="fa fa-globe"></i>
						                  	</div>
											<select id = "cbbPlaceOfBirth" class="form-control"></select>
						                </div>
						                <!-- /.input group -->
						            </div>
						            <div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">CMND/CCND:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
						                    	<i class="fa fa-credit-card"></i>
						                  	</div>
					              			<input type="text" class="form-control pull-right" id="txtIndentityCardPopup">
					              		</div>
					              	</div>
						            <div class="form-group">
						                <label class = "control-label col-sm-3">Điện Thoại:</label>
						
						                <div class="input-group col-sm-9">
						                  <div class="input-group-addon">
						                    <i class="fa fa-phone"></i>
						                  </div>
						                  <input type="text" id = "txtPhonePopup" class="form-control" maxlength="11">
						                </div>
						                <!-- /.input group -->
						             </div>
						             <div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Dân Tộc:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
						                    	<i class="fa fa-flag-checkered"></i>
						                  	</div>
					              			<input type="text" class="form-control pull-right" id="txtNationPopup">
					              		</div>
					              	</div>
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Tôn Giáo:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
						                    	<img alt="" src="${pageContext.request.contextPath}/resources/img/religion.png" width = "16px">
						                  	</div>
					              			<input type="text" class="form-control pull-right" id="txtReligionPopup">
					              		</div>
					              	</div>
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Đ/c Thường Trú:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
												<i class="fa fa-map-o"></i>						                  	
											</div>
					              			<input type="text" class="form-control pull-right" id="txtPermanentAddressPopup">
					              		</div>
					              	</div>
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Đ/c Tạm Trú:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
												<i class="fa fa-map"></i>						                  	
											</div>
					              			<input type="text" class="form-control pull-right" id="txtTemporaryResidenceAddressPopup">
					              		</div>
					              	</div>
					              </div>
					              <!-- /.tab-pane -->
					              <div class="tab-pane" id="tab_2">
					                	<div class="form-group">
						              		<label style="line-height: 35px;" class = "control-label col-sm-3">Trình Độ:</label>
						              		<div class="input-group date col-sm-9">
						              			<div class="input-group-addon">
													<i class="fa fa-level-up"></i>						                  	
												</div>
						              			<select id = "cbbEducationPopup" class="form-control"></select>
						              		</div>
						              	</div>
						              	<div class="form-group">
						              		<label style="line-height: 35px;" class = "control-label col-sm-3">Trường Học:</label>
						              		<div class="input-group date col-sm-9">
						              			<div class="input-group-addon">
													<i class="fa fa-university"></i>						                  	
												</div>
						              			<select id = "cbbUniversityPopup" class="form-control"></select>
						              		</div>
						              	</div>
						              	<div class="form-group">
						              		<label style="line-height: 35px;" class = "control-label col-sm-3">Chuyên Ngành:</label>
						              		<div class="input-group date col-sm-9">
						              			<div class="input-group-addon">
													<i class="fa fa-graduation-cap"></i>						                  	
												</div>
						              			<select id = "cbbSpecializedPopup" class="form-control"></select>
						              		</div>
						              	</div>
					              </div>
					              <!-- /.tab-pane -->
					              <div class="tab-pane" id="tab_3">
					                <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="country_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbCountryPopup" class="form-control "></select>
						              	</div>
						             </div>
						             <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="city_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbCityPopup" class="form-control "></select>
						              	</div>
						             </div>
						             <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="district_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbDistrictPopup" class="form-control "></select>
						              	</div>
						             </div>
						             <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="wards_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbWardsPopup" class="form-control "></select>
						              	</div>
						             </div>
						             <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="town_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbTownPopup" class="form-control "></select>
						              	</div>
						             </div>
						             <div class="form-group">
						              	<label style="line-height: 35px;" class = "control-label col-sm-3"><spring:message code="groups_name" /> :</label>
						              	<div class="input-group date col-sm-9">
						              		<div class="input-group-addon">
												<i class="fa fa-globe"></i>						                  	
											</div>
						              		<select id = "cbbGroupsPopup" class="form-control "></select>
						              	</div>
						             </div>
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Tình Trang:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
												<i class="fa fa-map"></i>						                  	
											</div>
					              			<select id = "cbbStatusPopup" class="form-control"></select>
					              		</div>
					              	</div>
					              	<div class="form-group">
					              		<label style="line-height: 35px;" class = "control-label col-sm-3">Phân Loại:</label>
					              		<div class="input-group date col-sm-9">
					              			<div class="input-group-addon">
												<i class="fa fa-sitemap"></i>						                  	
											</div>
					              			<select id = "cbbCatePopup" class="form-control"></select>
					              		</div>
					              	</div>
					              </div>
					              <!-- /.tab-pane -->
					            </div>
					            <!-- /.tab-content -->
					          </div>
					          <!-- nav-tabs-custom -->
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
		
		<div class="modal fade" id="modal-info">
			<div class="modal-dialog"  style="width: 80%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					<div title="Quay Lại" id = "addProcess" class=" cursor-pointer" style="float: right; margin-right: 10px;">
						<i class="fa fa-plus"></i>
					</div>
						<h4 class="modal-title">Quá Trình Bản Thân</h4>
					</div>
					<div class="modal-body processOfYourSelt">
					
					</div>
					<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left"
							data-dismiss="modal">Close</button>
					<button type="button" id="btnRegisterPopupProcess"
							class="btn btn-primary" data-dismiss="modal">Save
							changes</button>
					<button id="btnEditProcessYourselt" class="btn btn-primary" type="button">Chĩnh Sữa</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-success">
			<div class="modal-dialog"  style="width: 80%;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					<div title="Quay Lại" id = "addNewRelation" class=" cursor-pointer" style="float: right; margin-right: 10px;">
						<i class="fa fa-plus"></i>
					</div>
						<h4 class="modal-title">Thiết Lập Quan Hệ Gia Đình Thanh Niên</h4>
					</div>
					<div class="modal-body relationContent">
					
					</div>
					<div class="modal-footer">
					<button type="button" class="btn btn-default pull-left"
							data-dismiss="modal">Close</button>
					<button type="button" id="btnRegisterPopupRelation"
							class="btn btn-primary" data-dismiss="modal">Save
							changes</button>
					<button id="btnEditRelation" class="btn btn-primary" type="button">Chĩnh Sữa</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="modal-warning">
          <div class="modal-dialog" style="width: 90%;">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Thiết Lập Thông Tin Báo Cáo Của Thanh Niên</h4>
              </div>
              <div class="modal-body" id = "report_popup"></div>
              <div class="modal-footer">
					<button type="button" class="btn btn-default pull-left"
							data-dismiss="modal">Close</button>
					<button type="button" id="btnRegisterNoteReport"
							class="btn btn-primary" data-dismiss="modal">Save
							changes</button>
			  </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
        <div class="modal fade" id="modal-export">
          <div class="modal-dialog" style="width: 16%;">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Download File</h4>
              </div>
              <div class="modal-body">
              	<%-- <a href = "<c:url value='/down/xls?filename=<script type = "text/javascript">$(docmune)</script>'/>">Demo</a> --%>
              	<a id = "download" class="btn btn-app">
                	<i id = "btnDownload"  class="fa fa-download"></i> Download
              	</a>
              	<a class="btn btn-app" data-dismiss="modal">
                	<i class="fa fa-close"></i> Cancel
              	</a>
              	<input type = "hidden" value="" id = "fileName" />
              </div>
              
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
	</tiles:putAttribute>
</tiles:insertDefinition>