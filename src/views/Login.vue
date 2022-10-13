<template>
  <div >
    <br><br><br><br><br><br><br><br><br><br><br><br>
    <el-row>
      <el-col :span="8" push="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>新闻系统</span>
          </div>
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="12" push="6">
                <div class="grid-content bg-purple">
                  <el-input v-model="username" placeholder="请输入用户名"></el-input>
                </div>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col :span="12" push="6">
                <div class="grid-content bg-purple">
                  <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                </div>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col>
                <div class="grid-content bg-purple">
                  <el-button @click="login">登录</el-button>
                  <el-button @click="toRegister">注册</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>



  </div>
</template>

<script>
import instance from "../utils/request";

export default {
  name: "Login",
  data(){return{
    username: "",
    password: "",
  }},
  methods:{
    login(){
      instance.post("/login",{"username":this.username,"password":this.password}).then(res=>{
        localStorage.setItem("token",res.data.data.token);
        localStorage.setItem("id",res.data.data.id);
        this.$router.push({name:'ArticleList'})
        if (res.data.code != 200){
          this.$message.error(res.data.msg);
        }
      })
    },
    toRegister(){
      this.$router.push({name:'Register'})
    }
  },
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 700px;
}
</style>
