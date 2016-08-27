$(document).ready(function(){
	var page_list = $('.page-list-ext-item');
	var menu_a = $('.menu ul li');
	var mobile_menu_a = $('.mobile-menu ul li');
	page_list.addClass('block');
	for(var i =0; i<page_list.length;i++){
		/*вывод страниц на главную страницу*/
		var href = $($(page_list[i]).children('.page-list-ext-image')).children('a').attr('href');
		var img_src = $($($(page_list[i]).children('.page-list-ext-image')).children('a')).children('img').attr('src');
		$(page_list[i]).children().css('display','none');
		if($($(page_list[i]).children('h3')).children('a').text()!='Portfolio'){
			img_src = img_src.replace('-150x150','');
			var position = img_src.split('_',4);
			$(page_list[i]).children().css('display','none');
			$(page_list[i]).css('background','url('+img_src+') '+position[2]+'% '+position[1]+'% no-repeat');
			$(page_list[i]).attr('id',$($(page_list[i]).children('h3')).children('a').text());
			$(page_list[i]).append('<a class="right-scroll" href="'+href+'"></a>');
			$(page_list[i]).append('<a class="down-scroll"></a>');
			$(page_list[i-1]).children('.down-scroll').attr('href','#'+$(page_list[i]).attr('id'));
		}else{
			$(page_list[i]).css('display','none');
		}
		/*вывод список страниц в меню*/
		if($(menu_a[i]).children('a').text()=='Portfolio')
			$(menu_a[i]).css('display','none');
		if($(mobile_menu_a[i]).children('a').text()=='Portfolio')
			$(mobile_menu_a[i]).css('display','none');
		//$(menu_a[i]).children('a').attr('href','#'+$(menu_a[i]).children('a').text());
		//$(mobile_menu_a[i]).children('a').attr('href','#'+$(mobile_menu_a[i]).children('a').text());
	}

});
