
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
                <el-date-picker v-model="queryParams.projectName" style="width:100%" type="datetime"
                  placeholder="选择日期时间" />
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
            <span class="countItem blue">全部 1</span>
            <span class="countItem cyan">已完成 1</span>
            <span class="countItem gray">进行中 0</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="addEditClick('add')">新建调研日程</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="scheduleAddress" label="调研地点" width="420" align="center" sortable>
          <template slot-scope="scope">
            {{ scope.row.scheduleAddress.text }}
          </template>
        </el-table-column>
        <el-table-column prop="scheduleTime" label="调研时间" width="220" align="center" sortable >
          <template slot-scope="scope">
            {{ dateFormat(scope.row.scheduleTime[0]) }}
          </template>
        </el-table-column>
        <el-table-column prop="schedulePeople" label="参与人员" align="center" sortable>
          <template slot-scope="scope">
            {{scope.row.schedulePeople.text}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <el-button type="success" size="mini" class="tab_select">
                更多菜单<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addEditClick(scope.row)">编 辑</el-dropdown-item>
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
    <addEditSchedule :dialogVisible="scheduleVisible" :addEditForm="addEditForm" :dialogTitle="dialogTitle"
      @dialogClose="dialogClose"></addEditSchedule>
  </div>
</template>

<script>
import addEditSchedule from './addEditSchedule'
export default {
  components: { addEditSchedule },
  data() {
    return {
      dialogTitle: '新增日程', // 新增修改调研日程弹窗标题
      scheduleVisible: false, // 控制新增修改调研日程弹窗显影
      addEditForm: {
        // 新增修改调研日程表单
        scheduleTime: [],
        scheduleAddress: {
          text: '',
          location: []
        },
        schedulePeople: {
          text: '',
          id: []
          // text:'徐萌，刘堂福',
          // id:['1-1-1','1-1-2']
        }
      },
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
          scheduleTime: ['1582951207', '1582951207'],
          scheduleAddress: {
            text: '秀怡苑',
            location: []
          },
          schedulePeople: {
            text: '徐萌，刘堂福',
            id: ['1-1-1', '1-1-2']
          }
        }
      ]
    }
  },
  mounted() {},
  methods: {
    // 时间格式化
    dateFormat(dateTime) {
      var date = new Date(dateTime * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    showSchedleDialog() {
      this.scheduleVisible = true
    },
    dialogClose() {
      this.scheduleVisible = false
    },
    // 提交上传表单并清空表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
    },
    // 弹出新增编辑弹窗
    addEditClick(row) {
      this.scheduleVisible = true
      if (row !== 'add') {
        this.dialogTitle = '编辑日程'
        this.addEditForm = {
          scheduleTime: row.scheduleTime,
          scheduleAddress: row.scheduleAddress,
          schedulePeople: row.schedulePeople
        }
      } else {
        this.dialogTitle = '新增日程'
        this.addEditForm = {
          scheduleTime: [],
          scheduleAddress: {
            text: '',
            location: []
          },
          schedulePeople: {
            text: '',
            id: []
          }
        }
      }
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
