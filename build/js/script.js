// Loading screen before page loads
$(window).load(function() {
	// Animate loader off screen
	$('.load').fadeOut('slow');
});

// Copyright snippet
$(document).ready(function() {
	$('.copyright').append('©' + ' ' + new Date().getFullYear() + ' ' + 'All Rights Reserved.');
});
