<template>
  <el-container >
    <el-header class="el-header" style="display: flex;align-items: center;">
      <img src="../image/logo.png" style="height : 50px; width: 50px; float: left; ">
      <div style="color: #fff;font-size:25px; font-weight: bold;text-overflow: ellipsis;white-space: nowrap; height : 50px;display: flex;align-items: center; justify-content: center;margin-left: auto;">
        井盖隐患智能处理系统
      </div>
      <!-- <img src="../image/ai-header-logo.png" style="height : 32px; width: 253px; float: left; "></img> -->
      <el-dropdown style="margin-left: auto;">
          <i class="el-icon-user-solid" style="margin-right: 15px ; color: #fff; font-size: 20px; ">
            <span style="margin-left: 5px; font-size: 16px">账号</span> 
          </i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="log">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="height: calc(100vh - 60px);">
      <el-aside style="width: 200px;  height: calc(100vh - 60px);">
        <el-col :span="12" style=" height: 100%;width: 100%; background-color:#2d3a4b;">
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
      <el-main style="width:100%;height: calc(100vh - 60px);">
        <div style="display: flex; align-items: center; height: 25px;">
          <i v-if="inout" @click="backall" class="el-icon-back" style="font-size: 25px;cursor: pointer; border-radius: 10px;color: #999999;"> </i>
        <el-breadcrumb separator="/" :style="{'align-items':'center', display: 'flex', 'margin-left':inout? '':'25px'}">
          <el-breadcrumb-item>登陆</el-breadcrumb-item>
          <el-breadcrumb-item>后台管理</el-breadcrumb-item>
          <el-breadcrumb-item>审核</el-breadcrumb-item>
          <el-breadcrumb-item v-if="inout">具体内容</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        
        <el-col  style="height: calc(100vh - 136px); width: 100%;">
          <el-card v-if="inout" shadow="always" style="display: flex;margin-top: 10px;" :body-style="{display:'flex',width:'100%'}">
            <el-col :span="6" style="width: 30%;">
              <el-card style="color:#409EFF; ">
                <div><i class="el-icon-s-flag" />类别</div>
                <div v-if="imageData.class.length!=0" style="padding:10px 0;text-align:center;">{{ imageData.class[choosenum] }}</div>
                <div v-if="imageData.class.length==0" style="padding:10px 0;text-align:center;">class</div>
                
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
            <div class="image" style="flex-grow: 1; align-items: center; justify-content: center;">
              <div style="display: flex;align-items: center; justify-content: center;">
                <img :src="imageData.Image" ref="img" id="image" style="height:400px; width:400px;" fit="fill" @load="getImagePosition" > 
                <canvas  @mousedown="canvasDown"  @mouseup="canvasUp" @mousemove="canvasMove" ref="Canvas" id="Canvas" :width=image.displayWidth :height=image.displayHeight  :style="{position: 'absolute', left: image.left+'px', top: image.top+ 'px'}"  ></canvas>
                
               
              </div>
              <div v-if="this.box.length>0" style="display: flex;align-items: center; justify-content: center;">
                <div v-for="(item,index) in box" :key="index" >
                  <div @click="chose(index)" style="transition: background-color 0.3s;" :style="{border: choosenum==index? '2px solid #000':'', 'background-color': choosenum==index?'#39a2df':'#ccc', margin: '0 10px', 'margin-top': '10px', height: '40px', width: '40px', 'border-radius': '10px', 'align-items': 'center', display: 'flex','justify-content': 'center', cursor: 'pointer'}">
                    <div style="font-size: 25px;text-align: center; color: #fff;">{{index+1}}</div>
                  </div>
                </div>
              </div>
              <div v-if="this.box.length==0" style="height: 50px;">
               
              </div>
              <div style="display: flex; justify-content: center; align-items: center;margin-top: 80px;">
                <el-button type="primary" style="border-radius: 10px; background-color: #409EFF; " @click="pre">上一张</el-button>
                <el-button type="primary" style="border-radius: 10px; background-color: #409EFF;" @click="nexts">下一张</el-button>
                <el-button type="info" style="border-radius: 10px; background-color: #999999;" @click="pushsql">保存上传</el-button>
                <el-button type="primary" style="border-radius: 10px; background-color: #409EFF;" @click="joborder">维修</el-button>
                <el-button type="success" style="border-radius: 10px; background-color: #99CCCC;" @click="add">添加</el-button>
                <el-button type="danger" style="border-radius: 10px; background-color: #F56C6C; border: '1px solid #F56C6C'; " @click="derect">删除</el-button>
                <el-dropdown style="margin-left: 10px;">
                <el-button style="border-radius: 10px;" type="primary">更改类别<i class="el-icon-arrow-up"></i></el-button>
              <el-dropdown-menu>
          
                <el-dropdown-item @click.native="change('good')">good</el-dropdown-item>
                <el-dropdown-item @click.native="change('broke')">broke</el-dropdown-item>
                <el-dropdown-item @click.native="change('circle')">circle</el-dropdown-item>
                <el-dropdown-item @click.native="change('lose')">lose</el-dropdown-item>
                <el-dropdown-item @click.native="change('uncovered')">uncovered</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
              </div>
              
            </div>
            
          </el-card>
          <el-card v-if="!inout" shadow="always" style="display: flex;height: calc(100vh-136px); margin-top: 10px;" :body-style="{width:'100%',height:'calc(100vh-136px)'}">
            <div style="display: flex; justify-content: flex-start; align-items: center;margin-left: 5% ">
                <div>
                    日期：{{ nowDate }}
                </div>
                <el-button type="primary" @click="refresh" class="refreshs"  >刷 新</el-button>
            </div>
            <el-card :style="{ 'margin-top': '10px', height: 'calc(100vh - 234px)',overflow: 'auto' } ">
              <div :style="{margin:  '0 auto', width: '95%'}">
              <el-card @click="infoi(index)" :body-style="{ padding: '0',display:'flex',width:'100%','align-items': 'center' }" v-for="(item,index) in imagenum"   :class="check[index]? 'el-card-hoverc':'el-card-hover'" :key="index" :style="{display: 'flex', cursor: 'pointer',height: '30px','margin-top' : '8px', 'margin-bottom': '8px','border-radius': '10px', 'background-color': check[index]?'#ccc':'#39a2df'}"  >
                <div @click="infoi(index)" style="display: flex; justify-content: center; align-items: center;width: 100%;">
                  <div style="width: 100px;">
                    <span style="display: flex; align-items: center;justify-content: center;color: #000;min-width: 20px; margin-left: 5px;font-weight: bold; border-radius: 5px; font-size: 80%; background-color: #fff;text-align: center">{{index+1}}</span>
                  </div>
                  <span style="margin-left:5%; color: #000;font-weight: bold; overflow: hidden;">上传人员:</span>
                  <span style="color: #fff;margin-left: 5%;font-weight: bold;overflow: hidden;">checker1</span>
                  <span style="margin-left:15%; color: #000; font-weight: bold;overflow: hidden;">上传时间:</span>
                  <span style="color: #fff;margin-left: 5%;font-weight: bold;overflow: hidden;">2024/5/16</span>
                  <el-checkbox  disabled  :checked="check[index]" style="margin-left: auto;margin-right: 5px;" ></el-checkbox>
                </div>
                </el-card>
            </div>
            </el-card> 
             
            
            
            
          </el-card>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  data() {
    return {
      inout:false,
      imageData: {
        Image: require("../image/aaa.jpg"),
        Longitude: '108.83444',
        Latitude: '34.12356',
        class: ['broke'],
        Words: '无',
      },
      forms:[{
        Image: require("../image/well1_0104.jpg"),
        Words:'部分破损',
        class:['good','broke'],
        Longitude:'108.832683',
        Latitude:'34.127581',
        box:[[42,38,330,140],[30,180,360,180]]
      },
      {
        Image: require("../image/well2_0245.jpg"),
        Words:'丢失',
        class:['lose'],
        Longitude:'108.832217',
        Latitude:'34.127631',
        box:[[24,88,320,220]]
      },
    ],
      image : {
					imageWidth: 0,  // 图片的原始宽度
					imageHeight: 0,  // 图片的原始高度
					displayWidth: 0,  // 图片的显示宽度
					displayHeight: 0 ,// 图片的显示高度 
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				},
      box: [[24,88,320,220],[0,0,20,20]],//更改的
      boxo: [[0,0,100,100],[0,0,20,20]],//原始
      check: [false,false],
      imagenum:[],
      outindex:0,
      choosenum: 0,
      touchrect:{
					x: 0,
					y: 0,
					w: 0,
					h: 0,
          flag:false
					// finish:false
			},
      Loc:'此处为图片拍摄地理位置',
      nowDate:''
    }
  },
  created(){
    this.gettime();  
  },
  mounted() {
    // this.$nextTick(() => {
    //     this.box.forEach((item,index) => {
    //     this.draw(index);
    //     });
    // });
    if(this.inout){
      setTimeout(() => {
      this.box.forEach(()=>{    //js遍历数组
          this.draw(); //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
		});
    }, 500);
    }
    
    window.addEventListener('resize', ()=>{this.getImagePosition()});
       //js遍历数组
    window.addEventListener('resize', () => {this.draw()}); //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
	
    
    
  },
  beforeDestroy() {
    window.addEventListener('resize', ()=>{this.getImagePosition()});
       //js遍历数组
    window.addEventListener('resize', () => {this.draw()});  //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
		

  },
  methods: {
    infoi(index){
      console.log('打的');
      this.outindex = index;
      this.inout = true;
      this.imageData.Image = this.forms[index].Image;
      this.imageData.class = this.forms[index].class;
      this.imageData.Words = this.forms[index].Words;
      this.imageData.Latitude = this.forms[index].Latitude;
      this.imageData.Longitude = this.forms[index].Longitude;
      this.box = this.forms[index].box;
      this.boxo = this.forms[index].box;
      this.getloc();
      setTimeout(() => {
        this.$nextTick(() => {
        this.draw();
      });
      }, 100);
      
    },
    refresh(){
      this.gettime();
      this.imagenum=this.forms;
      this.imagenum.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,)
    },
    gettime() {
      this.nowDate = new Date().toLocaleDateString();
    },
    tocheck() {
      // method implementation
    },
    backall() {
      // method implementation
      this.inout = !this.inout;
      this.gettime();  
    },
    pre() {
      // method implementation
      this.choosenum = 0;
      if(this.outindex>=1){
        this.outindex = this.outindex-1;
        this.infoi(this.outindex);
      }
      
    },
    derect() {
      // method implementation
      let l =this.box.length;
      this.imageData.class.splice(this.choosenum,1);
      console.log(this.imageData.class.length,'dwa');
      
      this.box.splice(this.choosenum,1);
      this.$nextTick(() => {
        this.draw();
      });
      if(this.choosenum== l-1){
        this.choosenum=this.choosenum-1;
      }
    },
    canvasDown(e){
        this.touchrect.flag = true;
        console.log("鼠标落下");
        this.touchrect.x = e.offsetX;
        this.touchrect.y = e.offsetY;
    },
    canvasUp(e){
        this.touchrect.flag = false;
        console.log("鼠标抬起");
    },
    canvasMove(e){
      console.log("鼠标移动")
      this.$nextTick(() => {
        this.drawRect(e);
      });
      
    },
    drawRect(e){
      if(this.touchrect.flag){
        const canvas = this.$refs.Canvas;
        const ctx = canvas.getContext('2d');
        let x = Math.min(this.touchrect.x,e.offsetX);
        let y = Math.min(this.touchrect.y,e.offsetY);
        this.touchrect.w = Math.abs(e.offsetX - this.touchrect.x);
        this.touchrect.h = Math.abs(e.offsetY - this.touchrect.y);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        this.box.forEach((item, index) => {
          if (index != this.choosenum) {  // 只绘制未被选中的矩形
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)' ;
            ctx.lineWidth = 3;
            ctx.fillStyle = 'rgba(255, 255, 255,0)';
            ctx.fillRect(this.box[index][0], this.box[index][1], this.box[index][2], this.box[index][3]);
            ctx.strokeRect(this.box[index][0], this.box[index][1], this.box[index][2], this.box[index][3]); 
          }
          else{
            ctx.strokeStyle = '#409EFF' ;
            ctx.lineWidth = 3;
            ctx.fillStyle = 'rgba(255, 255, 255,0.2)';
            ctx.fillRect(x, y, this.touchrect.w, this.touchrect.h);
            ctx.strokeRect(x, y, this.touchrect.w, this.touchrect.h);
            this.box[index][0] =x;
            this.box[index][1] =y;
            this.box[index][2] =this.touchrect.w;
            this.box[index][3] =this.touchrect.h;
          }
        });

      }
    },
    clickcanvas(e){
      console.log('点击位置:',e.offsetX);
    },
    add(){
      this.box.push([]);
      this.imageData.class.push('class');
      this.choosenum = this.box.length-1;
      this.$nextTick(() => {
        this.draw();
    });
      
    },
    chose(index){
      this.choosenum = index;
      this.box.forEach((item,index)=>{    //js遍历数组
        if(this.box[index].every(value => value==0)){
          this.box.splice(index, 1);
        }  
        this.draw(); 
      })//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。 
    },
    draw(){
        if(this.inout){
          const canvas = this.$refs.Canvas;
      // const canvas = document.querySelector('#Canvas'+index);
      
        const ctx1 = canvas.getContext('2d');
        const width1 = canvas.width;
        const height1 = canvas.height;
        const aspectRatio = width1 / height1;
        console.log('高L',height1);
        console.log('宽',width1);
        console.log("Canvas 宽高比:", aspectRatio);
        ctx1.clearRect(0, 0, canvas.width, canvas.height);
        this.box.forEach((box, index) => {
          ctx1.strokeStyle = this.choosenum == index? '#409EFF':'rgba(255, 255, 255, 0.5)' ;
          ctx1.lineWidth = 3;
          ctx1.fillStyle = this.choosenum == index?'rgba(255, 255, 255, 0.2)':'rgba(255, 255, 255,0)';
          ctx1.fillRect(this.box[index][0], this.box[index][1], this.box[index][2], this.box[index][3]);
          ctx1.strokeRect(this.box[index][0], this.box[index][1], this.box[index][2], this.box[index][3]); 
        });
        }
        
      
    },
    getImagePosition() {
      if(this.inout){
        const imgElement = this.$refs.img;
      const rect = imgElement.getBoundingClientRect();
      this.image.left = rect.left;
      this.image.top = rect.top;
      this.image.displayWidth = rect.width;
      this.image.displayHeight = rect.height;
      console.log('图片的位置：', this.image.displayWidth);
      console.log('图片的位置：', this.image.displayHeight);
      }
      

    },
    nexts() {
      // let that = this;
      // this.$axios.get('/getinfo')
      //   .then(response => {
      //     console.log(this);
      //     // 解析响应数据
      //     const data = response.data
      //     if (data.msg == 'Suc') {
      //       that.imageData.Image = that.$BASEURL.BASEURL+`/getimage?timestamp=${new Date().getTime()}`
      //       that.imageData.class = data.Class
      //       that.imageData.Words = data.Words
      //       console.log(this.imageData.Words)
      //       that.imageData.Longitude = data.Longitude
      //       console.log(this.imageData.Longitude)
      //       that.imageData.Latitude = data.Latitude
      //       console.log(this.imageData.Latitude)
      //       this.getloc()
      //     } else if (data.msg == 'Over') {
      //       alert("没有更多信息");
      //       that.imageData.Image = require("../image/aaa.jpg");
      //     }
      //     // 更新图片和字符串数据
      //   })
      //   .catch(error => {
      //     console.error('Error getting data:', error)
      //   });

      this.choosenum = 0;
      if(this.outindex <= this.forms.length-2){
        this.outindex = this.outindex+1;
        this.infoi(this.outindex);
      }
      
    },
    change(name) {
      console.log("change good");
      console.log(this.choosenum);
      // this.imageData.class[this.choosenum] = name;
      this.$set(this.imageData.class, this.choosenum, name);
      console.log(this.imageData.class);
    },
    pushsql() {
      alert('保存并上传成功')
      this.imageData.class = this.forms[this.outindex].class;
      this.box = this.forms[this.outindex].box;
      this.check[this.outindex] = true;
      // let formdata = new FormData()
      // formdata.append('Longitude', this.imageData.Longitude)
      // formdata.append('Latitude', this.imageData.Latitude)
      // // 向Flask发送POST请求
      // this.$axios.post('/pushsql', formdata)
      //   .then(response => {
      //     const data = response.data;
      //     if (data.msg == 'True') {
      //       alert('上传成功')
      //     }
      //     else {
      //       alert('上传失败')
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error submitting data:', error);
      //   });
    },
    joborder() {
      alert('工单上传成功')
      this.imageData.class = this.forms[this.outindex].class;
      this.box = this.forms[this.outindex].box;
      this.check[this.outindex] = true;
      // let formdata = new FormData()
      // formdata.append('Longitude', this.imageData.Longitude)
      // formdata.append('Latitude', this.imageData.Latitude)
      // formdata.append('Class', this.imageData.class)
      // formdata.append('Words', this.imageData.Words)
      // // 向Flask发送POST请求
      // this.$axios.post('/joborder', formdata)
      //   .then(response => {
      //     const data = response.data
      //     if (data.msg == 'True') {
      //       alert('上传成功')
      //     } else {
      //       alert('上传失败')
      //     }
      //   })
      //   .catch(error => {
      //     console.error('Error submitting data:', error)
      //   });
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
  height: 20px;
}
.el-icon-back:hover{
  background-color: #ccc;
  
}
.el-card-hover:hover {
  background-color: #999999 !important; /* 你想要在 hover 时应用的背景颜色 */
}
.el-card-hoverc:hover{
  background-color: #ccc !important;
}
.el-checkbox{
  color: #000 !important;
}
.el-checkbox__inner{
  border-radius: 10px ;
  width: 20px;
  height: 20px;
  background-color: #fff;
  
}

.el-checkbox__inner::after {
    border: 3px solid #0ae715 ;
    border-left: 0;
    border-top: 0;
    left: 5px;
    top: 5px;

    
}

.el-checkbox__input.is-checked .el-checkbox__inner::after {
        transform: rotate(50deg) scaleY(1.3);
       
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: #fff;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #ffffff !important;
    border-color: #DCDFE6 !important;
}
.el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #ffffff !important;
    border-color: #DCDFE6 !important;
}
.el-checkbox__input.is-disabled .el-checkbox__inner::after{
  border-color: #0ae715 !important;
  color: #3faceb;
}


.refreshs{
  background-color: #39a2df;
  border-radius: 13px;
  margin-left: auto;
  height: 36px; 
  margin-right: 5%;
}
.refreshs:hover{
  background-color: #0080cc;
}
</style>