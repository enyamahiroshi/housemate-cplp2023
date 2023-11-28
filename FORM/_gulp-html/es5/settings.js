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

	var $target = $('.area');
	var $shops = $('.option.shop')

	var selected = '#'+ $target.val();

	$shops.not(selected).hide();

	$target.on('change', function(){

		var $active = $('#'+ $(this).val());

		$shops.hide();
		$active.show();

	});

});


/** |03. エリア別店舗リスト| << ********************************************************* << END **/





/** |04. 必須チェック| >> ************************************************************* >> START **/


$(function() {

	$('.input form').validate({
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
		errorElement: 'p',
		errorClass: 'alert',
		errorPlacement: function(error, element){

			$target = $(element).closest('.error').attr('class').replace(' status error', '');
			//console.log($target);

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
		}
	});

	// $('.entry .prize input').each(function(){
	// 	$(this).rules('add', {
	// 		required: true,
	// 		messages: {
	// 			required: '項目を選択してください'
	// 		}
	// 	});
	// });

	$('.input .survey .q').each(function(){

		$(this).find('.feeling input').on('click', function(){
			if($(this).attr('class') === 'feel') {
				$('.q .q11').removeClass('any');
			} else {
				$('.q .q11').addClass('any');
			}
		});

		if($(this).find('.option').hasClass('reason')){

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

			$(this).find('.option input[type="checkbox"]').each(function(){
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
				messages: {
					required: '入力してください',
					maxlength: '全角250文字以内でご入力ください',
				}
			});
		}

	});

});


/** |04. 必須チェック| << *************************************************************** << END **/
