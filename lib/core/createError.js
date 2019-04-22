"use strict";

var enhanceError = require("./enhanceError");

/**
 * axios创建增强型的Error对象
 */
module.exports = function createError(
  message,
  config,
  code,
  request,
  response
) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};
