//const e = require("express");
//for full viwe port menu in mobile
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
});
// jQuery(document).ready(function() {
// 	jQuery('body:not(.woocommerce-account):not(.page-template-wp-login):not(.page-template-wp-register):not(.page-template-wp-forgot-password)').addClass('loaded');		
// });
jQuery(window).on('load',function(){
	jQuery('body:not(.woocommerce-account):not(.page-template-wp-login):not(.page-template-wp-register):not(.page-template-wp-forgot-password)').addClass('loaded');
});

jQuery('.category-dropdown ul.menu > li.cstmcatefry_icon > a').on('click',function(e){
	e.preventDefault();
	jQuery(this).parent().toggleClass('catmenu-open');
	jQuery(this).next('ul').find('> li:first').addClass('active');
	jQuery('.drop-down-data').hide();
	jQuery('.dashboard-dropdown .inner_menu').hide();
	jQuery('body').addClass('scrollLock');
});

jQuery('.category-dropdown .cstmcatefry_icon').on('click',function(e){
	e.stopPropagation();
});

jQuery(document).on('click',function(){
	jQuery('.category-dropdown .cstmcatefry_icon').removeClass('catmenu-open');
	jQuery('.category-dropdown .cstmcatefry_icon > ul > li').removeClass('active')
	jQuery('body').removeClass('scrollLock');
});

jQuery('.category-dropdown .cstmcatefry_icon > ul li').each(function(){
	if(jQuery(this).children().is('ul')){
		jQuery(this).children('a').addClass('has-submenu');
		jQuery(this).children('a').append('<span class="sub-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M1.86459 0.608788C1.67053 0.423163 1.43428 0.321913 1.16428 0.321913C0.598966 0.321913 0.160216 0.760662 0.160216 1.31754C0.160216 1.59598 0.269903 1.8491 0.463966 2.04316L6.37022 7.81441L0.463965 13.5688C0.269902 13.7629 0.160215 14.0244 0.160215 14.2944C0.160214 14.8513 0.598965 15.29 1.16428 15.29C1.43428 15.29 1.67053 15.1888 1.85615 15.0032L8.42053 8.59066C8.65678 8.37129 8.7749 8.10129 8.7749 7.80598C8.7749 7.51066 8.65678 7.25754 8.42897 7.02973L1.86459 0.608788Z" fill="#78818B"/></svg></span>');
		jQuery(this).children('ul').wrap('<div class="children_box"><div class="children-in"></div></div>');
		jQuery(this).children('a').attr('data-title',jQuery(this).children('a').text());
		var menuTitleD = jQuery(this).children('a').data('title');
		var menuLinkD = jQuery(this).children('li a').attr('href');
		jQuery(this).find('.children-in').prepend('<h6 class="menu-title"><span><svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.8213 5.5L0.999862 5.5" stroke="#1E1F22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10L1 5.5L5.5 1" stroke="#1E1F22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span> '+menuTitleD+'</h6>');
		jQuery(this).find('ul.children').closest('.children-in').prepend('<div class="see-all-btn-wrap"><a href="'+menuLinkD+'" class="see-all-btn">See All</a></div>');
	}
});
jQuery('.category-dropdown .cstmcatefry_icon > ul > li').each(function(){
	jQuery(this).mouseenter(function(){
		jQuery('.category-dropdown .cstmcatefry_icon > ul > li').removeClass('active');
		jQuery(this).addClass('active')
	});
});
jQuery('.sub-arrow').on('click',function(event){	
	event.preventDefault();
	jQuery(this).closest('a').next('.children_box').addClass('show-menu');
});
jQuery('.menu-title').on('click',function(event){	
	jQuery(this).closest('.children_box').removeClass('show-menu');
});
jQuery('.category-dropdown ul.menu > li.cstmcatefry_icon > ul.sub-menu > li > a.has-submenu').on('click',function(e){
	//e.preventDefault();
});
/*jQuery('.category-dropdown .cstmcatefry_icon').mouseenter(function(){
	jQuery('.menu-overlay').addClass('active');
});
jQuery('.category-dropdown .cstmcatefry_icon').mouseleave(function(){
	jQuery('.category-dropdown .cstmcatefry_icon > ul > li').removeClass('active');
	jQuery('.menu-overlay').removeClass('active');
});*/

jQuery('.city_cstm').on('click',function(){
	jQuery('.drop-down-data').toggle();
	jQuery('.cstmcatefry_icon').removeClass('catmenu-open');
	jQuery('.dashboard-dropdown .inner_menu').hide();
	jQuery('body').removeClass('scrollLock');
});		

jQuery('.city_drop-down').on('click',function(e){
	e.stopPropagation();
});

