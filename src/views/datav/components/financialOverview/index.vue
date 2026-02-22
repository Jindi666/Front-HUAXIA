<template>
  <div class="list">
    <div class="title">
      数字员工总览
    </div>
    <div class="header">
      <div class="select">
        <div class="name">流程</div>
        <a-select class="select-a" mode="multiple" @change="handleChangeState" :placeholder="selectTips" :value="statusValue" allowClear>
          <a-icon slot="suffixIcon" type="caret-down" />
          <a-select-option :title="item.flow_name" v-for="item in optionValues" :key="item.flow_id" :value="item.flow_id">{{ item.flow_name }}</a-select-option>
        </a-select>
      </div>
      <div class="picker" style="margin-left:16px">
        <div class="name">入职时间</div>
        <a-range-picker
          class="time"
          format="YYYY-MM-DD"
          @change="onChangeDate"
          @calendarChange="onCalendarChange"
          :value="[page.begin_time ? moment(page.begin_time, dateFormat) : '', page.end_time ? moment(page.end_time, dateFormat) : '']"
          :allowClear="false"
          dropdownClassName="range"
          :disabled-date="disabledDate"
          :getCalendarContainer="
            triggerNode => {
              return triggerNode.parentNode || document.body
            }
          "
        >
          <i class="uibot ub-date_picker" slot="suffixIcon"></i>
        </a-range-picker>
      </div>
      <div class="blank"></div>
      <a-button v-action:operationLog-export type="primary" style="margin-right: 50px" :loading="exporting" @click="exportExcel"
        ><i class="uibot ub-download" style="margin-right: 3px"></i> {{ $t('utilsIndexJs.exportText.text') }}</a-button
      >
    </div>
    <div class="content">
      <div ref="taskTable" style="height: auto;width: 100%;">
        <a-table
          :columns="type == 'finance' ? financeColumns : personnelColumns"
          :dataSource="taskData"
          :pagination="false"
          rowKey="id"
          :scroll="{ y: tableScrollOffsetY }"
          class="ub-table-scroll"
          :loading="tableLoading"
        >
          <template slot="create_time" slot-scope="text">{{ moment(text).format('YYYY-MM-DD') }}</template>
          <template slot="footer" v-if="page.totalCount">
            <a-pagination
              ref="aPagination"
              @change="onChangePage"
              :current="page.pageIndex"
              :total="page.totalCount"
              :pageSize.sync="page.pageSize"
              :pageSizeOptions="pageSizeOptions"
              showSizeChanger
              @showSizeChange="onShowSizeChange"
              :showTotal="total => $tc('public.pageTotalCount.text', page.totalCount > 1 ? 2 : 1, { msg: page.totalCount })"
            />
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import dashboardApiDemo from '../../mockApi/dashboardApi.js'
import i18n from '@/locales'
import moment from 'moment'
import Api from '@/api/datav.js'
import { addListener, removeListener } from 'resize-detector'
const personnelColumns = [
  {
    title: '流程名称',
    dataIndex: 'flow_name',
    key: 'flow_name',
    width: '25%',
    scopedSlots: { customRender: 'flow_name' }
  },
  {
    title: '入职时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: '5%',
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '所属中心',
    dataIndex: 'dept_name_L1',
    key: 'dept_name_L1',
    width: '10%',
    scopedSlots: { customRender: 'dept_name_L1' }
  },
  {
    title: '所属部门',
    dataIndex: 'dept_name_L2',
    key: 'dept_name_L2',
    width: '5%',
    scopedSlots: { customRender: 'dept_name_L2' }
  },
  { title: '累计运行时长（小时）', dataIndex: 'total_business_time', key: 'total_business_time', width: '10%' },
  {
    title: '今日处理人次',
    dataIndex: 'total_business',
    key: 'total_business',
    width: '5%',
    scopedSlots: { customRender: 'total_business' }
  },
  { title: '累计自动化覆盖率', dataIndex: 'auto_rate_fraction_rate', key: 'auto_rate_fraction_rate', width: '10%' },

  {
    title: '累计FTE效能',
    dataIndex: 'efficiency_rate',
    key: 'efficiency_rate',
    width: '5%',
    scopedSlots: { customRender: 'efficiency_rate' }
  },
  {
    title: '累计流程覆盖率',
    dataIndex: 'flowcover_rate',
    key: 'flowcover_rate',
    width: '5%',
    scopedSlots: { customRender: 'flowcover_rate' }
  }
]

