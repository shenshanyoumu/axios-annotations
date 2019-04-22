"use strict";

var utils = require("./../utils");

/**
 * 所谓同源策略，就是具有相同协议、域名和端口的地址
 */
module.exports = utils.isStandardBrowserEnv()
  ? // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;

      /**
       *
       * @param {*} url URL组件的解析
       */
      function resolveURL(url) {
        var href = url;

        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute("href", href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol
            ? urlParsingNode.protocol.replace(/:$/, "")
            : "",
          host: urlParsingNode.host, //注意host、referer和origin的差异
          search: urlParsingNode.search
            ? urlParsingNode.search.replace(/^\?/, "")
            : "",
          hash: urlParsingNode.hash
            ? urlParsingNode.hash.replace(/^#/, "")
            : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname:
            urlParsingNode.pathname.charAt(0) === "/"
              ? urlParsingNode.pathname
              : "/" + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
       * Determine if a URL shares the same origin as the current location
       *
       * @param {String} requestURL The URL to test
       * @returns {boolean} True if URL shares the same origin, otherwise false
       */
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL)
          ? resolveURL(requestURL)
          : requestURL;
        return (
          parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host
        );
      };
    })()
  : // 在非浏览器环境，并不需要关心同源问题，因为同源问题是浏览器保证Web安全的策略
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })();
