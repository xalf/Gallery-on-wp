/*
	события для главной страницы
*/
window.onload = function()
{
	/****************событие колёсика мыши**************/
	var elem = document.getElementsByTagName('body')[0];
	//вешаем обработчик onWheel на события
	/*function add()
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
	add();

	//удаляем обработчик
	function delet()
	{
		if (elem.removeEventListener) 
		{
  			if ('onwheel' in document) 
  			{
    			// IE9+, FF17+, Ch31+
    			elem.removeEventListener("wheel", onWheel);
  			} 
  			else 
  				if ('onmousewheel' in document) 
  				{
    				// устаревший вариант события
    				elem.removeEventListener("mousewheel", onWheel);
  				} 
  				else 
  				{
    				// Firefox < 17
    				elem.removeEventListener("MozMousePixelScroll", onWheel);
  				}
		} 
		else 
		{ 
			// IE8-
  			elem.detachEvent("onmousewheel", onWheel);
		}
	}*/
	//плавный скроллинг
	function scroll(min)
	{
		var destination = window.innerHeight;
		var ua = navigator.userAgent;
		$('body').animate( { scrollTop: $(window).scrollTop()+min*destination*0.9 }, 600,'linear' );
	}
	//обработчик события прокрутки мыши 
	/*function onWheel(e) 
	{
		delet();
		setTimeout(add,1000);
		var delta = e.deltaY || e.detail || e.wheelDelta;
		if(delta<0){
			scroll(-1);
		}
		if(delta>0){
			scroll(1);
		}
		return false;
	}
	/*******скролл на мобильных********/

	var moveStartX, moveEndY, moveStartY, moveEndX;
	var obj = document.getElementsByClassName('block');
	for(var i=0;i<obj.length;i++){
		obj[i].addEventListener('touchstart', function(event) {
			//event.preventDefault();
		  	//alert($(this).children('.right-scroll').attr('href'));
		  	var touch = event.targetTouches[0];
		  	moveStartY=+touch.pageY;
		  	moveStartX=+touch.pageX;

			//setTimeout(function(){alert(touch.pageX+' '+touch.pageY);},1000);
		}, false);
		/*obj[i].addEventListener('touchend', function(event) {
			//event.preventDefault();
		  	var touch = event.targetTouches[0];
		  	moveEndY=+touch.pageY;
		  	moveEndX=+touch.pageX;
		  	if((moveStartX<moveEndX)&(Math.abs(moveStartX-moveEndX)>Math.abs(moveStartY-moveEndY))&(moveStartX-moveEndX>50)){
		  		event.preventDefault();
		  		alert($(this).children('.right-scroll').attr('href'));
		  		moveEnd=moveStart=0;
		  		location.href=$(this).children('.right-scroll').attr('href');
		  	}
		  	else return true;
		}, false);*/
		function touchRight(obj){location.href=$(obj).children('.right-scroll').attr('href');}
		obj[i].addEventListener('touchmove', function(event){
			var touch = event.touches[0];
			moveEndY=+touch.pageY;
		  	moveEndX=+touch.pageX;
		  	if((moveStartX>moveEndX)&(Math.abs(moveStartX-moveEndX)>Math.abs(moveStartY-moveEndY))&(moveStartX-moveEndX>40)){
		  		event.preventDefault();
		  		moveEnd=moveStart=0;
		  		$('.mobile-menu').css('display','none');
				$('.menu ul').css('display','none');
				$('.menu .menu-button').css('display','none');
				$('html').animate({width: 0},600);
		  		setTimeout(touchRight(this),600);
		  	}
		  	else return true;
		},false);
	}

	/********************событие кнопок вверх-вниз********************/
	/*document.getElementsByTagName('body')[0].onkeydown=function()
	{
		if(event.keyCode==38){
			scroll(-1);
		}
		if(event.keyCode==40){
			scroll(1);
		}
	}*/
	/***************оформелние области скроллинга вниз****************/
	$('.down-scroll').css('bottom',-window.innerHeight*0.1+'px');
	$('.down-scroll').css('height',window.innerHeight*0.1+'px');
	$(window).resize(function() {
		$('.down-scroll').css('bottom',-window.innerHeight*0.1+'px');
		$('.down-scroll').css('height',window.innerHeight*0.1+'px');
	});
	/*******************вешаем обработчик области скроллинга вниз******************/
	var downField = document.getElementsByClassName('down-scroll'); 
	var rightField = document.getElementsByClassName('right-scroll'); 

	for(var i=0;i<downField.length;i++){
		$(downField[i]).click(function(){
			event.preventDefault();
			$('body').animate( { scrollTop: $($(this).attr('href')).position().top }, 600,'linear' );
		});
		downField[i].addEventListener('touchstart',function(){
			event.preventDefault();
		},false);
	}

	/**************оформление выезжающего меню*************/
	function abs(){
		$('.menu').toggleClass('abs');
	}
	function mobileMenuAction(){
		//$('.block').toggleClass('mobile-menu-active');
		//$('.menu').toggleClass('mobile-menu-active');
		if($('.menu').hasClass('abs')) {
			//setTimeout(abs, 200);
			abs();
			$('.mobile-menu').toggleClass('mobile-menu-z-index');
		}
		else {
			$('.menu').toggleClass('abs');
			//$('.mobile-menu').toggleClass('mobile-menu-z-index');
			setTimeout(function(){$('.mobile-menu').toggleClass('mobile-menu-z-index');},300);
		}
	}
	$('.menu-button').click(mobileMenuAction);
	/*****скроллинг при нажатии на ссылку в меню******/
	/*$('.menu li a').click(function(){
		event.preventDefault();
		var hreftoblock = $(this).attr('href');
		$('body').animate( { scrollTop: $(hreftoblock).position().top}, 600,'linear' );
	});
	$('.mobile-menu li a').click(function(){
		event.preventDefault();
		var hreftoblock = $(this).attr('href');
		$('body').animate( { scrollTop: $(hreftoblock).position().top}, 600,'linear' );
		setTimeout(mobileMenuAction, 600);
	});*/
	/*нажатие на правую область*/
	$('.right-scroll').click(function(){
		//event.preventDefault();
		$('.mobile-menu').css('display','none');
		$('.menu ul').css('display','none');
		$('.menu .menu-button').css('display','none');
		$('html').animate({width: 0},600);
	});
	for(var i=0;i<rightField.length;i++){
	 rightField[i].addEventListener('touchstart',function(){
		event.preventDefault();
	 },false);}
	 if($(window).innerWidth()<700){
	 	for(var i =0; i<obj.length;i++){
	 		$(obj[i]).css('height',$(obj).innerHeight());
	 	}
	 }
}