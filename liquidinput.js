/*
 *	The MIT License (MIT)
 *
 *	Copyright (c) 2014 Edward Anthony
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 */

(function($, undefined) {

	body = $('body');

	var getTextWidth = function(input) {
		inputPrototype = $('<span></span>', {
			text: input.val(),
			style: 'position: absolute;top: -10000px;font-size:' +  input.css('font-size') + ';' 
		});

		body.prepend(inputPrototype);
		textWidth = inputPrototype.width();

		inputPrototype.remove();

		return textWidth;
	}

	$.fn.liquidInput = function(options) {

		// prepare the options data
		if(typeof options === 'number' || typeof options === 'string') {
			$.fn.liquidInput.options.minFontSize = parseFloat(options);
		} else {
			$.fn.liquidInput.options = $.extend({}, $.fn.liquidInput.options, options);
		}

		options = $.fn.liquidInput.options;		

		var $this = $(this),
			 inputWidthActiveArea = $this.width(),
			 originalFontSize = parseInt($this.css('font-size')),
			 fontSize = parseInt(originalFontSize);
			 textWidth = getTextWidth($this);

		// if normal key pressed
		$this.on('keydown', function(e) {
			if( e.keyCode !== 8 && e.keyCode !== 46 ) {
				var textWidth = getTextWidth($this);

				while( (textWidth / inputWidthActiveArea) >= (8 / 10) && fontSize >= (options.minFontSize * originalFontSize) ) {
					$this.css('font-size', '-=1');
					fontSize--;
					textWidth = getTextWidth($this);	
				}
			}
		});

		// backspace
		$this.on('keyup', function(e) {
			if( e.keyCode == 8 || e.keyCode == 46 ) {
				var textWidth = getTextWidth($this);

				while( (textWidth / inputWidthActiveArea) <= (8 / 10) && fontSize < originalFontSize ) {
					$this.css('font-size', '+=1');
					fontSize++;
					textWidth = getTextWidth($this);
				}	
			}
		});


	};

	$.fn.liquidInput.options = 
	{
		minFontSize: 0.6
	};



})(jQuery);