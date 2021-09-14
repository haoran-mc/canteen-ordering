<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="header-title">
        <el-avatar :src="require('../assets/logo.png')"></el-avatar>
        <span style="margin-left: 15px;">食堂点餐</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 菜单栏区域-->
      <el-aside width="200px">
        <AsideMenu></AsideMenu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import AsideMenu from "./AsideMenu.vue"

  export default {
    components: {
      AsideMenu
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      // 退出登录
      logout () {
        window.sessionStorage.clear()
        this.$router.push('/CanteenPC/login')
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }

  .header-title {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
  }

  .el-main {
    background-color: #eaedf1;
  }
</style>
