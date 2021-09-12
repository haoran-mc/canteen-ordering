<template>
  <el-container>
    <el-card class="editFood-card">
      <!-- 添加菜品按钮 -->
      <el-button type="primary" @click="addFoodDialogVisible=true" style="margin-bottom: 15px;">添加菜品</el-button>

      <!-- 展示菜品 -->
      <el-table :data="tableData" border :row-style="{height: '100px'}">
        <!-- 菜品样例图片 -->
        <el-table-column label="图片" height="180" width="200" align="center">
          <template slot-scope="scope">
            <el-image :src="scope.row.PhotoPath"></el-image>
          </template>
        </el-table-column>

        <!-- 菜品名 -->
        <el-table-column label="菜名" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.Name }}</span>
          </template>
        </el-table-column>

        <!-- 菜品价格 -->
        <el-table-column label="价格" align="center">
          <template slot-scope="scope">
                <el-tag type="danger" size="medium">{{ scope.row.Price }}</el-tag>
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="medium" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="medium" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加菜品对话框 -->
    <el-dialog title="添加菜品" :visible.sync="addFoodDialogVisible" width="50%" class="addFood-dialog">
      <el-form
        :model="addFoodForm"
        ref="addFoodFormRef"
        :rules="addFoodFormRules"
        label-width="80px"
        enctype="multipart/form-data">
        <!-- 菜名 -->
        <el-form-item label="名称" label-width="80px" prop="name">
          <el-input v-model="addFoodForm.name" style="width: 60%;" clearable></el-input>
        </el-form-item>

        <!-- 价格 -->
        <el-form-item label="价格" label-width="80px" prop="price">
          <el-input v-model="addFoodForm.price" placeholder="单位：/元" style="width: 60%;" clearable></el-input>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item label="图片" prop="image">
          <el-upload
            ref="upload"
            list-type="picture-card"
            name="foodPhoto"
            multiple
            :action=foodImageUrl
            :class="{ hide: hideUp }"
            :auto-upload="false"
            :on-change="imageChange"
            :data="addFoodForm"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemovePicture">
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- 封面预览 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-button class="btn" plain type="primary" @click="submit()">提 交</el-button>
    </el-dialog>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        // 增加菜品对话框
        addFoodDialogVisible: false,
        // ---- 下面是添加菜品的数据
        foodImageUrl: 'http://localhost:8003/CanteenPC/addFood',
        hideUp: false,
        addFoodForm: {},
        dialogVisible: false,
        dialogImageUrl: '',
        addFoodFormRules: {
          name: [{ required: true, message: '请输入菜品名称', trigger: 'blur' }],
          price: [{ required: true, message: '请输入菜品价格', trigger: 'blur' }],
          image: [{ required: true, message: '请输入菜品图片', trigger: 'blur' }]
        }
      }
    },
    created () {
      this.getFood()
    },
    methods: {
      // 生命周期函数，获取菜单
      getFood () {
        this.$http.get("manageFood").then(res => {
          this.tableData = res.data
        })
      },
      // 编辑菜品按钮
      handleEdit (index, row) {
        this.$prompt('请输入价格', { confirmButtonText: '确定', cancelButtonText: '取消' }).then(({ value }) => {
          const formData = new FormData()
          const foodID = row.ID
          const foodPrice = value

          formData.append('id', foodID)
          formData.append('price', foodPrice)

          this.$http.put('editFood', formData).then(() => { this.getFood() })
          this.$message.success('你修改的价格是: ' + value)
        }).catch(() => {
          this.$message.info('取消输入')
        })
      },
      // 删除菜品按钮
      handleDelete (index, row) {
        this.$confirm('永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`deleteFood/${row.ID}`).then(() => { this.getFood() })
          this.$message.success('删除成功!')
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      // ---- 下面是添加菜品的方法
      imageChange (file, fileList, name) {
        this.hideUp = (fileList.length === 1)
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemovePicture (file, fileList) {
        this.hideUp = false
        console.log(file, fileList)
      },
      submit () {
        this.addFoodForm = {}
        this.$refs.upload.submit()
        this.$refs.upload.clearFiles()
        this.hideUp = false
        this.$message.success("添加新菜品成功！")
      }
    }
  }
</script>

<style scoped>
  .editFood-card {
    width: 100%;
  }

  .addFood-dialog {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 5%;
  }

  .btn {
    margin-top: 30px;
    margin-left: 70%;
    margin-right: 10%;
    margin-bottom: 8%;
    float: right;
  }
</style>
