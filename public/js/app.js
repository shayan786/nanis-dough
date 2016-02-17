"use strict";function setAppState(location){history.pushState({},"Nani's Dough - "+location.capitalize,location),document.title="Nani's Dough - "+location}function handleLocation(){if(window.location.pathname.length>2)switch(window.location.pathname){case"/doughnuts":$(".contact").fadeOut(),$(".about").fadeOut(),$(".doughnuts").fadeIn("slow",function(){$(this).addClass("active"),$("html, body").animate({scrollTop:$(this).offset().top},300)});break;case"/contact":$(".doughnuts").fadeOut(),$(".about").fadeOut(),$(".contact").fadeIn("slow",function(){$(this).addClass("active"),$("html, body").animate({scrollTop:$(this).offset().top},300)});break;default:$(".contact").fadeOut(),$(".doughnuts").fadeOut(),$(".about").fadeIn("slow",function(){$(this).addClass("active"),$("html, body").animate({scrollTop:$(this).offset().top},300)})}}function toggleMenu(){$(".nav__main a").click(function(e){e.preventDefault();var fade_in_section="."+this.innerText.toLowerCase();$("html, body").animate({scrollTop:$(fade_in_section).offset().top},300),$(this).hasClass("active")||($(".doughnuts").fadeOut(),$(".contact").fadeOut(),$(".about").fadeOut(),$(".nav__main a").removeClass("active"),$(fade_in_section).fadeIn("slow",function(){$(this).addClass("active")})),setAppState(this.innerText.toLowerCase())})}function getInstagramImages(){var feed=new Instafeed({get:"user",userId:"2233485228",accessToken:"2233485228.745c638.53ad455a211e4250a9e0bbc34ff3b0ac",resolution:"low_resolution",template:'<div class="doughnut"><a href="{{link}}"" target="_blank"><img src="{{image}}"/></a></div>',after:function(){masonryInit()}});feed.run()}function masonryInit(){var $instafeed=$("#instafeed").masonry({itemSelector:".doughnut",fitWidth:!0});$instafeed.imagesLoaded().progress(function(){$instafeed.masonry("layout")})}function rotateImages(){var images=["/images/doughnuts/d_1.jpg","/images/doughnuts/d_2.jpg","/images/doughnuts/d_3.jpg","/images/doughnuts/d_4.jpg","/images/doughnuts/d_5.jpg"];$(".images").css({backgroundImage:"url("+images[0]+")"});var i=1;setInterval(function(){$(".images").fadeOut("slow",function(){$(this).css({backgroundImage:"url("+images[i]+")"}).fadeIn("slow")}),i++,4===i&&(i=0)},7e3)}function videoSizing(){$(document).ready(function(){$(".video").height($(".video video").height()+90),$(window).on("resize",function(){$(".video").height($(".video video").height())})})}function contactFormValidation(){var $form=$("#contact_form");$form.on("submit",function(e){e.preventDefault(),e.target.checkValidity()?$.ajax({method:"POST",url:"/contact",data:$form.serialize()}).done(function(){console.log("done")}):swal({title:"Error!",text:"Form is incomplete",type:"error",confirmButtonText:"Ok"})})}!function(){$(document).ready(function(){toggleMenu(),getInstagramImages(),rotateImages(),handleLocation(),contactFormValidation(),videoSizing()})}(),String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};
//# sourceMappingURL=maps/app.js.map