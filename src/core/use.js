import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'
import '../assets/iconfont/iconfont.less'
import '../assets/css/my-antd-menu.css'
import '../assets/css/my-antd-modal.less'
import '../assets/css/my-antd-form.less'
import '../assets/css/my-antd-pagination.css'
import '../assets/css/my-antd-table.less'
import '../assets/css/my-antd-button.css'
import '../assets/css/my-antd-tree.css'
import '../assets/css/my-antd-drawer.less'
import '../assets/css/my-antd-date.less'
import '../assets/css/my-antd-tooltip.less'
import '../assets/css/my-antd-global.less'

// ext library
import VueClipboard from 'vue-clipboard2'
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
// import VCharts from 'v-charts'

// import '@/components/use'
import './directives/action'
import './directives/drag'

VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
