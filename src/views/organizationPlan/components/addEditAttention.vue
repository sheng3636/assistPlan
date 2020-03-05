<template>
  <el-dialog :title="addEditTitle" :visible.sync="addEditVisible" :close-on-click-modal="false"
    :close-on-press-escape="false" :before-close="dialogClose" width="50%">
    <el-form class="dialogBody" ref="dialogForm" :model="addEditForm" :rules="rules" label-width="80px"
      label-position="top">
      <div class="bodyLeft">
        <el-form-item label="提醒时间" prop="remind_time">
          <el-date-picker v-model="addEditForm.remind_time" type="datetime" value-format="timestamp" placeholder="选择日期时间" style="width:100%;">
          </el-date-picker>
        </el-form-item>
        <p class="treeLabel"><span>*</span>提醒图标</p>
        <ul class="iconWrap">
          <li :class="{checked: addEditForm.icon === item}" v-for="(item,index) in iconList" :key="index">
            <i @click="checkedIcon(item)" class="iconfont iconhongqi" :class="item"></i>
            <span></span>
          </li>
        </ul>
        <el-form-item label="项目主要内容" prop="schedule_content">
          <el-input v-model="addEditForm.schedule_content" type="textarea" :rows="10" placeholder="请输入项目主要内容" />
        </el-form-item>
      </div>
      <div class="bodyRight">
        <p class="treeLabel"><span>*</span>项目负责人</p>
        <el-tree :data="branchData" :props="defaultProps" ref="tree" highlight-current node-key="id" show-checkbox
          default-expand-all :default-checked-keys="addEditForm.user" class="treeWrap">
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
      iconList:['yellow','cyan','blue','blueBlack','pink','gray'],//icon列表
      rules: {
        remind_time: [
          {
            required: true, message: '提醒时间不能为空', trigger: ['blur', 'change']
          }
        ],
        schedule_content: [
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
  mounted(){
  },
  props: {
    queryProgressTableFn: {
      type: Function,
      default: null
    },
    addEditTitle: {
      type: String,
      defalut: '新增提醒'
    },
    addEditVisible: {
      type: Boolean,
      defalut: false
    },
    addEditForm: {
      type: Object,
      defalut: {}
    }
  },
  mounted() {
    // 查询人员清单
    apiGet(this, '/project/getUserAndDept2', { username: '' }).then(res => {
      this.branchData = res.branchData
    })
  },
  methods: {
    // 选择提醒目标
    checkedIcon(data){
      this.addEditForm.icon = data
    },
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
          this.addEditForm.user = this.$refs.tree.getCheckedKeys(true)
          if (this.addEditForm.user.length !== 0 && this.addEditForm.icon !== '') {
            let url =
              this.addEditTitle === '新增提醒'
                ? '/outline/saveSchedule'
                : '/outline/updateSchedule'
            apiPost(this, url, this.addEditForm).then(res => {
              this.queryProgressTableFn()
              this.dialogClose()
            })
          } else {
            this.$message({
              message: '负责人或提醒图标不能为空不能为空',
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
  .bodyLeft {
    width: 44%;
    height: 505px;
    background: rgba(242, 242, 242, 1);
    .iconWrap{
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 90%;
      li{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid rgba(121, 121, 121, 1);
        border-radius: 5px;
        cursor: pointer;
        .iconfont{
          font-size: 28px;
          &.red{
            color:#d81e06
          }
          &.yellow{
            color:#f4ea2a
          }
          &.cyan{
            color:#1afa29
          }
          &.blue{
            color:#1296db
          }
          &.blueBlack{
            color:#13227a
          }
          &.pink{
            color:#d4237a
          }
          &.gray{
            color:#707070
          }
        }
        &.checked{
          position: relative;
          border: 1px solid #1afa29;
          span{
            position: absolute;
            top: 0px;
            right: 0;
            display:inline-block;
            width: 0;
            height: 0;
            border-top: 20px solid #1afa29;
            border-left: 20px solid transparent;
          }
        }
      }
    }
  }
  .bodyRight {
    width: 54%;
    height: 505px;
    background: rgba(242, 242, 242, 1);
    .leaderWrap {
      margin: 0 auto;
      width: 90%;
    }
  }
}
</style>