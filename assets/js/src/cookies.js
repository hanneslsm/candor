jQuery(function($){
  if ( Cookies.get('cookies') == 'set' ) {
    $('.cookies').remove();
    // Cookies.remove('cookies');
    // console.log(Cookies.get());
    }
    else{
      $('body').show('.cookies');
    }

  $( '.accept-cookies' ).click(function () {
            Cookies.set('cookies', 'set');
            console.log("🍪 Cookies accepted");
            $( '.cookies' ).fadeOut();
        });

  /*
  $( '.remove-cookies' ).click(function () {
            Cookies.remove('cookie-pop');
            console.log(Cookies.get());
          });

  $( '.show-cookies' ).click(function () {
    alert(JSON.stringify(Cookies.get(), null, 4));
  });

  */
 });
