"use strict";

var utils = require("../utils");

/**
 * axios默认配置和开发者传递的配置对象的合并处理
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(["url", "method", "params", "data"], function valueFromConfig2(
    prop
  ) {
    if (typeof config2[prop] !== "undefined") {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(["headers", "auth", "proxy"], function mergeDeepProperties(
    prop
  ) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== "undefined") {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== "undefined") {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(
    [
      "baseURL",
      "transformRequest",
      "transformResponse",
      "paramsSerializer",
      "timeout",
      "withCredentials",
      "adapter",
      "responseType",
      "xsrfCookieName",
      "xsrfHeaderName",
      "onUploadProgress",
      "onDownloadProgress",
      "maxContentLength",
      "validateStatus",
      "maxRedirects",
      "httpAgent",
      "httpsAgent",
      "cancelToken",
      "socketPath"
    ],
    function defaultToConfig2(prop) {
      if (typeof config2[prop] !== "undefined") {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== "undefined") {
        config[prop] = config1[prop];
      }
    }
  );

  return config;
};
