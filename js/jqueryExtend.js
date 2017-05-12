;(function($){
	
	$.fn.popup = function(action,settings){
		var defaults = {
			color : 'red',
			font  : '20px'
		}
		var settings = $.extend(true, settings, defaults); 
		
		if(action === 'close'){
	
			return this.css({
				color : settings.color,
				font  : settings.font
			})

		}

		if(action === 'open'){
	
			console.log('open');
		}
	}
}(jQuery))

