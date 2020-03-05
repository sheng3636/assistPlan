<template>
  <el-dialog title="项目详情" :visible.sync="detailVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="45%">
    <el-form ref="dialogForm" :model="detailForm" label-width="80px" label-position="top">
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目名称" prop="pname">
            <el-input v-model="detailForm.pname" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目负责人" prop="projectleader">
            <el-input v-model="detailForm.projectleader" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="项目内部编号" prop="serialnumber">
            <el-input v-model="detailForm.serialnumber" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目外部编号" prop="externalnumber">
            <el-input v-model="detailForm.externalnumber" readonly />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="项目主要内容" prop="maincontent">
            <el-input v-model="detailForm.maincontent" readonly type="textarea" :rows="5" />
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
    detailVisible: {
      type: Boolean,
      defalut: false
    },
    detailForm: {
      type: Object,
      defalut: {}
    }
  },
  mounted(){
  },
  methods: {
    // 关闭弹窗时向父组件发送一个事件
    dialogClose() {
      this.$emit('dialogClose')
    }
  }
}
</script>