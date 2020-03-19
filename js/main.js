$(document).ready(function(){
	$('.burger-menu').on('click',function(){
        $('.burger-menu').toggleClass('open');
		$('.menu-mobile').slideToggle();
	});
});
