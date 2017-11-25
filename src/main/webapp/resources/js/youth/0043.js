/**
 * author Nghia Nguyen
 * ABCXYZ
 * DKM
 */

$(document).ready(function(){
	$("#wrapper").scroll(function() {
		var test = document.getElementById("wrapper").scrollHeight;
		if (test >= 50) {
			alert("ok")
		}
	});
	// check mode Screen
	var MODE = $("#modeScreen").val();
	// default mode.
	var MODE_EDIT = "modeEdit";
	var MODE_NEW = "modeNew";    
	var relationStr0043 = "";
	if (MODE == MODE_NEW) {  
		initComboboxData();   
		$("#btnNumberOfRelation").addClass("display-none");
		$("#lblNumberOfRelation").addClass("display-none");
		$("#txtNumberOfRelation").addClass("display-none");
		$("#update").addClass("display-none");
		$("#btnEditProcessYourselt").css({"display":"none"});
		$("#addNew").removeClass("display-none");
	} else {
		var personId = $("#personIdEdit").val();
		$.ajax({
			type: "POST",
			url: "searchData",
			data: { "PersonId": personId },
			async: false,
			success: function(returnedJsonData) {
				if (returnedJsonData.length > 0) {
					// txtKskQuanStt
					$("#txtKskQuanStt").val(returnedJsonData[0].kskquanStt);
					// lltnstt
					$("#txtLltnStt").val(returnedJsonData[0].lltnStt);
					// person Name
					$("#txtPersonName").val(returnedJsonData[0].personName);
					// IdentityCard
					$("#txtIdentityCard").val(returnedJsonData[0].identityCard);
					// nation
					$("#txtNation").val(returnedJsonData[0].nation);
					// Religion
					$("#txtReligion").val(returnedJsonData[0].religion);
					// PermanentAddress
					$("#txtPermanentAddress").val(returnedJsonData[0].permanentAddress);
					// temporaryResidenceAddress
					$("#txtTemporaryResidenceAddress").val(returnedJsonData[0].temporaryResidenceAddress);
					// phone
					$("#txtPhone").val(returnedJsonData[0].phone);
					// cbbDateOfBirth
					var d = new Date();
					var yearNow = d.getFullYear();
					var yearArr = [];
					for (var i = 1970; i >= 1970 && i <= yearNow; i++) {
						yearArr.push(i);
					}
					var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					for (var i = 0; i < yearArr.length; i++) {
						if (yearArr[i] == returnedJsonData[0].yearOfBirth) {
							optionStr += "<option value = '"+yearArr[i]+"' selected = 'selected'>"+yearArr[i]+"</option>";
						} else {
							optionStr += "<option value = '"+yearArr[i]+"'>"+yearArr[i]+"</option>";
						}
					}
					$("#cbbYearOfBirth").append(optionStr);
   
					// cbbMonthOfBirth
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					for (var i = 1; i <= 12; i++) {
						if (i == returnedJsonData[0].monthOfBirth) {
							optionStr += "<option value = '"+i+"' selected = 'selected'> Tháng "+i+"</option>";
						} else {
							optionStr += "<option value = '"+i+"'> Tháng "+i+"</option>";
						}
					}
					$("#cbbMonthOfBirth").append(optionStr);

					// cbbDateOfBirth
					optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
					for (var i = 1; i <= 31; i++) {
						if (i == returnedJsonData[0].dateOfBirth) {
							optionStr += "<option value = '"+i+"' selected = 'selected'> Ngày "+i+"</option>";
						} else {
							optionStr += "<option value = '"+i+"'> Ngày "+i+"</option>";
						}
					}
					$("#cbbDateOfBirth").append(optionStr);
					// country
					if (countryData != "") {
						var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
						for (var i = 0; i < countryData.length; i++) {
							if (countryData[i].countryName == returnedJsonData[0].countryName) {
								optionStr += "<option value='" + countryData[i].countryId + "' selected = 'selected'>" + countryData[i].countryName + "</option>";
								
							} else {
								optionStr += "<option value='" + countryData[i].countryId + "'>" + countryData[i].countryName + "</option>";	
							}
						}
						$("#cbbCountry > ").empty()
						$("#cbbCountry").append(optionStr);
						// place of birth
						$("#cbbPlaceOfBirth > ").empty()
						$("#cbbPlaceOfBirth").append(optionStr);
						// native Country
						$("#cbbNativeCountry > ").empty()
						$("#cbbNativeCountry").append(optionStr);
					} else {
						$("#cbbCountry > ").empty()
						$("#cbbCountry").prop("disabled", true);
						$("#cbbPlaceOfBirth > ").empty()
						$("#cbbPlaceOfBirth").prop("disabled", true);
						$("#cbbNativeCountry > ").empty()
						$("#cbbNativeCountry").prop("disabled", true);
					}
					// Cate
					if (cateData != "") {
						var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
						for (var i = 0; i < cateData.length; i++) {
							if (cateData[i].cateName == returnedJsonData[0].cateName) {
								optionStr += "<option value='" + cateData[i].cateId + "' selected = 'selected'>" + cateData[i].cateName + "</option>";
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
							if (statusData[i].statusName == returnedJsonData[0].statusName) {
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
							if (eduactionData[i].level == returnedJsonData[0].level) {
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
						if ($("#cbbEducation").val() != STATUS_NO_SELECT) {
							var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
							for (var i = 0; i < universityData.length; i++) {
								if (universityData[i].universityName == returnedJsonData[0].universityName) {
									optionStr += "<option value='" + universityData[i].universityId + "' selected = 'selected'>" + universityData[i].universityName + "</option>";
								} else {
									optionStr += "<option value='" + universityData[i].universityId + "'>" + universityData[i].universityName + "</option>";	
								}
							}
							$("#cbbUniversity > ").empty()
							$("#cbbUniversity").append(optionStr);
						}
						//loadSpecializedDataByUniverisityId();
					} else {
						$("#cbbUniversity > ").empty()
						$("#cbbUniversity").prop("disabled", true);
					}
					// city
					loadCityDataCombobox(returnedJsonData[0].cityId);
					// district 
					loadDistrictDataByCityId(returnedJsonData[0].districtId);
					// wards
					loadWardsDataByDistrictId(returnedJsonData[0].wardsId);
					// town 
					loadTownDataByWardsId(returnedJsonData[0].townId);
					// groupsId
					loadGroupsDataByTownId(returnedJsonData[0].groupsId);
					$("#btnProcessOfYourSelt").css({"display": "none"});
					$("#lblNumberOfRelation").css({"display": "none"});
					$("#txtNumberOfRelation").css({"display": "none"});
					$("#btnNumberOfRelation").css({"display": "none"});
					getProcessPerson(personId);
					getRelationShipOfPerson(personId);
				} else {
					
				}
			}, 
			error: function(e) {
				// display error message
				alert(ERROR_MESSAGE);
			}
		});
		$("#update").removeClass("display-none");
		$("#addNew").addClass("display-none");
	}

	// get process person 
	function getProcessPerson(personId) {
		$(".processOfYourSeltEdit").load(rootPath + "/0047/?personId="+personId);
		setTimeout(function() {
			// reset variables
			// draw table
			drawResult = drawTableProcessEdit();
			$("#divBodyProcess").width($("#divHeadProcess").width() + 2);
		}, 1000);
	}

	// Get Relationship of person
	function getRelationShipOfPerson(PersonId) {
		$(".relationContentEdit").load(rootPath + "/0045/?numberOfRelation=0");
		setTimeout(function() {
			// reset variables
			// draw table
			drawResult = drawTable0045Edit();
			$("#divBody").width($("#divHead").width() + 2);
			
		}, 1000);
	}
	// Get data for combobox country
	function initComboboxData() {
		// cbbDateOfBirth
		var d = new Date();
		var yearNow = d.getFullYear();
		var yearArr = [];
		for (var i = 1970; i >= 1970 && i <= yearNow; i++) {
			yearArr.push(i);
		}
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		for (var i = 0; i < yearArr.length; i++) {
			optionStr += "<option value = '"+yearArr[i]+"'>"+yearArr[i]+"</option>";
		}
		$("#cbbYearOfBirth").append(optionStr);

		// cbbMonthOfBirth
		optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		for (var i = 1; i <= 12; i++) {
			optionStr += "<option value = '"+i+"'> Tháng "+i+"</option>";
		}
		$("#cbbMonthOfBirth").append(optionStr);

		// cbbDateOfBirth
		optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		for (var i = 1; i <= 31; i++) {
			optionStr += "<option value = '"+i+"'> Ngày "+i+"</option>";
		}
		$("#cbbDateOfBirth").append(optionStr);
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
			// place of birth
			$("#cbbPlaceOfBirth > ").empty()
			$("#cbbPlaceOfBirth").append(optionStr);
			// native Country
			$("#cbbNativeCountry > ").empty()
			$("#cbbNativeCountry").append(optionStr);
			loadCityDataCombobox("");
		} else {
			$("#cbbCountry > ").empty()
			$("#cbbCountry").prop("disabled", true);
			$("#cbbPlaceOfBirth > ").empty()
			$("#cbbPlaceOfBirth").prop("disabled", true);
			$("#cbbNativeCountry > ").empty()
			$("#cbbNativeCountry").prop("disabled", true);
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
				if (i == 0) {
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
			if ($("#cbbEducation").val() != STATUS_NO_SELECT) {
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
			}
			//loadSpecializedDataByUniverisityId();
		} else {
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").prop("disabled", true);
		}
	}
	// Country name combobox change event process
	$("#cbbCountry").bind("change", function() {
		// load Area name combobox
		$('#textCountryName').text($(this).find("option:selected").text());
		loadCityDataCombobox("");
	});

	// Country name combobox change event process
	$("#cbbCity").bind("change", function() {
		// load District name combobox
		loadDistrictDataByCityId("");
	});

	// District name combobox change event process
	$("#cbbDistrict").bind("change", function() {
		// load Wards name combobox
		loadWardsDataByDistrictId("");
	});

	// Wards name combobox change event process
	$("#cbbWards").bind("change", function() {
		// load Town name combobox
		loadTownDataByWardsId("");
	});

	// Town name combobox change event process
	$("#cbbTown").bind("change", function() {
		// load Groups name combobox
		loadGroupsDataByTownId("");
	});

	$("#cbbEducation").bind("change", function() {
		var optionStr = "<option value='"+ STATUS_NO_SELECT +"'></option>";
		if ($(this).val() != STATUS_NO_SELECT) {
			
			for (var i = 0; i < universityData.length; i++) {
				if (i == 0) {
					optionStr += "<option value='" + universityData[i].universityId + "' selected = 'selected'>" + universityData[i].universityName + "</option>";
				} else {
					optionStr += "<option value='" + universityData[i].universityId + "'>" + universityData[i].universityName + "</option>";	
				}
			}
			$("#cbbUniversity > ").empty()
			$("#cbbUniversity").append(optionStr);
			$("#cbbUniversity").empty().append(optionStr).prop("disabled", false);
		} else {
			$("#cbbUniversity").empty().append(optionStr).prop("disabled", true);
		}
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
							optionStr += "<option value='" + returnedJsonData[i].specializedId + "'>" + returnedJsonData[i].specializedName + "</option>";
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
	function loadCityDataCombobox(cityId) {
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
							if (returnedJsonData[i].cityId == cityId && cityId != "") {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "' selected = 'selected'>" + returnedJsonData[i].cityName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].cityId + "'>" + returnedJsonData[i].cityName + "</option>";
								
							}
						}
						$("#cbbCity").prop("disabled", false);
						$("#cbbDistrict").prop("disabled", false);
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						$("#cbbCity").empty().append(optionStr);
						if (cityId == "") {
							loadDistrictDataByCityId("");
						}
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

	function loadDistrictDataByCityId(districtId) {
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
							if (districtId == returnedJsonData[i].districtId) {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "' selected = 'selected'>" + returnedJsonData[i].districtName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].districtId + "'>" + returnedJsonData[i].districtName + "</option>";
							}
						}
						$("#cbbDistrict").prop("disabled", false);
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						$("#cbbDistrict").empty().append(optionStr);
						if (districtId == "") {
							loadWardsDataByDistrictId("");
						}
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

	function loadWardsDataByDistrictId(wardsId) {
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
							if (wardsId == returnedJsonData[i].wardsId) {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "' selected = 'selected'>" + returnedJsonData[i].wardsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].wardsId + "'>" + returnedJsonData[i].wardsName + "</option>";
							}
						}
						$("#cbbWards").prop("disabled", false);
						$("#cbbTown").prop("disabled", false);
						$("#cbbWards").empty().append(optionStr);
						if (wardsId == "") {
							loadTownDataByWardsId("");
						}
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

	function loadTownDataByWardsId(townId) {
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
							if (townId == returnedJsonData[i].townId) {
								optionStr += "<option value='" + returnedJsonData[i].townId + "' selected = 'selected'>" + returnedJsonData[i].townName + "</option>";
							} else {

								optionStr += "<option value='" + returnedJsonData[i].townId + "'>" + returnedJsonData[i].townName + "</option>";
							}
						}
						$("#cbbTown").prop("disabled", false);
						$("#cbbTown").empty().append(optionStr);
						if (townId == "") {
							loadGroupsDataByTownId("");
						}
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
	
	function loadGroupsDataByTownId(groupId) {
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
							if (groupId == returnedJsonData[i].groupsId) {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "' selected = 'selected'>" + returnedJsonData[i].groupsName + "</option>";
							} else {
								optionStr += "<option value='" + returnedJsonData[i].groupsId + "'>" + returnedJsonData[i].groupsName + "</option>";
							}
						}
						$("#cbbGroups").prop("disabled", false);
						$("#cbbGroups").empty().append(optionStr);
					}  else {
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

	$("#txtNumberOfRelation").focusout(function(){
		if ($(this).val() == 0) {
			$(this).val("");
		}
	});
	
	// check event click button
	$(document).on("click","#btnComfirmRelation", function(){
	    $(this).data('clicked', true);
	});

	// check input before insert Data
	$(document).on("click", "#btnComfirmReport", function() {
		addPerson();
	});

	function checkInput() {
		var checkedFlag = false;
		if ($("#txtKskQuanStt").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +KSKQUANSTT + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			$("#lblKskQuanStt").css("color","red");
			checkedFlag = false;
		} else if ($("#txtLltnStt").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +LLTNSTT + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPersonName").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PERSON_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtIdentityCard").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +IDENTITY_CARD + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPermanentAddress").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PERMANENT_ADDRESS + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtTemporaryResidenceAddress").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +TEMPORARY_RESIDENCE_ADDRESS + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#txtPhone").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +PHONE + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbEducation").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +LEVEL + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbCountry").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +COUNTRY_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbCity").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +CITY_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbDistrict").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +DISTRICT_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbWards").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +WARDS_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbTown").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +TOWN_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if ($("#cbbGroups").val() == STATUS_NO_SELECT) {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +GROUPS_NAME + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} /*else if ($("#txtNumberOfRelation").val() == '') {
			jWarning(VALIDATE_BLANK_FIELDS_MESSAGE + " (" +NUMBER_OF_RELATION + ")", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		} else if (reportDetailReportIdStr == '') {
			jWarning("Bạn chưa thiết lập ghi chú cho mẫu báo cáo!", DIALOG_TITLE, DIALOG_OK_BUTTON);
			checkedFlag = false;
		}*/ else {
			$("label").css("color","#000");
			checkedFlag = true;
		}
		//setLabel();
		return checkedFlag;
	}
	
	function setLabel() {
		alert($(":input[type=text]").length);
		if ($("input[type=text]" ).val() != "") {
			$(this).parent().find("label[for="+$(this).attr('id')+"]").css("color","#000");
		}
	}
	function addPerson() {
		
			// set Object Data to insert or Update
			var personObjectData = {
					personId: $("#txtPersonId").val(),
					cateId: $("#cbbCate").val(),
					statusId: $("#cbbStatus").val(),
					personName: $("#txtPersonName").val(),
					dateOfBirth: $("#cbbDateOfBirth").val(),
					monthOfBirth: $("#cbbMonthOfBirth").val(),
					yearOfBirth: $("#cbbYearOfBirth").val(),
					phone: $("#txtPhone").val(),
					kskquanStt: $("#txtKskQuanStt").val(),
					lltnStt: $("#txtLltnStt").val(),
					identityCard: $("#txtIdentityCard").val(),
					placeOfBirth: $("#cbbPlaceOfBirth").val(),
					nativeCountry: $("#cbbNativeCountry").val(),
					nation: $("#txtNation").val(),
					religion: $("#txtReligion").val(),
					permanentAddress: $("#txtPermanentAddress").val(),
					temporaryResidenceAddress: $("#txtTemporaryResidenceAddress").val(),
					national: $("#cbbCountry").val(),
					cityId: $("#cbbCity").val(),
					districtId: $("#cbbDistrict").val(),
					wardsId: $("#cbbWards").val(),
					townId: $("#cbbTown").val(),
					groupsId: $("#cbbGroups").val(),
					element: "1",
					universityId: $("#cbbUniversity").val(),
					educationalId: $("#cbbEducation").val(),
					graduationYear: "1",
					specializedId: "1",
					jobId: "1",
					workPlace: "1"
			}
			// if modeScreen = 'MODE_NEW'
			// then insert Data
			if (MODE == MODE_NEW) {
				$.ajax({
					type: "POST",
					url: "insertData",
					contentType: "application/json",
					data: JSON.stringify(personObjectData),
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

								alert(relationStr0043);
								$.ajax({
									type: "POST",
									url: "insertNoteReport",
									data: {"noteReportStr": reportDetailReportIdStr,
										   "processYoursellStr": processYoursellStr,
										   "relationStr" : relationStr0043
									},
									async: false,
									success: function(insertNoteReport) {
										if (checkSessionTimeout(returnedJsonData) == 1) return;
										if (returnedJsonData != "") {
											if (returnedJsonData == INSERT_RESULT_SUCCESSFUL) {
												// display message
												jInfo(INSERT_RESULT_SUCCESSFUL_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
												$('<form>', {
													"id": "formTransfer",
													"html": '',
													"method": 'GET',
													"action": rootPath + '0040/'
												}).appendTo(document.body).submit();
											}
										}
									}
								});
							}
						}
					},
					error: function(e) {
						// display error message
						jWarning(ERROR_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					}
				})
			} else if (MODE == MODE_EDIT) {
				
			}
		
	}

	var reportSelectedStr = "";
	var reportSelectedName = "";
	var arrayReportIdArr = [];
	var arrayReportNameArr = [];
	// show popup info click event process
	

	$(document).on("click", ".row_reportId", function() { 
		var selectedReportId = $(this).attr("name");
		// if row selected has't class bg_FCBE00 then add Class bg_FCBE00
		if (!$(this).hasClass("bg_FCBE00")) {
			$(this).addClass("bg_FCBE00");
		} else { // else remove class bg_FCBE00
			$(this).removeClass("bg_FCBE00");
		}
	});

	$(document).on("click", "#btnDetailReport", function() { 
		reportSelectedStr = "";
		reportSelectedName = "";
		// check all tr has row_reportId do has class bg_FCBE00
		$(".row_reportId").each(function(){
			// if it has then reportSelectedStr + id of report
			if ($(this).hasClass("bg_FCBE00")) {
				reportSelectedStr += $(this).attr("id") + ",";
				reportSelectedName += $(this).text() ;
			}
		});
		// catch reportSelectedStr 
		reportSelectedStr = reportSelectedStr.substring(0, reportSelectedStr.length-1);
		reportSelectedName = reportSelectedName.substring(0, reportSelectedStr.length-1);
		$(".noteReport_popup").load(rootPath + "/0051/?reportIdStr=" + reportSelectedStr);
		$("#popupWrapper").hide();
		$("#overlay").hide();
		showPopup($("#popupWrapper1"));
		arrayReportIdArr =  reportSelectedStr.split(",");
		$(".loader").removeClass("display-none");
		setTimeout(function() {
			// reset variables
			// draw table
			//drawResult = drawTableReport();
			drawTableDetailReport(arrayReportIdArr, "");
		}, 1000);
	});

	$(document).on("click","#tabs > ul > li", function(){
		
		var reportIdPopup = $(this).attr("aria-labelledby");
		var dem = 0;
		if (reportDetailReportIdStr.indexOf(reportIdPopup) != -1) {
			dem = 1;
		}
		$(".loader").removeClass("display-none");
		setTimeout(function() {
			// reset variables
			// draw table
			if (dem == 0) {
				drawTableDetailReport(arrayReportIdArr, reportIdPopup);
			}
		}, 1000);
	});

	function drawTableDetailReport(arrayDetailReportIdArr, reportIdPopup) {
		
		if (reportIdPopup == "") {
			reportIdPopup = arrayDetailReportIdArr[0];
		}
		$.ajax({
			url: "../0051/getDetailReport",
			type: "POST",
			data: { "reportId": reportIdPopup },
			success: function(returnJsonData) {
				if (checkSessionTimeout(returnJsonData) == 1) return;
				if (returnJsonData.length == 0) {
					// display error message
					jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
				}
					// clear table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport > #tblBodyDetailReport").find("tbody").remove();
					// create table starts
					var tableStringArray = [];
					// add tbody open tag
					tableStringArray.push("<tbody>");
					for (var i = 0; i < returnJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
						// DetailReportName
						tableStringArray.push("<td id = '"+returnJsonData[i].detailReportId+"' criteriaId = '' class = 'row_DetailReportId algin-center' name = '"+i+"'>"+returnJsonData[i].detailReportName+"</td>");
						// DetailReportName
						tableStringArray.push("<td reportId = '"+returnJsonData[i].reportId+"' detailReportId = '"+returnJsonData[i].detailReportId+"' class = 'criteria_row'>Chọn Tiêu Chí:</td>");
						// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					// append all created string to table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport > #tblBodyDetailReport").append(tableStringArray.join(''));
					// show search result
					$(".cont-box").removeClass("display-none");
					$("#tabs-" +reportIdPopup+ " > #divHeadDetailReport").removeClass("display-none");
					// fix table header and body when scrolling only the table body
					fixTable();
				    // scroll to top of table
					$("#tabs-" +reportIdPopup+ " > #divBodyDetailReport").scrollTop(0).scrollLeft(0);
			}
		});
		$(".loader").addClass("display-none");
	}

	var rowSelected = "";
	var reportCriteria = "";
	var detailReportCriteria = "";
	var reportDetailReportIdStr = "";
	$(document).on("click", ".criteria_row", function() {
		// get row index
		rowSelected = $(this).parent().attr("id");
		
		reportCriteria = $(this).attr("reportId");
		detailReportCriteria = $(this).attr("detailreportId");

		// display criteria info popup
		$("#overlay2").show();
		$.ajax({
			url: "../0051/getCriteria",
			type: "POST",
			data: { "reportId": reportCriteria,
					"detailReportId" : detailReportCriteria
			},
			success: function(returnJsonData) {
				if (checkSessionTimeout(returnJsonData) == 1) return;
				if (returnJsonData.length == 0) {
					// display error message
					jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					$("#overlay2").hide();
					$("#popupWrapper2").hide();
					return false;
				}
					// clear table
					$("#divBodyCriteria > #tblBodyCriteria").find("tbody").remove();
					// create table starts
					var tableStringArray = [];
					// add tbody open tag
					tableStringArray.push("<tbody>");
					for (var i = 0; i < returnJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
						// DetailReportName
						tableStringArray.push("<td reportId = '"+returnJsonData[i].reportId+"' criteriaId = '"+returnJsonData[i].criteraId+"' class = 'criteria_row_selected align-center'>"+returnJsonData[i].criteraName+"</td>");
						// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					// append all created string to table
					$("#divBodyCriteria > #tblBodyCriteria").append(tableStringArray.join(''));
					// show search result
					$(".cont-box").removeClass("display-none");
					$("#divHeadCriteria").removeClass("display-none");
					// fix table header and body when scrolling only the table body
					fixTable();
				    // scroll to top of table
					$("#divBodyCriteria").scrollTop(0).scrollLeft(0);
					showPopup($("#popupWrapper2"));
			}
		});
		
	});

	$(document).on("click","#tabs > ul > li", function(){
		
		var reportIdPopup = $(this).attr("aria-labelledby");
		var dem = 0;
		var n = reportDetailReportIdStr.indexOf(reportIdPopup);
		if (reportDetailReportIdStr.indexOf(reportIdPopup + ":") != -1 ) {
			dem = 1;
			$(".loader").addClass("display-none");
		} else {
			dem = 0;
			$(".loader").removeClass("display-none");
			setTimeout(function() {
				// reset variables
				// draw table
				if (dem == 0) {
					drawTableDetailReport(arrayReportIdArr, reportIdPopup);
				}
			}, 1000);
		}
		
	});
	$(document).on("click", ".criteria_row_selected", function() { 
		var selectedReportId = $(this).attr("criteriaId");
		// if row selected has't class bg_FCBE00 then add Class bg_FCBE00
		if (!$(this).hasClass("bg_FCBE00")) {
			$(this).addClass("bg_FCBE00");
		} else { // else remove class bg_FCBE00
			$(this).removeClass("bg_FCBE00");
		}
	});
	
	var criteriaSelectedNameArr = "";
	var criteriaSelectedStrArr = "";
	
	$(document).on("click", "#btnSelectCriteria", function() {
		criteriaSelectedStr = "";
		criteriaSelectedName = "";
		// check all tr has row_reportId do has class bg_FCBE00
		$(".criteria_row_selected").each(function(){
			// if it has then reportSelectedStr + id of report
			if ($(this).hasClass("bg_FCBE00")) {
				criteriaSelectedStr += $(this).attr("criteriaId") + ",";
				
				criteriaSelectedName += $(this).text() + ",";
			} else {
				// display error message
				jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
				return false;
			}
		});
		if (criteriaSelectedStr != '' || criteriaSelectedName != '') {
			var tempObjectArr = [];
			var reportArrSelected = [];
			// catch reportSelectedStr 
			criteriaSelectedStr = criteriaSelectedStr.substring(0, criteriaSelectedStr.length-1);
			criteriaSelectedName = criteriaSelectedName.substring(0, criteriaSelectedName.length-1);
			// set criteria ID & Name in detailReport Table
			criteriaSelectedNameArr = criteriaSelectedName.split(",")
			criteriaSelectedStrArr = criteriaSelectedStr.split(",")
			for (var i = 0; i < criteriaSelectedStrArr.length; i++) {
				reportDetailReportIdStr += reportCriteria + ":" + detailReportCriteria+ ":" + criteriaSelectedStrArr[i] + ",";
			}
			console.log(reportDetailReportIdStr);
			// reset Name = ""
			criteriaSelectedName = "";
			for (var i = 0; i < criteriaSelectedStrArr.length; i++) {
				criteriaSelectedName += "<button criteriaIdBtn = '"+ criteriaSelectedStrArr[i] +"' class = 'btn btn-info margin-right5' onClick = 'return false;'>" + criteriaSelectedNameArr[i] + "</button>";
			}
			$("#divBodyDetailReport > #tblBodyDetailReport").find("tbody").find("#" + rowSelected).find("td").eq(1).html(criteriaSelectedName);
			$("#overlay2").hide();
			$("#popupWrapper2").hide();
		} else {
			// display error message
			jWarning(ERROR_SELECT, DIALOG_TITLE, DIALOG_OK_BUTTON);
			return false;
		}
	});

	var relationStr = "";
	var btnComfirmRelationClicked = false;
	$(document).on("click", "#btnComfirmRelation", function() {
		// count quality row of table Relation
		var countTrRelation = $('#divBody > #tblBody > tbody > tr').length;
		for (var i = 1; i <= countTrRelation; i++) {
			var countTdRelation = $("#divBody > #tblBody > tbody > tr:nth-child("+i+") td" ).length;
			for (var j = 0; j < countTdRelation; j++) {
				// check <td> in table has empty.
				var textOfTd = $("#divBody > #tblBody > tbody > tr:nth-child("+i+")").find("td").eq(j).text();
				if ( textOfTd == "") {
					jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					relationStr = '';
					btnComfirmRelationClicked = false;
					break;
				} else {
					if (textOfTd != "") {
						btnComfirmRelationClicked = true;
						$(this).addClass("display-none");
						// if j = quality of Td in tr
						if (j == countTdRelation - 1) {
							relationStr += textOfTd + ","
						} else {
							relationStr += textOfTd + ":"
						}
					} else {
						alert ("sdsd");
					}
				}
			}
			
		}
		reportSelectedStr = "";
		reportSelectedName = "";
		
		if (relationStr != "") {
			relationStr0043 = relationStr;
			// get row index
			selectedRowIndex = $(this).attr("name");
			$(".report_popup").load(rootPath + "/0049/");
			if (reportData != '') {
				setTimeout(function() {
					// reset variables
					// draw table
					drawResult = drawTable0045Report();
				}, 1000);
				showPopup($("#popupWrapper"));
			} else {
				// display error message
				jWarning(SEARCH_RESULT_NO_DATA_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
			}
		}
		if (!btnComfirmRelationClicked) {
			$(this).removeClass("display-none");
		} else {
			$(this).addClass("display-none");
		}
		$("#divBody").width($("#divHead").width() + 2);
		$("#divHead").width($("#divHead").width() - 2);
	});


	function drawTable0045Report() {
		if (reportData != '') {
			// clear table
			$("#divBodyReport > #tblBodyReport").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			for (var i = 0; i < reportData.length; i++) {
				// row open tag
				tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
				// reportName
				tableStringArray.push("<td id = '"+reportData[i].reportId+"' class = 'row_reportId algin-center' name = '"+i+"'>"+reportData[i].reportName+"</td>");
				// row close tag
				tableStringArray.push("</tr>");
			}
			// add tbody close tag
			tableStringArray.push("</tbody>");
			// append all created string to table
			$("#divBodyReport > #tblBodyReport").append(tableStringArray.join(''));
			// show search result
			$(".cont-box").removeClass("display-none");
			$("#divHeadReport").removeClass("display-none");
			// fix table header and body when scrolling only the table body
			fixTable();
		    // scroll to top of table
			$("#divBodyReport").scrollTop(0).scrollLeft(0);
		}
	}

	$(document).on("click", "#btnNumberOfRelation", function() {
		// get row index
		var numberOfRelation = $("#txtNumberOfRelation").val();
		selectedRowIndex = $(this).attr("name");
		$(".relationContent").load(rootPath + "/0045/?numberOfRelation="+numberOfRelation);
		setTimeout(function() {
			// reset variables
			// draw table
			drawResult = drawTable0045(numberOfRelation);
			$("#divBody").width($("#divHead").width() + 2);
			
		}, 1000);
		$(this).addClass("display-none");
		
		$("#lblNumberOfRelation").addClass("display-none");
		$("#txtNumberOfRelation").addClass("display-none");
		$("#divBody").width($("#divHead").width() + 2);
		
	});

	var relationArr = ['Cha', 'Mẹ', 'Anh', 'Chị', 'Em', 'Vợ', 'Con'];
	$(document).on("dblclick", "tbody > tr > .relation", function() {
		if (!btnComfirmRelationClicked) {
			var width = $(this).width();
			var optionStr = "<select class = 'cbbChangeText form-control' type = 'text' style = 'width:"+width+";'><option value = "+STATUS_NO_SELECT+"></option>";
			for (var i = 0; i < relationArr.length; i++) {
				if (selectedRelationStr == relationArr[i]) {
					optionStr += "<option value = '"+relationArr[i]+"' selected = 'selected'>"+relationArr[i]+"</option>";
				} else {
					optionStr += "<option value = '"+relationArr[i]+"'>"+relationArr[i]+"</option>";
				}
			}
			optionStr += "</select>";
			$(this).html(optionStr);
		}
			
	});

	$(document).on("click", "tbody > tr > .filed", function() {
		if (!btnComfirmRelationClicked) {
			var width = $(this).width();
			if ($(this).text() != "") {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' value = '"+$(this).text()+"' />");
			} else {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' />");
			}
			$(this).find(".changeText").focus();
		}
	});

	$(document).on("focusout", "tbody > tr > td.filed", function() {
		if (!btnComfirmRelationClicked) {
			var text = $(this).find(".changeText").val();
			$(this).text(text);
		}
	});

	$(document).on("click", "#addNewRelation", function() {
		if (!btnComfirmRelationClicked) {
			var numberOfRelation = $("#txtNumberOfRelation").val();
			// create table starts
			var tableStringArray = [];
			var numberOfRelationPlus = numberOfRelation + 1;
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='row" + numberOfRelationPlus + "'>");
			// relation
			tableStringArray.push("<td class = 'align-center relation '></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filed'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filed'></td>");
			// row close tag
			tableStringArray.push("</tr>");
			// append all created string to table
			$("#divBody > #tblBody").append(tableStringArray.join(''));
		}
	});
	// selected Relation
	var selectedRelationStr = "";
	$(document).on("focusout", "tbody > tr > .relation", function() {
		if (!btnComfirmRelationClicked) {
			var text = $(this).find(".cbbChangeText").val();
			selectedRelationStr = text;
			$(this).text(text);
		}
	});

	function drawTable0045(numberOfRelation) {
		if (numberOfRelation > 0) {
			// clear table
			$("#divBody > #tblBody").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			for (var i = 0; i < numberOfRelation; i++) {
				// row open tag
				tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
				// relation
				tableStringArray.push("<td class = 'align-center relation '></td>");
				// relation
				tableStringArray.push("<td class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td class = 'align-center filed'></td>");
				// relation
				tableStringArray.push("<td class = 'align-center filed'></td>");
				// row close tag
				tableStringArray.push("</tr>");
			}
			// add tbody close tag
			tableStringArray.push("</tbody>");
			// append all created string to table
			$("#divBody > #tblBody").append(tableStringArray.join(''));
			// show search result
			$(".cont-box").removeClass("display-none");
			$("#divHead").removeClass("display-none");
			// fix table header and body when scrolling only the table body
			fixTable();
		    // scroll to top of table
			$("#divBody").scrollTop(0).scrollLeft(0);
		}
	}

	/*  0047   */


	var btnComfirmProcessYourseltClicked = false;
	var btnComfirmRelationClicked = false;

	var processYoursellStr = "";
	// check event click button
	$(document).on("click","#btnComfirmProcessYourselt", function(){
		// count quality row of table Process
		var countTrProcessYoursell = $('#divBodyProcess > #tblBodyProcess > tbody > tr').length;
		for (var i = 1; i <= countTrProcessYoursell; i++) {
			// count quality cell of row i
			var countTdProcessYoursell = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+") td" ).length;
			for (var j = 0; j < countTdProcessYoursell; j++) {
				// check <td> in table has empty.
				var textOfTd = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(j).text()
				// get fromYear & ToYear
				var fromYear = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(0).text();
				var toYear = $("#divBodyProcess > #tblBodyProcess > tbody > tr:nth-child("+i+")").find("td").eq(1).text()
				
				
				if ( textOfTd == "") {
					jWarning(VALIDATE_BLANK_FIELDS_MESSAGE, DIALOG_TITLE, DIALOG_OK_BUTTON);
					processYoursellStr = '';
					break;
				} else {
					// check fromYear < ToYear
					if (fromYear > toYear) {
						jWarning(FROM_YEAR_IS_MUST_SMALL_TO_YEAR, DIALOG_TITLE, DIALOG_OK_BUTTON);
						processYoursellStr = '';
						break;
					} else {
						btnComfirmProcessYourseltClicked = true;
						$(this).addClass("display-none");
						// if j = quality of Td in tr
						if (j == countTdProcessYoursell - 1) {
							processYoursellStr += textOfTd + ","
						} else {
							processYoursellStr += textOfTd + ":"
						}
					}
				}
			}
		} 
		// display-none btnNumberOfRelation
		if (processYoursellStr != '') {
			$(this).data('clicked', true);
			$(this).parent().find("#btnEditProcessYourselt").removeClass("display-none");
			$("#btnNumberOfRelation").removeClass("display-none");
			$("#lblNumberOfRelation").removeClass("display-none");
			$("#txtNumberOfRelation").removeClass("display-none");
		}
	});
	$(document).on("click", "#btnProcessOfYourSelt", function() {
		if (checkInput()) {
			// get row index
			var personId = $("#personId").val();
			selectedRowIndex = $(this).attr("name");
			$(".processOfYourSelt").load(rootPath + "/0047/?personId="+personId);
			setTimeout(function() {
				// reset variables
				// draw table
				drawResult = drawTable();
				$("#divBodyProcess").width($("#divHeadProcess").width() + 2);
			}, 1000);
			// display-none button
			$(this).addClass("display-none");
			$("#btnEditProcessYourselt").css({"display":"none"});
			$("#divBodyProcess").width($("#divHeadProcess").width() + 2);
		}
	});

	var d = new Date();
	var yearNow = d.getFullYear();
	var yearArr = [];
	for (var i = 1970; i >= 1970 && i <= yearNow; i++) {
		yearArr.push(i);
	}
	
	$(document).on("dblclick", ".setYear", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var width = $(this).width();
			var optionStr = "<select class = 'cbbChangeText form-control' type = 'text' style = 'width:"+width+";'><option value = "+STATUS_NO_SELECT+"></option>";
			for (var i = 0; i < yearArr.length; i++) {
				if (selectedYearStr == yearArr[i]) {
					optionStr += "<option value = '"+yearArr[i]+"' selected = 'selected'>"+yearArr[i]+"</option>";
				} else {
					optionStr += "<option value = '"+yearArr[i]+"'>"+yearArr[i]+"</option>";
				}
			}
			optionStr += "</select>";
			$(this).html(optionStr);
		}
	});

	$(document).on("click", "#divBodyProcess > #tblBodyProcess > tbody > tr > .filedProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var width = $(this).width();
			if ($(this).text() != "") {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' value = '"+$(this).text()+"' />");
			} else {
				$(this).html("<input class = 'changeText' type = 'text' width = '"+width+"' />");
			}
			$(this).find(".changeText").focus();
		}
	});

	$(document).on("focusout", "#divBodyProcess > #tblBodyProcess > tbody > tr > td.filedProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var text = $(this).find(".changeText").val();
			$(this).text(text);
		}
	});

	$(document).on("click", "#addProcess", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var numberRow = $("#divBodyProcess > #tblBodyProcess > tr").attr("id");
			// create table starts
			var tableStringArray = [];
			var numberRowPlus = numberRow + 1;
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='row" + numberRow + "'>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear '></td>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filedProcess'></td>");
			// row close tag
			tableStringArray.push("</tr>");
			// append all created string to table
			$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
		}
	});

	// selected Relation
	var selectedYearStr = "";
	$(document).on("mouseleave", ".setYear", function() {
		if (!btnComfirmProcessYourseltClicked) {
			var text = $(this).find(".cbbChangeText").find('option:selected').text();
			selectedYearStr = text;
			$(this).text(text);
		}
	});

	$(document).on('keydown', "#tblBodyProcess > tbody > tr > td", function(event) {
		if(event.keyCode == 9){ //for tab key
			var currentDiv = event.target;
		    $(currentDiv).next("td").click();
		}
	});
	$(document).on('click', '#btnEditProcessYourselt', function(e) {
		btnComfirmProcessYourseltClicked = false;
		$(this).addClass('display-none');
		$(this).parent().find("#btnComfirmProcessYourselt").removeClass("display-none");
	});
	function drawTableProcessEdit() {
		// clear table
		$("#divBodyProcess > #tblBodyProcess").find("tbody").remove();
		// create table starts
		var tableStringArray = [];
		// add tbody open tag
		tableStringArray.push("<tbody>");     
		$.ajax({
			type: "POST",
			url: "getProcessEdit",
			data: { "PersonId": personId },
			async: false,
			success: function(returnedJsonData) {
				if (returnedJsonData.length > 0) {
					for (var i = 0; i < returnedJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='row" + returnedJsonData[i].processPersonId + "'>");
						// relation
						tableStringArray.push("<td class = 'align-center setYear '>"+returnedJsonData[i].fromYear+"</td>");
						// relation
						tableStringArray.push("<td class = 'align-center setYear'>"+returnedJsonData[i].toYear+"</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filedProcess'>"+returnedJsonData[i].content+"</td>");
						// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					// append all created string to table
					$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
					// show search result
					$(".cont-box").removeClass("display-none");
					$("#divHeadProcess").removeClass("display-none");
					// fix table header and body when scrolling only the table body
					fixTable();
				    // scroll to top of table
					$("#divBodyProcess").scrollTop(0).scrollLeft(0);
					btnComfirmProcessYourseltClicked = true;
				}
			}, 
			error: function(e) {
				// display error message
				alert(ERROR_MESSAGE);
			}
		})
	}
	function drawTable() {
		// clear table
		$("#divBodyProcess > #tblBodyProcess").find("tbody").remove();
		// create table starts
		var tableStringArray = [];
		// add tbody open tag
		tableStringArray.push("<tbody>");
		for (var i = 0; i < 1; i++) {
			// row open tag
			tableStringArray.push("<tr class = 'height34' id='row" + i + "'>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear '></td>");
			// relation
			tableStringArray.push("<td class = 'align-center setYear'></td>");
			// relation
			tableStringArray.push("<td class = 'align-center filedProcess'></td>");
			// row close tag
			tableStringArray.push("</tr>");
		}
		// add tbody close tag
		tableStringArray.push("</tbody>");
		// append all created string to table
		$("#divBodyProcess > #tblBodyProcess").append(tableStringArray.join(''));
		// show search result
		$(".cont-box").removeClass("display-none");
		$("#divHeadProcess").removeClass("display-none");
		// fix table header and body when scrolling only the table body
		fixTable();
	    // scroll to top of table
		$("#divBodyProcess").scrollTop(0).scrollLeft(0);
	}

	// function 
	function drawTable0045Edit() {
			// clear table
			$("#divBody > #tblBody").find("tbody").remove();
			// create table starts
			var tableStringArray = [];
			// add tbody open tag
			tableStringArray.push("<tbody>");
			$.ajax({
				type: "POST",
				url: "getRelationShipOfPersonEdit",
				data: { "PersonId": personId },
				async: false,
				success: function(returnedJsonData) {
					for (var i = 0; i < returnedJsonData.length; i++) {
						// row open tag
						tableStringArray.push("<tr class = 'height34' id='row" + returnedJsonData[i].processPersonId + "'>");
						// relation
						tableStringArray.push("<td class = 'align-center relation '>" + returnedJsonData[i].relation + "</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filed'>" + returnedJsonData[i].status + "</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filed'>" + returnedJsonData[i].birthDay + "</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filed'>" + returnedJsonData[i].job + "</td>");
						// relation
						tableStringArray.push("<td class = 'align-center filed'>" + returnedJsonData[i].workPlace + "</td>");
						// row close tag
						tableStringArray.push("</tr>");
					}
					// add tbody close tag
					tableStringArray.push("</tbody>");
					// append all created string to table
					$("#divBody > #tblBody").append(tableStringArray.join(''));
					// show search result
					$(".cont-box").removeClass("display-none");
					$("#divHead").removeClass("display-none");
					// fix table header and body when scrolling only the table body
					fixTable();
				    // scroll to top of table
					$("#divBody").scrollTop(0).scrollLeft(0);
					btnComfirmRelationClicked = true;
				}, 
				error: function(e) {
					// display error message
					alert(ERROR_MESSAGE);
				}
			});
	}
});
