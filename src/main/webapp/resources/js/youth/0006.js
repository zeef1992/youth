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
	// variable to store selected user id to show in popup
	var usersIdPopup = "";
	// variable to store current selected mode
	var currentMode = "";
	var countStt = 0;
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
		$(".alert").addClass("display-none");
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			initDetailReportNameComboboxData(true);
			// Report Id
			$("#cbbReportPopup").prop("disabled", false);
			$("#txtDetailReportNamePopup").prop("disabled", false);
			// status
			$("#chbDeletePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
			// status
			$("#cbbReportPopup").prop("disabled", false);
			$("#chbDeletePopup").prop("disabled", false);
			$("#txtDetailReportNamePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			// set current mode
			currentMode = MODE_VIEW;
			// Report Id
			$("#cbbReportPopup").prop("disabled", true);
			// status
			$("#chbDeletePopup").prop("disabled", true);

			$("#txtDetailReportNamePopup").prop("disabled", true);
			// register button
			$("#btnRegisterPopup").hide();
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
		countStt = 0;
		var dataObject = null;
		// check current mode
		if (currentMode == MODE_NEW) {
			// check for Report Name input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE)
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
								$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + INSERT_RESULT_SUCCESSFUL_MESSAGE)
							} else if (returnedJsonData == INSERT_RESULT_DUPLICATED) {
								// duplicated Detail Report id
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_DUPLICATED_MESSAGE)
							} else if (returnedJsonData == INSERT_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + INSERT_RESULT_FAILED_MESSAGE)
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
					}
				});
			}
		} else if (currentMode == MODE_EDIT) {
			// check for Detail Report input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE)
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
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE)
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
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.detailReportName);
											$("#row" + selectedRowIndex).find("td").eq(3).text(returnedJsonData.updateUserId);
										}
									},
									complete: function(jqXHR, textStatus) {
										// display message
										$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html("").html('<i class="icon fa fa-info"></i> ' + UPDATE_RESULT_SUCCESSFUL_MESSAGE)
									}
								});
							} else if (returnedJsonData == UPDATE_RESULT_FAILED) {
								// failed
								// display message
								$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + UPDATE_RESULT_FAILED_MESSAGE)
							}
						}
					},
					error: function(e) {
						// display error message
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
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
						$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + SEARCH_RESULT_OUT_OF_MEMORY_MESSAGE)
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
						
						console.log(returnedJsonData[0].tilereportName);
						var tileReportName = returnedJsonData[0].tilereportName;
						var count = 0;
						for (var i = 0; i < returnedJsonData.length; i++) {
							countStt++;
							// row open tag
							tableStringArray.push("<tr id='row" + i + "' name='" + returnedJsonData[i].detailReportId + "'>");
							// STT
							tableStringArray.push("<td class='align-center'>" + countStt  + "</td>");
							// Report name
							tableStringArray.push("<td>" + returnedJsonData[i].reportName + "</td>");
							// Detail Report name
							tableStringArray.push("<td id = '"+ returnedJsonData[i].reportId +"' name='" + returnedJsonData[i].detailReportId + "' class='align-center'>" + returnedJsonData[i].detailReportName + "</td>");
							// users id
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].createUserId + "</td>");
							// users name
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
									'<li><a class = "edit" href="#" data-toggle="modal"'+
										'data-target="#modal-default" name="' + i + '">Edit</a></li>'+
									'<li><a class = "view" href="#"  data-toggle="modal"'+
									'data-target="#modal-default" name="' + i + '">View</a></li>'+
									'<li><a class = "delete" href="#" name="' + i + '">Delete</a></li>'+
								'</ul>');
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
					    // scroll to top of table
						$("#example2").scrollTop(0).scrollLeft(0);
					}
				} else {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + SEARCH_RESULT_NO_DATA_MESSAGE);
					// update pager
					$("#lblCurrentPage").text("0");
					$("#lblMaxPage").text("0");
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
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
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
		// get row index
		selectedRowIndex = $(this).attr("name");
		// display confirmation message
		jQuestion_warning(DELETE_CONFIRM_MESSAGE, DIALOG_TITLE, DIALOG_YES_BUTTON, DIALOG_NO_BUTTON, function(val) {
			if (val) {
			// get id of selected user
			reportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("id");
			detailReportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("name");
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
							$(".alert").removeClass("display-none").addClass("alert-info").find("span").html("").html('<i class="icon fa fa-info"></i> ' + DELETE_RESULT_SUCCESSFUL_MESSAGE)
							
						} else if (returnedJsonData == DELETE_RESULT_FAILED) {
							// failed
							// display message
							$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + DELETE_RESULT_FAILED_MESSAGE)
						}
					}
				},
				error: function(e) {
					// display error message
					$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
				}
			});
		}
		});
	});

	$(document).on("click", ".edit", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected user
		var reportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("id");
		var detailReportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("name");
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
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
			}
		});
	});

	$(document).on("click", ".view", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected user
		var reportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("id");
		var detailReportIdPopup = $($("#row" + selectedRowIndex).find("td").eq(2)).attr("name");
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
					setPopupControlState(MODE_VIEW);
				}
			},
			error: function(e) {
				// display error message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE)
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