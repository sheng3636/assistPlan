
<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="55%">
    <el-form class="dialogBody" ref="dialogForm" :model="addEditForm" label-width="80px" label-position="top">
      <div class="bodyLeft">
        <el-row>
          <el-col :span="10">
            <el-form-item label="调研时间" prop="scheduleTime">
              <el-date-picker v-model="addEditForm.scheduleTime" type="datetimerange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" style="width:100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="调研地点" prop="scheduleAddress.text">
              <el-input v-model="addEditForm.scheduleAddress.text" placeholder="请输入调研地点" />
            </el-form-item>
          </el-col>
        </el-row>

      </div>
      <div class="bodyRight">
        <el-row>
          <el-col :span="10">
            <p class="treeLabel"><span>*</span>项目负责人</p>
            <el-tree :data="branchData" :props="defaultProps" ref="tree"
              :default-checked-keys='addEditForm.schedulePeople.id' highlight-current node-key="id" show-checkbox
              default-expand-all class="treeWrap">
            </el-tree>
          </el-col>
          <el-col :span="14">
            <div id="map"></div>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
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
      defalut: '新增日程'
    },
    dialogVisible: {
      type: Boolean,
      defalut: false
    },
    addEditForm: {
      type: Object,
      defalut: {}
    }
  },
  mounted() {
    console.log(this.addEditForm)
  },
  methods: {
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
<style lang="scss" scoped>
#map{
  height: 484px;
}
</style>
