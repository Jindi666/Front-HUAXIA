<template>
  <div class="task-board">
    <div class="tb-header">
      <div class="item">{{ $t('dashboard.dealCompleted.text') }}</div>
      <div class="item">{{ $t('dashboard.dealing.text') }}</div>
      <div class="item">{{ $t('dashboard.dealWait.text') }}</div>
      <div class="item">{{ $t('dashboard.workerHours2.text') }}</div>
    </div>
    <div class="tb-content">
      <div class="item" @click="clickTaskTotal('success')">
        <div>
          <span class="icon icon-1" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskTotal" :duration="1500"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.one.text', taskTotal > 1 ? 2 : 1) }}</span>
        </div>
      </div>
      <div class="item" @click="clickTaskTotal('running')">
        <div>
          <span class="icon icon-2" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskRunning" :duration="1500"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.one.text', taskRunning > 1 ? 2 : 1) }}</span>
        </div>
      </div>
      <div class="item" @click="clickTaskTotal('deploying')">
        <div>
          <span class="icon icon-3" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskTodo" :duration="1500"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.one.text', taskTodo > 1 ? 2 : 1) }}</span>
        </div>
      </div>
      <div class="item" @click="clickTaskTotal('saving')">
        <div>
          <span class="icon icon-4" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="savedHours" :duration="1500" :decimals="1"></countTo>
          </strong>
          <span class="item-unit">{{ $tc('public.manday.text', savedHours > 1 ? 2 : 1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'TaskBoard',
  components: { CountTo },
  props: {
    taskTotal: {
      type: Number,
      default() {
        return 0
      },
    },
    taskRunning: {
      type: Number,
      default() {
        return 0
      },
    },
    taskTodo: {
      type: Number,
      default() {
        return 0
      },
    },
    savedHours: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  methods: {
    clickTaskTotal(params) {
      console.log('params---', params)
      this.jumpTaskDetail(params)
    },
    jumpTaskDetail(params) {
      this.$router.push({ path: '/task/taskManagementDetail', query: { status: params } })
    },
  },
}
</script>

<style scoped lang="less">
.task-board {
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);

  .tb-header {
    display: flex;
    /*width:674px;*/
    height: 54px;
    background: #6e77a1;
    border-radius: 8px 8px 0px 0px;
    color: white;

    .item {
      flex-grow: 1;
      width: 25%;
      font-size: 16px;
      text-align: center;
      height: 18px;
      margin-top: auto;
      margin-bottom: auto;
      line-height: 18px;
    }

    .item + .item {
      border-left: 1px solid white;
    }
  }

  .tb-content {
    display: flex;
    border-radius: 0 0 8px 8px;
    background: white;
    height: 112px;

    .item {
      flex-grow: 1;
      text-align: center;
      padding-top: 12px;
      width: 25%;
      cursor: pointer;
      strong {
        font-family: 'Bahnschrift Condensed';
        font-weight: 300;
        font-size: 40px;
        font-weight: normal;
        color: #202b4f;
      }
    }

    .item + .item {
      border-left: solid 1px #d9dee2;
    }
  }

  span.icon {
    display: block;
    width: 26px;
    height: 26px;
    margin-left: auto;
    margin-right: auto;
  }

  span.icon-1 {
    background: url(/img/dashboard/home-today-1.png) no-repeat center center;
  }

  span.icon-2 {
    background: url(/img/dashboard/home-today-2.png) no-repeat center center;
  }

  span.icon-3 {
    background: url(/img/dashboard/home-today-3.png) no-repeat center center;
  }

  span.icon-4 {
    background: url(/img/dashboard/home-today-4.png) no-repeat center center;
  }
}

.item-unit {
  color: #6e77a1;
}
// .task-board:hover {
//   box-shadow: 0px 4px 12px 0px rgba(32, 43, 79, 0.3);
// }
</style>
