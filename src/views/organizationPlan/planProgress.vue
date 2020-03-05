
<template>
  <div class="app-container">
    <div class="main-wrapper">
      <div class="main-header">计划进度</div>
      <div class="main-content">
        <div class="planDetailWrap">
          <div class="planLeft">
            <h3>项目开始时间</h3>
            <p class="time dateTime">{{formatYMWDHMS(projectInfo.createtime,'year')}}年{{formatYMWDHMS(projectInfo.createtime,'month')}}月{{formatYMWDHMS(projectInfo.createtime,'day')}}日</p>
            <p class="time week">{{formatYMWDHMS(projectInfo.createtime,'week')}}</p>
            <p class="time times">{{formatYMWDHMS(projectInfo.createtime,'hour')}}:{{formatYMWDHMS(projectInfo.createtime,'minute')}}:{{formatYMWDHMS(projectInfo.createtime,'second')}}</p>
            <p class="line"></p>
            <p class="time dateTime">{{formatYMWDHMS(projectInfo.endtime,'year')}}年{{formatYMWDHMS(projectInfo.endtime,'month')}}月{{formatYMWDHMS(projectInfo.endtime,'day')}}日</p>
            <p class="time week">{{formatYMWDHMS(projectInfo.createtime,'week')}}</p>
            <p class="time times">{{formatYMWDHMS(projectInfo.endtime,'hour')}}:{{formatYMWDHMS(projectInfo.endtime,'minute')}}:{{formatYMWDHMS(projectInfo.endtime,'second')}}</p>
            <h3>项目结束时间</h3>
          </div>
          <div class="planRight">
            <h3>项目进度</h3>
            <div class="planBottom">
              <div class="progressWrap">
                <i class="iconfont iconyonghubianji" :style="{left: projectProgress + '%'}"></i>
                <i class="iconfont iconhongqi"></i>
                <div class="progressOutter">
                  <div class="progressInner" :style="{width: projectProgress + '%'}"></div>
                </div>
                <p class="timeTxt">项目剩余时间</p>
                <p class="remainTime">{{countDownTxt}}</p>
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
              <el-button type="primary" size="mini" @click="addEditClick('add')">新增提醒</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="main-content">
          <!--列表-->
          <el-table :data="progressData" highlight-current-row style="width: 100%;" border>
            <el-table-column type="index" width="65" label="序号" align="center" />
            <el-table-column prop="remindTime" label="时间" align="center" sortable>
              <template slot-scope="scope">
                {{ dateFormat(scope.row.remindtime) }}
              </template>
            </el-table-column>
            <el-table-column prop="schedulecontent" label="内容" :show-overflow-tooltip="true" align="center" sortable />
            <el-table-column prop="icon" label="图标" width="180" align="center" sortable>
              <template slot-scope="scope">
                <i class="iconfont iconhongqi tableIcon" :class="scope.row.icon"></i>
              </template>
            </el-table-column>
            <el-table-column prop="remindPeople" label="提醒人员" :show-overflow-tooltip="true" align="center">
              <template slot-scope="scope">
                {{ fomartNameArrFn('name',scope.row.projectleader) }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="180">
              <template slot-scope="scope">
                <el-dropdown trigger="click">
                  <el-button type="success" size="mini" class="tab_select">
                    更多菜单
                    <i class="el-icon-arrow-down el-icon--right" />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="addEditClick(scope.row)">编 辑</el-dropdown-item>
                    <el-dropdown-item @click.native="deleteClick(scope.row)">删 除</el-dropdown-item>
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
    <add-edit-attention :addEditVisible="addEditVisible" :addEditForm="addEditForm" :addEditTitle="addEditTitle"
      @dialogClose="dialogClose" :queryProgressTableFn="queryProgressTableFn"></add-edit-attention>
  </div>
</template>

<script>
import { apiGet, apiPostCustom } from '@/utils/axios'
import { getStore } from '@/utils'
import addEditAttention from './components/addEditAttention'
export default {
  components: { addEditAttention },
  data() {
    return {
      projectInfo: {}, // 项目信息
      countDownTxt: '', // 倒计时时间
      projectProgress:null,// 项目进行进度
      total: 0, // 项目表格总数
      currentPage: 1, // 表格当前页码
      pageSize: 10, // 表格整页大小
      queryParams: {
        // 表格查询参数
        Page: 1,
        PageSize: 10,
        pid: ''
      },
      progressData: [], // 提醒表格数据
      addEditVisible: false, // 是否显示新增编辑提醒弹窗
      addEditTitle: '新增提醒',
      addEditForm: {
        // 新增编辑提醒表单参数
        remind_time: '',
        schedule_content: '',
        icon: '',
        schedule_content: '',
        user: [],
        pid: ''
      }
    }
  },
  mounted() {
    let that = this
    that.projectInfo = getStore('projectInfo')
    that.queryProgressTableFn()
    that.countDown()
    setInterval(that.countDown,1000)
  },
  methods: {
    // 查询表格数据
    queryProgressTableFn() {
      let params = this.queryParams
      params.pid = this.projectInfo.pid
      apiGet(this, '/outline/querySchedule', params).then(res => {
        this.total = res.total
        this.progressData = res.data
      })
    },
    // 负责人格式化
    fomartNameArrFn(flag, data) {
      let nameArr = []
      let idArr = []
      for (let i = 0; i < data.length; i++) {
        nameArr.push(data[i].name)
        idArr.push(data[i].id)
      }
      if (flag === 'name') {
        return nameArr.join()
      } else {
        return idArr
      }
    },
    // 时间格式化
    dateFormat(dateTime) {
      var date = new Date(dateTime) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        sdate = ('0' + date.getDate()).slice(-2),
        hour = ('0' + date.getHours()).slice(-2),
        minute = ('0' + date.getMinutes()).slice(-2),
        second = ('0' + date.getSeconds()).slice(-2)
      return (
        year +
        '-' +
        month +
        '-' +
        sdate +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      )
    },
    // 时间年月星期日时分秒格式化
    formatYMWDHMS(timestamp, flag) {
      var weekday = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      var date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let year = date.getFullYear(),
        month = ('0' + (date.getMonth() + 1)).slice(-2),
        week = weekday[date.getDay()],
        day = ('0' + date.getDate()).slice(-2),
        hour = ('0' + date.getHours()).slice(-2),
        minute = ('0' + date.getMinutes()).slice(-2),
        second = ('0' + date.getSeconds()).slice(-2)
      switch (flag) {
        case 'year':
          return year
          break 
        case 'month':
          return month
          break 
        case 'week':
          return week
          break 
        case 'day':
          return day
          break 
        case 'hour':
          return hour
          break 
        case 'minute':
          return minute
          break 
        case 'second':
          return second
          break
      }
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      this.queryParams.pageSize = val
      this.queryProgressTableFn()
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      this.queryParams.Page = val
      this.queryProgressTableFn()
    },
    // 弹出新增编辑弹窗
    addEditClick(row) {
      this.addEditVisible = true
      if (row !== 'add') {
        this.addEditTitle = '编辑提醒'
        this.addEditForm = {
          remind_time: row.remindtime,
          schedule_content: row.schedulecontent,
          icon: row.icon,
          user: this.fomartNameArrFn('id', row.projectleader),
          pid: this.projectInfo.pid,
          schedule_id: row.scheduleid
        }
      } else {
        this.addEditTitle = '新增提醒'
        this.addEditForm = {
          remind_time: '',
          schedule_content: '',
          icon: '',
          user: [],
          pid: this.projectInfo.pid
        }
      }
    },
    // 删除提醒
    deleteClick(row) {
      let params = {
        scheduleid: row.scheduleid
      }
      apiPostCustom(
        this,
        '/outline/DeleteSchedule',
        params,
        '确认删除该记录吗'
      ).then(res => {
        this.queryProgressTableFn()
      })
    },
    // 关闭新增编辑提醒弹窗
    dialogClose() {
      this.addEditVisible = false
    },
    // 倒计时
    countDown() {
      let date = new Date()
      let now = date.getTime()
      let leftTime = this.projectInfo.endtime - now //时间差
      if (leftTime >= 0) {
        let d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
        let h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
        let m = Math.floor((leftTime / 1000 / 60) % 60)
        let s = Math.floor((leftTime / 1000) % 60)
        this.countDownTxt = `${d}天${h}小时${m}分${s}秒`
      } else {
        this.countDownTxt = '项目已结束'
      }
      let Timeed = now - this.projectInfo.createtime // 项目开始时间距现在差
      let totalTime = this.projectInfo.endtime - this.projectInfo.createtime // 项目总时间差
      if(Timeed <= 0) {
        this.countDownTxt = '项目未开始'
        this.projectProgress = 0
      } else {
        this.projectProgress = (Timeed / totalTime) * 100
      }
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
  &.red {
    color: #d81e06;
  }
  &.yellow {
    color: #f4ea2a;
  }
  &.cyan {
    color: #1afa29;
  }
  &.blue {
    color: #1296db;
  }
  &.blueBlack {
    color: #13227a;
  }
  &.pink {
    color: #d4237a;
  }
  &.gray {
    color: #707070;
  }
}
</style>
