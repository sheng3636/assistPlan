
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">计划进度</div>
      <div class="main-content">
        <div class="planDetailWrap">
          <div class="planLeft">
            <h3>项目开始时间</h3>
            <p class="time dateTime">2020年12月21日</p>
            <p class="time week">星期一</p>
            <p class="time times">12:21:12</p>
            <p class="line"></p>
            <p class="time dateTime">2020年12月21日</p>
            <p class="time week">星期一</p>
            <p class="time times">12:21:12</p>
            <h3>项目结束时间</h3>
          </div>
          <div class="planRight">
            <h3>项目进度</h3>
            <div class="planBottom">
              <div class="progressWrap">
                <i class="iconfont iconyonghubianji"></i>
                <i class="iconfont iconhongqi"></i>
                <div class="progressOutter">
                  <div class="progressInner"></div>
                </div>
                <p class="timeTxt">项目剩余时间</p>
                <p class="remainTime">99天23小时34秒</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainBottom">
      <div class="main-wrapper mainLeft">
        <div class="main-header">
          <el-row>
            <el-col :span="4">里程碑提醒设置</el-col>
            <el-col :md="5" :offset="15" class="tableBtnGroup">
              <el-button type="primary" size="mini">新增提醒</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="main-content">
          <!--列表-->
          <el-table :data="projectData" highlight-current-row style="width: 100%;" border>
            <el-table-column type="index" width="65" label="序号" align="center" />
            <el-table-column prop="remindTime" label="时间" align="center" sortable />
            <el-table-column prop="content" label="内容" width="180" align="center" sortable />
            <el-table-column prop="icon" label="图标" width="180" align="center" sortable>
              <template slot-scope="scope">
                <i class="iconfont tableIcon" :class="scope.row.icon"></i>
              </template>
            </el-table-column>
            <el-table-column prop="remindPeople" label="提醒人员" :show-overflow-tooltip="true" align="center" />
            <el-table-column fixed="right" label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="success" size="mini" class="tab_select">
                    更多菜单
                    <i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="editClick(scope.row)">编 辑</el-dropdown-item>
                    <el-dropdown-item @click.native="detailClick(scope.row)">详 情</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteClick(scope.row.equiptId)">删 除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </div>
      </div>
      <div class="main-wrapper mainRight">
        <div class="main-header">最新进展</div>
        <div class="main-content">
          <ul class="projectNews">
            <li>常云峰 - XX部门 - 已提交文档</li>
            <li>阿杰 - XX部门 - 已提交文档</li>
            <li>杜健 - XX部门 - 修改了文档</li>
            <li>常云峰 - XX部门 - 已提交文档</li>
            <li>阿杰 - XX部门 - 已提交文档</li>
            <li>杜健 - XX部门 - 修改了文档</li>
            <li>常云峰 - XX部门 - 已提交文档</li>
            <li>阿杰 - XX部门 - 已提交文档</li>
            <li>杜健 - XX部门 - 修改了文档</li>
            <li>杜健 - XX部门 - 修改了文档</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
      currentPage: 0,
      pageSize: 10,
      projectData: [
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        },
        {
          remindTime: '2019-12-21  12:21:12',
          content: '提醒提交文档',
          icon: 'iconhongqi',
          remindPeople: '常云峰、阿杰、杜健'
        }
      ],
      aaa:{

      }
    }
  },
  mounted() {},
  methods: {
    editClick(row) {
      console.log(row)
    },
    detailClick(row) {
      console.log(row)
    },
    deleteClick(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      // this.params.pageSize = val
      // this.getAreaList(this.params)
    },
    handleCurrentChange(val) {
      // this.params.page = val
      // this.getAreaList(this.params)
    }
  }
}

</script>
<style lang="scss" scoped>
.planDetailWrap {
  display: flex;
  margin: 5px auto;
  width: 99%;
  height: 390px;
  border: 1px solid #ddd;
  .planLeft {
    width: 425px;
    height: 100%;
    border-right: 1px solid rgba(121, 121, 121, 1);
    h3 {
      padding-left: 30px;
      font-size: 18px;
      color: #333;
    }
    p {
      text-align: center;
      color: #666;
      line-height: 8px;
      font-weight: bold;
      &.line {
        margin: 5px auto;
        width: 255px;
        height: 8px;
        background: #65cea7;
      }
      &.dateTime {
        font-size: 40px;
      }
      &.week {
        font-size: 20px;
      }
      &.times {
        font-size: 24px;
      }
    }
  }
  .planRight {
    width: calc(100% - 425px);
    height: 100%;
    h3 {
      padding-left: 30px;
      font-size: 18px;
      color: #333;
      text-align: center;
    }
    .planBottom {
      margin-top: 80px;
      height: 150px;
      .progressWrap {
        position: relative;
        margin: 0 auto;
        width: 90%;
        .iconfont {
          font-weight: bold;
          font-size: 30px;
          color: #65cea7;
        }
        .iconyonghubianji {
          position: absolute;
          top: -35px;
          left: 50%;
        }
        .iconhongqi {
          float: right;
          margin-top: -35px;
        }
        .progressOutter {
          margin: 5px auto 50px auto;
          height: 35px;
          border: 2px solid #65cea7;
          box-shadow: 0 0 5px 0 #65cea7;
          border-radius: 5px;
          .progressInner {
            width: 50%;
            height: 100%;
            background: #65cea7;
            border-radius: 2px;
          }
        }
        p {
          font-size: 22px;
          color: #65cea7;
          text-align: center;
          line-height: 15px;
          &.remainTime,
          &.timeTxt {
            font-size: 26px;
            color: #666;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.mainBottom {
  display: flex;
  justify-content: space-between;
  .mainLeft {
    width: 1135px;
  }
  .mainRight {
    width: calc(100% - 1135px - 25px);
  }
  .projectNews {
    li {
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
    }
  }
}
.tableIcon {
  font-size: 20px;
  color: #65cea7;
}
</style>
