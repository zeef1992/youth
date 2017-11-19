
$(document).ready(function() {

	// get application url
	var rootPath = getContextPath();

	// Login button event process
	$("#btnLogin").bind("click", function() {
		var username = $("#j_username").val();
		var password = $("#j_password").val();
		var login_ret = login(username, password, "j_spring_security_check");
		switch (login_ret) {
			case 0: // success
				// redirect to home page
				var url = rootPath + "/searchFarmScreen/";
				window.location.href = url;
				break;
			case 1: // wrong user name or password
				// redirect to authentication error page
				var url = rootPath + "/autherror";
				window.location.href = url;
				break;
			case 2: // connection error
				// show error message
				alert("error!");
				break;
			default: // unknown error
				break;
		}
	});

	/**
	 * execute login to system
	 * @param username
	 * @param password
	 * @param login_url authenticating url
	 * @return login result
	 *   0: success
	 *   1: wrong username or password
	 *   2: connection error
	 *   -1: known error
	 */
	function login(username, password, login_url) {
		var login_ret = -1;
		$.ajax({
			type: "POST",
			url: login_url,
			async: false,
			data: {"j_username": username, "j_password": password},
			success: function(data) {
				if (checkLoginSuccess(data) == 0) {
					// success
					login_ret = 0;
				} else {
					// wrong username or password
					login_ret = 1;
				}
			},
			error: function(e) {
				// connection error
				login_ret = 2;
			},
			complete: function(jqXHR,textStatus) {
				
			}
		});

		return login_ret;
	}
	function checkLoginSuccess(object) {
		if (object.constructor === "string".constructor) {
			if (object.indexOf("/resources/js/load_calendar.js") > -1) {
				return 0;
			}
		}
		return 1;
	}
});