/**
 * author Nghia Nguyen
 */

$(document).ready(function(){
	//--------------- Constants definition ---------------
	// number of items in one page in table
	var ITEM_IN_ONE_PAGE = 1;
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
	
	initComboboxData(false);
	// Register cate click event process
	$("#btnRegister").bind("click", function() {
		$(".alert").addClass("display-none");
		// clear all current text of popup controls
		clearPopupControl(); 
		// change state of controls in popup based on mode
		// country
		if ($("#cbbCountry").find("option:selected").val() != STATUS_NO_SELECT ) {
			$("#txtCountryNamePopup").val($("#cbbCountry").find("option:selected").text());
			$("#txtCountryIdPopup").val($("#cbbCountry").find("option:selected").val());
		} else {
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "Vui lòng chọn Quốc Gia");
			return false;
		}
		
		// city
		if ($("#cbbCity").find("option:selected").val() != STATUS_NO_SELECT) {
			$("#txtCityNamePopup").val($("#cbbCity").find("option:selected").text());
			$("#txtCityIdPopup").val($("#cbbCity").find("option:selected").val());
		} else {
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "Vui lòng chọn thành phố");
			return false;
		}
		
		// district
		if ($("#cbbDistrict").find("option:selected").val() != STATUS_NO_SELECT) {
			$("#txtDistrictNamePopup").val($("#cbbDistrict").find("option:selected").text());
			$("#txtDistrictIdPopup").val($("#cbbDistrict").find("option:selected").val());
		} else {
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "vui lòng chọn Quận/Huyện");
			return false;
		}
		
		// wards
		if ($("#cbbWards").find("option:selected").val() != STATUS_NO_SELECT) {
			$("#txtWardsNamePopup").val($("#cbbWards").find("option:selected").text());
			$("#txtWardsIdPopup").val($("#cbbWards").find("option:selected").val());
		} else {
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "vui lòng chọn Quận/Huyện");
			return false;
		}
		
		// Town	
		if ($("#cbbTown").find("option:selected").val() != STATUS_NO_SELECT) {
			$("#txtTownNamePopup").val($("#cbbTown").find("option:selected").text());
			$("#txtTownIdPopup").val($("#cbbTown").find("option:selected").val());
		} else {
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "vui lòng chọn khu phố");
			return false;
		}
		setPopupControlState(MODE_NEW);
	});
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox(false);
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		$('#textCityName').text($(this).find("option:selected").text());
		loadDistrictDataByCityId();
	});

	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		$('#textDistrictName').text($(this).find("option:selected").text());
		loadWardsDataByDistrictId();
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		$('#textWardsName').text($(this).find("option:selected").text());
		loadTownDataByWardsId();
	});

	// Load Area name combobox data
	function loadCityDataCombobox() {
		// get farm id selected by user
		var countryIdDefault = $("#countryIdDefault").val();
		var cityIdDefault = $("#cityIdDefault").val();
		var selectedCountryId = "";
		// if countryIdDefault != "" then set selectedCountryId = countryIdDefault
		if (countryIdDefault != "") {
			selectedCountryId = countryIdDefault;
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
							if (cityIdDefault == "") {
								if (i == 0) {
									optionStr += "<option value='" + returnedJsonData[i].cityId + "' selected = 'selected'>" + returnedJsonData[i].cityName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
								}
							} else {
								if (returnedJsonData[i].cityId == cityIdDefault) {
									optionStr += "<option value='" + returnedJsonData[i].cityId + "' selected = 'selected'>" + returnedJsonData[i].cityName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
								}
							}
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
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
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
		}
	}

	function loadDistrictDataByCityId() {

		// get farm id selected by user
		var countryIdDefault = $("#countryIdDefault").val();
		var cityIdDefault = $("#cityIdDefault").val();
		var districtIdDefault = $("#districtIdDefault").val();
		var selectedCountryId = "";
		// if countryIdDefault != "" then set selectedCountryId = countryIdDefault
		if (countryIdDefault != "") {
			selectedCountryId = countryIdDefault;
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		}
		// get cityId
		var selectCityId = "";
		if (cityIdDefault != "") {
			selectCityId = cityIdDefault;
		} else {
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
							if (cityIdDefault == "") {
								if (i == 0) {
									optionStr += "<option value='" + returnedJsonData[i].districtId + "' selected = 'selected'>" + returnedJsonData[i].districtName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
								}
							} else {
								if (returnedJsonData[i].districtId == districtIdDefault) {
									optionStr += "<option value='" + returnedJsonData[i].districtId + "' selected = 'selected'>" + returnedJsonData[i].districtName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
								}
							}
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
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		} else {
			// clear & disable combobox
			$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
			$("#cbbWards").empty().append(optionStr).prop("disabled", true);
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadWardsDataByDistrictId() {
		// get farm id selected by user
		var countryIdDefault = $("#countryIdDefault").val();
		var cityIdDefault = $("#cityIdDefault").val();
		var districtIdDefault = $("#districtIdDefault").val();
		var wardsIdDefault = $("#wardsIdDefault").val();
		var selectedCountryId = "";
		// if countryIdDefault != "" then set selectedCountryId = countryIdDefault
		if (countryIdDefault != "") {
			selectedCountryId = countryIdDefault;
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		}
		// get cityId
		var selectCityId = "";
		if (cityIdDefault != "") {
			selectCityId = cityIdDefault;
		} else {
			selectCityId = $("#cbbCity").find("option:selected").val(); 
		}
		// get District
		var selectDistrictId = ""
		if (districtIdDefault != "") {
			selectDistrictId = districtIdDefault;
		} else {
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
							if (wardsIdDefault == "") {
								if (i == 0) {
									optionStr += "<option value='" + returnedJsonData[i].wardsId + "' selected = 'selected'>" + returnedJsonData[i].wardsName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
								}
							} else {
								if (returnedJsonData[i].wardsId == wardsIdDefault) {
									optionStr += "<option value='" + returnedJsonData[i].wardsId + "' selected = 'selected'>" + returnedJsonData[i].wardsName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
								}
							}
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
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbWards").empty().append(optionStr).prop("disabled", true);
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadTownDataByWardsId() {
		// get farm id selected by user
		var countryIdDefault = $("#countryIdDefault").val();
		var cityIdDefault = $("#cityIdDefault").val();
		var districtIdDefault = $("#districtIdDefault").val();
		var wardsIdDefault = $("#wardsIdDefault").val();
		var townIdDefault = $("#townIdDefault").val();
		var selectedCountryId = "";
		// if countryIdDefault != "" then set selectedCountryId = countryIdDefault
		if (countryIdDefault != "") {
			selectedCountryId = countryIdDefault;
		} else {
			selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		}
		// get cityId
		var selectCityId = "";
		if (cityIdDefault != "") {
			selectCityId = cityIdDefault;
		} else {
			selectCityId = $("#cbbCity").find("option:selected").val(); 
		}
		// get District
		var selectDistrictId = ""
		if (districtIdDefault != "") {
			selectDistrictId = districtIdDefault;
		} else {
			selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		}
		// get Wards
		var selectWardsId = ""
		if (wardsIdDefault != "") {
			selectWardsId = wardsIdDefault;
		} else {
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
							if (wardsIdDefault == "") {
								if (i == 0) {
									optionStr += "<option value='" + returnedJsonData[i].townId + "' selected = 'selected'>" + returnedJsonData[i].townName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
								}
							} else {
								if (returnedJsonData[i].townId == townIdDefault) {
									optionStr += "<option value='" + returnedJsonData[i].townId + "' selected = 'selected'>" + returnedJsonData[i].townName + "</option>";
								} else {
									optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
								}
							}
						}
					}
					// set options to combobox
					$("#cbbTown").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbTown").prop("disabled", false);
						// get farm id selected by user
						$("#countryIdDefault").val("");
						$("#cityIdDefault").val("");
						$("#districtIdDefault").val("");
						$("#wardsIdDefault").val("");
						$("#townIdDefault").val("");
						//loadDistrictDataByCityId();
					} else {
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
		}
	}

	// Clear all current text of popup controls
	function clearPopupControl() {
		// country Name
		$("#txtCountryNamePopup").val("");
		// country Id
		$("#txtCountryIdPopup").val("");
		// city Id
		$("#txtCityIdPopup").val("");
		// city Name
		$("#txtCityNamePopup").val("");
		// district Id
		$("#txtDistrictIdPopup").val("");
		// district Name
		$("#txtDistrictNamePopup").val("");
		// wards Id
		$("#txtWardsIdPopup").val("");
		// wards Name
		$("#txtWardsNamePopup").val("");
		// town Id
		$("#txtTownIdPopup").val("");
		// town Name
		$("#txtTownNamePopup").val("");
		// Groups
		$("#txtGroupsIdPopup").val("");
		// Groups Name
		$("#txtGroupsNamePopup").val("");
		// Groups Code
		$("#txtGroupsCodePopup").val("");
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			$("#txtWardsNamePopup").prop("disabled", true);
			$("#txtTownNamePopup").prop("disabled", true);
			// Groups Id
			$("#txtGroupsIdPopup").prop("disabled", false);
			// Groups Name
			$("#txtGroupsNamePopup").prop("disabled", false);
			// Groups Code
			$("#txtGroupsCodePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
			// reset flag
			isPasswordChanged = false;
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			$("#txtWardsNamePopup").prop("disabled", true);
			$("#txtTownNamePopup").prop("disabled", true);
			// Groups Id
			$("#txtGroupsIdPopup").prop("disabled", false);
			// Groups Name
			$("#txtGroupsNamePopup").prop("disabled", false);
			// Groups Code
			$("#txtGroupsCodePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			// set current mode
			currentMode = MODE_VIEW;
			// reset flag
			isPasswordChanged = false;
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			$("#txtWardsNamePopup").prop("disabled", true);
			$("#txtTownNamePopup").prop("disabled", true);
			// Groups Id
			$("#txtGroupsIdPopup").prop("disabled", true);
			// Groups Name
			$("#txtGroupsNamePopup").prop("disabled", true);
			// Groups Code
			$("#txtGroupsCodePopup").prop("disabled", true);
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
				dataObject = createTownDataObject();
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
				dataObject = createTownDataObject();
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
									data: { "groupsId": $("#txtGroupsIdPopup").val() },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// District Code
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.groupsCode);
											// District name
											$("#row" + selectedRowIndex).find("td").eq(2).text(returnedJsonData.groupsName);
											// Update by
											$("#row" + selectedRowIndex).find("td").eq(4).text(returnedJsonData.updateUserId);
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
		// country Id
		var countryIdDefault = $("#countryIdDefault").val();
		var countryId = $("#cbbCountry").val();
		if (countryIdDefault != "") {
			if (countryIdDefault != "") {
				if (countryId != null) {
					countryId = countryIdDefault;
				} else {
					countryId = STATUS_NO_SELECT;
				}
			}
		}
		// city
		var cityIdDefault = $("#cityIdDefault").val();
		var cityId = $("#cbbCity").val();
		if (cityIdDefault != "") {
			if (cityId != null) {
				cityId = cityIdDefault;
			} else {
				cityId = STATUS_NO_SELECT;
			}
		}
		// dsitrict Id
		var districtIdDefault = $("#districtIdDefault").val();
		var districtId = $("#cbbDistrict").val();
		if (districtIdDefault != "") {
			if (districtId != null) {
				districtId = districtIdDefault;
			} else {
				districtId = STATUS_NO_SELECT;
			}
			
		}
		// wards Id
		var wardsIdDefault = $("#wardsIdDefault").val();
		var wardsId = $("#cbbWards").val();
		if (wardsIdDefault != "") {
			if (wardsIdDefault != "") {
				if (wardsId != null) {
					wardsId = wardsIdDefault;
				} else {
					wardsId = STATUS_NO_SELECT;
				}
			}
		}
		// town Id
		var townIdDefault = $("#townIdDefault").val();
		var townId = $("#cbbTown").val();
		if (townIdDefault != "") {
			if (townIdDefault != "") {
				if (wardsId != null) {
					townId = townIdDefault;
				} else {
					townId = STATUS_NO_SELECT;
				}
			}
		}
		return {
			countryId: countryId,
			cityId: cityId,
			districtId: districtId,
			wardsId: wardsId,
			townId: townId,
			groupsCode: $("#txtGroupsCode").val(),
			groupsName: $("#txtGroupsName").val(),
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
							// district Code
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].cityId+"' name = '"+returnedJsonData[i].groupsId+"' districtId = '"+returnedJsonData[i].districtId+"' wardsId = '"+returnedJsonData[i].wardsId+"'  townId = '"+returnedJsonData[i].townId+"' groupsId = '"+returnedJsonData[i].groupsId+"'>" + returnedJsonData[i].groupsCode + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].groupsId + "' >" + returnedJsonData[i].groupsName + "</td>");
							// create By
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].createUserId + "</td>");
							// update by
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].updateUserId + "</td>");
							// Button
							tableStringArray.push('<td><div class="btn-group">'+
								'<button type="button" class="btn bg-info">Action</button>'+
								'<button type="button"'+
									'class="btn bg-info dropdown-toggle"'+
									'data-toggle="dropdown">'+
									'<span class="caret"></span> <span class="sr-only">Toggle'+
										'Dropdown</span>'+
								'</button>'+
								'<ul class="dropdown-menu" role="menu">'+
									'<li><a class = "edit" data-toggle="modal"'+
										'data-target="#modal-default" name="' + i + '">Edit</a></li>'+
									'<li><a class = "view"  data-toggle="modal"'+
									'data-target="#modal-default" name="' + i + '">View</a></li>'+
									'<li><a class = "delete" name="' + i + '">Delete</a></li>'+
								'</ul>');
							// row close tag
							tableStringArray.push("</tr>");
						}
						// add tbody close tag
						tableStringArray.push("</tbody>");
						// append all created string to table
						$("#example2").append(tableStringArray.join(''));
						$(".pager").removeClass("display-none");
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
	function createTownDataObject() {
		return {
			countryId: $("#txtCountryIdPopup").val(),
			cityId: $("#txtCityIdPopup").val(),
			districtId: $("#cbbDistrict").find("option:selected").val(),
			wardsId: $("#cbbWards").find("option:selected").val(),
			townId: $("#cbbTown").find("option:selected").val(),
			groupsId: $("#txtGroupsIdPopup").val(),
			groupsCode: $("#txtGroupsCodePopup").val(),
			groupsName: $("#txtGroupsNamePopup").val(),
		};
	}

	// Delete cate click event process
	$(document).on("click", ".delete", function() {
		countStt = 0;
		// get row index
		selectedRowIndex = $(this).attr("name");
		// display confirmation message
		jQuestion_warning(DELETE_CONFIRM_MESSAGE, DIALOG_TITLE, DIALOG_YES_BUTTON, DIALOG_NO_BUTTON, function(val) {
			if (val) {
			// get id of selected cate
			groupsIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("groupsId");
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "groupsId": groupsIdPopup },
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
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected cate
		groupsIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("groupsId");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "groupsId": groupsIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();
					if (countryData != "") {
						for (var i = 0; i < countryData.length; i++) {
							if (countryData[i].countryId == returnedJsonData.countryId) {
								$("#txtCountryNamePopup").val(countryData[i].countryName);
								$("#txtCountryIdPopup").val(countryData[i].countryId);
							}
						}
					}
					if (cityData != "") {
						for (var i = 0; i < cityData.length; i++) {
							if (cityData[i].cityId == returnedJsonData.cityId) {
								$("#txtCityNamePopup").val(cityData[i].cityName);
								$("#txtCityIdPopup").val(cityData[i].cityId);
							}
						}
					}
					if (districtData != "") {
						for (var i = 0; i < districtData.length; i++) {
							if (districtData[i].districtId == returnedJsonData.districtId) {
								$("#txtDistrictNamePopup").val(districtData[i].districtName);
								$("#txtDistrictIdPopup").val(districtData[i].districtId);
							}
						}
					}
					if (wardsData != "") {
						for (var i = 0; i < wardsData.length; i++) {
							if (wardsData[i].wardsId == returnedJsonData.wardsId) {
								$("#txtWardsNamePopup").val(wardsData[i].wardsName);
								$("#txtWardsIdPopup").val(wardsData[i].wardsId);
							}
						}
					}
					if (townData != "") {
						for (var i = 0; i < townData.length; i++) {
							if (townData[i].townId == returnedJsonData.townId) {
								$("#txtTownNamePopup").val(townData[i].townName);
								$("#txtTownIdPopup").val(townData[i].townId);
							}
						}
					}
					// groups code
					$("#txtGroupsCodePopup").val(returnedJsonData.groupsCode);
					// groups id
					$("#txtGroupsIdPopup").val(returnedJsonData.groupsId);
					// groups name
					$("#txtGroupsNamePopup").val(returnedJsonData.groupsName);
					 
					// change state of controls in popup based on mode
					setPopupControlState(MODE_EDIT);
				}
			},
			error: function(e) {
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	$(document).on("click", ".view", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected cate
		groupsIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("groupsId");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "groupsId": groupsIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();
					if (countryData != "") {
						for (var i = 0; i < countryData.length; i++) {
							if (countryData[i].countryId == returnedJsonData.countryId) {
								$("#txtCountryNamePopup").val(countryData[i].countryName);
								$("#txtCountryIdPopup").val(countryData[i].countryId);
							}
						}
					}
					if (cityData != "") {
						for (var i = 0; i < cityData.length; i++) {
							if (cityData[i].cityId == returnedJsonData.cityId) {
								$("#txtCityNamePopup").val(cityData[i].cityName);
								$("#txtCityIdPopup").val(cityData[i].cityId);
							}
						}
					}
					if (districtData != "") {
						for (var i = 0; i < districtData.length; i++) {
							if (districtData[i].districtId == returnedJsonData.districtId) {
								$("#txtDistrictNamePopup").val(districtData[i].districtName);
								$("#txtDistrictIdPopup").val(districtData[i].districtId);
							}
						}
					}
					if (wardsData != "") {
						for (var i = 0; i < wardsData.length; i++) {
							if (wardsData[i].wardsId == returnedJsonData.wardsId) {
								$("#txtWardsNamePopup").val(wardsData[i].wardsName);
								$("#txtWardsIdPopup").val(wardsData[i].wardsId);
							}
						}
					}
					if (townData != "") {
						for (var i = 0; i < townData.length; i++) {
							if (townData[i].townId == returnedJsonData.townId) {
								$("#txtTownNamePopup").val(townData[i].townName);
								$("#txtTownIdPopup").val(townData[i].townId);
							}
						}
					}
					// groups code
					$("#txtGroupsCodePopup").val(returnedJsonData.groupsCode);
					// groups id
					$("#txtGroupsIdPopup").val(returnedJsonData.groupsId);
					// groups name
					$("#txtGroupsNamePopup").val(returnedJsonData.groupsName);
					 
					// change state of controls in popup based on mode
					setPopupControlState(MODE_VIEW);
				}
			},
			error: function(e) {
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	// Reset search conditions process
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
		var countryIdDefault = $("#countryIdDefault").val();
		if (countryData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < countryData.length; i++) {
				if (countryIdDefault != "") {
					if (countryIdDefault == countryData[i].countryId) {
						optionStr += "<option value='" + countryData[i].countryId + "' selected = 'selected'>" + countryData[i].countryName + "</option>";
						$('#textCountryName').text(countryData[i].countryName);
					} else {
						optionStr += "<option value='" + countryData[i].countryId + "'>" + countryData[i].countryName + "</option>";
					}
				} else {
					if (i == 0) {
						optionStr += "<option value='" + countryData[i].countryId + "' selected = 'selected'>" + countryData[i].countryName + "</option>";
						$('#textCountryName').text(countryData[i].countryName);
					} else {
						optionStr += "<option value='" + countryData[i].countryId + "'>" + countryData[i].countryName + "</option>";	
					}
				}
			}
			// check whether to fill data in main screen or popup screen
			if (!isPopupMode) {
				$("#cbbCountry > ").empty()
				$("#cbbCountry").append(optionStr);
			} 
		}
		loadCityDataCombobox();
		drawTable();
	}
})