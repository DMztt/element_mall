<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar">
        <img src="~assets/images/logo.png" alt="">
      </div>
      <el-form :model="loginForm" ref="loginForm" class="login_form" :rules="loginRules" >
        <el-form-item prop="username" >
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password" >
          <el-input v-model="loginForm.password" show-password prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" size="small" @click="submit">登录</el-button>
          <el-button type="info" size="small" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginSys } from 'network/login.js'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在不少于5个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码不少于6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginForm.resetFields()
    },
    submit () {
      this.$refs.loginForm.validate(valid => {
        if(!valid) return
        loginSys(this.loginForm).then(res => {
          console.log(res)
          if(res.meta.status !== 200) {
            this.$message({
              message: '用户名或密码错误，请您检查重新登录',
              type: 'error'
            })
          }else{
            this.$message({
              message: 'Login successful',
              type: 'success'
            })
            window.sessionStorage.setItem('token',res.data.token)
            this.$router.push('/home')
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 28px;
    position: relative;
  }
  .avatar {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    overflow: hidden;
    padding: 10px;
    position: relative;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form {
    position: relative;
    bottom: 40px;
    left: 0;
    right: 0;
    padding: 0 20px;
    .login_btn {
    display: flex;
    justify-content: flex-end;
  }
  }

}
</style>
