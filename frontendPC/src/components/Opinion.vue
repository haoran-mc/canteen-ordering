<template>
  <el-card>
    <el-table :data="tableData" style="width: 100%" max-height="600">
      <el-table-column fixed prop="Time" label="日期" width="150" align="center"></el-table-column>
      <el-table-column prop="FoodName" label="菜名" width="120" align="center"></el-table-column>
      <el-table-column prop="Advise" label="建议" width="550" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
            @click="deleteOpinion(scope.row)"
            type="text"
            size="medium">删除</el-button>
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
      this.getOpinions()
    },
    methods: {
      getOpinions () {
        this.$http.get("/opinion").then(res => { this.tableData = res.data })
      },
      deleteRow (index, rows) {
        rows.splice(index, 1)
      },
      deleteOpinion (val) {
        const data = new FormData()
        const a = val.ID
        data.append('Id', a)
        this.$http.post('deleteOpinion', data)
        this.$notify({
          title: '删除成功',
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
