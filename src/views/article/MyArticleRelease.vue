<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="articles"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="getE">
      <el-table-column
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        min-width="300"
        width="300">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="300"
        width="300">
      </el-table-column>
      <el-table-column
        prop="summary"
        label="描述"
        min-width="300"
        width="300">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="300"
        width="300">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="修改时间"
        min-width="300"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="300"
        width="300">
        <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
          <el-button type="primary" @click="dialogFormVisible = true" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
          <el-button type="primary" @click="dialogVisible = true" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>



    <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
      <el-form :model="article">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="article.id" autocomplete="off" readonly show-word-limit maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="article.title" autocomplete="off" show-word-limit maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="article.summary" autocomplete="off" show-word-limit maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input v-model="article.content"
                    type="textarea"
                    maxlength="3000"
                    show-word-limit
                    size="medium"
                    rows="12"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;update()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定要删除这份草稿吗？删除后将不可恢复！</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false;del() ">确 定</el-button>
  </span>
    </el-dialog>


  </div>
</template>

<script>
import instance from "../../utils/request";

export default {
  name: "MyArticleRelease",
  data(){return{
    id: this.$route.query.id,
    articles:[],


    dialogVisible: false,
    dialogTableVisible: false,
    dialogFormVisible: false,
    article: {
      id:'',
      title: '',
      summary: '',
      content: '',
      delivery: false,
    },
    formLabelWidth: '120px'

  }},
  methods:{
    findAllDraft(){
      instance.post("/article/findAllByUser",{'createBy':this.id,'status':0}).then(res=>{
        console.log(res.data.data);
        this.articles=res.data.data;
      })
    },
    getE(row){
      this.article.id=row.id;
      this.article.title=row.title;
      this.article.summary=row.summary;
      this.article.content=row.content;
    },
    update(){
      if (!this.article.title){this.$message.error("文章标题不能为空"); return;}
      if (!this.article.summary){this.$message.error("文章描述不能为空"); return;}
      if (!this.article.content){this.$message.error("文章内容不能为空"); return;}
      instance.post("/article/edit",{'id':this.article.id, 'title':this.article.title, 'summary':this.article.summary, 'content':this.article.content}).then(res=>{
        if (res.data.code == 200){
          this.article.title="";
          this.article.summary="";
          this.article.content="";
          this.$message.success(res.data.msg);
          return;
        }
        this.$message.error(res.data.msg);
      })
    },
    del(){
      instance.post("/article/del",{'id':this.article.id}).then(res=>{
        if (res.data.code == 200){
          this.$message.success(res.data.msg);
          this.findAllDraft();
          return;
        }
        this.$message.error(res.data.msg);
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
    this.findAllDraft()
  }
}
</script>

<style scoped>

</style>
