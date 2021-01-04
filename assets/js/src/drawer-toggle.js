/**
 * Toggle drawer
 * ==========================================================================
 */

jQuery(function openDrawer($) {
  $(".icon-hamburger, .icon-close").on('click', function() {
    $('.site-drawer')
      .animate({
        right: "toggle",
      }, 400)
      .toggleClass('site-drawer-open')

    $('.icon-close').animate({
        opacity: "toggle",
      }, 50)
      .toggleClass('icon-close-draweropen')
    $('body').toggleClass('noscroll');
  });
});
