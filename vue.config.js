const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * check production or preview(pro.loacg.com only)
 * @returns {boolean}
 */
function isProd() {
  return process.env.NODE_ENV === 'production'
}

const assetsCDN = {
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
  ]
}
const localJs = {
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: ['/cockpitscreen/js/vue.min.js', '/cockpitscreen/js/vue-router.min.js', '/cockpitscreen/js/vuex.min.js', '/cockpitscreen/js/axios.min.js']
}

// webpack build externals
const prodExternals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}

// 引入等比适配插件
const px2rem = require('postcss-px2rem')
// 配置基本大小
const postcss = px2rem({
  remUnit: 19.2
})

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod is on, add externals
    externals: isProd() ? prodExternals : {}
  },

  publicPath: './',

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })

    // if prod is on
    // assets require on cdn
    if (isProd()) {
      config.plugin('html').tap(args => {
        args[0].cdn = localJs
        return args
      })
    }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#202B4F',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
          // 'switch-color': '#202B4F',
          // 表格
          // 'table-header-bg': '#F5F7F7',
          // 'table-header-color': '#687C8A',
          // 'table-row-hover-bg': '#F4F8FE',
          // 'table-selected-row-bg': '#F4F8FE',
          // // 字体样式
          // "font-family":" PingFangSC-Regular,PingFang SC",

          'table-header-bg': 'rgba(245,247,247,1)',
          'table-border-radius-base': '8px'
        },
        // do not remove this line this
        javascriptEnabled: true
      },
      sass: {
        // prependData: `@import "@/utils/utils.scss";`
      },
      postcss: {
        // plugins: [postcss]
      }
    }
  },

  devServer: {
    disableHostCheck: true, //  新增该配置项
    // development server port 8000
    port: 8010,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/': {
        // target: 'http://192.168.10.236:8080/',
        // target: 'https://test-wep.laiye.com/',
        // target: 'http://192.168.1.124:5003/extend/cockpitcreen/dashboard/',
        target: 'http://localhost:5000/',
        ws: true,
        changeOrigin: true,
        // headers: { Host: 'localhost:8010' } // 这行代码，留着调试用
      }
    }
  },

  // disable source map in production
  productionSourceMap: false,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: ['vue-echarts', 'resize-detector']
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
