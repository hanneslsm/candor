/**
 * totop
 * ==========================================================================
 * inspired by https://codepen.io/malZiiirA/pen/cbfED
 */

jQuery(function($){
   $(window).scroll(function() {
       if ( getCurrentScroll() >= 150 ) {
            $('.totop').fadeIn();
         }
         else {
             $('.totop').fadeOut();
         }
   });
 function getCurrentScroll() {
     return window.pageYOffset || document.documentElement.scrollTop;
     }
     $(".totop").click(function() {
        $("html, body").animate({scrollTop: 0}, 500);
     });

 });
