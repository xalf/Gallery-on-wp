/*
	события альбомов
*/

window.onload = function(){
	/*****заполняем ленту id и связываем******/

	var labels = $('.small-foto img');
	for(var i=0;i<labels.length;i++){
		$(labels[i]).attr('for',i);
		var img = $(labels[i]).attr('src');
		$('.big-foto').append('<img src="'+img+'" id="'+i+'">');
	}
	$('.small-foto img').click(function(){
	/*******активные элементы подсвечиваются***********/
		$('.active-foto').removeClass('active-foto');
		$(this).addClass('active-foto');
		var id = '#'+$(this).attr('for');
		$(id).addClass('active-foto');
	/********движение большой фотоленты********/
		var destination = (window.innerWidth-$(id).innerWidth())/2;
		$('.big-foto-wrapper').animate( { scrollLeft: $('.big-foto-wrapper').scrollLeft() + $(id).position().left - destination}, 600,'linear' );
		/*меняем адресную строку*/
		var location = window.location.toString();
		location=location.split('/',5);
		location[4]=id;
		var newLocation='';
		for(var i=0;i<location.length;i++){
			location[i]+='/';
			newLocation+=location[i];
		}
		window.location=newLocation;
	});
	/************popup*************/
	var ids = $('.big-foto>img');
	ids.click(function() {

	/*******активные элементы подсвечиваются***********/
		$('.active-foto').removeClass('active-foto');
		$(this).addClass('active-foto');
		var tie_img;
		var forid = $(this).attr('id').replace('#','');
		for(var i=0; i<labels.length;i++){
			if($(labels[i]).attr('for')==forid){
				$(labels[i]).addClass('active-foto');
				tie_img=$(labels[i]);
			}
		}
		/*меняем адресную строку*/
		var id = '#'+$(this).attr('id');
		var location = window.location.toString();
		location=location.split('/',5);
		location[4]=id;
		var newLocation='';
		for(var i=0;i<location.length;i++){
			location[i]+='/';
			newLocation+=location[i];
		}
		window.location=newLocation;
		/*узнаётся положение относительно экрана*/
		if(($(this).offset().left+$(this).innerWidth()+$('.big-foto-wrapper').scrollLeft() >= $('.big-foto-wrapper').scrollLeft()+$(window).innerWidth())||($(this).offset().left+$('.big-foto-wrapper').scrollLeft()<=$('.big-foto-wrapper').scrollLeft())) {

			var destination = (window.innerWidth-$(this).innerWidth())/2;
			$('.big-foto-wrapper').animate( { scrollLeft: $('.big-foto-wrapper').scrollLeft() + $(this).position().left - destination}, 600,'linear' );
		}
		else{
			$('.popup').css('display','block');
			$('.popup img').attr('src',$(this).attr('src'));
		}

		/*****скроллим превью, если нужно****/
		if((tie_img.offset().left+tie_img.innerWidth()+$('.small-foto-wrapper').scrollLeft() >= $('.small-foto-wrapper').scrollLeft()+$(window).innerWidth())||(tie_img.offset().left+$('.small-foto-wrapper').scrollLeft()<=$('.small-foto-wrapper').scrollLeft())) {
			var destination = (window.innerWidth-tie_img.innerWidth())/2;
			$('.small-foto-wrapper').animate( { scrollLeft: $('.small-foto-wrapper').scrollLeft() + tie_img.position().left - destination}, 600,'linear' );
		}
	});
	$('.popup').click(function(){
		$(this).css('display','none');
	});
	
	
	/***********высота обёртки для изображений**************/
	function wrapperHeight(){
		$('.foto-wrapper').css('height',window.innerHeight-68+'px');
		var big = $('.big-foto img');
		var small = $('.small-foto img');
		/***********задаём размеры ленты***********/
		var bsize=0;
		var ssize=0;
		for(var i=0;i<big.length;i++){
			var a = (big[i].naturalWidth*$('.big-foto img').innerHeight())/big[i].naturalHeight;
			bsize+=a;
			a=small[i].naturalWidth*$('.small-foto img').innerHeight()/small[i].naturalHeight;
			ssize+=a;
	}
	$('.big-foto').css('width',bsize+i*4);
	$('.small-foto').css('width',ssize+i*6);
	}
	wrapperHeight();
	$(window).resize(wrapperHeight);
	
	/*************скролл ленты******************/
	/****************событие колёсика мыши**************/
	var elem = document.getElementsByTagName('body')[0];
	//вешаем обработчик onWheel на события
	function add(elem, onWheel)
	{
		if (elem.addEventListener) 
		{
  			if ('onwheel' in document) 
  			{
    			// IE9+, FF17+, Ch31+
    			elem.addEventListener("wheel", onWheel);
  			} 
  			else 
  				if ('onmousewheel' in document) 
  				{
    				// устаревший вариант события
    				elem.addEventListener("mousewheel", onWheel);
  				} 
  				else 
  				{
    				// Firefox < 17
    				elem.addEventListener("MozMousePixelScroll", onWheel);
  				}
		} 
		else 
		{ 
			// IE8-
  			elem.attachEvent("onmousewheel", onWheel);
		}
	}
	add(document.getElementsByClassName("small-foto-wrapper")[0],onWheelSmall);
	add(document.getElementsByClassName("big-foto-wrapper")[0],onWheelBig);
	
	//плавный скроллинг
	function scroll(min)
	{
		var destination = window.innerWidth;
		$('.small-foto-wrapper').animate( { scrollLeft: $('.small-foto-wrapper').scrollLeft()+min*destination/2 }, 600,'linear' );
	}
	//обработчик события прокрутки мыши 
	function onWheelSmall(e) 
	{
		var delta = e.deltaY || e.detail || e.wheelDelta;
		$(this).scrollLeft($(this).scrollLeft()-delta);
		return false;
	}
	function onWheelBig(e){
		var delta = e.deltaY || e.detail || e.wheelDelta;
		$(this).scrollLeft($(this).scrollLeft()-delta);

		var display_img;
		for(var i = 0;i<ids.length;i++){
			if(!(($(ids[i]).offset().left+$(ids[i]).innerWidth()+$('.big-foto-wrapper').scrollLeft() >= $('.big-foto-wrapper').scrollLeft()+$(window).innerWidth())||($(ids[i]).offset().left+$('.big-foto-wrapper').scrollLeft()<=$('.big-foto-wrapper').scrollLeft()))||
				(($(ids[i]).offset().left+$('.big-foto-wrapper').scrollLeft()<=$('.big-foto-wrapper').scrollLeft())&($(window).innerWidth()<=$(ids[i]).offset().left+$(ids[i]).innerWidth())) ){
				display_img=ids[i];
			}
		}

		var forid = $(display_img).attr('id').replace('#','');
		var tie_img;
		for(var i=0;i<labels.length;i++){
			if($(labels[i]).attr('for')==forid){
				
				tie_img = $(labels[i]);
			}
		}
		/*****скроллим превью, если нужно****/
		if((tie_img.offset().left+tie_img.innerWidth()+$('.small-foto-wrapper').scrollLeft() >= $('.small-foto-wrapper').scrollLeft()+$(window).innerWidth())||(tie_img.offset().left+$('.small-foto-wrapper').scrollLeft()<=$('.small-foto-wrapper').scrollLeft())) {
			var destination = (window.innerWidth-tie_img.innerWidth())/2;
			$('.small-foto-wrapper').animate( { scrollLeft: $('.small-foto-wrapper').scrollLeft() + tie_img.position().left - destination}, 600,'linear' );
		}
		return false;
	}
	/********************событие кнопок вверх-вниз********************/
	document.getElementsByTagName('body')[0].onkeydown=function()
	{
		event.preventDefault();
		if(event.keyCode==37){
			scroll(-1);
		}
		if(event.keyCode==39){
			scroll(1);
		}
	}
	/**************скролл для мобильного****************/

	/*var moveStart, moveEnd;
	elem.addEventListener('touchstart', function(event) {
		event.preventDefault();
	  var touch = event.targetTouches[0];
	  	moveStart=+touch.pageX;
	}, false);
	elem.addEventListener('touchend', function(event) {
		event.preventDefault();
	  var touch = event.changedTouches[0];
	  	moveEnd=+touch.pageX;
	  	if(moveStart<moveEnd){
	  		scroll(-1);
	  		moveEnd=moveStart=0;
	  	}else{
	  		scroll(1);
	  		moveEnd=moveStart=0;
	  	}
	}, false);
*/
	/***********изменение адреса***********/
	var location = window.location.toString();
	location=location.split('/',5);
	id=location[4];
	var destination = (window.innerWidth-$(id).innerWidth())/2;
	$('.big-foto-wrapper').animate( { scrollLeft: $('.big-foto-wrapper').scrollLeft() + $(id).position().left - destination}, 600,'linear' );
}