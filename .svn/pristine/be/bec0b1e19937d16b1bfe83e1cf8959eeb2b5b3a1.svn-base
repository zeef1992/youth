/**
 * author Nghia Nguyen
 */

$(document).ready(function(){
	//--------------- Constants definition ---------------
	initComboboxData(false);
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox(false);
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId();
	});

	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId();
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId();
	});

	// Town name combobox change event process
	$("#cbbTown").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId();
	});

	// univeristy name combobox change event process
	$("#cbbUniversity").bind("change", function() {
		// load Town name combobox
		loadSpecializedDataByUniverisityId();
	});

	// Load Area name combobox data
	function loadSpecializedDataByUniverisityId() {
		var selectedUniversityId = "";
		selectedUniversityId = $("#cbbUniversity").find("option:selected").val(); 
		if (selectedUniversityId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getSpecializedDataByUniversityId",
				data: { "universityId": selectedUniversityId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					// create option string
					var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].specializedId + "'>" + returnedJsonData[i].specializedName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbSpecialized").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbSpecialized").prop("disabled", false);
					} else {
						// reset empty combobox and disabled
						$("#cbbSpecialized").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbSpecialized").empty();
			// disable combobox
			$("#cbbSpecialized").prop("disabled", true);
		}
	}

	// Load Area name combobox data
	function loadCityDataCombobox() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		if (selectedCountryId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getCityDataByCountryId",
				data: { "countryId": selectedCountryId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					// create option string
					var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbCity").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbCity").prop("disabled", false);
						$("#cbbDistrict").prop("disabled", false);
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						loadDistrictDataByCityId();
					} else {
						// reset empty combobox and disabled
						$("#cbbCity").empty().append(optionStr).prop("disabled", true);
						$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
						$("#cbbWards").empty().append(optionStr).prop("disabled", true);
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbCity").empty();
			$("#cbbDistrict").empty();
			$("#cbbWards").empty();
			$("#cbbTown").empty();
			// disable combobox
			$("#cbbCity").prop("disabled", true);
			$("#cbbDistrict").prop("disabled", true);
			$("#cbbWards").prop("disabled", true);
			$("#cbbTown").prop("disabled", true);
			$("#cbbGroups").empty().prop("disabled", true);
		}
	}

	function loadDistrictDataByCityId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedCountryId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getDistrictDataByCityId",
				data: { "countryId": selectedCountryId,
						"cityId": selectCityId
				},
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					// create option string
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbDistrict").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbDistrict").prop("disabled", false);
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						loadWardsDataByDistrictId();
					} else {
						$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
						$("#cbbWards").empty().append(optionStr).prop("disabled", true);
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear & disable combobox
			$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
			$("#cbbWards").empty().append(optionStr).prop("disabled", true);
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadWardsDataByDistrictId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedCountryId != STATUS_NO_SELECT && selectCityId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getWardsDataByDistrictId",
				data: { "countryId": selectedCountryId,
						"cityId": selectCityId,
						"districtId" : selectDistrictId
				},
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbWards").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						loadTownDataByWardsId();
					} else {
						$("#cbbWards").empty().append(optionStr).prop("disabled", true);
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbWards").empty().append(optionStr).prop("disabled", true);
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadTownDataByWardsId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWards").find("option:selected").val();
		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedCountryId != STATUS_NO_SELECT && selectCityId != STATUS_NO_SELECT && selectWardsId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getTownDataByWardsId",
				data: { "countryId": selectedCountryId,
						"cityId": selectCityId,
						"districtId" : selectDistrictId,
						"wardsId" : selectWardsId
				},
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbTown").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbTown").prop("disabled", false);
						loadGroupsDataByTownId();
					} else {
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
		}
	}
	
	function loadGroupsDataByTownId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWards").find("option:selected").val();
		// get Town
		var selectTownId = ""
		selectTownId = $("#cbbTown").find("option:selected").val();
		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedCountryId != STATUS_NO_SELECT && selectCityId != STATUS_NO_SELECT && selectWardsId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getGroupsDataByTownId",
				data: { "countryId": selectedCountryId,
						"cityId": selectCityId,
						"districtId" : selectDistrictId,
						"wardsId" : selectWardsId,
						"townId" : selectTownId
				},
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].groupsId + "'>" + returnedJsonData[i].groupsName + "</option>";
						}
					}
					// set options to combobox
					$("#cbbGroups").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbGroups").prop("disabled", false);
						//loadDistrictDataByCityId();
					} else {
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}
	
	// Search button event process
	$("#btnSearch").bind("click", function() {
		
	});
	
	function resetSearchConditions() {
		$("#txtCountryNamePopup").val("");
		$("#txtCityNamePopup").val("");
		$("#txtDistrictNamePopup").val("");
		$("#txtWardsNamePopup").val("");
		$("#txtTownNamePopup").val("");
		$("#txtGroupsIdPopup").val("");
		$("#txtGroupsCodePopup").val("");
		$("#txtGroupsNamePopup").val("");
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtGroupsNamePopup").val() == "" || $("#txtGroupsCodePopup").val() == "") {
			return false;
		} else {
			return true;
		}
	}

	// Get data for combobox country
	function initComboboxData(isPopupMode) {
		// country
		if (countryData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < countryData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + countryData[i].countryId + "' selected = 'selected'>" + countryData[i].countryName + "</option>";
					$('#textCountryName').text(countryData[i].countryName);
				} else {
					optionStr += "<option value='" + countryData[i].countryId + "'>" + countryData[i].countryName + "</option>";	
				}
			}
			$("#cbbCountry > ").empty()
			$("#cbbCountry").append(optionStr);
			loadCityDataCombobox();
		} else {
			$("#cbbCountry > ").empty()
			$("#cbbCountry").prop("disabled", true);
		}
		// Cate
		if (cateData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < cateData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + cateData[i].cateId + "' selected = 'selected'>" + cateData[i].cateName + "</option>";
					$('#textCountryName').text(cateData[i].countryName);
				} else {
					optionStr += "<option value='" + cateData[i].cateId + "'>" + cateData[i].cateName + "</option>";	
				}
			}
			$("#cbbCate > ").empty()
			$("#cbbCate").append(optionStr);
		} else {
			$("#cbbCate > ").empty()
			$("#cbbCate").prop("disabled", true);
		}

		// Status
		if (statusData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < statusData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + statusData[i].statusId + "' selected = 'selected'>" + statusData[i].statusName + "</option>";
				} else {
					optionStr += "<option value='" + statusData[i].statusId + "'>" + statusData[i].statusName + "</option>";	
				}
			}
			$("#cbbStatus > ").empty()
			$("#cbbStatus").append(optionStr);
		} else {
			$("#cbbStatus > ").empty()
			$("#cbbStatus").prop("disabled", true);
		}

		// Education
		if (eduactionData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < eduactionData.length; i++) {
				if (i == 0) {/*slkflsfkls*/
					optionStr += "<option value='" + eduactionData[i].educationId + "' selected = 'selected'>" + eduactionData[i].level + "</option>";
				} else {
					optionStr += "<option value='" + eduactionData[i].educationId + "'>" + eduactionData[i].level + "</option>";	
				}
			}
			$("#cbbEducation > ").empty()
			$("#cbbEducation").append(optionStr);
		} else {
			$("#cbbEducation > ").empty()
			$("#cbbEducation").prop("disabled", true);
		}
		
		// University
		if (universityData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < universityData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + universityData[i].universityId + "' selected = 'selected'>" + universityData[i].universityName + "</option>";
				} else {
					optionStr += "<option value='" + universityData[i].universityId + "'>" + universityData[i].universityName + "</option>";	
				}
			}
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").append(optionStr);
			loadSpecializedDataByUniverisityId();
		} else {
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").prop("disabled", true);
		}
	}

	// Search button event process
	$("#btnSearch").bind("click", function() {
		// farm Id
		var countryId = $("#cbbCountry").find("option:selected").val();
		var cityId = $("#cbbCity").find("option:selected").val();
		var districtId =  $("#cbbDistrict").find("option:selected").val();
		var wardsId =  $("#cbbWards").find("option:selected").val();
		var townId =  $("#cbbTown").find("option:selected").val();
		var cateId =  $("#cbbCate").find("option:selected").val();
		var statusId =  $("#cbbStatus").find("option:selected").val();
		var educationId =  $("#cbbEducation").find("option:selected").val();
		var identityCard =  $("#txtIdentityCard").val();
		var personName =  $("#txtPersonName").val();
		var universityId =  $("#cbbUniversity").find("option:selected").val();
		var specializedId =  $("#cbbSpecialized").find("option:selected").val();
		var groupsId =  $("#cbbGroups").find("option:selected").val();
		$('<form>', {
			"id": "formTranfer",
			"html": '<input type="hidden" id="countryId" name="countryId" value="' + countryId + '"   />' +
					'<input type="hidden" id="cityId" name="cityId" value="' + cityId + '"   />' +
					'<input type="hidden" id="districtId" name="districtId" value="' + districtId + '"   />' +
					'<input type="hidden" id="wardsId" name="wardsId" value="' + wardsId + '"   />' +
					'<input type="hidden" id="cateId" name="cateId" value="' + cateId + '"   />' +
					'<input type="hidden" id="statusId" name="statusId" value="' + statusId + '"   />' +
					'<input type="hidden" id="educationId" name="educationId" value="' + educationId + '"   />' +
					'<input type="hidden" id="identityCard" name="identityCard" value="' + identityCard + '"   />' +
					'<input type="hidden" id="personName" name="personName" value="' + personName + '"   />' +
					'<input type="hidden" id="universityId" name="universityId" value="' + universityId + '"   />' +
					'<input type="hidden" id="specializedId" name="specializedId" value="' + specializedId + '"   />' +
					'<input type="hidden" id="groupsId" name="groupsId" value="' + groupsId + '"   />' +
					'<input type="hidden" id="townId" name="townId" value="' + townId + '"   />'	,
			"method": 'POST',
			"action": 'changePage'
		}).appendTo(document.body).submit();
	});
})