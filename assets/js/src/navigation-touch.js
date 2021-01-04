/**
 * Make Navigation Touch friendly
 * ==========================================================================
 * https://stackoverflow.com/questions/11850466/mobile-touch-device-friendly-drop-down-menu-in-css-jquery
 */

 function isTouchDevice(){
     return typeof window.ontouchstart !== 'undefined';
 }

 jQuery(document).ready(function(){
     /* If mobile browser, prevent click on parent nav item from redirecting to URL */
     if(isTouchDevice()) {
         // 1st click, add "clicked" class, preventing the location change. 2nd click will go through.
         jQuery(".primary-navigation ul > li > a").click(function(event) {
             // Perform a reset - Remove the "clicked" class on all other menu items
             jQuery(".primary-navigation ul > li > a").not(this).removeClass("clicked");
             jQuery(this).toggleClass("clicked");
             if (jQuery(this).hasClass("clicked")) {
                 event.preventDefault();
             }
         });
     }
 });
