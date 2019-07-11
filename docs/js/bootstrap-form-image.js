/*!
  * Bootstrap Form Image v0.0.1 (https://iqbalfn.github.io/bootstrap-form-image/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-image/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global['bootstrap-form-image'] = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'formimage';
  var VERSION = '0.0.1';
  var DATA_KEY = 'bs.formimage';
  var EVENT_KEY = "." + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Default = {
    imagePicker: function imagePicker(cb) {
      return cb(prompt('Image URL'));
    },
    imagePreviewer: true
  };
  var DefaultType = {
    imagePicker: '(function|string)',
    imagePreviewer: '(function|string|boolean)'
  };
  var Event = {
    UPDATE: "update" + EVENT_KEY,
    UPDATED: "updated" + EVENT_KEY,
    CHANGE: "change" + EVENT_KEY,
    CLEAR: "clear" + EVENT_KEY,
    CLEARED: "cleared" + EVENT_KEY,
    CHANGE_DATA_API: "change" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY
  };
  var ClassName = {
    CONTAINER: 'formimage',
    EMPTY: 'empty',
    PREVIEW: 'formimage-preview',
    REMOVER: 'formimage-clear'
  };
  var Selector = {
    CONTAINER: "." + ClassName.CONTAINER,
    PREVIEW: "." + ClassName.PREVIEW,
    REMOVER: "." + ClassName.REMOVER
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var FormImage =
  /*#__PURE__*/
  function () {
    function FormImage(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._preview = $(element).children(Selector.PREVIEW).get(0);
      this._model = document.querySelector(this._element.dataset.model);
      this._value = this._model.value;
      if (typeof this._config.imagePicker === 'string') this._config.imagePicker = window[this._config.imagePicker];

      this._addModelListener();
    } // Getters


    var _proto = FormImage.prototype;

    // Public
    _proto.clear = function clear() {
      this.setImage('');
    };

    _proto.pick = function pick() {
      var _this = this;

      this._config.imagePicker(function (res) {
        _this.setImage(res);
      }, this);
    };

    _proto.pickOrPreview = function pickOrPreview() {
      this._value ? this.preview() : this.pick();
    };

    _proto.preview = function preview() {
      if (typeof this._config.imagePreviewer === 'boolean') return;

      this._config.imagePreviewer(this._value);
    };

    _proto.setImage = function setImage(image) {
      if (image === null) return;
      if (this._value === image) return;
      this._model.value = this._value = image;
      if (image) this._updateImage();else this._clearImage();
    } // Private
    ;

    _proto._addModelListener = function _addModelListener() {
      var _this2 = this;

      $(this._model).on('change', function (e) {
        if (_this2._value != e.target.value) _this2._setImage(e.target.value);
      });
    };

    _proto._clearImage = function _clearImage() {
      $(this._element).trigger(Event.CLEAR);

      this._preview.removeAttribute('style');

      this._element.classList.add(ClassName.EMPTY);

      $(this._element).trigger(Event.CLEARED);
      $(this._element).trigger(Event.CHANGE);
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    _proto._updateImage = function _updateImage() {
      $(this._element).trigger(Event.UPDATE);

      this._element.classList.remove(ClassName.EMPTY);

      this._preview.style.backgroundImage = "url(" + this._value + ")";
      $(this._element).trigger(Event.UPDATED);
      $(this._element).trigger(Event.CHANGE);
    } // Static
    ;

    FormImage._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        var _config = _objectSpread({}, Default, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new FormImage(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(FormImage, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return FormImage;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.REMOVER, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormImage._jQueryInterface.call($(target), 'clear', target);
  });
  $(document).on(Event.CLICK_DATA_API, Selector.PREVIEW, function (event) {
    var target = this.parentNode;
    if (this.tagName === 'A' || this.tagName === 'AREA') event.preventDefault();

    FormImage._jQueryInterface.call($(target), 'pickOrPreview', target);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = FormImage._jQueryInterface;
  $.fn[NAME].Constructor = FormImage;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return FormImage._jQueryInterface;
  };

  exports.FormImage = FormImage;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=bootstrap-form-image.js.map
