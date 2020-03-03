
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
            <el-button type="primary" size="mini" @click="selectDocu">选择文档</el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="section" label="编写段落" :show-overflow-tooltip="true" align="center" />
        <el-table-column prop="leader" label="编写负责人" width="180" align="center" sortable />
        <el-table-column prop="time" label="时间节点" width="180" align="center" sortable />
        <el-table-column fixed="right" label="操作" align="center" width="180">
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
      <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="任务分工" :visible.sync="divisionVisible" :close-on-click-modal="false" :close-on-press-escape="false"
      width="55%">
      <div class="divisinWrap">
        <div class="docuWrap" v-if="docuOrPerson">
          <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top" class="searchWrap">
            <el-input placeholder="请输入文档名称" v-model="input3" class="docuInput">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form>
          <el-row>
            <el-col :md="4" class="tableRow">请选择文档</el-col>
            <el-col :md="4" :offset="16" class="tableRow">
              <span class="sortItem active">日期</span>
              <span class="sortItem">名称</span>
              <span class="sortItem">大小</span>
            </el-col>
          </el-row>
          <div class="outlineWrp">
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划编制大纲</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>

              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="16">
                  <el-button type="success" size="mini" @click="checkedDocu">选择</el-button>
                </el-col>
              </el-row>
            </div>
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划编制大纲</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>

              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="16">
                  <el-button type="success" size="mini" @click="checkedDocu">选择</el-button>
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
        <div class="personWrap" v-if="!docuOrPerson">
          <h3 class="checkDocuName">XXX城市道路规划大纲V2</h3>
          <el-table :data="personData" highlight-current-row style="width: 100%;" border>
            <el-table-column type="index" width="65" label="序号" align="center" />
            <el-table-column prop="section" label="编写段落" :show-overflow-tooltip="true" align="center" />
            <el-table-column prop="leader" label="选择人员" width="200" align="center">
              <template slot-scope="scope">
                <el-select v-model="value" placeholder="请选择">
                  <el-option v-for="item in scope.row.person" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="时间节点" width="260" align="center">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.time" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="docunBack" v-if="!docuOrPerson">上一步</el-button>
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit" v-if="!docuOrPerson">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docuOrPerson: true,
      personData: [
        {
          section: '发展基础和发展环境',
          person: [
            {
              value: 0,
              label: '杜健'
            },
            {
              value: 1,
              label: '常云峰'
            }
          ],
          time: ''
        }
      ],
      input3: '',
      divisionVisible: false, // 是否显示分工弹窗
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
  mounted() {},
  methods: {
    selectDocu() {
      this.divisionVisible = true
    },
    checkedDocu() {
      this.docuOrPerson = false
    },
    docunBack() {
      this.docuOrPerson = true
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

    dialogClose() {
      this.divisionVisible = false
      this.docuOrPerson = true
    },
    onSubmit() {
      this.divisionVisible = false
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
.searchWrap {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;

  .docuInput {
    width: 90%;
  }
}
.outlineWrp {
  display: flex;
  justify-content: space-around;
}
.checkDocuName {
  font-size: 20px;
  margin: 0px auto 15px auto;
  text-align: center;
}
</style>
