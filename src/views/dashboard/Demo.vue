<template>
  <ContentLayout1 :isShowSide="isShowSide" :isShowHeader1="isShowHeader1" :isShowHeader2="isShowHeader2" :isShowTable="isShowTable" :isShowContent="isShowContent" id="roleTable">
    <template v-slot:side>
      <a-tree
        checkable
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :treeData="treeData"
      />
    </template>
    <template v-slot:header1>
      <a-tabs :animated="false">
        <a-tab-pane tab="参数" key="1">
          <!-- <Param ref="param" /> -->
        </a-tab-pane>
        <a-tab-pane tab="凭据" key="2">
          <!-- <Credential ref="credential" /> -->
        </a-tab-pane>
        <a-tab-pane tab="队列" key="3">
          <!-- <Queue ref="queue" /> -->
        </a-tab-pane>
      </a-tabs>
    </template>
    <template v-slot:header2>
      <headComponent />
    </template>
    <template v-slot:table>
      <div :style="tableStyle">
        <a-table rowKey="id" :columns="columns" :dataSource="roleListInfo" :pagination="false">
          <template slot="remark" slot-scope="text">
            <p class="hiddenMore">
              <a-tooltip placement="left">
                <template slot="title">
                  <span>{{ text }}</span>
                </template>
                <span>{{ text }}</span>
              </a-tooltip>
            </p>
          </template>
          <template slot="operation" slot-scope="text, record">
            <a-button v-if="record.isAdmin !== 1" style="margin-right:10px;border:none;" @click="editRole(record)" title="编辑角色"><i class="uibot ub-edit"></i></a-button>
            <a-button v-if="record.isAdmin !== 1" style="margin-right:10px;border:none;" @click="removeRole(record)" title="删除角色"><i class="uibot ub-delete"></i></a-button>
          </template>
        </a-table>
        <a-pagination
          ref="aPagination"
          @change="onChangePage"
          :current="rolePageIndex"
          :total="rolePageTotals"
          :pageSize.sync="numberPages"
          :showTotal="rolePageTotals => `共 ${rolePageTotals} 条数据`"
        />
      </div>
    </template>
    <div>
      <a-button type="primary" @click="show('side')">显示side</a-button>
      <a-button type="primary" @click="show('content')">显示content</a-button>
      <a-button type="primary" @click="show('header1')">显示header1</a-button>
      <a-button type="primary" @click="show('header2')">显示header2</a-button>
      <a-button type="primary" @click="show('table')">显示table</a-button>
    </div>
  </ContentLayout1>
</template>
<script>
import roleManagerApi from '@/api/roleManager'
import ContentLayout1 from '@/layouts/ContentLayout1.vue'
import headComponent from '@/components/GlobalHeadComponent/HeadComponent'
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' }
        ]
      },
      {
        title: '0-0-2',
        key: '0-0-2'
      }
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' }
    ]
  },
  {
    title: '0-2',
    key: '0-2'
  }
]
const columns = [
  {
    title: '角色',
    dataIndex: 'roleName',
    align: 'left',
    width: '35%'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    align: 'left',
    scopedSlots: { customRender: 'remark' },
    width: '35%'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    scopedSlots: { customRender: 'operation' },
    width: '30%'
  }
]
export default {
  name: 'demo',
  components: {
    ContentLayout1,
    headComponent
  },
  watch: {
    isShowHeader1: function() {
      if (!this.isShowHeader1 && !this.isShowHeader2) {
        this.tableStyle = { position: 'relative', top: '20px' }
      } else if (this.isShowHeader1 && !this.isShowHeader2) {
        this.tableStyle = { position: 'relative', top: '20px' }
      } else {
        this.tableStyle = {}
      }
    },
    isShowHeader2: function() {
      if (!this.isShowHeader1 && !this.isShowHeader2) {
        this.tableStyle = { position: 'relative', top: '20px' }
      } else if (this.isShowHeader1 && !this.isShowHeader2) {
        this.tableStyle = { position: 'relative', top: '20px' }
      } else {
        this.tableStyle = {}
      }
    }
  },
  data: function() {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData,
      columns,
      isShowSide: true,
      isShowContent: true,
      isShowHeader1: true,
      isShowHeader2: true,
      isShowTable: true,
      tableStyle: {},
      // 当前页
      rolePageIndex: 1,
      // 页面总共多少条数
      rolePageTotals: 0,
      // 每页显示多少条数据
      numberPages: 10,
      // 所有角色列表数组
      roleListInfo: []
    }
  },
  methods: {
    show(area) {
      let vm = this
      switch (area) {
        case 'side':
          vm.isShowSide = !vm.isShowSide
          break
        case 'content':
          vm.isShowContent = !vm.isShowContent
          break
        case 'header1':
          vm.isShowHeader1 = !vm.isShowHeader1
          break
        case 'header2':
          vm.isShowHeader2 = !vm.isShowHeader2
          break
        case 'table':
          vm.isShowTable = !vm.isShowTable
          break
      }
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    // 上一页下一页切换
    onChangePage(current) {
      this.rolePageIndex = current
      this.queryAllRole()
    },
    // 查询所有的角色列表
    queryAllRole() {
      const model = { pageIndex: this.rolePageIndex, pageSize: this.numberPages }
      roleManagerApi.queryAllRoleList(model).then(res => {
        if (res.data) {
          this.roleListInfo = res.data.items
          this.rolePageTotals = res.data.totalCount
          // 去掉分页的title
          this.$nextTick(() => {
            const paginationChildrens = this.$refs.aPagination.$el.children
            for (let i = 1; i < paginationChildrens.length; i++) {
              paginationChildrens[i].removeAttribute('title')
            }
          })
        }
      })
    }
  },
  created() {
    this.queryAllRole()
  }
}
</script>
<style lang="less" scoped>
#roleTable /deep/ .ant-table-body {
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  border: 0px solid rgba(245, 247, 247, 1);
  border-radius: 8px;
}
#roleTable /deep/ .ant-table-thead > tr > th {
  padding: 16px 16px;
}
#roleTable /deep/ .ant-table-tbody > tr > td {
  padding: 6px 16px;
}
#roleTable /deep/ .ant-table-wrapper {
  border: 1px solid rgba(245, 247, 247, 1);
  border-radius: 8px;
  height: 755px;
}
#roleTable /deep/ .ant-table-content {
  border-bottom: 1px solid rgba(245, 247, 247, 1);
  height: 705px;
}
#roleTable /deep/ .ant-pagination {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: 'tnum';
  font-feature-settings: 'tnum';
  position: relative;
  top: -40px;
  left: 20px;
}
</style>
