/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: 'Next',
		prevText: 'Previous',
		nextText: 'Next',
		currentText: 'A',
		monthNames: ['Jannualy','Febuary','Match','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['Monday','TuesDay','WednesDay','ThursDay','FriDay','SaturDay','SunDay'],
		dayNamesShort: ['Mo','Tu','We','Th','Fr','Sa','Su'],
		dayNamesMin: ['Mo','Tu','We','Th','Fr','Sa','Su'],
		weekHeader: 'Week',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '-'};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});