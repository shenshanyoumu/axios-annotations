"use strict";

/**
 * 控制http请求是否可取消
 */
module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
