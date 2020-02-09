
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">项目管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="姓名" prop="projectNum">
                <el-input v-model="queryParams.projectNum" />
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="时间" prop="projectName">
                <el-date-picker
                  v-model="queryParams.projectName"
                  style="width:100%"
                  type="datetime"
                  placeholder="选择日期时间"
                />
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="地点" prop="projectLeader">
                <el-input v-model="queryParams.projectLeader" />
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="4">
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
            <span class="countItem">全部 1</span>
            <span class="countItem">已完成 1</span>
            <span class="countItem">进行中 0</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini">新建调研日程</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="projectData"
        highlight-current-row
        style="width: 100%;"
        border
      >
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="projectNum" label="调研地点" width="220" align="center" sortable />
        <el-table-column prop="projectInnerNum" label="调研时间" width="180" align="center" sortable />
        <el-table-column prop="projectOuterNum" label="参与人员" align="center" sortable />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="success" size="mini" class="tab_select">
                更多菜单<i class="el-icon-arrow-down el-icon--right" />
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 1,
      currentPage: 0,
      pageSize: 10,
      queryParams: {
        pageSize: 10,
        page: 1,
        projectNum: '',
        projectName: '',
        projectLeader: ''
      },
      projectData: [
        {
          projectNum: 'XXX市XXX省XXX路XXX号 ',
          projectInnerNum: '2019-12-21  12:12:21',
          projectOuterNum: '阿杰、蔡骏、常云峰、杜鹏、顾斌'
        }
      ]
    }
  },
  mounted() {},
  methods: {
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
