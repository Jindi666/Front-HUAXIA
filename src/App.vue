<template>
  <a-locale-provider :locale="locale">
    <a-config-provider>
      <div slot="renderEmpty">
        <a-empty :image="require('/src/assets/empty2.png')">
          <span slot="description" style="color: #999; line-height: 19px">{{ $t('public.noData.text') }}</span>
        </a-empty>
      </div>
      <div id="app" @mousemove="checkWebsite">
        <div v-if="loading" style="display: flex; justify-content: center; align-items: center; height: 100%">
          <a-spin />
        </div>
        <router-view v-else :key="key" />
      </div>
    </a-config-provider>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUs from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'
import { mapActions } from 'vuex'
import { AppDeviceEnquire } from '@/utils/mixin'
import Api from '@/api/datav.js'

export default {
  // mixins: [AppDeviceEnquire],
  // data() {
  //   return {
  //     locale: zhCN
  //   }
  // },
  computed: {
    key() {
      return this.$route.path + Math.random()
    },
    // 控制antd组件的语言
    locale() {
      if (this.$i18n.locale === 'en-US') {
        return enUs
      } else if (this.$i18n.locale === 'zh-CN') {
        return zhCN
      } else if (this.$i18n.locale === 'ja-JP') {
        return jaJP
      } else {
        //默认为中文

        return zhCN
      }
    }
  },
  data() {
    return {
      beforeUnload_time: '',
      gap_time: '',
      checkWebsitTimeId: 0,
      loading: false
    }
  },
  created() {
    // localStorage.clear()
    // Api.getPermission({})
    //   .then(response => {
    //     if (response.data.isEnable) {
    //       this.$store.dispatch('setDataVUser', response.data)
    //     } else {
    //       this.$router.push('/noPermission')
    //     }
    //     this.loading = false
    //   })
    //   .catch(error => {
    //     this.loading = false
    //   })
    this.$store.dispatch('setDataVUser', {
      company_id: '706',
      department_id: '3360601355059201,3360602747568129,3360603133444097',
      // department_id: '3342832421044225,3342832622370817,3342832773365761,3402607192178689,3402607460614145,3402628549574657,3402629052891137,3402631368146945,3402633029091329',
      isEnable: true,
      setIsEnable: true,
      employee_id: '3360601858375681',
      tenant: 'personnel'
    })
    setTimeout(() => {
      this.loading = false
    }, 1000)
  },
  methods: {
    // ...mapActions(['Logout', 'GetLoginInfo']),
    // ...mapActions(['Logout', 'GetAccessToken']),
    checkWebsite() {
      // this.GetAccessToken().then(loginConfig => {
      //   // window.location.reload()
      // })
    }
  },
  mounted() {
    // window.addEventListener('beforeunload', e => {
    //   this.beforeUnload_time = new Date().getTime()
    // })
    // window.addEventListener('unload', async () => {
    //   this.gap_time = new Date().getTime() - this.beforeUnload_time
    //   if (this.gap_time <= 5) {
    //     //关闭
    //     //清除 cookie 或者 localStorage 的方法
    //     this.$cookies.remove('isLogin')
    //   } else {
    //     // 刷新
    //   }
    // })
  },
  destroyed() {
    // window.removeEventListener('beforeunload')
    // window.removeEventListener('unload')
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: PingFangSC-Regular, PingFang SC, 'Microsoft YaHei';
}
// 针对1366 * 768时菜单设置为100%也不完全显示
// @media screen and (max-height: 800px) {
//   #app {
//     height: 150%;
//   }
// }
</style>
<style lang="css">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
/* ::-webkit-scrollbar-track {
  width: 22px;
} */
::-webkit-scrollbar-thumb {
  background: rgba(217, 222, 226, 1);
  border-radius: 4px;
  height: 94px;
  width: 6px;
}
/* ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(95, 95, 95, 0.7);
} */
.ant-modal-body {
  max-height: 624px;
  overflow-y: auto;
}
</style>
