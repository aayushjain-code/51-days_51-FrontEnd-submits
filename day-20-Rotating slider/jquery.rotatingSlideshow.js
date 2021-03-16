// rotatingSlideshow plugin
(function ($) {
  function rotatingSlideshow(options) {
    this.options = $.extend({
      // defaults
      sliderHolder: '#slider-main',
      btnsHolder: '#slider-btns',
      audioHolder: '#slider-sound',
	  auto: true,
      autoSpeed: '6000'
    }, options);
    this._init();
    this._auto();
    this._isActive();
    this._click();
    this._resize();
  }
	
  rotatingSlideshow.prototype = {
    _init: function(){
      this.slider = $(this.options.sliderHolder);
      this.btns = $(this.options.btnsHolder);
      this.audio = $(this.options.audioHolder)[0];
      this.auto = this.options.auto;
      this.autoSpeed = this.options.autoSpeed;
      // check if overlay is loader and then enable overlay images
      var self = this;
      // overlay status
      var isLoaded = this.slider.find('.spinner')[0].complete;
      // if it's not loaded then add event listener
      if(!isLoaded){
        var overlay = this.slider.find('.spinner');
        overlay.one('load', function() {
          self.slider.find('.slides').show();
          self.slider.find('.slider-overlay').show();
        });
        // if is loaded then show appropriate div's
      } else {
        self.slider.find('.slides').show();
        self.slider.find('.slider-overlay').show();
      }
    },

    _click: function(){
      var self = this;
      // detect btn click
      var slider = this.slider;
      var btns =  this.btns.find('a');
      btns.each(function(){
        var item = $(this);
        item.on('click', function(e){
          if(btnClick == false){
            // current value of the slider in degrees
            var currentDeg = parseInt(slider.attr('data-deg'));
            // current position of the slider [1,2,3,4]
            var currentPos = parseInt(slider.attr('data-position'));
            // position of the clicked button
            var btnPos = $(this).attr('data-position');
            switch(btnPos){
              case '1':
                // for case [1] do nothing
                break;
              case '2':
                // increase degrees for 90
                currentDeg += 90;
                // increase position for 1
                currentPos += 1;
                // call function with parameters (current degrees, current position of the slider, animation time)
                self._update(currentDeg, currentPos, 1.5);
                self._playSound();
                break;
              case '3':
                // increase degrees for 180
                currentDeg += 180;
                // increase position for 1
                currentPos += 2;
                // call function with parameters (current degrees, current position of the slider, animation time)
                self._update(currentDeg, currentPos, 2);
                self._playSound();
                break;
              case '4':
                // decrease degrees for 90
                currentDeg -= 90;
                // increase position for 1
                currentPos += 3;
                // call function with parameters (current degrees, current position of the slider, animation time)
                self._update(currentDeg, currentPos, 1.5);
                self._playSound();
                break;
            }
          }
          return false;
        });
      });
    },

    _update: function(currentDeg, currentPos, animSpeed){
      // set clicked state to true
      btnClick = true;
      var self = this;
      var slider = this.slider;
      // check if we reached the last slide > 4
      var pos = currentPos;
      // if so then deduct 4
      if(pos > 4){
        pos = pos - 4;
      }
      // 1. remove active class from all 1920*590 images and remove actve class from overlay images
      slider.find('.slider-overlay div').removeClass('active');
      //slider.find('.slides img').removeClass('active').removeAttr('style');
      slider.find('.slides img').removeClass('active').css('transition', '');
      // 2. add active class for spinner image and add active class to correct 1920*590 image
      slider.find('.spinner').addClass('active');
      slider.find('.slides img[data-position="' + pos + '"]').addClass('active')
          .css({
            //'transition' : 'opacity ' + (animSpeed * 1.3) + 's ease'
            'transition' : 'opacity ' + (animSpeed * 0.5) + 's ease-in'
      });
      // 3. add 250ms delay and then rotate the spinner and change background classes
      setTimeout(function(){
        slider.find('.spinner').css({
          'transform' : 'rotate(' + currentDeg + 'deg)',
          'transition' : 'transform ' + (animSpeed * 0.4) + 's ease'
        });
        slider.find('.spinner-btn').css({
          'transform' : 'rotate(' + currentDeg + 'deg)',
          'transition' : 'transform ' + (animSpeed * 0.4) + 's ease'
        });
      }, 250);
      // 4. remove active class from spinner
      setTimeout(function(){
        slider.find('.spinner').removeClass('active');
        slider.find('.spinner-btn').removeClass('active');
        //slider.find('.slides img[data-position="' + pos + '"]').addClass('active');
      }, ((animSpeed * 0.6) * 1000));
      // 5. add active class to the overlay image
      setTimeout(function(){
        slider.find('.slider-overlay div[data-position="' + pos + '"]').addClass('active');
      }, ((animSpeed * 0.4) * 1000));
      // update the slider position
      slider.attr('data-position', pos);
      // update the slider degrees
      slider.attr('data-deg', currentDeg);
      // play sound
      //self.audio.load();
      //self.audio.play();
      setTimeout(function(){
        // enable click again
        btnClick = false;
      }, ((animSpeed * 0.7) * 1000));
    },
    
    _playSound: function(){
      var self = this;
      // play sound
      self.audio.load();
      self.audio.play();
      self.audio.volume = 0.07;
      self._stop();
    },
    
    _auto: function(){
	  if(this.auto){
        var self = this;
        // set rotation interval
        timer = setInterval(function(){
		  self._setAutoRotation();
        }, self.autoSpeed);
	  }
    },
    
    _setAutoRotation: function(){
      var self = this;
      var slider = this.slider;
      // current degrees value
      var deg = parseInt(slider.attr('data-deg'));
      // current slider position
      var currentPos = parseInt(slider.attr('data-position'));
      currentPos += 1;
      // rotate for +90deg
      deg += 90;
      // call func
      self._update(deg, currentPos, 1.5);
    },
    
    _stop: function(){
      clearInterval(timer);
    },
    
    _isActive: function(){
      var self = this;
      // determine whether browser/tab is active
      var hidden, visibilityState, visibilityChange;

      if (typeof document.hidden !== "undefined") {
        hidden = "hidden", visibilityChange = "visibilitychange", visibilityState = "visibilityState";
      } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden", visibilityChange = "msvisibilitychange", visibilityState = "msVisibilityState";
      }

      var document_hidden = document[hidden];

      document.addEventListener(visibilityChange, function() {
        if(document_hidden != document[hidden]) {
          if(document[hidden]) {
            // Document hidden
            self._stop();
            //document.title = 'hidden';
          } else {
            // Document shown
            self._auto();
            //document.title = 'active';
          }
          document_hidden = document[hidden];
        }
      });
    },

    _resize: function(){
      var slider = this.slider;
      // on load
      var width = $(window).width();
      if((width < 1520) && (width > 940)){
        var left = 1520 - width;
        slider.find('> img').css({'left': '-' + left + 'px'});
        slider.find('.slides img').css({'left': '-' + left + 'px'});  
      }
      // on resize
      $(window).on('resize', function(){
        var width = $(window).width();
        if((width < 1520) && (width > 940)){
          var left = 1520 - $(window).width();
          slider.find('> img').css({'left': '-' + left + 'px'});
          slider.find('.slides img').css({'left': '-' + left + 'px'});  
        } else {
          slider.find('> img').css({'left': '0'});
          slider.find('.slides img').css({'left': '0'});
        }
      });
    }
  };

  // global variables
  var timer;
  var btnClick = false;

  $.fn.rotatingSlideshow = function(options){
    return this.each(function() {
      var params = $.extend({}, options, {container: this}),
        instance = new rotatingSlideshow(params);
      $.data(this, 'rotatingSlideshow', instance);
    });
  };
}(jQuery));