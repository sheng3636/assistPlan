
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">项目管理</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="大纲类型" prop="outlineType">
                <el-select v-model="queryParams.outlineType" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option
                    v-for="item in outlineOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
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

      <div class="main-wraper">
        <div class="main-header clearfix">
          <el-row>
            <el-col :md="4" class="tableRow">
              <span class="countItem">全部大纲</span>
              <span class="countItem">最近使用</span>
            </el-col>
            <el-col :md="4" :offset="13" class="tableRow">
              <span class="sortItem active">日期</span>
              <span class="sortItem">名称</span>
              <span class="sortItem">大小</span>
            </el-col>
            <el-col :md="3" class="tableBtnGroup">
              <el-button type="success" size="mini">上传</el-button>
              <el-button type="primary" size="mini">新建</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="main-content">
          <!--列表-->
          <div class="outlineWrp">
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划编制大纲</h3>
                <p class="date">2019-12-21  12:21:12</p>
              </div>

              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="8"><el-button type="success" size="mini" @click="jumpROuter('Tinymce',{})">打开</el-button></el-col>
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
      queryParams: {
        pageSize: 10,
        page: 1,
        outlineType: '',
        outlineName: ''
      },
      outlineOption: [{
        value: 0,
        label: '城市规划项目'
      }, {
        value: 1,
        label: '商业规划项目'
      }]
    }
  },
  mounted() {

  },
  methods: {
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
  .sortItem{
    display: block;
    width: 90px;
    line-height: 35px;
    text-align: center;
    color: #000;
    font-size: 16px;
    cursor: pointer;
    &.active{
      color: rgb(101, 206, 167);
      font-weight: bold;
      border-bottom: 2px solid rgb(101, 206, 167);
    }
  }
}
.tableBtnGroup{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 11px;
}
.outlineWrp{
  padding: 10px;
}
.outlineItem{
  width: 405px;
  height: 160px;
  border:2px solid rgb(101, 206, 167);
  border-radius: 10px;
  background: url('../../assets/images/documentTypeIcon.png') no-repeat 20px 20px;
  background-size: 80px 80px;
  .outlineInfo{
    margin-top: 35px;
    margin-left: 105px;
    .date{
      margin-top: 5px;
      font-size: 15px;
      color:rgb(153, 153, 153);
    }
  }
}
.operationRow{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px auto 5px auto;
  text-align: center;
}
</style>
