<template>
  <Layout1 @contentClick="onContentClick">
    <!-- 主菜单栏 -->
    <template v-slot:layout1Side1>
      <MainMenu :menuItems="menus" @onShowSide2="openSubMenu" @onHoverMenu="hoverMenu">
        <template v-slot:mainMenuTitle>
          <img :src="menuLogo" alt="" />
        </template>
      </MainMenu>
      <!-- 该div用于鼠标往下移时，子菜单pop消失掉 -->
      <div @mouseover="popDisplay = false" style="height:100px;width:100px;" />
      <Agreement :isShowAgreement="isShowUserContract && isShowAgreement" :showType="showType"></Agreement>
      <a-modal :title="$t('basicLayout.pswOutofDate.text')" v-model="dialogVisible" :maskClosable="false" :keyboard="false" width="30%">
        <span>{{ $t('basicLayout.pswTip.text') }}</span>
        <template slot="footer">
          <a-button @click="dialogVisible = false">{{ $t('basicLayout.sayLater.text') }}</a-button>
          <a-button type="primary" @click="updatePwd">{{ $t('public.ok.text') }}</a-button>
        </template>
      </a-modal>
    </template>
    <!-- 副菜单栏 -->
    <transition name="pop-fade">
      <div class="popMenu" v-if="popDisplay" :style="{ top: popTop, position: 'absolute' }" @mouseleave="popDisplay = false">
        <a-menu class="side2-items" mode="inline" v-model="selectedKeys" @select="onSelect">
          <a-menu-item
            :title="subMenu1.meta.title"
            v-for="subMenu1 in menuSubItems.filter(item => !item.children.length)"
            :key="subMenu1.name"
            @click="toRoute(subMenu1.path, subMenu1.meta.title, $event)"
            >{{ subMenu1.meta.title }}</a-menu-item
          >
          <a-sub-menu v-for="subMenu2 in menuSubItems.filter(item => item.children.length > 0)" :key="subMenu2.name" :title="subMenu2.meta.title">
            <a-menu-item v-for="item in subMenu2.children" :key="item.name" @click="toRoute(item.path, item.meta.title, $event)">{{ item.meta.title }}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </transition>
    <!-- header栏 -->
    <template v-slot:layout1Header>
      <global-header />
    </template>
    <!-- content栏 -->
    <template v-slot:layout1Content>
      <transition name="page-transition">
        <router-view></router-view>
      </transition>
    </template>
  </Layout1>
</template>

<script>
import Layout1 from './Layout1.vue'
import MainMenu from '@/components/Menu/MainMenu.vue'
import Agreement from './Agreement'
import { getInfo } from '@/api/login'
import { mapState } from 'vuex'

