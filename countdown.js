(function(){

	// Number of seconds in every time division
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;

	countdown = function(prop){

		var options = _.extend({
			callback	: function(){},
			timestamp	: 0
		},prop);

		var left, d, h, m, s, positions;

		(function tick(){

			left = Math.floor((options.timestamp - (new Date())) / 1000);

			if(left < 0){
				left = 0;
			}

			// Number of days left
			d = Math.floor(left / days);
			left -= d*days;

			// Number of hours left
			h = Math.floor(left / hours);
			left -= h*hours;

			// Number of minutes left
			m = Math.floor(left / minutes);
			left -= m*minutes;

			// Number of seconds left
			s = left;

			options.callback(d, h, m, s);

			setTimeout(tick, 1000);
		})();

		return this;
	};
})();