const financeColumns = [
  {
    title: '流程名称',
    dataIndex: 'flow_name',
    key: 'flow_name',
    width: '40%',
    scopedSlots: { customRender: 'flow_name' }
  },
  {
    title: '入职时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: '10%',
    scopedSlots: { customRender: 'create_time' }
  },
  {
    title: '所属中心',
    dataIndex: 'dept_name_L1',
    key: 'dept_name_L1',
    width: '10%',
    scopedSlots: { customRender: 'dept_name_L1' }
  },
  {
    title: '所属部门',
    dataIndex: 'dept_name_L2',
    key: 'dept_name_L2',
    width: '15%',
    scopedSlots: { customRender: 'dept_name_L2' }
  },
  { title: '累计运行时长（小时）', dataIndex: 'run_time', key: 'run_time', width: '15%' },

  {
    title: '今日业务量',
    dataIndex: 'total_business',
    key: 'total_business',
    width: '10%',
    scopedSlots: { customRender: 'total_business' }
  }
]

var defaultHeight = 680
export default {
  name: 'financialOverview',
  components: {},
  props: {
    type: {
      type: String,
      default: function() {
        return 'finance'
      }
    },
    backgroundColor: {
      type: String,
      default: function() {
        return '#fff'
      }
    },
    refreshInterval: {
      type: Number,
      default: function() {
        return 30000
      }
    }
  },
  data() {
    return {
      financeColumns,
      personnelColumns,
      taskData: [],

      tableScrollOffsetY: defaultHeight,
      tableLoading: true,
      page: {
        pageIndex: 1,
        totalCount: 0,
        pageSize: 10,
        begin_time: '',
        end_time: '',
        flow_id: ''
      },
      disableDay: null,
      dateFormat: 'YYYY-MM-DD',
      selectTips: '选择流程',
      statusValue: [],
      optionValues: [],
      pageSizeOptions: ['10', '20', '40', '80', '100'],
      exporting: false
    }
  },
  created() {
    this.statusValue = []
    this.page.begin_time = moment()
      .startOf('month')
      .format(this.dateFormat)
    this.page.end_time = moment().format(this.dateFormat)
  },
  mounted() {
    this.loadData()
    this.resiseScrollY()
    addListener(this.$refs.taskTable, this.resiseScrollY)
  },
  beforeDestroy() {
    removeListener(this.$refs.taskTable, this.resiseScrollY)
  },
  methods: {
    exportExcel() {
      this.exporting = true
      if ('finance' == this.type) {
        Api.exportEmployeeInfo(this.page).then(res => {
          this.convertRes2Blob(res)
          this.exporting = false
        })
      } else {
        Api.exportEmployeesPersonnalInfo(this.page).then(res => {
          this.convertRes2Blob(res)
          this.exporting = false
        })
      }
    },
    onShowSizeChange(current, pageSize) {
      this.page.pageIndex = current
      this.page.pageSize = pageSize
      this.getListData()
    },
    onChangePage(pageIndex) {
      this.page.pageIndex = pageIndex
      this.getListData()
    },
    moment,
    getApi() {
      return dashboardApiDemo
    },
    loadData() {
      this.getFlowList()
      this.getListData()
    },
    resiseScrollY() {
      const tableEl = document.querySelector('.ant-table-content')
      const headerEl = document.querySelector('.ant-table-thead')
      const footerEl = document.querySelector('.ant-table-footer')
      if (tableEl) {
        let height = tableEl.clientHeight
        // console.log(height)
        if (headerEl) {
          height = height - headerEl.clientHeight
        }
        // if (footerEl) {
        //   height = height - footerEl.clientHeight
        // }
        this.tableScrollOffsetY = height
        let width = document.body.clientWidth
        if (width > 3000) {
          defaultHeight = 1400
        }
        if (this.tableScrollOffsetY < defaultHeight) {
          this.tableScrollOffsetY = defaultHeight
        }
      }
      console.log(this.tableScrollOffsetY)
    },
    getFlowList() {
      Api.getFlowList({}).then(response => {
        // console.log(response.data)
        this.optionValues = response.data
      })
    },
    getConfig() {
      return {
        data: [],
        showValue: true
      }
    },
    onChangeDate(dates, dateStrings) {
      // if (timeApi.isMoreMouth(dateStrings)) {
      //   this.$message.error(this.$t('taskManager.timeLimitTips.text'))
      //   return
      // }
      this.page.begin_time = dateStrings[0]
      this.page.end_time = dateStrings[1]
      this.page.pageIndex = 1
      this.getListData()
    },
    onCalendarChange(dates) {
      this.disableDay = dates.length === 1 ? dates[0] : null
    },
    disabledDate(current) {
      // if (current && this.disableDay) {
      //   return current > moment(this.disableDay).add('days', 30).endOf('day') || current < moment(this.disableDay).subtract('days', 30).endOf('day')
      // }
    },
    handleChangeState(arr) {
      // console.log(arr)
      this.statusValue = arr
      this.page.flow_id = arr + ''
      // console.log(this.page)
      this.getListData()
    },
    getListData() {
      console.log(this.page)
      if ('finance' == this.type) {
        this.getEmployeesInfo()
      } else {
        this.getEmployeespersonnalInfo()
      }
    },
    getEmployeesInfo() {
      let that = this
      // console.log('response.data')
      Api.getEmployeesInfo(this.page)
        .then(response => {
          that.tableLoading = false
          console.log(response)
          that.taskData = response.data.items
          that.page.totalCount = response.data.totalCount
          that.page.pageIndex = response.data.pageIndex
          that.page.numberPages = response.data.pageSize
        })
        .catch(e => {
          that.tableLoading = false
        })
    },
    getEmployeespersonnalInfo() {
      let that = this
      // console.log('response.data')
      Api.getEmployeespersonnalInfo(this.page)
        .then(response => {
          that.tableLoading = false
          console.log(response)
          that.taskData = response.data.items
          that.page.totalCount = response.data.totalCount
          that.page.pageIndex = response.data.pageIndex
          that.page.numberPages = response.data.pageSize
        })
        .catch(e => {
          that.tableLoading = false
        })
    },
    convertRes2Blob(response) {
      console.log(response)
      // 提取文件名
      const fileName = response.headers['content-disposition'].match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
      // 将二进制流转为blob
      const blob = new Blob(['\uFEFF' + response.data], { type: 'text/csv;charset=utf-8' })
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, decodeURI(fileName))
      } else {
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        console.log(blobURL)
        tempLink.href = blobURL
        tempLink.setAttribute('download', decodeURI(fileName))
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
      }
    }
  },
  computed: {
    departmentId() {
      return this.$store.state.dataVUser.select_department_id
    }
  },
  watch: {
    departmentId: function(newVal, oldVal) {
      this.loadData()
    }
  }
}
</script>
<style scoped lang="less">
/deep/.ant-table-fixed-header .ant-table-scroll .ant-table-header {
  background: #fff;
  overflow: hidden;
}

