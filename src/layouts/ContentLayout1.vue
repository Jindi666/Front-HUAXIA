<template>
  <div class="laycontent">
    <transition name="slide">
      <div v-show="isShowSide" class="laycontent-side">
        <slot name="side"></slot>
      </div>
    </transition>
    <div v-if="isShowContent" class="laycontent-content" :style="{ width: contentWidth }">
      <div v-if="isShowHeader1" class="laycontent-content-header1">
        <slot name="header1"></slot>
      </div>
      <div v-if="isShowHeader2" class="laycontent-content-header2">
        <slot name="header2"></slot>
      </div>
      <div v-if="isShowTable" class="laycontent-content-table" :style="{ height: tableHeight }">
        <slot name="table"></slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentLayout1',
  props: {
    isShowSide: {
      type: Boolean,
      default: true,
      required: false
    },
    isShowContent: {
      type: Boolean,
      default: true,
      required: false
    },
    isShowHeader1: {
      type: Boolean,
      default: true,
      required: false
    },
    isShowHeader2: {
      type: Boolean,
      default: true,
      required: false
    },
    isShowTable: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  computed: {
    contentWidth: function() {
      return this.isShowSide ? 'calc(100% - 300px)' : 'calc(100%)'
    },
    tableHeight: function() {
      return this.isShowHeader2 ? 'calc(100% - 60px)' : 'calc(100%)'
    },
    tableMarginTop: function() {
      return this.isShowHeader2 ? '0px' : '32px'
    }
  },
  data: function() {
    return {}
  }
}
</script>
<style lang="less">
.laycontent {
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  // width: 100%;
  &-side {
    width: 300px;
    overflow-y: auto;
    height: 100%;
    box-shadow: 1px 0px 4px 0px rgba(0, 21, 41, 0.12);
    background: #fff;
    // z-index: 99;
  }
  &-content {
    // width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    padding: 24px;
    overflow-y: auto;
    &-header1 {
      width: 100%;
      height: 5%;
      background: #fff;
    }
    &-header2 {
      width: 100%;
      // height: 92px;
      // min-height: 92px;
      // padding-top: 32px;
      padding-bottom: 24px;
      display: flex;
      justify-content: flex-end;
      // align-items: center;
      position: relative;
      height: 60px;
      .n-left {
        flex: 1 1 0%;
        display: flex;
        align-items: center;
        .tit {
          font-size: 16px;
          color: #425b6d;
        }
      }
    }
    &-table {
      // width: calc(100% - 128px);
      // height: calc(100% - 32px);
      height: 100%;
      // box-shadow: 0px 2px 6px rgba(32, 43, 79, 0.2);
      border-radius: 6px;
      // margin: 32px 64px 32px 64px;
    }
  }
}
.slide-enter-active {
  animation: slide-in 0.3s;
}
.slide-leave-active {
  animation: slide-in 0.3s reverse;
}
@keyframes slide-in {
  0% {
    width: 0;
  }
  25% {
    width: 75px;
  }
  50% {
    width: 150px;
  }
  75% {
    width: 225px;
  }
  100% {
    width: 300px;
  }
}
// 响应屏幕分辨率宽小于1600px，高小于800px
// @media screen and (max-width: 1600px) and (max-height: 800px) {
//   .laycontent {
//     display: flex;
//     flex-wrap: nowrap;
//     height: 100%;
//     width: 100%;
//     &-side {
//       min-width: 165px;
//       max-width: 265px;
//       overflow-x: scroll;
//       height: 78%;
//       border-right: 1px solid #f5f5f7;
//       background: #fff;
//     }
//     &-content {
//       width: 100%;
//       height: 100%;
//       display: flex;
//       flex-wrap: nowrap;
//       flex-direction: column;
//       &-header1 {
//         width: 100%;
//         height: 5%;
//         background: #fff;
//       }
//       &-header2 {
//         width: 100%;
//         height: 10%;
//         min-height: 10%;
//         display: flex;
//         justify-content: flex-end;
//         align-items: center;
//         position: relative;
//         right: 26px;
//         top: 8px;
//       }
//     }
//   }
// }

// 响应1920*1080屏幕有书签栏
// @media screen and (min-height: 930px) and (max-height: 938px) {
//   .laycontent {
//     display: flex;
//     flex-wrap: nowrap;
//     height: 100%;
//     width: 100%;
//     &-side {
//       min-width: 165px;
//       max-width: 265px;
//       overflow-x: scroll;
//       height: 97%;
//       border-right: 1px solid #f5f5f7;
//       background: #fff;
//     }
//     &-content {
//       width: 100%;
//       height: 100%;
//       display: flex;
//       flex-wrap: nowrap;
//       flex-direction: column;
//       &-header1 {
//         width: 100%;
//         height: 5%;
//         background: #fff;
//       }
//       &-header2 {
//         width: 100%;
//         height: 10%;
//         min-height: 10%;
//         display: flex;
//         justify-content: flex-end;
//         align-items: center;
//         position: relative;
//         right: 26px;
//         top: 8px;
//       }
//     }
//   }
// }
// 响应1366*768屏幕没有书签栏
// @media screen and (min-height: 768px) and (max-height: 810px) {
//   .laycontent {
//     display: flex;
//     flex-wrap: nowrap;
//     height: 100%;
//     width: 100%;
//     &-side {
//       min-width: 165px;
//       max-width: 265px;
//       overflow-x: scroll;
//       height: 81%;
//       border-right: 1px solid #f5f5f7;
//       background: #fff;
//     }
//     &-content {
//       width: 100%;
//       height: 100%;
//       display: flex;
//       flex-wrap: nowrap;
//       flex-direction: column;
//       &-header1 {
//         width: 100%;
//         height: 5%;
//         background: #fff;
//       }
//       &-header2 {
//         width: 100%;
//         height: 10%;
//         min-height: 10%;
//         display: flex;
//         justify-content: flex-end;
//         align-items: center;
//         position: relative;
//         right: 26px;
//         top: 8px;
//       }
//     }
//   }
// }
.content-side-header {
  padding: 6px 16px 10px 16px;
  font-weight: 600;
  position: relative;

  label.wtf {
    font-weight: bold;
    font-size: 14px;
    line-height: 36px;
    color: #333;
  }
}
</style>
