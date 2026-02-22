<template>
  <div class="card" :style="{ background: backgroundColor }">
    <div class="title">
      今日任务
    </div>
    <div class="content">
      <div class="left">
        <div class="lc">
          <div class="numsize" style="color:#2C6ADD">{{ working }}</div>
          <div class="dessize">运行中</div>
        </div>
      </div>
      <div class="mid">
        <div class="lc">
          <div class="numsize" style="color:#21B58C">{{ succesed }}</div>
          <div class="dessize">运行成功</div>
        </div>
      </div>
      <div class="right">
        <div class="lc">
          <div class="numsize" style="color:#BD0B11">{{ failed }}</div>
          <div class="dessize">运行失败</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import defaltIcon from '@/assets/icons/second-row-1.png'
export default {
  name: 'todayTask',
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
        return 60000
      }
    },
    working: {
      type: Number,
      default: function() {
        return 0
      }
    },
    succesed: {
      type: Number,
      default: function() {
        return 0
      }
    },
    failed: {
      type: Number,
      default: function() {
        return 0
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
.card {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  .title {
    width: 100%;
    height: 3rem;
    text-align: left;
    color: #171d29;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.8rem 2rem 1rem 1.2rem;
    margin-bottom: 0.5rem;
  }
  .content {
    text-align: left;
    padding-left: 6px;
    margin: auto 0;
    display: flex;
    flex-direction: row;

    .lc {
      height: 100%;
      flex-direction: column;
      align-items: center;
      padding-top: 1rem;
    }

    .numsize {
      font-size: 20px;
      font-weight: 700;
    }

    .dessize {
      font-size: 14px;
      color: #3d475c;
    }

    .left {
      background: #e6f3ff;
      border-radius: 8px;
      width: 10rem;
      height: 5rem;
      padding: 0rem 0rem 1rem 1.5rem;
      margin: 1rem;
      margin-top: 0px;
    }

    .mid {
      background: #e6f5ee;
      border-radius: 8px;
      width: 10rem;
      height: 5rem;
      padding: 0rem 0rem 1rem 1.5rem;
      margin: 1rem;
      margin-top: 0px;
    }
    .right {
      background: #ffece8;
      border-radius: 8px;
      width: 10rem;
      height: 5rem;
      padding: 0rem 0rem 1rem 1.5rem;
      margin: 1rem;
      margin-top: 0px;
    }
  }
}
</style>
