/**
 * author Nghia Nguyen
 */
$(document).ready(function(){
	
	var ITEM_IN_ONE_PAGE = 20;
	//--------------- Variables definition ---------------
	// application path
	var rootPath = getContextPath();
	var dataScreenId = [];
	var screenStr = '';
	initFarmNameComboboxData();
	$(document).on("click", ".screen", function() {
		var id = $(this).attr("id");
		if ($(this).hasClass("btn-primary")) {
			$(this).removeClass("btn-primary");
			$(this).addClass("btn-default");
		} else {
			$(this).removeClass("btn-default");
			$(this).addClass("btn-primary");
		}
	});
	// Hide Popup
	$(document).on("click", "#btnBack", function() {
		hidePopupMain($("#popupWrapper2"));
		screenStr = '';
	});
	// add Enable && disable for displable
	$(document).on("click", ".displable", function() {
		if ($(this).hasClass("fa-close")) {
			$(this).removeClass("fa-close color_ac2925");
			$(this).addClass("fa-check color3c8dbc");
		} else  {
			$(this).removeClass("fa-check color3c8dbc");
			$(this).addClass("fa-close color_ac2925");
		}
	});
	// add Enable && disable for addable
	$(document).on("click", ".addable", function() {
		if ($(this).hasClass("fa-close")) {
			$(this).removeClass("fa-close color_ac2925");
			$(this).addClass("fa-check color3c8dbc");
		} else  {
			$(this).removeClass("fa-check color3c8dbc");
			$(this).addClass("fa-close color_ac2925");
		}
	});
	// add Enable && disable for updatable
	$(document).on("click", ".updatable", function() {
		if ($(this).hasClass("fa-close")) {
			$(this).removeClass("fa-close color_ac2925");
			$(this).addClass("fa-check color3c8dbc");
		} else  {
			$(this).removeClass("fa-check color3c8dbc");
			$(this).addClass("fa-close color_ac2925");
		}
	});
	// add Enable && disable for deletable
	$(document).on("click", ".deletable", function() {
		if ($(this).hasClass("fa-close")) {
			$(this).removeClass("fa-close color_ac2925");
			$(this).addClass("fa-check color3c8dbc");
		} else  {
			$(this).removeClass("fa-check color3c8dbc");
			$(this).addClass("fa-close color_ac2925");
		}
	});
	// add Enable && disable for referencable
	$(document).on("click", ".referencable", function() {
		if ($(this).hasClass("fa-close")) {
			$(this).removeClass("fa-close color_ac2925");
			$(this).addClass("fa-check color3c8dbc");
		} else  {
			$(this).removeClass("fa-check color3c8dbc");
			$(this).addClass("fa-close color_ac2925");
		}
	});
	// Update Data
	$(document).on("click", "#btnRegisterPopup", function() {
		$(".row_access").each(function(){
			var screenId = $(this).find("td").eq(0).text();
			// Display_Enable_Flag
			var display_flag = false;
			if ($($(this).find("td").eq(1)).find(".displable").hasClass("fa-check")) {
				display_flag = false;
			} else if ($($(this).find("td").eq(1)).find(".displable").hasClass("fa-close")) {
				display_flag = true;
			}
			// Addable_Flag
			var add_flag = false;
			if ($($(this).find("td").eq(2)).find(".addable").hasClass("fa-check")) {
				add_flag = false;
			} else if ($($(this).find("td").eq(2)).find(".addable").hasClass("fa-close")) {
				add_flag = true;
			}
			// Updatable_Flag
			var edit_flag = false;
			if ($($(this).find("td").eq(3)).find(".updatable").hasClass("fa-check")) {
				edit_flag = false;
			} else if ($($(this).find("td").eq(3)).find(".updatable").hasClass("fa-close")) {
				edit_flag = true;
			}
			// Addable_Flag
			var delete_flag = false;
			if ($($(this).find("td").eq(4)).find(".deletable").hasClass("fa-check")) {
				delete_flag = false;
			} else if ($($(this).find("td").eq(4)).find(".deletable").hasClass("fa-close")) {
				delete_flag = true;
			}
			// Addable_Flag
			var reference_flag = false;
			if ($($(this).find("td").eq(5)).find(".referencable").hasClass("fa-check")) {
				reference_flag = false;
			} else if ($($(this).find("td").eq(5)).find(".referencable").hasClass("fa-close")) {
				reference_flag = true;
			}
			// Create Data
			var dataAccessObject = createAccessAuthorizationConditions(screenId,display_flag,
					add_flag, edit_flag, delete_flag, reference_flag);
			// khai báo biến success
			var success = false;
			$.ajax({
				url: rootPath + "/0033/updateData",
				type: "POST",
				contentType: "application/json",
				data: JSON.stringify(dataAccessObject),
				async: false,
				success: function(returnData) {
					success = true;
					screenStr = '';
				}, 
				error: function(e) {
					// set return value
					returnValue = "";
					success = false;
				},
				complete: function(jqXHR, textStatus) {
					// display message
					if (success) {
						jInfo(UPDATE_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					} else {
						alert(ERROR_MESSAGE);
					}
				}
			})
		});
	});
	// function create Data to Update
	function createAccessAuthorizationConditions(screenId, display_flag, 
							add_flag, edit_flag, delete_flag, reference_flag){
		
		var dataObject = {
				"screenId" : screenId,
				"accessAuthorityId" : 1,
				"screenDisplayEnableFlag" : display_flag,
				"addableFlag" : add_flag,
				"updatableFlag" : edit_flag,
				"deletableFlag" : delete_flag,
				"referenceFlag" : reference_flag
		}
		return dataObject;
	};
	
	$(document).on("click", "#btn_access", function() {
		// Lấy Thông Tin UserId 
		var usersId = $("#usersIdPopup").val();
		// duyệt qua tất cả các class screen
		$(".screen").each(function(){
			if ($(this).hasClass("btn-primary")) {
				dataScreenId.push($(this).attr("id"));
				screenStr += $(this).attr("id") + ",";
			}
		});
		if (screenStr != "") {
			screenStr = screenStr.substring(0,screenStr.length-1);
			// load popup chọn cờ thêm xóa sửa cho từng Màn Hình.
			$(".accessAuthorizationinfo-popup").load(rootPath + "/0033/?screenStr="+screenStr+"&&usersId=" + usersId);
			showPopup($("#popupWrapper2"));
		} else {
			alert("Vui Lòng Chọn Màn Hình")
		}
	}); 
	$("#cbbAccess").change(function(){
		alert("");
	});
	// Get data for combobox process
	function initFarmNameComboboxData() {
		// accessData
		/*if (accessData != "") {
			var optionStr = "<option value=''></option>";
			for (var i = 0; i < accessData.length; i++) {
				optionStr += "<option value='" + accessData[i].accessAuthorityId + "'>" + accessData[i].accessAuthorityId + "</option>";
			}
			$("#cbbAccess").empty()
			$("#cbbAccess").append(optionStr);
		}*/
	}
});


