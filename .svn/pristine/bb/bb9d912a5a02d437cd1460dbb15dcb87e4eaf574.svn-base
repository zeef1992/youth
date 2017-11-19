$(document).ready(function (){
	
	/****************************************************************************
	****LOAD CALENDAR******
	****************************************************************************/
	//handle load calendar
	$(".calendar").datepicker({
		showOn:"button",
		buttonImage:"../resources/img/calendar.gif",
		buttonImageOnly : true,
		buttonText : "Select date"
	});
	$(".calendar").change(function(){
		var date_val = $(this).datepicker().val();
		var date = $(this).datepicker('getDate');
		var day = $.datepicker.formatDate('DD', date).substring(0,1);
		$($(this).parent().children(".cal_text")).val(date_val);
		$($(this).parent().children(".cal_text")).focus();
	});
	/****************************************************************************
	****LOAD CALENDAR END******
	****************************************************************************/
});

function load_calendar() {
	$(".calendar").datepicker({
		showOn:"button",
		buttonImage:"resources/img/calendar.gif",
		buttonImageOnly : true,
		buttonText : "Select date"
	});
	$(".calendar").change(function(){
		var date_val = $(this).datepicker().val();
		var date = $(this).datepicker('getDate');
		var day = $.datepicker.formatDate('DD', date).substring(0,1);
		$($(this).parent().children(".cal_text")).val(date_val);
		$($(this).parent().children(".cal_text")).focus();
	});
}