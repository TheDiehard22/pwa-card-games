module.exports = {
  pwa: {
    name: "BlazeGames",
    themeColor: "#3fad4d",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      short_name: "BlazeGames",
      display: "standalone",
      background_color: "#3fad4d",
      share_target: {
        action: "/share-target/",
        method: "GET",
        params: {
          title: "title",
          text: "text",
          url: "url"
        }
      }
    },
    workboxOptions: {
      exclude: [/\.map$/, /^manifest.*\.js$/, /_redirects/]
      // skipWaiting: true
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    const inlineSvgRule = config.module.rule("inline-svg");

    svgRule.exclude.add(/inline\.(.*)\.svg/).end();
    inlineSvgRule
      .test(/inline\.(.*)\.svg/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
