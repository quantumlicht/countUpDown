/**
 * @name		jQuery Count-UP Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2012/09/count-up-jquery/
 * @license		MIT License
 */

(function(){



	// Creating the plugin
	countup = function(prop){

		// Number of seconds in every time division
		minute_to_sec	= 60;
		hour_to_sec	= 60 * minute_to_sec;
		day_to_sec	= 24 * hour_to_sec;
		year_to_sec = 365 * day_to_sec;

		options = _.extend({
			callback	: function(){},
			start		: new Date(),
			format: '%Y:%M:%d:%h:%m:%s'
		},prop);

		var passed = 0, y, M, d, h, m, s;
		var yearpassed_in_secs = 0;

		// Initialize the plugin
		// init(this, options);
		(function tick() {
			console.log('============ NEW TICK ==========');
			console.log('== ' + options.start.toString() + ' ==');
			console.log('============ NEW TICK ==========');
			now = new Date();

			passed = Math.floor((now - options.start) / 1000);

			// YEARS
			if (options.format.indexOf('%Y') > -1) {
				y = now.getFullYear() - options.start.getFullYear() - 1;
				var dayOffset = 0;
				for (var i=0; i < y; i++) {
					if (isLeapYear(options.start.getFullYear() + i)){
						dayOffset ++;
					}
				}
				yearpassed_in_secs = y*year_to_sec - dayOffset * day_to_sec;
				passed -= yearpassed_in_secs;
			}


			// MONTHS
			if (options.format.indexOf('%M') > -1) {
				M = getMonthDiff(options.start, now);
				if (y) {
					M -= y*12;
				}
				var monthsInDays = 0,
						startYear    = options.start.getFullYear() + y,
						startMonth   = 0;

				for (var i=0; i < M; i++) {
					year = startYear + Math.floor(i/12)
					month = (startMonth + i)%12
					console.log('month', month)
					monthsInDays += daysInMonth(year, month);
				}
				console.log('monthsInDays', monthsInDays);
				passed -= (monthsInDays * day_to_sec);
			}

			// DAYS
			if (options.format.indexOf('%d') > -1) {
				d = Math.floor(passed / day_to_sec);
				// updateDuo(0, 1, d);
				passed -= d*day_to_sec;
			}

			// HOURS
			if (options.format.indexOf('%h') > -1) {
				h = Math.floor(passed / hour_to_sec);
				// updateDuo(2, 3, h);
				passed -= h*hour_to_sec;
			}

			// MINUTES
			if (options.format.indexOf('%m') > -1) {
				m = Math.floor(passed / minute_to_sec);
				// updateDuo(4, 5, m);
				passed -= m*minute_to_sec;
			}

			// SECONDS
			if (options.format.indexOf('%m') > -1) {
				s = passed;
				// updateDuo(6, 7, s);
			}

			console.log(y,M,d,h,m,s);
			var formattedStr = getFormattedCountUp(y,M,d,h,m,s);
			// Calling an optional user supplied callback
			console.log('formattedStr', formattedStr)
			options.callback(formattedStr);

			// Scheduling another call of this function in 1s
			setTimeout(tick, 1000);
		})();

		// This function updates two digit positions at once
		// function updateDuo(minor,major,value){
		// 	switchDigit(positions.eq(minor),Math.floor(value/10)%10);
		// 	switchDigit(positions.eq(major),value%10);
		// }

		return this;
	};

	function getFormattedCountUp(y, m, d, h, m, s){
		var str = options.format
		str = str.replace('%Y', y);
		str = str.replace('%M', m);
		str = str.replace('%d', d);
		str = str.replace('%h', h);
		str = str.replace('%m', m);
		str = str.replace('%s', s);
		return str;
	}

	function isLeapYear(year) {
  	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	function getMonthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
	}

	function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
	}
	// function init(elem, options){
	// 	elem.addClass('countdownHolder');

	// 	// Creating the markup inside the container
	// 	$.each(['Days','Hours','Minutes','Seconds'],function(i){
	// 		$('<span class="count'+this+'">').html(
	// 			'<span class="position">\
	// 				<span class="digit static">0</span>\
	// 			</span>\
	// 			<span class="position">\
	// 				<span class="digit static">0</span>\
	// 			</span>'
	// 		).appendTo(elem);

	// 		if(this!="Seconds"){
	// 			elem.append('<span class="countDiv countDiv'+i+'"></span>');
	// 		}
	// 	});

	// }

	// // Creates an animated transition between the two numbers
	// function switchDigit(position,number){

	// 	var digit = position.find('.digit')

	// 	if(digit.is(':animated')){
	// 		return false;
	// 	}

	// 	if(position.data('digit') == number){
	// 		// We are already showing this number
	// 		return false;
	// 	}

	// 	position.data('digit', number);

	// 	var replacement = $('<span>',{
	// 		'class':'digit',
	// 		css:{
	// 			top:'-2.1em',
	// 			opacity:0
	// 		},
	// 		html:number
	// 	});

	// 	// The .static class is added when the animation
	// 	// completes. This makes it run smoother.

	// 	digit
	// 		.before(replacement)
	// 		.removeClass('static')
	// 		.animate({top:'2.5em',opacity:0},'fast',function(){
	// 			digit.remove();
	// 		})

	// 	replacement
	// 		.delay(100)
	// 		.animate({top:0,opacity:1},'fast',function(){
	// 			replacement.addClass('static');
	// 		});
	// }
})();