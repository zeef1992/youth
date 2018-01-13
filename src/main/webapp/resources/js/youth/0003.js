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
	// variable to check whether user edits password in EDIT Mode
	var isPasswordChanged = false;

	// Register user click event process
	$("#btnRegister").bind("click", function() {
		// clear all current text of popup controls
		clearPopupControl(); 
		// change state of controls in popup based on mode
		setPopupControlState(MODE_NEW);
		// display user info popup
		showPopup($("#popupWrapper1"));
	});
	// Clear all current text of popup controls
	function clearPopupControl() {
		// users id
		$("#txtUsersIdPopup").val("");
		// users name
		$("#txtUsersNamePopup").val("");
		// password
		$("#txtPasswordPopup").val("");
		// status
		$("#chbDeletePopup").prop("checked", false);
	}

	// Change state of controls in popup based on mode
	function setPopupControlState(mode) {
		$(".alert").addClass("display-none");
		if (mode == MODE_NEW) {
			// set current mode
			currentMode = MODE_NEW;
			// users id
			$("#txtUsersIdPopup").prop("disabled", false);
			// users name
			$("#txtUsersNamePopup").prop("disabled", false);
			// password
			$("#txtPasswordPopup").prop("disabled", false);
			// status
			$("#chbDeletePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_EDIT) {
			// set current mode
			currentMode = MODE_EDIT;
			// reset flag
			isPasswordChanged = false;
			// users id
			$("#txtUsersIdPopup").prop("disabled", true);
			// users name
			$("#txtUsersNamePopup").prop("disabled", false);
			// password
			$("#txtPasswordPopup").prop("disabled", false);
			// status
			$("#chbDeletePopup").prop("disabled", false);
			// register button
			$("#btnRegisterPopup").show();
		} else if (mode == MODE_VIEW) {
			// set current mode
			currentMode = MODE_VIEW;
			// users id
			$("#txtUsersIdPopup").prop("disabled", true);
			// users name
			$("#txtUsersNamePopup").prop("disabled", true);
			// password
			$("#txtPasswordPopup").prop("disabled", true);
			// status
			$("#chbDeletePopup").prop("disabled", true);
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
	// Edit user info click event process
	$(document).on("click", "#btnSearchAccess", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		$(".userinfo-popup").load(rootPath + "/0023/?users_id="+"A0001");
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
			// check for user input
			if (!checkInputBlankFields()) {
				// blank field(s)
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_BLANK_FIELDS_MESSAGE)
			} else if (!checkUserIdFormat()) {
				// id is in wrong format
				// display message
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + VALIDATE_WRONG_FORMAT_MESSAGE)
			} else {
				// insert new user to DB
				// get user input data
				dataObject = createUserDataObject();
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
				dataObject = createUserDataObject();
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
								$.ajax({
									url: "getSingleData",
									data: { "usersId": usersIdPopup },
									type: "POST",
									async: false,
									success: function(returnedJsonData) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											// users name
											$("#row" + selectedRowIndex).find("td").eq(1).text(returnedJsonData.usersName);
											$("#row" + selectedRowIndex).find("td").eq(3).text(returnedJsonData.updateUserId);
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
		// get role string
		var roleString = "";
		if ($("#chbSysAdmin").is(":checked")) {
			roleString += $("#chbSysAdmin").val() + ",";
		}
		if ($("#chbMana").is(":checked")) {
			roleString += $("#chbMana").val() + ",";
		}
		if ($("#chbFarmMana").is(":checked")) {
			roleString += $("#chbFarmMana").val() + ",";
		}
		if ($("#chbAreaMana").is(":checked")) {
			roleString += $("#chbAreaMana").val() + ",";
		}
		return {
			userId: $("#usersId").val(),
			usersName: $("#usersName").val(),
			usersRoleTypeString: roleString == "" ? STATUS_NO_SELECT : roleString,
			//userStatus: $("#cbbStatus").find("option:selected").val(),
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
							var accessManager = "";
							tableStringArray.push("<tr id='row" + i + "'>");
							// STT
							tableStringArray.push("<td class='align-center'>" + countStt  + "</td>");
							if (returnedJsonData[i].authorizationTypeId = "1") {
								accessManager = "System Admin"
							} else if (returnedJsonData[i].authorizationTypeId = "2") {
								accessManager = "User"
							}
							// authorization
							tableStringArray.push("<td class='align-center'>" + accessManager + "</td>");
							// users id
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].usersId + "</td>");
							// users name
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].usersName + "</td>");
							// create User Id
							tableStringArray.push("<td class='align-center'>" + returnedJsonData[i].createUserId + "</td>");
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
						// show search result
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
					$(".pager").addClass("display-none");
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
	function createUserDataObject() {
		if (currentMode == MODE_EDIT) {
			return {
				usersId: $("#txtUsersIdPopup").val(),
				usersName: $("#txtUsersNamePopup").val(),
				password: $("#txtPasswordPopup").val(),
				authorizationTypeId: "1",
				deleteFlag: $("#chbDeletePopup").is(":checked") ? DELETE_FLAG_ON : DELETE_FLAG_OFF,
				note: $("#txtNotePopup").val()
			};
		} else {
			return {
				usersId: $("#txtUsersIdPopup").val(),
				usersName: $("#txtUsersNamePopup").val(),
				password: $("#txtPasswordPopup").val(),
				authorizationTypeId: "1",
				deleteFlag: $("#chbDeletePopup").is(":checked") ? DELETE_FLAG_ON : DELETE_FLAG_OFF,
				note: $("#txtNotePopup").val()
			};
		}
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
				usersIdPopup = $("#row" + selectedRowIndex).find("td").eq(2).text();
				// make Ajax call to server to delete data
				$.ajax({
					url: "deleteData",
					data: { "usersId": usersIdPopup },
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
		usersIdPopup = $("#row" + selectedRowIndex).find("td").eq(2).text();
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "usersId": usersIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();

					// users id
					$("#txtUsersIdPopup").val(returnedJsonData.usersId);
					// users name
					$("#txtUsersNamePopup").val(returnedJsonData.usersName);
					// password
					$("#txtPasswordPopup").val(returnedJsonData.password);
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
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});
	$(document).on("click", ".view", function() {
		// get row index
		selectedRowIndex = $(this).attr("name");
		// get id of selected user
		usersIdPopup = $("#row" + selectedRowIndex).find("td").eq(2).text();
		// make Ajax call to server to get data
		$.ajax({
			url: "getSingleData",
			data: { "usersId": usersIdPopup },
			type: "POST",
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				if (returnedJsonData != "") {
					// clear all current text of popup controls
					clearPopupControl();

					// users id
					$("#txtUsersIdPopup").val(returnedJsonData.usersId);
					// users name
					$("#txtUsersNamePopup").val(returnedJsonData.usersName);
					// password
					$("#txtPasswordPopup").val(returnedJsonData.password);
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
				$(".alert").removeClass("display-none").addClass("alert-warning").find("span").html("").html('<i class="icon fa fa-warning"></i> ' + ERROR_MESSAGE);
			}
		});
	});

	// Reset search conditions process
	function resetSearchConditions() {
		$("#txtUsersIdPopup").val("");
		$("#txtUsersNamePopup").val("");
		$("#cbbStatus").val(STATUS_NO_SELECT);
	}

	// Check input: blank fields
	function checkInputBlankFields() {
		if ($("#txtUsersIdPopup").val() == "" || $("#txtUsersNamePopup").val() == ""
			|| $("#txtPasswordPopup").val() == "") {
			return false;
		} else {
			return true;
		}
	}

	// Check input: user's id format (U + xxxxxxxxxx)
	function checkUserIdFormat() {
		var usersId = $("#txtUsersIdPopup").val();
		if (!/^U\d{10}$/.test(usersId)) {
			return false;
		} else {
			return true;
		}
	}
})