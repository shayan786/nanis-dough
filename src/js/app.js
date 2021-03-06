(function () {
  'use strict';

  $(document).ready(function () {
  	toggleMenu();
    // getInstagramImages();
    noInstafeedImages();
    rotateImages();
    handleLocation();
    contactFormValidation();
    videoSizing();
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
      $('.location').fadeOut();

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
      $('.location').fadeOut();

			$('.contact').fadeIn("slow", function () {
				$(this).addClass('active');
				$('html, body').animate({
					scrollTop: $(this).offset().top
				}, 300);
			});
			break;
    case "/location":
      $('.doughnuts').fadeOut();
      $('.about').fadeOut();
      $('.contact').fadeOut();

      $('.location').fadeIn("slow", function () {
        $(this).addClass('active');
        $('html, body').animate({
          scrollTop: $(this).offset().top
        }, 300);
      });
      break;

		default: 
			$('.contact').fadeOut();
			$('.doughnuts').fadeOut();
      $('.location').fadeOut();

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
  // Desktop
	$('.nav__main_desktop a, .nav__main_mobile a').click(function(e) {
		e.preventDefault();
		const fade_in_section = '.'+this.innerText.toLowerCase();
		$('html, body').animate({
			scrollTop: $(fade_in_section).offset().top
		}, 300);

		if (!$(this).hasClass('active')) {
			$('.doughnuts').fadeOut();
			$('.contact').fadeOut();
			$('.about').fadeOut();
      $('.location').fadeOut();

			$('.nav__main a').removeClass('active');

			$(fade_in_section).fadeIn("slow", function () {
				$(this).addClass('active');
				$('html, body').animate({
					scrollTop: $(fade_in_section).offset().top
				}, 300);
			});
		}

		//update app history url
		setAppState(this.innerText.toLowerCase());
	})

  // Mobile
  // Handle Breadcrumb toggle
  $('.nav__main_breadcrumbs').click(function (e) {
    $('.nav__main_mobile').slideToggle();
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
										setTimeout(function () {
											masonryInit();
										}, 1000)
									}
	})

	feed.run();
}

function noInstafeedImages() {
  const images = [
    {
      link: 'https://www.instagram.com/p/BGHYdRgA5TQ/',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c135.0.810.810/13329092_1202028753148952_2143275285_n.jpg?ig_cache_key=MTI2MzA4NTc4NTI3MjUyMTkzNg%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BGCd1jIg5bP/',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c0.0.1080.1080/13256871_1216691635008411_1911930611_n.jpg?ig_cache_key=MTI2MTcwMjA2ODgyMjA1NDYwNw%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BF_-Cw7g5RH/',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c112.0.855.855/13266788_1707317669537001_1224085780_n.jpg?ig_cache_key=MTI2MDk5OTI4OTU0Nzc1NjYxNQ%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BF6lo-KA5fP/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c72.0.936.936/13277603_787363411401138_1168095391_n.jpg?ig_cache_key=MTI1OTQ4NDU4OTA0MzQ1NTk1MQ%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BFt4Tx9A5XY/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/e15/c140.0.360.360/13248760_1602652873383756_1108786832_n.jpg?ig_cache_key=MTI1NTkwNzUyMTAxNzkxMDc0NA%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BFgm1JIA5aJ/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c157.0.766.766/13109110_1597050630605650_1092452770_n.jpg?ig_cache_key=MTI1MjE3MTQ3NDEwNjgxNjEzNw%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BFecdgeg5Qm/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13150801_1161201713901294_771509470_n.jpg?ig_cache_key=MTI1MTU2MjkxOTQ5NDM5MDgyMg%3D%3D.2'
    },
    {
      link: 'https://www.instagram.com/p/BFecdgeg5Qm/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c110.0.860.860/13150897_989054467880675_2044010841_n.jpg?ig_cache_key=MTI0OTE4MDYwODg2MTgwNDIzMg%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BFecdgeg5Qm/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13129333_525105367691124_1572594754_n.jpg?ig_cache_key=MTI0Njk2NzY4MTM1NDI3NDIxNg%3D%3D.2'
    },
    {
      link: 'https://www.instagram.com/p/BFL-qUKA5cR/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c116.0.848.848/13129411_227668484279427_428064074_n.jpg?ig_cache_key=MTI0NjM2NTMwODY0MjYyOTM5Mw%3D%3D.2.c'
    },
    {
      link: 'https://www.instagram.com/p/BE_ysMyg5c3/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/13150763_1405309372831765_969582335_n.jpg?ig_cache_key=MTI0MjkzNDk2MTg5MjQ2NDQzOQ%3D%3D.2'
    },
    {
      link: 'https://www.instagram.com/p/BE_RaKQA5b0/?taken-by=nanisdough',
      image: 'https://scontent-dfw1-1.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/c211.0.657.657/13166932_491639077687686_19248171_n.jpg?ig_cache_key=MTI0Mjc4ODU4NjY4MDcxOTA5Mg%3D%3D.2.c'
    }
  ];

  images.forEach((img) => {
    $('#instafeed').append('<div class="doughnut"><a href="'+img.link+'" target="_blank"><img src="'+img.image+'"/></a></div>');
  })

  setTimeout(function () {
    masonryInit();
  }, 1000)
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
    		swal(
		      'Email Sent!',
		      "I'll get back to you as soon as i can!",
		      'success'
		    );
    		$form.find('input[type=text]').val('');
    		$form.find('textarea').val('');
    	})
    }
  });
}

function googleAnalytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-40485439-7', 'auto');
  ga('send', 'pageview');
}
