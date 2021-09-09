<template>
  <el-container>
    <!-- 侧边栏菜单区域 -->
    <el-menu background-color="#333744" text-color="#fff" unique-opened router :default-active="activePath">
      <!-- 订单处理 -->
      <el-menu-item index="/manageOrders" @click="saveNavState('/manageOrders')">
        <i class="el-icon-tickets"></i>
        <span slot="title">订单处理</span>
      </el-menu-item>

      <!-- 挂起订单 -->
      <el-menu-item index="/hangUp" @click="saveNavState('/hangUp')">
        <i class="el-icon-refresh-left" ></i>
        <span slot="title" >
          <span @click="table = true" type="primary">挂起订单</span>
        </span>
      </el-menu-item>

      <!-- 外卖界面 -->
      <el-menu-item index="/takeOut" @click="saveNavState('/takeOut')">
        <i class="el-icon-tableware"></i>
        <span slot="title">外卖处理</span>
      </el-menu-item>

      <!-- 数据统计 -->
      <el-submenu index="dataAnalysis">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/salesAnalysis" @click="saveNavState('/salesAnalysis')">销量分析</el-menu-item>
          <el-menu-item index="/foodAnalysis" @click="saveNavState('/foodAnalysis')">菜品分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 菜系管理 -->
      <el-submenu index="manageFood">
        <template slot="title">
          <i class="el-icon-dish-1"></i>
          <span>菜系管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/editFood" @click="saveNavState('/editFood')">编辑菜谱</el-menu-item>
          <el-menu-item index="/addFood" @click="saveNavState('/addFood')">增加菜谱</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- 订单记录 -->
      <el-menu-item index="/ordersRecord" @click="saveNavState('/ordersRecord')">
        <i class="el-icon-receiving"></i>
        <span slot="title">订单记录</span>
      </el-menu-item>

      <!-- 意见处理 -->
      <el-menu-item index="/opinion" @click="saveNavState('/opinion')">
        <i class="el-icon-edit"></i>
        <span slot="title">意见处理</span>
      </el-menu-item>
    </el-menu>
    <!-- 抽屉 -->
    <el-drawer></el-drawer>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        activePath: ''
      }
    },
    created () {
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      // 保存链接的激活状态
      saveNavState (activePath) {
        console.log(activePath)
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>

<style scoped>
  .el-container {
    background-color: #333744;
  }

  .el-menu {
    border-right: none;
  }

  .el-menu-item {
    width: 200px;
  }
</style>
