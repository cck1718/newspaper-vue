<template>
  <div>
    <br><br><br><br><br>
    <el-row>
      <el-col :span="8" push="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户注册</span>
            <el-button @click="username='',phone='',password='',password1=''" style="float: right; padding: 3px 0" type="text" >
              <i class="el-icon-delete"></i>
            </el-button>
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
                  <el-input placeholder="请输入手机号码" v-model="phone"></el-input>
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
              <el-col :span="12" push="6">
                <div class="grid-content bg-purple">
                  <el-input placeholder="请再次输入密码" v-model="password1" show-password></el-input>
                </div>
              </el-col>
            </el-row>
            <br>
            <el-row :gutter="20">
              <el-col>
                <div class="grid-content bg-purple">
                  <el-button @click="toRegister">注册</el-button>
                  <el-button @click="re">返回</el-button>
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
  name: "Register",
  data() {
    return {
      username:"",
      phone:"",
      password1:"",
      password:""
      }
    },
  methods:{
    re(){
      this.$router.push({name:'Login'});
    },
    toRegister() {
      if (!this.username){
        this.$message.error("用户名不能为空")
        return;
      }
      if (!this.phone){
        this.$message.error("手机号不能为空")
        return;
      }
      if (!this.password){
        this.$message.error("密码不能为空")
        return;
      }
      if (!this.password1){
        this.$message.error("请再次输入密码")
        return;
      }
      if (this.password != this.password1){
        this.$message.error("两次密码不一致")
        return;
      }
      instance.post("/user/findName",{"username":this.username}).then(res=>{
        if (res.data.code != 200) {
          this.$message.error(res.data.msg);
          return;
        }
        instance.post("/user/register",{"username":this.username,"phone":this.phone,"password":this.password}).then(res=>{
          if (res.data.code != 200){
            this.$message.error("注册失败");
            return;
          }
          this.$message.success(res.data.msg)
          this.username="";
          this.phone="";
          this.password="";
          this.password1="";
        })
      })
    }
  }
  }
</script>

<style scoped>

</style>
