"use strict";

/*eslint no-console:0*/

/**
 * 第三方库在迭代过程中，可能会丢弃一些接口，因此对仍然使用这些接口的用户提示警告
 */
module.exports = function deprecatedMethod(method, instead, docs) {
  try {
    console.warn(
      "DEPRECATED method `" +
        method +
        "`." +
        (instead ? " Use `" + instead + "` instead." : "") +
        " This method will be removed in a future release."
    );

    if (docs) {
      console.warn("For more information about usage see " + docs);
    }
  } catch (e) {
    /* Ignore */
  }
};
