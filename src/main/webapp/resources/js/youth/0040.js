/**
 * author Nghia Nguyen
 */

$(document).ready(function(){
	//--------------- Constants definition ---------------
	// number of items in one page in table
	var ITEM_IN_ONE_PAGE = 10;
	//--------------- Variables definition ---------------
	// application path
	var rootPath = getContextPath();
	// search result total data count
	var totalResultCount = 0;
	// variables for handling pager
	var currentPage = 1;
	var maxPage = 0;
	var from = 0;
	// variable to store selected row index
	var selectedRowIndex = "";
	// variable to store selected cate id to show in popup
	var catesIdPopup = "";
	// variable to store current selected mode
	var currentMode = "";
	var countStt = 0;
	var isPopupMode = false;
	initComboboxData(false);
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load city name combobox
		loadCityDataCombobox(false);
	});

	// Country name combobox change event process in popup
	$("#cbbCountryPopup").bind("change", function() {
		// load city name combobox
		loadCityDataCombobox(true);
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId(false);
	});

	// Country name combobox change event process
	$("#cbbCityPopup").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId(true);
	});
	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId(false);
	});
	// District name combobox change event process
	$("#cbbDistrictPopup").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId(true);
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId(false);
	});

	// Wards name combobox change event process in Popup
	$("#cbbWardsPopup").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId(true);
	});

	// Town name combobox change event process
	$("#cbbTown").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId(false);
	});
	// Town name combobox change event process in Popup
	$("#cbbTownPopup").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId(true);
	});

	// univeristy name combobox change event process in Popup
	$("#cbbEducation").bind("change", function() {
		// load Town name combobox
		loadUniversityDataByeducationId(false);
	});

	// univeristy name combobox change event process in Popup
	$("#cbbEducationPopup").bind("change", function() {
		// load Town name combobox
		loadUniversityDataByeducationId(true);
	});
	
	// univeristy name combobox change event process
	$("#cbbUniversity").bind("change", function() {
		// load Town name combobox
		loadSpecializedDataByUniverisityId(false);
	});
	// univeristy name combobox change event process in Popup
	$("#cbbUniversityPopup").bind("change", function() {
		// load Town name combobox
		loadSpecializedDataByUniverisityId(true);
	});

	// Load University Data into selected Box
	function loadUniversityDataByeducationId(isPopupMode) {
		var selectedEducationId = "";
		if (isPopupMode) {
			selectedEducationId = $("#cbbEducationPopup").find("option:selected").val(); 
		} else {
			selectedEducationId = $("#cbbEducation").find("option:selected").val(); 
		}

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
						if (isPopupMode) {
							// set options to combobox
							$("#cbbUniversityPopup").empty().append(optionStr);
							$("#cbbUniversityPopup").prop("disabled", false);
							loadSpecializedDataByUniverisityId(true);
						} else {
							// set options to combobox
							$("#cbbUniversity").empty().append(optionStr);
							$("#cbbUniversity").prop("disabled", false);
							loadSpecializedDataByUniverisityId(false);
						}
					} else {
						// reset empty combobox and disabled
						if (isPopupMode) {
							$("#cbbUniversityPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbSpecializedPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbUniversity").empty().append(optionStr).prop("disabled", true);
							$("#cbbSpecialized").empty().append(optionStr).prop("disabled", true);
						}
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			if (isPopupMode) {
				// clear combobox
				$("#cbbUniversityPopup").empty();
				// disable combobox
				$("#cbbUniversityPopup").append(optionStr).prop("disabled", true);
				// clear combobox
				$("#cbbSpecializedPopup").empty();
				// disable combobox
				$("#cbbSpecializedPopup").append(optionStr).prop("disabled", true);
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
	}
	// Load Specialized name combobox data
	function loadSpecializedDataByUniverisityId(isPopupMode) {
		var selectedUniversityId = "";
		if (isPopupMode) {
			selectedUniversityId = $("#cbbUniversityPopup").find("option:selected").val(); 
		} else {
			selectedUniversityId = $("#cbbUniversity").find("option:selected").val(); 
		}

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
						if (isPopupMode) {
							// set options to combobox
							$("#cbbSpecializedPopup").empty().append(optionStr);
							$("#cbbSpecializedPopup").prop("disabled", false);
						} else {
							// set options to combobox
							$("#cbbSpecialized").empty().append(optionStr);
							$("#cbbSpecialized").prop("disabled", false);
						}
					} else {
						// reset empty combobox and disabled
						if (isPopupMode) {
							$("#cbbSpecializedPopup").empty();
							$("#cbbSpecializedPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbSpecialized").empty();
							$("#cbbSpecialized").empty().append(optionStr).prop("disabled", true);
						}
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			if (isPopupMode) {
				// clear combobox
				$("#cbbSpecializedPopup").empty();
				// disable combobox
				$("#cbbSpecializedPopup").append(optionStr).prop("disabled", true);
			} else {
				// clear combobox
				$("#cbbSpecialized").empty();
				// disable combobox
				$("#cbbSpecialized").append(optionStr).prop("disabled", true);
			}
		}
	}

	// Load Area name combobox data
	function loadCityDataCombobox(isPopupMode) {
		var selectedCountryId = "";
		if (isPopupMode) {
			selectedCountryId = $("#cbbCountryPopup").find("option:selected").val();
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		}
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
						if (isPopupMode) {
							// set options to combobox
							$("#cbbCityPopup").empty().append(optionStr);
							$("#cbbCityPopup").prop("disabled", false);
							loadDistrictDataByCityId(true);
						} else {
							// set options to combobox
							$("#cbbCity").empty().append(optionStr);
							$("#cbbCity").prop("disabled", false);
							loadDistrictDataByCityId(false);
						}
					} else {
						if (isPopupMode) {
							// reset empty combobox and disabled
							$("#cbbCityPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbDistrictPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							// reset empty combobox and disabled
							$("#cbbCity").empty().append(optionStr).prop("disabled", true);
							$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
							$("#cbbWards").empty().append(optionStr).prop("disabled", true);
							$("#cbbTown").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
						}
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
						if (isPopupMode) {
							// set options to combobox
							$("#cbbDistrictPopup").empty().append(optionStr);
							$("#cbbDistrictPopup").prop("disabled", false);
							loadWardsDataByDistrictId(true);
						} else {
							// set options to combobox
							$("#cbbDistrict").empty().append(optionStr);
							$("#cbbDistrict").prop("disabled", false);
							loadWardsDataByDistrictId(false);
						}
					} else {
						if (isPopupMode) {
							$("#cbbDistrictPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
							$("#cbbWards").empty().append(optionStr).prop("disabled", true);
							$("#cbbTown").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
						}
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
		if (isPopupMode) {
			selectedCountryId = $("#cbbCountryPopup").find("option:selected").val();
			selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
			selectCityId = $("#cbbCity").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		}
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
						if (isPopupMode) {
							$("#cbbWardsPopup").prop("disabled", false);
							// set options to combobox
							$("#cbbWardsPopup").empty().append(optionStr);
							loadTownDataByWardsId(true);
						} else {
							// set options to combobox
							$("#cbbWards").empty().append(optionStr);
							$("#cbbWards").prop("disabled", false);
							loadTownDataByWardsId(false);
						}
					} else {
						if (isPopupMode) {
							$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbWards").empty().append(optionStr).prop("disabled", true);
							$("#cbbTown").empty().append(optionStr).prop("disabled", true);
							$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
						}
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			if (isPopupMode) {
				$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
				$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
				$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
			} else {
				$("#cbbWards").empty().append(optionStr).prop("disabled", true);
				$("#cbbTown").empty().append(optionStr).prop("disabled", true);
				$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
			}
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
		if (isPopupMode) {
			selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
			selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
			selectWardsId = $("#cbbWardsPopup").find("option:selected").val();
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
			selectCityId = $("#cbbCity").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrict").find("option:selected").val();
			selectWardsId = $("#cbbWards").find("option:selected").val();
		}
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
						if(isPopupMode) {
							// set options to combobox
							$("#cbbTownPopup").empty().append(optionStr);
							$("#cbbTownPopup").prop("disabled", false);
							loadGroupsDataByTownId(true);
						} else {
							// set options to combobox
							$("#cbbTown").empty().append(optionStr);
							$("#cbbTown").prop("disabled", false);
							loadGroupsDataByTownId(false);
						}
					} else {
						if(isPopupMode) {
							$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbTown").empty().append(optionStr).prop("disabled", true);
						}
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			if(isPopupMode) {
				// clear combobox disable combobox
				$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
			} else {
				// clear combobox disable combobox
				$("#cbbTown").empty().append(optionStr).prop("disabled", true);
			}
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
		if (isPopupMode) {
			selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
			selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
			selectWardsId = $("#cbbWardsPopup").find("option:selected").val();
			selectTownId = $("#cbbTownPopup").find("option:selected").val();
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
			selectCityId = $("#cbbCity").find("option:selected").val(); 
			selectDistrictId = $("#cbbDistrict").find("option:selected").val();
			selectWardsId = $("#cbbWards").find("option:selected").val();
			selectTownId = $("#cbbTown").find("option:selected").val();
		}
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
						if (isPopupMode) {
							// set options to combobox
							$("#cbbGroupsPopup").empty().append(optionStr);
							$("#cbbGroupsPopup").prop("disabled", false);
						} else {
							// set options to combobox
							$("#cbbGroups").empty().append(optionStr);
							$("#cbbGroups").prop("disabled", false);
						}
					} else {
						if (isPopupMode) {
							$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
						} else {
							$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
						}
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			if (isPopupMode) {
				$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
			} else {
				$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
			}
		}
	}
	
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
	// Country name combobox change event process
	$("#cbbReport").bind("change", function() {
		// load Area name combobox
		loadDetailReportDataCombobox();
	});

	function getLastSTT() {
		$.ajax({
			type: "POST",
			url: "getLastSTTPerson",
			async: false,
			success: function(returnedJsonData) {
				var STT = returnedJsonData.split("-");
				$("#txtKskQuanStt").val(STT[0]);
				$("#txtLltnStt").val(STT[1]);
			}, error: function(e) {
				// display error message
				alert(ERROR_MESSAGE);
			}
		})
	}
	// Register cate click event process
	$("#btnRegister").bind("click", function() {
		$(".alert").addClass("display-none");
		getLastSTT();
		/*$("#addNewPerson").load()*/
		clearPopupControl(); 
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
	});
	// Clear all current text of popup controls
	function clearPopupControl() {
		// person id
		$("#txtPersonIdPopup").val("");
		// person name
		$("#txtPersonNamePopup").val("");
		// Birth Day
		$("#datepicker").val("");
		// Indentity Card
		$("#txtIndentityCardPopup").val("");
		// phone
		$("#txtPhonePopup").val("");
		// nation
		$("#txtNationPopup").val("");
		// religion
		$("#txtReligionPopup").val("");
		// Permanent Address
		$("#txtPermanentAddressPopup").val("");
		// Temporary Residence Address
		$("#txtTemporaryResidenceAddressPopup").val("");
		// Temporary Residence Address
		$("#txtTemporaryResidenceAddressPopup").val("");
		// place of birth
		$("#cbbPlaceOfBirth").val("");
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			initComboboxData(true);
			// person name
			$("#txtPersonNamePopup").prop("disabled", false);
			// Birth Day
			$("#datepicker").prop("disabled", false);
			// place of birth
			$("#cbbPlaceOfBirth").prop("disabled", false);
			// Indentity Card
			$("#txtIndentityCardPopup").prop("disabled", false);
			// phone
			$("#txtPhonePopup").prop("disabled", false);
			// nation
			$("#txtNationPopup").prop("disabled", false);
			// religion
			$("#txtReligionPopup").prop("disabled", false);
			// Permanent Address
			$("#txtPermanentAddressPopup").prop("disabled", false);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", false);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", false);
			// Education
			$("#cbbEducationPopup").prop("disabled", false);/*
			// University
			$("#cbbUniversityPopup").prop("disabled", false);
			// Specialized
			$("#cbbSpecializedPopup").prop("disabled", false);*/
			// country
			$("#cbbCountryPopup").prop("disabled", false);
			// city
			$("#cbbCityPopup").prop("disabled", false);
			// district
			$("#cbbDistrictPopup").prop("disabled", false);
			// wards
			$("#cbbWardsPopup").prop("disabled", false);
			// town
			$("#cbbTownPopup").prop("disabled", false);
			// groups
			$("#cbbGroupsPopup").prop("disabled", false);
			// Education
			$("#cbbStatusPopup").prop("disabled", false);
			// University
			$("#cbbCatePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
			// person name
			$("#txtPersonNamePopup").prop("disabled", true);
			// Birth Day
			$("#datepicker").prop("disabled", false);
			// place of birth
			$("#cbbPlaceOfBirth").prop("disabled", false);
			// Identity Card
			$("#txtIndentityCardPopup").prop("disabled", false);
			// phone
			$("#txtPhonePopup").prop("disabled", false);
			// nation
			$("#txtNationPopup").prop("disabled", false);
			// religion
			$("#txtReligionPopup").prop("disabled", false);
			// Permanent Address
			$("#txtPermanentAddressPopup").prop("disabled", false);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", false);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", false);
			// Education
			$("#cbbEducationPopup").prop("disabled", false);/*
			// University
			$("#cbbUniversityPopup").prop("disabled", false);
			// Specialized
			$("#cbbSpecializedPopup").prop("disabled", false);*/
			// country
			$("#cbbCountryPopup").prop("disabled", false);
			// city
			$("#cbbCityPopup").prop("disabled", false);
			// district
			$("#cbbDistrictPopup").prop("disabled", false);
			// wards
			$("#cbbWardsPopup").prop("disabled", false);
			// town
			$("#cbbTownPopup").prop("disabled", false);
			// groups
			$("#cbbGroupsPopup").prop("disabled", false);
			// Education
			$("#cbbStatusPopup").prop("disabled", false);
			// University
			$("#cbbCatePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			// set current mode
			currentMode = MODE_VIEW;
			// person name
			$("#txtPersonNamePopup").prop("disabled", true);
			// Birth Day
			$("#datepicker").prop("disabled", true);
			// place of birth
			$("#cbbPlaceOfBirth").prop("disabled", true);
			// Indentity Card
			$("#txtIndentityCardPopup").prop("disabled", true);
			// phone
			$("#txtPhonePopup").prop("disabled", true);
			// nation
			$("#txtNationPopup").prop("disabled", true);
			// religion
			$("#txtReligionPopup").prop("disabled", true);
			// Permanent Address
			$("#txtPermanentAddressPopup").prop("disabled", true);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", true);
			// Temporary Residence Address
			$("#txtTemporaryResidenceAddressPopup").prop("disabled", true);
			// Education
			$("#cbbEducationPopup").prop("disabled", true);/*
			// University
			$("#cbbUniversityPopup").prop("disabled", true);
			// Specialized
			$("#cbbSpecializedPopup").prop("disabled", true);*/
			// country
			$("#cbbCountryPopup").prop("disabled", true);
			// city
			$("#cbbCityPopup").prop("disabled", true);
			// district
			$("#cbbDistrictPopup").prop("disabled", true);
			// wards
			$("#cbbWardsPopup").prop("disabled", true);
			// town
			$("#cbbTownPopup").prop("disabled", true);
			// groups
			$("#cbbGroupsPopup").prop("disabled", true);
			// Education
			$("#cbbStatusPopup").prop("disabled", true);
			// University
			$("#cbbCatePopup").prop("disabled", true);
			// register button
			$("#btnRegisterPopup").hide();
		} 
	}
	// display current date
	$("#txtCurrentDate").text(" " + getCurrentDate() + " (" + DAY_OF_WEEK + ") " + getCurrentTime());
	// Page First button click event process
	$("#btnFirst").bind("click", function() {
		if (parseInt(totalResultCount) > 0) {
			if (currentPage > 1) {
				var newPage = 1;
				goToPage(newPage);
			}
		}
	});

	// Page Previous button click event process
	$("#btnPrevious").bind("click", function() {
		if (parseInt(totalResultCount) > 0) {
			if (currentPage > 1) {
				var newPage = currentPage - 1;
				goToPage(newPage);
			}
		}
	});

	// Page Next button click event process
	$("#btnNext").bind("click", function() {
		if (parseInt(totalResultCount) > 0) {
			if (currentPage < maxPage) {
				var newPage = currentPage + 1;
				goToPage(newPage);
			}
		}
	});

	// Page Last button click event process
	$("#btnLast").bind("click", function() {
		if (parseInt(totalResultCount) > 0) {
			if (currentPage < maxPage) {
				var newPage = maxPage;
				goToPage(newPage);
			}
		}
	});
	// Search button event process
	$("#btnSearch").bind("click", function() {
		countStt = 0;
		$(".alert").addClass("display-none");
		setTimeout(function() {
			// reset variables
			resetVariables();
			// draw table
			drawResult = drawTable();
			if (drawResult != "") {
				// update total data count UI
				setDataCounts();
			}
		}, 10);
	});

	// Update total data count process
	function setDataCounts() {
		$("#txtCounts").text(totalResultCount.toString().replace(/^(-?\d+)(\d{3})/, "$1,$2"));
	}

	// Reset variables process
	function resetVariables() {
		totalResultCount = 0;
		currentPage = 1;
		from = 0;
	}
	
	// Check Page input
	$("#txtGoToPage").bind("keyup", function() {
		var value = parseInt($(this).val());
		if (value > 0) {
			$("#btnGoToPage").prop("disabled", false);
			$("#btnGoToPage").css("cursor", "pointer");
		}
		if (isNaN(value) || $(this).val() == "" || (currentPage == maxPage && (maxPage == 1 || maxPage == 0))) {
			$("#btnGoToPage").prop("disabled", true);
			$("#btnGoToPage").css("cursor", "default");
		}
	});
	$("#txtGoToPage").bind("keydown", function(event) {
		// Allow: backspace, delete, tab, escape, enter
		if ($.inArray(event.keyCode, [ 46, 8, 9, 27, 13 ]) !== -1
				||
				// Allow: Ctrl+A, Command+A
				(event.keyCode == 65 && (event.ctrlKey === true || event.metaKey === true))
				||
				// Allow: home, end, left,
				// right, down, up
				(event.keyCode >= 35 && event.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop
		// the keypress
		if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57))
				&& (event.keyCode < 96 || event.keyCode > 105)) {
			event.preventDefault();
		}
	});

	// Page Go button click event process
	$("#btnGoToPage").bind("click", function() {
		var newPage = parseInt($("#txtGoToPage").val());
		if (newPage >= 1 && newPage <= maxPage && maxPage > 0) {
			currentPage = newPage;
			goToPage(currentPage);
		} else if (newPage >= 1 && newPage > maxPage && maxPage > 0) {
			newPage = maxPage;
			goToPage(newPage);
		} else if (newPage == 0 && maxPage > 0) {
			newPage = 1;
			goToPage(newPage);
		}
	});
	
	// Get data of search result based on page number
	function goToPage(newPage) {
		setTimeout(function() {
			// newPage is 0-index based
			newPage = parseInt(newPage) - 1;
			from = parseInt(ITEM_IN_ONE_PAGE) * newPage;
			// draw new data
			var drawResult = drawTable();
			if (drawResult != "") {
				currentPage = newPage + 1;
				// update pager
				$("#lblCurrentPage").text(currentPage);
				$("#lblMaxPage").text(maxPage);
				setPagerStatus();
			}
			// update total data count UI
			setDataCounts();
		}, 10);
	}

	// Update UI of pager based on search result
	function setPagerStatus() {
		$("#txtGoToPage").val("");
		if (parseInt(totalResultCount) > 0) {
			if (parseInt(maxPage) == 1) {
				$("#btnFirst").addClass("disabled");
				$("#btnPrevious").addClass("disabled");
				$("#btnNext").addClass("disabled");
				$("#btnLast").addClass("disabled");
			} else {
				if (currentPage == 1) {
					$("#btnFirst").addClass("disabled");
					$("#btnPrevious").addClass("disabled");
					$("#btnNext").removeClass("disabled");
					$("#btnLast").removeClass("disabled");
				}
				if (currentPage > 1 && currentPage < maxPage) {
					$("#btnFirst").removeClass("disabled");
					$("#btnPrevious").removeClass("disabled");
					$("#btnNext").removeClass("disabled");
					$("#btnLast").removeClass("disabled");
				}
				if (currentPage == maxPage) {
					$("#btnFirst").removeClass("disabled");
					$("#btnPrevious").removeClass("disabled");
					$("#btnNext").addClass("disabled");
					$("#btnLast").addClass("disabled");
				}
			}
		} else {
			$("#btnFirst").addClass("disabled");
			$("#btnPrevious").addClass("disabled");
			$("#btnNext").addClass("disabled");
			$("#btnLast").addClass("disabled");
			$("#txtGoToPage").prop("readonly", true);
		}
	}

	// Register button in popup click event process
	$("#btnRegisterPopup").bind("click", function() {
		countStt = 0;
		var dataObject = null;
		// check current mode
		if (currentMode == MODE_NEW) {
			// check for cate Name input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
			}  else {
				// insert new cate to DB
				// get cate input data
				dataObject = createCriteriaDataObject();
				// make Ajax call to server to get data
				$.ajax({
					type: "POST",
					url: "insertData",
					contentType: "application/json",
					data: JSON.stringify(dataObject),
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							// check returned value from server
							if (returnedJsonData == VALIDATE_BLANK_FIELDS) {
								// blank field(s)
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
							} else if (returnedJsonData == VALIDATE_WRONG_FORMAT) {
								// id is in wrong format
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_SUCCESSFUL) {
								// search data again
								// reset variables
								resetVariables();
								// reset search conditions
								resetSearchConditions();
								// draw table
								drawResult = drawTable();
								if (drawResult != "") {
									// update total data count UI
									setDataCounts();
								}
								// display message
								$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + INSERT_RESULT_SUCCESSFUL_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
								// duplicated cate id
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_DUPLICATED_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE);
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
					}
				});
			}
		} else if (currentMode == MODE_EDIT) {
			// check for cate input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
			} else {
				// update existing cate in DB
				// get cate input data
				dataObject = createCriteriaDataObject();
				// make Ajax call to server to get data
				$.ajax({
					type: "POST",
					url: "updateData",
					contentType: "application/json",
					data: JSON.stringify(dataObject),
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							// check returned value from server
							if (returnedJsonData == VALIDATE_BLANK_FIELDS) {
								// blank field(s)
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
							} else if (returnedJsonData == UPDATE_RESULT_SUCCESSFUL) {
								// update the corresponding cate data in search table
								// make Ajax call to server to get data
								$.ajax({
									url: "getSingleData",
									data: { "criteriaId": $("#txtCriteriaIdPopup").val() },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// cates name
											$("#row" + selectedRowIndex).find("td").eq(2).text(returnedJsonData.criteraName);
											// Update by
											$("#row" + selectedRowIndex).find("td").eq(6).text(returnedJsonData.updateUserId);
										}
									},
									complete: function(jqXHR, textStatus) {
										// display message
										$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + UPDATE_RESULT_SUCCESSFUL_MESSAGE);
									}
								});
							} else if (returnedJsonData == UPDATE_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + UPDATE_RESULT_FAILED_MESSAGE);
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
					}
				});
			}
		}
	});

	// Search conditions object creation process
	function createSearchConditions() {
		return {
			countryId : $("#cbbCountry").find("option:selected").val(),
			cityId : $("#cbbCity").find("option:selected").val(),
			districtId :  $("#cbbDistrict").find("option:selected").val(),
			wardsId :  $("#cbbWards").find("option:selected").val(),
			townId :  $("#cbbTown").find("option:selected").val(),
			cateId :  $("#cbbCate").find("option:selected").val(),
			statusId :  $("#cbbStatus").find("option:selected").val(),
			educationId :  $("#cbbEducation").find("option:selected").val(),
			identityCard :  $("#txtIdentityCard").val(),
			personName :  $("#txtPersonName").val(),
			universityId :  $("#cbbUniversity").find("option:selected").val(),
			specializedId :  $("#cbbSpecialized").find("option:selected").val(),
			groupsId :  $("#cbbGroups").find("option:selected").val(),
			fromRow: from,
			itemCount: ITEM_IN_ONE_PAGE
		};
	}
	// Draw cate data table based on search conditions
	function drawTable() {
		$(".alert").addClass("display-none");
		// variables definition
		var returnValue = "";
		var dataObject = null;
		// get search conditions
		dataObject = createSearchConditions();
		// make Ajax call to server to get data
		$.ajax({
			type: "POST",
			url: "searchData",
			contentType: "application/json",
			data: JSON.stringify(dataObject),
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					$("#btnExport").removeClass("disabled");
					// set the real search total count
					totalResultCount = returnedJsonData[0].searchDataTotalCounts;
					if (parseInt(totalResultCount) == -1) {
						// OutOfMemoryException, display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + SEARCH_RESULT_OUT_OF_MEMORY_MESSAGE);
					} else {
						// calculate max page
						var calculatedResultOdd = parseInt(totalResultCount) % parseInt(ITEM_IN_ONE_PAGE);
						var calculatedResult = Math.floor(parseInt(totalResultCount) / parseInt(ITEM_IN_ONE_PAGE));
						maxPage = (calculatedResultOdd == 0) ? calculatedResult : (calculatedResult + 1);
						// update pager
						$("#lblCurrentPage").text(currentPage);
						$("#lblMaxPage").text(maxPage);
						// clear table
						$("#example2").find("tbody").remove();
						// create table starts
						var tableStringArray = [];
						// add tbody open tag
						tableStringArray.push("<tbody>");
						for (var i = 0; i < returnedJsonData.length; i++) {
							countStt++;
							// row open tag
							tableStringArray.push("<tr id='row" + i + "'>");
							// STT
							tableStringArray.push("<td class='align-center'>" + countStt  + "</td>");
							// Button
							tableStringArray.push('<td  style="padding-right: 25px;padding-left: 25px;"><div class="btn-group">'+
								'<button type="button" class="btn bg-info">Action</button>'+
								'<button type="button"'+
									'class="btn bg-info dropdown-toggle"'+
									'data-toggle="dropdown">'+
									'<span class="caret"></span> <span class="sr-only">Toggle'+
										'Dropdown</span>'+
								'</button>'+
								'<ul class="dropdown-menu" role="menu">'+
									'<li><a class = "edit" data-toggle="modal"'+
										'data-target="#modal-default" name="' + i + '" id="'+ returnedJsonData[i].personId +'">Edit</a></li>'+
									'<li><a class = "view"  data-toggle="modal" id="'+ returnedJsonData[i].personId +'"' +
									'data-target="#modal-default" name="' + i + '">View</a></li>'+
									'<li><a class = "delete" id="'+ returnedJsonData[i].personId +'" name="' + i + '">Delete</a></li>'+
									'<li><a class = " btnProcessOfYourSelt" data-toggle="modal" data-target="#modal-info" id="'+ returnedJsonData[i].personId +'" name="' + i + '">Process</a></li>' +
									'<li><a class = "relation btnNumberOfRelation" data-toggle="modal" data-target="#modal-success" id="'+ returnedJsonData[i].personId +'" name="' + i + '">Relation</a></li>' +
									'<li><a class = "relation btnEditReport" data-toggle="modal" data-target="#modal-warning" id="'+ returnedJsonData[i].personId +'" name="' + i + '">Note Report</a></li>' +
									'<li><a class = "relation btnExportDoc" id="'+ returnedJsonData[i].personId +'" name="' + i + '">Sơ yếu lí Lịch</a></li>' +
								'</ul>');
							
							/*// EDIT
							tableStringArray.push("<td class='align-center'><span data-toggle='modal' data-target='#modal-default' id='"+ returnedJsonData[i].personId +"' style='color: #1cec1c;' class='glyphicon glyphicon-edit edit cursor-pointer'></span></td>");
							// View
							tableStringArray.push("<td class='align-center'><span data-toggle='modal' data-target='#modal-default' id='"+ returnedJsonData[i].personId +"' class='glyphicon glyphicon-list-alt view cursor-pointer'></span></td>");
							// Delete
							tableStringArray.push("<td class='align-center'><span id='"+ returnedJsonData[i].personId +"' style='color: red;' class='glyphicon glyphicon-remove delete btnDelete cursor-pointer'></span></td>");
							// Process
							tableStringArray.push("<td class='align-center'><span data-toggle='modal' data-target='#modal-info' id='"+ returnedJsonData[i].personId +"' style='color: #337ab7;' class='glyphicon glyphicon-user relation btnProcessOfYourSelt cursor-pointer'></span></td>");
							// RelationShip
							tableStringArray.push("<td class='align-center'><span data-toggle='modal' data-target='#modal-success' id='"+ returnedJsonData[i].personId +"' style='color: #d9edf7;' class='glyphicon glyphicon-home relation btnNumberOfRelation cursor-pointer'></span></td>");
							//modal-warning
							tableStringArray.push("<td class='align-center'><span data-toggle='modal' data-target='#modal-warning' id='"+ returnedJsonData[i].personId +"' style='color: #00c0ef;' class='relation btnEditReport cursor-pointer'><i class='fa fa-fw fa-file-excel-o'></i></span></td>");
							*/// lltn STT
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].lltnStt + "</td>");
							// kskquan Stt
							tableStringArray.push("<td class='align-center' style = 'width: 100px;'>" + returnedJsonData[i].kskquanStt + "</td>");
							// personId
							tableStringArray.push("<td class='align-center' style = 'width: 100px;'>" + returnedJsonData[i].personId + "</td>");
							// person Name
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].personName + "</td>");
							// Birth Day
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].dateOfBirth + "/" + returnedJsonData[i].monthOfBirth +  "/" + returnedJsonData[i].yearOfBirth +"</td>");
							// Place of birth
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].cityName + "</td>");
							// identity Card
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].identityCard + "</td>");
							// country Name
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].countryName + "</td>");
							// nation
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].nation + "</td>");
							// religion
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].religion + "</td>");
							// permanent Address
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].permanentAddress + "</td>");
							// temporary Residence Address
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].temporaryResidenceAddress + "</td>");
							// national
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].countryName + "</td>");
							// element
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].element + "</td>");
							// graduation Year
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].graduationYear + "</td>");
							// job Id
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].jobId + "</td>");
							// work Place
							tableStringArray.push("<td class='align-center' style = 'width: 200px;'>" + returnedJsonData[i].workPlace + "</td>");
							// create By
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].createUserId + "</td>");
							// update by
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].updateUserId + "</td>");
							// row close tag
							tableStringArray.push("</tr>");
						}
						// add tbody close tag
						tableStringArray.push("</tbody>");
						// append all created string to table
						$("#example2").append(tableStringArray.join(''));
						$(".pager").removeClass("display-none");
						// update total data count UI
						setDataCounts();
					    setPagerStatus();
					}
				} else {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + SEARCH_RESULT_NO_DATA_MESSAGE);
					// update pager
					$("#lblCurrentPage").text("0");
					$("#lblMaxPage").text("0");
					$("#divHead").addClass("display-none");

					$(".pager").addClass("display-none");
					// clear table
					$("#example2").find("tbody").remove();
					totalResultCount = 0;
					// update total data count UI
					setDataCounts();
					setPagerStatus();
				}
				returnValue = totalResultCount;
			},
			error: function(e) {
				// set return value
				returnValue = "";
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
		return returnValue;
	}
	
	// cate data object creation process, to use in Updating and Inserting cate
	function createCriteriaDataObject() {
		var birthDay = $("#datepicker").val();
		var date = birthDay.substring(0,2);
		var month = birthDay.substring(3,5);
		var year = birthDay.substring(6,10);
		return {
			personId: $("#txtPersonIdPopup").val(),
			cateId: $("#cbbCatePopup").val(),
			statusId: $("#cbbStatusPopup").val(),
			personName: $("#txtPersonNamePopup").val(),
			dateOfBirth: date,
			monthOfBirth: month,
			yearOfBirth: year,
			phone: $("#txtPhonePopup").val(),
			kskquanStt: $("#txtKskQuanStt").val(),
			lltnStt: $("#txtLltnStt").val(),
			identityCard: $("#txtIndentityCardPopup").val(),
			placeOfBirth: $("#cbbPlaceOfBirth").val(),
			nativeCountry: $("#cbbCountryPopup").val(),
			nation: $("#txtNationPopup").val(),
			religion: $("#txtReligionPopup").val(),
			permanentAddress: $("#txtPermanentAddressPopup").val(),
			temporaryResidenceAddress: $("#txtTemporaryResidenceAddressPopup").val(),
			national: $("#cbbCountryPopup").val(),
			cityId: $("#cbbCityPopup").val(),
			districtId: $("#cbbDistrictPopup").val(),
			wardsId: $("#cbbWardsPopup").val(),
			townId: $("#cbbTownPopup").val(),
			groupsId: $("#cbbGroupsPopup").val(),
			element: "1",
			universityId: $("#cbbUniversityPopup").val(),
			educationalId: $("#cbbEducationPopup").val(),
			graduationYear: "1",
			specializedId: $("#cbbSpecializedPopup").val(),
			jobId: "1",
			workPlace: "1"
	};
	}

	// Delete cate click event process
	$(document).on("click", ".delete", function() {
		countStt = 0;
		// get id of selected cate
		personIdPopup = $(this).attr("id");
		// display confirmation message
		jQuestion_warning(DELETE_CONFIRM_MESSAGE, DIALOG_TITLE, DIALOG_YES_BUTTON, DIALOG_NO_BUTTON, function(val) {
			if (val) {
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "personId": personIdPopup },
				type: "POST",
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					if (returnedJsonData != "") {
						// check returned value from server
						if (returnedJsonData == DELETE_RESULT_SUCCESSFUL) {
							// search data again
							// reset variables
							resetVariables();
							// reset search conditions
							resetSearchConditions();
							// draw table
							drawResult = drawTable();
							if (drawResult != "") {
								// update total data count UI
								setDataCounts();
							}
							// display message
							$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + DELETE_RESULT_SUCCESSFUL_MESSAGE);
						} else if (returnedJsonData == DELETE_RESULT_FAILED) {
							// failed
							// display message
							$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + DELETE_RESULT_FAILED_MESSAGE);
						}
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		}
		});
	});

	$(document).on("click", ".edit", function() {
		// get id of selected cate
		peronIdPopup = $(this).attr("id");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "PersonId": peronIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					clearPopupControl();
					// change state of controls in popup based on mode
					initComboboxData(true);
					for (var i = 0; i < returnedJsonData.length; i++) {

						$("#txtKskQuanStt").val(returnedJsonData[i].kskquanStt);
						$("#txtLltnStt").val(returnedJsonData[i].lltnStt);
						// Person ID
						$("#txtPersonIdPopup").val(returnedJsonData[i].personId);
						// Person Name
						$("#txtPersonNamePopup").val(returnedJsonData[i].personName);
						// Birth Day
						$("#datepicker").val(returnedJsonData[i].dateOfBirth + "/" + returnedJsonData[i].monthOfBirth + "/" + returnedJsonData[i].yearOfBirth);

						// place of birth
						$("#cbbPlaceOfBirth").val(returnedJsonData[i].placeOfBirth);
						// IndentityCard
						$("#txtIndentityCardPopup").val(returnedJsonData[i].identityCard);
						// phone
						$("#txtPhonePopup").val(returnedJsonData[i].phone);
						// nation
						$("#txtNationPopup").val(returnedJsonData[i].nation);
						// religion
						$("#txtReligionPopup").val(returnedJsonData[i].religion);
						// permanent Address
						$("#txtPermanentAddressPopup").val(returnedJsonData[i].permanentAddress);
						// temporary Residence Address
						$("#txtPermanentAddressPopup").val(returnedJsonData[i].temporaryResidenceAddress);
						// temporary Residence Address
						$("#txtTemporaryResidenceAddressPopup").val(returnedJsonData[i].temporaryResidenceAddress);
						$("#cbbCityPopup").prop("disabled", false);
						$("#cbbDistrictPopup").prop("disabled", false);
						$("#cbbWardsPopup").prop("disabled", false);
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbGroupsPopup").prop("disabled", false);

						// city
						loadCityDataComboboxEdit(returnedJsonData[0].cityId);
						// district 
						loadDistrictDataByCityIdEdit(returnedJsonData[0].districtId);
						// wards
						loadWardsDataByDistrictIdEdit(returnedJsonData[0].wardsId);
						// town 
						loadTownDataByWardsIdEdit(returnedJsonData[0].townId);
						// groupsId
						loadGroupsDataByTownIdEdit(returnedJsonData[0].groupsId);
						// category
						$("#cbbCatePopup").val(returnedJsonData[0].cateId);
						// status
						$("#cbbStatusPopup").val(returnedJsonData[0].statusId);
						// education
						if (returnedJsonData[0].educationalId != null) {
							$("#cbbEducationPopup").val(returnedJsonData[0].educationalId);
							loadUniversityDataComboboxEdit(returnedJsonData[0].educationalId, returnedJsonData[0].universityId);
							$("#cbbSpecializedPopup").val(returnedJsonData[0].specializedId);
						}
						setPopupControlState(MODE_EDIT);
					}
				}
			},
			error: function(e) {
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	$(document).on("click", ".view", function() {
		// get id of selected cate
		peronIdPopup = $(this).attr("id");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "PersonId": peronIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					clearPopupControl();
					// change state of controls in popup based on mode
					initComboboxData(true);
					for (var i = 0; i < returnedJsonData.length; i++) {

						$("#txtKskQuanStt").val(returnedJsonData[i].kskquanStt);
						$("#txtLltnStt").val(returnedJsonData[i].lltnStt);
						// Person ID
						$("#txtPersonIdPopup").val(returnedJsonData[i].personId);
						// Person Name
						$("#txtPersonNamePopup").val(returnedJsonData[i].personName);
						// Birth Day
						$("#datepicker").val(returnedJsonData[i].dateOfBirth + "/" + returnedJsonData[i].monthOfBirth + "/" + returnedJsonData[i].yearOfBirth);

						// place of birth
						$("#cbbPlaceOfBirth").val(returnedJsonData[i].placeOfBirth);
						// IndentityCard
						$("#txtIndentityCardPopup").val(returnedJsonData[i].identityCard);
						// phone
						$("#txtPhonePopup").val(returnedJsonData[i].phone);
						// nation
						$("#txtNationPopup").val(returnedJsonData[i].nation);
						// religion
						$("#txtReligionPopup").val(returnedJsonData[i].religion);
						// permanent Address
						$("#txtPermanentAddressPopup").val(returnedJsonData[i].permanentAddress);
						// temporary Residence Address
						$("#txtPermanentAddressPopup").val(returnedJsonData[i].temporaryResidenceAddress);
						// temporary Residence Address
						$("#txtTemporaryResidenceAddressPopup").val(returnedJsonData[i].temporaryResidenceAddress);
						$("#cbbCityPopup").prop("disabled", false);
						$("#cbbDistrictPopup").prop("disabled", false);
						$("#cbbWardsPopup").prop("disabled", false);
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbGroupsPopup").prop("disabled", false);

						// city
						loadCityDataComboboxEdit(returnedJsonData[0].cityId);
						// district 
						loadDistrictDataByCityIdEdit(returnedJsonData[0].districtId);
						// wards
						loadWardsDataByDistrictIdEdit(returnedJsonData[0].wardsId);
						// town 
						loadTownDataByWardsIdEdit(returnedJsonData[0].townId);
						// groupsId
						loadGroupsDataByTownIdEdit(returnedJsonData[0].groupsId);
						// category
						$("#cbbCatePopup").val(returnedJsonData[0].cateId);
						// status
						$("#cbbStatusPopup").val(returnedJsonData[0].statusId);
						// education
						if (returnedJsonData[0].educationalId != null) {
							$("#cbbEducationPopup").val(returnedJsonData[0].educationalId);
							loadUniversityDataComboboxEdit(returnedJsonData[0].educationalId, returnedJsonData[0].universityId );
							$("#cbbSpecializedPopup").val(returnedJsonData[0].specializedId);
						}
						// University
						$("#cbbUniversityPopup").prop("disabled", true);
						// Specialized
						$("#cbbSpecializedPopup").prop("disabled", true);
						setPopupControlState(MODE_VIEW);
					}
				}
			},
			error: function(e) {
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	// load Education on Popup
	function loadUniversityDataComboboxEdit(educationId, universityId) {
		var selectedEducationId = "";
		selectedEducationId = $("#cbbEducationPopup").find("option:selected").val(); 
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
					// create option string
					var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							if (returnedJsonData[i].universityId == universityId && universityId != "") {
								optionStr += "<option value='" + returnedJsonData[i].universityId + "' selected = 'selected'>" + returnedJsonData[i].universityName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].universityId + "'>" + returnedJsonData[i].universityName + "</option>";
								
							}
						}
						$("#cbbUniversityPopup").empty().append(optionStr).prop("disabled", false);
						if (universityId != "") {
							loadSpecializedDataByUniverisityId(true);
						}
					} else {
						// reset empty combobox and disabled
						$("#cbbUniversityPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbSpecializedPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// reset empty combobox and disabled
					$("#cbbUniversityPopup").empty().append(optionStr).prop("disabled", true);
					$("#cbbSpecializedPopup").empty().append(optionStr).prop("disabled", true);
					// display error message
					alert(ERROR_MESSAGE);
				}
			});	
		} else {
			$("#cbbUniversityPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbSpecializedPopup").empty().append(optionStr).prop("disabled", true);
		}
	}

	// Load Education Data into combobox
	function loadEducationComboxEdit(educationId) {
		if (eduactionData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < eduactionData.length; i++) {
				if (educationId == eduactionData[i].educationId) {
					optionStr += "<option value='" + eduactionData[i].educationId + "' selected = 'selected'>" + eduactionData[i].level + "</option>";
				} else {
					optionStr += "<option value='" + eduactionData[i].educationId + "'>" + eduactionData[i].level + "</option>";	
				}
			}
			if (isPopupMode) {
				$("#cbbEducationPopup").empty()
				$("#cbbEducationPopup").append(optionStr);
			} else {
				$("#cbbEducation > ").empty()
				$("#cbbEducation").append(optionStr);
			}
		}
	}

	// Load City name combobox data
	function loadCityDataComboboxEdit(cityId) {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
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
							if (returnedJsonData[i].cityId == cityId && cityId != "") {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "' selected = 'selected'>" + returnedJsonData[i].cityName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
								
							}
						}
						$("#cbbCityPopup").prop("disabled", false);
						$("#cbbDistrictPopup").prop("disabled", false);
						$("#cbbWardsPopup").prop("disabled", false);
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbCityPopup").empty().append(optionStr);
						if (cityId == "") {
							loadDistrictDataByCityIdEdit("");
						}
					} else {
						// reset empty combobox and disabled
						$("#cbbCityPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbDistrictPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbCityPopup").empty();
			$("#cbbDistrictPopup").empty();
			$("#cbbWardsPopup").empty();
			$("#cbbTownPopup").empty();
			// disable combobox
			$("#cbbCityPopup").prop("disabled", true);
			$("#cbbDistrictPopup").prop("disabled", true);
			$("#cbbWardsPopup").prop("disabled", true);
			$("#cbbTownPopup").prop("disabled", true);
			$("#cbbGroupsPopup").empty().prop("disabled", true);
		}
	}

	function loadDistrictDataByCityIdEdit(districtId) {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
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
							if (districtId == returnedJsonData[i].districtId) {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "' selected = 'selected'>" + returnedJsonData[i].districtName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
							}
						}
						$("#cbbDistrictPopup").prop("disabled", false);
						$("#cbbWardsPopup").prop("disabled", false);
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbDistrictPopup").empty().append(optionStr);
						if (districtId == "") {
							loadWardsDataByDistrictId("");
						}
					} else {
						$("#cbbDistrictPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear & disable combobox
			$("#cbbDistrictPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadWardsDataByDistrictIdEdit(wardsId) {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
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
							if (wardsId == returnedJsonData[i].wardsId) {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "' selected = 'selected'>" + returnedJsonData[i].wardsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
							}
						}
						$("#cbbWardsPopup").prop("disabled", false);
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbWardsPopup").empty().append(optionStr);
						if (wardsId == "") {
							loadTownDataByWardsId("");
						}
					} else {
						$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
						$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbWardsPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
			$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadTownDataByWardsIdEdit(townId) {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWardsPopup").find("option:selected").val();
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
							if (townId == returnedJsonData[i].townId) {
								optionStr += "<option value='" + returnedJsonData[i].townId + "' selected = 'selected'>" + returnedJsonData[i].townName + "</option>";
							} else {

								optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
							}
						}
						$("#cbbTownPopup").prop("disabled", false);
						$("#cbbTownPopup").empty().append(optionStr);
						if (townId == "") {
							loadGroupsDataByTownId("");
						}
					} else {
						$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbTownPopup").empty().append(optionStr).prop("disabled", true);
		}
	}
	
	function loadGroupsDataByTownIdEdit(groupId) {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountryPopup").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCityPopup").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrictPopup").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWardsPopup").find("option:selected").val();
		// get Town
		var selectTownId = ""
		selectTownId = $("#cbbTownPopup").find("option:selected").val();
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
							if (groupId == returnedJsonData[i].groupsId) {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "' selected = 'selected'>" + returnedJsonData[i].groupsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "'>" + returnedJsonData[i].groupsName + "</option>";
							}
						}
						$("#cbbGroupsPopup").prop("disabled", false);
						$("#cbbGroupsPopup").empty().append(optionStr);
					}  else {
						$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbGroupsPopup").empty().append(optionStr).prop("disabled", true);
		}
	}

	// Get data for combobox country
	function initComboboxData(isPopupMode) {
		isPopupMode = isPopupMode;
		$("#btnExport").addClass("disabled");
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
			if (isPopupMode) {
				$("#cbbCountryPopup").empty()
				$("#cbbCountryPopup").append(optionStr);
				$("#cbbPlaceOfBirth").empty()
				$("#cbbPlaceOfBirth").append(optionStr);
				loadCityDataCombobox(true);
			} else {
				$("#cbbCountry").empty()
				$("#cbbCountry").append(optionStr);
				loadCityDataCombobox(false);
			}
		} else {
			if (isPopupMode) {
				$("#cbbCountryPopup").empty()
				$("#cbbCountryPopup").prop("disabled", true);
				$("#cbbPlaceOfBirth").empty()
				$("#cbbPlaceOfBirth").prop("disabled", true);
			} else {
				$("#cbbCountry").empty()
				$("#cbbCountry").prop("disabled", true);
			}
		}
		// Cate
		if (cateData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < cateData.length; i++) {
				optionStr += "<option value='" + cateData[i].cateId + "'>" + cateData[i].cateName + "</option>";	
			}
			if (isPopupMode) {
				$("#cbbCatePopup").empty()
				$("#cbbCatePopup").append(optionStr);
			} else {
				$("#cbbCate").empty()
				$("#cbbCate").append(optionStr);
			}
		} else {
			if (isPopupMode) {
				$("#cbbCatePopup").empty()
				$("#cbbCatePopup").prop("disabled", true);
			} else {
				$("#cbbCate").empty()
				$("#cbbCate").prop("disabled", true);
			}
		}

		// Status
		if (statusData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < statusData.length; i++) {
				optionStr += "<option value='" + statusData[i].statusId + "'>" + statusData[i].statusName + "</option>";	
			}
			if (isPopupMode) {
				$("#cbbStatusPopup").empty()
				$("#cbbStatusPopup").append(optionStr);
			} else {
				$("#cbbStatus").empty()
				$("#cbbStatus").append(optionStr);
			}
		} else {
			if (isPopupMode) {
				$("#cbbStatusPopup").empty()
				$("#cbbStatusPopup").prop("disabled", true);
			} else {
				$("#cbbStatus").empty()
				$("#cbbStatus").prop("disabled", true);
			}
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
			if (isPopupMode) {
				$("#cbbEducationPopup").empty()
				$("#cbbEducationPopup").append(optionStr);
				loadUniversityDataByeducationId(true);
			} else {
				$("#cbbEducation > ").empty()
				$("#cbbEducation").append(optionStr);
				loadUniversityDataByeducationId(false);
			}
			
		} else {
			if (isPopupMode) {
				$("#cbbEducationPopup").empty()
				$("#cbbEducationPopup").prop("disabled", true);
			} else {
				$("#cbbEducation").empty()
				$("#cbbEducation").prop("disabled", true);
			}
		}
		
		// University
		/*if (universityData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < universityData.length; i++) {
				optionStr += "<option value='" + universityData[i].universityId + "'>" + universityData[i].universityName + "</option>";	
			}
			// check popup show
			if (isPopupMode) {
				$("#cbbUniversityPopup").empty();
				$("#cbbUniversityPopup").append(optionStr);
				loadSpecializedDataByUniverisityId(true);
			} else {
				$("#cbbUniversity").empty();
				$("#cbbUniversity").append(optionStr);
				loadSpecializedDataByUniverisityId(false);
			}
		} else {
			// check popup show
			if (isPopupMode) {
				$("#cbbUniversity").empty();
				$("#cbbUniversity").prop("disabled", true);
			} else {
				$("#cbbUniversityPopup").empty();
				$("#cbbUniversityPopup").prop("disabled", true);
			}
		}*/
	}

	// Reset search conditions process
	function resetSearchConditions() {
		$("#txtCriteriaIdPopup").val("");
		$("#txtCriteriaNamePopup").val("");
		$("#chbDeletePopup").val(STATUS_NO_SELECT);
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		var checkedFlag = false;
		if ($("#txtKskQuanStt").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +KSKQUANSTT + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			$("#lblKskQuanStt").css("color","red");
			checkedFlag = false;
		} else if ($("#txtLltnStt").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +LLTNSTT + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPersonNamePopup").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PERSON_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtIdentityCardPopup").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +IDENTITY_CARD + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPermanentAddressPopup").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PERMANENT_ADDRESS + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtTemporaryResidenceAddressPopup").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +TEMPORARY_RESIDENCE_ADDRESS + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPhonePopup").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PHONE + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbEducationPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +LEVEL + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbCountryPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +COUNTRY_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbCityPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +CITY_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbDistrictPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +DISTRICT_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbWardsPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +WARDS_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbTownPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +TOWN_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbGroupsPopup").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +GROUPS_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} /*else if ($("#txtNumberOfRelation").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +NUMBER_OF_RELATION + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if (reportDetailReportIdStr == '') {
			jWarning("Bạn chưa thiết lập ghi chú cho mẫu báo cáo!", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		}*/ else {
			$("label").css("color","#000");
			checkedFlag = true;
		}
		//setLabel();
		return checkedFlag;
	}
