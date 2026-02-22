<template>
  <div :class="className + ' card'">
    <div class="woker ">
      <img class="img " :src="img" alt="" />
      <img class="gif" :src="dian" alt="" />
    </div>
    <div class="right">
      <div class="num">{{ num }}</div>
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>
<script>
import imgUibotOffline from '@/assets/datav/uibotOffline.png'
import dian from '@/assets/datav/dian.gif'
export default {
  name: 'uibotWorker',
  props: {
    className: {
      type: String,
      default: function() {
        return ''
      }
    },
    name: {
      type: String,
      default: function() {
        return '数量'
      }
    },
    num: {
      type: Number,
      default: function() {
        return 0
      }
    },
    img: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  data() {
    return {
      imgUibotOffline,
      dian
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>
<style scoped lang="less">
.card {
  display: flex;
  flex: 1;
  padding: 10px;
  padding-top: 20px;
  // background: #000;
  .woker {
    width: 44px;
    height: 250px;

    .img {
      position: absolute;
      width: 120px;
      height: 250px;
    }

    .gif {
      margin-top: 18px;
      position: absolute;
      width: 124px;
      height: 200px;
    }
  }
  &.zero {
    .woker {
      width: 44px;
      height: 150px;
      .img {
        width: 68px;
        height: 107px;
      }
      .git {
        margin-top: 18px;
        position: absolute;
        width: 80px;
        height: 100px;
      }
    }

    .right {
      margin-left: 50px;
      .num,
      .name {
        display: inline-block;
      }
    }
  }

  .right {
    margin-left: 22px;
    width: 100%;
    text-align: center;

    .num {
      width: 54px;
      height: 24px;
      color: #b71e25;
      font-weight: 700;
      font-size: 40px;
      margin-top: 10px;
      text-align: center;
    }
    .name {
      width: 54px;
      // text-align: center;
      margin-top: 26px;
      font-weight: 400;
      font-size: 12px;
      color: #171d29;
    }
  }
}
</style>
