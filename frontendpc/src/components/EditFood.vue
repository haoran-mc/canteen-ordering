<template>
  <el-card>
    <el-button type="primary" @click="addFoodDialogVisible=true" style="margin-bottom: 15px;">添加菜品</el-button>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <i ></i>
          <el-image style="height: 80px;width: 80px;margin: 0" :src="scope.row.ImageUrl"> </el-image>
        </template>
      </el-table-column>

      <el-table-column label="菜名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <span> {{ scope.row.Name }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="价格" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" >
              <el-tag type="danger" size="medium">{{ scope.row.Price }}</el-tag>
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

    <!-- 添加菜品对话框 -->
    <el-dialog title="添加菜品" :visible.sync="addFoodDialogVisible" width="50%" @close="addFoodDialogClosed">
      <AddFood></AddFood>
    </el-dialog>
  </el-card>
</template>

<script>
  import AddFood from './AddFood.vue'

  export default {
    components: {
      AddFood
    },
    data () {
      return {
        tableData: [],
        // 增加菜品对话框
        addFoodDialogVisible: false
      }
    },
    created () {
      this.getFood()
    },
    methods: {
      getFood () {
        this.$http.get("manageFood").then(res => {
          this.tableData = res.data
        })
      },
      handleEdit (index, row) {
        this.$prompt('请输入价格', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(({ value }) => {
          const data = new FormData()
          const a = value
          const b = row.ImageId
          data.append('imageId', b)
          data.append('price', a)
          this.$http.put('editFood', data).then(() => { this.getFood() })
          this.$message.success('你修改的价格是: ' + value)
        }).catch(() => {
          this.$message.info('取消输入')
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
          this.$http.delete('deleteFood', data).then(() => { this.getFood() })
          this.$message.success('删除成功!')
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      }
    }
  }
</script>

<style scoped>
</style>
