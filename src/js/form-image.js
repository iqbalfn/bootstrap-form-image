/**
 * --------------------------------------------------------------------------
 * Bootstrap Form Image (v0.0.1): form-image.js
 * --------------------------------------------------------------------------
 */

import $ from 'jquery'
import Util from './util'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

 const NAME               = 'formimage'
 const VERSION            = '0.0.1'
 const DATA_KEY           = 'bs.formimage'
 const EVENT_KEY          = `.${DATA_KEY}`
 const DATA_API_KEY       = '.data-api'
 const JQUERY_NO_CONFLICT = $.fn[NAME]
 
 const Default = {
    imagePicker     : cb => cb(prompt('Image URL')),
    imagePreviewer  : true
}

const DefaultType = {
  imagePicker       : '(function|string)',
  imagePreviewer    : '(function|string|boolean)'
}

const Event = {
    UPDATE              : `update${EVENT_KEY}`,
    UPDATED             : `updated${EVENT_KEY}`,
    CHANGE              : `change${EVENT_KEY}`,
    CLEAR               : `clear${EVENT_KEY}`,
    CLEARED             : `cleared${EVENT_KEY}`,

    CHANGE_DATA_API     : `change${EVENT_KEY}`,
    CLICK_DATA_API      : `click${EVENT_KEY}`,
}

const ClassName = {
    CONTAINER       : 'formimage',
    EMPTY           : 'empty',
    PREVIEW         : 'formimage-preview',
    REMOVER         : 'formimage-clear',
}

const Selector = {
    CONTAINER       : `.${ClassName.CONTAINER}`,
    PREVIEW         : `.${ClassName.PREVIEW}`,
    REMOVER         : `.${ClassName.REMOVER}`,
}

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class FormImage {
    constructor(element, config) {
        this._config        = this._getConfig(config)
        this._element       = element
        this._preview       = $(element).children(Selector.PREVIEW).get(0)
        this._model         = document.querySelector(this._element.dataset.model)

        this._value         = this._model.value

        this._addModelListener()
    }


    // Getters

    static get VERSION() {
        return VERSION
    }

    static get Default() {
        return Default
    }


    // Public

    clear(){
        this.setImage('')
    }

    pick(){
        this._config.imagePicker(res => {
            this.setImage(res)
        }, this)
    }

    pickOrPreview(){
        this._value ? this.preview() : this.pick()
    }

    preview(){
        if(typeof this._config.imagePreviewer === 'boolean')
            return

        this._config.imagePreviewer(this._value)
    }

    setImage(image){
        if(image === null)
            return
        
        if(this._value === image)
            return
        
        this._model.value = this._value = image

        if(image)
            this._updateImage()
        else
            this._clearImage()
    }

    // Private

    _addModelListener(){
        $(this._model).on('change', e => {
            if(this._value != e.target.value)
                this._setImage(e.target.value)
        })
    }

    _clearImage(){
        $(this._element).trigger(Event.CLEAR)

        this._preview.removeAttribute('style')
        this._element.classList.add(ClassName.EMPTY)

        $(this._element).trigger(Event.CLEARED)
        $(this._element).trigger(Event.CHANGE)
    }

    _getConfig(config) {
        config = {
          ...Default,
          ...config
        }
        Util.typeCheckConfig(NAME, config, DefaultType)
        return config
    }

    _updateImage(){
        $(this._element).trigger(Event.UPDATE)

        this._element.classList.remove(ClassName.EMPTY)
        this._preview.style.backgroundImage = `url(${this._value})`

        $(this._element).trigger(Event.UPDATED)
        $(this._element).trigger(Event.CHANGE)
    }

    // Static

    static _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
            let data = $(this).data(DATA_KEY)
            const _config = {
                ...Default,
                ...$(this).data(),
                ...typeof config === 'object' && config ? config : {}
            }

            if (!data) {
                data = new FormImage(this, _config)
                $(this).data(DATA_KEY, data)
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError(`No method named "${config}"`)
                }
                data[config](relatedTarget)
            } else if (_config.show) {
                data.show(relatedTarget)
            }
        })
    }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */
$(document).on(Event.CLICK_DATA_API, Selector.REMOVER, function (event) {
    let target = this.parentNode
    
    if (this.tagName === 'A' || this.tagName === 'AREA')
        event.preventDefault()

    FormImage._jQueryInterface.call($(target), 'clear', target)
})

$(document).on(Event.CLICK_DATA_API, Selector.PREVIEW, function (event) {
    let target = this.parentNode

    if (this.tagName === 'A' || this.tagName === 'AREA')
        event.preventDefault()

    FormImage._jQueryInterface.call($(target), 'pickOrPreview', target)
})

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = FormImage._jQueryInterface
$.fn[NAME].Constructor = FormImage
$.fn[NAME].noConflict = () => {
    $.fn[NAME] = JQUERY_NO_CONFLICT
    return FormImage._jQueryInterface
}

export default FormImage