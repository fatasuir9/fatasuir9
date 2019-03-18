// Loading screen before page loads
$(window).load(function() {
	// Animate loader off screen
	$('.load').delay(1200).fadeOut('slow');
});


$(document).ready(function() {
	// Copyright snippet
	$('.copyright').append('©' + ' ' + new Date().getFullYear() + ' ' + 'All Rights Reserved.');

	// Dark Mode
	if($.cookie('darkmode') == 1) {
		$('html').addClass('dark');
	}

	$('#dark').click(function() {
		if($('html').hasClass('dark') == true) {
			$('html').removeClass('dark');
			$('#dark img').attr('src', '../../images/icons/icon-night.svg');
			$.cookie('darkmode', '0', {path: '/'});
		}
		else {
			$('html').addClass('dark');
			$('#dark img').attr('src', '../../images/icons/icon-day.svg');
			$.cookie('darkmode', '1', {path: '/'});
		}
	});

	if($('html').hasClass('dark') == true) {
		$('#dark img').attr('src', '../../images/icons/icon-day.svg');
	} else {
		$('#dark img').attr('src', '../../images/icons/icon-night.svg');
	}

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
