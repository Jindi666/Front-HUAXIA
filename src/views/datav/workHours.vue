<template>
  <div id="wokerHours">
    <div class="down" style="color: brown">
      <div class="ranking bg-color-black">
        <span class="icon">
          <icon name="chart-pie"></icon>
        </span>
        <span class="fs-xl text mx-2">节省工时TOP10</span>
        <dv-scroll-ranking-board class="dv-scr-rank-board mt-1" :config="config" />
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/datav.js'
export default {
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 60000
      }
    }
  },
  data() {
    return {
      interval: null,
      decorationColor: ['#E5999C', '#FFECE8'],
      config: {}
    }
  },
  mounted() {
    const that = this
    this.getSavingWorkHourDep()
    this.interval = window.setInterval(function() {
      that.getSavingWorkHourDep()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getSavingWorkHourDep() {
      Api.getSavingWorkHourDep({}).then(response => {
        this.config.data = []
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.data.push({
              name: item.deptName,
              value: item.savingtime
            })
          })
          this.config = tableOptions
        }
      })
    },
    getScrollTableOptions() {
      return {
        carousel: 'single',
        waitTime: 1000,
        unit: '人/天',
        rowNum: 8,
        data: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#wokerHours {
  $box-height: 360px;
  $box-width: 630px;
  padding: 10px;
  padding-top: 20px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;

  .icon {
    color: #bf0008;
  }

  ::v-deep .dv-scroll-ranking-board {
    color: #000;
    .ranking-info .rank {
      color: #bf0008;
    }

    .ranking-column {
      border-bottom: 2px solid #bf0008;
      .inside-column {
        background-color: #bf0008;
      }
    }

    .row-item {
      height: 42px !important;
    }
  }
  .down {
    // padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 360px;
    justify-content: space-between;

    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 100%;
      .dv-scr-rank-board {
        height: 100%;
      }
    }
  }
}
</style>