/********************************************
 *  Load Popup 0047
 *******************************************/
	var btnComfirmProcessYourseltClicked = false;
	var btnComfirmRelationClicked = false;

	var processYoursellStr = "";
	// check event click button
	$(document).on("click","#btnRegisterPopupProcess", function(){
		// count quality row of table Process
		var countTrProcessYoursell = $('#divBodyProcess > #tblBodyProcess > tbody > tr').length;
		for (var i = 1; i <= countTrProcessYoursell; i++) {
			// count quality cell of row i
			processYoursellStr = processYoursellStr + $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")" ).attr("id") + ":";
			var countTdProcessYoursell = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+") td" ).length;
			for (var j = 0; j < countTdProcessYoursell; j++) {
				// check <td> in table has empty.
				var textOfTd = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(j).text()
				// get fromYear & ToYear
				var fromYear = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(0).text();
				var toYear = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(1).text()
				
				
				if ( textOfTd == "") {
					jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					processYoursellStr = '';
					break;
				} else {
					// check fromYear < ToYear
					if (fromYear > toYear) {
						jWarning(FROM_YEAR_IS_MUST_SMALL_TO_YEAR, DIALOG_TITLE, DIALOG_OK_BUTTON);
						processYoursellStr = '';
						break;
					} else {
						btnComfirmProcessYourseltClicked = true;
						// if j = quality of Td in tr
						if (j == countTdProcessYoursell - 1) {
							processYoursellStr += textOfTd + ","
						} else {
							processYoursellStr += textOfTd + ":"
						}
					}
				}
			}
		} 
		// display-none btnNumberOfRelation
		if (processYoursellStr != '') {
			if (currentMode == MODE_NEW) {
				$(this).data('clicked', true);
				$.ajax({
					type: "POST",
					url: "insertProcessPerson",
					data: { "processYoursellStr": processYoursellStr,
						"personId": personId},
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							if (returnedJsonData == INSERT_RESULT_SUCCESSFUL) {
								// display message
								$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + INSERT_RESULT_SUCCESSFUL_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
								// duplicated cate id
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_DUPLICATED_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE);
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
					}
				})
			} else if (currentMode == MODE_EDIT) {
				$.ajax({
					type: "POST",
					url: "updateProcessPerson",
					data: { "processYoursellStr": processYoursellStr,
						"personId": personId },
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							// display message
							$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + UPDATE_RESULT_SUCCESSFUL_MESSAGE);
						}
					}
				})
			}
			
		}
	});
	var personId = "";
	$(document).on("click", ".btnProcessOfYourSelt", function() {
		processYoursellStr = "";
		// get row index
		personId = $(this).attr("id");
		selectedRowIndex = $(this).attr("name");
		$(".processOfYourSelt").load(rootPath + "/0047/?personId="+personId);
		setTimeout(function() {
			drawTableProcessEdit(personId);
			$("#divBodyProcess").width($("#divHeadProcess").width() + 2);
		}, 1000);
		$("#divBodyProcess").width($("#divHeadProcess").width() + 2);
	});

	var d = new Date();
	var yearNow = d.getFullYear();
	var yearArr = [];
	for (var i = 1970; i >= 1970 && i <= yearNow; i++) {
		yearArr.push(i);
	}
	
	$(document).on("dblclick", ".setYear", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var width = $(this).width();
			var optionStr = "<select class = 'cbbChangeText form-control' type = 'text' style = 'width:"+width+";'><option value = "+STATUS_NO_SELECT+"></option>";
			for (var i = 0; i < yearArr.length; i++) {
				if (selectedYearStr == yearArr[i]) {
					optionStr += "<option value = '"+yearArr[i]+"' selected = 'selected'>"+yearArr[i]+"</option>";
				} else {
					optionStr += "<option value = '"+yearArr[i]+"'>"+yearArr[i]+"</option>";
				}
			}
			optionStr += "</select>";
			$(this).html(optionStr);
		}
	});

	$(document).on("click", "#divBodyProcess > #tblBodyProcess > tbody > tr > .filedProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var width = $(this).width();
			if ($(this).text() != "") {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' value = '"+$(this).text()+"' />");
			} else {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' />");
			}
			$(this).find(".changeText").focus();
		}
	});

	$(document).on("focusout", "#divBodyProcess > #tblBodyProcess > tbody > tr > td.filedProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var text = $(this).find(".changeText").val();
			$(this).text(text);
		}
	});

	$(document).on("click", "#addProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var numberRow = $('#divBodyProcess > #tblBodyProcess > tbody > tr').length +1;
			var str = '' + numberRow;
			  while (str.length < 3) {
			    str = '0' + str;
			  }
			var strIdProcess = "PP" + str;
			// create table starts
			var tableStringArray = [];
			var numberRowPlus = numberRow + 1;
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='" + strIdProcess + "'>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear '></td>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filedProcess'></td>");
			// row close tag
			tableStringArray.push("</tr>");
			// append all created string to table
			$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
		}
	});

	// selected Relation
	var selectedYearStr = "";
	$(document).on("focusout", ".setYear", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var text = $(this).find(".cbbChangeText").find('option:selected').text();
			selectedYearStr = text;
			$(this).text(text);
		}
	});

	$(document).on('keydown', "#tblBodyProcess > tbody > tr > td", function(event) {
		if(event.keyCode == 9){ //for tab key
			var currentDiv = event.target;
		    $(currentDiv).next("td").click();
		}
	});

	$(document).on('click', '#btnEditProcessYourselt', function(e) {
		btnComfirmProcessYourseltClicked = false;
		$(this).addClass('display-none');
		$(this).parent().find("#btnRegisterPopupProcess").removeClass("display-none");
	});

	function drawTableProcessEdit(personId) {
		// clear table
		$("#divBodyProcess > #tblBodyProcess").find("tbody").remove();
		// create table starts
		var tableStringArray = [];
		// add tbody open tag
		tableStringArray.push("<tbody>");     
		$.ajax({
			type: "POST",
			url: "getProcessEdit",
			data: { "PersonId": personId },
			async: false,
			success: function(returnedJsonData) {
				if (returnedJsonData.length > 0) {
					for (var i = 0; i < returnedJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='" + returnedJsonData[i].processPersonId + "'>");
						// relation
						tableStringArray.push("<td style='width: 10%;' class = 'align-center setYear '>"+returnedJsonData[i].fromYear+"</td>");
						// relation
						tableStringArray.push("<td style='width: 10%;' class = 'align-center setYear'>"+returnedJsonData[i].toYear+"</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filedProcess'>"+returnedJsonData[i].content+"</td>");
						// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					// append all created string to table
					$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
					// show search result
					$(".cont-box").removeClass("display-none");
					$("#divHeadProcess").removeClass("display-none");
					// fix table header and body when scrolling only the table body
					fixTable();
				    // scroll to top of table
					$("#divBodyProcess").scrollTop(0).scrollLeft(0);
					btnComfirmProcessYourseltClicked = true;
					// display-none button
					$("#btnEditProcessYourselt").removeClass("display-none");
					currentMode = MODE_EDIT;
				} else {
					drawTable0047();
					currentMode = MODE_NEW;
					btnComfirmProcessYourseltClicked = false;
					// display-none button
					$("#btnEditProcessYourselt").addClass("display-none");
				}
			}, 
			error: function(e) {
				// display error message
				alert(ERROR_MESSAGE);
			}
		})
	}
	function drawTable0047() {
		// clear table
		$("#divBodyProcess > #tblBodyProcess").find("tbody").remove();
		// create table starts
		var tableStringArray = [];
		// add tbody open tag
		tableStringArray.push("<tbody>");
		for (var i = 0; i < 1; i++) {
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
			// relation
			tableStringArray.push("<td style='width: 10%;' class = 'align-center setYear '></td>");
			// relation
			tableStringArray.push("<td style='width: 10%;' class = 'align-center setYear'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filedProcess'></td>");
			// row close tag
			tableStringArray.push("</tr>");
		}
		// add tbody close tag
		tableStringArray.push("</tbody>");
		// append all created string to table
		$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
		// show search result
		$(".cont-box").removeClass("display-none");
		$("#divHeadProcess").removeClass("display-none");
		// fix table header and body when scrolling only the table body
		fixTable();
	    // scroll to top of table
		$("#divBodyProcess").scrollTop(0).scrollLeft(0);
	}

	/**
	 * Thêm Thông tin quá trình bản thân của thanh niên
	 */
	$(document).on("click", "btnRegisterPopupProcess", function(){
		
	});

	/**********************************************
	 * 				0045
	 * ********************************************/

	var relationStr = "";
	$(document).on("click", ".btnNumberOfRelation", function() {
		relationStr = "";
		// get row index
		personId = $(this).attr("id");
		var numberOfRelation = $("#txtNumberOfRelation").val();
		selectedRowIndex = $(this).attr("name");
		$(".relationContent").load(rootPath + "/0045/?numberOfRelation="+0);
		setTimeout(function() {
			// reset variables
			// draw table
			drawResult = drawTable0045Edit();
			$("#divBodyRelation").width($("#divHead").width());
			
		}, 1000);
		$("#lblNumberOfRelation").addClass("display-none");
		$("#txtNumberOfRelation").addClass("display-none");
		$("#divBodyRelation").width($("#divHeadRelation").width());
		
	});

	$(document).on('click', '#btnEditRelation', function(e) {
		btnComfirmRelationClicked = false;
		$(this).addClass('display-none');
		$(this).parent().find("#btnRegisterPopupRelation").removeClass("display-none");
	});

	var relationArr = ['Cha', 'Mẹ', 'Anh', 'Chị', 'Em', 'Vợ', 'Con'];
	$(document).on("dblclick", "tbody > tr > .relation", function() {
		if (!btnComfirmRelationClicked) {
			var width = $(this).width();
			var optionStr = "<select class = 'cbbChangeText form-control' type = 'text' style = 'width:"+width+";'><option value = "+STATUS_NO_SELECT+"></option>";
			for (var i = 0; i < relationArr.length; i++) {
				if (selectedRelationStr == relationArr[i]) {
					optionStr += "<option value = '"+relationArr[i]+"' selected = 'selected'>"+relationArr[i]+"</option>";
				} else {
					optionStr += "<option value = '"+relationArr[i]+"'>"+relationArr[i]+"</option>";
				}
			}
			optionStr += "</select>";
			$(this).html(optionStr);
		}
			
	});

	$(document).on("click", "tbody > tr > .filed", function() {
		if (!btnComfirmRelationClicked) {
			var width = $(this).width();
			if ($(this).text() != "") {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' value = '"+$(this).text()+"' />");
			} else {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' />");
			}
			$(this).find(".changeText").focus();
		}
	});

	$(document).on("focusout", "tbody > tr > td.filed", function() {
		if (!btnComfirmRelationClicked) {
			var text = $(this).find(".changeText").val();
			$(this).text(text);
		}
	});

	$(document).on("click", "#addNewRelation", function() {
		if (!btnComfirmRelationClicked) {
			var numberOfRelation = $('#divBodyRelation > #tblBodyRelation > tbody > tr').length +1;
			var str = '' + numberOfRelation;
			  while (str.length < 3) {
			    str = '0' + str;
			  }
			var strIdRelation = "FP" + str;
			// create table starts
			var tableStringArray = [];
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='" + strIdRelation + "'>");
			// relation
			tableStringArray.push("<td style='width: 20%' class = 'align-center relation '></td>");
			// relation
			tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
			// row close tag
			tableStringArray.push("</tr>");
			// append all created string to table
			$("#divBodyRelation > #tblBodyRelation").append(tableStringArray.join(''));
		}
	});
	// selected Relation
	var selectedRelationStr = "";
	$(document).on("focusout", "tbody > tr > .relation", function() {
		if (!btnComfirmRelationClicked) {
			var text = $(this).find(".cbbChangeText").val();
			selectedRelationStr = text;
			$(this).text(text);
		}
	});

	function drawTable0045(numberOfRelation) {
		if (numberOfRelation > 0) {
			// clear table
			$("#divBodyRelation > #tblBodyRelation").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			for (var i = 0; i < numberOfRelation; i++) {
				// row open tag
				tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
				// relation
				tableStringArray.push("<td style='width: 20%' class = 'align-center relation '></td>");
				// relation
				tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td style='width: 20%' class = 'align-center filed'></td>");
				// row close tag
				tableStringArray.push("</tr>");
			}
			// add tbody close tag
			tableStringArray.push("</tbody>");
			// append all created string to table
			$("#divBodyRelation > #tblBodyRelation").append(tableStringArray.join(''));
			// show search result
			$("#divHeadRelation").removeClass("display-none");
			// fix table header and body when scrolling only the table body
			fixTable();
		    // scroll to top of table
			$("#divBodyRelation").scrollTop(0).scrollLeft(0);
		}
	}

	// function 
	function drawTable0045Edit() {
			// clear table
			$("#divBodyRelation > #tblBodyRelation").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			$.ajax({
				type: "POST",
				url: "getRelationShipOfPersonEdit",
				data: { "PersonId": personId },
				async: false,
				success: function(returnedJsonData) {
					if (returnedJsonData.length > 0) {
						for (var i = 0; i < returnedJsonData.length; i++) {
							// row open tag
							tableStringArray.push("<tr class = 'height34' id='" + returnedJsonData[i].familyPersonId + "'>");
							// relation
							tableStringArray.push("<td style='width: 20%' class = 'align-center relation '>" + returnedJsonData[i].relation + "</td>");
							// relation
							tableStringArray.push("<td style='width: 20%' class = 'align-center filed'>" + returnedJsonData[i].status + "</td>");
							// relation
							tableStringArray.push("<td style='width: 20%' class = 'align-center filed'>" + returnedJsonData[i].birthDay + "</td>");
							// relation
							tableStringArray.push("<td style='width: 20%' class = 'align-center filed'>" + returnedJsonData[i].job + "</td>");
							// relation
							tableStringArray.push("<td style='width: 20%' class = 'align-center filed'>" + returnedJsonData[i].workPlace + "</td>");
							// row close tag
							tableStringArray.push("</tr>");
						}
						// add tbody close tag
						tableStringArray.push("</tbody>");
						// append all created string to table
						$("#divBodyRelation > #tblBodyRelation").append(tableStringArray.join(''));
						// show search result
						$(".cont-box").removeClass("display-none");
						$("#divHeadRelation").removeClass("display-none");
						// fix table header and body when scrolling only the table body
						fixTable();
					    // scroll to top of table
						$("#divBodyRelation").scrollTop(0).scrollLeft(0);
						btnComfirmRelationClicked = true;
						$("#btnRegisterPopupRelation").addClass("display-none");
						$("#btnEditRelation").removeClass("display-none");
						currentMode = MODE_EDIT;
					} else {
						drawTable0045(1);
						$("#btnRegisterPopupRelation").removeClass("display-none");
						$("#btnEditRelation").addClass("display-none");
						btnComfirmRelationClicked = false;
						currentMode = MODE_NEW;
					}
				}, 
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
	}
	// register Family Relation
	$(document).on("click", "#btnRegisterPopupRelation", function() {
		// count quality row of table Relation
		var countTrRelation = $('#divBodyRelation > #tblBodyRelation > tbody > tr').length;
		for (var i = 1; i <= countTrRelation; i++) {
			relationStr = relationStr + $("#divBodyRelation > #tblBodyRelation > tbody > tr:nth-child("+i+")" ).attr("id") + ":";
			var countTdRelation = $("#divBodyRelation > #tblBodyRelation > tbody > tr:nth-child("+i+") td" ).length;
			for (var j = 0; j < countTdRelation; j++) {
				// check <td> in table has empty.
				var textOfTd = $("#divBodyRelation > #tblBodyRelation > tbody > tr:nth-child("+i+")").find("td").eq(j).text();
				if ( textOfTd == "") {
					jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					relationStr = '';
					btnComfirmRelationClicked = false;
					break;
				} else {
					if (textOfTd != "") {
						btnComfirmRelationClicked = true;
						$(this).addClass("display-none");
						// if j = quality of Td in tr
						if (j == countTdRelation - 1) {
							relationStr += textOfTd + ","
						} else {
							relationStr += textOfTd + ":"
						}
					}
				}
			}
			
		}
		if (relationStr != "") {
			alert (relationStr);
			if (currentMode == MODE_NEW) {
				$(this).data('clicked', true);
				$.ajax({
					type: "POST",
					url: "insertRelation",
					data: { "relationStr": relationStr,
						"personId": personId},
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							if (returnedJsonData == INSERT_RESULT_SUCCESSFUL) {
								// display message
								$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + INSERT_RESULT_SUCCESSFUL_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
								// duplicated cate id
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_DUPLICATED_MESSAGE);
							} else if (returnedJsonData == INSERT_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE);
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
					}
				})
			} else if (currentMode == MODE_EDIT) {
				$.ajax({
					type: "POST",
					url: "updateRelation",
					data: { "relationStr": relationStr,
						"personId": personId },
					async: false,
					success: function(returnedJsonData) {
						if (checkSessionTimeout(returnedJsonData) == 1) return;
						if (returnedJsonData != "") {
							// display message
							$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + UPDATE_RESULT_SUCCESSFUL_MESSAGE);
						}
					}
				});
			}
			
		}
		if (!btnComfirmRelationClicked) {
			$(this).removeClass("display-none");
		} else {
			$(this).addClass("display-none");
		}
	});
