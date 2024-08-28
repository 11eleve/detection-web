<script>
    export default {
      data(){
        return {
          add:'123',
          auto:false,
        }
      },
      methods:{
        log(){
          this.$router.replace('/');
        },
        tocheck(){
          this.$router.replace('/Check');
        },
        touser(){
          this.$router.replace('/User');
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
                <el-menu-item index="1-2">设置</el-menu-item>
                <el-menu-item index="1-3" @click="touser">个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu> 
          </el-menu>
        </el-col>
      </el-aside>
      <el-main style="width:100%">  
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>登陆</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col>
          <el-card shadow="always" style="height:600px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <!-- <el-form-item label="一键补充" prop="name">
                <el-input v-model="add"></el-input>
              </el-form-item> -->
              <el-form-item label="一键审核" prop="delivery">
                <el-switch v-model="auto"></el-switch>
              </el-form-item>
            </el-form>
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