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
	var signatureIdPopup = "";
	// variable to store current selected mode
	var currentMode = "";
	var countStt = 0;

	// Register user click event process
	$("#btnRegister").bind("click", function() {
		$(".alert").addClass("display-none");
		// clear all current text of popup controls
		clearPopupControl(); 
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
	});
	// Clear all current text of popup controls
	function clearPopupControl() {
		// signature Id
		$("#txtSignatureIdPopup").val("");
		// signatureName
		$("#txtSignatureNamePopup").val("");
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		$(".alert").addClass("display-none");
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			$("#addNew").removeClass("display-none");
			$("#update").addClass("display-none");
			// signature Id
			$("#txtSignatureIdPopup").prop("disabled", false);
			// signatureName
			$("#txtSignatureNamePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
			// reset flag
			isPasswordChanged = false;
			// signature Id
			$("#txtSignatureIdPopup").prop("disabled", true);
			// signatureName
			$("#txtSignatureNamePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			// set current mode
			currentMode = MODE_VIEW;
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
			// reset flag
			isPasswordChanged = false;
			// signature Id
			$("#txtSignatureIdPopup").prop("disabled", true);
			// signatureName
			$("#txtSignatureNamePopup").prop("disabled", true);
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
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
			}  else {
				// insert new user to DB
				// get user input data
				dataObject = createEducationDataObject();
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
								// duplicated user id
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
			// check for user input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE);
			} else {
				// update existing user in DB
				// get user input data
				dataObject = createEducationDataObject();
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
								// update the corresponding user data in search table
								// make Ajax call to server to get data
								$.ajax({
									url: "getSingleData",
									data: { "signatureId": signatureIdPopup },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// signatureName
											$("#row" + selectedRowIndex).find("td").eq(2).text(returnedJsonData.signatureName);
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
		return {
			signatureName: $("#signatureName").val(),
			fromRow: from,
			itemCount: ITEM_IN_ONE_PAGE
		};
	}
	// Draw user data table based on search conditions
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
							// cates id
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].signatureId + "</td>");
							// cates name
							tableStringArray.push("<td class='align-center goTo0006' id = '" + returnedJsonData[i].signatureId + "' >" + returnedJsonData[i].signatureName + "</td>");
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
	
	// User data object creation process, to use in Updating and Inserting user
	function createEducationDataObject() {
		return {
			signatureId: $("#txtSignatureIdPopup").val(),
			signatureName: $("#txtSignatureNamePopup").val(),
		};
	}

	// Delete user click event process
	$(document).on("click", ".delete", function() {
		countStt = 0;
		// get row index
		selectedRowIndex = $(this).attr("name");
		// display confirmation message
		jQuestion_warning(DELETE_CONFIRM_MESSAGE, DIALOG_TITLE, DIALOG_YES_BUTTON, DIALOG_NO_BUTTON, function(val) {
			if (val) {
			// get id of selected user
			signatureIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).text();
			// make Ajax call to server to delete data
			$.ajax({
				url: "deleteData",
				data: { "signatureId": signatureIdPopup },
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
		// get id of selected user
		signatureIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).text();
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "signatureId": signatureIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();

					// signature Id
					$("#txtSignatureIdPopup").val(returnedJsonData.signatureId);
					// signatureName
					$("#txtSignatureNamePopup").val(returnedJsonData.signatureName);
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
		// get id of selected user
		signatureIdPopup = $("#row" + selectedRowIndex).find("td").eq(1).text();
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "signatureId": signatureIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();

					// signature Id
					$("#txtSignatureIdPopup").val(returnedJsonData.signatureId);
					// signatureName
					$("#txtSignatureNamePopup").val(returnedJsonData.signatureName);
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
		$("#txtSignatureIdPopup").val("");
		$("#txtSignatureNamePopup").val("");
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtSignatureNamePopup").val() == "") {
			return false;
		} else {
			return true;
		}
	}
})