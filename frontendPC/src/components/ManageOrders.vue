<template>
  <el-card style="width: 100%;">
    <!-- 堂食订单 -->
    <el-table :data="tableData" style="width: 100%">
      <!-- 菜品图片 -->
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <el-image style="height: 80px; width: 80px; margin: 0;" :src="scope.row.url1"></el-image>
          <el-image
            style="height: 80px; width: 80px; margin-left: 20px;"
            v-if="scope.row.url2 !== 'undefined'"
            :src="scope.row.url2"></el-image>
        </template>
      </el-table-column>

      <!-- 菜名 -->
      <el-table-column label="菜名" align="center">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{scope.row.foodName1}}</span>
            <span slot="reference" v-if="scope.row.foodName2 !== 'undefined'">
              &nbsp;&nbsp;{{scope.row.foodName2}}
            </span>
          </div>
        </template>
      </el-table-column>

      <!-- 价格 -->
      <el-table-column label="价格" align="center">
        <template slot-scope="scope">
          <div slot="reference" >
            <el-tag type="danger" size="medium">{{scope.row.allPrice}}</el-tag>
          </div>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 完成按钮 -->
          <el-button
            size="medium"
            type="primary"
            v-show="!scope.row.Finish"
            @click="handleEdit(scope.$index, scope.row)">完成</el-button>
          <!-- 未挂起 -->
          <el-button
            size="medium"
            type="primary"
            v-show="!scope.row.HangUp"
            @click="hangUpOrder(scope.$index, scope.row)">挂起</el-button>
          <!-- 已挂起 -->
          <el-button
            size="medium"
            type="warning"
            v-show="scope.row.HangUp"
            @click="hangUpOrder(scope.$index, scope.row)">挂起</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    data () {
      return {
        tableData: []
      }
    },
    created () {
      this.getFood()
    },
    methods: {
      // 获取全部订单
      getFood () {
        this.$http.get("manageOrders").then(res => {
          this.tableData = res.data
        })
      },
      // 完成订单
      handleEdit (index, row) {
        console.log(row.orderId)
        this.$http.put(`/finishOrder/${row.orderId}`).then(() => {
          this.getFood()
          this.$message.success("订单完成")
        })
      },
      hangUpOrder (index, row) {
        this.$http.put(`/hangUpOrder/${row.orderId}/${row.HangUp}`).then(() => {
          this.getFood()
        })
      }
    }
  }
</script>

<style scoped>
</style>
