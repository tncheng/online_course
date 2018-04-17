<template>
  <div class="cate-all">
      <div style="margin:20px">
      <el-button type="primary" @click="cateAdd">增加</el-button>
      <el-button type="primary" @click="cateEdit">编辑</el-button>
      <el-button type="danger" @click="cateDelete">删除</el-button>
      <el-dialog title="新增分类" :visible.sync="addDialog">
            <el-form>
              <el-form-item label="分类名" label-width="120px" style="text-align: left;">
                <el-input v-model="descate" placeholder="请输入新的分类" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleAddcate">确 定</el-button>
            </div>
    </el-dialog>
      <el-dialog title="编辑分类" :visible.sync="editDialog">
            <el-form>
              <el-form-item label="分类名" label-width="120px" style="text-align: left;">
                <el-input v-model="descate" :placeholder="editObj" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取 消</el-button>
              <el-button type="primary" @click="handleEditcate">确 定</el-button>
            </div>
        </el-dialog>
      </div>
      <el-table ref="multipleTable" :data="cateTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column label="分类名称" width="800" prop="cateName">
              </el-table-column>
          </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      operationList: [],
      editObj: "",
      editDialog: false,
      addDialog: false,
      descate: "",
      cateTable: [
        { cateName: "人文", cateId: "909" },
        { cateName: "人文", cateId: "909" },
        { cateName: "人文", cateId: "909" },
        { cateName: "人文", cateId: "909" }
      ]
    };
  },
  created() {
    this.reqAllCate("/courseCateGory");
  },
  methods: {
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
    },
    cateDelete: function() {
      console.log(this.operationList);
      if (this.operationList.length > 0) {
        var data = { categoryIdList: [] };
        for (var i = 0; i < this.operationList.length; i++) {
          data.categoryIdList.push(this.operationList[i].cateId);
        }
        console.log(data);
        this.updatecate("/cateGoryManagement?cmd=delete", data);
        this.reqAllCate("/courseCateGory");
        this.done("删除成功");
        console.log("hel");
      }
    },
    cateAdd: function() {
      this.addDialog = true;
      console.log("jk");
    },
    cateEdit: function() {
      console.log(this.operationList.length);
      if (this.operationList.length !== 1) {
        this.fail("只能进行单个编辑");
      } else {
        this.editDialog = true;
        this.editObj = this.operationList[0].cateName;
      }
    },
    handleSelectionChange: function(selection) {
      this.operationList = selection;
      console.log(this.operationList);
    },
    handleEditcate: function() {
      if (this.descate === "") {
        this.fail("编辑失败");
      } else {
        var data = {
          categoryId: this.operationList[0].cateId,
          name: this.descate
        };
        this.updatecate("/cateGoryManagement?cmd=update", data);
        this.reqAllCate("/courseCateGory");
        this.done("编辑成功");
        this.editDialog = false;
      }
    },
    handleAddcate: function() {
      if (this.descate === "") {
        this.fail("新增失败");
      } else {
        var data = { categoryName: this.descate };
        this.updatecate("/cateGoryManagement?cmd=save", data);
        this.reqAllCate("/courseCateGory");
        this.done("添加成功");
        this.addDialog = false;
      }
      //  var temp = {operation: 'add', newcate: this.descate}
    },
    updatecate: function(url, data) {
      this.$ajax
        .post(url, data)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqAllCate: function(url) {
      var self = this;
      this.$ajax
        .get(url)
        .then(function(response) {
          self.cateTable = [];
          var body = response.data;
          var tempTable = [{ cateName: "无", cateId: "" }];
          for (var i = 0; i < body.data.length; i++) {
            tempTable.push({
              cateName: body.data[i].categoryName,
              cateId: body.data[i].categoryId
            });
          }
          self.cateTable = tempTable;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.cate-all {
  argin-left: 5px;
  margin-right: 5px;
  padding: 25px;
  text-align: left;
}
</style>
