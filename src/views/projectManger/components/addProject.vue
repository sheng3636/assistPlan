<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="50%">
    <el-form class="dialogBody" ref="dialogForm" :model="addEditForm" :rules="rules" label-width="80px"
      label-position="top">
      <div class="bodyLeft">
        <el-form-item label="项目名称" prop="pname">
          <el-input v-model="addEditForm.pname" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目内部编号" prop="serial_number">
          <el-select v-model="addEditForm.serial_number" placeholder="请选择项目内部编号" style="width:100%;">
            <el-option v-for="item in serialNum" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目外部编号" prop="external_number">
          <el-select v-model="addEditForm.external_number" placeholder="请选择项目外部编号" style="width:100%;">
            <el-option v-for="item in externalNum" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目时间节点" prop="timeDuring">
          <el-date-picker v-model="addEditForm.timeDuring" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="timestamp" style="width:100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="项目主要内容" prop="main_content">
          <el-input v-model="addEditForm.main_content" type="textarea" :rows="5" placeholder="请输入项目主要内容" />
        </el-form-item>
      </div>
      <div class="bodyRight">
        <p class="treeLabel"><span>*</span>项目负责人</p>
        <el-tree :data="branchData" :props="defaultProps" ref="tree" highlight-current node-key="id" show-checkbox
          default-expand-all :default-checked-keys="addEditForm.project_leader" class="treeWrap">
        </el-tree>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit('dialogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiGet, apiPost } from '@/utils/axios'
export default {
  data() {
    return {
      serialNum: [], // 项目内部编号
      externalNum: [], // 项目外部编号
      rules: {
        pname: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        serial_number: [
          { required: true, message: '请选择项目内部名称', trigger: ['blur', 'change'] }
        ],
        external_number: [
          { required: true, message: '请选择项目外部名称', trigger: ['blur', 'change'] }
        ],
        timeDuring:[
          {
            required: true, message: '项目时间节点不能为空', trigger: ['blur', 'change']
          }
        ],
        main_content: [
          { required: true, message: '请输入项目主要内容', trigger: 'blur' }
        ]
      },
      branchData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  props: {
    queryProjectTableFn: {
      type: Function,
      default: null
    },
    dialogTitle: {
      type: String,
      defalut: '新增项目'
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
    // 查询内外部编号
    apiGet(this, '/project/getProject').then(res => {
      this.serialNum = res.data.serial_number
      this.externalNum = res.data.external_number
    })
    // 查询人员清单
    apiGet(this, '/project/getUserAndDept2', { username: '' }).then(res => {
      this.branchData = res.branchData
    })
  },
  methods: {
    // 关闭弹窗时向父组件发送一个事件
    dialogClose() {
      this.$refs.dialogForm.resetFields()
      this.$emit('dialogClose')
      this.$refs.tree.setCheckedKeys([])
    },
    // 提交上传表单并清空表单
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addEditForm.project_leader = this.$refs.tree.getCheckedKeys(true)
          if (this.addEditForm.project_leader.length !== 0) {
            let url =
              this.dialogTitle === '新增项目'
                ? '/project/saveProject'
                : 'project/updateProject'
            apiPost(this, url, this.addEditForm).then(res => {
              this.queryProjectTableFn()
              this.dialogClose()
            })
          } else {
            this.$message({
              message: '负责人不能为空',
              type: 'warning'
            })
            return
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" >
</style>
<style lang="scss" scoped>
.dialogBody {
  display: flex;
  justify-content: space-between;
  .bodyLeft {
    width: 44%;
    height: 605px;
    background: rgba(242, 242, 242, 1);
  }
  .bodyRight {
    width: 54%;
    height: 605px;
    background: rgba(242, 242, 242, 1);
    .treeLabel {
      padding: 0 15px;
      font-size: 14px;
      color: #606266;
      font-weight: 700;
      span {
        margin-right: 4px;
        color: #f56c6c;
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