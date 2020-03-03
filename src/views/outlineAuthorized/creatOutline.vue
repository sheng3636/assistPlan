
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">大纲管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="大纲类型" prop="outlineType">
                <el-select v-model="queryParams.outlineType" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option v-for="item in outlineOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="大纲名称" prop="outlineName">
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
              <h3 v-if="!item.isEdit" :ref="'outlineItem' + item.id">{{item.name}}</h3>
              <el-input v-else autofocus v-model="item.name" @blur.stop="NodeBlur(item)"></el-input>
              <p class="date">{{item.time}}</p>
            </div>

            <el-row class="operationRow">
              <el-col :md="8">规划类</el-col>
              <el-col :md="8">
                <el-button type="success" size="mini" @click="jumpROuter('Tinymce',{})">打开</el-button>
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
      <el-form ref="createForm" :model="createFrom" :rules="rules" label-width="80px" label-position="top">
        <el-form-item label="大纲名称" prop="outLineName">
          <el-input v-model="createFrom.outLineName" placeholder="请输入大纲名称" />
        </el-form-item>
        <el-form-item label="大纲类型" prop="outlineType">
          <el-select v-model="createFrom.outlineType" filterable placeholder="请选择一项" style="width: 100%">
            <el-option v-for="item in outlineOption" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
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
      outlineList:[
        {
          id:'001',
          name:'台州市"十四五"规划编制大纲',
          time:'2019-12-21 12:21:12',
          isEdit: false
        },
        {
          id:'002',
          name:'台州市"三五"规划编制大纲',
          time:'2019-12-21 12:21:12',
          isEdit: false
        }
      ],
      createVisible: false, // 是否显示新建大纲弹窗
      total: 2,
      currentPage: 0,
      pageSize: 10,
      createFrom: {
        outLineName: '',
        outlineType: ''
      },
      rules: {
        outLineName: [
          { required: true, message: '请输入大纲名称', trigger: 'blur' }
        ],
        outlineType: [
          { required: true, message: '请选择大纲类型', trigger: 'change' }
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
    // 修改大纲名称
    renameOutline(item){
      if (!item.isEdit) {
        this.$set(item, 'isEdit', true)
      }
    },
    // 输入框失焦
    NodeBlur(item) {
      if (item.isEdit) {
        this.$set(item, 'isEdit', false)
      }
    },
    jumpROuter(name, query) {
      // this.$router.push({ name:name, params:params})
      this.$router.push({ path: '/outlineAuthorized/' + name, query: query })
    },
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
