<template>
  <div id="centerLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span>
          <icon name="chart-bar" class="text-icon" color="#bf0008"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">流程数量TOP6</span>
          <!-- <dv-decoration-3 class="dv-dec-3" :color="['#999', '#fff']" /> -->
        </div>
      </div>
      <div class="d-flex jc-center">
        <Chart :cdata="config" />
      </div>
    </div>
  </div>
</template>

<script>
import Chart from '@/components/echart/pie/chart.vue'
import Api from '@/api/datav.js'
export default {
  components: {
    Chart
  },
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
    this.getFlowtop6()
    this.interval = window.setInterval(function() {
      that.getFlowtop6()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getFlowtop6() {
      Api.getFlowtop6({}).then(response => {
        this.config.seriesData = []
        this.config.xData = []
        if (response.code == 200) {
          const tableOptions = this.getScrollTableOptions()
          response.data.forEach(item => {
            tableOptions.xData.push(item.deptName)
            tableOptions.seriesData.push({
              value: item.flowCount,
              name: item.deptName
            })
          })
          this.config = tableOptions
          console.log(this.config)
        }
      })
    },
    getScrollTableOptions() {
      return {
        xData: [],
        seriesData: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$box-width: 450px;
$box-height: 324px;

#centerLeft1 {
  padding: 10px;
  height: $box-height;
  width: $box-width;
  border-radius: 10px;
  .bg-color-black {
    height: $box-height - 30px;
    border-radius: 10px;
  }
  .text {
    color: #bf0008;
  }
  .dv-dec-3 {
    position: relative;
    width: 100px;
    height: 20px;
    top: -3px;
  }

  .bottom-data {
    .item-box {
      & > div {
        padding-right: 5px;
      }
      font-size: 14px;
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      .dv-digital-flop {
        width: 120px;
        height: 30px;
      }
      // 金币
      .coin {
        position: relative;
        top: 6px;
        font-size: 20px;
        color: #bf0008;
      }
      .colorYellow {
        color: #000;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
