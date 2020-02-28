
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">分工编制</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="文档类型" prop="outlineType">
                <el-select v-model="queryParams.outlineType" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option v-for="item in outlineOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="文档名称" prop="outlineName">
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
    </div>
    <div class="main-wrapper">
      <div class="main-header">
        <el-row>
          <el-col :span="2">阶段任务详情</el-col>
          <el-col :md="22" class="tableRow">
            <span class="countItem blue">我的任务</span>
            <span class="countItem cyan">待提交</span>
            <span class="countItem gray">待修改</span>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <p class="timeRow">任务截至日期为：2019-12-21 12:21:12</p>
        <div class="divisonWrap waitEdit">
          <span class="timeRow1">2019-12-21  12:21:12</span>
          <span class="fileStatus">待修改</span>
          <div class="outlineWrp">
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划纲要调研方案</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>
              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="8">
                  <el-button type="success" size="mini">打开</el-button>
                  <el-button type="warning" size="mini">提交</el-button>
                </el-col>
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
            <div class="taskMemo">
              <h3 class="title">任务信息</h3>
              <p class="memoItem">
                <span>指导思想、基本要求和发展目标</span>
                <span>2019-12-21  21:21:12</span>
              </p>
              <p class="memoPerson">来自：项目负责人-XXX</p>
            </div>
          </div>
        </div>
        <div class="divisonWrap submited">
          <span class="timeRow1">2019-12-21  12:21:12</span>
          <span class="fileStatus">待修改</span>
          <div class="outlineWrp">
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划纲要调研方案</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>
              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="8">
                  <el-button type="success" size="mini">打开</el-button>
                  <el-button type="warning" size="mini">提交</el-button>
                </el-col>
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
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划纲要调研方案</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>
              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="8">
                  <el-button type="success" size="mini">打开</el-button>
                  <el-button type="warning" size="mini">提交</el-button>
                </el-col>
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
            <div class="outlineItem">
              <div class="outlineInfo">
                <h3>台州市"十四五"规划纲要调研方案</h3>
                <p class="date">2019-12-21 12:21:12</p>
              </div>
              <el-row class="operationRow">
                <el-col :md="8">规划类</el-col>
                <el-col :md="8">
                  <el-button type="success" size="mini">打开</el-button>
                  <el-button type="warning" size="mini">提交</el-button>
                </el-col>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryParams: {
        pageSize: 10,
        page: 1,
        outlineType: '',
        outlineName: ''
      },
      outlineOption: [
        {
          value: 0,
          label: 'Word'
        },
        {
          value: 1,
          label: 'Excle'
        },
        {
          value: 2,
          label: 'PPT'
        },
        {
          value: 3,
          label: '图片'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.timeRow{
  font-size: 18px;
  font-weight: bold;
  color: #000;
}
.divisonWrap{
  position: relative;
  padding-top: 15px;
  margin-bottom: 15px;
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
    width: 80%;
    border-top: 3px solid #65cea7;
  }
  .timeRow1{
    position: absolute;
    top: -15px;
    left: 82%;
    font-size: 25px;
  }
  .fileStatus{
    position: absolute;
    top: -15px;
    left: 20px;
    z-index: 999;
    width: 100px;
    line-height: 30px;
    border-radius: 4px;
    display: block;
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
  &::before{
    content: '';
    position: absolute;
    top: -15px;
    left: 80%;
    z-index: 999;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.waitEdit{
  &::before{
    background: #ff0000
  }
  .timeRow1{
    color: #ff0000
  }
  .fileStatus{
    background: #ff0000
  }
}
.submited{
  &::before{
    background: #67C23A
  }
  .timeRow1{
    color: #67C23A
  }
  .fileStatus{
    background: #67C23A
  }
}
.outlineWrp{
  display: flex;
  .outlineItem{
    margin-right: 30px;
  }
  .taskMemo{
    position: relative;
    margin-left: 100px;
    margin-right: 50px;
    width: 50%;
    .title{
      margin-top: -2px;
      font-size: 18px;
      color: #999;
    }
    .memoItem{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
    }
    .memoPerson{
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
