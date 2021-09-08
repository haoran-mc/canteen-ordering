<template>
  <el-container>
    <!-- 侧边栏菜单区域 -->
    <el-menu background-color="#333744" text-color="#fff" unique-opened router>
      <!-- 订单处理 -->
      <el-menu-item index="/home">
        <i class="el-icon-tickets"></i>
        <span slot="title">订单处理</span>
      </el-menu-item>

      <!-- 挂起订单 -->
      <el-menu-item>
        <i class="el-icon-refresh-left" ></i>
        <span slot="title" >
          <span @click="table = true" type="primary">挂起订单</span>
        </span>
      </el-menu-item>

      <!-- 外卖界面 -->
      <el-menu-item index="/takeOut">
        <i class="el-icon-tableware"></i>
        <span slot="title">外卖处理</span>
      </el-menu-item>

      <el-submenu index="/sales">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sales">销量分析</el-menu-item>
          <el-menu-item index="/salesFood">菜品分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/foodManage">
        <template slot="title">
          <i class="el-icon-dish-1"></i>
          <span>菜系管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/foodManage">编辑菜谱</el-menu-item>
          <el-menu-item index="/updateFood">增加菜谱</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/ordersRecord">
        <i class="el-icon-receiving"></i>
        <span slot="title">订单记录</span>
      </el-menu-item>
      <el-menu-item index="/opinions">
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
      }
    },
    created () {
    },
    methods: {
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
