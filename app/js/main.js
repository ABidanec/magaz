$(document).ready(function() {

_moduleToTop.action();
_moduleCaruselInner.action();
_moduleSlider.action();
_moduleSlickMenu.action();

});

// module scroll to top
var _moduleToTop = (function(){
	var fields = {
		button : $('.b-scroll'), // кнопка вверх
		time : 500, // задержка анимации вверх
		head : $('.b-header').height() // высота после которой кнопка появляется/исчезает
	};

	return{
		action: function(){

			fields.button.css({"display" : "none"});

			$(window).on('scroll', function(){
				if($(this).scrollTop() > fields.head) {
			 		fields.button.fadeIn();
				} else {
					fields.button.fadeOut();
			 	}
			});

			fields.button.on('click', function(){
				$('body,html').animate({scrollTop:0}, fields.time);
			});
		}
	}
})();
// end _moduleToTop

// module carusel in page inner.html
var _moduleCaruselInner = (function(){

	var fields = {
			bigImg : $('.b-prod-gallery__big-img'), // большое изображение, куда подставляются слайды
			smallItemList : $('.b-prod-gallery-nav__list'), // список слайдов
			smallItem : $('.b-prod-gallery-nav__item'), // слайд
			smallImg : $('.b-prod-gallery-nav__img'), // изображение слайда
			buttonPrev : $('.b-prod-gallery-nav__prev'), // кнопка предыдущий
			buttonNext : $('.b-prod-gallery-nav__next'), // кнопка следующий
			time : 500, // время анимации
			mixing : 0, // величина смещения
			quantitySlides: 4 // количество отображаемых слайдов
		},
		smallItemWidth = Math.round(fields.smallItem.width()), // ширина слайда
		itemCount = fields.smallItemList.find('li').length, // количество слайдов в списке
		minOffset = - ((itemCount - fields.quantitySlides) * smallItemWidth), // смщение невидимых слайдов (предыдущий)
		maxOffset = 0; // смщение невидимых слайдов (следующий)

	// действия при клике на prev
	var _clickPrev = function(){
		if (fields.mixing != maxOffset){
			fields.mixing += smallItemWidth;
			fields.smallItemList.animate(
				{left : fields.mixing + "px"},	
				fields.time
				);
		}
		};

	// действия при клике на next
	var _clickNext = function(){
		if (fields.mixing != minOffset){
			fields.mixing -= smallItemWidth;
			fields.smallItemList.animate(
				{left : fields.mixing + "px"}, 
				fields.time
				);
		}
		};

	var _hiddenNavbuttons = function(){

		if(itemCount <= fields.quantitySlides){
			fields.buttonPrev.css({"display" : "none"});
			fields.buttonNext.css({"display" : "none"});
		}
	}

	return{
		action: function(){

			_hiddenNavbuttons();

			// замена изображения при клике на миниатюру в списке
			fields.smallImg.on('click', function(){
				var _this = $(this),
					smailScr = _this.attr('src');

				fields.bigImg.attr('src', smailScr);
			});
			// клик на prev
			fields.buttonPrev.on('click', function(){
				_clickPrev();
			});
			// клик на next
			fields.buttonNext.on('click', function(){
				_clickNext();
			});

		}
	}

})();
// end _moduleCaruselInner

// _moduleSlider
var _moduleSlider = (function(){

	var slider = $('.b-slider_list');

	return {
		action: function(){
			slider.slick({
				dots: true,
				autoplay: true,
				autoplaySpeed: 3000,
				fade: true,
				pauseOnHover: true
			});
		}
	}
})();
// end _moduleSlider

var _moduleSlickMenu = (function(){
	var mainMenu = $('.b-main-menu__list'),
		topMenu = $('.b-top-menu__list');

		return {
			action: function(){
				
				topMenu.slicknav({
					label : "Категории"
				});

				mainMenu.slicknav({
					label : "Меню"
				});
			
			}
		}
})();
