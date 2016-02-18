(function () {
  'use strict';

  $(document).ready(function () {
  	toggleMenu();
    getInstagramImages();
    rotateImages();
    handleLocation();
    contactFormValidation();
    videoSizing();
    googleAnalytics();
  })

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

function videoSizing() {
	$(document).ready(function () {
		$('.video').height($('.video video').height()+90);
		$(window).on('resize', function () {
			$('.video').height($('.video video').height());
		})
	})
}

function contactFormValidation(){
	var $form = $('#contact_form');
	$form.on('submit', function(e) { // listen for form submitting
		e.preventDefault();
    if (!e.target.checkValidity()) {
        swal({   
        	title: 'Error!',   
        	text: 'Form is incomplete',   
        	type: 'error',
        	confirmButtonText: 'Ok' 
        });
    }
    else {
    	$.ajax({
    		method: 'POST',
    		url: '/contact',
    		data: $form.serialize()
    	}).done(function() {
    		console.log('done');
    	})
    }
  });
}

function googleAnalytics() {
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-40485439-7', 'auto');
    ga('send', 'pageview');
  </script>
}
