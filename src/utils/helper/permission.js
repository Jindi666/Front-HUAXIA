import i18n from '@/locales/index'
const PERMISSION_ENUM = {
  add: { key: 'add', label: i18n.t('utilsIndexJs.addText.text') },
  delete: { key: 'delete', label: i18n.t('utilsIndexJs.deleteText.text') },
  edit: { key: 'edit', label: i18n.t('utilsIndexJs.modifyText.text') },
  query: { key: 'query', label: i18n.t('utilsIndexJs.queryText.text') },
  get: { key: 'get', label: i18n.t('utilsIndexJs.detailsText.text') },
  enable: { key: 'enable', label: i18n.t('utilsIndexJs.startText.text') },
  disable: { key: 'disable', label: i18n.t('utilsIndexJs.disableText.text') },
  import: { key: 'import', label: i18n.t('utilsIndexJs.importText.text') },
  export: { key: 'export', label: i18n.t('utilsIndexJs.exportText.text') }
}

function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth &&
    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          const _this = this
          return permissions => {
            const [permission, action] = permissions.split('.')
            const permissionList = _this.$store.getters.roles.permissions
            return (
              permissionList
                .find(val => {
                  return val.permissionId === permission
                })
                .actionList.findIndex(val => {
                  return val === action
                }) > -1
            )
          }
        }
      }
    })

  !Vue.prototype.$enum &&
    Object.defineProperties(Vue.prototype, {
      $enum: {
        get() {
          // const _this = this;
          return val => {
            let result = PERMISSION_ENUM
            val &&
              val.split('.').forEach(v => {
                result = (result && result[v]) || null
              })
            return result
          }
        }
      }
    })
}

export default plugin
