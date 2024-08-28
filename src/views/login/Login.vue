<script>
import Router from 'vue-router'
import "../../../mock/testmock"

export default {
  data() {
    return {
      user: {
        Count: '',
        Password: '',
      },
      router: new Router(),
      pwdType: 'password',
    }
  },
  methods: {
    login() {
      let that = this;
      let formdata = new FormData()
      formdata.append('Count', this.user.Count)
      formdata.append('Password', this.user.Password)
      this.$axios.post('http://192.168.0.109:5000/weblogin', formdata)
        .then(function (response) {
          // 处理服务器响应
          const data = response.data
          console.log(data)
          if (data.msg == 'True') {
            that.$router.push({ path: '/Check' })
          }
          else {
            alert("用户名或密码错误")
          }
        })
        .catch(error => {
          console.error('Error submitting data:', error)
        });
    }
  }
}
</script>

<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">井盖隐患智能处理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="user.Count" name="username" type="text" placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.Password" name="password" placeholder="password" @keyup.enter.native="login" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="login">
          登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
