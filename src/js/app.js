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


			$('.'+this.innerText.toLowerCase()).fadeIn();
			$(this).addClass('active');
		}
		
	})
}

function getInstagramImages() {
	let feed = new Instafeed({
									get: 'user',
									userId: '2233485228',
									accessToken: '2233485228.745c638.53ad455a211e4250a9e0bbc34ff3b0ac',
									resolution: 'low_resolution',
									template: '<a href="{{link}}" target="_blank" title="{{caption}}"><img src="{{image}}"/></a>'

	})

	feed.run();
}
