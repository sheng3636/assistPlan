
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">组建团队</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="部门" prop="projectNum">
                <el-select v-model="queryParams.projectNum" placeholder="请选择部门" style="width:100%">
                  <el-option v-for="item in origanizationOpts" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="姓名" prop="projectName">
                <el-input v-model="queryParams.projectName" placeholder="请输入姓名" />
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
            <span class="countItem">3 人</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="showAddDialog()">新增团队成员</el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="branch" label="部门" align="center" sortable />
        <el-table-column prop="name" label="姓名" width="180" align="center" sortable />
        <el-table-column prop="sex" label="性别" width="180" align="center" sortable />
        <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
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
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <add-edit-project :dialog-visible="dialogVisible" :dialog-title="dialogTitle" @dialogClose="dialogClose"></add-edit-project>
  </div>
</template>

<script>
import addEditProject from './components/addEditTeam'
export default {
  components:{addEditProject},
  data() {
    return {
      origanizationOpts: [
        {
          value: '0',
          label: '总师办'
        },
        {
          value: '1',
          label: '办公室'
        }
      ],
      total: 3,
      currentPage: 0,
      pageSize: 10,
      queryParams: {
        pageSize: 10,
        page: 1,
        projectNum: '',
        projectName: '',
        projectLeader: '',
        projectTime: ''
      },
      projectData: [
        {
          branch: 'XX部门',
          name: '蔡骏',
          sex: '男',
          phone: '18954826597'
        },
        {
          branch: 'XXX部门',
          name: '顾斌',
          sex: '男',
          phone: '18954586700'
        },
        {
          branch: 'XXX部门',
          name: '王红',
          sex: '女',
          phone: '13083445698'
        }
      ],
      dialogVisible:false,// 是否弹出新增编辑弹窗
      dialogTitle:'新增团队成员',// 弹窗标题
    }
  },
  mounted() {},
  methods: {
    // 弹出新增弹窗
    showAddDialog() {
      this.dialogTitle = '新增团队成员'
      this.dialogVisible = true
    },
    // 关闭新增编辑弹窗
    dialogClose() {
      this.dialogVisible = false
    },
    editClick(row) {
      console.log(row)
    },
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
    // 查询
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('查询')
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
