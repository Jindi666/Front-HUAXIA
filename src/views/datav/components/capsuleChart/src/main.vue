<template>
  <div class="dv-capsule-chart">
    <template v-if="mergedConfig">
      <div class="label-column">
        <div class="name" v-for="(item, index) in mergedConfig.data" :key="item.name" @click="barClick(index)">{{ item.name }}</div>
      </div>

      <div class="capsule-container">
        <div class="capsule-item" v-for="(capsule, index) in capsuleLength" :key="index" @click="barClick(index)">
          <div class="capsule-item-column" :style="`width: ${capsule * 80}%;`">
            <div v-if="mergedConfig.showValue" class="capsule-item-value">&nbsp;{{ capsuleValue[index] }}</div>
          </div>
        </div>

        <!-- <div class="unit-label">
          <div v-for="(label, index) in labelData" :key="label + index">{{ label }}</div>
        </div> -->
      </div>
      <!-- <div class="color-block-container">
        <div v-for="(capsule, index) in chartColors.length - 1" :key="index" class="color-block-item">
          <div class="color-block" :style="`background-color: ${chartColors[index]};`"></div>
          <div style="flex:1;text-align:left" class="color-block-text">{{ typeConfig.length > 0 ? typeConfig[index].tool_name : '' }}</div>
        </div>
      </div> -->
    </template>
  </div>
</template>

<script>
import { deepMerge } from '@jiaminghi/charts/lib/util/index'
import { chartColors, defaultColors } from '../../chartColors'
// import { chartColors } from '../../chartColors'

import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

export default {
  name: 'CapsuleChart',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    typeConfig: {
      type: Array,
      default: () => ({
        return: []
      })
    }
  },
  data() {
    return {
      defaultConfig: {
        /**
         * @description Capsule chart data
         * @type {Array<Object>}
         * @default data = []
         * @example data = [{ name: 'foo1', value: 100 }, { name: 'foo2', value: 100 }]
         */
        data: [],
        /**
         * @description Colors (hex|rgb|rgba|color keywords)
         * @type {Array<String>}
         * @default color = ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293']
         * @example color = ['#000', 'rgb(0, 0, 0)', 'rgba(0, 0, 0, 1)', 'red']
         */
        colors: ['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293'],
        /**
         * @description Chart unit
         * @type {String}
         * @default unit = ''
         */
        unit: '',
        /**
         * @description Show item value
         * @type {Boolean}
         * @default showValue = false
         */
        showValue: false
      },

      mergedConfig: null,
      chartColors: chartColors,
      defaultColors: defaultColors,
      capsuleLength: [],
      capsuleValue: [],
      labelData: [],
      labelDataLength: []
    }
  },
  watch: {
    config() {
      const { calcData } = this

      calcData()
    }
  },
  methods: {
    barClick(type) {
      this.$emit('barClick', type)
    },
    calcData() {
      const { mergeConfig, calcCapsuleLengthAndLabelData } = this

      mergeConfig()

      calcCapsuleLengthAndLabelData()
    },
    mergeConfig() {
      let { config, defaultConfig } = this

      this.mergedConfig = deepMerge(deepClone(defaultConfig, true), config || {})
    },
    calcCapsuleLengthAndLabelData() {
      const { data } = this.mergedConfig

      if (!data.length) return

      const capsuleValue = data.map(({ value }) => value)

      const maxValue = Math.max(...capsuleValue)

      this.capsuleValue = capsuleValue

      this.capsuleLength = capsuleValue.map(v => (maxValue ? v / maxValue : 0))

      const oneFifth = maxValue / 5

      const labelData = Array.from(new Set(new Array(6).fill(0).map((v, i) => Math.ceil(i * oneFifth))))

      this.labelData = labelData

      this.labelDataLength = Array.from(labelData).map(v => (maxValue ? v / maxValue : 0))
    }
  },
  mounted() {
    const { calcData } = this

    calcData()
  }
}
</script>

<style lang="less">
.color-block-container {
  width: 100px;
  margin-left: 50px;
  margin-top: -25px;
  text-align: right;
  // @media screen and (min-width: 3000px) {
  //   width: 200px;
  //   margin-left: 100px;
  //   margin-top: -50px;
  // }
}
.color-block-text {
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  // @media screen and (min-width: 3000px) {
  //   font-size: 24px;
  //   height: 44px;
  //   line-height: 44px;
  // }
}
.color-block {
  height: 14px;
  width: 24px;
  margin: auto;
  margin-right: 6px;
  border-radius: 5px;
  // @media screen and (min-width: 3000px) {
  //   height: 28px;
  //   width: 56px;
  //   margin-right: 12px;
  //   border-radius: 10px;
  // }
}
.color-block-item {
  width: 100%;
  display: flex;
  line-height: 24px;
  height: 24px;
  font-size: 12px;
  // @media screen and (min-width: 3000px) {
  //   line-height: 48px;
  //   height: 48px;
  //   font-size: 24px;
  // }
}
.dv-capsule-chart {
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding: 5px;
  color: #fff;

  .label-column {
    // display: flex;
    // flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-right: 10px;
    text-align: left;
    margin-top: -10px;
    font-size: 13px;
    // @media screen and (min-width: 3000px) {
    //   margin-top: -15px;
    //   font-size: 28px;
    // }

    div {
      height: 36px;
      line-height: 18px;
      // padding-bottom: 6px;
      width: auto;
      max-width: 160px;
      margin: auto 0px;
      word-wrap: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
      // @media screen and (min-width: 3000px) {
      //   height: 80px;
      //   line-height: 80px;
      // }
    }
  }

  .capsule-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    // justify-content: space-between;
    justify-content: flex-start;
    // @media screen and (min-width: 3000px) {
    //   margin-top: 12px;
    // }
  }

  .capsule-item {
    box-shadow: 0 0 0px #999;
    margin: 0px 0px;
    border-radius: 5px;
    height: 42px;
    // @media screen and (min-width: 3000px) {
    //   border-radius: 10px;
    //   height: 80px;
    // }

    .capsule-item-column {
      background: linear-gradient(270deg, #2c6add 0%, #b3d7ff 100%);
      position: relative;
      height: 9px;
      line-height: 22px;
      border-radius: 5px;
      transition: all 0.3s;
      display: flex;
      // justify-content: flex-end;
      align-items: center;
      margin: 0 0;
      margin-top: 6px;
      // @media screen and (min-width: 3000px) {
      //   height: 44px;
      //   border-radius: 10px;
      // }

      .capsule-item-value {
        font-size: 14px;
        color: #2c6add;
        transform: translateX(100%);
        // @media screen and (min-width: 3000px) {
        //   font-size: 28px;
        // }
      }
    }
  }

  .unit-label {
    height: 20px;
    font-size: 12px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (min-width: 3000px) {
      height: 40px;
      font-size: 24px;
    }
  }

  .unit-text {
    text-align: right;
    display: flex;
    align-items: flex-end;
    font-size: 12px;
    line-height: 20px;
    margin-left: 10px;
    // color: #fffffff;
    // @media screen and (min-width: 3000px) {
    //   line-height: 40px;
    //   font-size: 24px;
    // }
  }
}
</style>
