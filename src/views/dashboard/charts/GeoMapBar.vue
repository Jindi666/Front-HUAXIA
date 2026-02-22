<template>
  <div class="chart-container2">
    <div style="display:flex;" class="chart-pie">
      <div style="width:39%;">
        <region-bar :demo-mode="false" v-if="!isLoading" :type="type" />
      </div>
      <div style="width:60%;">
        <geo-map :demo-mode="false" v-if="!isLoading" :type="type" :mapCode="mapCode" />
      </div>
    </div>
    <div class="option-box">
      <a-select :defaultValue="1" class="laiye-select-dark" size="small" @change="handleChange">
        <a-icon slot="suffixIcon" type="caret-down" />
        <a-select-option :value="1">{{ $t('dashboard.latestOneWeek.text') }}</a-select-option>
        <a-select-option :value="2">{{ $t('dashboard.latestTwoWeek.text') }}</a-select-option>
        <a-select-option :value="3">{{ $t('dashboard.latestOneMonth.text') }}</a-select-option>
      </a-select>
      <strong>{{ $t('dashboard.taskRegionDistribute.text') }}</strong>
    </div>
  </div>
</template>

<script>
import { addListener, removeListener } from 'resize-detector'
import GeoMap from './GeoMap'
import RegionBar from './RegionBar'
import { dashColors } from '../DashColors'

export default {
  name: 'GeoMapBar',
  components: { GeoMap, RegionBar },
  data() {
    return {
      type: 1
    }
  },
  props: {
    mapCode: {
      type: String,
      default: function() {
        return '100000'
      }
    },
    isLoading: {
      type: Boolean,
      default: function() {
        return true
      }
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    handleChange(val) {
      this.type = val
    }
  }
}
</script>

<style scoped lang="less">
.chart-container2 {
  height: 300px;
  position: relative;
}
.chart-pie {
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  top: 0px;
  bottom: 0px;
}

.option-box {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: right;

  strong {
    font-size: 16px;
    font-weight: 400;
    margin-left: 1em;
    color: #425b6d;
  }
}
</style>
