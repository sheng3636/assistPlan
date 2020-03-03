
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">方案管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="方案名称" prop="outlineName">
                <el-input v-model="queryParams.outlineName" />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="4">
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
      <div class="main-header clearfix">
        <el-row>
          <el-col :span="1">方案列表</el-col>
          <el-col :md="15" class="tableRow">
            <span class="countItem blue">全部方案</span>
            <span class="countItem cyan">最近使用</span>
          </el-col>
          <el-col :md="4" class="tableRow">
            <span class="sortItem active">日期</span>
            <span class="sortItem">名称</span>
            <span class="sortItem">大小</span>
          </el-col>
          <el-col :md="4" class="tableBtnGroup">
            <el-button type="success" size="mini">上传</el-button>
            <el-button type="primary" size="mini" @click="createOutline">新建</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <!--列表-->
        <div class="outlineWrp">
          <div class="outlineItem">
            <div class="outlineInfo">
              <h3>台州市"十四五"规划纲要调研方案</h3>
              <p class="date">2019-12-21 12:21:12</p>
            </div>

            <el-row class="operationRow">
              <el-col :md="8">规划类</el-col>
              <el-col :md="8">
                <el-button type="success" size="mini">打开</el-button>
              </el-col>
              <el-col :md="8">
                <el-dropdown>
                  <el-button type="primary" size="mini">
                    更多菜单<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>打开</el-dropdown-item>
                    <el-dropdown-item>打印</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                    <el-dropdown-item>重命名</el-dropdown-item>
                    <el-dropdown-item>属性</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
        </div>
        <!--分页-->
        <div class="block">
          <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>

    <el-dialog title="新建方案" :visible.sync="createVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      width="25%">
      <el-form ref="createForm" :model="createFrom" :rules="rules" label-width="80px" label-position="top">
        <el-form-item label="方案名称" prop="programName">
          <el-input v-model="createFrom.programName" placeholder="请输入方案名称" />
        </el-form-item>
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
      createVisible: false, // 是否显示新建方案弹窗
      total: 1,
      currentPage: 0,
      pageSize: 10,
      createFrom: {
        outLineName: '',
        outlineType: ''
      },
      rules: {
        programName: [
          { required: true, message: '请输入方案名称', trigger: 'blur' }
        ]
      },
      queryParams: {
        pageSize: 10,
        page: 1,
        outlineType: '',
        outlineName: ''
      },
      outlineOption: [
        {
          value: 0,
          label: '城市规划项目'
        },
        {
          value: 1,
          label: '商业规划项目'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    handleSizeChange(val) {
      this.params.pageSize = val
      this.getAreaList(this.params)
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getAreaList(this.params)
    },
    createOutline() {
      this.createVisible = true
    },
    dialogClose() {
      this.createVisible = false
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
