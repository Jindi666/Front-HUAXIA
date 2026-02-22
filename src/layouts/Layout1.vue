<template>
  <div class="layout1-main">
    <div class="layout1-side1">
      <slot name="layout1Side1"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
    <!-- <div id="side2" class="layout1-side2" v-show="showSide2">
      <slot name="layout1Side2"></slot>
    </div> -->
    <div class="layout1-side3">
      <div class="layout1-header">
        <slot name="layout1Header"></slot>
      </div>
      <div class="layout1-content" @click="contentClick">
        <slot name="layout1Content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout1',
  data() {
    return {}
  },
  methods: {
    contentClick: function() {
      this.$emit('contentClick')
    }
  }
}
</script>

<style lang="less">
.layout1-main {
  display: flex;
  height: 100%;
  flex-wrap: nowrap;
  overflow: hidden;
}
.layout1-side1 {
  height: 100%;
  width: 94px;
  min-width: 94px;
  background-color: #202b4f;
}
.layout1-side2 {
  height: 100%;
  width: 200px;
  min-width: 200px;
  z-index: 106;
  background-color: #ffffff;
  position: relative;
  box-shadow: 1px 0px 4px 0px rgba(0, 21, 41, 0.12);
}

/* #side2:after {
    border-width: 5px;
    border-right-color: #fff;
    top: 240px;
  } */
/* #side2::before {
    border-width: 6px;
    border-right-color: #fff;
    top: 238px;
  } */
.layout1-side3 {
  height: 100%;
  width: 100%;
  background-color: #ccc;
  display: flex;
  flex-wrap: wrap;
}
.layout1-header {
  height: 68px;
  width: 100%;
  background-color: #ffffff;
  display: inline-block;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}
.layout1-content {
  // height: 869px;
  height: calc(100% - 68px);
  width: 100%;
  background-color: #eceef0;
  // display: inline-block;
}
</style>
