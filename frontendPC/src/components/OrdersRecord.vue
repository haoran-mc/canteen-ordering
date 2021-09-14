<template>
  <el-card>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <!-- 日期 -->
      <el-table-column prop="time" label="日期" sortable align="center"></el-table-column>
      <!-- 订单号 -->
      <el-table-column prop="orderId" label="订单号" align="center"></el-table-column>
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
      <el-table-column prop="allPrice" label="价格" align="center"></el-table-column>
      <!-- 备注 -->
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <!-- 是否已收货 -->
      <el-table-column prop="UserCf" label="收货完成" align="center"></el-table-column>
      <!-- 类别 -->
      <el-table-column prop="type" label="类别" align="center"
        :filters="[{ text: '堂食', value: '堂食' }, { text: '外卖', value: '外卖' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === '外卖' ? 'primary' : 'success'" disable-transitions>
            {{scope.row.type}}
          </el-tag>
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
      this.getRecord()
    },
    methods: {
      getRecord () {
        this.$http.get("ordersRecord").then(res => {
          this.tableData = res.data
        })
      },
      filterTag (value, row) {
        return row.type === value
      }
    }
  }
</script>

<style scoped>
</style>
