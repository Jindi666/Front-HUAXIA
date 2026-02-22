<template>
  <div class="task-board">
    <div class="ts-header">
      <a-row>
        <a-col :span="18" style="padding-left: 12px;">
          <!-- <a-icon type="check-circle" /> -->
          {{ $t('dashboard.systemWorkNormal.text') }}
        </a-col>
        <a-col :span="6" style="text-align: right;padding-right: 12px;">
          <span v-action:dashboard-view @click="onClickMore" style="cursor:pointer;">{{ $t('dashboard.more.text') }} ></span>
        </a-col>
      </a-row>
    </div>
    <div class="ts-content">
      <table v-if="taskList.length">
        <tr v-for="task in taskList" v-bind:key="'taskst-' + task.id">
          <td :title="task.stopTime | parseTime2" style="text-align: left;max-width: 80px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{ task.stopTime | parseTime2 }}</td>
          <td style="text-align: left; padding-right: 10px" :title="task.workerName">
            <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 150px;">{{ task.workerName }}</div>
          </td>
          <td style="text-align: left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;max-width: 100px;" :title="task.flowName">
            {{ task.flowName }}
          </td>
          <td style="text-align: right; width: 50px;white-space: nowrap">
            <span v-if="task.result === 'success'" class="success" style="color:#37B184;">{{ $t('dashboard.runSuccess.text') }}</span>
            <span v-else class="failed" style="color:#FF5656;">{{ $t('dashboard.runFail.text') }}</span>
          </td>
          <!-- <td style="text-align:right;">
            >
          </td> -->
        </tr>
      </table>

      <table v-else>
        <tr>
          <td>{{ $t('public.noData.text') }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'TaskStatus',
  filters: {
    parseTime2: function(val) {
      return val ? parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}') : '-'
    },
    resultFormatter: function(val) {
      if (val === 'success') {
        return '<span class="success">' + this.$t('dashboard.runSuccess.text') + '</span>'
      }
    }
  },
  props: {
    tasks: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      taskList: []
    }
  },
  created() {
    this.taskList = this.tasks.slice(0, 2)
    console.log(this.taskList)
  },
  methods: {
    onClickMore() {
      this.$router.push({ path: '/task/taskManagementDetail', query: { status: 'more' } })
    }
  },
  watch: {
    tasks: function(val) {
      this.taskList = val
    }
  }
}
</script>

<style scoped lang="less">
.task-board {
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);

  .ts-header {
    height: 54px;
    font-size: 16px;
    // background: #7ed322;
    background: #6e77a1;
    border-radius: 8px 8px 0 0;
    color: white;
    line-height: 54px;
  }

  .ts-content {
    color: #000;
    padding: 9px 22px;
    height: 112px;
    background: white;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    line-height: 30px;

    table {
      font-size: 14px;
      width: 100%;

      td {
        padding: 8px 0;

        span.success {
          color: #7ed322;
        }

        span.failed {
          color: #ff3800;
        }
      }
    }
  }
}
</style>
