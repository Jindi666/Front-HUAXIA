<template>
  <div class="cont">
    <div class="sec-title" />
    <a-row class="main">
      <div class="block">
        <div class="content">
          <i>{{ summary.flowCount }}</i>
          <span>{{ $t('dashboard.totalFlow') }}</span>
        </div>
      </div>
      <div class="block">
        <div class="content">
          <i>{{ summary.userCount }}</i>
          <span>{{ $t('dashboard.userCount') }}</span>
        </div>
      </div>
      <div class="block">
        <div class="content">
          <i>{{ summary.taskCount }}</i>
          <span>{{ $t('dashboard.taskRunTime') }}</span>
        </div>
      </div>
      <div class="block">
        <div class="content">
          <i>{{ summary.workerCount }}</i>
          <span>{{ $t('dashboard.workerCount') }}</span>
        </div>
      </div>
      <div class="block">
        <div class="content">
          <i>{{ summary.scheduleCount }}</i>
          <span>{{ $t('dashboard.planNumber') }}</span>
        </div>
      </div>
    </a-row>
    <div></div>
    <div class="header">
      <div class="left">
        <div class="title">
          {{ $t('dashboard.toDayCost') }}
        </div>
        <div class="detail">
          <div>
            人工时间累积： <strong> {{ toDay.dashboardCost.laborTime }} </strong> 小时
          </div>
          <div>
            Worker总工作时间：<strong> {{ toDay.dashboardCost.workerTime }} </strong>小时
          </div>
          <div>
            效率提升倍数：<strong> {{ toDay.dashboardCost.efficiency }} </strong> 倍
          </div>
          <div>
            节约人工时间：<strong> {{ toDay.dashboardCost.economizeTime }} </strong> 小时
          </div>
        </div>
      </div>

      <div class="right">
        <div class="title">
          {{ $t('dashboard.toDayTask') }}
        </div>
        <div class="detail">
          <div>
            执行成功： <strong> {{ toDay.dashboardTask.taskSuccess }} </strong>
          </div>
          <div>
            执行失败：<strong style="color:red"> {{ toDay.dashboardTask.taskFail }} </strong>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="title">
          {{ $t('dashboard.toDayWorkerOnline') }}
        </div>
        <div class="detail">
          <div>
            人机交互（在线/离线）：
            <strong> {{ toDay.dashboardWorkerOnline.someoneWorkerOnlie }} </strong>/
            <strong style="color:red">
              {{ toDay.dashboardWorkerOnline.someoneWorkerOffline }}
            </strong>
          </div>
          <div>
            无人值守（在线/离线）：
            <strong> {{ toDay.dashboardWorkerOnline.unattendedWorkerOnlie }} </strong>/
            <strong style="color:red">
              {{ toDay.dashboardWorkerOnline.unattendedWorkerOffline }}
            </strong>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="left">
        <div class="title">
          {{ $t('dashboard.toDaySchedule') }}
        </div>
        <div class="nextDetail">
          <a-table rowKey="id" :columns="scheduleColumns" :dataSource="toDay.dashboardSchedules" :pagination="false" :scroll="{ y: '100%' }"></a-table>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ $t('dashboard.toDayFlow') }}
        </div>
        <div class="nextDetail">
          <a-table rowKey="id" :columns="flowColumns" :dataSource="toDay.dashboardFlows" :pagination="false" :scroll="{ y: '100%' }"></a-table>
        </div>
      </div>
      <div class="right">
        <div class="title">
          {{ $t('dashboard.toDayWorkerRun') }}
        </div>
        <div class="nextDetail">
          <a-table rowKey="id" :columns="workerColumns" :dataSource="toDay.dashboardWorkerRuns" :pagination="false" :scroll="{ y: '100%' }"></a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardApi from '@/api/dashboard'
import { showTime, showTaskState, showTaskResult, parseTime } from '@/utils'

// import FlowChart from './charts/FlowChart'

const scheduleColumns = [
  {
    title: '计划名称',
    dataIndex: 'name',
    key: 'name',
    align: 'left',
    width: '238px'
  },
  {
    title: '计划说明',
    dataIndex: 'description',
    key: 'description',
    align: 'left'
  }
]

