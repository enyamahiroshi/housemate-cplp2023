/** |READ ME| **************************************************************************************

settings.js
Ver.202111

----------------------------------------------------------------------------------------------------

01. 応募規約
02. 送付先表示スイッチ
03. エリア別店舗リスト
04. 必須チェック

************************************************************************************** |READ ME| **/





/** |01. 応募規約| >> ***************************************************************** >> START **/


$(function() {

	var $target1 = $('.terms .toggle');
	var $target2 = $('.terms .body');

	if($target1.is('visible') === false){
		$target1.show();
		$target2.fadeOut(0);
	}

	$target1.on('click', function(){
		$(this).toggleClass('open');
		$(this).next($target2).fadeToggle(300);
	});

});


/** |01. 応募規約| << ******************************************************************* << END **/



/** |03. エリア別店舗リスト| >> ******************************************************* >> START **/


$(function() {

	const $target = $('.area');
	const $shops = $('.option.shop');
	const selected = '#' + $target.val();
	$shops.not(selected).hide();
	$target.on('change', function(){
		const $active = $('#' + $(this).val());
		// let errorQ03 = $('.chose-area .alert').length;
		// if (errorQ03 > 0) {
		// 	errorQ03.splice(0, 1);
		// }
		$shops.hide();
		$active.show();
	});

});


/** |03. エリア別店舗リスト| << ********************************************************* << END **/





/** |04. 必須チェック| >> ************************************************************* >> START **/

$(function () {

	// textareaにてスペースと改行のみの入力を禁止
	$.validator.addMethod('noOnlyWhiteSpace', function(value, element) {
		return value.trim() !== '';
	});

	$('.input form').validate({

		//validationがNGだった場合に表示するエラーアラート
		highlight: function(element, errorClass){
			$(element).closest('.status').addClass('error');
			$('.entry .failed').show();
		},
		unhighlight: function(element, errorClass){
			$(element).closest('.status').removeClass('error');
			if($('.contents .error')[0] === undefined){
				$('.entry .failed').hide();
			}
		},
		errorPlacement: function(error, element){
			$target = $(element).closest('.error').attr('class').replace(' status error', '');
			switch($target){
				case 'prize':
					$(element).closest('.error').before(error);
					break;
				case 'data':
					$(element).closest('.error').append(error);
					break;
				default:
					if($(element).attr('class') !== 'a15'){
						$(element).closest('.error').find('.label').after(error);
					} else {
						$(element).closest('.error').find('textarea').after(error);
					}
					break;
			}
			return true;
		},
		errorElement: 'p',
		errorClass: 'alert',
		focusInvalid: false, //submitのエラー時に、「最後にアクティブだった項目」又は「一番最初のエラーのある項目」にフォーカスを戻すかどうか。（デフォルト：true）
	});

	$('.input .survey .q').each(function(){

		$(this).find('.feeling input').on('click', function(){
			if($(this).attr('class') === 'feel') {
				$('.q .q12').removeClass('any');
			} else {
				$('.q .q12').addClass('any');
			}
		});

		if ($(this).find('.option').hasClass('reason')) {

			$(this).find('.reason input').rules('add', {
				required: {
					depends: function(element){
						return $('.feel').is(':checked');
					}
				},
				messages: {
					required: '項目を選択してください'
				}
			});

		} else {
			$(this).find('.option:not(.optional) input[type="radio"]').each(function(){
				$(this).rules('add', {
					required: true,
					messages: {
						required: '項目を選択してください'
					}
				});
			});

			$(this).find('.option:not(.optional) input[type="checkbox"]').each(function(){
				$(this).rules('add', {
					required: true,
					messages: {
						required: '項目を選択してください'
					}
				});
			});

			$(this).find('textarea').rules('add', {
				required: true,
				maxlength: 250,
				noOnlyWhiteSpace: true,
				messages: {
					required: '入力してください',
					maxlength: '全角250文字以内でご入力ください',
					noOnlyWhiteSpace: 'スペース、改行以外のテキストも入力してください',
				},
				// focusout: false, //入力項目からフォーカスアウトにしたときに自動的にValidateするか
			});
		}

	});

	$('.input form').submit(function () {
		let alertItem = $('.alert').filter(':visible').length;
		if (alertItem > 0) {
			$("html,body").animate({scrollTop:$('.anchor').offset().top});
		}
	});
});

/** |04. 必須チェック| << *************************************************************** << END **/