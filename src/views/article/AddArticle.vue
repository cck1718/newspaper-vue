<template>
<!--  <h1>{{$route.params.user}}</h1>-->
  <div>
    <br><br><br><br>
    <el-input
      type="text"
      placeholder="请输入文章标题"
      v-model="title"
      maxlength="16"
      show-word-limit
    >
      <template slot="prepend">标题：</template>
    </el-input>

    <div style="margin: 20px 0;"></div>

      <el-row>
        <el-col :span="8">
          <el-radio-group v-model="categoryId">
            <el-radio-button >{{category[0].name}}</el-radio-button>
            <el-radio-button >{{category[1].name}}</el-radio-button>
            <el-radio-button >{{category[2].name}}</el-radio-button>
            <el-radio-button >{{category[3].name}}</el-radio-button>
            <el-radio-button >{{category[4].name}}</el-radio-button>
            <el-radio-button >{{category[5].name}}</el-radio-button>
            <el-radio-button >{{category[6].name}}</el-radio-button>
            <el-radio-button >{{category[7].name}}</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>

    <div style="margin: 20px 0;"></div>
    <el-input
      type="text"
      v-model="username"
      readonly
      show-word-limit
    >
      <template slot="prepend">作者：</template>
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="text"
      placeholder="请输入文章描述"
      v-model="summary"
      maxlength="30"
      show-word-limit
    >
      <template slot="prepend">描述：</template>
    </el-input>
    <div style="margin: 20px 0;"></div>
    <el-input
      type="textarea"
      placeholder="请输入文章内容"
      v-model="content"
      maxlength="3000"
      show-word-limit
      size="medium"
      rows="12"
    >
    </el-input>
    <br><br><br>
    <el-row :gutter="20">
      <el-col>
        <div class="grid-content bg-purple">
          <el-button @click="release(1)">草稿</el-button>
          <el-button @click="release(0)">发布</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import instance from "../../utils/request";

export default {
  name: "AddArticle",
  data() {
    return {
      id:localStorage.getItem("id"),
      username:this.$route.query.username,
      title:'',
      category:[],
      summary: '',
      content: '',
      categoryId: '',
    }
  },
  methods:{
    findCategory(){
      instance.post("/category/findAll").then(res=>{
        this.category=res.data.data;
      })
    },
    release(status){
      if (!this.title){this.$message.error("文章标题不能为空"); return;}
      if (!this.categoryId){this.$message.error("文章类别不能为空"); return;}
      if (!this.summary){this.$message.error("文章描述不能为空"); return;}
      if (!this.content){this.$message.error("文章内容不能为空"); return;}
      instance.post("/article/save",{'title':this.title,'content':this.content,'summary':this.summary,'categoryId':this.categoryId,'status':status}).then(res=>{
        if (res.data.code == 200){
          this.$message.success(res.data.msg);
          this.title="";
          this.categoryId="";
          this.summary="";
          this.content="";
        }
      })
    }
  },
  created() {
    this.findCategory();
  }
}
</script>

<style scoped>

</style>