jQuery(document).on('click',function(){
	jQuery('.drop-down-data').hide();
});


jQuery('.cstm_prof').on('click',function(){
	jQuery('.dashboard-dropdown .inner_menu').toggle();
	jQuery('.cstmcatefry_icon').removeClass('catmenu-open');
	jQuery('.drop-down-data').hide();
});

jQuery('.cstms_top_bar1').on('click',function(e){
	e.stopPropagation();
});

jQuery(document).on('click',function(){
	jQuery('.dashboard-dropdown .inner_menu').hide();
});

jQuery('.hamburger').on('click',function(){
	jQuery('body').addClass('sidebar-menu-open');
	jQuery('.category-dropdown-sidebar .sidebar-nav > .sidebar-nav-in').addClass('active');
	jQuery('.aws-search').addClass('open-side');
});


jQuery(document).on('click',function(){
	jQuery('.aws-search .clear-result').trigger('click');
});  
jQuery('.aws-search input, .algolia-autocomplete').click(function(event){
	event.stopPropagation();
});

jQuery('.category-dropdown-sidebar-in ul > li').each(function(){
	if(jQuery(this).children().is('ul')){
		jQuery(this).addClass('has-submenu');
		jQuery(this).children('a').attr('data-title',jQuery(this).children('a').text());
		var backMenuHeading = jQuery(this).closest('.sub-menu-wrap').prev('a').text();
		jQuery(this).children('ul').wrap('<div class="sub-menu-wrap"><div class="sidebar-nav-in"><div class="sidebar-nav-content"></div></div></div>');
		jQuery(this).find('.sidebar-nav-in').prepend('<div class="sidebar-nav-header"><div class="main-menu-back-btn"><span><img src="/wp-content/themes/hello-theme-child-master/aws/img/back-left-dark.svg"><span id="main-heading"><em class="main-menu">Main Menu</em><em class="back-heading">'+backMenuHeading+'</em></span></span></div><span class="sidebar-close-btn"></span></div>');
		jQuery(this).children('a').append('<span class="sidemenu-sub-arrow"><svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.934868 1.50195L5 5.50195L0.934868 9.50195" stroke="#1E1F22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
		var menuTitle = jQuery(this).children('a').data('title');
		var menuLink = jQuery(this).children('li a').attr('href');
		jQuery(this).find('.sidebar-nav-content').prepend('<div class="menu-title">'+menuTitle+'</div>');
		jQuery(this).find('ul.children').closest('.sidebar-nav-content').prepend('<div class="see-all-btn-wrap"><a href="'+menuLink+'" class="see-all-btn">See All</a></div>');
	}
	if(jQuery(this).hasClass('aws_neighbor_or_event') && !jQuery(this).hasClass('has-submenu')){
		jQuery(this).children('a').append('<span class="sidemenu-nb-arrow"><svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.934868 1.50195L5 5.50195L0.934868 9.50195" stroke="#1E1F22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>');
	}
});

jQuery('.category-dropdown ul li a').removeAttr('title');
var slideLeftPos = 0;
var slideRightPos = 0;
jQuery(document).on('click','.sidemenu-sub-arrow',function(event){	
	/*jQuery(event.target).closest('li').toggleClass('submenu-open');
	jQuery(event.target).closest('li').find('ul').slideToggle();
	jQuery('.category-dropdown-sidebar-in ul > li').not(jQuery(this).closest('li')).removeClass('submenu-open');
	jQuery('.category-dropdown-sidebar-in ul > li > ul').not(jQuery(this).closest('li').find('ul')).slideUp();
    event.stopPropagation();*/
	event.preventDefault();
	slideLeftPos -= 100;
	slideRightPos = slideLeftPos;
	jQuery('.sidebar-nav').css('left',slideLeftPos+'%');
	jQuery(event.currentTarget).parent().next().children('.sidebar-nav-in').addClass('active');
	jQuery(event.currentTarget).closest('li').addClass('parent-menu-open');
});
jQuery(document).on('click','.category-dropdown-sidebar li.side-loc-menu .sidemenu-sub-arrow',function(event){	
	jQuery('body').addClass('sidebar-loc-menu-open');
});
jQuery(document).on('click','.header-mobile-search',function(event){	
	jQuery('.aws-search-wrap').addClass('show-on-mobile');
	jQuery(this).addClass('hide');
	jQuery(".aws-search-wrap .aws-search-field-wrap input#new_algolia_search").focus();
});
jQuery(document).on('click','.cancel-search-btn',function(event){	
	jQuery('.aws-search-wrap').removeClass('show-on-mobile');
	jQuery('.header-mobile-search').removeClass('hide');
});
jQuery(document).on('click','.main-menu-back-btn > span',function(event){
	slideRightPos += 100;
	slideLeftPos = slideRightPos;
	jQuery(event.currentTarget).closest('.sidebar-nav-in').removeClass('active');
	jQuery('.sidebar-nav').css('left',slideRightPos+'%');
	jQuery('.aws_neighbor_or_event.parent-menu-open').removeClass('parent-menu-open');
	jQuery('body').removeClass('sidebar-loc-menu-open');
});	

jQuery('.menu-overlay').on('click',function(){
	jQuery('body').removeClass('sidebar-menu-open');
	jQuery('.aws-search').removeClass('open-side');
	jQuery('.sidebar-nav').css('left','0');
	jQuery('.category-dropdown-sidebar .sidebar-nav-in').removeClass('active');
	jQuery('body').removeClass('sidebar-loc-menu-open');
	slideLeftPos = 0;
	slideRightPos = 0;	
});
jQuery(document).on('click','.sidebar-close-btn',function(){
	jQuery('body').removeClass('sidebar-menu-open');
	jQuery('.aws-search').removeClass('open-side');
	jQuery('.sidebar-nav').css('left','0');
	jQuery('.category-dropdown-sidebar .sidebar-nav-in').removeClass('active');
	jQuery('body').removeClass('sidebar-loc-menu-open');
	slideLeftPos = 0;
	slideRightPos = 0;
});


jQuery('.description-info-section').find(".business-informations-wrap").slideUp();
jQuery(".exp-read-more").click(function () {
	jQuery(this).closest('.description-info-section').find(".business-informations-wrap").slideDown();
});
jQuery(".exp-read-less").click(function () {
	jQuery(this).closest('.description-info-section').find(".business-informations-wrap").slideUp();
});

//jQuery('<li class="or-divider"><span>or</span></li>').insertAfter('.category-dropdown-sidebar-in ul > li.sign_btns');

jQuery(document).ready(function(){
	/*if(jQuery('.aws_neighbor_or_event').length > 0){
		jQuery('body').addClass('has-nb-menu');
	}*/
	eventReadMore();
	jQuery(document).on("click", ".readmore-btn", function(e) {
		e.preventDefault();
		jQuery('.events-description-content').toggleClass('more');
		if (jQuery(this).find('span.btn-txt').text() == "Read more"){
			jQuery(this).find('span.btn-txt').text("Read less");
		}	       
		else{
		   jQuery(this).find('span.btn-txt').text("Read more");	
		}
	});
	//jQuery('.category-dropdown-sidebar .menu > .aws_neighbor_or_event').nextAll('li.menu-item-object-global').remove();


	jQuery(window).scroll(function() {
	if (jQuery(this).scrollTop() > 95){  
			jQuery('.aws-search').addClass("sticky-search");
		}
		else{
			jQuery('.aws-search').removeClass("sticky-search");
		}
	});
});
jQuery(window).bind("debouncedresize", function(){
	eventReadMore();
});
/*Single Event Read More And Read Less*/
function eventReadMore(){
	if(jQuery('.events-description-content').length > 0){
		var element = document.querySelector('.events-description-content');
		if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
			if(jQuery('.readmore-btn').length == 0){
				jQuery('<a href="#" class="readmore-btn"><span class="btn-txt">Read more</span></a>').insertAfter('.events-information-container .events-description .events-description-content');
			}
			jQuery('.events-description .readmore-btn').show();
		}else{
			if(jQuery('.events-description .readmore-btn .btn-txt:contains("Read more")').length > 0){
				jQuery('.events-description .readmore-btn').hide();
			}
		}
		/*if(jQuery('.events-description .readmore-btn .btn-txt:contains("Read less")').length > 0 && jQuery('.events-description-content').hasClass('more')){
			jQuery('.events-description .readmore-btn').hide();
			jQuery('.events-description .readmore-btn').find('span.btn-txt').text("Read more");	
			jQuery('.events-description .events-description-content').removeClass('more');
			console.log('bbb');
		}*/		
		if(jQuery(window).width() > 767){
			jQuery('.events-description .readmore-btn').remove();		
		}
	}
}

