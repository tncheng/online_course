<template>
  <div class="all-comment">
      <div style="margin:20px">
      <el-button type="danger" @click="commentDelete">删除</el-button>
      </div>
      <el-table ref="multipleTable" :data="commentTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="用户名" width="220" prop="name">
              </el-table-column>
              <el-table-column label="邮箱" width="220" prop="email">
              </el-table-column>
              <el-table-column prop="commentDetail" width="220" label="评论" show-overflow-tooltip>
              </el-table-column>
          </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      operationList: [],
      commentTable: [
        { email: "9", commentDetail: "this is my house", name: "吃不起饭" },
        { email: "9", commentDetail: "this is my house", name: "吃不起饭" },
        { email: "9", commentDetail: "this is my house", name: "吃不起饭" }
      ]
    };
  },
  created() {
    this.reqAllComment("/commentManagement");
  },
  methods: {
    done: function() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
    },
    fail: function() {
      this.$message({
        message: "操作失败",
        type: "warning"
      });
    },
    handleSelectionChange: function(selection) {
      this.operationList = selection;
      console.log(this.operationList);
    },
    commentDelete: function() {
      if (this.operationList.length > 0) {
        var data = { emailList: [] };
        for (var i = 0; i < this.operationList.length; i++) {
          data.emailList.push(this.operationList[i].email);
        }
        console.log(data.emailList);
        this.$ajax
          .post("/commentManagement?cmd=delete", data)
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        this.reqAllComment("/commentManagement");
        this.done();
      }
    },
    reqAllComment: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var tempCommentList = [];
          var body = response.data;
          for (var i = 0; i < body.data.length; i++) {
            tempCommentList.push({
              name: body.data[i].name,
              email: body.data[i].email,
              commentDetail: body.data[i].commentContent
            });
          }
          self.commentTable = tempCommentList;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.all-comment {
  argin-left: 5px;
  margin-right: 5px;
  padding: 25px;
  text-align: left;
}
</style>