export default {
  name: 'BasicLayout',
  components: {
    MainMenu,
    Layout1,
    Agreement
    // GlobalFooter
  },
  data() {
    return {
      menus: [],
      menuSubItems: [],
      anglePosition: 111,
      selectedKeys: [],
      dialogVisible: false,
      isShowAgreement: true,
      showType: 'second',
      popDisplay: false
    }
  },
  computed: {
    ...mapState({
      ignoreValidationCode: state => state.user.ignoreValidationCode,
      isShowUserContract: state => state.user.isShowUserContract,
      siteTitle: state => state.user.siteTitle,
      menuLogo: state => state.user.menuLogo
    }),
    popTop: function() {
      return `${this.anglePosition - 15 - (this.menuSubItems.length - 1) * 18}px`
    }
  },
  mounted() {
    if (!['TaskManagerDetail', 'datav', 'WorkerMonitorDetail', 'ScheduleCalendarSet', 'WorkerMonitor'].includes(this.$router.currentRoute.name)) {
      this.$router.push(this.$router.currentRoute.path)
    }

    window.addEventListener('offline', this.handlerOffline)
    window.addEventListener('online', this.handlerOnline)
  },
  beforeDestroy() {
    window.removeEventListener('offline', this.handlerOffline)
    window.removeEventListener('online', this.handlerOnline)
  },
  created() {
    document.title = this.siteTitle
    let vm = this
    // 菜单为路由中meta不为空的项
    this.menus = this.getTree(JSON.parse(this.$store.state.user.menus))[0].children.filter(item => item.meta)
    // 子菜单
    this.menuSubItems = this.menus
      .filter(item => {
        let flag = false
        item.children.map(it => {
          if (it.path === vm.$router.currentRoute.path) {
            flag = true
          }
        })
        return flag
      })
      .filter(item => item.meta)
    // 子菜单中激活的菜单项
    this.menus.map(item => {
      item.children.map(it => {
        if (it.path === vm.$router.currentRoute.path) {
          vm.selectedKeys = [it.name]
        }
      })
    })
    let agreeVal = parseInt(localStorage.getItem('isAgree'))
    this.isShowAgreement = agreeVal === 0 ? true : false
    // this.$store.dispatch('GetInfo').then(res => {
    //   if (res.code === 0) {
    //     this.$store.dispatch('getAgency', res.data.company.companyCode)
    //     vm.$store.dispatch('getUsername', res.data.user.name).then(res => {})
    //     vm.dialogVisible = res.data.isPasswordExpire
    //   }
    // })
  },
  methods: {
    handlerOffline() {
      // alert(this.$t('basicLayout.netException.text'))
      // this.$message.error('网络异常,请检查网络', 3)
      return
    },
    handlerOnline() {
      // alert(this.$t('basicLayout.netConnect.text'))
      // this.$message.success('网络已连接', 3)
      return
    },
    onContentClick() {
      // 点击content时，子菜单pop消失
      this.popDisplay = false
    },
    updatePwd() {
      this.dialogVisible = false
      this.$router.push('/changepassword')
    },
    toRoute(route, title, event) {
      this.$router.push(route.split(':')[0])
    },
    openSubMenu(title, name, event) {
      if (
        this.menus.filter(item => item.name === name)[0].children.filter(item => item.meta).length > 1 ||
        !['工作台', '总览', 'Creator管理', '环境', '数据管理', 'Insight', 'Creator Management', 'Creator'].includes(this.menuSubItems[0].menuName)
      ) {
        return
      }
      this.anglePosition = event.currentTarget.offsetTop
      this.menuSubItems = this.menus.filter(item => item.name === name)[0].children
      // 显示side2
      this.toRoute(this.menuSubItems[0].path, this.menuSubItems[0].meta.title, null, title)
      localStorage.setItem('anglePosition', this.anglePosition)
    },
    hoverMenu(title, name, event) {
      this.anglePosition = event.currentTarget.offsetTop
      this.menuSubItems = this.menus.filter(item => item.name === name)[0].children.filter(item => (item.meta && !item.meta.isNotShowMenu ? item.meta : null))
      // 当子菜单只有一个时，不显示子菜单
      if (
        this.menuSubItems.length === 1 &&
        ['工作台', '总览', 'Creator管理', '环境', '数据管理', 'Insight', 'Creator Management', 'Creator'].includes(this.menuSubItems[0].menuName)
      ) {
        this.popDisplay = false
      } else {
        this.popDisplay = true
      }
    },
    onSelect(info) {
      this.selectedKeys = [info.key]
    },
    getTree(ary) {
      return ary.map(route => {
        if (route.JSON) {
          if (route.menuName) {
            route.JSON.meta.title = route.menuName
          }
          route = Object.assign(route, route.JSON)
          delete route.JSON
        }
        if (route.json) {
          if (route.menuName) {
            route.json.meta.title = route.menuName
          }
          route = Object.assign(route, route.json)
          delete route.json
        }
        if (route.children) this.getTree(route.children)
        return route
      })
    }
  }
}
</script>

<style lang="less">
// @import url('../components/global.less');
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.pop-fade-enter-active {
  animation: fade-in 0.1s;
}
.pop-fade-leave-active {
  animation: fade-in 0.1s reverse;
}
@keyframes fade-in {
  0% {
    width: 0px;
  }
  50% {
    width: 93px;
  }
  100% {
    width: 186px;
  }
}

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.ant-layout-header {
  height: 68px !important;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}
.ant-layout-sider {
  width: 94px;
  height: 968px;
  background: rgba(32, 43, 79, 1);
  top: -68px;
}
.ant-layout-content {
  position: relative;
  width: 1720px;
  height: 920px;
  background: rgba(236, 238, 240, 1);
  top: -990px;
  left: 200px;
}
.header-title {
  position: relative;
  width: 60px;
  height: 28px;
  top: 7px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(110, 119, 161, 1);
  line-height: 28px;
}
.header-title-image {
  position: relative;
  left: -12px;
}
.side2 {
  height: 969px;
  width: 14%;
  background-color: #ffffff;
  position: relative;
  border-right: 2px solid #ddd;
}
.side2-title {
  position: relative;
  left: 10%;
  top: 20px;
  width: 80px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 700;
  color: rgba(32, 43, 79, 1);
  line-height: 28px;
}
.side2-items {
  margin: 5px !important;
  background-color: transparent;
}
.header-right {
  position: fixed;
  right: 55px;
  top: 7px;
  display: inline-block;
}
.header-user-icon {
  margin-right: 10px;
}
.my-menu-item {
  width: 200px;
  height: 40px;
  margin: 30px 30px 30px 0px;
  padding: 10px 10px 10px 0px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 550;
  color: rgba(110, 119, 161, 1);
  line-height: 20px;
  text-align: left;
}
.my-menu-item:hover {
  color: rgb(31, 119, 243);
}
.popMenu {
  z-index: 1050;
  left: 99px;
  width: 186px;
  box-shadow: 0px 0px 5px 0px rgba(0, 21, 41, 0.3);
  border-radius: 8px;
  background: #fff;
  border: 1px solid transparent;
}
.popMenu:after,
.popMenu:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  right: 100%;
  position: absolute;
  width: 0;
}
.popMenu::before {
  top: 40%;
  border-width: 6px;
  border-right-color: #fff;
}
</style>
