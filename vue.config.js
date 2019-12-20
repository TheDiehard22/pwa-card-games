module.exports = {
  pwa: {
    themeColor: "#3fad4d",
    appleMobileWebAppCapable: "yes",
    name: "BlazeGames"
  },

  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    const inlineSvgRule = config.module.rule("inline-svg");

    // svgRule.uses.clear();
    svgRule.exclude.add(/inline\.(.*)\.svg/).end();
    inlineSvgRule
      .test(/inline\.(.*)\.svg/)
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");

    // console.log(svgRule.uses);
  }
};
