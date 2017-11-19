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
	// variable to store selected user id to show in popup
	var usersIdPopup = "";
	// variable to store current selected mode
	var currentMode = "";
	// variable to check whether user edits password in EDIT Mode
	var isPasswordChanged = false;
	// init Data
	initDetailReportNameComboboxData(false);
	// Register user click event process
	$("#btnRegister").bind("click", function() {
		// clear all current text of popup controls
		clearPopupControl(); 
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
		// display user info popup
		showPopup($("#popupWrapper"));
	});
	// Clear all current text of popup controls
	function clearPopupControl() {
		// Report id
		$("#txtDetailReportIdPopup").val("");
		// Report name
		$("#txtDetailReportNamePopup").val("");
		// status
		$("#chbDeletePopup").prop("checked", false);
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			initDetailReportNameComboboxData(true);
			// Report Id
			$("#cbbReportPopup").prop("disabled", false);
			$("#cbbReportPopup").empty();
			// status
			$("#chbDeletePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
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
			// check for Report Name input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			} else {
				// insert new Detail Report to DB
				// get Detail Report input data
				dataObject = createDetailReportDataObject();
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
								alert(VALIDATE_BLANK_FIELDS_MESSAGE);
							} else if (returnedJsonData == VALIDATE_WRONG_FORMAT) {
								// id is in wrong format
								// display message
								alert(VALIDATE_WRONG_FORMAT_MESSAGE);
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
								// duplicated Detail Report id
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
			// check for Detail Report input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			} else {
				// update existing user in DB
				// get user input data
				dataObject = createDetailReportDataObject();
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
								// update the corresponding user data in search table
								// make Ajax call to server to get data
								var reportIdPopup = $(".cbbReportPopup").val();
								var detailReportIdPopup = $("#txtDetailReportIdPopup").val();
								$.ajax({
									url: "getSingleData",
									data: { 
										"detailReportId" : detailReportIdPopup,
										"reportId": reportIdPopup 
									},
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// detail Report name
											$("#row" + selectedRowIndex).find("td").eq(0).text(returnedJsonData.detailReportName);
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
		var reportIdDefault = $("#reportIdDefault").val();
		var reportId = $("#cbbReport").val();
		if (reportIdDefault != "") {
			reportId = reportIdDefault;
		}
		return {
			reportId: reportId,
			detailReportName: $("#detailReportName").val(),
			fromRow: from,
			itemCount: ITEM_IN_ONE_PAGE
		};
	}
	// Draw Detail Report data table based on search conditions
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
						
						console.log(returnedJsonData[0].tilereportName);
						var tileReportName = returnedJsonData[0].tilereportName;
						var count = 0;
						for (var i = 0; i < returnedJsonData.length; i++) {
							// row open tag
							tableStringArray.push("<tr id='row" + i + "' name='" + returnedJsonData[i].detailReportId + "'>");
							// Detail Report name
							tableStringArray.push("<td id = '"+ returnedJsonData[i].reportId +"' name='" + returnedJsonData[i].detailReportId + "' colspan = '2' class='align-center'>" + returnedJsonData[i].detailReportName + "</td>");
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
	
	// Detail Report data object creation process, to use in Updating and Inserting user
	function createDetailReportDataObject() {
		if (currentMode == MODE_NEW) {
			return {
				reportId : $(".cbbReportPopup").val(),
				detailReportName: $("#txtDetailReportNamePopup").val(),
				deleteFlag: $("#chbDeletePopup").is(":checked") ? DELETE_FLAG_ON : DELETE_FLAG_OFF,
			};
		} else {
			return {
				reportId : $(".cbbReportPopup").val(),
				detailReportId: $("#txtDetailReportIdPopup").val(),
				detailReportName: $("#txtDetailReportNamePopup").val(),
				deleteFlag: $("#chbDeletePopup").is(":checked") ? DELETE_FLAG_ON : DELETE_FLAG_OFF,
			};
		}
	}

	// Delete Detail Report click event process
	$(document).on("click", ".delete", function() {
		// display confirmation message
		var selection = confirm(DELETE_CONFIRM_MESSAGE);
		if (selection) {
			// get row index
			selectedRowIndex = $(this).attr("name");
			// get id of selected user
			reportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(0)).attr("id");
			detailReportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(0)).attr("name");
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "detailReportId": detailReportIdPopup },
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
		// get id of selected user
		var reportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(0)).attr("id");
		var detailReportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(0)).attr("name");
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { 
				"detailReportId" : detailReportIdPopup,
				"reportId": reportIdPopup 
			},
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();
					if (reportData != "") {
						var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
						for (var i = 0; i < reportData.length; i++) {
							if (returnedJsonData.reportId == reportData[i].reportId) {
								optionStr += "<option value='" + reportData[i].reportId + "' selected = 'selected'>" + reportData[i].reportName + "</option>";
							} else {
								optionStr += "<option value='" + reportData[i].reportId + "'>" + reportData[i].reportName + "</option>";
							}
						}
						$(".cbbReportPopup").empty()
						$(".cbbReportPopup").append(optionStr);
					}
					// Detail Report Id
					$("#txtDetailReportIdPopup").val(returnedJsonData.detailReportId);
					// Detail Report Name
					$("#txtDetailReportNamePopup").val(returnedJsonData.detailReportName);
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
				// display user info popup
				showPopup($("#popupWrapper"));
			}
		});
	});

	// Reset search conditions process
	function resetSearchConditions() {
		$("#txtDetailReportIdPopup").val("");
		$("#txtDetailReportNamePopup").val("");
		$("#cbbStatus").val(STATUS_NO_SELECT);
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtDetailReportNamePopup").val() == "") {
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
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
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
			} else {
				$(".cbbReportPopup").empty()
				$(".cbbReportPopup").append(optionStr);
			}
		}
	}
})