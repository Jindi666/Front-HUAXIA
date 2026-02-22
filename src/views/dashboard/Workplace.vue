<template>
  <div class="dash-container" id="workplace" v-action:dashboard-view>
    <div class="section">
      <a-row>
        <a-col :span="12">
          <span class="section-title">{{ $t('dashboard.datav.text') }}</span>
        </a-col>
        <a-col :span="12" style="text-align: right">
          <a-button v-action:dashboard-datav type="primary" size="small" @click="jumpTo" style="padding: 0 18px 0 16px">
            <i class="uibot ub-ub-datav icon-btn-datav"></i>
            <span class="icon-btn-datav-content" ref="datavTitle">{{ $t('dashboard.taskCon.text') }}</span>
          </a-button>
        </a-col>
      </a-row>
    </div>

    <div class="summary-row">
      <div class="item" v-if="config.task.taskCount">
        <div>
          <strong>
            <countTo :startVal="lastSummary.taskCount" :endVal="summary.taskCount" :duration="1500"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.time.text', summary.taskCount > 1 ? 2 : 1) }}</span>
        </div>
        <div>
          <span class="tip">
            <span class="icon icon-1" />
            {{ $t('dashboard.taskCountSummary.text') }}
          </span>
        </div>
      </div>
      <div class="item" v-if="config.task.success">
        <div>
          <strong>
            <countTo :startVal="lastSummary.successRate" :endVal="summary.successRate" :duration="1500" :decimals="2"></countTo>
            <!--            <span>%</span>-->
          </strong>
          <span class="item-unit">%</span>
        </div>
        <div>
          <span class="tip">
            <span class="icon icon-3" />
            {{ $t('dashboard.runSuccessRate.text') }}
          </span>
        </div>
      </div>
      <div class="item" v-if="config.task.time">
        <div>
          <strong>
            <countTo :startVal="lastSummary.workHours" :endVal="summary.workHours" :duration="1500" :decimals="1"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.manday.text', summary.workHours > 1 ? 2 : 1) }}</span>
        </div>
        <div>
          <span class="tip">
            <span class="icon icon-2" />
            {{ $t('dashboard.workHours.text') }}
          </span>
        </div>
      </div>
      <div class="item" v-if="config.task.price && isShowPrice">
        <div>
          <strong>
            <countTo :startVal="lastSummary.saveCost" :endVal="summary.saveCost" :duration="1500" :decimals="2"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.cnYuan.text', summary.saveCost > 1 ? 2 : 1) }}</span>
        </div>
        <div>
          <span class="tip">
            <span class="icon icon-4" />
            {{ $t('dashboard.saveCostSummary.text') }}
          </span>
        </div>
      </div>
      <div class="item" v-if="config.task.areaCount">
        <div>
          <strong>
            <countTo :startVal="lastSummary.region" :endVal="summary.region" :duration="1500"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.one.text', summary.region > 1 ? 2 : 1) }}</span>
        </div>
        <div>
          <span class="tip">
            <span class="icon icon-5" />
            {{ $t('dashboard.regionSummary.text') }}
          </span>
        </div>
      </div>
    </div>

    <div class="section">
      <span class="section-title">{{ $t('dashboard.todayTask.text') }}</span>
    </div>

    <div class="second-row">
      <a-row :gutter="24">
        <a-col :span="15" v-if="config.today.today">
          <task-board :task-total="todayTasks.taskSuccess" :task-running="todayTasks.taskExecute" :task-todo="todayTasks.taskWait" :saved-hours="todayTasks.workHours" />
        </a-col>
        <a-col :span="9" v-if="config.today.systemStatus">
          <task-status :tasks="todayTasks.tasks" />
        </a-col>
      </a-row>
    </div>

    <div class="section mt-24">
      <a-row>
        <a-col :span="12">
          <span class="section-title">{{ $t('dashboard.businessAnalyze.text') }}</span>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
    </div>

    <div class="mt-24">
      <a-row :gutter="24">
        <a-col :span="16">
          <div class="chart-container" v-if="config.biz.map">
            <geo-map-bar :isLoading="isLoading" :mapCode="config.biz.mapCode" />
          </div>
        </a-col>
        <a-col :span="16" v-if="config.biz.successRate && !config.biz.map">
          <div class="chart-container">
            <succeed-rate />
          </div>
        </a-col>
        <a-col :span="8" v-if="config.biz.failed">
          <div class="chart-container">
            <failed-pie />
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="mt-24" v-if="config.biz.map">
      <a-row :gutter="24">
        <a-col :span="24" v-if="config.biz.successRate">
          <div class="chart-container">
            <succeed-rate />
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="mt-24">
      <a-row :gutter="24">
        <a-col :span="12" v-if="config.biz.flowCount">
          <div class="chart-container">
            <most-used-flow />
          </div>
        </a-col>
        <a-col :span="12" v-if="config.biz.workerRate">
          <div class="chart-container">
            <worker-usage />
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="mt-24 mb-24">
      <a-row :gutter="24">
        <a-col :span="8" v-if="config.biz.workerOnlineStatueByDep">
          <div class="chart-container">
            <worker-by-dep />
          </div>
        </a-col>
        <a-col :span="8" v-if="config.biz.workerOnlineStatueByType">
          <div class="chart-container">
            <worker-by-type />
          </div>
        </a-col>
        <a-col :span="8" v-if="config.biz.bizType">
          <div class="chart-container">
            <business-type />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
