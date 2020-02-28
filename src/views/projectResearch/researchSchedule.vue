
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
            <el-button type="primary" size="mini" @click="showSchedleDialog">新建调研日程</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="projectNum" label="调研地点" width="220" align="center" sortable />
        <el-table-column prop="projectInnerNum" label="调研时间" width="180" align="center" sortable />
        <el-table-column prop="projectOuterNum" label="参与人员" align="center" sortable />
        <el-table-column fixed="right" label="操作" align="center" width="180">
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
      <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <!-- 新增修改调研日程弹窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="scheduleVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" width="60%">
      <el-form ref="scheduleForm" :model="scheduleForm" label-width="80px" label-position="top">
        <el-row>
          <el-col :span="11">
            <el-form-item label="调研时间" prop="scheduleTime">
              <el-date-picker v-model="scheduleForm.scheduleTime" type="datetimerange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="调研地址" prop="scheduleAddress">
              <el-input v-model="scheduleForm.scheduleAddress" placeholder="请输入内容"></el-input>
              <!-- <ul class="searchPanel">
                
              </ul> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="调研人员" prop="schedulePeople">
              <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入姓名"
                v-model="scheduleForm.schedulePeople" :data="transferData" :titles="['可选', '已选']" @change="handleChange"
                style="display: flex; align-items: center; justify-content: space-between;">
              </el-transfer>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <div id="map" style="width:100%;height:351px;"></div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit('createForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transferData: [
        {
          label: '徐萌-办公室',
          key: '办公室'
        },
        {
          label: '范玲-能源与环境处',
          key: '能源与环境处'
        },
        {
          label: '张颖-总师办',
          key: '总师办'
        },
        {
          label: '柴贤龙-城乡建设处',
          key: '城乡建设处'
        },
        {
          label: '潘毅刚-综合处',
          key: '综合处'
        }
      ],
      dialogTitle: '新增日程', // 新增修改调研日程弹窗标题
      scheduleVisible: false, // 控制新增修改调研日程弹窗显影
      scheduleForm: {
        scheduleTime: [],
        scheduleAddress: '',
        schedulePeople: []
      }, // 新增修改调研日程表单
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
      ],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  mounted() {},
  methods: {
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
.searchPanel {
  margin-top: 5px;
  width: 100%;
  height: 200px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
