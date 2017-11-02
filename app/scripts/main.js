/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
(function($, window, document, undefined) {
  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in our plugin).

  // Create the defaults once
  var pluginName = "animateText",
    defaults = {
      duration: 3000
    };
  var dataKey = "plugin_" + pluginName;

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = $(element);
    this._sliderContainer = this.element.find(
      '[data-animation-role="main-container"]'
    );
    this._sliderContentsList = this.element.find(
      '[data-animation-role="content-list"]'
    );
    this._sliderContent = this.element.find('[data-animation-role="content"]');
    this.finalDesc = this.element.find(".end-desc");
    this.activeIndex = 0;
    this.animationLoop = 0;

    this.animationForward = "right";
    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype.init = function() {
    var _this = this;
    this.maxIndex = this._sliderContent.length;
    if (this.options.duration) {
      this.startSlidingContents(this.options.duration);
    }

    $(".end-desc .play-animation").click(function() {
      $(".end-desc").fadeOut(2500, function() {
        $(_this.element).removeClass("active");
        _this.startSlidingContents(_this.options.duration);
      });
    });
  };

  Plugin.prototype.setPositions = function() {
    this._sliderContent.each(function(index, element) {
      if (index % 2 == 0) {
        if ((index / 2) % 2 == 0) {
          $(element).css("left", "-100%");
        } else {
          $(element).css("left", "100%");
        }
      } else {
        if (((index - 1) / 2) % 2 == 0) {
          $(element).css("top", "-100%");
        } else {
          $(element).css("top", "100%");
        }
      }
    });
  };

  Plugin.prototype.stopAnimation = function() {
    var _this = this;
    clearInterval(_this.animationInterval);
  };

  Plugin.prototype.startSlidingContents = function(
    duration = this.options.duration
  ) {
    var _this = this;
    var animatedToward = "right";
    var activeState = 1;
    _this._sliderContent.removeClass("active");
    _this._sliderContent.eq(_this.activeIndex).addClass("active");
    _this.animationInterval = setInterval(function() {
      _this._sliderContent.removeClass("active");
      _this._sliderContent.eq(_this.activeIndex).addClass("active");
      _this.startAnimating(duration, activeState);
      console.log(_this.activeIndex);
      if (activeState == 3) {
        animatedToward = "left";
      } else if (activeState == 1) {
        animatedToward = "right";
      }
      if (_this.activeIndex == _this.maxIndex - 1) {
        _this.activeIndex = 0;
      } else {
        _this.activeIndex += 1;
      }
      activeState += animatedToward == "right" ? 1 : -1;
    }, duration);
  };

  Plugin.prototype.startAnimating = function(duration, activeIndex) {
    var _this = this;
    console.log(activeIndex);
    if (activeIndex == 1) {
      _this._sliderContainer.css("transform", "translateX(0)");
    } else if (activeIndex == 2) {
      _this._sliderContainer.css(
        "transform",
        "translateX(" +
          (_this.element.width() - _this._sliderContainer.outerWidth()) +
          "px)"
      );
    } else {
      _this._sliderContainer.css(
        "transform",
        "translateX(" +
          (_this.element.width() / 2 -
            _this._sliderContainer.outerWidth() / 2) +
          "px)"
      );
      _this.stopAnimation();
      setTimeout(function(params) {
        _this._sliderContent.removeClass("active");
      }, 3000);

      setTimeout(function() {
        startFinalDesc.call(_this);
      }, duration);
    }
  };

  Plugin.prototype.setAnimationDurations = function(duration) {
    this._sliderContent.css("transition-duration", duration + "s");
    this._sliderContainer.css("transition-duration", duration + "s");
  };

  function endAnimation(params) {}

  function startFinalDesc() {
    $(this.element).addClass("active");
    $(".end-desc")
      .fadeIn(300)
      .css("display", "flex");
  }
  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    var plugin = this.data(dataKey);

    // has plugin instantiated ?
    if (plugin instanceof Plugin) {
      // if have options arguments, call plugin.init() again
      if (typeof options !== "undefined") {
        plugin.init(options);
      }
    } else {
      plugin = new Plugin(this, options);
      this.data(dataKey, plugin);
    }

    return plugin;
  };
})(jQuery, window, document);

$(document).ready(function() {
  $("#info").animateText({ duration: 5000 });

  $(".dropdown.dropdown-click").click(function(e) {
    $(this)
      .find(".dropdown-list")
      .fadeToggle(200);
  });
  $(".dropdown-list a").click(function(e) {
    e.preventDefault();
    $(this)
      .closest(".dropdown")
      .find(".dropdown-append-value")
      .val($(this).text());
  });

  //change background of header on scroll
  $(window).on("scroll", function() {
    if ($(window).scrollTop() > 50) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  });
});
