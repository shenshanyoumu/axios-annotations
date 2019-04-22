"use strict";

var utils = require("../utils");

/**
 * 归一化处理HTTP请求头headers部分的属性大小写，并删除原来的旧属性
 */
module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};
