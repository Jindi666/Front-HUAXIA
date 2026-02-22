<template>
  <div id="realTimeTaskDetail">
    <div class="bg-color-black">
      <!-- <div class="table-tobot"> -->
      <a-table :columns="columns" :loading="loading" :data-source="tableData" :size="'small'" :pagination="false" bordered :scroll="{ y: 800 }"
        ><template slot="footer" v-if="page.totalCount">
          <a-pagination
            ref="aPagination"
            @change="onChangePage"
            :current="page.pageIndex"
            :total="page.totalCount"
            :pageSize.sync="page.pageSize"
            :showTotal="total => $tc('public.pageTotalCount.text', page.totalCount > 1 ? 2 : 1, { msg: page.totalCount })"
          />
        </template>
      </a-table>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Api from '@/api/monitor.js'

export default {
  data() {
    const columns = [
      {
        title: '时间',
        dataIndex: 'startTime',
        align: 'left',
        width: 120,
        key: 'startTime'
      },
      {
        title: '部门',
        width: 160,
        dataIndex: 'deptName'
      },
      {
        title: '机器人',
        width: 160,
        dataIndex: 'workerName'
      },
      {
        title: '流程',
        dataIndex: 'flowName'
      },
      {
        title: '任务ID',
        width: 160,
        dataIndex: 'taskId'
      },
      {
        title: '任务状态',
        width: 100,
        dataIndex: 'taskState'
      }
    ]
    return {
      loading: false,
      interval: null,
      tableData: [],
      columns,
      page: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0
      }
    }
  },
  mounted() {
    document.title = '实时任务监控——详细列表'
    this.getRealTimeTaskMonitoringPage()
  },
  methods: {
    onChangePage(pageIndex) {
      this.page.pageIndex = pageIndex
      this.getRealTimeTaskMonitoringPage()
    },
    getRealTimeTaskMonitoringPage() {
      this.loading = true
      Api.getRealTimeTaskMonitoringPage(this.page).then(response => {
        this.tableData = []
        this.loading = false
        this.page.totalCount = response.data.totalCount
        if (response.code == 200) {
          this.tableData = response.data.items
        }
      })
    }
  }
}
</script>

<style lang="scss" class>
$padding-height: 5px;
#realTimeTaskDetail {
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  // border-radius: 3px;

  .bg-color-black {
    height: calc(100% - 10px);
    background-color: #fff;
    overflow-y: auto;
  }
  .text {
    color: #bf0008;
    font-size: 14px;
    margin-top: -3px;
  }
}

:global .ant-table-small > .ant-table-content .ant-table-header {
  background-color: #bf0008 !important;
  color: #fff !important;
}

:global .ant-table-thead > tr > th {
  color: #fff !important;
}

:global .ant-table-footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  left: 0;
  right: 0;
  padding: 8px 16px;
}

:global .ant-table-bordered .ant-table-tbody > tr > td {
  border-right: $padding-height solid #fff !important;
  border-bottom: $padding-height solid #fff !important;
  padding: 9px !important;
}

:global .ant-table-bordered .ant-table-tbody > tr > td:last-child {
  border-right: 0px solid #fff !important;
}

:global .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td,
.ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td,
.ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
  background: #ffa196;
}

:global .ant-tooltip-inner {
  background: #bf0008;
  // color: rgba(0, 0, 0, 0.65);
}
:global .ant-tooltip-placement-top .ant-tooltip-arrow,
.ant-tooltip-placement-topLeft .ant-tooltip-arrow,
.ant-tooltip-placement-topRight .ant-tooltip-arrow {
  border-top-color: #bf0008;
}

:global .ant-table-tbody .ant-table-row {
  background: rgb(247, 224, 225);
}

:global .ant-table-tbody .ant-table-row:nth-child(2n) {
  background: rgb(252, 242, 243);
}
</style>