jQuery(document).on('submit','#tribe-tickets__registration-form',function(){
	if(jQuery('.tribe-tickets__attendee-tickets-item').length > 0){
		var nameValue = jQuery('.tribe-tickets__attendee-tickets-item:first .tribe-tickets__form-field-input:first').val().split(' ');
		var firstName = nameValue.shift();
		var lastName = nameValue.join(' ');
		var emailValue = jQuery('.tribe-tickets__attendee-tickets-item:first .tribe-tickets__form-field--email .tribe-tickets__form-field-input:last').val();
		sessionStorage.setItem("firstName", firstName);
		sessionStorage.setItem("lastName", lastName);
		sessionStorage.setItem("emailValue", emailValue);
		console.log(lastName);
	}	
});

jQuery(window).on('load',function(){
	if(jQuery('body').hasClass('woocommerce-checkout')){
		let sessionFirstName = sessionStorage.getItem("firstName");
		let sessionLastName = sessionStorage.getItem("lastName");
		let sessionEmailName = sessionStorage.getItem("emailValue");
		if(sessionFirstName){
			jQuery('#billing_first_name').val(sessionFirstName);
		}
		if(sessionLastName){
			jQuery('#billing_last_name').val(sessionLastName);
		}
		if(sessionEmailName){
			jQuery('#billing_email').val(sessionEmailName);
		}
	}

	jQuery('.woocommerce-checkout .heading-with-step-menu .checkout-step-menu li.step-one').addClass('complete').removeClass('current');
	jQuery('.woocommerce-checkout .heading-with-step-menu .checkout-step-menu li.step-two').addClass('complete');
	jQuery('.woocommerce-checkout .heading-with-step-menu .checkout-step-menu li.step-three').addClass('current');

});

