(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    toggleMenu();
    getInstagramImages();
  });

}());


function toggleMenu() {
	$('.nav__main a').click(function(e) {
		e.preventDefault();

		if (!$(this).hasClass('active')) {
			$('.doughnuts').fadeOut();
			$('.contact').fadeOut();
			$('.about').fadeOut();

			$('.nav__main a').removeClass('active');

			const fade_in_section = '.'+this.innerText.toLowerCase();

			$(fade_in_section).fadeIn("slow", function () {
				$('html, body').animate({
					scrollTop: $(fade_in_section).offset().top
				}, 300);
				$(this).addClass('active');
			});
		}
	})
}

function getInstagramImages() {
	let feed = new Instafeed({
									get: 'user',
									userId: '2233485228',
									accessToken: '2233485228.745c638.53ad455a211e4250a9e0bbc34ff3b0ac',
									resolution: 'low_resolution',
									template: '<div class="doughnut"><a href="{{link}}"" target="_blank"><img src="{{image}}"/></a></div>',
									after: function () {
										masonryInit();
									}
	})

	feed.run();
}

function masonryInit() {
	var $instafeed = $('#instafeed').masonry({
		itemSelector: '.doughnut',
		fitWidth: true
	}); 

	$instafeed.imagesLoaded().progress( function() {
	  $instafeed.masonry('layout');
	});
}
