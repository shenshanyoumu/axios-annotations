"use strict";

/**
 * 基础地址baseURL无论是不是以"/"结尾，都不会造成异常；同时relativeURL无论是否以"/"前缀也不会有问题
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
};
