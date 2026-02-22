const getters = {
  device: state => state.app.device,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  lang: state => state.i18n.lang,
  envId: state => state.environment.envId,
  isFirstLogin: state => state.agreement.isFirstLogin,
  menus: state => state.user.menus,
  ignoreValidationCode: state => state.user.ignoreValidationCode,
  siteTitle: state => state.user.siteTitle,
  menuLogo: state => state.user.menuLogo
}

export default getters
