
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">任务分工</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="段落内容" prop="projectNum">
                <el-input v-model="queryParams.projectNum" />
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="撰写负责人" prop="projectName">
                <el-input v-model="queryParams.projectName" />
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
          <el-col :md="6">
            任务分工列表
          </el-col>
          <el-col :md="4" :offset="14" class="tableBtnGroup">
            <el-button type="primary" size="mini">新增团队成员</el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <el-table
        :data="projectData"
        highlight-current-row
        style="width: 100%;"
        border
      >
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="section" label="编写段落" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="leader" label="编写负责人" width="180" align="center" sortable />
        <el-table-column prop="time" label="时间节点" width="180" align="center" sortable />
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
      total: 4,
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
          section: '发展基础和发展环境',
          leader: '杜健',
          time: '2019-12-21 12:21:12'
        },
        {
          section: '指导思想、基本要求和发展目标',
          leader: '常云峰',
          time: '2019-12-21 12:21:12'
        },
        {
          section: '扎实推进山海宜居美城建设',
          leader: '王红',
          time: '2019-10-11 10:20:00'
        },
        {
          section: '着力推进国际智造名城建设',
          leader: '阿杰',
          time: '2019-11-01 9:25:00'
        }
      ]
    }
  },
  mounted() {

  },
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
.tableRow{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3px;
  .countItem{
    display: block;
    width: 120px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    background:rgba(22, 155, 213, 1);
    &:nth-child(2){
      background: rgba(102, 204, 0, 1);
    }
    &:nth-child(3){
      background: rgba(102, 102, 102, 1);
    }
  }
}
.tableBtnGroup{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 11px;
}
.sss{
  display: flex;
  justify-content: space-between;
  button{
    margin-right: 5px;
  }
}
</style>
