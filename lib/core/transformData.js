"use strict";

var utils = require("./../utils");

/**
 * axios支持对HTTP报文数据进行处理的钩子
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};
