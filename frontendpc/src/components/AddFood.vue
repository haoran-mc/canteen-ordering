<template>
  <el-container class="addFood-container">
    <el-form
      :model="addFoodForm"
      ref="addFoodFormRef"
      :rules="addFoodFormRules"
      label-width="80px"
      enctype="multipart/form-data">
      <el-form-item label="名称" label-width="80px" prop="name">
        <el-input v-model="addFoodForm.name" style="width: 60%;" clearable></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="80px" prop="price">
        <el-input v-model="addFoodForm.price" placeholder="单位：/元" style="width: 60%;" clearable></el-input>
      </el-form-item>

      <!--
           ref="upload"
           :on-change="handleUpUpload"
           :on-preview="handleUpPreview"
      -->

      <el-form-item label="图片">
        <el-upload
          class="upload"
          ref="upload"
          action="http://localhost:8003/CanteenPC/addFood"
          list-type="picture-card"
          :file-list="fileList"
          :class="{ hide: hideUp }"
          :limit="1"
          :auto-upload="false"
          :on-success="handleUpSuccess"
          :on-error="handleUpError"
          :on-change="handleUpChange"
          :on-remove="handleUpRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

    </el-form>
    <el-button class="btn" plain type="primary" @click="handleUpUpload">提交</el-button>
  </el-container>
</template>

<script>
  /* import axios from 'axios' */

  export default {
    data () {
      return {
        addFoodForm: {},
        addFoodFormRules: {
          name: [{ required: true, message: '请输入菜品名称', trigger: 'blur' }],
          price: [{ required: true, message: '请输入菜品价格', trigger: 'blur' }]
        },
        hideUp: false,
        fileList: []
      }
    },
    methods: {
      // 上传成功
      handleUpSuccess (file, fileList) {
        this.hideUp = (fileList.length === 1)
        this.$message.success("上传成功！")
      },
      // 上传失败
      handleUpError (err, file, fileList) {
        console.log(err)
        this.$message.error("上传失败！")
      },
      // 删除图片
      handleUpRemove (file, fileList) {
        this.hideUp = false
      },
      handleUpChange (file, fileList) {
        this.fileList = fileList
      },
      // 上传图片
      handleUpUpload (file, fileList) {
        this.hideUp = true
        this.addFoodForm.photo_path = this.fileList[0].url
        console.log(this.addFoodForm.name)
        console.log(this.addFoodForm.price)
        console.log(this.addFoodForm.photo_path)

        this.$http.post('/addFood', {
          headers: { "Content-Type": "multipart/form-data" },
          name: this.addFoodForm.name,
          price: this.addFoodForm.price
          /* photo_path: this.addFoodForm.photo_path */
        }).then(() => {
          this.addFodForm = {}
          this.$message.success('上传成功！')
        })
      }
    }
  }
</script>

<style scoped>
  .addFood-container {
    height: 430px;
    display: flex;
    flex-direction: column;
    margin-left: 22%;
  }

  .btn {
    margin-top: 30px;
    margin-left: 70%;
    margin-right: 10%;
    float: right;
  }
</style>
