// Check for service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
			.register('../service-worker.js')
			.then(function() { console.log('Service Worker Registered'); });
}

// Loading screen before page loads
$(window).load(function() {
	// Animate loader off screen
	$('.load').delay(1200).fadeOut('slow');
});

// Copyright snippet
$(document).ready(function() {
	$('.copyright').append('©' + ' ' + new Date().getFullYear() + ' ' + 'All Rights Reserved.');
});

// Offside menu
var offsideMenu1 = offside( '.menu', {

	slidingElementsSelector: '.offside-content',
	debug: true,
	buttonsSelector: '.btn--menu',
	slidingSide: 'left',
	beforeOpen: function(){},
	beforeClose: function(){},
});

var overlay = document.querySelector('.overlay')
.addEventListener( 'click', window.offside.factory.closeOpenOffside );
