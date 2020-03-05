
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
              <el-form-item label="项目名称" prop="pname">
                <el-input v-model="queryParams.pname" placeholder="请输入项目名称" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目负责人" prop="project_leader">
                <el-input v-model="queryParams.project_leader" placeholder="请输入负责人" />
              </el-form-item>
            </el-col>
            <el-col :md="4">
              <el-form-item label="项目创建时间" prop="createtime">
                <el-date-picker v-model="queryParams.createtime" type="datetime" value-format="timestamp" placeholder="选择日期时间"
                  style="width:100%">
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
            <span class="countItem blue">全部 {{total}}</span>
            <span class="countItem cyan">已完成 {{completeCOunt}}</span>
            <span class="countItem gray">进行中 {{inHandCOunt}}</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="addEditClick('add')">新建</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="projectTableData" border fit highlight-current-row>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="pname" label="项目名称" width="220" align="center" sortable />
        <el-table-column prop="serialnumber" label="项目内部编号" width="220" align="center" sortable />
        <el-table-column prop="externalnumber" label="项目外部编号" width="220" align="center" sortable />
        <el-table-column prop="maincontent" label="项目主要内容" :show-overflow-tooltip="true" align="center" sortable />
        <el-table-column prop="projectleader" label="项目负责人" :show-overflow-tooltip="true" align="center" sortable>
          <template slot-scope="scope">
            {{ fomartNameArrFn('name',scope.row.projectleader) }}
          </template>
        </el-table-column>
        <el-table-column prop="" label="创建时间" width="220" align="center" sortable>
            <template slot-scope="scope">
              {{ dateFormat(scope.row.createtime) }}
            </template>
        </el-table-column>
        <el-table-column prop="projectstatus" label="项目状态" width="150" align="center" sortable />
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toProject(scope.row)">进入</el-button>
            <el-dropdown trigger="click">
              <el-button type="success" size="mini" class="tab_select">
                更多菜单
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="detailClick(scope.row)">详 情</el-dropdown-item>
                <el-dropdown-item @click.native="addEditClick(scope.row)">编 辑</el-dropdown-item>
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
    <add-project :dialog-visible="dialogVisible" :addEditForm="addEditForm" :dialog-title="dialogTitle"
      @dialogClose="dialogClose" :queryProjectTableFn="queryProjectTableFn"></add-project>
    <project-detail :detailVisible="detailVisible" :detail-form="detailForm" @dialogClose="dialogClose">
    </project-detail>
  </div>
</template>

<script>
import { apiGet, apiPostCustom  } from '@/utils/axios'
import addProject from './components/addProject'
import projectDetail from './components/projectDetail'
export default {
  components: { addProject, projectDetail },
  data() {
    return {
      total: 0, // 项目表格总数
      currentPage: 1, // 表格当前页码
      pageSize: 10, // 表格整页大小
      queryParams: {
        // 表格查询参数
        Page: 1,
        PageSize: 10,
        pid: '',
        pname: '',
        createtime: '',
        project_leader: ''
      },
      projectTableData: [], // 表格数据
      completeCOunt:null,// 已完成项目总数
      inHandCOunt:null,// 进行中项目总数
      detailVisible: false, // 是否弹出详情弹窗
      addEditForm: {
        // 新增编辑项目表单参数
        pname: '',
        serial_number: '',
        external_number: '',
        main_content: '',
        timeDuring:[],
        project_leader: []
      },
      detailForm: {},// 详情数据
      dialogVisible: false, // 是否弹出新增编辑弹窗
      dialogTitle: '新增项目' // 弹窗标题
    }
  },
  mounted() {
    this.queryProjectTableFn()
  },
  methods: {
    // 查询表格数据
    queryProjectTableFn() {
      let params = this.queryParams
      apiGet(this, '/project/query_project', params).then(
        res => {
          this.total = res.total
          this.projectTableData = res.data.from
          this.completeCOunt = res.data.project[2].count
          this.inHandCOunt = res.data.project[1].count
          // this.currentPage = res.pageNum
          // this.pageSize = res.data.pageSize
        }
      )
    },
    // 负责人格式化
    fomartNameArrFn(flag,data) {
      let nameArr = []
      let idArr = []
      for (let i = 0; i < data.length; i++) {
        nameArr.push(data[i].name)
        idArr.push(data[i].id)
      }
      if(flag === 'name'){
        return nameArr.join()
      } else {
        return idArr
      }
    },
    // 时间格式化
    dateFormat(dateTime) {
      var date = new Date(dateTime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        sdate = ('0' + date.getDate()).slice(-2),
        hour = ('0' + date.getHours()).slice(-2),
        minute = ('0' + date.getMinutes()).slice(-2),
        second = ('0' + date.getSeconds()).slice(-2)
      return (
        year +
        '-' +
        month +
        '-' +
        sdate +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      )
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.queryProjectTableFn()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.queryParams.Page = val
      this.queryProjectTableFn()
    },
    // 搜索栏查询表格
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.queryProjectTableFn()
        } else {
          return false
        }
      })
    },
    // 搜索栏重置表格
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.queryProjectTableFn()
    },
    // 进入项目
    toProject(row) {
      let info = row
      info.menueDisable = false
      this.$store.commit('SET_MENUE_DISABLE', info)
      this.$router.push({ path: '/organizationPlan/creatTeam' })
    },
    // 详情弹窗
    detailClick(row) {
      this.detailVisible = true
      this.detailForm = Object.assign({}, row)
      this.detailForm.projectleader = this.fomartNameArrFn('name',row.projectleader)
    },
    // 删除项目
    deleteClick(row) {
      let params = {
        pid:row.pid
      }
      apiPostCustom(this, '/project/delete_project',params,'确认删除该记录吗').then(res => {
        this.queryProjectTableFn()
      })
    },
    // 弹出新增编辑弹窗
    addEditClick(row) {
      this.dialogVisible = true
      if (row !== 'add') {
        this.dialogTitle = '编辑项目'
        this.addEditForm = {
          pid:row.pid,
          pname: row.pname,
          serial_number: row.serialnumber,
          external_number: row.externalnumber,
          main_content: row.maincontent,
          timeDuring:[row.createtime,row.endtime],
          project_leader: this.fomartNameArrFn('id',row.projectleader)
        }
      } else {
        this.dialogTitle = '新增项目'
        this.addEditForm = {}
      }
    },
    // 关闭新增编辑详情弹窗
    dialogClose() {
      this.dialogVisible = false
      this.detailVisible = false
    }
  }
}
</script>
