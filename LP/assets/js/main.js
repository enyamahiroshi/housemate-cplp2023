(function ($) {

  /* --------------------------------------------------
    anchor link, inview
  -------------------------------------------------- */
  $(window).on('load reload', function () {
    //animation.cssの遅延読み込み
    const style = "<link rel='stylesheet' href='./assets/css/animation.css'>";
    $('head link:last').after(style);
    //animation.cssの読み込み後にinview実行
    animate_init = function(){
      $('.ivo').on('inview', function(event, isInView) {
        if (isInView) {
          const delay = $(this).data('delay')
          $(this).css('visibility', 'visible');
          if( delay ){
            $(this).css('animation-delay', delay+ 's');
          }
          $(this).addClass($(this).data('animate'));
          // css animation が終わったら
          $(this).on('animationend webkitAnimationEnd', function(){
            $(this).addClass('animated');
          });
          $(this).off('inview');
        }
      });
    };
    $(function(){
      animate_init();
    });
  });


  /* --------------------------------------------------
    parallax
  -------------------------------------------------- */
  const image = document.getElementsByClassName('ani-parallax');
  new simpleParallax(image, {
    scale: 2,
    overflow: true,
    maxTransition: 80,
	  transition: 'cubic-bezier(0,0,0,1)'
  });


  /* --------------------------------------------------
    アコーディオン
  -------------------------------------------------- */
  const _isActive = 'is-active';
  const _toggleAcc = $('.js-tglAccordion');
  const _targetAcc = $('.js-trgAccordion');
  $(window).on('load reload', function () {
    _targetAcc.hide();
    _toggleAcc.on('click tap', function () {
      if ($(this).hasClass(_isActive)) {
        $(this).removeClass(_isActive);
        $(this).next(_targetAcc).slideUp(50, 'linear');
      } else {
        $(this).addClass(_isActive);
        $(this).next(_targetAcc).slideDown(50, 'linear');
      }
    });
  });

  /* --------------------------------------------------
    anchor link
  -------------------------------------------------- */
  const _anchor = 'a[href^="#"]';
  $(_anchor).on('tap click', function() {
    const speed = 200; // ミリ秒
    const href= $(this).attr("href");
    const target = $(href == "#" || href == "" ? 'html' : href);
    const position = target.offset().top;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

})(jQuery);