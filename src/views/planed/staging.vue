
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">段落搜索</div>
      <div class="main-content">
        <el-form ref="queryParams" :model="queryParams" label-width="80px" label-position="top">
          <el-row>
            <el-col :md="5" :sm="4">
              <el-form-item label="编写人员" prop="outlineType">
                <el-select v-model="queryParams.outlineType" filterable placeholder="请选择一项" style="width: 100%">
                  <el-option v-for="item in outlineOption" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="4">
              <el-form-item label="段落内容" prop="outlineName">
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
          <el-col :span="1">草稿预览</el-col>
          <el-col :md="2" :offset="21" class="tableBtnGroup">
            <el-button type="primary" size="mini">统稿预览</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="main-content">
        <div class="articleWrap">
          <div class="articleInfo">
            <p>
              <span>编写人</span>
              <span>常云峰</span>
            </p>
            <p>
              <span>字数</span>
              <span>355</span>
            </p>
            <p>
              <span>提交时间</span>
              <span>2019-12-21 12:21:12</span>
            </p>
            <p>
              <span>状态</span>
              <span>初次提交</span>
            </p>
            <el-button plain class="editBtn">需更改</el-button>
          </div>
          <div class="articleContent">
            <p>发展基础和发展环境</p>
            <p>“十二五”时期，我市迎来撤地建市二十周年的关键节点。面对复杂多变的宏观环境，全市上下围绕建设“山海秀丽、富裕和谐”新台州的总目标，以科学发展为主题，以“实干论英雄”为载体，深入实施“四大战略”，着力稳增长、促转型、抓改革、惠民生，实现了经济社会平稳较好发展。综合经济实力跨上新台阶。2015 年全市生产总值和人均生产总值分别达 3558.13 亿元、59570 元，年均增长 7.5%、6.9%，实现从高速向中高速的平稳过渡；预算总收入和一般预算收入分别达 539.78亿元、298.02 亿元，年均增长 11.7%和 12.6%；社会消费品零售总额 1826.68 亿元，年均增长 13.7%；进出口总额 211.66 亿美元，年均增长 4.5%；固定资产投资五年累计7520.20 亿元， 年均增长 20.2%。产业转型升级取得新突破。形成“三二一”产业结构，第三 产业增加值占地区生产总值比重提高到 49.3%。现代服务业加快发展，成功创建国家电子商务示范城市，天台山、神仙居成功创建国家 5A 级景区。“四换三名”不断发力，全市战略性新兴产业增加值占规模以上工业增加值的比重达 29.2%，成功创建“全国质量强市示范城市”，多次获得“全国科技进步先进市”称号。36家上市企业成为引领转型的龙头，六大产业集群入选省级产业集 群示范区试点。农业“两区”建设加快推进，建成粮食生产功能 区 59.53 万亩，省级现代农业园区 136个，温岭、三门成功创建国家现代农业示范区。“国家千人计划”、“500 精英计划”人数居全省前列。</p>
          </div>
        </div>
        <div class="articleWrap">
          <div class="articleInfo">
            <p>
              <span>编写人</span>
              <span>常云峰</span>
            </p>
            <p>
              <span>字数</span>
              <span>355</span>
            </p>
            <p>
              <span>提交时间</span>
              <span>2019-12-21 12:21:12</span>
            </p>
            <p>
              <span>状态</span>
              <span>初次提交</span>
            </p>
            <el-button plain class="editBtn">需更改</el-button>
          </div>
          <div class="articleContent">
            <p>发展基础和发展环境</p>
            <p>“十二五”时期，我市迎来撤地建市二十周年的关键节点。面对复杂多变的宏观环境，全市上下围绕建设“山海秀丽、富裕和谐”新台州的总目标，以科学发展为主题，以“实干论英雄”为载体，深入实施“四大战略”，着力稳增长、促转型、抓改革、惠民生，实现了经济社会平稳较好发展。综合经济实力跨上新台阶。2015 年全市生产总值和人均生产总值分别达 3558.13 亿元、59570 元，年均增长 7.5%、6.9%，实现从高速向中高速的平稳过渡；预算总收入和一般预算收入分别达 539.78亿元、298.02 亿元，年均增长 11.7%和 12.6%；社会消费品零售总额 1826.68 亿元，年均增长 13.7%；进出口总额 211.66 亿美元，年均增长 4.5%；固定资产投资五年累计7520.20 亿元， 年均增长 20.2%。产业转型升级取得新突破。形成“三二一”产业结构，第三 产业增加值占地区生产总值比重提高到 49.3%。现代服务业加快发展，成功创建国家电子商务示范城市，天台山、神仙居成功创建国家 5A 级景区。“四换三名”不断发力，全市战略性新兴产业增加值占规模以上工业增加值的比重达 29.2%，成功创建“全国质量强市示范城市”，多次获得“全国科技进步先进市”称号。36家上市企业成为引领转型的龙头，六大产业集群入选省级产业集 群示范区试点。农业“两区”建设加快推进，建成粮食生产功能 区 59.53 万亩，省级现代农业园区 136个，温岭、三门成功创建国家现代农业示范区。“国家千人计划”、“500 精英计划”人数居全省前列。</p>
          </div>
        </div>
        <el-button type="success" class="editBtn">生成通稿</el-button>
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
          label: '张三'
        },
        {
          value: 1,
          label: '李四'
        },
        {
          value: 2,
          label: '王五'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.articleWrap {
  display: flex;
  margin-bottom: 15px;
  .articleInfo {
    margin-right: 15px;
    width: 250px;
    height: 295px;
    border: 1px solid #67c23a;
    border-radius: 5px;
    p{
      display: flex;
      justify-content: space-between;
      margin: 5px auto;
      padding: 10px 0;
      width: 95%;
      border-bottom: 2px solid #67c23a;
      span{
        font-size: 16px;
        color: #999;
        &:last-child{
          font-weight: bold;
          color: #000;
        }
      }
    }
  }
  .articleContent{
    padding:5px;
    width: 1320px;
    max-height: 295px;
    line-height: 25px;
    border: 1px solid #67c23a;
    border-radius: 5px;
    font-size: 16px;
    p{
      text-indent: 2.5em;
    }
  }
}
.editBtn{
  display: block;
  margin: 30px auto 0 auto;
}
</style>
