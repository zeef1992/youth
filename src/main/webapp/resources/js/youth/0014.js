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
	initComboboxData(false);
	// Register cate click event process
	$("#btnRegister").bind("click", function() {
		// clear all current text of popup controls
		clearPopupControl(); 
		// change state of controls in popup based on mode
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
			$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + "Vui lòng chọn Quận/Huyện");
			return false;
		}
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
	});
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox();
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		$('#textCityName').text($(this).find("option:selected").text());
		loadDistrictDataByCityId();
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
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
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
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
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
						loadDistrictDataByCityId();
					} else {
						// reset empty combobox and disabled
						$("#cbbCity").empty().append(optionStr).prop("disabled", true);
						$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbCity").empty().append(optionStr);
			$("#cbbDistrict").empty().append(optionStr);
			// disable combobox
			$("#cbbCity").prop("disabled", true);
			$("#cbbDistrict").prop("disabled", true);
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
					} else {
						$("#cbbDistrict").empty().append(optionStr).prop("disabled", true);
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
		$("#txtdistrictIdPopup").val("");
		// district Name
		$("#txtdistrictNamePopup").val("");
		// wards
		$("#txtWardsIdPopup").val("");
		// wards Name
		$("#txtWardsNamePopup").val("");
		// wards Code
		$("#txtWardsCodePopup").val("");
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			$("#txtCountryNamePopup").val($("#cbbCountry").find("option:selected").text());
			$("#txtCountryIdPopup").val($("#cbbCountry").find("option:selected").val());
			$("#txtCityNamePopup").val($("#cbbCity").find("option:selected").text());
			$("#txtCityIdPopup").val($("#cbbCity").find("option:selected").val());
			$("#txtDistrictNamePopup").val($("#cbbDistrict").find("option:selected").text());
			$("#txtDistrictIdPopup").val($("#cbbDistrict").find("option:selected").val());
			// set current mode
			currentMode = MODE_NEW;
			$("#addNew").removeClass("display-none");
			$("#update").addClass("display-none");
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			// Specialized Id
			$("#txtWardsIdPopup").prop("disabled", false);
			// Specialized Name
			$("#txtWardsNamePopup").prop("disabled", false);
			// Specialized Code
			$("#txtWardsCodePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
			// set current mode
			currentMode = MODE_EDIT;
			// reset flag
			isPasswordChanged = false;
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			// Specialized Id
			$("#txtWardsIdPopup").prop("disabled", false);
			// Specialized Name
			$("#txtWardsNamePopup").prop("disabled", false);
			// Specialized Code
			$("#txtWardsCodePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
			// set current mode
			currentMode = MODE_VIEW;
			// reset flag
			isPasswordChanged = false;
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			$("#txtDistrictNamePopup").prop("disabled", true);
			// Specialized Id
			$("#txtWardsIdPopup").prop("disabled", true);
			// Specialized Name
			$("#txtWardsNamePopup").prop("disabled", true);
			// Specialized Code
			$("#txtWardsCodePopup").prop("disabled", true);
			// register button
			$("#btnRegisterPopup").show();
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
				dataObject = createWardsDataObject();
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
				dataObject = createWardsDataObject();
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
									data: { "wardsId": $("#txtWardsIdPopup").val() },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// District Code
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.wardsCode);
											// District name
											$("#row" + selectedRowIndex).find("td").eq(2).text(returnedJsonData.wardsName);
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
			countryId = countryIdDefault;
		}
		// city
		var cityIdDefault = $("#cityIdDefault").val();
		var cityId = $("#cbbCity").val();
		if (cityIdDefault != "") {
			cityId = cityIdDefault;
		}
		// dsitrict Id
		var districtIdDefault = $("#districtIdDefault").val();
		var districtId = $("#cbbDistrict").val();
		if (districtIdDefault != "") {
			districtId = districtIdDefault;
		}
		return {
			countryId: countryId,
			cityId: cityId,
			districtId: districtId,
			wardsCode: $("#txtWardsCode").val(),
			wardsName: $("#txtWardsName").val(),
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
					$("#countryIdDefault").val("");
					$("#cityIdDefault").val("");
					$("#districtIdDefault").val("");
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
							tableStringArray.push("<td class='align-center text-red goTo0015' id= '"+returnedJsonData[i].cityId+"' name = '"+returnedJsonData[i].countryId+"' districtId = '"+returnedJsonData[i].districtId+"' wardsId = '"+returnedJsonData[i].wardsId+"'>" + returnedJsonData[i].wardsCode + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].wardsId + "' >" + returnedJsonData[i].wardsName + "</td>");
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
	function createWardsDataObject() {
		return {
			countryId: $("#txtCountryIdPopup").val(),
			cityId: $("#txtCityIdPopup").val(),
			districtId: $("#cbbDistrict").find("option:selected").val(),
			wardsId: $("#txtWardsIdPopup").val(),
			wardsCode: $("#txtWardsCodePopup").val(),
			wardsName: $("#txtWardsNamePopup").val(),
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
			wardsIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("wardsId");
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "wardsId": wardsIdPopup },
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
		districtIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("wardsId");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "wardsId": districtIdPopup },
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
					// district id
					$("#txtWardsCodePopup").val(returnedJsonData.wardsCode);
					// university id
					$("#txtWardsIdPopup").val(returnedJsonData.wardsId);
					// university name
					$("#txtWardsNamePopup").val(returnedJsonData.wardsName);
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
		districtIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).attr("wardsId");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "wardsId": districtIdPopup },
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
					// district id
					$("#txtWardsCodePopup").val(returnedJsonData.wardsCode);
					// university id
					$("#txtWardsIdPopup").val(returnedJsonData.wardsId);
					// university name
					$("#txtWardsNamePopup").val(returnedJsonData.wardsName);
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
		$("#txtWardsIdPopup").val("");
		$("#txtWardsCodePopup").val("");
		$("#txtWardsNamePopup").val("");
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtWardsNamePopup").val() == "" || $("#txtWardsCodePopup").val() == "") {
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

	$(document).on("click", ".goTo0015", function() {
		// farm Id
		var countryId = $(this).attr('name');
		var cityId = $(this).attr('id');
		var districtId = $(this).attr('districtId');
		var wardsId = $(this).attr('wardsId');
		$('<form>', {
			"id": "formTranfer",
			"html": '<input type="hidden" id="countryId" name="countryId" value="' + countryId + '"   />' +
					'<input type="hidden" id="cityId" name="cityId" value="' + cityId + '"   />' +
					'<input type="hidden" id="districtId" name="districtId" value="' + districtId + '"   />' +
					'<input type="hidden" id="wardsId" name="wardsId" value="' + wardsId + '"   />'	,
			"method": 'POST',
			"action": 'changePage'
		}).appendTo(document.body).submit();
	});
})