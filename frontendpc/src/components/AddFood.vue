<template>
  <el-container class="addFood-container">
    <el-form :model="addFoodForm" ref="addFoodFormRef" :rules="addFoodFormRules" label-width="80px">
      <el-form-item label="名称" label-width="80px" prop="name">
        <el-input v-model="addFoodForm.name" style="width: 60%;"></el-input>
      </el-form-item>
      <el-form-item label="价格" label-width="80px" prop="price">
        <el-input v-model="addFoodForm.price" placeholder="单位：/元" style="width: 60%;"></el-input>
      </el-form-item>
      <el-form-item label="图片" label-width="80px" prop="photo">
        <el-upload
          action="http://localhost:8003/addFood"
          list-type="picture-card"
          :on-success="addPhotoSuccess"
          ref="upload"
          :auto-upload="false"
          :limit="1"
          :data="addFoodForm">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-button class="btn" plain type="primary" @click="submit">提交</el-button>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        addFoodForm: {
          name: '',
          price: ''
        },
        addFoodFormRules: {
          name: [{ required: true, message: '请输入菜品名称', trigger: 'blur' }],
          price: [{ required: true, message: '请输入菜品价格', trigger: 'blur' }],
          photo: [{ required: true, message: '请添加菜品图片', trigger: 'blur' }]
        }
      }
    },
    created () {
    },
    methods: {
      submit () {
        this.$refs.addFoodForm.validate(valid => {
          this.$refs.upload.submit()
        })
      },
      addPhotoSuccess (res) {
        this.addFoodForm = {}
        this.$notify({
          title: '提交成功',
          type: 'success',
          duration: 1500,
          position: 'bottom-right'
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
