"use strict";

/**
 * Cancel对象在请求取消时抛出
 * @param {*} message 可以传递请求被取消的原因
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return "Cancel" + (this.message ? ": " + this.message : "");
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;
