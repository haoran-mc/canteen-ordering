<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="280">
        <template slot-scope="scope">
          <span >{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单号" width="250">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.orderNum }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="菜系" width="80">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.foodName }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="foodName1" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.foodName1 }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <span size="medium">{{ scope.row.remark}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
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
        const data = new FormData()
        const a = row.orderNum
        data.append('orderId', a)

        this.$http.post('/dining/outFoodOp', data).then(() => { this.getOutFood() })

        this.$notify({
          title: '完成订单',
          type: 'success',
          duration: 1500,
          position: 'bottom-right'
        })
      }
    }
  }
</script>

<style scoped>
</style>
