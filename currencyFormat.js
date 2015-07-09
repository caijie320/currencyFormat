(function($) {
	$.fn.setting = {
			sign: "¥",
			digit: 2
	};
    $.fn.currencyFormat = function(options) {
    	if(typeof options === 'undefined'){
    		options = {};
    	}
		if (typeof options === 'object') {
			options = $.extend(true, $.fn.setting, options);
			var origGetHook;
			var origSetHook;
			if ($.valHooks.text) {
				if ($.valHooks.text.get) origGetHook = $.valHooks.text.get;
				if ($.valHooks.text.set) origSetHook = $.valHooks.text.set;
			}
			else $.valHooks.text = {};

			$.valHooks.text.get = function(el) {
				if (!$(el).attr('data-currencyFormat')) {
					if (origGetHook) return origGetHook(el);
					else return undefined;
				}
				return $.fn.currencyFormat.unformatCurrency(el.value);
			};

			$.valHooks.text.set = function(el, value) {
				if (!$(el).attr('data-currencyFormat')) {
					if (origGetHook) return origSetHook(el);
					else return undefined;
				}
				el.value = $.fn.currencyFormat.formatCurrency(value);
			};

			return this.filter('input').each(function() {
				$(this).attr('data-currencyFormat', '1');
				this.value = $.fn.currencyFormat.formatCurrency(this.value);
				$(this).focus(function() {
					this.value = $.fn.currencyFormat.unformatCurrency(this.value);
				}).blur(function() {
					this.value = $.fn.currencyFormat.formatCurrency(this.value);
				});
			});
			
		}else if (typeof options === 'string' && options === 'formatted') {
			return $.fn.currencyFormat.formatCurrency(this.get(0).value);
		}
 
    };
 
 	$.fn.currencyFormat.unformatCurrency = function(result) {
		return result.replace(/[^-0-9\.]/g, '');
	};

	$.fn.currencyFormat.formatCurrency = function(result) {
		result = result.replace(/[^-0-9\.]/g, '');
		result = parseFloat(result);
		if (isNaN(result)){
			if($.fn.setting.digit < 1){
				return $.fn.setting.sign + "0";
			}
			var zero = $.fn.setting.sign + "0.";
			for(var i = 0;i < $.fn.setting.digit;i++){
				zero = zero + "0";
			}
			return zero;
		}
		var sign = result < 0 ? '-' : '';
		result = Math.abs(result);
		var integer = parseInt(result) + '';
		var firstComma = integer.length > 3 ? integer.length % 3 : 0;
		result = result.toFixed($.fn.setting.digit);
		if($.fn.setting.digit < 1) return $.fn.setting.sign + sign + (firstComma ? integer.substr(0, firstComma) + ',' : '') + integer.substr(firstComma).replace(/(\d{3})(?=\d)/g, '$1' + ',');
		return $.fn.setting.sign + sign + (firstComma ? integer.substr(0, firstComma) + ',' : '') + integer.substr(firstComma).replace(/(\d{3})(?=\d)/g, '$1' + ',') + '.' + result.slice(-$.fn.setting.digit);	
	};
 
}(jQuery));
