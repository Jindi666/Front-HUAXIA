<template>
  <div id="fourLeft">
    <div class="bg-color-black">
      <div class="d-flex ">
        <span>
          <icon name="chart-area" class="text-icon icon"></icon>
        </span>
        <div class="d-flex" style="width:100%;margin-bottom: 3px;">
          <div class="fs-xl text">任务失败次数Top5统计</div>
          <div class="detail" @click="$emit('detailClick')">详细列表 ></div>
        </div>
      </div>
      <div class="table-tobot">
        <a-table :columns="columns" :data-source="tableData" :size="'small'" :pagination="false" bordered>
          <template slot="deptName" slot-scope="name">
            <div class="deptName">{{ name }}</div>
          </template>
          <template slot="flowName" slot-scope="text">
            <div class="flowName">{{ text }}</div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/api/monitor.js'
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {}
  }
  return obj
}
const data = [
  {
    key: '1',
    name: '财务部',
    age: 32,
    tel: '0571-22098909',
    phone: 18889898989
  },
  {
    key: '2',
    name: '财务部',
    tel: '0571-22098333',
    phone: 18889898888,
    age: 42
  },
  {
    key: '3',
    name: '财务部',
    age: 32,
    tel: '0575-22098909',
    phone: 18900010002
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    tel: '0575-22098909',
    phone: 18900010002
  }
]
export default {
  props: {
    refreshInterval: {
      type: Number,
      default: function() {
        return 60000
      }
    }
  },
  data() {
    const columns = [
      {
        title: '部门',
        dataIndex: 'deptName',
        scopedSlots: { customRender: 'deptName' },
        align: 'left',
        width: 100,
        key: 'deptName'
      },
      {
        title: '流程',
        dataIndex: 'flowName',
        scopedSlots: { customRender: 'flowName' }
      },
      {
        title: '次数',
        dataIndex: 'taskFail',
        width: '60px'
      },
      {
        title: '失败发生时间',
        dataIndex: 'firstTime',
        width: 160,
        customRender: (text, record) => (
          <a-tooltip class="tooltip" placement="topLeft" title={record.queryTime.replaceAll(',', ' ')}>
            {record.firstTime}
          </a-tooltip>
        )
      }
    ]
    return {
      interval: null,
      tableData: [],
      data,
      columns
    }
  },
  components: {},
  mounted() {
    const that = this
    this.getTaskFailureTop5()
    this.interval = window.setInterval(function() {
      that.getTaskFailureTop5()
    }, this.refreshInterval)
  },
  beforeDestroy() {
    window.clearInterval(this.interval)
  },
  methods: {
    getTaskFailureTop5() {
      Api.getTaskFailureTop5({}).then(response => {
        this.tableData = []
        if (response.code == 200) {
          this.tableData = response.data
        }
        // this.mergeRowCell(this.tableData)
      })
    },
    rowSpan(key, data) {
      const arr = data
        .reduce((result, item) => {
          if (result.indexOf(item[key]) < 0) {
            result.push(item[key])
          }
          return result
        }, [])
        .reduce((result, keys) => {
          const children = data.filter(item => item[key] === keys)
          result = result.concat(
            children.map((item, index) => ({
              ...item,
              [`${key}RowSpan`]: index === 0 ? children.length : 0
            }))
          )
          return result
        }, [])
      return arr
    },
    // 表格合并
    mergeRowCell(data) {
      let tableData = this.rowSpan('deptName', data)
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" class>
$padding-height: 5px;
#fourLeft {
  padding: 14px 16px;
  height: 100%;
  width: 100%;
  border-radius: 3px;

  .icon {
    padding: 1px;
    margin-top: 3px;
  }

  .deptName {
    overflow: hidden;
    width: 100px;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
  }

  .flowName {
    overflow: hidden;
    width: 190px;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
  }

  .table-tobot {
    // width: 600px;
  }

  .bg-color-black {
    background-color: #fff;
    height: 100%;
    border-radius: 3px;
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
    // padding-top: 1px;
    padding-right: 15px;
  }
}

:global .ant-table-small,
.ant-table-wrapper {
  border-radius: 5px !important;
}

:global .ant-tooltip-inner {
  max-width: 165px !important;
}

:global .ant-table .ant-table-body {
  margin: 0px !important;
  .ant-table-thead {
    height: 24px !important;
    background-color: #bf0008 !important;
    color: #fff !important;
    border-bottom: $padding-height solid #fff !important;
    > tr {
      height: 24px !important;
    }
    > tr > th {
      color: #fff !important;
      padding: 4px 4px 4px 8px !important;
      border-right: 0px solid #fff !important;
    }
  }
}

:global .ant-table-bordered .ant-table-tbody > tr > td {
  border-right: $padding-height solid #fff !important;
  border-bottom: $padding-height solid #fff !important;
  // background: rgb(247, 224, 225);
  padding: 7px !important;
}

// :global .ant-table-bordered .ant-table-tbody > tr {
//   height: 9px !important;
// }

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
