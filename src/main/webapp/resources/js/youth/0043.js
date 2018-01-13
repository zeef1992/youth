$(document).ready(function(){
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load city name combobox
		loadCityDataCombobox(false);
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId(false);
	});

	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId(false);
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId(false);
	});

	// Town name combobox change event process
	$("#cbbTown").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId(false);
	});

	// univeristy name combobox change event process in Popup
	$("#cbbEducation").bind("change", function() {
		// load Town name combobox
		loadUniversityDataByeducationId(false);
	});
	
	// univeristy name combobox change event process
	$("#cbbUniversity").bind("change", function() {
		// load Town name combobox
		loadSpecializedDataByUniverisityId(false);
	});

	initData();
	drawTable0049Report();
	// display current date
	$("#txtCurrentDate").text(" " + getCurrentDate() + " (" + DAY_OF_WEEK + ") " + getCurrentTime());
	$(".row_reportId").click(function(){
		var reportId = $(this).attr("id");
		var reportName = $(this).text();
		$.ajax({
			type: "POST",
			url: "getDetailReport",
			data: {"reportId": reportId},
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData.length > 0) {
					// set title cho Popup
					$(".modal-title").text(reportName);
				} else {
					
				}
			}
		});
	})
	function drawTable0049Report() {
		if (reportData != '') {
			// clear table
			$("#divBodyReport > #tblBodyReport").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			var count = 0;
			$("#txtCounts").text(reportData.length);
			for (var i = 0; i < reportData.length; i++) {
				count++
				// row open tag
				tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
				// reportName
				tableStringArray.push("<td  style = 'width: 10%'>" + count + "</td>");
				// reportName
				tableStringArray.push("<td id = '" + reportData[i].reportId
						+ "' class = 'row_reportId algin-center' name = '" + i
						+ "' data-toggle='modal' data-target='#modal-default'>" + reportData[i].reportName + "</td>");
				// row close tag
				tableStringArray.push("</tr>");
			}
			// add tbody close tag
			tableStringArray.push("</tbody>");
			// append all created string to table
			$("#divBodyReport > #tblBodyReport").append(tableStringArray.join(''));
			// show search result
			$(".cont-box").removeClass("display-none");
			$("#divHeadReport").removeClass("display-none");
			// fix table header and body when scrolling only the table body
			fixTable();
			// scroll to top of table
			$("#divBodyReport").scrollTop(0).scrollLeft(0);
		}
	}

	function initData() {
		// country
		if (countryData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < countryData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + countryData[i].countryId + "' selected = 'selected'>" + countryData[i].countryName + "</option>";
				} else {
					optionStr += "<option value='" + countryData[i].countryId + "'>" + countryData[i].countryName + "</option>";	
				}
			}
			$("#cbbCountry").empty()
			$("#cbbCountry").append(optionStr);
			loadCityDataCombobox(false);
		} else {
			$("#cbbCountry").empty()
			$("#cbbCountry").prop("disabled", true);
		}
		// Cate
		if (cateData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < cateData.length; i++) {
				optionStr += "<option value='" + cateData[i].cateId + "'>" + cateData[i].cateName + "</option>";	
			}
			$("#cbbCate").empty()
			$("#cbbCate").append(optionStr);
		} else {
			$("#cbbCate").empty()
			$("#cbbCate").prop("disabled", true);
		}

		// Status
		if (statusData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < statusData.length; i++) {
				optionStr += "<option value='" + statusData[i].statusId + "'>" + statusData[i].statusName + "</option>";	
			}
			$("#cbbStatus").empty()
			$("#cbbStatus").append(optionStr);
		} else {
			$("#cbbStatus").empty()
			$("#cbbStatus").prop("disabled", true);
		}

		// Education
		if (eduactionData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < eduactionData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + eduactionData[i].educationId + "' selected = 'selected'>" + eduactionData[i].level + "</option>";	
				} else {
					optionStr += "<option value='" + eduactionData[i].educationId + "'>" + eduactionData[i].level + "</option>";	
				}
			}
			$("#cbbEducation > ").empty()
			$("#cbbEducation").append(optionStr);
			loadUniversityDataByeducationId(false);
		} else {
			$("#cbbEducation").empty()
			$("#cbbEducation").prop("disabled", true);
		}
	}

	// Load Area name combobox data
	function loadCityDataCombobox(isPopupMode) {
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
					// enable combobox
					if (returnedJsonData != "") {
						// set options to combobox
						$("#cbbCity").empty().append(optionStr);
						$("#cbbCity").prop("disabled", false);
						loadDistrictDataByCityId(false);
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

	function loadDistrictDataByCityId(isPopupMode) {
		var selectedCountryId = "";
		// get cityId
		var selectCityId = "";
		if (isPopupMode) {
			selectedCountryId = $("#cbbCountryPopup").find("option:selected").val();
			selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
			selectCityId = $("#cbbCity").find("option:selected").val(); 
		}
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
					// enable combobox
					if (returnedJsonData != "") {
							// set options to combobox
							$("#cbbDistrict").empty().append(optionStr);
							$("#cbbDistrict").prop("disabled", false);
							loadWardsDataByDistrictId(false);
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

	function loadWardsDataByDistrictId(isPopupMode) {
		var selectedCountryId = "";
		// get cityId
		var selectCityId = "";
		// get District
		var selectDistrictId = ""
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		selectCityId = $("#cbbCity").find("option:selected").val(); 
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
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbWards").empty().append(optionStr);
						$("#cbbWards").prop("disabled", false);
						loadTownDataByWardsId(false);
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

	function loadTownDataByWardsId(isPopupMode) {
		var selectedCountryId = "";
		// get cityId
		var selectCityId = "";
		// get District
		var selectDistrictId = "";
		// get Wards
		var selectWardsId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
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
					// enable combobox
					if (returnedJsonData != "") {
						// set options to combobox
						$("#cbbTown").empty().append(optionStr);
						$("#cbbTown").prop("disabled", false);
						loadGroupsDataByTownId(false);
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
			$("#cbbTown").empty().append(optionStr).prop("disabled", true)
		}
	}
	
	function loadGroupsDataByTownId(isPopupMode) {
		var selectedCountryId = "";
		// get cityId
		var selectCityId = "";
		// get District
		var selectDistrictId = ""
		// get Wards
		var selectWardsId = ""
		// get Town
		var selectTownId = ""
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		selectWardsId = $("#cbbWards").find("option:selected").val();
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
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbGroups").empty().append(optionStr);
						$("#cbbGroups").prop("disabled", false);
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
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}


	// Load University Data into selected Box
	function loadUniversityDataByeducationId(isPopupMode) {
		var selectedEducationId = "";
		selectedEducationId = $("#cbbEducation").find("option:selected").val(); 

		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedEducationId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getUniversityDataByEducationId",
				data: { "educationId": selectedEducationId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].universityId + "'>" + returnedJsonData[i].universityName + "</option>";
						}
					}
					// enable combobox
					if (returnedJsonData != "") {
						// set options to combobox
						$("#cbbUniversity").empty().append(optionStr);
						$("#cbbUniversity").prop("disabled", false);
						loadSpecializedDataByUniverisityId(false);
					} else {
						// reset empty combobox and disabled
						$("#cbbUniversity").empty().append(optionStr).prop("disabled", true);
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
			$("#cbbUniversity").empty();
			// disable combobox
			$("#cbbUniversity").append(optionStr).prop("disabled", true);
			// clear combobox
			$("#cbbSpecialized").empty();
			// disable combobox
			$("#cbbSpecialized").append(optionStr).prop("disabled", true);
		}
	}

	// Load Specialized name combobox data
	function loadSpecializedDataByUniverisityId(isPopupMode) {
		var selectedUniversityId = "";
		selectedUniversityId = $("#cbbUniversity").find("option:selected").val(); 

		// create option string
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedUniversityId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getSpecializedDataByUniversityId",
				data: { "universityId": selectedUniversityId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							optionStr += "<option value='" + returnedJsonData[i].specializedId + "'>" + returnedJsonData[i].specializedName + "</option>";
						}
					}
					// enable combobox
					if (returnedJsonData != "") {
						// set options to combobox
						$("#cbbSpecialized").empty().append(optionStr);
						$("#cbbSpecialized").prop("disabled", false);
					} else {
						// reset empty combobox and disabled
						$("#cbbSpecialized").empty();
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
			$("#cbbSpecialized").append(optionStr).prop("disabled", true);
		}
	}

});