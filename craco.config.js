module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      console.log(webpackConfig); // برای دیدن Webpack config
      return webpackConfig;
    },
  },
};
