<script>
    export default {
      data(){
        return {
          msg:'hello vue',
          email:'abcd@qq.com',
          count:'123456',
          name:'xxl',
        }
      },
      methods:{
        log(){
          this.$router.replace('/');
        },
        tocheck(){
          this.$router.replace('/Check');
        },
        toset(){
          this.$router.replace('/Set');
        },
      }
    }
</script>

<template>
  <el-container>
    <el-header class="el-header">   
      <el-dropdown>
        <i class="el-icon-user-solid" style="margin-right: 15px ; color: aliceblue;"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="log">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside style="width: 200px;">
        <el-col :span="12" style="height: 681px; width: 100%; background-color:#2d3a4b;">
          <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>后台管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">功能</template>
                <el-menu-item index="1-1" @click="tocheck">审核</el-menu-item>
                <el-menu-item index="1-2" @click="toset">设置</el-menu-item>
                <el-menu-item index="1-3">个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu> 
          </el-menu>
        </el-col>
      </el-aside>
      <el-main style="width:100%">  
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>登陆</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col>
          <el-card shadow="always" style="height:600px ;color:#409EFF;">
            <el-card>
              <div style="padding:10px 0;text-align:center;">
                <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                  <el-form-item prop="email" label="邮箱:">{{ email }}</el-form-item>
                  <el-form-item label="账号:">{{ count }}</el-form-item>
                  <el-form-item label="昵称:">{{ name }}</el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
 .el-header{
    background-color:#2d3a4b;
    text-align: right;
    font-size: 12px; 
    line-height:60px;
  }
  .title{
    color: #cbd7daf2;
  }
  .asider{
    background-color:rgb(238, 241, 246);
    height:680px;
    width:200px;
    background-color:#2d3a4b;
    color: #cbd7daf2;
  }
  .breadcrumb{
    margin-left: 20px;
  }
</style>