import countTo from 'vue-count-to'
import TaskBoard from './components/TaskBoard'
import TaskStatus from './components/TaskStatus'
import dashboardApi from '@/api/dashboard'

import FailedPie from './charts/FailReason'
import WorkerByDep from './charts/WorkerDepartment'
import WorkerByType from './charts/WorkerType'
import SucceedRate from './charts/SucceedRate'
import MostUsedFlow from './charts/MostUsedFlow'
import WorkerUsage from './charts/WorkerUsage'
import BusinessType from './charts/WorkerBussiness'
import { datav } from '@/core/icons'
import sysConfig from '../../api/sysConfig'
import GeoMapBar from './charts/GeoMapBar'
import { LangEnum } from '@/locales/index'

export default {
  name: 'Dashboard',
  components: {
    SucceedRate,
    ACol,
    TaskBoard,
    TaskStatus,
    GeoMapBar,
    countTo,
    FailedPie,
    MostUsedFlow,
    WorkerUsage,
    WorkerByDep,
    WorkerByType,
    BusinessType
  },
  data() {
    return {
      isShowPrice: true,
      isLoading: true,
      config: {
        datav: false,
        task: {
          taskCount: false,
          time: false,
          success: false,
          price: false,
          areaCount: false
        },
        today: {
          today: false,
          systemStatus: false
        },
        biz: {
          map: false,
          mapCode: '100000',
          failed: false,
          successRate: false,
          flowCount: false,
          workerRate: false,
          workerOnlineStatueByDep: false,
          workerOnlineStatueByType: false,
          bizType: false
        }
      },
      summary: {
        taskCount: 0,
        workHours: 0,
        successRate: 0,
        saveCost: 0,
        region: 0
      },
      lastSummary: {
        taskCount: 0,
        workHours: 0,
        successRate: 0,
        saveCost: 0,
        region: 0
      },
      todayTasks: {
        taskSuccess: 0,
        taskExecute: 0,
        taskWait: 0,
        workHours: 0,
        tasks: []
      }
    }
  },
  created() {
    this.loadSummary()
    this.loadToDay()
    var lang = localStorage.getItem('lang')
    if (lang == LangEnum['zh-CN']) {
      this.isShowPrice = true
    } else {
      this.isShowPrice = false
    }

    return this.loadConfig()
  },
  methods: {
    loadConfig() {
      let that = this
      return sysConfig.getKeyvalue({ key: 'DashboardSettings' }).then(res => {
        if (res.data) {
          that.config = JSON.parse(res.data.value)
          that.config.biz.mapCode = that.config.biz.mapCode.toString()
          that.isLoading = false
        }
      })
    },
    onButton() {
      let datav = this.$refs.datav
      let datavTitle = this.$refs.datavTitle
      this.$nextTick(() => {
        datav.innerHTML = datav.innerHTML.replace('FFFFFF', '6E77A1')
        datavTitle.style.color = '#6E77A1'
      })
    },
    leaveButton() {
      let datav = this.$refs.datav
      let datavTitle = this.$refs.datavTitle
      this.$nextTick(() => {
        datav.innerHTML = datav.innerHTML.replace('6E77A1', 'FFFFFF')
        datavTitle.style.color = '#FFFFFF'
      })
    },
    jumpTo() {
      // this.$router.push('/datav')
      let routeUrl = this.$router.resolve({
        // 二选一,path需加"/"
        // path: '/datav'
        name: 'datav'
      })
      window.open(routeUrl.href, '_blank')
    },
    loadSummary() {
      dashboardApi.querySummary().then(response => {
        if (response.code === 0) {
          const { taskCount, workHours, successRate, saveCost, region } = this.summary
          this.lastSummary = { taskCount, workHours, successRate, saveCost, region }
          this.summary = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    },
    loadToDay() {
      dashboardApi.queryToDay().then(response => {
        if (response.code === 0) {
          this.toDay = response.data
          // console.log(this.toDay)
          this.todayTasks = response.data
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.dash-container {
  padding: 24px 24px;
  height: calc(100vh - 64px);
  overflow-y: scroll;
}
.icon-btn-datav {
  display: inline-block;
  // padding-top: 4px;
  position: relative;
  width: 16px;
  margin-right: 8px;
  // height: 24px;
  // background: url(../../assets/dash/datav.svg) no-repeat center;
  vertical-align: middle;
}
span.icon-btn-datav-content {
  display: inline-block;
  line-height: 24px;
  height: 24px;
  margin-left: 0.5em;
  margin-top: 0;
  vertical-align: middle;
}
.mt-24 {
  margin-top: 24px;
}

.ml-12 {
  margin-left: 12px;
}

.section {
  font-size: 20px;
  border-bottom: 1px solid #d9dee2;
  padding-bottom: 6px;

  &-title {
    color: #425b6d;
    font-weight: 500;
  }
}

.summary-row {
  display: flex;
  padding: 26px 0;

  .item {
    flex-grow: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    height: 112px;
    text-align: center;
    padding: 18px 0;
    width: 20%;

    strong {
      font-size: 32px;
      font-family: 'Bahnschrift Condensed';
      font-weight: normal;
      color: #202b4f;
    }

    .item-unit {
      color: #6e77a1;
    }

    .tip {
      display: inline-block;
      padding: 1px 10px;
      color: #6e77a1;
      font-size: 14px;
      background: #eceef0;
      border-radius: 12px;
      position: relative;
      padding-left: 30px;
    }

    span.icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 8px;
      position: absolute;
      top: 3px;
      left: 10px;
    }

    span.icon-1 {
      background: url(/img/dashboard/row1-1.png) no-repeat center center;
    }
    span.icon-2 {
      background: url(/img/dashboard/row1-2.png) no-repeat center center;
    }
    span.icon-3 {
      background: url(/img/dashboard/row1-3.png) no-repeat center center;
    }
    span.icon-4 {
      background: url(/img/dashboard/row1-4.png) no-repeat center center;
    }
    span.icon-5 {
      background: url(/img/dashboard/row1-5.png) no-repeat center center;
    }
  }

  .item + .item {
    margin-left: 24px;
  }
}

.second-row {
  margin-top: 24px;
}

.chart-container {
  background: white;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 24px;

  .chart-title {
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(66, 91, 109, 1);
    line-height: 22px;
  }
}
</style>
