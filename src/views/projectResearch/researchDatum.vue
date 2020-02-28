
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">调研资料</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="文件类型" prop="outlineType">
                <el-select v-model="queryParams.outlineType" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option v-for="item in outlineOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="文件名称" prop="outlineName">
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
          <el-col :md="4" class="tableRow">
            <span class="countItem blue">全部大纲</span>
            <span class="countItem cyan">最近使用</span>
          </el-col>
          <el-col :md="4" :offset="13" class="tableRow">
            <span class="sortItem active">日期</span>
            <span class="sortItem">名称</span>
            <span class="sortItem">大小</span>
          </el-col>
          <el-col :md="3" class="tableBtnGroup">
            <el-button type="success" size="mini">上传</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <!--列表-->
        <div class="filesWrap">
          <div class="fileItem">
            <div class="fileTop">
              <i class="iconfont iconword"></i>
              <i class="el-icon-download"></i>
              <el-dropdown class="rightDots">
                <span class="el-dropdown-link">...</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打开</el-dropdown-item>
                  <el-dropdown-item>属性</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                  <el-dropdown-item>重命名</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <p class="fileName">台州市十四五规划纲要</p>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 1,
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
          label: 'Word'
        },
        {
          value: 1,
          label: 'Excle'
        },
        {
          value: 2,
          label: 'PPT'
        },
        {
          value: 3,
          label: '图片'
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
<style lang="scss" scoped>
.filesWrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .fileItem {
    width: 100px;
    height: 160px;
    margin-right: 9px;
    margin-bottom: 9px;
    .fileTop {
      position: relative;
      width: 100px;
      height: 100px;
      border: 2px solid rgba(101, 206, 167, 1);
      border-radius: 5px;
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 34px;
      }
      .el-icon-download{
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
        cursor: pointer;
      }
      .rightDots{
        position: absolute;
        bottom: 10px;
        right: 10px;
        .el-dropdown-link {
          cursor: pointer;
          font-size: 24px;
          font-weight: bold;
          color: rgba(101, 206, 167, 1);
        }
      }
    }
    .fileName {
      text-align: center;
    }
  }
}
</style>