/deep/.ub-table-scroll .ant-table-thead > tr > th {
  color: #171d29;
  background: #fff;
  border-bottom: 1px solid #dcdddf;
}

/deep/.ant-table-body {
  overflow: hidden !important;
  padding-bottom: 64px !important;
}

/deep/.ub-table-scroll .ant-table-footer {
  text-align: right;
}

// /deep/.ant-select-selection {
//   height: 38px;
// }

// /deep/.ant-select-selection__rendered {
//   height: 38px;
// }

/deep/.ant-select-selection--multiple,
.ant-select-selection--multiple .ant-select-selection__rendered .ant-select-selection__choice {
  margin-top: 0px;
}

/deep/.ant-input {
  height: 38px !important;
  line-height: 38px !important;
  background: #edeff2 !important;
  // padding: 4px;
  // font-size: 14px;
  // margin-top: 1px;
}

/deep/ .ant-btn-primary {
  background-color: #0e5ef3;
  border-color: #0e5ef3;
}

.blank {
  flex: 1;
}

.list {
  width: 100%;
  height: 100%;
  background: #fff;
  // padding: 1rem;
  padding-top: 1rem;

  .title {
    width: 100%;
    height: 32px;
    text-align: left;
    color: #171d29;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 0rem 2rem 0rem 1.2rem;
    margin-bottom: 0.4rem;
  }

  .header {
    width: 100%;
    height: auto;
    text-align: left;
    color: #171d29;
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0.8rem 2rem 1rem 1.2rem;
    // margin-bottom: 1rem;
    display: flex;
    .name {
      margin: auto 0;
      width: 100px;
      // padding-right: 16px;
      text-align: center;
      // height: 38px;
      background: #edeff2;
      line-height: 38px;
      border-right: 1px solid #d5dae6;
    }
    .select {
      width: 560px;
      // height: 38px;
      line-height: 38px;
      display: flex;
      border-radius: 4px;
      background: #edeff2;
      // color: #d5dae6;
      // padding: 0px 0px 0px 1rem;
      font-size: 14px;
      margin: auto 0;

      .select-a {
        width: 488px;
        // height: 38px;
        line-height: 38px;
        // flex-direction: row;
        align-items: center;
        padding: 0px 0px;
        margin: auto 0;
        // overflow: hidden;

        // align-self: stretch;
        // flex-grow: 1;
      }
    }

    .picker {
      width: auto;
      height: 38px;
      display: flex;
      border-radius: 4px;
      // background: #edeff2;
      // color: #d5dae6;
      // padding: 0px 0px 0px 1rem;
      font-size: 14px;

      .time {
        margin: auto 0;
        height: 38px;
      }
    }
  }
  .content {
    height: 100%;
    background: #fff;
    text-align: left;
    margin: auto 0;
    display: flex;
    flex-direction: row;
    padding: 0 1rem;

    .ub-table-scroll {
      // height: 100%;
      height: auto;
      background: #fff;
    }
  }
}
</style>
