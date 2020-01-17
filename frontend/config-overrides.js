const WorkerPlugin = require("worker-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const webpack = require("webpack");

const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = {
  webpack: function (config, env) {
    config = rewireAliases.aliasesOptions({
      // '@components': path.resolve(__dirname, `${paths.appSrc}/components/`)
      "@constants": path.join(__dirname, "/src/constants"),
      "@styles": path.join(__dirname, "/src/styles"),
      "@tools": path.join(__dirname, "/src/tools"),
      "@images": path.join(__dirname, "/src/images"),
      "@store": path.join(__dirname, "/src/store"),
      "@actions": path.join(__dirname, "/src/store/actions"),
      "@actionCreators": path.join(__dirname, "/src/store/actions/actionCreators")
    })(config, env);

    config.stats = {
      reasons: true,
    };
    config.plugins.push(new WorkerPlugin());
    config.plugins.push(new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      DEBUG: false,
      SERVER_URL: "http://localhost:3000",
      PUBLIC_URL: "http://localhost:3003",
    }));
    // if (process.env.NODE_ENV === "production") {
    //   config.plugins.push(new BundleAnalyzerPlugin({
    //     analyzerMode: "static",
    //     defaultSizes: "parsed",
    //     reportFilename: "webpack-report.html",
    //   }));
    // }

    config.externals = ["child_process", "worker_threads"];

    config.optimization.minimizer[0] = new TerserPlugin({
      terserOptions: {
        parse: {
          // we want terser to parse ecma 8 code. However, we don"t want it
          // to apply any minfication steps that turns valid ecma 5 code
          // into invalid ecma 5 code. This is why the "compress" and "output"
          // sections only apply transformations that are ecma 5 safe
          // https://github.com/facebook/create-react-app/pull/4234
          ecma: 8,
        },
        compress: {
          ecma: 8,
          warnings: false,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebook/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          // Disabled because of an issue with Terser breaking valid code:
          // https://github.com/facebook/create-react-app/issues/5250
          // Pending futher investigation:
          // https://github.com/terser-js/terser/issues/120
          inline: 2,
        },
        output: {
          ecma: 8,
          comments: false,
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebook/create-react-app/issues/2488
          ascii_only: true,
        },
      },
      // Use multi-process parallel running to improve the build speed
      // Default number of concurrent runs: os.cpus().length - 1
      parallel: true,
      // Enable file caching
      cache: true,
      sourceMap: true,
    });

    // config.optimization.splitChunks.cacheGroups = {
    //   excel: {
    //     test: /[\\/]node_modules[\\/](xlsx-populate|chevrotain|fast-formula-parser|jstat|object-hash|pako|jszip|elliptic|bn.js|cfb|readable-stream|asn1.js|saxes|buffer|hash.js|sha.js|diffie-hellman|des.js|parse-san1|md5.js|lie|bessel|regexp-to-ast|browserify-aes|browserify-rsa|parse-asn1|xmlchars|)[\\/]/,
    //     name: "excel-lib",
    //     chunks: "all",
    //   }
    // };
    return config;
  },
  jest: function (config) {
    config.verbose = true;
    return config;
  },
};
