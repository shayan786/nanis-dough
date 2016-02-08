(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    toggleMenu();
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
