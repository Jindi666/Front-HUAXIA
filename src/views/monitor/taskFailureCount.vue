<template>
  <div id="centerRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 ">
        <span>
          <icon name="chart-line" class="text-icon icon"></icon>
        </span>
        <div class="d-flex" style="width:100%">
          <div class="fs-xl text">任务失败次数Top5统计</div>
          <!-- <div class="detail">详细列表 ></div> -->
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board class="dv-scr-board" :config="config" :color="decorationColor" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      decorationColor: ['#E5999C', '#FFECE8'],
      config: {
        header: ['部门', '流程', '失败次数', '失败发生时间'],
        waitTime: 99999999999999,
        hoverPause: false,
        // index: true,
        // indexHeader: '序号',
        data: [
          ['合规管理岗', '1', '49335', '24668'],
          ['反洗钱岗', '5', '13354', '6677'],
          ['交易管理部', '1', '7509', '3754'],
          ['生产清算岗', '1', '4605', '2302'],
          ['运营服务部', '2', '3487', '1744'],
          ['信息披露岗', '3', '1838', '919']
        ],
        rowNum: 5, //表格行数
        headerHeight: 30,
        headerBGC: 'transparent', //表头
        oddRowBGC: '#FCF2F3', //奇数行
        evenRowBGC: '#F7E0E1', //偶数行
        carousel: 'page',
        // index: true,
        // columnWidth: [50],
        align: ['left', 'left', 'left', 'left']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#centerRight1 {
  padding: 4px 16px;
  padding-top: 6px;
  height: 100%;
  width: 100%;
  border-radius: 5px;

  .icon {
    padding: 1px;
    margin-top: 3px;
  }

  .dv-scroll-board {
    color: #000;
  }

  ::v-deep .dv-scroll-board {
    .header {
      color: #fff !important;
      font-size: 14px !important;

      .header-item {
        background-color: #b71d25;
      }
    }
    .rows .row-item {
      margin-bottom: 5px !important;
      height: 40px !important;
      line-height: 40px !important;
    }
  }

  .bg-color-black {
    height: 98%;
    border-radius: 5px;
  }
  .text {
    color: #b71d25;
    padding-left: 5px;
    padding-bottom: 4px;
    font-weight: 400;
    font-size: 14px;
    flex: 1;
  }

  .detail {
    color: #3d475c !important;
    font-size: 14px;
    padding-top: 1px;
    padding-right: 15px;
  }

  .body-box {
    border-radius: 10px;
    overflow: hidden;
    margin-top: 5px;
    .dv-scr-board {
      width: 578px;
      height: 255px;
    }
  }
}
</style>
