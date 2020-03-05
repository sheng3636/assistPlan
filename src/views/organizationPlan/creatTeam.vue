
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">组建团队</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="部门" prop="dept_id">
                <el-select v-model="queryParams.dept_id" placeholder="请选择部门" style="width:100%">
                  <el-option v-for="item in origanizationOpts" :key="item.deptid" :label="item.deptname"
                    :value="item.deptid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="姓名" prop="staff_name">
                <el-input v-model="queryParams.staff_name" placeholder="请输入姓名" />
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="4">
              <el-form-item class="textLeft param">
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
          <el-col :span="1">团队列表</el-col>
          <el-col :md="10" class="tableRow">
            <span class="countItem blue">{{total}} 人</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="showAddDialog()">新增团队成员</el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <el-table :data="teamData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="deptname" label="部门" align="center" sortable />
        <el-table-column prop="staffname" label="姓名" width="180" align="center" sortable />
        <el-table-column prop="staffsex" label="性别" width="180" align="center" sortable />
        <el-table-column prop="staffphone" label="联系方式" :show-overflow-tooltip="true" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="deleteClick(scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="新增团队成员" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      :before-close="dialogClose" width="35%">
      <div class="dialogBody">
        <el-tree :data="branchData" :props="defaultProps" ref="tree" highlight-current node-key="id" show-checkbox
          default-expand-all :default-checked-keys="addEditForm.pid" class="treeWrap">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { apiGet, apiPost, apiPostCustom } from '@/utils/axios'
import { getStore } from '@/utils'
export default {
  data() {
    return {
      projectInfo: {}, // 项目信息
      origanizationOpts: [],
      total: 3, // 项目表格总数
      currentPage: 1, // 表格当前页码
      pageSize: 10, // 表格整页大小
      queryParams: {
        // 表格查询参数
        Page: 1,
        PageSize: 10,
        pid: '',
        dept_id: '',
        staff_name: ''
      },
      teamData: [], // 表格数据
      dialogVisible: false, // 是否弹出新增编辑弹窗
      addEditForm: {
        user: [],
        pid: ''
      },
      branchData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {
    this.projectInfo = getStore('projectInfo')
    this.queryTeamTableFn()
    // 查询部门下拉框
    apiGet(this, '/prepare/query_dept').then(res => {
      this.origanizationOpts = res.data
    })
    // 查询人员清单
    apiGet(this, '/project/getUserAndDept2', { username: '' }).then(res => {
      this.branchData = res.branchData
    })
  },
  methods: {
    // 查询表格数据
    queryTeamTableFn() {
      let params = this.queryParams
      this.queryParams.pid = this.projectInfo.pid
      apiGet(this, '/prepare/query_team', params).then(res => {
        this.total = res.total
        this.teamData = res.data
      })
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.queryTeamTableFn()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.queryParams.Page = val
      this.queryTeamTableFn()
    },
    // 提交上传表单并清空表单
    onSubmit(formName) {
      this.addEditForm.user = this.$refs.tree.getCheckedKeys(true)
      this.addEditForm.pid = this.projectInfo.pid
      apiPost(this, 'prepare/saveTeam', this.addEditForm).then(res => {
        this.queryTeamTableFn()
        this.dialogClose()
      })
    },
    // 弹出新增弹窗
    showAddDialog() {
      this.dialogVisible = true
    },
    // 关闭新增弹窗
    dialogClose() {
      this.dialogVisible = false
      this.$refs.tree.setCheckedKeys([])
    },
    // 删除项目
    deleteClick(row) {
      apiPostCustom(
        this,
        '/prepare/delete_team',
        {
          tid: row.tid
        },
        '确认删除该记录吗'
      ).then(res => {
        this.queryTeamTableFn()
      })
    },
    // 搜索栏查询表格
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.queryTeamTableFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.queryTeamTableFn()
    }
  }
}
</script>
<style lang="scss" scoped>
.treeWrap {
  padding: 10px 0;
  max-height: 500px;
  overflow-y: auto;
}
</style>
