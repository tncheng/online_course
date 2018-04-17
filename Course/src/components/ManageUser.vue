<template>
  <div class="all-user">
      <div style="margin:20px">
        <el-button type="info" @click="userFreez">冻结</el-button>
        <el-button type="danger" @click="userDelete">删除</el-button>
        <el-button type="primary" @click="setAuthority">修改权限</el-button>
        <el-dialog title="修改权限" :visible.sync="authorityDialog">
            <el-form>
              <el-form-item label="权限等级" label-width="120px" style="text-align: left;">
                <el-select v-model="desAuthority" placeholder="选择权限">
                  <el-option label="领导" value=4></el-option>
                  <el-option label="系统管理员" value=3></el-option>
                  <el-option label="课程管理员" value=2></el-option>
                  <el-option label="普通会员" value=1></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="authorityDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleSet">确 定</el-button>
            </div>
          </el-dialog>
      </div>
          <el-table ref="multipleTable" :data="userTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="用户名" width="220" prop="name">
              </el-table-column>
              <el-table-column prop="email" width="220" label="邮箱" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="tag" label="标签" width="200" :filters="[{text:'领导',value:'领导'},{text:'课程管理员',value:'课程管理员'},{text:'系统管理员',value:'系统管理员'},{text:'普通会员',value:'系统管理员'}]" :filter-method="filterTag" filter-placement="bottom-end">
                  <template slot-scope="scope">
                      <el-tag :type="scope.row.tag==='boss' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column label="状态" width="220" prop="state">
              </el-table-column>
          </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "boss",
      authorityDialog: false,
      desAuthority: "",
      userTable: [
        { name: "tom", email: "10068@qq.com", tag: "领导", state: "正常" },
        {
          name: "shaun",
          email: "10068@qq.com",
          tag: "系统管理员",
          state: "正常"
        },
        {
          name: "jim",
          email: "10068@qq.com",
          tag: "课程管理员",
          state: "正常"
        },
        { name: "jacm", email: "10068@qq.com", tag: "普通会员", state: "正常" },
        { name: "tom", email: "10068@qq.com", tag: "领导", state: "正常" }
      ],
      operationList: []
    };
  },
  created() {
    this.reqAllUser("/userManagement");
  },
  methods: {
    handleSelectionChange: function(selection) {
      this.operationList = selection;
      console.log(this.operationList);
    },
    filterTag: function(value, row) {
      return row.tag === value;
    },
    userFreez: function() {
      var posttable = { emailList: [] };
      for (var i = 0; i < this.operationList.length; i++) {
        posttable.emailList.push(this.operationList[i].email);
      }
      this.$ajax
        .post("/userManagement?operation=freeze", posttable)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.reqAllUser("/userManagement");
      this.done("冻结成功");
    },
    userDelete: function() {
      var posttable = { emailList: [] };
      for (var i = 0; i < this.operationList.length; i++) {
        posttable.emailList.push(this.operationList[i].email);
      }
      this.$ajax
        .post("/userManagement?operation=delete", posttable)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.reqAllUser("/userManagement");
      this.done("删除成功");
      console.log(this.operationList);
    },
    userAdd: function() {
      console.log(this.operationList);
    },
    setAuthority: function() {
      this.authorityDialog = true;
    },
    handleSet: function() {
      if (this.desAuthority === "") {
        this.fail("请选择需要修改的权限");
      } else {
        var auTable = { emailList: [], authority: this.desAuthority };
        for (var i = 0; i < this.operationList.length; i++) {
          auTable.emailList.push(this.operationList[i].email);
        }
        this.$ajax
          .post("/userManagement?operation=update", auTable)
          .then(function(response) {
            return response.data;
          })
          .catch(function(error) {
            console.log(error);
          });
        this.done("修改成功");
        this.reqAllUser("/userManagement");
        console.log(this.operationList);
        this.authorityDialog = false;
      }
    },
    reqAllUser: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          var body = response.data;
          var tempUserTable = [];
          for (var i = 0; i < body.data.length; i++) {
            var ta = "";
            var iden = "";
            var au = body.data[i].authority;
            if (au === 1) {
              ta = "普通会员";
              iden = "正常";
            } else if (au === 2) {
              ta = "课程管理员";
              iden = "正常";
            } else if (au === 3) {
              ta = "系统管理员";
              iden = "正常";
            } else if (au === 4) {
              ta = "领导";
              iden = "正常";
            } else if (au === 0) {
              ta = "会员";
              iden = "冻结";
            }
            tempUserTable.push({
              name: body.data[i].name,
              email: body.data[i].email,
              tag: ta,
              state: iden
            });
          }
          self.userTable = tempUserTable;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    done: function(info) {
      this.$message({
        message: info,
        type: "success"
      });
    },
    fail: function(info) {
      this.$message({
        message: info,
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.all-user {
  argin-left: 5px;
  margin-right: 5px;
  padding: 25px;
  text-align: left;
}
</style>
