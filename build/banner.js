'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap Form Image v0.0.1 (https://iqbalfn.github.io/bootstrap-form-image/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/iqbalfn/bootstrap-form-image/blob/master/LICENSE)
  */`
}

module.exports = getBanner
