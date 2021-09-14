<template>
  <el-card>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="日期" sortable width="180"></el-table-column>
      <el-table-column prop="orderNum" label="订单号" width="150"></el-table-column>
      <el-table-column prop="foodName" label="菜名" width="100"></el-table-column>
      <el-table-column prop="foodName1" label="" width="120"></el-table-column>
      <el-table-column prop="allPrice" label="价格" width="120"></el-table-column>
      <el-table-column prop="remark" label="备注" width="140"></el-table-column>
      <el-table-column prop="UserCf" label="收货完成" width="100"></el-table-column>
      <el-table-column prop="type" label="类别" width="120"
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