if(jQuery('#tribe-tickets__registration-form').length > 0){
	jQuery('<div class="heading-with-step-menu"><h1>Checkout</h1><ul class="checkout-step-menu flex"><li class="step-one complete"><div><span>1</span><h6>Price Level</h6></div></li><li class="step-two current"><div><span>2</span><h6>Registration</h6></div></li><li class="step-three"><div><span>3</span><h6>Confirmation</h6></div></li></ul></div>').insertAfter(".tribe-tickets__registration-page-title");
}

if(jQuery('#tribe-tickets__registration-form').length > 0){
	if(jQuery('.tribe-tickets__attendee-tickets .tribe-tickets__attendee-tickets-form .tribe-tickets__attendee-tickets-container').length){
		console.log('exist');
	}else{
		console.log('no exist');
		jQuery(location).prop('href', '/unation-checkout/');
	}	
}





jQuery(document).ready(function() {
	customBglazyLoad();		
});

jQuery(window).bind("debouncedresize", function(){
	customBglazyLoad();
});

jQuery(window).scroll(function() {
	customBglazyLoad();
});

function customBglazyLoad(){
	if(jQuery('.bgimg').length > 0){
		jQuery('.bgimg').each(function(){
			if (jQuery(this).hasClass('visible')) {
				var curRes = parseInt(jQuery(window).width());
				var deskBg = jQuery(this).data('bg-desk');
				var mobBg = jQuery(this).data('bg-mob');
				if(curRes > 1024){
					//jQuery(this).attr('src',jQuery(this).data('bg-desk'));
					jQuery(this).css('background-image', 'url(' + deskBg + ')');
				}else{
					jQuery(this).css('background-image', 'url(' + mobBg + ')');
				}
			}
		});
	}		
}
var lazyBackgrounds = [].slice.call(document.querySelectorAll(".bgimg"));
if ("IntersectionObserver" in window) {
	var lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				lazyBackgroundObserver.unobserve(entry.target);
			}
		});
	});

	lazyBackgrounds.forEach(function(lazyBackground) {
		lazyBackgroundObserver.observe(lazyBackground);
	});
}

/*$(document).ready(function(){
    $('.different-main-sec .box').matchHeight();
})

$(document).ready(function(){
    $('.terms-sec-cards .terms-sec-card').matchHeight();
});*/



jQuery('.gift-form textarea[name="recipient_message"]').attr('maxlength','140');
jQuery('.gift-form textarea[name="recipient_message"]').closest('.input-field').addClass('input-field-textarea')
jQuery('.gift-form .input-field-textarea').append('<div class="gift-text-rem-char"><span>0</span> out of 140 chars left</div>');
var maxLength = 140;
characterL();
jQuery('.gift-form textarea[name="recipient_message"]').keyup(function() {
	characterL();
});
function characterL(){
	if(jQuery('.gift-form textarea[name="recipient_message"]').length > 0){
		var textlen = jQuery('.gift-form textarea[name="recipient_message"]').val().length;
		var remLen = maxLength - textlen
		jQuery('.gift-text-rem-char span').text(remLen);
	}
}

$(".woocommerce-order-details__title").click(function(){
	$(".order_details").toggleClass("open");
  });



// jQuery(document).off("click",".venue-load-more");
// jQuery(document).on("click",".venue-load-more", function () {   
// console.log('hi....');
// });