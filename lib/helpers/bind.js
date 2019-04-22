"use strict";

/**
 * 参数fn为函数；thisArg表示fn的执行上下文。例如
 * const test = bind(cb,this);
 * test(1,2,3);
 */
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};
