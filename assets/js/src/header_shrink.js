/**
 * Header shrink, © by Malith Hettiarachchi
 * To Top Arrow
 * ==========================================================================
 * https://codepen.io/malZiiirA/pen/cbfED
 */

jQuery(function($){
  var shrinkHeader = 4;
   $(window).scroll(function() {
     var scroll = getCurrentScroll();
       if ( scroll >= shrinkHeader ) {
            $('.site-header').addClass('site-header-scroll');
            $('.totop-container').addClass('totop');
         }
         else {
             $('.site-header').removeClass('site-header-scroll');
             $('.totop-container').removeClass('totop');
         }
   });
 function getCurrentScroll() {
     return window.pageYOffset || document.documentElement.scrollTop;
     }
 });
