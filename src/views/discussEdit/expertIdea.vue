
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">专家意见</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="4">
              <el-form-item label="专家姓名" prop="projectNum">
                <el-input v-model="queryParams.projectNum" placeholder="请输入项目编号" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="专家单位" prop="projectName">
                <el-input v-model="queryParams.projectName" placeholder="请输入项目名称" />
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
      <div class="main-header">意见列表</div>
      <div class="main-content">
        <el-table :data="projectData" border fit highlight-current-row>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="projectName" label="专家姓名" width="220" align="center" sortable />
        <el-table-column prop="projectMemo" label="性别" :show-overflow-tooltip="true" align="center" sortable />
        <el-table-column prop="projectLeader" label="专家单位" width="150" align="center" sortable />
        <el-table-column prop="projectTime" label="联系方式" width="150" align="center" sortable />
        <el-table-column prop="projectStatus" label="专家意见" :show-overflow-tooltip="true" align="center" sortable />
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="success" size="mini" class="tab_select">
                更多菜单
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="detailClick(scope.row)">详 情</el-dropdown-item>
                <el-dropdown-item @click.native="deleteClick(scope.row)">删 除</el-dropdown-item>
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
    </div>
    <el-dialog title="专家意见" :visible.sync="createVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      width="55%">
      <div class="ideaBody">
        <div class="content">
          <p>非官方大哥党规党法非官方大哥党规党法非官方大哥党规党法非官方大哥党规党法非官方大哥党规党法非官方大哥党规党法</p>
          <p class="timeRow">2020-12-21  12:21:12</p>
        </div>
        <div class="expretInfo">
          <span class="name">张三</span>
          <span class="sex">男</span>
          <span class="company">XXX支撑单位</span>
          <span class="phone">18952575801</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createVisible: false, // 是否显示新建大纲弹窗
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
          projectMemo: '台州市十四五时期国民经济和社会发展规划编制',
          projectLeader: '杨松',
          projectTime: '非官方大哥',
          projectStatus: '已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成'
        },
        {
          projectName: '杭州市十四五发展规划纲要 ',
          projectMemo: '杭州市十四五时期国民经济和社会发展规划编制',
          projectLeader: '王志',
          projectTime: '的发射点',
          projectStatus: '已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成已完成'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    detailClick(row) {
      this.createVisible = true
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
    dialogClose() {
      this.createVisible = false
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
.ideaBody{
  margin: 0 auto;;
  .content{
    max-height: 450px;
    border: 1px solid #ccc;
    p{
      padding: 5px;
      &.timeRow{
        height: 14px;
        text-align: center;
        border-top: 1px solid #ccc
      }
    }
  }
  .expretInfo{
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-top: 10px;
    height: 65px;
    border: 1px solid #ccc;
    font-size: 20px;
    color: #333;
    .name{
      margin-right: 15px;
      font-size: 30px;
      font-weight: bold;
      color: #000;
    }
    .sex,.company,.phone{
      margin-right: 20px;
    }
  }
}
</style>
