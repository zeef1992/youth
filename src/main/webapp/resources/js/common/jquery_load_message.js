(function($) {
	var screen = "";
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
		repositionOnResize: true,           // re-centers the dialog on window resize
		overlayOpacity: .01,                // transparency level of overlay
		overlayColor: '#FFF',               // base color of overlay
		draggable: true,                    // make the dialogs draggable (requires UI Draggables plugin)
		okButton: '&nbsp;OK&nbsp;',         // text for the OK button
		haiButton: '&nbsp;はい&nbsp;',       // text for the はい button
		iieButton: '&nbsp;いいえ&nbsp;', 	    // text for the いいえ button
		dialogClass: null,                  // if specified, this class will be applied to all dialogs
		
		// Public methods
		
		info: function(message, title, callback, name) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'info', name, function(result) {
				if( callback ) callback(result);
			});
		},
		
		warning: function(message, title, callback, name) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'warning', name, function(result) {
				if( callback ) callback(result);
			});
		},
		
		info_confirm: function(message, title, callback, name) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'info_confirm', name, function(result) {
				if( callback ) callback(result);
			});
		},
			
		question_confirm: function(message, title, callback, name) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'question_confirm', name, function(result) {
				if( callback ) callback(result);
			});
		},
			
		confirm: function(message, title, callback, name) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'confirm', name, function(result) {
				if( callback ) callback(result);
			});
		},
			
		error: function(message, title, callback, name) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'error', name, function(result) {
				if( callback ) callback(result);
			});
		},

		message: function(message, title, callback, name) {
			if( title == null ) title = 'Alert';
			$.alerts._show(title, message, null, 'message', name, function(result) {
				if( callback ) callback(result);
			});
		},

		question_warning: function(message, title, callback, name) {
			if( title == null ) title = 'Confirm';
			$.alerts._show(title, message, null, 'question_warning', name, function(result) {
				if( callback ) callback(result);
			});
		},
			
		// Private methods
		
		_show: function(title, msg, value, type, name, callback) {
			
			screen = name;
			
			$.alerts._hide();
			$.alerts._overlay('show');
			
			$("BODY").append(
			  '<div id="popup_container">' +
			    '<h1 id="popup_title"></h1>' +
			    '<div id="popup_content">' +
			      '<div id="popup_message"></div>' +
				'</div>' +
			  '</div>');
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			$("#popup_container").css({
				position: 'fixed',
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'info':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'warning':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'info_confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.haiButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.iieButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'question_confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.haiButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.iieButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.haiButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.iieButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'error':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'message':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'question_warning':
					$("#popup_message").after('<div id="popup_panel"><input type="button" value="' + $.alerts.haiButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.iieButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
			}

			$("#popup_ok, #popup_cancel").keydown(function(e) {
				if ( e.keyCode == 8 ) e.preventDefault();
			});

			// Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables */ }
			}
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						border: '0px',
						padding: '0px',
						margin: '0px',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						bottom: '0px',
						width: '100%',
						height: $(document).height() -5,
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();					
				break;
			}
		},
		
		_reposition: function() {
			if(screen == "") {
				var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2) + 20) + $.alerts.verticalOffset;
				var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			} else {
				var top = (($(screen).height() / 2) - ($("#popup_container").outerHeight() / 2) + 100) + $.alerts.verticalOffset;
				var left = (($(screen).width() / 2) - ($("#popup_container").outerWidth() / 2) + 20) + $.alerts.horizontalOffset;
			}
			
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height()-5);
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
	}
	
	// Shortuct functions
	jInfo = function(message, title, callback, name) {
		$.alerts.info(message, title, callback, name);
	}
	
	jWarning = function(message, title, callback, name) {
		$.alerts.warning(message, title, callback, name);
	}
	
	jInfo_confirm = function(message, title, callback, name) {
		$.alerts.info_confirm(message, title, callback, name);
	};
		
	jQuestion_confirm = function(message, title, callback, name) {
		$.alerts.question_confirm(message, title, callback, name);
	};
	
	jConfirm = function(message, title, callback, name) {
		$.alerts.confirm(message, title, callback, name);
	};

	jError = function(message, title, callback, name) {
		$.alerts.error(message, title, callback, name);
	};

	jMessage = function(message, title, callback, name) {
		$.alerts.message(message, title, callback, name);
	};

	jQuestion_warning = function(message, title, callback, name) {
		$.alerts.question_warning(message, title, callback, name);
	};

})(jQuery);