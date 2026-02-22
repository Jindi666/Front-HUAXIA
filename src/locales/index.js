/**
 * Vue i18n loader
 * created by kai
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// default language
import zh_cn from '../../public/i18n/js/zh_CN.json'
import en_us from '../../public/i18n/js/en_US.json'
import ja_jp from '../../public/i18n/js/ja_JP.json'
import zh_tw from '../../public/i18n/js/zh_TW.json'
import Cookies from 'js-cookie'

Vue.use(VueI18n)

function initLang() {
  // console.log(document.cookie)

  var lang = localStorage.getItem('lang')

  //线上环境读取cookie中的lang
  if (process.env.NODE_ENV === 'production') {
    var cookieLang = Cookies.get('_INIT_LANG')
    if (cookieLang) {
      lang = cookieLang
      Cookies.remove('_INIT_LANG')
    }
  }

  if (!lang) {
    lang = navigator.browserLanguage || navigator.language || 'zh-CN'
  }

  localStorage.setItem('lang', lang)

  let nLang = ''
  let oLang = lang.toLowerCase()
  switch (oLang) {
    case 'zh-cn':
    case 'zh':
    case 'cn':
      nLang = 'zh-CN'
      break
    case 'en-us':
    case 'en':
    case 'us':
      nLang = 'en-US'
      break
    case 'zh-tw':
      nLang = 'zh-TW'
      break
    case 'ja-jp':
      nLang = 'ja-JP'
      break
    default:
      nLang = 'en-US'
      break
  }
  return nLang
}

export const defaultLang = initLang() || 'zh-CN'
// export const defaultLang = 'zh-CN'

const messages = {
  'zh-CN': zh_cn,
  'en-US': en_us,
  'ja-JP': ja_jp,
  'zh-TW': zh_tw
}

const i18n = new VueI18n({
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages
})

export default i18n

const loadedLanguages = [defaultLang]

// 从缓存设置中加载当前语言
// if (Vue.ls.get('lang') !== null && defaultLang !== Vue.ls.get('lang')) {
//   loadLanguageAsync(localStorage.lang)
// }

function setI18nLanguage(lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

//国际化枚举
export const LangEnum = {
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'en-US': 'en-US',
  'ja-JP': 'ja-JP'
}

export function loadLanguageAsync(lang = defaultLang) {
  return new Promise(resolve => {
    // 缓存语言设置
    Vue.ls.set('lang', lang)
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./lang/${lang}`).then(msg => {
          i18n.setLocaleMessage(lang, msg.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        })
      }
      return resolve(setI18nLanguage(lang))
    }
    return resolve(lang)
  })
}
