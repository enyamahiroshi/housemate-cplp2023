(function ($) {

  const _isActive = 'is-active';

  /* --------------------------------------------------
    アコーディオン
  -------------------------------------------------- */
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

})(jQuery);