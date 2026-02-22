<template>
  <div class="card" :style="{ background: backgroundColor }">
    <div class="title">
      {{ type == 'finance' ? '当月日均业务处理笔数 TOP 10' : '当月日均处理人次 TOP 10' }}
    </div>
    <div class="content">
      <capsule-chart :config="pillConfig" class="pill-chart" :typeConfig="typeConfig" v-if="pillConfig.data.length" />
    </div>
  </div>
</template>
<script>
import dashboardApiDemo from '../../mockApi/dashboardApi.js'
import CapsuleChart from '../../components/capsuleChart/src/main'
import Api from '@/api/datav.js'

export default {
  name: 'averagePerDay',
  components: {
    CapsuleChart
  },
  props: {
    backgroundColor: {
      type: String,
      default: function() {
        return '#fff'
      }
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 360000
      }
    },
    working: {
      type: Number,
      default: function() {
        return 1
      }
    },
    succesed: {
      type: Number,
      default: function() {
        return 1
      }
    },
    failed: {
      type: Number,
      default: function() {
        return 1
      }
    }
  },
  data() {
    return {
      pillConfig: {
        data: []
      },
      type: this.$store.state.dataVUser.tenant,
      typeConfig: [],
      interval: null
    }
  },
  mounted() {
    this.loadData()
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getPillConfig(data) {
      const items = []
      for (var item of data) {
        items.push({ name: item.flow_name, value: item.total_business })
      }
      return {
        data: items,
        showValue: true
      }
    },
    getApi() {
      return dashboardApiDemo
    },
    loadData() {
      const that = this
      that.getDailyAverageTop10()
      this.interval = window.setInterval(function() {
        that.getDailyAverageTop10()
      }, this.refreshInterval)
    },
    getDailyAverageTop10() {
      const that = this
      Api.getDailyAverageTop10({}).then(response => {
        that.pillConfig = that.getPillConfig(response.data)
      })
    },
    getConfig() {
      return {
        data: [],
        showValue: true
      }
    }
  },
  computed: {
    departmentId() {
      return this.$store.state.dataVUser.select_department_id
    }
  },
  watch: {
    departmentId: function(newVal, oldVal) {
      this.getDailyAverageTop10()
    }
  }
}
</script>
<style scoped lang="less">
.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  .title {
    width: 100%;
    height: 20px;
    text-align: left;
    color: #171d29;
    font-size: 16px;
    font-weight: 700;
    padding: 16px 32px 16px 19px;
    margin-bottom: 29px;
  }
  .content {
    text-align: left;
    padding-left: 1rem;
    margin: auto 0;
    display: flex;
    flex-direction: row;

    .pill-chart {
      width: 90%;
    }
  }
}

/deep/.dv-capsule-chart .label-column {
  color: #000;
}

/deep/.dv-capsule-chart .capsule-item {
  // height: 2rem;
}

/deep/.dv-capsule-chart .capsule-item .capsule-item-column .capsule-item-value {
  padding-left: 10px;
  color: #2c6add;
}
</style>
