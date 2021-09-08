<template>
  <el-container class="login_container">
    <!-- Logo区域 -->
    <el-card class="logo_card">
      <img style="border-radius: 10px; margin: 0 auto 25px auto;" src="../assets/LoginLogo.png"/>
      <div class="logo_text">
        食堂线上点餐
      </div>
    </el-card>
    <!-- 填写表单区域 -->
    <el-card class="form_card">
      <!-- 标题区域 -->
      <div class="form_title">用户登录</div>
      <!-- 表单登录区域 -->
      <el-form :model="loginForm" class="form_input" ref="loginFormRef" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-key" type="password"></el-input>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: '',
          code: ''
        },
        loginFormRules: {
          username: [
            { required: true, message: "请输入登录名称", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入登录密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
          ]
        }
      }
    },
    methods: {
      // 重置表格信息
      resetLoginForm () {
        this.$refs.loginFormRef.resetFields()
      },
      login () {
        // 表单的预验证，获取表单的引用对象，通过引用对象调用validate函数进行预校验
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) {
            return this.$message.error('登录失败！')
          }
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) return this.$message.error('登录失败')
          this.$message.success('登录成功！')
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style scoped>
  .login_container {
    width: 100%;
    height: 100%;
    background-image: url("../assets/155807-1529481487f5ce.jpg");
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .el-card {
    border-radius: 0;
    /* border: 0; */
  }

  .logo_card {
    width: 30%;
    height: 500px;
    background: rgba( 182,193,198, 0.1);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .logo_text {
    font-size: 25px;
    color: white;
    text-align: center;
  }

  .form_card {
    width: 30%;
    height: 500px;
    background: rgba( 182,193,198, 0.5);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }

  .form_title {
    font-size: 25px;
    text-align: center;
    color: white;
  }

  .form_input {
    width: 325px;
    margin-top: 10%;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
