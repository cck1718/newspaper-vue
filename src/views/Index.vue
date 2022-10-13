<template>
  <div>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#909399"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" @click="toList()">博客中心</el-menu-item>
          <el-submenu index="3">
            <template slot="title" >我的文章</template>
            <el-menu-item index="3-1" @click="toDraft()">草稿</el-menu-item>
            <el-menu-item index="3-2" @click="toReleaseAfter()">已发布</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" @click="toRelease()">发布文章</el-menu-item>
          <el-button @click="drawer1 = true"  style="margin-left: 68%;">
            <i class="el-icon-user-solid"></i>
          </el-button>
          <el-button @click="drawer2 = true"  style="margin-left: 5px;">
            <i class="el-icon-s-tools"></i>
          </el-button>

          <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>退出登录？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="visible = false;logout()">确定</el-button>
            </div>
            <el-button slot="reference"><i class="el-icon-circle-close"></i></el-button>
          </el-popover>
        </el-menu>
      </el-header>

        <el-drawer
          title="个人信息"
          :visible.sync="drawer1"
          :direction="direction"
          :before-close="handleClose">
          <span>
            <br><br><br>
            <el-row>
              <el-col :span="16" push="4">
                <el-input v-model="id" :disabled="true">
                  <template slot="prepend">编 &nbsp&nbsp 号：</template>
                </el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                  <el-input v-model="user.username" >
                    <template slot="prepend">用户名：</template>
                  </el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                  <el-input v-model="user.phone">
                    <template slot="prepend">手机号：</template>
                  </el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                <el-badge class="item">
                  <el-button size="small" @click="sure1">保存</el-button>
                </el-badge>
                <el-badge class="item">
                  <el-button size="small" @click="remark">恢复</el-button>
                </el-badge>
              </el-col>
            </el-row><br>
          </span>
        </el-drawer>

    <el-drawer
      title="修改密码"
      :visible.sync="drawer2"
      :direction="direction">
          <span>
            <br><br><br>
            <el-row>
              <el-col :span="16" push="4">
                <el-input placeholder="输入旧密码" v-model="oldPwd" show-password></el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                  <el-input placeholder="输入新密码" v-model="newPwd1" show-password></el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                  <el-input placeholder="再次输入新密码" v-model="newPwd2" show-password></el-input>
              </el-col>
            </el-row><br>
            <el-row>
              <el-col :span="16" push="4">
                <el-badge class="item">
                  <el-button size="small" @click="sure2">修改密码</el-button>
                </el-badge>
              </el-col>
            </el-row><br>
          </span>
    </el-drawer>


    <router-view/>


  </div>
</template>

<script>
import instance from "../utils/request";

export default {
  name: "Index",
  data(){return{
    category: [],
    id:localStorage.getItem("id"),
    user:{},
    uname:"",
    phone:"",
    newPwd1:"",
    newPwd2:"",
    oldPwd:"",

    visible: false,
    activeIndex: '1',
    activeIndex2: '1',
    drawer1: false,
    drawer2: false,
    direction: 'rtl',
  }},
  methods:{
    findCategory(){
      instance.post("/category/findAll").then(res=>{
        this.category=res.data;
      })
    },
    myUserinfo(){
      instance.post("/user/findById",{"id":this.id}).then(res=>{
        this.user=res.data.data;
        this.uname=res.data.data.username;
        this.phone=res.data.data.phone;
      })
    },
    updateUser(){
      instance.post("/user/edit",{"id":this.user.id,"username":this.user.username,"phone":this.user.phone}).then(res=>{
        if (res.data.code == 200){
          this.$message.success(res.data.msg)
        }
        this.myUserinfo();
      })
    },
    remark(){
      this.user.username=this.uname;
      this.user.phone=this.phone;
    },
    toDraft(){
      this.$router.push({name:'MyArticleDraft',query: {id:this.user.id}});
    },
    toReleaseAfter(){
      this.$router.push({name:'MyArticleRelease',query: {id:this.user.id}});
    },
    toRelease(){
      this.$router.push({name:'AddArticle',query:{id:this.user.id,username:this.user.username}});
    },
    toList(){
      this.$router.push({name:'ArticleList'});
    },
    sure1(){
      if (!this.user.username || !this.user.phone){
        this.$message.error("个人信息不能为空");
        return;
      }
      this.$confirm('确认修改？').then(_ => {
          this.updateUser();
        }).catch(_ => {});
    },
    sure2(){
      if(!this.oldPwd || !this.newPwd1 || !this.newPwd2){
        this.$message.error("密码不能为空");
        return;
      }
      if (this.newPwd1 != this.newPwd2){
        this.$message.error("两次密码不一致");
        return;
      }
      instance.post("/user/checkPwd",{"id":this.user.id,"password":this.oldPwd}).then(res=>{
        if (res.data.code != 200){
          this.$message.error(res.data.msg);
          return;
        }
        instance.post("/user/changePwd",{"id":this.user.id,"password":this.newPwd2}).then(res=>{
          if (res.data.code == 200){
            this.$message.success(res.data.msg);
            this.oldPwd="";
            this.newPwd1="";
            this.newPwd2="";
            return;
          }
        })
      })
    },
    logout(){
      instance.post("/logout").then(res=>{
        if (res.data.code == 200){
          localStorage.clear();
          this.$router.push({name:'Login'});
        }
      })
    },




    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(done) {
      if (!this.user.username || !this.user.phone){
        this.$message.error("个人信息不能为空")
        return;
      }
      if (this.user.username != this.uname || this.user.phone != this.phone){
        this.$confirm('确认修改？')
          .then(_ => {
            this.updateUser();
            done();
          })
          .catch(_ => {});
      }else {
        done();
      }
    }
  },
  created() {
    this.findCategory()
    this.myUserinfo()
  }
}
</script>

<style>
.el-header, .el-footer {

  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
