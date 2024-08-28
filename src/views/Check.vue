<script>
export default {
  data() {
    return {
      imageData: {
        Image: require("../image/aaa.jpg"),
        Longitude: '108.83444',
        Latitude: '34.12356',
        class: 'broke',
        Words: '无',
      },
      Loc:'此处为图片拍摄地理位置',
    }
  },
  methods: {
    next() {
      let that = this;
      this.$axios.get('http://192.168.0.109:5000/getinfo')
        .then(response => {
          console.log(this);
          // 解析响应数据
          const data = response.data
          if (data.msg == 'Suc') {
            that.imageData.Image = `http://192.168.0.109:5000/getimage?timestamp=${new Date().getTime()}`
            that.imageData.class = data.Class
            that.imageData.Words = data.Words
            console.log(this.imageData.Words)
            that.imageData.Longitude = data.Longitude
            console.log(this.imageData.Longitude)
            that.imageData.Latitude = data.Latitude
            console.log(this.imageData.Latitude)
            this.getloc()
          } else if (data.msg == 'Over') {
            alert("没有更多信息");
            Image = require("../image/aaa.jpg");
          }
          // 更新图片和字符串数据
        })
        .catch(error => {
          console.error('Error getting data:', error)
        });
    },
    change(name) {
      console.log("change good");
      console.log(this);
      this.$set(this.imageData, "class", name);
      console.log(this.imageData.class);
    },
    pushsql() {
      let formdata = new FormData()
      formdata.append('Longitude', this.imageData.Longitude)
      formdata.append('Latitude', this.imageData.Latitude)
      // 向Flask发送POST请求
      this.$axios.post('http://192.168.0.109:5000/pushsql', formdata)
        .then(response => {
          const data = response.data;
          if (data.msg == 'True') {
            alert('上传成功')
          }
          else {
            alert('上传失败')
          }
        })
        .catch(error => {
          console.error('Error submitting data:', error);
        });
    },
    joborder() {
      let formdata = new FormData()
      formdata.append('Longitude', this.imageData.Longitude)
      formdata.append('Latitude', this.imageData.Latitude)
      formdata.append('Class', this.imageData.class)
      formdata.append('Words', this.imageData.Words)
      // 向Flask发送POST请求
      this.$axios.post('http://192.168.0.109:5000/joborder', formdata)
        .then(response => {
          const data = response.data
          if (data.msg == 'True') {
            alert('上传成功')
          } else {
            alert('上传失败')
          }
        })
        .catch(error => {
          console.error('Error submitting data:', error)
        });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    log() {
      this.$router.replace({ path: '/' })
    },
    touser() {
      this.$router.replace({ path: 'User' })
    },
    toset() {
      this.$router.replace({ path: 'Set' })
    },
    getloc() {
      this.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?key=e6ea7ea443c76f665ee9b3f795523b10&location=${this.imageData.Longitude},${this.imageData.Latitude}&output=json`)
      .then(response => {
      // 解析响应数据
      console.log(response.data)
      const data = response.data
      if (data.status == '1') {
        this.Loc = data.regeocode.formatted_address
      }
      console.log(this.Loc)
      // 更新图片和字符串数据
    })
    .catch(error => {
      console.error('Error getting data:', error)
    });
    }
  },
}

</script>

<template>
  <el-container>
    <el-header class="el-header">
      <img src="../image/logo.png" style="height : 50px; width: 50px; margin-right: 1350px;"></img>
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
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>后台管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">功能</template>
                <el-menu-item index="1-1" @click="tocheck">审核</el-menu-item>
                <el-menu-item index="1-2" @click="toset">设置</el-menu-item>
                <el-menu-item index="1-3" @click="touser">个人信息</el-menu-item>
                <router-view></router-view>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main style="width:100%">
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item>登陆</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>审核</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col>
          <el-card shadow="always" style="height:600px">
            <el-col :span="6">
              <el-card style="color:#409EFF">
                <div><i class="el-icon-s-flag" />类别</div>
                <div style="padding:10px 0;text-align:center;">{{ imageData.class }}</div>
              </el-card>
              <el-card style="color:#F56C6C; margin-top: 40px;">
                <div><i class="el-icon-edit" />补充说明</div>
                <div style="padding:10px 0;text-align:center;">{{ imageData.Words }}</div>
              </el-card>
              <el-card style="color:#44c116; margin-top: 40px;">
                <div><i class="el-icon-location" />地理位置</div>
                <div style="padding:10px 0;text-align:center;">{{ Loc }}</div>
              </el-card>
            </el-col>
            <div class="image" style="margin-left: 500px;">
              <div class="block">
                <img :src="imageData.Image" style="height:400px; width:400px;" fit="contain">
                </img>
              </div>
            </div>
            <el-button type="primary" style="margin-left: 220px; margin-top: 10px;" @click="next">下一张</el-button>
            <el-button type="primary" @click="pushsql">上传</el-button>
            <el-button type="primary" @click="joborder">维修</el-button>
            <el-dropdown style="margin-left: 10px;margin-top: 100px;">
              <el-button type="primary">更改类别<i class="el-icon-arrow-up"></i></el-button>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="change('good')">good</el-dropdown-item>
                <el-dropdown-item @click.native="change('broke')">broke</el-dropdown-item>
                <el-dropdown-item @click.native="change('circle')">circle</el-dropdown-item>
                <el-dropdown-item @click.native="change('lose')">lose</el-dropdown-item>
                <el-dropdown-item @click.native="change('uncovered')">uncovered</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #2d3a4b;
  text-align: right;
  font-size: 12px;
  line-height: 60px;
}

.title {
  color: #cbd7daf2;
}

.asider {
  background-color: rgb(238, 241, 246);
  height: 680px;
  width: 200px;
  background-color: #354b2d;
  color: #cbd7daf2;
}

.breadcrumb {
  margin-left: 20px;
}
</style>