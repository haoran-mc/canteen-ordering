<template>
  <el-container>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <el-image style="height: 80px; width: 80px; margin: 0;" :src="scope.row.ImageUrl"></el-image>
        </template>
      </el-table-column>

      <el-table-column label="菜名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference">
              <span>{{scope.row.Name}}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" >
              <el-tag type="danger" size="medium">{{scope.row.Price}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
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
      getFood () {
        this.$http.get("dining/manageFood")
            .then(res => {
              console.log(res)
              this.tableData = res.data
            })
      },
      handleEdit (index, row) {
        console.log(index, row)
        this.$prompt('请输入价格', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(({ value }) => {
          const data = new FormData()
          const a = value
          const b = row.ImageId
          data.append('imageId', b)
          data.append('price', a)
          this.$http.post('/dining/foodEdit', data).then(() => { this.getFood() })

          this.$message({
            type: 'success',
            message: '你修改的价格是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      handleDelete (index, row) {
        this.$confirm('永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const data = new FormData()
          const a = row.ImageId
          data.append('imageId', a)
          this.$http.post('/dining/foodDe', data).then(() => { this.getFood() })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