const flowColumns = [
  {
    title: '流程名称',
    dataIndex: 'flow.flowName',
    key: 'flow.flowName',
    align: 'left',
    width: '368px'
  },
  {
    title: '任务数',
    dataIndex: 'taskCount',
    key: 'taskCount',
    align: 'left'
  }
]

const workerColumns = [
  {
    title: '机器人',
    dataIndex: 'worker.name',
    key: 'worker.name',
    align: 'left',
    width: '368px'
  },
  {
    title: '任务数',
    dataIndex: 'taskCount',
    key: 'taskCount',
    align: 'left'
  }
]

const flowOptions = {
  title: {
    text: '世界人口总量',
    subtext: '数据来自网络'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['2011年', '2012年']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
  },
  series: [
    {
      name: '2011年',
      type: 'bar',
      data: [18203, 23489, 29034, 104970, 131744, 630230]
    },
    {
      name: '2012年',
      type: 'bar',
      data: [19325, 23438, 31000, 121594, 134141, 681807]
    }
  ]
}

export default {
  name: 'Workplace',
  components: {},
  filters: {
    showTime,
    showTaskResult,
    showTaskState,
    parseTime
  },
  data() {
    return {
      summary: {
        userCount: 0,
        flowCount: 0,
        taskCount: 0,
        workerCount: 0,
        scheduleCount: 0
      },
      toDay: {
        dashboardCost: {
          laborTime: 0,
          workerTime: 0,
          efficiency: 0,
          economizeTime: 0
        },
        dashboardSchedules: [],
        dashboardFlows: [],
        dashboardWorkerRuns: [],
        dashboardTask: {
          taskSuccess: 0,
          taskFail: 0
        },
        dashboardWorkerOnline: {
          someoneWorkerOnlie: 0,
          someoneWorkerOffline: 0,
          unattendedWorkerOnlie: 0,
          unattendedWorkerOffline: 0
        }
      },
      headerFlag: false,
      scheduleColumns,
      flowColumns,
      workerColumns,
      flowOptions
    }
  },
  created: function() {
    this.loadSummary()
    this.loadToDay()
  },
  methods: {
    loadSummary() {
      dashboardApi.querySummary().then(response => {
        if (response.code === 0) {
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
          console.log(this.toDay)
        } else {
          this.$message.error(response.message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  /*初始状态 透明度为0*/
  40% {
    opacity: 0;
  }
  /*过渡状态 透明度为0*/
  100% {
    opacity: 1;
  }
  /*结束状态 透明度为1*/
}

@-webkit-keyframes fade-in {
  /*针对webkit内核*/
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.table-opbar {
  text-align: right;
  padding: 15px 0 0 0;
}

.table th {
  font-weight: 600;
  padding: 6px 3px;
}

.dash-blocks {
  display: flex;
  justify-content: space-between;

  .dash-item {
    width: 24%;
    height: 308px;
    /*height: 100px;*/
    .item-cont {
      padding: 24px 0 0 0;
      height: 122px;
      background: white;
      margin-top: 15px;
      box-shadow: 0 0 3px 3px #ececec;
      transition: all 600ms;

      div.more {
        display: none;
        /*transition: opacity 600ms;*/
        /*animation: fade-in; !*动画名称*!*/
        /*animation-duration: 1.5s; !*动画持续时间*!*/
        /*-webkit-animation: fade-in 1.5s; !*针对webkit内核*!*/
      }

      &:hover {
        box-shadow: 0 0 3px 3px cornflowerblue;

        div.more {
          display: block;
          position: absolute;
          width: 100%;
          height: 32px;
          line-height: 24px;
          bottom: 0px;
          left: 0;
          right: 0;
          background: #fafafa;
          opacity: 0.89;

          span {
            font-size: 12px;
            padding: 0;
            margin: 0;
          }
        }
      }

      .item-title {
        /*font-weight: bold;*/
        text-align: center;
        padding: 5px;
        /*border-bottom: 1px solid #ececec;*/
        color: #707070;
      }

      .item-kpi {
        text-align: center;
        font-size: 24px;
        padding: 10px 0 0 0;
        position: relative;
        height: 80px;
      }

      .echarts {
        height: 200px;
      }

      .item-chart {
        padding-top: 30px;
      }
    }

    span.splitter {
      font-weight: normal;
      color: darkgray;
    }

    .item-cont:first-child {
      margin-top: 0;
    }

    .item-cont2 {
      height: 283px;
    }
  }
}

@media (max-width: 960px) {
  .dash-blocks {
    flex-wrap: wrap;

    .dash-item {
      width: 48%;
      margin-bottom: 15px;
    }
  }
}

.task-type {
  line-height: 20px;
  display: inline;

  & > div {
    border: 1px solid #ddd;
    margin-left: 1em;
    text-align: center;
    display: inline-block;
    min-width: 60px;
    border-radius: 3px;

    &.active {
      background: #4f87c5;

      & > a {
        color: #fff3cd;
      }
    }

    & > a {
      display: block;
      margin: 0;
      line-height: 28px;

      &:hover {
        background: #4f87c5;
        color: #fff;
      }
    }
  }
}

.small0 {
  font-size: 0.85rem;
}

.text-danger {
  color: #dc3545 !important;
}
</style>
<style scoped lang="less">
* {
  box-sizing: border-box;
}

b,
i,
em {
  font-style: normal;
  font-weight: normal;
}

.header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

.left {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
  width: 32%;
}

.title {
  background: rgba(126, 211, 34, 1);
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(113, 189, 29, 1);
  font-size: 15px;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  padding: 9px;
  height: 38px;
}

.detail {
  /*padding: 13px 32px 21px 18px;*/
  padding: 10px 1em;
  height: 194px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  border-radius: 4px;
  overflow-y: auto;

  .detail-item {
    margin: 0;
    padding: 5px 0 0 1em;
    position: relative;

    .detail-date {
      color: gray;
      font-size: 12px;
    }

    .detail-line {
      padding-left: 1em;
      margin: 5px 0 10px;
      color: #777;
    }
  }
}

.green::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(126, 211, 34, 1);
  border-radius: 50%;
  top: 12px;
  left: 0;
}

.red::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 56, 0, 1);
  border-radius: 50%;
  top: 50%;
  margin-top: -2px;
  left: -10px;
}

.right {
  width: 32%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
}

.nextTask {
  height: 39px;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(232, 232, 232, 1);
  padding: 9px 9px 10px;
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
}

.nextDetail {
  height: 365px;
  background: rgba(255, 255, 255, 1);
  border-radius: 0px 0px 4px 4px;
  border: 1px solid rgba(232, 232, 232, 1);
}

.info {
  display: flex;
}

.info .img {
  margin-top: 10px;
  margin-right: 10px;
  width: 40px;
  height: 40px;
}

.info .img img {
  width: 100%;
}

.description {
  display: flex;
  flex-direction: column;
  height: 40px;
  justify-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;

  p {
    height: 16px;
    font-size: 12px;
    color: rgba(0, 0, 0, 1);
    /*line-height: 1.1;*/
    padding: 0;
    margin: 0;
  }

  span {
    height: 12px;
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    line-height: 12px;
  }
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: -25px;
  margin-bottom: 30px;
}

.block {
  flex: 1;
  margin-right: 25px;
  height: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(189, 189, 189, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(232, 232, 232, 1);
  text-align: center;
  position: relative;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.content i {
  font-size: 40px;
  font-family: 'Condensed-b';
  font-weight: bold;
  color: rgba(32, 43, 79, 1);
  line-height: 48px;
  margin-bottom: 8px;
  display: inline-block;
}

.content span {
  font-size: 12px;
  color: rgba(32, 43, 79, 1);
  line-height: 16px;
}

.runTime {
  font-size: 20px;
  font-family: 'Condensed-b';
  font-weight: bold;
  line-height: 24px;
  margin-bottom: 5px;
}

.runTime b {
  font-size: 20px;
  font-family: Condensed-b;
  font-weight: bold;
  color: rgba(126, 211, 34, 1);
  line-height: 24px;
}

.runTime em {
  color: #ff3800;
  font-size: 20px;
  font-family: Condensed-b;
  font-weight: bold;
  line-height: 24px;
}

.default-flow-icon {
  width: 40px;
  height: 40px;
  background: url() no-repeat center;
  background-size: cover;
  margin-right: 10px;
}
</style>
