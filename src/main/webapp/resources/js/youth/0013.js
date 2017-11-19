/**
 * author Nghia Nguyen
 */

$(document).ready(function(){
	//--------------- Constants definition ---------------
	// number of items in one page in table
	var ITEM_IN_ONE_PAGE = 20;
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
	// variable to check whether cate edits password in EDIT Mode
	var isPasswordChanged = false;
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
			jWarning("Vui lòng chọn Quốc Gia", DIALOG_TITLE, DIALOG_OK_BUTTON);
			return false;
		}
		
		// city
		if ($("#cbbCity").find("option:selected").val() != STATUS_NO_SELECT) {
			$("#txtCityNamePopup").val($("#cbbCity").find("option:selected").text());
			$("#txtCityIdPopup").val($("#cbbCity").find("option:selected").val());
		} else {
			jWarning("Vui lòng chọn thành phố", DIALOG_TITLE, DIALOG_OK_BUTTON);
			return false;
		}
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
		// display cate info popup
		showPopup($("#popupWrapper"));
	});

	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox();
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
								optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
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
						$("#countryIdDefault").val("");
						$("#cityIdDefault").val("");
					} else {
						// reset empty combobox and disabled
						$("#cbbCity").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbCity").empty().append(optionStr);
			// disable combobox
			$("#cbbCity").prop("disabled", true);
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
		// district Code
		$("#txtDistrictCodePopup").val("");
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			$("#txtCountryNamePopup").val($("#cbbCountry").find("option:selected").text());
			$("#txtCountryIdPopup").val($("#cbbCountry").find("option:selected").val());
			$("#txtCityNamePopup").val($("#cbbCity").find("option:selected").text());
			$("#txtCityIdPopup").val($("#cbbCity").find("option:selected").val());
			// set current mode
			currentMode = MODE_NEW;
			$("#addNew").removeClass("display-none");
			$("#update").addClass("display-none");
			$("#txtCountryNamePopup").prop("disabled", true);
			$("#txtCityNamePopup").prop("disabled", true);
			// Specialized Id
			$("#txtDistrictIdPopup").prop("disabled", false);
			// Specialized Name
			$("#txtDistrictNamePopup").prop("disabled", false);
			// Specialized Code
			$("#txtDistrictCodePopup").prop("disabled", false);
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
			// Specialized Id
			$("#txtDistrictIdPopup").prop("disabled", false);
			// Specialized Name
			$("#txtDistrictNamePopup").prop("disabled", false);
			// Specialized Code
			$("#txtDistrictCodePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} 
	}
	// display current date
	$("#txtCurrentDate").text(getCurrentDate() + " (" + DAY_OF_WEEK + ") " + getCurrentTime());
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
				$("#btnFirst").addClass("page-number-first_dis");
				$("#btnPrevious").addClass("page-number-pre_dis");
				$("#btnNext").addClass("page-number-next_dis");
				$("#btnLast").addClass("page-number-last_dis");
				$("#txtGoToPage").prop("readonly", true);
			} else {
				if (currentPage == 1) {
					$("#btnFirst").addClass("page-number-first_dis");
					$("#btnPrevious").addClass("page-number-pre_dis");
					$("#btnNext").removeClass("page-number-next_dis");
					$("#btnLast").removeClass("page-number-last_dis");
				}
				if (currentPage > 1 && currentPage < maxPage) {
					$("#btnFirst").removeClass("page-number-first_dis");
					$("#btnPrevious").removeClass("page-number-pre_dis");
					$("#btnNext").removeClass("page-number-next_dis");
					$("#btnLast").removeClass("page-number-last_dis");
				}
				if (currentPage == maxPage) {
					$("#btnFirst").removeClass("page-number-first_dis");
					$("#btnPrevious").removeClass("page-number-pre_dis");
					$("#btnNext").addClass("page-number-next_dis");
					$("#btnLast").addClass("page-number-last_dis");
				}
				$("#txtGoToPage").prop("readonly", false);
			}
		} else {
			$("#btnFirst").addClass("page-number-first_dis");
			$("#btnPrevious").addClass("page-number-pre_dis");
			$("#btnNext").addClass("page-number-next_dis");
			$("#btnLast").addClass("page-number-last_dis");
			$("#txtGoToPage").prop("readonly", true);
		}
		$("#txtGoToPage").val("");
		$("#btnGoToPage").prop("disabled", true);
		$("#btnGoToPage").css("cursor", "default");
	}

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


	// Register button in popup click event process
	$("#btnRegisterPopup").bind("click", function() {
		var dataObject = null;
		// check current mode
		if (currentMode == MODE_NEW) {
			// check for cate Name input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			}  else {
				// insert new cate to DB
				// get cate input data
				dataObject = createCityDataObject();
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
								jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							} else if (returnedJsonData == VALIDATE_WRONG_FORMAT) {
								// id is in wrong format
								// display message
								jWarning(VALIDATE_WRONG_FORMAT_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
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
								// hide popup
								hidePopup($("#popupWrapper"));
								// display message
								jInfo(INSERT_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
								// duplicated cate id
								// display message
								jWarning(INSERT_RESULT_DUPLICATED_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							} else if (returnedJsonData == INSERT_RESULT_FAILED) {
								// failed
								// display message
								jWarning(INSERT_RESULT_FAILED_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							}
						}
					},
					error: function(e) {
						// display error message
						jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					}
				});
			}
		} else if (currentMode == MODE_EDIT) {
			// check for cate input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			} else {
				// update existing cate in DB
				// get cate input data
				dataObject = createCityDataObject();
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
								jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							} else if (returnedJsonData == UPDATE_RESULT_SUCCESSFUL) {
								// update the corresponding cate data in search table
								// make Ajax call to server to get data
								$.ajax({
									url: "getSingleData",
									data: { "districtId": $("#txtDistrictIdPopup").val() },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// District Code
											$("#row" + selectedRowIndex).find("td").eq(0).text(returnedJsonData.districtCode);
											// District name
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.districtName);
										}
									},
									complete: function(jqXHR, textStatus) {
										// hide popup
										hidePopup($("#popupWrapper"));
										// display message
										jInfo(UPDATE_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
									}
								});
							} else if (returnedJsonData == UPDATE_RESULT_FAILED) {
								// failed
								// display message
								jWarning(UPDATE_RESULT_FAILED_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
							}
						}
					},
					error: function(e) {
						// display error message
						jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
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
		return {
			countryId: countryId,
			cityId: cityId,
			districtCode: $("#txtCityCode").val(),
			districtName: $("#txtCityName").val(),
			fromRow: from,
			itemCount: ITEM_IN_ONE_PAGE
		};
	}
	// Draw cate data table based on search conditions
	function drawTable() {
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
						jWarning(SEARCH_RESULT_OUT_OF_MEMORY_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					} else {
						// calculate max page
						var calculatedResultOdd = parseInt(totalResultCount) % parseInt(ITEM_IN_ONE_PAGE);
						var calculatedResult = Math.floor(parseInt(totalResultCount) / parseInt(ITEM_IN_ONE_PAGE));
						maxPage = (calculatedResultOdd == 0) ? calculatedResult : (calculatedResult + 1);
						// update pager
						$("#lblCurrentPage").text(currentPage);
						$("#lblMaxPage").text(maxPage);
						// clear table
						$("#tblBody").find("tbody").remove();
						// create table starts
						var tableStringArray = [];
						// add tbody open tag
						tableStringArray.push("<tbody>");
						for (var i = 0; i < returnedJsonData.length; i++) {
							// row open tag
							tableStringArray.push("<tr id='row" + i + "'>");
							// district Code
							tableStringArray.push("<td class='align-center goTo0014' id= '"+returnedJsonData[i].cityId+"' name = '"+returnedJsonData[i].countryId+"' districtId = '"+returnedJsonData[i].districtId+"'>" + returnedJsonData[i].districtCode + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].cityId + "' >" + returnedJsonData[i].districtName + "</td>");
							// update icon
							tableStringArray.push("<td><span style='color: #1cec1c;' class='glyphicon glyphicon-edit edit cursor-pointer' name='" + i + "'></span></td>");
							// delete icon
							tableStringArray.push("<td><span style='color: red;' class='glyphicon glyphicon-remove delete cursor-pointer' name='" + i + "'></span></td>");
							// row close tag
							tableStringArray.push("</tr>");
						}
						// add tbody close tag
						tableStringArray.push("</tbody>");
						// append all created string to table
						$("#tblBody").append(tableStringArray.join(''));
						// show search result
						$(".cont-box").removeClass("display-none");
						$("#divHead").removeClass("display-none");

						$(".pager").removeClass("display-none");
						// fix table header and body when scrolling only the table body
						fixTable();
						// fix table height to fit page
						var tableHeight = calculateTableHeight();
						$("#divBody").height(320);
						// update total data count UI
						setDataCounts();
					    setPagerStatus();
					    // scroll to top of table
						$("#divBody").scrollTop(0).scrollLeft(0);
					}
				} else {
					// display error message
					jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					// update pager
					$("#lblCurrentPage").text("0");
					$("#lblMaxPage").text("0");
					$("#divHead").addClass("display-none");

					$(".pager").addClass("display-none");
					// clear table
					$("#tblBody").find("tbody").remove();
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
				jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			}
		});
		return returnValue;
	}
	
	// cate data object creation process, to use in Updating and Inserting cate
	function createCityDataObject() {
		return {
			countryId: $("#txtCountryIdPopup").val(),
			cityId: $("#txtCityIdPopup").val(),
			districtId: $("#txtDistrictIdPopup").val(),
			districtCode: $("#txtDistrictCodePopup").val(),
			districtName: $("#txtDistrictNamePopup").val(),
		};
	}

	// Delete cate click event process
	$(document).on("click", ".delete", function() {
		// display confirmation message
		var selection = confirm(DELETE_CONFIRM_MESSAGE);
		if (selection) {
			// get row index
			selectedRowIndex = $(this).attr("name");
			// get id of selected cate
			districtIdPopup = $("#row" + selectedRowIndex).find("td").eq(0).attr("districtId");
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "districtId": districtIdPopup },
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
							jInfo(DELETE_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
						} else if (returnedJsonData == DELETE_RESULT_FAILED) {
							// failed
							// display message
							jWarning(DELETE_RESULT_FAILED_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
						}
					}
				},
				error: function(e) {
					// display error message
					jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
				}
			});
		}
	});

	$(document).on("click", ".edit", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected cate
		districtIdPopup = $("#row" + selectedRowIndex).find("td").eq(0).attr("districtId");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "districtId": districtIdPopup },
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
					// district id
					$("#txtDistrictCodePopup").val(returnedJsonData.districtCode);
					// university id
					$("#txtDistrictIdPopup").val(returnedJsonData.districtId);
					// university name
					$("#txtDistrictNamePopup").val(returnedJsonData.districtName);
					// change state of controls in popup based on mode
					setPopupControlState(MODE_EDIT);
				}
			},
			error: function(e) {
				// display error message
				jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			},
			complete: function(jqXHR, textStatus) {
				// display cate info popup
				showPopup($("#popupWrapper"));
			}
		});
	});

	// Reset search conditions process
	function resetSearchConditions() {
		$("#txtCountryNamePopup").val("");
		$("#txtCityNamePopup").val("");
		$("#txtDistrictIdPopup").val("");
		$("#txtDistrictCodePopup").val("");
		$("#txtDistrictNamePopup").val("");
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtDistrictNamePopup").val() == "" || $("#txtDistrictCodePopup").val() == "") {
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

		// country
		var cityIdDefault = $("#cityIdDefault").val();
		if (cityData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < cityData.length; i++) {
				if (cityIdDefault != "") {
					if (cityIdDefault == cityData[i].cityId) {
						optionStr += "<option value='" + cityData[i].cityId + "' selected = 'selected'>" + cityData[i].cityName + "</option>";
						$('#textcityName').text(cityData[i].cityName);
					} else {
						optionStr += "<option value='" + cityData[i].cityId + "'>" + cityData[i].cityName + "</option>";
					}
				} else {
					if (i == 0) {
						optionStr += "<option value='" + cityData[i].cityId + "' selected = 'selected'>" + cityData[i].cityName + "</option>";
						$('#textCityName').text(cityData[i].cityName);
					} else {
						optionStr += "<option value='" + cityData[i].cityId + "'>" + cityData[i].cityName + "</option>";	
					}
				}
			}
			// check whether to fill data in main screen or popup screen
			if (!isPopupMode) {
				$("#cbbCity > ").empty()
				$("#cbbCity").append(optionStr);
				drawTable();
			} 
		}
	}

	$(document).on("click", ".goTo0014", function() {
		// farm Id
		var countryId = $(this).attr('name');
		var cityId = $(this).attr('id');
		var districtId = $(this).attr('districtId');
		$('<form>', {
			"id": "formTranfer",
			"html": '<input type="hidden" id="countryId" name="countryId" value="' + countryId + '"   />' +
					'<input type="hidden" id="cityId" name="cityId" value="' + cityId + '"   />' +
					'<input type="hidden" id="districtId" name="districtId" value="' + districtId + '"   />'	,
			"method": 'POST',
			"action": 'changePage'
		}).appendTo(document.body).submit();
	});
})