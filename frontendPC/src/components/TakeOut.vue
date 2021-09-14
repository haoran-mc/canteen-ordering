<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <!-- 日期 -->
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <!-- 订单号 -->
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.orderId }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 菜品 -->
      <el-table-column label="菜系" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.foodName1 }}</span>
            <span slot="reference" v-if="scope.row.foodName2 !== 'undefined'">
              &nbsp;&nbsp;{{scope.row.foodName2}}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="180" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span size="medium">{{ scope.row.remark}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="finishTakeOut(scope.$index, scope.row)">完成</el-button>
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
      this.getTakeOut()
    },
    methods: {
      getTakeOut () {
        this.$http.get("takeOut").then(res => { this.tableData = res.data })
      },
      finishTakeOut (index, row) {
        this.$http.put(`finishTakeOut/${row.orderId}`).then(() => {
          this.getTakeOut()
          this.$notify({
            title: '完成订单',
            type: 'success',
            duration: 1500,
            position: 'bottom-right'
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
