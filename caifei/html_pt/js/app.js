(function(document,window){
	var docEl = document.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var tagFont = 100 * (docEl.clientWidth / 375);
			if (tagFont > 500) {
				docEl.style.fontSize = '200px'
			} else {
				docEl.style.fontSize = 100 * (docEl.clientWidth / 375) + 'px'
			}
		};
	
	window.addEventListener(resizeEvt, recalc, false);
	document.addEventListener('DOMContentLoaded', recalc, false);	
})(document,window);


