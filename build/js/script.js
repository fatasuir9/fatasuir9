// Loading screen before page loads
$(window).load(function() {
	// Animate loader off screen
	$('.load').fadeOut('slow');
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
