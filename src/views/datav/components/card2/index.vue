<template>
  <div class="card" :class="{ cardBorder: showBorder }" :style="{ background: backgroundColor }">
    <div v-if="showBorder" class="icon2">
      <img :src="icon" class="img2" />
    </div>
    <div v-else class="icon">
      <img :src="icon" class="img " />
    </div>
    <div class="content" :class="{ content2: showBorder }">
      <div class="num" :style="{ color: numColor }">{{ num }}<span v-if="showPecent" class="pecent">%</span></div>
      <div class="des" :style="{ color: fontColor }">{{ describe }}</div>
    </div>
  </div>
</template>
<script>
import defaltIcon from '@/assets/icons/second-row-1.png'
export default {
  name: 'card',
  props: {
    showPecent: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    showBorder: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    backgroundColor: {
      type: String,
      default: function() {
        return '#2C6ADD'
      }
    },
    fontColor: {
      type: String,
      default: function() {
        return '#000'
      }
    },
    numColor: {
      type: String,
      default: function() {
        return '#000'
      }
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    },
    num: {
      type: Number,
      default: function() {
        return 1
      }
    },
    describe: {
      type: String,
      default: function() {
        return '累计使用人数'
      }
    },
    icon: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
.img {
  width: 24px;
}

.img2 {
  width: 44px;
}
.card {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 0.5rem;

  .icon {
    width: 36px;
    text-align: center;
    position: relative;
    left: 10px;
    // margin-right: 10px;
    top: 20%;
  }

  .icon2 {
    width: 66px;
    text-align: center;
    position: relative;
    left: 14px;
    top: 24px;
  }

  .content2 {
    padding-left: 24px;
  }

  .content {
    flex: 1;
    text-align: left;
    padding-left: 16px;
    margin: auto 0;

    .num {
      font-size: 24px;
      // color: #fff;
      font-weight: 600;

      .pecent {
        width: 14px;
        height: 22px;
        font-family: 'Microsoft YaHei UI';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        margin-left: 4px;
        line-height: 22px;

        text-align: center;

        color: #ffffff;
      }
    }

    .des {
      font-size: 14px;
      // color: #fff;
    }
  }
}

.cardBorder {
  border: 1px solid #2c6add;
}
</style>
