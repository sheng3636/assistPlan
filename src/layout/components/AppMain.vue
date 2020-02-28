<template>
  <section class="app-main">
    <div class="routersNav">
      <breadcrumb class="breadcrumb-container" />
      <p class="mapMenuBtn" v-if="isMapMenu" @click="showMapMenu">
        <i class="el-icon-d-arrow-left"></i>
        <span>八大地图辅助工具</span>              
      </p>
      <ul class="mapMenuUl" v-if="!isMapMenu">
        <li @click="showMapMenu"><i class="el-icon-d-arrow-right"></i></li>
        <li @click="openSiLu('http://47.103.104.87:8882/hzgh/#/thinking')">思路目标地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=2')">空间区域地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=3')">产业创新地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=4')">人口与公共服务地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=5')">城乡统筹地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=6')">对外开放地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=7')">资源生态环境地图</li>
        <li @click="openSiLu('http://118.190.204.249:8103/#/home?id=8')">基础设施地图</li>
        <li>数据管理系统</li>
      </ul>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  data() {
    return {
      isMapMenu:true
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  methods:{
    showMapMenu() {
      this.isMapMenu = !this.isMapMenu
    },
    openSiLu(path) {
      window.open(path)
    },
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.routersNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  .el-breadcrumb {line-height: 35px;}
  .mapMenuBtn {
    width: 225px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    font-size: 18px;
    color: #65CEA7;
    background: rgba(99, 88, 104, 1);
    cursor: pointer;
    i{
      margin: 0 10px 0 5px;
    }
  }
  .mapMenuUl {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1400px;
    font-size: 18px;
    color: #65CEA7;
    li{
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      border-radius: 6px;
      background: rgba(99, 88, 104, 1);
      cursor: pointer;
    }
  }
}

</style>
