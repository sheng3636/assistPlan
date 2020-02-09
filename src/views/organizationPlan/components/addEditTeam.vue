<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="45%">
    <div class="dialogBody">
      <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入姓名" v-model="transValue"
        :data="transferData" :titles="['可选', '已选']" @change="handleChange">
      </el-transfer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      transferData: [
        {
          label: '徐萌-办公室',
          key: '办公室'
        },
        {
          label: '范玲-能源与环境处',
          key: '能源与环境处'
        },
        {
          label: '张颖-总师办',
          key: '总师办'
        },
        {
          label: '柴贤龙-城乡建设处',
          key: '城乡建设处'
        },
        {
          label: '潘毅刚-综合处',
          key: '综合处'
        },
      ],
      transValue: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  props: {
    dialogTitle: {
      type: String,
      defalut: '新增团队成员'
    },
    dialogVisible: {
      type: Boolean,
      defalut: false
    }
  },
  mounted() {},
  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    // 关闭弹窗时向父组件发送一个事件
    dialogClose() {
      this.$emit('dialogClose')
    },
    // 提交上传表单并清空表单
    onSubmit(formName) {
      console.log('提交了')
    }
  }
}
</script>
<style lang="scss" >
.dialogBody {
  .el-transfer-panel{
    width: 300px;
  }
}
</style>
<style lang="scss" scoped>
.dialogBody {
  display: flex;
  justify-content: center;
}
</style>