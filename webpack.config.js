var webpack = require("webpack");
var config = {};

/** 一般而言针对库的打包采用parcel，而针对应用的打包采用webpack */
function generateConfig(name) {
  var uglify = name.indexOf("min") > -1;

  /** 打包配置如下，输出格式为UMD模块规范，并且库名称为axios */
  var config = {
    entry: "./index.js",
    output: {
      path: "dist/",
      filename: name + ".js",
      sourceMapFilename: name + ".map",
      library: "axios",
      libraryTarget: "umd"
    },
    node: {
      process: false
    },
    devtool: "source-map"
  };

  config.plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ];

  /** 针对压缩版，采用压缩插件对输出包压缩处理 */
  if (uglify) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      })
    );
  }

  return config;
}

["axios", "axios.min"].forEach(function(key) {
  config[key] = generateConfig(key);
});

module.exports = config;
