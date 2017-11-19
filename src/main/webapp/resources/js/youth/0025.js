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
	initDetailReportNameComboboxData(false);
	// Country name combobox change event process
	$("#cbbReport").bind("change", function() {
		// load Area name combobox
		loadDetailReportDataCombobox();
	});
	// Register cate click event process
	$("#btnRegister").bind("click", function() {
		// clear all current text of popup controls
		if ($("#cbbDetailReport").find("option:selected").val() == STATUS_NO_SELECT) {
			// display error message
			jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			return false;
		}
		clearPopupControl(); 
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
		// display cate info popup
		showPopup($("#popupWrapper"));
	});
	// Clear all current text of popup controls
	function clearPopupControl() {
		// cate id
		$("#txtCriteriaIdPopup").val("");
		// cate name
		$("#txtCriteriaNamePopup").val("");
		// status
		$("#chbDeletePopup").prop("checked", false);
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			$("#addNew").removeClass("display-none");
			$("#update").addClass("display-none");
			// report id
			$("#txtReportIdPopup").val($("#cbbReport").find("option:selected").val());
			$("#txtReportIdPopup").prop("disabled", true);
			// report name
			$("#txtReportNamePopup").val($("#cbbReport").find("option:selected").text());
			$("#txtReportNamePopup").prop("disabled", true);
			// detail report id
			$("#txtDetailReportIdPopup").val($("#cbbDetailReport").find("option:selected").val());
			$("#txtDetailReportIdPopup").prop("disabled", true);
			// report name
			$("#txtDetailReportNamePopup").val($("#cbbDetailReport").find("option:selected").text());
			$("#txtDetailReportNamePopup").prop("disabled", true);
			// Criteria id
			$("#txtCriteriaIdPopup").prop("disabled", false);
			// Criteria name
			$("#txtCriteriaNamePopup").prop("disabled", false);
			// status
			$("#chbDeletePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
			// set current mode
			currentMode = MODE_EDIT;
			// reset flag
			isPasswordChanged = false;
			// report name
			$("#txtReportNamePopup").val($("#cbbReport").find("option:selected").text());
			$("#txtReportNamePopup").prop("disabled", true);
			// detail report id
			$("#txtDetailReportIdPopup").val($("#cbbDetailReport").find("option:selected").val());
			$("#txtDetailReportIdPopup").prop("disabled", true);
			// cates id
			$("#txtCriteriaIdPopup").prop("disabled", true);
			// cates name
			$("#txtCriteriaNamePopup").prop("disabled", false);
			// status
			$("#chbDeletePopup").prop("disabled", false);
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
	// Edit cate info click event process
	$(document).on("click", "#btnSearchAccess", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		$(".cateinfo-popup").load(rootPath + "/0023/?cates_id="+"A0001");
		showPopup($("#popupWrapper"));
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
								jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
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
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.criteraName);
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
		return {
			reportId: $("#cbbReport").find("option:selected").val(),
			detailReportId: $("#cbbDetailReport").find("option:selected").val(),
			criteraName: $("#txtCriteriaName").val(),
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
							// cates id
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].criteraId + "</td>");
							// cates name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].criteraId + "' >" + returnedJsonData[i].criteraName + "</td>");
							// cates name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].reportId + "' >" + returnedJsonData[i].reportName + "</td>");
							// cates name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].detailReportId + "' >" + returnedJsonData[i].detailReportName + "</td>");
							// update icon
							tableStringArray.push("<td><span style='color: #1cec1c;' class='glyphicon glyphicon-edit edit cursor-pointer' name='" + i + "'></span></td>");
							// reference icon
							tableStringArray.push("<td><span style='color: #0fa1e6;' class='glyphicon glyphicon-folder-open view cursor-pointer' name='" + i + "'></span></td>");
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
						$("#divBody").height(350);
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
	function createCriteriaDataObject() {
		return {
			reportId: $("#txtReportIdPopup").val(),
			detailReportId: $("#txtDetailReportIdPopup").val(),
			criteraId: $("#txtCriteriaIdPopup").val(),
			criteraName: $("#txtCriteriaNamePopup").val(),
			deleteFlag: $("#chbDeletePopup").is(":checked") ? DELETE_FLAG_ON : DELETE_FLAG_OFF,
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
			criteriaIdPopup = $("#row" + selectedRowIndex).find("td").eq(0).text();
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "criteriaId": criteriaIdPopup },
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
		criteriaIdPopup = $("#row" + selectedRowIndex).find("td").eq(0).text();
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "criteriaId": criteriaIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();
					// report id
					$("#txtReportIdPopup").val(returnedJsonData.reportId);
					// report name
					$("#txtReportNamePopup").val($("#row" + selectedRowIndex).find("td").eq(2).text());
					// detail report id
					$("#txtDetailReportIdPopup").val(returnedJsonData.detailReportId);
					// detail report name
					$("#txtDetailReportNamePopup").val($("#row" + selectedRowIndex).find("td").eq(3).text());
					// criteria id
					$("#txtCriteriaIdPopup").val(returnedJsonData.criteraId);
					// criteria name
					$("#txtCriteriaNamePopup").val(returnedJsonData.criteraName);
					// status
					if (returnedJsonData.deleteFlag == DELETE_FLAG_OFF) {
						$("#chbDeletePopup").prop("checked", false);
					} else if (returnedJsonData.deleteFlag == DELETE_FLAG_ON) {
						$("#chbDeletePopup").prop("checked", true);
					}

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
		$("#txtCriteriaIdPopup").val("");
		$("#txtCriteriaNamePopup").val("");
		$("#chbDeletePopup").val(STATUS_NO_SELECT);
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtCriteriaNamePopup").val() == "") {
			return false;
		} else {
			return true;
		}
	}

	// Get data for combobox process
	function initDetailReportNameComboboxData(isPopupMode) {
		// farm
		var reportIdDefault = $("#reportIdDefault").val();
		if (reportData != "") {
			var optionStr = "";
			for (var i = 0; i < reportData.length; i++) {
				if (reportIdDefault != "") {
					if (reportIdDefault == reportData[i].reportId) {
						optionStr += "<option value='" + reportData[i].reportId + "' selected = 'selected'>" + reportData[i].reportName + "</option>";						
					} else {
						optionStr += "<option value='" + reportData[i].reportId + "'>" + reportData[i].reportName + "</option>";
					}
				} else {
					optionStr += "<option value='" + reportData[i].reportId + "'>" + reportData[i].reportName + "</option>";
				}
			}
			// check whether to fill data in main screen or popup screen
			if (!isPopupMode) {
				if (reportIdDefault != "") {
					drawTable();
				}
				$("#cbbReport > ").empty()
				$("#cbbReport").append(optionStr);
				loadDetailReportDataCombobox();
			} else {
				$(".cbbReportPopup").empty()
				$(".cbbReportPopup").append(optionStr);
				optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
				$("#cbbDetailReport").empty().append(optionStr).prop("disabled", true);
			}
			
		}
	}

	// Load Area name combobox data
	function loadDetailReportDataCombobox() {
		// get farm id selected by user
		var reportIdDefault = $("#reportIdDefault").val();
		var selectedReportId = "";
		// if countryIdDefault != "" then set selectedCountryId = countryIdDefault
		if (reportIdDefault != "") {
			selectedReportId = reportIdDefault;
		} else {
			selectedReportId = $("#cbbReport").find("option:selected").val(); 
		}
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if (selectedReportId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getDetailReportNameByReportId",
				data: { "reportId": selectedReportId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					// create option string
					optionStr = "";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							if (returnedJsonData[i].reportId == reportIdDefault) {
								optionStr += "<option value='" + returnedJsonData[i].detailReportId + "' selected = 'selected'>" + returnedJsonData[i].detailReportName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].detailReportId + "'>" + returnedJsonData[i].detailReportName + "</option>";
							}
						}
					}
					// set options to combobox
					$("#cbbDetailReport").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbDetailReport").prop("disabled", false);
					} else {
						// reset empty combobox and disabled
						$("#cbbDetailReport").empty().append("<option value='"+ STATUS_NO_SELECT +"'></option>").prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbDetailReport").empty().append(optionStr);
			// disable combobox
			$("#cbbDetailReport").prop("disabled", true);
		}
	}
})