/****************************************************
 *  		0049 - Edit Report
 ***************************************************/
	$(document).on("click", ".btnEditReport", function() {
		processYoursellStr = "";
		// get row index
		personId = $(this).attr("id");
		selectedRowIndex = $(this).attr("name");
		$("#report_popup").load(rootPath + "/0049/");
		$("#btnRegisterNoteReport").removeClass("disabled");
		if (reportData != '') {
			setTimeout(function() {
				// reset variables
				// draw table
				drawResult = drawTable0049Report();
			}, 1000);
		} else {
			// display error message
			jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
		}
	});


	function drawTable0049Report() {
		if (reportData != '') {
			// clear table
			$("#divBodyReport > #tblBodyReport").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			for (var i = 0; i < reportData.length; i++) {
				// row open tag
				tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
				// reportName
				tableStringArray.push("<td id = '"+reportData[i].reportId+"' class = 'row_reportId algin-center' name = '"+i+"'>"+reportData[i].reportName+"</td>");
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
/*
 * dratable Report Data
 */
	$(document).on("click", ".row_reportId", function() { 
		var selectedReportId = $(this).attr("name");
		// if row selected has't class bg_00c0ef then add Class bg_00c0ef
		var reportId = $(this).attr("id");
		if (!$(this).hasClass("bg_00c0ef")) {
			$(this).addClass("bg_00c0ef");
			$(".row_reportId").each(function(){
				if ($(this).attr("id") != reportId) {
					$(this).removeClass("bg_00c0ef");
				} 
				// if it has then reportSelectedStr + id of report
			});
			$("#noteReport_popup").load(rootPath + "/0051/?reportIdStr=" + reportId);
			setTimeout(function() {
				drawTableDetailReport(reportId);
			}, 1000);
		} else { // else remove class bg_00c0ef
			$(this).removeClass("bg_00c0ef");
		}
	});

	function drawTableDetailReport(reportIdPopup) {
		$.ajax({
			url: "../0051/getDetailReport",
			type: "POST",
			data: { "reportId": reportIdPopup },
			success: function(returnJsonData) {
				if (checkSessionTimeout(returnJsonData) == 1) return;
				if (returnJsonData.length == 0) {
					$("#noteReport_popup").addClass("display-none");
					$("#criteriaReport_popup").addClass("display-none");
					// display error message
					jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
				} else {
					// clear table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport > #tblBodyDetailReport").find("tbody").remove();
					// create table starts
					var tableStringArray = [];
					// add tbody open tag
					tableStringArray.push("<tbody>");
					for (var i = 0; i < returnJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
						// DetailReportName
						tableStringArray.push("<td id = '"+returnJsonData[i].detailReportId+"' criteriaId = '' class = 'row_DetailReportId algin-center' name = '"+i+"'>"+returnJsonData[i].detailReportName+"</td>");
						/*// DetailReportName
						tableStringArray.push("<td reportId = '"+returnJsonData[i].reportId+"' detailReportId = '"+returnJsonData[i].detailReportId+"' class = 'criteria_row'>Chọn Tiêu Chí:</td>");
						*/// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					$("#noteReport_popup").removeClass("display-none");
					// append all created string to table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport > #tblBodyDetailReport").append(tableStringArray.join(''));
					// show search result
					$("#tabs-" +reportIdPopup+ " > #divHeadDetailReport").removeClass("display-none");
				    // scroll to top of table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport").scrollTop(0).scrollLeft(0);
					if ($("#tabs-" + reportIdPopup + " > #divBodyDetailReport").height() > 300) {
						$("#tabs-" + reportIdPopup).addClass("overflow-y");
					} else {
						$("#tabs-" + reportIdPopup).removeClass("overflow-y");
					}
				}	
			}
		});
	}

	/*
	 * dratable Detail Report Data
	 */

	var detailReportId = '';
	$(document).on("click", ".row_DetailReportId", function() { 
		var selectedReportId = $(this).attr("name");
		// if row selected has't class bg_00c0ef then add Class bg_00c0ef
		detailReportId = $(this).attr("id");
		
		reportId = $("#reportIdStr").val();
		if (!$(this).hasClass("bg_00c0ef")) {
			$(this).addClass("bg_00c0ef");
			$(".row_DetailReportId").each(function(){
				if ($(this).attr("id") != detailReportId) {
					$(this).removeClass("bg_00c0ef");
				} 
			});
			$.ajax({
				url: "../0051/getCriteria",
				type: "POST",
				data: { "reportId": reportId,
						"detailReportId" : detailReportId
				},
				success: function(returnJsonData) {
					if (checkSessionTimeout(returnJsonData) == 1) return;
					if (returnJsonData.length == 0) {
						$("#criteriaReport_popup").addClass("display-none");
						// display error message
						jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
						return false;
					}
						// clear table
						$("#divBodyCriteria > #tblBodyCriteria").find("tbody").remove();
						// create table starts
						var tableStringArray = [];
						// add tbody open tag
						tableStringArray.push("<tbody>");
						for (var i = 0; i < returnJsonData.length; i++) {
							// row open tag
							tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
							tableStringArray.push("<td  style='width: 10%'><input class = 'chkCriteria' type = 'checkbox' id = '"+returnJsonData[i].criteraId+"' /></td>");
							// DetailReportName
							tableStringArray.push("<td reportId = '"+returnJsonData[i].reportId+"' criteriaId = '"+returnJsonData[i].criteraId+"' class = 'criteria_row_selected align-center'>"+returnJsonData[i].criteraName+"</td>");
							// row close tag
							tableStringArray.push("</tr>");
						}
						// add tbody close tag
						tableStringArray.push("</tbody>");
						// append all created string to table
						$("#divBodyCriteria > #tblBodyCriteria").append(tableStringArray.join(''));
						// show search result
						$(".cont-box").removeClass("display-none");
						$("#criteriaReport_popup").removeClass("display-none");
						if ($("#divBodyCriteria > #tblBodyCriteria").height() > 300) {
							$("#criteriaReport_popup").addClass("overflow-y")
						} else {
							$("#criteriaReport_popup").removeClass("overflow-y")
						}
					    // scroll to top of table
						$("#divBodyCriteria").scrollTop(0).scrollLeft(0);

						setTimeout(function() {						
							checkCriteriaOfPerson(personId, reportId, detailReportId);
						},500);
				}
			});
		} else { // else remove class bg_00c0ef
			$(this).removeClass("bg_00c0ef");
		}
	});

	// check when user click button CheckBox
	$(document).on("click", "#chkAll", function(){
		if ($(this).is(":checked")) {
			$(".chkCriteria").prop("checked", true);
		} else {
			$(".chkCriteria").prop("checked", false);
		}
	});

	//function kiem tra xem thanh nien nay da tạo thông tin bao cáo hay chưa
	var noteReportData = [];
	function checkCriteriaOfPerson(personId, reportId, detailReportId) {
		$.ajax({
			url: "../0051/checkCriteriaOfPerson",
			type: "POST",
			data: { "personId": personId,
					"reportId": reportId,
					"detailReportId" : detailReportId
			},
			success: function(returnJsonData) {
				if (checkSessionTimeout(returnJsonData) == 1) return;
				if (returnJsonData.length > 0) {
					if (returnJsonData.length > 0) {
						$(".criteria_row_selected").each(function(){
							var selctedCriteriaId = $(this).attr("criteriaId");
							for (var y = 0; y < returnJsonData.length; y++) {
								if ($(this).attr("criteriaId") == returnJsonData[y].criteraId) {
									$(this).parent().find(".chkCriteria").prop("checked", true);
									break;
								} 
							}
						});
						currentMode = MODE_EDIT;
					}
				} else {
					currentMode = MODE_NEW;
				}
			}
		});
	}

	// add New Note report of Person
	$(document).on("click", "#btnRegisterNoteReport", function(){
		// reportId
		var reportId = $("#reportIdStr").val();
		// default variable concat with String to Insert or Update Data Note Report
		var defaultStr = reportId + ":" + detailReportId + ":"
		// note Report String
		var noteReportStr = "";
		$(".criteria_row_selected").each(function(){
			if ($(this).parent().find(".chkCriteria").is(":checked")) {
				noteReportStr += defaultStr + $(this).attr("criteriaId") + ",";
			}
		});
		noteReportStr = noteReportStr.substring(0, noteReportStr.length -1);
		if (noteReportStr == "") {
			
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE);
			return;
		}
		if (currentMode == MODE_NEW) {
			$.ajax({
				type: "POST",
				url: "insertNoteReport",
				data: { "noteReportStr": noteReportStr,
					"personId": personId},
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					if (returnedJsonData != "") {
						if (returnedJsonData == INSERT_RESULT_SUCCESSFUL) {
							// display message
							$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + INSERT_RESULT_SUCCESSFUL_MESSAGE);
						} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
							// duplicated cate id
							// display message
							$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_DUPLICATED_MESSAGE);
						} else if (returnedJsonData == INSERT_RESULT_FAILED) {
							// failed
							// display message
							$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE);
						}
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		} else if (currentMode == MODE_EDIT) {
			$.ajax({
				type: "POST",
				url: "updateNoteReport",
				data: { "noteReportStr": noteReportStr,
					"personId": personId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					if (returnedJsonData != "") {
						// display message
						$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + UPDATE_RESULT_SUCCESSFUL_MESSAGE);
					}
				}
			});
		}
	})

	/**************************************
	 *			button Export 
	 *************************************/
	$("#btnExport").click(function(){
		$(".alert").addClass("display-none");
		// variables definition
		var returnValue = "";
		var dataObject = null;
		// get search conditions
		dataObject = createSearchConditions();
		// make Ajax call to server to get data
		$.ajax({
			type: "POST",
			url: "exportData",
			contentType: "application/json",
			data: JSON.stringify(dataObject),
			async: false,
			success: function(returnedJsonData) {
				if (returnedJsonData != "") {
					$("#fileName").val(returnedJsonData);
				}
			},
			error: function(e) {
				// set return value
				returnValue = "";
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	$("#btnDownload").click(function(){
		var fileName = $("#fileName").val();
		var host = "http://"+window.location.host;
		var url = host + rootPath+"/resources/download/" + fileName;
		setTimeout(function() {
			$.ajax({
				type: "GET",
				url: "../down/xls",
				data: {"fileName": fileName},
				async: false,
				success: function(returnedJsonData) {
					if (returnedJsonData != "") {
						window.location = url;
						$('#modal-export').modal('hide');/*
						downloadfile(fileName);*/
					}
				},
				error: function(e) {
					// set return value
					returnValue = "";
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		},10000);
	});

	function downloadfile(data)
	  {  
		var host = "http://"+window.location.host;
		var url = host + "/" + rootPath+"/resources/download/" + data;

		var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
		a.download = filename; // Set the file name.
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		delete a;
		//document.getElementById('download_image').src = "";
		 document.getElementById('download_image').removeAttribute('src');
		};
		xhr.open('GET', url);
		xhr.send();

	}

	function download(filename, text) {
	    var element = document.createElement('a');
	    element.setAttribute('href', 'application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
	    element.setAttribute('download', rootPath + "/resources/download/" + filename);
	    element.style.display = 'none';
	    document.body.appendChild(element);
	    element.click();
	    document.body.removeChild(element);
	}

	function checlFileIsNotExist(filename) {
		$.ajax({
	        type: "HEAD",
	        async: true,
	        url: "http://localhost:8080/youth/resources/download/" + filename
	    }).done(function(){
	        console.log("found");
	    }).fail(function () {
	    	checlFileIsNotExist(filename);
	    })
	}

	/***************************
	 * 		Export file PDF
	 **************************/
	/*$(documnet).on("click","#btnExportDoc", function(){
		// person id
		var personId = $(this).attr('id');
		$.ajax({
			type: "POST",
			url: "downloadDocxFile",
			data: {"PersonId": personId},
			async: false,
			success: function(returnedJsonData) {
				if (returnedJsonData != "") {
					$("#fileName").val(returnedJsonData);
						xuat_hd_qrXmlSuccess(fileName);
				}
			},
			error: function(e) {
				// set return value
				returnValue = "";
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});*/
});