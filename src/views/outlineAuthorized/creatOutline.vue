
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">大纲管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="大纲类型" prop="outline_type">
                <el-select v-model="queryParams.outline_type" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option v-for="item in outlineOpts" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="大纲名称" prop="outline_name">
                <el-input v-model="queryParams.outline_name" />
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
          <el-col :span="1">大纲列表</el-col>
          <el-col :md="15" class="tableRow">
            <span class="countItem blue">全部大纲</span>
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
          <div class="outlineItem" v-for="(item,index) in outlineList" :key="index">
            <div class="outlineInfo">
              <h3 v-if="!item.isEdit" :ref="'outlineItem' + item.outlineid">{{item.outlinename}}</h3>
              <!-- <h3>{{item.outlinename}}</h3> -->
              <el-input v-else autofocus v-model="item.outlinename" @blur.stop="NodeBlur(item)" style="width:93%;">
              </el-input>
              <p class="date">{{dateFormat(item.createtime)}}</p>
            </div>

            <el-row class="operationRow">
              <el-col :md="8">{{item.paraname}}</el-col>
              <el-col :md="8">
                <el-button type="success" size="mini" @click="jumpROuter('Tinymce',item.outlineid)">打开</el-button>
              </el-col>
              <el-col :md="8">
                <el-dropdown>
                  <el-button type="primary" size="mini">
                    更多菜单<i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>打开</el-dropdown-item>
                    <el-dropdown-item>打印</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteOutline(item)">删除</el-dropdown-item>
                    <el-dropdown-item @click.native="renameOutline(item)">重命名</el-dropdown-item>
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
    <!-- 新建大纲 -->
    <el-dialog title="新建大纲" :visible.sync="createVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      width="25%">
      <el-form ref="createForm" :model="createFrom" :rules="createRules" label-width="80px" label-position="top">
        <el-form-item label="大纲名称" prop="outline_name">
          <el-input v-model="createFrom.outline_name" placeholder="请输入大纲名称" />
        </el-form-item>
        <el-form-item label="大纲类型" prop="outline_type">
          <el-select v-model="createFrom.outline_type" filterable placeholder="请选择一项" style="width: 100%">
            <el-option v-for="item in outlineOpts" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogClose">取 消</el-button>
        <el-button type="primary" @click="createSubmit('createForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { apiGet, apiPostCustom, apiPost } from '@/utils/axios'
export default {
  data() {
    return {
      outlineOpts: [],
      total: 0, // 项目表格总数
      currentPage: 1, // 表格当前页码
      pageSize: 10, // 表格整页大小
      queryParams: {
        // 表格查询参数
        Page: 1,
        PageSize: 10,
        pid: '',
        outline_type: '',
        outline_name: ''
      },
      outlineList: [], //大纲列表
      createVisible: false, // 是否显示新建大纲弹窗
      createFrom: {
        pid: '',
        outline_type: '',
        outline_name: ''
      },
      createRules: {
        outline_type: [
          { required: true, message: '请选择大纲类型', trigger: 'change' }
        ],
        outline_name: [
          { required: true, message: '请输入大纲名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    // 查询大纲类型
    apiGet(this, '/outline/findOutlineType').then(res => {
      this.outlineOpts = res.data
    })
    this.queryOutLineListFn()
  },
  methods: {
    // 查询大纲列表
    queryOutLineListFn() {
      let params = this.queryParams
      params.pid = this.$store.state.projectInfo.pid
      apiGet(this, '/outline/queryOutline', params).then(res => {
        this.total = res.total
        this.outlineList = res.data
      })
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
      this.queryOutLineListFn()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.queryParams.Page = val
      this.queryOutLineListFn()
    },
    // 提交创建大纲表单并清空表单
    createSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createFrom.pid = this.$store.state.projectInfo.pid
          apiPost(this, 'outline/saveOutline', this.createFrom).then(res => {
            this.queryOutLineListFn()
            this.createDialogClose()
          })
        } else {
          return false
        }
      })
    },
    // 修改大纲名称
    renameOutline(item) {
      if (!item.isEdit) {
        this.$set(item, 'isEdit', true)
      }
    },
    // 输入框失焦
    NodeBlur(item) {
      if (item.isEdit) {
        this.$set(item, 'isEdit', false)
        let params = {
          outline_id: item.outlineid,
          outline_name: item.outlinename
        }
        apiPost(this, '/outline/EndOutline', params).then(res => {
          this.queryOutLineListFn()
        })
      }
    },
    deleteOutline(item) {
      let params = {
        outline_id: item.outlineid
      }
      apiPostCustom(
        this,
        '/outline/deleteOutline',
        params,
        '确认删除该记录吗'
      ).then(res => {
        this.queryOutLineListFn()
      })
    },
    // 打开文档进行编辑
    jumpROuter(name, outlineid) {
      this.$router.push({ path: '/outlineAuthorized/' + name, query: {outlineid:outlineid} })
    },
    // 打开新建大纲列表
    createOutline() {
      this.createVisible = true
    },
    // 关闭新建大纲弹窗
    createDialogClose() {
      this.$refs.createForm.resetFields()
      this.createVisible = false
    },
    // 查询大纲列表
    queryList: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.queryOutLineListFn()
        } else {
          return false
        }
      })
    },
    // 重置大纲列表
    resetData(formName) {
      this.$refs[formName].resetFields()
      this.queryOutLineListFn()
    }
  }
}
</script>
