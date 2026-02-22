<template>
  <div class="task-board">
    <div class="tb-header">
      <div class="item">人工时间</div>
      <div class="item">Worker时间</div>
      <div class="item">节约人工</div>
      <div class="item">效率提升</div>
    </div>
    <div class="tb-content">
      <div class="item">
        <div>
          <a-icon type="user" style="font-size: 24px;" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskTotal" :duration="1500"></countTo>
          </strong>
          <span>小时</span>
        </div>
      </div>
      <div class="item">
        <div>
          <a-icon type="laptop" style="font-size: 24px;" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskRunning" :duration="1500"></countTo>
          </strong>
          <span>小时</span>
        </div>
      </div>
      <div class="item">
        <div>
          <a-icon type="clock-circle" style="font-size: 24px;" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="taskTodo" :duration="1500"></countTo>
          </strong>
          <span>小时</span>
        </div>
      </div>
      <div class="item">
        <div>
          <a-icon type="dollar" style="font-size: 24px;" />
        </div>
        <div>
          <strong>
            <countTo :startVal="0" :endVal="savedHours" :duration="1500" :decimals="2"></countTo>
          </strong>
          <span>%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'TaskBoard5',
  components: { CountTo },
  props: {
    taskTotal: {
      type: Number,
      default() {
        return 0
      }
    },
    taskRunning: {
      type: Number,
      default() {
        return 0
      }
    },
    taskTodo: {
      type: Number,
      default() {
        return 0
      }
    },
    savedHours: {
      type: Number,
      default() {
        return 0
      }
    }
  }
}
</script>

<style scoped lang="less">
.task-board {
  border-radius: 8px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);

  .tb-header {
    display: flex;
    /*width:674px;*/
    height: 54px;
    background: #6e77a1;
    border-radius: 8px 8px 0px 0px;
    color: white;

    .item {
      flex-grow: 1;
      width: 25%;
      font-size: 16px;
      text-align: center;
      height: 18px;
      margin-top: auto;
      margin-bottom: auto;
      line-height: 18px;
    }

    .item + .item {
      border-left: 1px solid white;
    }
  }

  .tb-content {
    display: flex;
    border-radius: 0 0 8px 8px;
    background: white;
    height: 112px;

    .item {
      flex-grow: 1;
      text-align: center;
      padding-top: 24px;
      width: 25%;

      strong {
        font-family: 'Bahnschrift Condensed';
        font-weight: 300;
        font-size: 40px;
        font-weight: normal;
        color: #202b4f;
      }
    }

    .item + .item {
      border-left: solid 1px #d9dee2;
    }
  }
}
</style>
