(function(){

	countup = function(prop){

		// Number of seconds in every time division
		m2sec	= 60;
		h2sec	= 60 * m2sec;
		d2sec	= 24 * h2sec;
		y2sec = 365 * d2sec;

		options = _.extend({
			callback	: function(){},
			start		: new Date(),
			format: '%Y::%M::%d:%h:%m:%s',
			debug: true
		},prop);

		if (!options.debug) {
			console.log = function(){}
		}

		var passed = 0, Y, M, d, h, m, s;

		(function tick() {
			now = new Date();
			var _trail = _.cloneDeep(options.start);
			passed = Math.floor((now - options.start) / 1000);
			console.log('passed in days', passed / d2sec);

			// YEARS
			if (options.format.indexOf('%Y') > -1) {
				var Y_passed_in_sec;
				Y = now.getFullYear() - options.start.getFullYear() - 1;
				var leapYearOffset = 0;
				for (var i=0; i < Y; i++) {
					if (isLeapYear(options.start.getFullYear() + i)){
						leapYearOffset ++;
					}
				}
				Y_passed_in_sec = Y * y2sec + leapYearOffset * d2sec;
				passed -= Y_passed_in_sec;
			}

			// MONTHS
			if (options.format.indexOf('%M') > -1) {

				_trail.setTime(_trail.getTime() + Y_passed_in_sec * 1000)
				console.log('Month_trail', _trail.toString());

				M = getMonthDiff(_trail, now);
				var m_init = _trail.getMonth();
				var y_init = _trail.getFullYear();

				var M_passed_in_sec = daysInMonth(m_init, y_init) - _trail.getDate();
				for (var _idx=m_init + 1; _idx <= m_init + M; _idx++) {
					M_passed_in_sec += daysInMonth(_idx, y_init) * d2sec;
				}
				passed -= M_passed_in_sec
			}

			// DAYS
			if (options.format.indexOf('%d') > -1) {
				_trail.setTime(_trail.getTime() + M_passed_in_sec * 1000);
				console.log('Day_trail', _trail.toString());

				d = Math.floor((now.getTime() -_trail.getTime())/(1000*d2sec));
				d_passed_in_sec = d*d2sec;
				passed -= d_passed_in_sec;
			}

			// HOURS
			if (options.format.indexOf('%h') > -1) {
				_trail.setTime(_trail.getTime() + d_passed_in_sec * 1000);
				console.log('Hour_trail', _trail.toString());

				h = Math.floor(passed / h2sec);
				h_passed_in_sec = h*h2sec
				passed -= h*h2sec;
			}

			// MINUTES
			if (options.format.indexOf('%m') > -1) {
				_trail.setTime(_trail.getTime() + h_passed_in_sec * 1000);
				console.log('Min_trail', _trail.toString());
				m = Math.floor((now.getTime() -_trail.getTime())/(1000*m2sec));
				passed -= m * m2sec;
			}

			// SECONDS
			if (options.format.indexOf('%m') > -1) {
				s = passed;
			}
			var formattedStr = getFormattedCountUp(Y,M,d,h,m,s);
			options.callback(formattedStr);

			setTimeout(tick, 1000);
		})();

		return this;
	};

	function getFormattedCountUp(y, M, d, h, m, s){
		var str = options.format
		str = str.replace("%Y", y);
		str = str.replace("%M", M);
		str = str.replace("%d", d);
		str = str.replace("%h", h);
		str = str.replace("%m", m);
		str = str.replace("%s", s);
		return str;
	}

	function isLeapYear(year) {
  	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}

	function getMonthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
	}

	function daysInMonth(month, year) {
		var days = new Date(year, month, 0).getDate();
    return days;
	}

})();