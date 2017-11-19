/**
 * author Nghia Nguyen
 */

$(document).ready(function(){
	// -------------- Slick Grid -------------------------
	var grid;
	  var data = [];
	  var columns = [
		{id: "btnEdit", name: "", field: "btnEdit", width: 50, formatter:EditFormatter, cssClass: "align-center padding-top5"},
		{id: "btnDelete", name: "", field: "btnDelete", width: 50, formatter:DeleteFormatter, cssClass: "align-center padding-top5"},
		{id: "kskquanStt", name: KSKQUANSTT, field: "kskquanStt", width: 120, cssClass: "align-center"},
	    {id: "personName", name: PERSONNAME, field: "personName", width: 120, cssClass: "align-center"},
	    {id: "lltnStt", name: LLTNSTT, field: "lltnStt", width: 120, cssClass: "align-center"},
	    {id: "personId", name: PERSONID, field: "personId", width: 120, cssClass: "align-center"},
	    {id: "personName", name: PERSONNAME1, field: "name", width: 120, cssClass: "align-center"},
	    {id: "dateOfBirth", name: DATEOFBIRTH, field: "dateOfBirth", width: 120, cssClass: "align-center", editor: Slick.Editors.Date},
	    {id: "monthOfBirth", name: MONTHOFBIRTH, field: "monthOfBirth", width: 120, cssClass: "align-center", editor: Slick.Editors.Date},
	    {id: "yearOfBirth", name: YEAROFBIRTH, field: "yearOfBirth", width: 120, cssClass: "align-center", editor: Slick.Editors.Date},
	    {id: "placeOfBirth", name: PLACEOFBIRTH, field: "placeOfBirth", width: 120, cssClass: "align-center", editor: Slick.Editors.SelectCity},
	    {id: "identityCard", name: IDENTITYCARD, field: "identityCard", width: 120, cssClass: "align-center"},
	    {id: "nativeCountry", name: NATIVECOUNTRY, field: "nativeCountry", width: 120, cssClass: "align-center", editor: Slick.Editors.Select},
	    {id: "nation", name: NATION, field: "nation", width: 120, cssClass: "align-center"},
	    {id: "religion", name: RELIGION, field: "religion", width: 120, cssClass: "align-center"},
	    {id: "permanentAddress", name: PERMANENTADDRESS, field: "permanentAddress", width: 120, cssClass: "align-center"},
	    {id: "temporaryResidenceAddress", name: TEMPORARYRESIDENCEADDRESS, field: "temporaryResidenceAddress", width: 120, cssClass: "align-center"},
	    {id: "national", name: NATIONAL, field: "national", width: 120, cssClass: "align-center"},
	    {id: "element", name: ELEMENT, field: "element", width: 120, cssClass: "align-center"},
	    {id: "graduationYear", name: GRADUATIONYEAR, field: "graduationYear", width: 120, cssClass: "align-center"},
	    {id: "jobId", name: JOBID, field: "jobId", width: 120, cssClass: "align-center"},
	    {id: "workPlace", name: WORKPLACE, field: "workPlace", width: 120, cssClass: "align-center"},
	  ];

	  var options = {
	    editable: true,
	    enableAddRow: false,
	    enableCellNavigation: true,
	    asyncEditorLoading: false
	  };
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
	// variable to store current selected mode
	var currentMode = "";
	// variable to check whether cate edits password in EDIT Mode
	var isPasswordChanged = false;
	// default variable 
	var cateId = $('#cateId').val();
	var statusId = $("#statusId").val();
	var personName = $("#personName").val();
	var identityCard = $("#identityCard").val();
	var countryId = $("#countryId").val();
	var cityId = $("#cityId").val();
	var districtId = $("#districtId").val();
	var wardsId = $("#wardsId").val();
	var townId = $("#townId").val();
	var groupsId = $("#groupsId").val();
	var educationId = $("#educationId").val();
	var universityId = $("#universityId").val();
	var specializedId = $("#specializedId").val();
	//--------------- Constants definition ---------------
	initComboboxData(false);
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox(false);
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId();
	});

	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId();
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId();
	});

	// Town name combobox change event process
	$("#cbbTown").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId();
	});

	// univeristy name combobox change event process
	$("#cbbUniversity").bind("change", function() {
		// load Town name combobox
		loadSpecializedDataByUniverisityId();
	});

	// Load Area name combobox data
	function loadSpecializedDataByUniverisityId() {
		var selectedUniversityId = "";
		selectedUniversityId = $("#cbbUniversity").find("option:selected").val(); 
		if (selectedUniversityId != STATUS_NO_SELECT) {
			// make Ajax call to server to get data
			$.ajax({
				type: "POST",
				url: "getSpecializedDataByUniversityId",
				data: { "universityId": selectedUniversityId },
				async: false,
				success: function(returnedJsonData) {
					if (checkSessionTimeout(returnedJsonData) == 1) return;
					// create option string
					var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					if (returnedJsonData != "") {
						for (var i = 0; i < returnedJsonData.length; i++) {
							if (returnedJsonData[i].specializedId == specializedId) {
								optionStr += "<option value='" + returnedJsonData[i].specializedId + "' selected = 'selected'>" + returnedJsonData[i].specializedName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].specializedId + "'>" + returnedJsonData[i].specializedName + "</option>";
							}
						}
					}
					// set options to combobox
					$("#cbbSpecialized").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbSpecialized").prop("disabled", false);
					} else {
						// reset empty combobox and disabled
						$("#cbbSpecialized").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox
			$("#cbbSpecialized").empty();
			// disable combobox
			$("#cbbSpecialized").prop("disabled", true);
		}
	}

	// Load Area name combobox data
	function loadCityDataCombobox() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
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
							if (returnedJsonData[i].cityId == cityId) {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "'  selected = 'selected'>" + returnedJsonData[i].cityName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
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
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
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

	function loadDistrictDataByCityId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
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
							if (returnedJsonData[i].districtId == districtId) {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "' selected = 'selected'>" + returnedJsonData[i].districtName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
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
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
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

	function loadWardsDataByDistrictId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
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
							if (returnedJsonData[i].wardsId == wardsId) {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "' selected = 'selected'>" + returnedJsonData[i].wardsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
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
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbWards").empty().append(optionStr).prop("disabled", true);
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}

	function loadTownDataByWardsId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWards").find("option:selected").val();
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
							if (returnedJsonData[i].townId == townId) {
								optionStr += "<option value='" + returnedJsonData[i].townId + "' selected = 'selected'>" + returnedJsonData[i].townName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
							}
						}
					}
					// set options to combobox
					$("#cbbTown").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbTown").prop("disabled", false);
						loadGroupsDataByTownId();
					} else {
						$("#cbbTown").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbTown").empty().append(optionStr).prop("disabled", true);
		}
	}
	
	function loadGroupsDataByTownId() {
		var selectedCountryId = "";
		selectedCountryId = $("#cbbCountry").find("option:selected").val(); 
		// get cityId
		var selectCityId = "";
		selectCityId = $("#cbbCity").find("option:selected").val(); 
		// get District
		var selectDistrictId = ""
		selectDistrictId = $("#cbbDistrict").find("option:selected").val();
		// get Wards
		var selectWardsId = ""
		selectWardsId = $("#cbbWards").find("option:selected").val();
		// get Town
		var selectTownId = ""
		selectTownId = $("#cbbTown").find("option:selected").val();
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
							if (returnedJsonData[i].groupsId == groupsId) {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "' selected = 'selected'>" + returnedJsonData[i].groupsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "'>" + returnedJsonData[i].groupsName + "</option>";
							}
						}
					}
					// set options to combobox
					$("#cbbGroups").empty().append(optionStr);
					// enable combobox
					if (returnedJsonData != "") {
						$("#cbbGroups").prop("disabled", false);
						//loadDistrictDataByCityId();
					} else {
						$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
					}
				},
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
		} else {
			// clear combobox disable combobox
			$("#cbbGroups").empty().append(optionStr).prop("disabled", true);
		}
	}
	
	// Search button event process
	$("#btnRegister").click(function() {
		$('<form>', {
			"id": "formTransfer",
			"html": '',
			"method": 'POST',
			"action": rootPath + '/0043/'
		}).appendTo(document.body).submit();
	});
	
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
			$("#cbbCountry > ").empty()
			$("#cbbCountry").append(optionStr);
			loadCityDataCombobox();
		} else {
			$("#cbbCountry > ").empty()
			$("#cbbCountry").prop("disabled", true);
		}
		// Cate
		if (cateData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < cateData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + cateData[i].cateId + "' selected = 'selected'>" + cateData[i].cateName + "</option>";
					$('#textCountryName').text(cateData[i].countryName);
				} else {
					optionStr += "<option value='" + cateData[i].cateId + "'>" + cateData[i].cateName + "</option>";	
				}
			}
			$("#cbbCate > ").empty()
			$("#cbbCate").append(optionStr);
		} else {
			$("#cbbCate > ").empty()
			$("#cbbCate").prop("disabled", true);
		}

		// Status
		if (statusData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < statusData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + statusData[i].statusId + "' selected = 'selected'>" + statusData[i].statusName + "</option>";
				} else {
					optionStr += "<option value='" + statusData[i].statusId + "'>" + statusData[i].statusName + "</option>";	
				}
			}
			$("#cbbStatus > ").empty()
			$("#cbbStatus").append(optionStr);
		} else {
			$("#cbbStatus > ").empty()
			$("#cbbStatus").prop("disabled", true);
		}

		// Education
		if (eduactionData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < eduactionData.length; i++) {
				if (i == 0) {/*slkflsfkls*/
					optionStr += "<option value='" + eduactionData[i].educationId + "' selected = 'selected'>" + eduactionData[i].level + "</option>";
				} else {
					optionStr += "<option value='" + eduactionData[i].educationId + "'>" + eduactionData[i].level + "</option>";	
				}
			}
			$("#cbbEducation > ").empty()
			$("#cbbEducation").append(optionStr);
		} else {
			$("#cbbEducation > ").empty()
			$("#cbbEducation").prop("disabled", true);
		}
		
		// University
		if (universityData != "") {
			var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
			for (var i = 0; i < universityData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + universityData[i].universityId + "' selected = 'selected'>" + universityData[i].universityName + "</option>";
				} else {
					optionStr += "<option value='" + universityData[i].universityId + "'>" + universityData[i].universityName + "</option>";	
				}
			}
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").append(optionStr);
			loadSpecializedDataByUniverisityId();
		} else {
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").prop("disabled", true);
		}
		// set personName to textbox
		if (personName != "") {
			$("#txtPersonName").val(personName);
		}
		// set identity Card
		if (identityCard != "") {
			$("#txtIdentityCard").val(identityCard);
		}
		drawTable();
	}

	// Search button event process
	$("#btnSearch").bind("click", function() {
		// farm Id
		var countryId = $("#cbbCountry").find("option:selected").val();
		var cityId = $("#cbbCity").find("option:selected").val();
		var districtId =  $("#cbbDistrict").find("option:selected").val();
		var wardsId =  $("#cbbWards").find("option:selected").val();
		var townId =  $("#cbbTown").find("option:selected").val();
		var cateId =  $("#cbbCate").find("option:selected").val();
		var statusId =  $("#cbbStatus").find("option:selected").val();
		var educationId =  $("#cbbEducation").find("option:selected").val();
		var identityCard =  $("#txtIdentityCard").val();
		var personName =  $("#txtPersonName").val();
		var universityId =  $("#cbbUniversity").find("option:selected").val();
		var specializedId =  $("#cbbSpecialized").find("option:selected").val();
		var groupsId =  $("#cbbGroups").find("option:selected").val();
		$('<form>', {
			"id": "formTranfer",
			"html": '<input type="hidden" id="countryId" name="countryId" value="' + countryId + '"   />' +
					'<input type="hidden" id="cityId" name="cityId" value="' + cityId + '"   />' +
					'<input type="hidden" id="districtId" name="districtId" value="' + districtId + '"   />' +
					'<input type="hidden" id="wardsId" name="wardsId" value="' + wardsId + '"   />' +
					'<input type="hidden" id="cateId" name="cateId" value="' + cateId + '"   />' +
					'<input type="hidden" id="statusId" name="statusId" value="' + statusId + '"   />' +
					'<input type="hidden" id="educationId" name="educationId" value="' + educationId + '"   />' +
					'<input type="hidden" id="identityCard" name="identityCard" value="' + identityCard + '"   />' +
					'<input type="hidden" id="personName" name="personName" value="' + personName + '"   />' +
					'<input type="hidden" id="universityId" name="universityId" value="' + universityId + '"   />' +
					'<input type="hidden" id="specializedId" name="specializedId" value="' + specializedId + '"   />' +
					'<input type="hidden" id="groupsId" name="groupsId" value="' + groupsId + '"   />' +
					'<input type="hidden" id="townId" name="townId" value="' + townId + '"   />'	,
			"method": 'POST',
			"action": 'changePage'
		}).appendTo(document.body).submit();
	});

	$("#btnSearchIcon").bind("click", function() {
		
		// display user info popup
		showPopup($("#popupWrapper"));
	});

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
						/*// calculate max page
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
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							tableStringArray.push("<td class='align-center' id= '"+returnedJsonData[i].personId+"'>" + returnedJsonData[i].personId + "</td>");
							// district name
							tableStringArray.push("<td class='align-center' id = '" + returnedJsonData[i].personId + "' >" + returnedJsonData[i].personName + "</td>");
							
							// update icon
							tableStringArray.push("<td><img class='edit cursor-pointer' name='" + i + "' src='" + rootPath + "/resources/img/icon_edit.png'></td>");
							// delete icon
							tableStringArray.push("<td><img class='delete cursor-pointer' name='" + i + "' src='" + rootPath + "/resources/img/icon_del.png'></td>");
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
						$("#divBody").height(tableHeight);
						$("#divBody").addClass("overflow-x");
						// update total data count UI
						setDataCounts();
					    setPagerStatus();
					    // scroll to top of table
						$("#divBody").scrollTop(0).scrollLeft(0);*/
						$(function () {
						    for (var i = 0; i < returnedJsonData.length; i++) {
						      var d = (data[i] = {});

						      d["kskquanStt"] = returnedJsonData[i].kskquanStt;
						      d["personName"] = returnedJsonData[i].personName;
						      d["lltnStt"] = returnedJsonData[i].lltnStt;
						      d["personId"] = returnedJsonData[i].personId;
						      d["personName"] = returnedJsonData[i].personName;
						      d["dateOfBirth"] = returnedJsonData[i].dateOfBirth;
						      d["monthOfBirth"] = returnedJsonData[i].monthOfBirth;
						      d["yearOfBirth"] = returnedJsonData[i].yearOfBirth;
						      d["placeOfBirth"] = returnedJsonData[i].cityName;
						      d["identityCard"] = returnedJsonData[i].identityCard;
						      d["nativeCountry"] = returnedJsonData[i].countryName;
						      d["nation"] = returnedJsonData[i].nation;
						      d["religion"] = returnedJsonData[i].religion;
						      d["permanentAddress"] = returnedJsonData[i].permanentAddress;
						      d["temporaryResidenceAddress"] = returnedJsonData[i].temporaryResidenceAddress;
						      d["national"] = returnedJsonData[i].national;
						      d["element"] = returnedJsonData[i].element;
						      d["graduationYear"] = returnedJsonData[i].graduationYear;
						      d["jobId"] = returnedJsonData[i].jobId;
						      d["workPlace"] = returnedJsonData[i].workPlace;
						    }

						    grid = new Slick.Grid("#myGrid", data, columns, options);
						    grid.onAddNewRow.subscribe(function (e, args) {
					            var item = { "id": args["name"], "value": "New value" };
					            $.extend(item, args.item);
					            dataView.addItem(item);
					        });
						    grid.onValidationError.subscribe(function (e, args) {
						      alert(args.validationResults.msg);
						    });
						  })
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

	// Search conditions object creation process
	function createSearchConditions() {
		// country Id
		var countryIdDefault = $("#countryId").val();
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
		var cityIdDefault = $("#cityId").val();
		var cityId = $("#cbbCity").val();
		if (cityIdDefault != "") {
			if (cityId != null) {
				cityId = cityIdDefault;
			} else {
				cityId = STATUS_NO_SELECT;
			}
		}
		// dsitrict Id
		var districtIdDefault = $("#districtId").val();
		var districtId = $("#cbbDistrict").val();
		if (districtIdDefault != "") {
			if (districtId != null) {
				districtId = districtIdDefault;
			} else {
				districtId = STATUS_NO_SELECT;
			}
			
		}
		// wards Id
		var wardsIdDefault = $("#wardsId").val();
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
		var townIdDefault = $("#townId").val();
		var townId = $("#cbbTown").val();
		if (townIdDefault != "") {
			if (townIdDefault != "") {
				if (townId != null) {
					townId = townIdDefault;
				} else {
					townId = STATUS_NO_SELECT;
				}
			}
		}
		// groups Id
		var groupsIdDefault = $("#groupsId").val();
		var groupsId = $("#cbbGroups").val();
		if (groupsIdDefault != "") {
			if (groupsId != null) {
				groupsId = groupsIdDefault;
			} else {
				groupsId = STATUS_NO_SELECT;
			}
		}
		var personName = $("#txtPersonName").val();
		var identityCard = $("#identityCard").val();
		// category Id
		var cateIdDefault = $("#cateId").val();
		var cateId = $("#cbbCate").val();
		if (cateIdDefault != "") {
			if (cateId != null) {
				cateId = cateIdDefault;
			} else {
				cateId = STATUS_NO_SELECT;
			}
		}
		// status Id
		var statusIdDefault = $("#statusId").val();
		var statusId = $("#cbbStatus").val();
		if (statusIdDefault != "") {
			if (statusId != null) {
				statusId = statusIdDefault;
			} else {
				statusId = STATUS_NO_SELECT;
			}
		}
		// education Id
		var educationIdDefault = $("#educationId").val();
		var educationId = $("#cbbEducation").val();
		if (educationIdDefault != "") {
			if (educationId != null) {
				educationId = educationIdDefault;
			} else {
				educationId = STATUS_NO_SELECT;
			}
		}
		// university Id
		var universityIdDefault = $("#universityId").val();
		var universityId = $("#cbbUniversity").val();
		if (universityIdDefault != "") {
			if (universityId != null) {
				universityId = universityIdDefault;
			} else {
				universityId = STATUS_NO_SELECT;
			}
		}
		// specialized Id
		var specializedIdDefault = $("#specializedId").val();
		var specializedId = $("#cbbSpecialized").val();
		if (specializedIdDefault != "") {
			if (specializedId != null) {
				specializedId = specializedIdDefault;
			} else {
				specializedId = STATUS_NO_SELECT;
			}
		}
		return {
			cateId : cateId,
			statusId: statusId,
			personName: personName,
			identityCard: identityCard,
			countryId: countryId,
			cityId: cityId,
			districtId: districtId,
			wardsId: wardsId,
			townId: townId,
			groupsId: groupsId,
			educationId: educationId,
			universityId: universityId,
			specializedId: specializedId,
			fromRow: from,
			itemCount: ITEM_IN_ONE_PAGE
		};
	}

	// Update total data count process
	function setDataCounts() {
		$("#txtCounts").text(totalResultCount.toString().replace(/^(-?\d+)(\d{3})/, "$1,$2"));
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
			$("#addNew").removeClass("display-none");
			$("#update").addClass("display-none");
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
			$("#update").removeClass("display-none");
			$("#addNew").addClass("display-none");
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

	//Now define your DeleteFormatter function
	function DeleteFormatter(row,cell,value,columnDef,data){ 
		
	    var button = "<span id='"+ data.personId +"' style='color: red;' class='glyphicon glyphicon-remove delete btnDelete cursor-pointer'></span>";
	    //the id is so that you can identify the row when the particular button is clicked
	    return button;
	    //Now the row will display your button
	}

	//Now define your DeleteFormatter function
	function EditFormatter(row,cell,value,columnDef,data){  
		
	    var button = "<span id='"+ data.personId +"' style='color: #1cec1c;' class='glyphicon glyphicon-edit edit cursor-pointer'></span>";
	    //the id is so that you can identify the row when the particular button is clicked
	    return button;
	    //Now the row will display your button
	}

	//Now you can use jquery to hook up your delete button event
	$('.btnDelete').live('click', function(){
	    var me = $(this), personId = me.attr('id');
	    $.ajax({
	    	type: "POST",
			url: "deleteData",
			data: { "personId": personId },
			async: false,
			success: function(returnedJsonData) {
				if (checkSessionTimeout(returnedJsonData) == 1) return;
				// display message
				jInfo(DELETE_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
				setTimeout(function() {
					// reset variables
					// draw table
					//drawResult = drawTableReport();
					drawTable();  
				}, 1000);
				
			},
			error: function(e) {
				// display error message
				alert(ERROR_MESSAGE);
			}
	    });
	});
	
	$(document).on("click", ".edit", function() {
		// farm Id
		var me = $(this), personId = me.attr('id');
		$('<form>', {
			"id": "formTranfer",
			"html": '<input type="hidden" id="countryId" name="personId" value="' + personId + '" />',
			"method": 'POST',
			"action": 'changePage'
		}).appendTo(document.body).submit();
	});
})