(function () {
  'use strict';

  window.addEventListener('DOMContentLoaded', function () {
    toggleMenu();
    getInstagramImages();
    rotateImages();
    handleLocation();
  });

}());

function setAppState(location) {
	history.pushState({}, "Nani's Dough - " + location.capitalize, location);
	document.title = "Nani's Dough - " + location;
}

function handleLocation() {
	if (window.location.pathname.length > 2)
	switch (window.location.pathname) {
		case "/doughnuts":
			$('.contact').fadeOut();
			$('.about').fadeOut();

			$('.doughnuts').fadeIn("slow", function () {
				$(this).addClass('active');
				$('html, body').animate({
					scrollTop: $(this).offset().top
				}, 300);
			});
			break;
		case "/contact":
			$('.doughnuts').fadeOut();
			$('.about').fadeOut();

			$('.contact').fadeIn("slow", function () {
				$(this).addClass('active');
				$('html, body').animate({
					scrollTop: $(this).offset().top
				}, 300);
			});
			break;

		default: 
			$('.contact').fadeOut();
			$('.doughnuts').fadeOut();

			$('.about').fadeIn("slow", function () {
				$(this).addClass('active');
				$('html, body').animate({
					scrollTop: $(this).offset().top
				}, 300);
			});
	}
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function toggleMenu() {
	$('.nav__main a').click(function(e) {
		e.preventDefault();

		const fade_in_section = '.'+this.innerText.toLowerCase();

		$('html, body').animate({
			scrollTop: $(fade_in_section).offset().top
		}, 300);

		if (!$(this).hasClass('active')) {
			$('.doughnuts').fadeOut();
			$('.contact').fadeOut();
			$('.about').fadeOut();

			$('.nav__main a').removeClass('active');

			$(fade_in_section).fadeIn("slow", function () {
				$(this).addClass('active');
			});
		}

		//update app history url
		setAppState(this.innerText.toLowerCase());
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

function rotateImages() {
	const images = [
		'/images/doughnuts/d_1.jpg',
		'/images/doughnuts/d_2.jpg',
		'/images/doughnuts/d_3.jpg',
		'/images/doughnuts/d_4.jpg',
		'/images/doughnuts/d_5.jpg'
	]

	//Insert first image
	$('.images').css({
		backgroundImage: 'url('+images[0]+')'
	})

	let i = 1;

	setInterval(function () {
		$('.images')
		.fadeOut("slow", function () {
			$(this).css({
				backgroundImage: 'url('+images[i]+')'
			})
			.fadeIn("slow");
		})

		i++;

		if (i===4) {
			i = 0;			
		}
	}, 7000)

}
