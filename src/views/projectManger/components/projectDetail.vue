<template>
  <el-dialog title="项目详情" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="45%">
    <el-form ref="dialogForm" :model="detailForm" label-width="80px" label-position="top">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="detailForm.projectName" readonly placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目负责人" prop="projectLeader">
            <el-input v-model="detailForm.projectLeader.name" readonly placeholder="请输入项目内部编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目内部编号" prop="projectInnerNum">
            <el-input v-model="detailForm.projectInnerNum" readonly placeholder="请输入项目内部编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目外部编号" prop="projectOuterNum">
            <el-input v-model="detailForm.projectOuterNum" readonly placeholder="请输入项目外部编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目主要内容" prop="projectMemo">
            <el-input v-model="detailForm.projectMemo" readonly type="textarea" :rows="5" placeholder="请输入项目主要内容" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      defalut: false
    },
    detailForm: {
      type: Object,
      defalut: {}
    }
  },
  methods: {
    // 关闭弹窗时向父组件发送一个事件
    dialogClose() {
      this.$emit('dialogClose')
    }
  }
}
</script>