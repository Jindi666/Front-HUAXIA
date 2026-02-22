<template>
  <div id="center">
    <div class="up">
      <div class="count" style="width: 60%">
        <div class="bg-color-black item" v-for="item in titleItem" :key="item.title">
          <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
          <div>
            <dv-digital-flop class="dv-dig-flop ml-1 mt-2 pl-3" :config="item.number" />
          </div>
        </div>
      </div>

      <div class="water">
        <dv-water-level-pond class="dv-wa-le-po" :config="water" />
      </div>
    </div>

    <div class="down">
      <div>
        <processesNum />
      </div>
      <div>
        <taskNum />
      </div>
    </div>
  </div>
</template>

<script>
import processesNum from './processesNum'
import taskNum from './taskNum'
import Api from '@/api/datav.js'
export default {
  components: {
    processesNum,
    taskNum
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
      titleItem: [
        {
          title: '运行成功次数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '流程总数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '计划任务数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '节省工时',
          number: {
            number: [],
            toFixed: 2,
            textAlign: 'left',
            content: '{nt} 人/天',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        }
      ],
      water: {
        data: [],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 5,
        waveHeight: 5,
        colors: ['#E5999C', '#CE3D43']
      }
    }
  },
  mounted() {
    const that = this
    this.getTaskStatistics()
    this.interval = window.setInterval(function() {
      that.getTaskStatistics()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskStatistics() {
      let that = this
      Api.getTaskStatistics({}).then(response => {
        that.water.data = []
        if (response.code == 200) {
          let res = response.data
          const water = this.getWater()
          const titleItem = this.getTitleItem()
          titleItem[0].number.number = [res.taskSucceed]
          titleItem[1].number.number = [res.flowCount]
          titleItem[2].number.number = [res.totalTask]
          titleItem[3].number.number = [res.laborTime]
          water.data = [res.taskSuccessRate]
          this.water = water
          this.titleItem = titleItem
        }
      })
    },
    getTitleItem() {
      return [
        {
          title: '运行成功次数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '流程总数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '计划任务数',
          number: {
            number: [],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        },
        {
          title: '节省工时',
          number: {
            number: [],
            toFixed: 2,
            textAlign: 'left',
            content: '{nt} 人/天',
            style: {
              fontSize: 20,
              fill: '#bf0008'
            }
          }
        }
      ]
    },
    getWater() {
      return {
        data: [],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 5,
        waveHeight: 5,
        colors: ['#E5999C', '#CE3D43']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding: 10px;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .count {
      width: 60%;
      display: flex;
      flex-wrap: wrap;

      .item {
        margin: 10px;
        border-radius: 6px;
        padding-top: 8px;
        margin-top: 8px;
        width: 170px;
        height: 70px;

        .dv-dig-flop {
          width: 170px;
          height: 30px;
        }
      }
    }

    .water {
      width: 40%;
      margin: auto 0;
      .dv-wa-le-po {
        height: 160px;
      }
    }
  }

  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 235px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
  }
}
</style>
