<template>
  <div id="index" ref="appRef">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 class="dv-dec-10" :color="decorationColor" />
          <div class="d-flex jc-center">
            <dv-decoration-8 class="dv-dec-8" :color="decorationColor" />
            <div class="title">
              <img class="img" :src="imgSrc" />
              <span class="title-text">可视化看板</span>
              <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#B71D25', '#E5999C']" />
            </div>
            <dv-decoration-8 class="dv-dec-8" :reverse="true" :color="decorationColor" />
          </div>
          <dv-decoration-10 class="dv-dec-10-s" :color="decorationColor" />
          <div class="editPwd" @click="editClick">
            <a-icon slot="suffixIcon" class="pwd-icon" type="edit" />
            <span class="pwd-text">修改密码</span>
          </div>
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex aside-width">
            <div class="react-left ml-4 react-l-s">
              <span class="react-left"></span>
            </div>
            <div class="react-left ml-3"></div>
          </div>
          <div class="d-flex aside-width">
            <div class="react-right mr-3">
              <!-- <span class="text fw-b">vue-big-screen</span> -->
            </div>
            <div class="react-right mr-4 react-l-s">
              <span class="react-after"></span>
              <span class="text">{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box second">
            <dv-border-box-13 class="left" :color="decorationColor">
              <operation />
            </dv-border-box-13>
            <div class="right">
              <div class="top">
                <div class="left">
                  <div class="top">
                    <card :num="saveWorkHour" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'本月节省工时（小时）'" :icon="require('@/assets/datav/p1.png')" />
                    <card :num="totalFlowCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'本月新增流程数（个）'" :icon="require('@/assets/datav/p2.png')" />
                    <card :num="successTaskCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'本月任务成功数（个）'" :icon="require('@/assets/datav/p3.png')" />
                    <card :num="totalTaskCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'本月任务总数（个）'" :icon="require('@/assets/datav/p4.png')" />
                  </div>
                  <div class="bottom">
                    <dv-border-box-12 class="left" :color="decorationColor">
                      <realTimeTaskMonitoring v-on:detailClick="realTimeTaskClick" />
                    </dv-border-box-12>
                    <dv-border-box-12 class="right" :color="decorationColor">
                      <taskRunStatistics v-on:detailClick="taskRunStatisticsClick" />
                    </dv-border-box-12>
                  </div>
                </div>
                <div class="right">
                  <dv-border-box-13 :color="decorationColor">
                    <robotDistribution />
                  </dv-border-box-13>
                </div>
              </div>
              <div class="bottom">
                <dv-border-box-12 class="second" :color="decorationColor">
                  <failedTask :refreshInterval="refreshInterval" v-on:detailClick="failedTaskClick" />
                </dv-border-box-12>
              </div>
            </div>
            <!-- <div class="center">
              <div class="top">
                <card :num="saveWorkHour" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'本月节省工时（小时）'" :icon="require('@/assets/datav/p1.png')" />
                <card :num="totalFlowCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'流程总数（个）'" :icon="require('@/assets/datav/p2.png')" />
                <card :num="successTaskCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'任务成功数（个）'" :icon="require('@/assets/datav/p3.png')" />
                <card :num="totalTaskCount" :backgroundColor="'#F8F8F8'" :fontColor="'#171D29'" :describe="'任务总数（个）'" :icon="require('@/assets/datav/p4.png')" />
              </div>
              <dv-border-box-12 class="second" :color="decorationColor">
                <failedTask :refreshInterval="refreshInterval" v-on:detailClick="failedTaskClick" />
              </dv-border-box-12>
              <div class="third">
                <dv-border-box-12 class="left" :color="decorationColor">
                  <realTimeTaskMonitoring v-on:detailClick="realTimeTaskClick" />
                </dv-border-box-12>
                <dv-border-box-12 class="right" :color="decorationColor">
                  <taskRunStatistics v-on:detailClick="taskRunStatisticsClick" />
                </dv-border-box-12>
              </div>
            </div>
            <div class="right">
              <dv-border-box-13 class="top" :color="decorationColor">
                <robotDistribution />
              </dv-border-box-13>
            </div> -->
          </div>

          <!-- 第四行数据 -->
          <div class="bottom-dv">
            <dv-border-box-12 :color="decorationColor"> <taskFailureCount2 v-on:detailClick="taskFailureCountClick"/></dv-border-box-12>
            <dv-border-box-12 :color="decorationColor"> <taskFailureReasonStatistics v-on:detailClick="taskFailureReasonStatisticsClick"/></dv-border-box-12>
            <dv-border-box-12 :color="decorationColor"> <taskRunFailureRate /></dv-border-box-12>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import drawMixin from '../utils/drawMixin'
import { formatTime2 } from '../utils/index.js'
import operation from './monitor/operation'
import card from './datav/components/card'
import failedTask from './monitor/failedTask'
import realTimeTaskMonitoring from './monitor/realTimeTaskMonitoring'
import taskRunStatistics from './monitor/taskRunStatistics'
import robotOnlineMonitoring from './monitor/robotOnlineMonitoring'
import taskFailureReasonStatistics from './monitor/taskFailureReasonStatistics'
import taskRunFailureRate from './monitor/taskRunFailureRate'
import robotDistribution from './monitor/robotDistribution'
import taskFailureCount from './monitor/taskFailureCount'
import taskFailureCount2 from './monitor/taskFailureCount2'
import imgSrc from './../assets/logo.png'
import Api from '@/api/monitor.js'

export default {
  mixins: [drawMixin],
  components: {
    operation,
    card,
    failedTask,
    realTimeTaskMonitoring,
    taskRunStatistics,
    robotOnlineMonitoring,
    taskRunFailureRate,
    robotDistribution,
    taskFailureCount,
    taskFailureCount2,
    taskFailureReasonStatistics
  },
  data() {
    return {
      interval: null,
      refreshInterval: 60000,
      totalTaskCount: 0,
      successTaskCount: 0,
      totalFlowCount: 0,
      saveWorkHour: 0,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#E5999C', '#CE3D43'],
      imgSrc
    }
  },

  mounted() {
    const that = this
    let isLogin = this.$cookies.get('isLogin')
    if (isLogin) {
      this.timeFn()
      this.cancelLoading()
      this.getEverydayTop()
      this.interval = window.setInterval(function() {
        that.getEverydayTop()
      }, this.refreshInterval)
    } else {
      this.$router.push({
        name: 'Login'
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timing)
    window.clearInterval(this.interval)
  },
  methods: {
    taskFailureReasonStatisticsClick() {
      // this.$router.push({ name: 'taskFailureReasonStatisticsDetail' })
      let routeUrl = this.$router.resolve({
        name: 'taskFailureReasonStatisticsDetail'
      })
      window.open(routeUrl.href, '_blank')
    },
    taskFailureCountClick() {
      let routeUrl = this.$router.resolve({
        name: 'taskFailureCountDetail'
      })
      window.open(routeUrl.href, '_blank')
    },
    failedTaskClick() {
      // this.$router.push({ name: 'failedTaskDetail' })
      let routeUrl = this.$router.resolve({
        name: 'failedTaskDetail'
      })
      window.open(routeUrl.href, '_blank')
    },
    realTimeTaskClick() {
      // this.$router.push({ name: 'realTimeTaskDetail' })
      let routeUrl = this.$router.resolve({
        name: 'realTimeTaskDetail'
      })
      window.open(routeUrl.href, '_blank')
    },
    taskRunStatisticsClick() {
      // this.$router.push({ name: 'taskRunStatisticsDetail' })
      let routeUrl = this.$router.resolve({
        name: 'taskRunStatisticsDetail'
      })
      window.open(routeUrl.href, '_blank')
    },
    getEverydayTop() {
      Api.getEverydayTop({}).then(response => {
        if (response.code == 200) {
          this.totalTaskCount = response.data.totalTaskCount
          this.successTaskCount = response.data.successTaskCount
          this.totalFlowCount = response.data.totalFlowCount
          this.saveWorkHour = response.data.saveWorkHour
        }
      })
    },
    editClick() {
      this.$router.push({
        name: 'Login',
        query: { type: 1 }
      })
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime2(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime2(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss';

.editPwd {
  width: 100px;
  // height: 20px;
  position: absolute;
  right: 10px;
  top: 34px;

  .pwd-icon {
    color: #bf0008 !important;
    // margin-top: 10px;
  }

  .pwd-text {
    margin-top: -10px;
    padding-left: 5px;
    font-size: 14px;
  }
}
.second {
  .left {
    width: 420px;
    height: 596px;
  }

  .right {
    width: 1440px;
    height: 596px;
    padding: 10px;
    .top {
      width: 1460px;
      height: 399px;
      display: flex;

      .left {
        width: 1032px;
        height: 399px;

        .top {
          width: 100%;
          height: 96px;
          padding: 0 4px;
          display: flex;
          gap: 16px;
        }

        .bottom {
          width: 100%;
          height: 270px;
          display: flex;
          margin-top: 20px;

          .left {
            height: 100%;
            flex: 1;
            margin-right: 16px;
          }

          .right {
            height: 100%;
            flex: 1;
          }
        }
      }

      .right {
        width: 440px;
        height: 399px;
      }
    }

    .bottom {
      width: 1460px;
      height: 187px;
    }
  }

  //   .center {
  //     width: 1052px;
  //     height: 576px;
  //     padding: 10px;

  //     .top {
  //       width: 100%;
  //       height: 96px;
  //       padding: 0 4px;
  //       display: flex;
  //       gap: 16px;
  //     }

  //     .second {
  //       width: 100%;
  //       height: 197px;
  //       margin-top: 10px;
  //     }

  //     .third {
  //       width: 100%;
  //       height: 249px;
  //       display: flex;
  //       margin-top: 10px;

  //       .left {
  //         height: 100%;
  //         flex: 1;
  //       }

  //       .right {
  //         height: 100%;
  //         flex: 1;
  //       }
  //     }
  //   }

  //   .right {
  //     width: 420px;
  //     height: 576px;

  //     .top {
  //       height: 100%;
  //     }
  //     .bottom {
  //       height: 286px;
  //     }
  //   }
}

.bottom-dv {
  display: flex;
  height: 316px;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
}
</style>
