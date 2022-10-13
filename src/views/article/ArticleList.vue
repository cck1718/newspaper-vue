<template>
  <div>
    <div style="margin: 20px 0;"></div>

    <el-row>
      <el-col :span="10" push= 7 >
        <el-radio-group v-model="qwe">
          <el-button  @click="toCategory(0)">全部</el-button>
          <el-button  @click="toCategory(category[0].id)">{{category[0].name}}</el-button>
          <el-button  @click="toCategory(category[1].id)">{{category[1].name}}</el-button>
          <el-button  @click="toCategory(category[2].id)">{{category[2].name}}</el-button>
          <el-button  @click="toCategory(category[3].id)">{{category[3].name}}</el-button>
          <el-button  @click="toCategory(category[4].id)">{{category[4].name}}</el-button>
          <el-button  @click="toCategory(category[5].id)">{{category[5].name}}</el-button>
          <el-button  @click="toCategory(category[6].id)">{{category[6].name}}</el-button>
          <el-button  @click="toCategory(category[7].id)">{{category[7].name}}</el-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <hr>
    <br>


    <el-table
      ref="multipleTable"
      :data="articles"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="getE">
      <el-table-column
        width="80">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="300"
        width="360">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="描述"
        min-width="300"
        width="360">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="300"
        width="360">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        min-width="300"
        width="360">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="300"
        width="335">
        <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
          <el-button  @click="dialogFormVisible = true" icon="el-icon-tickets"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>


    <el-dialog title="文章详情" :visible.sync="dialogFormVisible">
      <el-form :model="article">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input readonly v-model="article.title" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input readonly v-model="article.user" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="类别" :label-width="formLabelWidth">
          <el-input readonly v-model="article.category" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input  v-model="article.content"
                     readonly
                    type="textarea"
                    size="medium"
                    rows="12"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返 回</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import instance from "../../utils/request";

export default {
  name: "ArticleList",
  data(){return{
    category:[],
    articles:[],
    userId: localStorage.getItem('id'),

    article: {
      id:'',
      title: '',
      summary: '',
      content: '',
      categoryId:'',
      user:'',
      category:'',
      delivery: false,
    },
    qwe:'',
    formLabelWidth: '120px',
    dialogTableVisible: false,
    dialogFormVisible: false,
  }},
  methods:{
    findCategory(){
      instance.post("/category/findAll").then(res=>{
        this.category=res.data.data;
      })
    },
    findAllArticle(){
      instance.post("/article/findAll").then(res=>{
        console.log(res.data.data);
        this.articles=res.data.data;
      })
    },
    getE(row){
      this.article.id=row.id;
      this.article.title=row.title;
      this.article.summary=row.summary;
      this.article.content=row.content;
      this.article.categoryId=row.categoryId;
      instance.post("/user/findById",{'id':this.userId}).then(res=>{
        this.article.user=res.data.data.username
      })
      instance.post("/category/findById",{'id':this.article.categoryId}).then(res=>{
        this.article.category=res.data.data.name
      })
    },
    toCategory(id){
      if (!id){
        this.findAllArticle();
        return;
      }
        instance.post("/article/findByCategory",{'categoryId':id}).then(res=>{
          this.articles = res.data.data;
        })

    },





    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created() {
    this.findCategory();
    this.findAllArticle();
  }
}
</script>

<style scoped>

</style>
