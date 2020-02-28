
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">组建团队</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="部门" prop="projectNum">
                <el-select v-model="queryParams.projectNum" placeholder="请选择部门" style="width:100%">
                  <el-option v-for="item in origanizationOpts" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="姓名" prop="projectName">
                <el-input v-model="queryParams.projectName" placeholder="请输入姓名" />
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
          <el-col :span="1">团队列表</el-col>
          <el-col :md="10" class="tableRow">
            <span class="countItem blue">3 人</span>
          </el-col>
          <el-col :md="4" :offset="9" class="tableBtnGroup">
            <el-button type="primary" size="mini" @click="showAddDialog()">新增团队成员</el-button>
          </el-col>
        </el-row>
      </div>
      <!--列表-->
      <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="65" label="序号" align="center" />
        <el-table-column prop="branch" label="部门" align="center" sortable />
        <el-table-column prop="name" label="姓名" width="180" align="center" sortable />
        <el-table-column prop="sex" label="性别" width="180" align="center" sortable />
        <el-table-column prop="phone" label="联系方式" :show-overflow-tooltip="true" align="center" />
        <el-table-column fixed="right" label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="deleteClick(scope.row.equiptId)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
    <el-dialog title="新增团队成员" :visible.sync="dialogVisible" :close-on-click-modal="false"
      :close-on-press-escape="false" :before-close="dialogClose" width="35%">
      <div class="dialogBody">
        <el-tree :data="branchData" :props="defaultProps" ref="tree"  highlight-current node-key="id" show-checkbox
          default-expand-all>
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      origanizationOpts: [
        {
          value: '0',
          label: '总师办'
        },
        {
          value: '1',
          label: '办公室'
        }
      ],
      total: 3,
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
          branch: 'XX部门',
          name: '蔡骏',
          sex: '男',
          phone: '18954826597'
        },
        {
          branch: 'XXX部门',
          name: '顾斌',
          sex: '男',
          phone: '18954586700'
        },
        {
          branch: 'XXX部门',
          name: '王红',
          sex: '女',
          phone: '13083445698'
        }
      ],
      dialogVisible: false, // 是否弹出新增编辑弹窗
      dialogTitle: '新增团队成员', // 弹窗标题
      branchData: [
        {
          id: '1',
          label: '浙江省发展规划院',
          children: [
            {
              id: '1-1',
              label: '办公室',
              children: [
                {
                  id: '1-1-1',
                  label: '徐萌'
                },
                {
                  id: '1-1-2',
                  label: '刘堂福'
                }
              ]
            },
            {
              id: '2-1',
              label: '能源与环境处',
              children: [
                {
                  id: '2-1-1',
                  label: '范玲'
                },
                {
                  id: '2-1-2',
                  label: '何恒'
                },
                {
                  id: '2-1-3',
                  label: '钟晓军'
                }
              ]
            },
            {
              id: '3-1',
              label: '总师办',
              children: [
                {
                  id: '3-1-1',
                  label: '刘竞'
                },
                {
                  id: '3-1-2',
                  label: '张颖'
                }
              ]
            },
            {
              id: '4-1',
              label: '城乡建设处',
              children: [
                {
                  id: '4-1-1',
                  label: '柴贤龙'
                },
                {
                  id: '4-1-2',
                  label: '沈帆'
                },
                {
                  id: '4-1-3',
                  label: '吴洁珍'
                }
              ]
            },
            {
              id: '5-1',
              label: '综合处',
              children: [
                {
                  id: '5-1-1',
                  label: '潘毅刚'
                },
                {
                  id: '5-1-2',
                  label: '庞亚君'
                }
              ]
            },
            {
              id: '6-1',
              label: '社会发展处',
              children: [
                {
                  id: '6-1-1',
                  label: '董波'
                },
                {
                  id: '6-1-2',
                  label: '俞莹'
                }
              ]
            },
            {
              id: '7-1',
              label: '经济研究所',
              children: [
                {
                  id: '7-1-1',
                  label: '陈文杰'
                },
                {
                  id: '7-1-2',
                  label: '何垒'
                }
              ]
            },
            {
              id: '8-1',
              label: '机关党委(纪委)',
              children: [
                {
                  id: '8-1-1',
                  label: '王质明'
                },
                {
                  id: '8-1-2',
                  label: '周智悦'
                }
              ]
            },
            {
              id: '9-1',
              label: '区域发展处',
              children: [
                {
                  id: '9-1-1',
                  label: '周世锋'
                },
                {
                  id: '9-1-2',
                  label: '沈锋'
                },
                {
                  id: '9-1-3',
                  label: '秦诗立'
                }
              ]
            },
            {
              id: '10-1',
              label: '服务中心',
              children: [
                {
                  id: '10-1-1',
                  label: '陆军'
                }
              ]
            },
            {
              id: '11-1',
              label: '产业发展处',
              children: [
                {
                  id: '11-1-1',
                  label: '童相娟'
                },
                {
                  id: '11-1-2',
                  label: '郭鹏程'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted() {},
  methods: {
    // 弹出新增弹窗
    showAddDialog() {
      this.dialogTitle = '新增团队成员'
      this.dialogVisible = true
    },
    // 关闭新增编辑弹窗
    dialogClose() {
      this.dialogVisible = false
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
    // 提交上传表单并清空表单
    onSubmit(formName) {
      console.log(this.$refs.tree.getCheckedKeys(true))
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
