
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">项目管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="4">
              <el-form-item label="项目编号" prop="projectNum">
                <el-input v-model="queryParams.projectNum" placeholder="请输入项目编号" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目名称" prop="projectName">
                <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目负责人" prop="projectLeader">
                <el-input v-model="queryParams.projectLeader" placeholder="请输入负责人" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目状态" prop="projectStatus">
                <el-select v-model="queryParams.projectStatus" placeholder="请选择项目状态" style="width:100%">
                  <el-option v-for="item in statusOpts" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目创建时间" prop="projectTime">
                <el-date-picker v-model="queryParams.projectTime" type="daterange" align="right" unlink-panels
                  range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"
                  value-format="timestamp" style="width:100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item class="param">
                <el-button type="warning" size="mini" @click="queryList('queryParams')">查询</el-button>
                <el-button type="danger" size="mini" @click="resetData('queryParams')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="main-header">
        <el-row>
          <el-col :span="1">项目列表</el-col>
          <el-col :md="10" class="tableRow">
            <span class="countItem">全部 2</span>
            <span class="countItem">已完成 1</span>
            <span class="countItem">进行中 1</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="showAddDialog()">新建</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="projectData" border fit highlight-current-row>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="projectName" label="项目名称" width="220" align="center" sortable />
        <el-table-column prop="projectInnerNum" label="项目内部编号" width="220" align="center" sortable />
        <el-table-column prop="projectOuterNum" label="项目外部编号" width="220" align="center" sortable />
        <el-table-column prop="projectMemo" label="项目主要内容" :show-overflow-tooltip="true" align="center" sortable />
        <el-table-column prop="projectLeader" label="项目负责人" width="150" align="center" sortable />
        <el-table-column prop="projectTime" label="创建时间" width="220" align="center" sortable />
        <el-table-column prop="projectStatus" label="项目状态" width="150" align="center" sortable />
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="mini">进入</el-button>
            <el-dropdown trigger="click">
              <el-button type="success" size="mini" class="tab_select">
                更多菜单
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="editClick(scope.row)">编 辑</el-dropdown-item>
                <el-dropdown-item @click.native="detailClick(scope.row)">详 情</el-dropdown-item>
                <el-dropdown-item @click.native="deleteClick(scope.row.equiptId)">删 除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <add-project :dialog-visible="dialogVisible" :add-form="addForm" :dialog-title="dialogTitle"
      @dialogClose="dialogClose"></add-project>
  </div>
</template>

<script>
import addProject from './components/addProject'
export default {
  components: { addProject },
  data() {
    return {
      statusOpts: [
        {
          value: '0',
          label: '已完成'
        },
        {
          value: '1',
          label: '进行中'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '本月',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()])
            }
          },
          {
            text: '今年至今',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近六个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 6)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      addForm: {
        projectName: '',
        projectInnerNum: '',
        projectOuterNum: '',
        projectMemo: '',
        projectLeader: ''
      },
      dialogVisible: false, // 是否弹出新增编辑弹窗
      dialogTitle: '新增项目', // 弹窗标题
      total: 2,
      currentPage: 0,
      pageSize: 10,
      queryParams: {
        pageSize: 10,
        page: 1,
        projectNum: '',
        projectName: '',
        projectLeader: '',
        projectStatus: '',
        projectTime: ''
      },
      projectData: [
        {
          projectName: '台州市十四五发展规划纲要 ',
          projectInnerNum: '2020122105498',
          projectOuterNum: '202012215986478',
          projectMemo: '台州市十四五时期国民经济和社会发展规划编制',
          projectLeader: '杨松',
          projectTime: '2019-12-21  12:21:12',
          projectStatus: '进行中'
        },
        {
          projectName: '杭州市十四五发展规划纲要 ',
          projectInnerNum: '2020122105490',
          projectOuterNum: '202012215986470',
          projectMemo: '杭州市十四五时期国民经济和社会发展规划编制',
          projectLeader: '王志',
          projectTime: '2019-11-20  10:15:14',
          projectStatus: '已完成'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    detailClick(row) {
      console.log(row)
    },
    deleteClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getAreaList(this.params)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getAreaList(this.params)
    },
    // 弹出新增弹窗
    showAddDialog() {
      this.dialogTitle = '新增项目'
      this.dialogVisible = true
      this.addForm = {}
    },
    // 弹出编辑弹窗
    editClick(row) {
      this.dialogTitle = '编辑项目'
      this.dialogVisible = true
      this.addForm = row
      console.log(row)
    },
    // 关闭新增编辑弹窗
    dialogClose() {
      this.dialogVisible = false
    },
    // 查询
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.queryParams)
        } else {
          return false
        }
      })
    },
    // 重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      console.log('重置')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
