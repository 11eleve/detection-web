<template>
  <div class="login-container">
    <!-- <div style="display: flex; height: 60px ;align-items: center; padding: 20px">
      <img src="../../image/logo.png" style="height : 50px; width: 50px; "></img>
    </div> -->
    <el-form ref="Loginform" :model="user" :rules="rules"  class="login-form"  auto-complete="on" label-position="left"  >
      <h3 class="title">井盖隐患智能处理系统</h3>
      <el-form-item prop="Count" >
        <el-input  class="custom-input"  prefix-icon="el-icon-user" v-model="user.Count" name="username" type="text" placeholder="请输入账号" onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5\s]/g,'')"  />
      </el-form-item>
      <el-form-item prop="Password" >
        <el-input  class="custom-input"  prefix-icon="el-icon-lock" type="password" show-password v-model="user.Password" name="password" placeholder="请输入密码" @keyup.enter.native="login" onkeyup="this.value=this.value.replace(/[\u4E00-\u9FA5\s]/g,'')"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login_bt" style="width:100%; border-radius: 20px; letter-spacing: 10px; font-size: 18px; font-weight: bold; background: linear-gradient(90deg, #00C1DC 0%, #00AAFF 100%); " @click="login">
          登 陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


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
      rules:{
        Count: [{ required: true, message: "*账号不能为空" }],
        Password: [{ required: true, message: "*密码不能为空" }]
      },
      router: new Router(),
      pwdType: 'password',
    }
  },
  methods: {
    login() {
      this.$refs['Loginform'].validate((valid) => {
      if (valid) {
        let that = this;
        let formdata = new FormData()
        formdata.append('Count', this.user.Count)
        formdata.append('Password', this.user.Password)
        this.$axios.post('/weblogin', formdata)
          .then(function (response) {
            const data = response.data
            console.log(data)
            if (data.msg == 'True') {
              that.$router.push({ path: '/Check' })
            }
            else {
              alert("账号或密码错误")
            }
          })
          .catch(error => {
            console.error('Error submitting data:', error)
          });
      } else {
        alert("账号或密码为空");
        return false;
      }
    });
    }
  }
}
</script>



<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
.el-input__inner::placeholder {
  color: #ccc;
  font-size: 16px;
}
.custom-input .el-input__prefix .el-input__icon {
  font-size: 20px !important; /* 设置前缀图标的字体大小 */
}
/* reset element-ui css */
.login-container {
  overflow-y: auto;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;


    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      padding: 12px 30px 12px 35px;
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
    border-radius: 20px;
    color: #454545;
  }
  
}


</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login_bt:hover{
  background: linear-gradient(90deg, #01CEDD 0%, #0188CB 100%) !important;
}
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
    background-color:#6d727b;
    border-radius: 30px;
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
