<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="45%">
    <el-form class="dialogBody" ref="dialogForm" :model="addForm" :rules="rules" label-width="80px" label-position="top">
      <div class="bodyLeft">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="addForm.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目内部编号" prop="projectInnerNum">
          <el-input v-model="addForm.projectInnerNum" placeholder="请输入项目内部编号" />
        </el-form-item>
        <el-form-item label="项目外部编号" prop="projectOuterNum">
          <el-input v-model="addForm.projectOuterNum" placeholder="请输入项目外部编号" />
        </el-form-item>
        <el-form-item label="项目主要内容" prop="projectMemo">
          <el-input v-model="addForm.projectMemo" type="textarea" :rows="5" placeholder="请输入项目主要内容" />
        </el-form-item>
      </div>
      <div class="bodyRight">
        <p class="treeLabel"><span>*</span>项目负责人</p>
        <el-tree :data="branchData" :props="defaultProps" ref="tree" highlight-current node-key="id" show-checkbox
          @check-change="handleCheckChange" default-expand-all class="treeWrap">
        </el-tree>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary"  @click="onSubmit('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        projectInnerNum: [
          { required: true, message: '请输入项目内部名称', trigger: 'blur' }
        ],
        projectOuterNum: [
          { required: true, message: '请输入项目外部名称', trigger: 'blur' }
        ],
        projectMemo: [
          { required: true, message: '请输入项目主要内容', trigger: 'blur' }
        ]
      },
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
  props: {
    dialogTitle: {
      type: String,
      defalut: '新增项目'
    },
    dialogVisible: {
      type: Boolean,
      defalut: false
    },
    addForm: {
      type: Object,
      defalut: {}
    }
  },
  mounted(){
    console.log(this.addForm);
    
  },
  methods: {
    handleCheckChange() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    // 关闭弹窗时向父组件发送一个事件
    dialogClose() {
      this.$refs.dialogForm.resetFields()
      this.$emit('dialogClose')
    },
    // 提交上传表单并清空表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // uploadDocu(formData).then(res => {
          //   this.$message({
          //     message: res.message,
          //     type: res.code === '0' ? 'success' : 'error'
          //   })
          //   this.$refs[formName].resetFields()
          //   this.$refs.upload.clearFiles()
          //   this.formUpload.folder_no = ''
          //   this.$emit('submitUploadDocu')
          // })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.dialogBody {
  .treeWrap {
    padding: 10px 0;
    max-height: 440px;
    overflow-y: auto;
    scrollbar-arrow-color: #f4ae21; /**/ /*三角箭头的颜色*/
    scrollbar-face-color: #333; /**/ /*立体滚动条的颜色*/
    scrollbar-3dlight-color: #666; /**/ /*立体滚动条亮边的颜色*/
    scrollbar-highlight-color: #666; /**/ /*滚动条空白部分的颜色*/
    scrollbar-shadow-color: #999; /**/ /*立体滚动条阴影的颜色*/
    scrollbar-darkshadow-color: #666; /**/ /*立体滚动条强阴影的颜色*/
    scrollbar-track-color: #666; /**/ /*立体滚动条背景颜色*/
    scrollbar-base-color: #f8f8f8; /**/ /*滚动条的基本颜色*/
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.5);
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.5);
      background-color: rgba(101, 206, 167, 0.5);
      border-radius: 3px;
    }
    &::-webkit-scrollbar {
      width: 5px; /*对垂直流动条有效*/
      height: 5px; /*对水平流动条有效*/
    }
  }
}
</style>
<style lang="scss" scoped>
.dialogBody {
  display: flex;
  justify-content: space-between;
  .bodyLeft {
    width: 44%;
    height: 500px;
    background: rgba(242, 242, 242, 1);
  }
  .bodyRight {
    width: 54%;
    height: 500px;
    background: rgba(242, 242, 242, 1);
    .treeLabel{
      padding: 0 15px;
      font-size: 14px;
      color: #606266;
      font-weight: 700;
      span{
        margin-right: 4px;
        color:#F56C6C;
        font-weight: normal;
      }
    }
    .leaderWrap {
      margin: 0 auto;
      width: 90%;
    }
  }
}
</style>