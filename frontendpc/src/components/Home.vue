<template>
  <el-container>
    <!-- 菜单栏区域-->
    <el-aside>
      <AsideMenu></AsideMenu>
    </el-aside>
    <!-- 右侧主体区域 -->
    <el-container>
      welcome!
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
    }
  }
</script>

<style scoped>
</style>
