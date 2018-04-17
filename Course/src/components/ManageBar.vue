<template>
  <div class="manage-bar">
    <div style="font-size:1.5em;text-align:left">
      <span class="title">
        <strong>名字{{courseName}}</strong>
      </span>
      <span class="title">
        <el-button type="text" style="display:inline-block;" @click="addBar">添加章节</el-button>
      </span>
    </div>
    <div class="list">
      <el-table :data="courseDetail" style="width: 100%;text-align:left;">
        <el-table-column prop="id" label="章节" width="150">
        </el-table-column>
        <el-table-column prop="barName" label="章节名" width="200">
        </el-table-column>
        <el-table-column prop="isVedio" label="视频" width="50">
        </el-table-column>
        <el-table-column prop="isPdf" label="PDF" width="400">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editBar(scope.row)" type="text" size="medium">编辑</el-button>
            <el-button @click="deleteBar(scope.row)" type="text" size="medium">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    管理章节
    <div class="suun-dialog">
      <el-dialog title="编辑章节" :visible.sync="editBarDialog">
        <el-form :model="editForm">
          <el-form-item label="章节名称" label-width="120px">
            <el-input v-model="editForm.barName" :placeholder="concreateBar.barName"></el-input>
          </el-form-item>
          <el-form-item label="章节位置" label-width="120px" style="display:none">
            <el-select v-model="editForm.afterBarId" placeholder="请选择位置" >
              <el-option v-for="item in courseDetail" :key="item.n" :label="item.barName" :value="item.barId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:center">上传文件会覆盖原文件</div>
        <el-upload class="upload-demo" ref="upload" action="/barUpdate?cmd=update" :on-preview="handlePreview"
          :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :data="postEditForm" :on-success="uploadOK">
          <el-button slot="trigger" type="primary">选取视频</el-button>
           <el-button slot="trigger" type="primary">选取PDF</el-button>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editBarDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加章节" :visible.sync="addBarDialog">
        <el-form :model="editForm">
          <el-form-item label="章节名称" label-width="120px">
            <el-input v-model="editForm.barName" :placeholder="concreateBar.barName"></el-input>
          </el-form-item>
          <el-form-item label="章节位置" label-width="120px" v-if="courseDetail[0]">
            <el-select v-model="editForm.afterBarId" placeholder="请选择位置" >
              <el-option v-for="item in courseDetail" :key="item.n" :label="item.barName" :value="item.barId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:center">上传文件会覆盖原文件</div>
        <el-upload class="upload-demo" ref="upload" action="/barUpdate?cmd=save" :on-preview="handlePreview"
          :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" :data="postAssForm" :on-success="uploadOK">
          <el-button slot="trigger" type="primary">选取视频</el-button>
           <el-button slot="trigger" type="primary">选取PDF</el-button>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addBarDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="删除章节信息" :visible.sync="deletBarDialog" width="30%">
        <span style="font-size: 1.5em;color:black;">您将会删除本章课程</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deletBarDialog = false">取 消</el-button>
          <el-button type="danger" @click="handleDelete">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "manageBar",
  data() {
    return {
      concreateBar: {
        barName: "",
        barId: ""
      },
      editForm: {
        barName: "",
        afterBarId: ""
      },
      postEditForm: { barId: "", barName: "", afterBarId: "" },
      postAssForm: { barName: "", afterBarId: "", courseId: "" },
      editBarDialog: false,
      addBarDialog: false,
      deletBarDialog: false,
      fileList: [],
      courseName: "",
      courseId: "",
      courseDetail: []
    };
  },
  created() {
    console.log("管理目录");
    console.log(this.$route);
    this.courseName = this.$route.params.courseName;
    this.courseId = this.$route.params.courseId;
    this.reqBar(this.$route.params.courseId);
  },
  methods: {
    editBar: function(row) {
      this.concreateBar.barName = row.barName;
      this.concreateBar.barId = row.barId;
      this.editBarDialog = true;
      console.log(row);
    },
    deleteBar: function(row) {
      this.concreateBar.barName = row.barName;
      this.concreateBar.barId = row.barId;
      this.deletBarDialog = true;
      console.log(row);
    },
    addBar: function() {
      this.addBarDialog = true;
      if (this.courseDetail[0]) {
        console.log("有");
      } else {
        console.log("没有");
      }
    },
    handleEdit: function() {
      if (this.editForm.barName === "") {
        this.fail("请填写完数据");
      } else {
        console.log(this.editForm.barName);
        console.log(this.editForm.afterBarId);
        this.postEditForm.barId = this.concreateBar.barId;
        this.postEditForm.barName = this.editForm.barName;
        this.postEditForm.afterBarId = this.editForm.afterBarId;
        this.submitUpload();
        this.reqBar(this.$route.params.courseId);
      }
    },
    handleDelete: function() {
      var url = "/barUpdate?cmd=delete&barId=" + this.concreateBar.barId;
      this.$ajax
        .get(url)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.done("删除成功");
      this.deletBarDialog = false;
    },
    handleAdd: function() {
      if (this.courseDetail[0]) {
        if (this.editForm.barName === "" || this.editForm.afterBarId === "") {
          this.fail("请填写信息");
        } else {
          this.postAssForm.barName = this.editForm.barName;
          this.postAssForm.afterBarId = this.editForm.afterBarId;
          this.postAssForm.courseId = this.courseId;
          this.submitUpload();
          this.reqBar(this.$route.params.courseId);
        }
      } else {
        if (this.editForm.barName === "") {
          this.fail("请填写信息");
        } else {
          this.postAssForm.barName = this.editForm.barName;
          this.postAssForm.afterBarId = "0";
          this.postAssForm.courseId = this.courseId;
          this.submitUpload();
          this.reqBar(this.$route.params.courseId);
          console.log(this.editForm.barName);
        }
      }
    },
    reqBar: function(courseid) {
      var self = this;
      var url = "/courseManagement?courseId=" + courseid;
      this.$ajax
        .get(url)
        .then(function(response) {
          var body = response.data;
          // {id: 0, barName: '无', isVedio: true, isPdf: true, barId: '345'}
          var tempBarList = [];
          for (var i = 0; i < body.data.length; i++) {
            var tempp = "";
            if (body.data[i].hasPdf) {
              tempp = "有";
            }
            var tempid = "第" + i.toString() + "章";
            tempBarList.push({
              n: i,
              id: tempid,
              barName: body.data[i].barName,
              isVedio: "有",
              isPdf: tempp,
              barId: body.data[i].barId
            });
          }
          self.courseDetail = tempBarList;
          console.log(self.courseDetail);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadOK: function(response, file, fileList) {
      this.editBarDialog = false;
      this.addBarDialog = false;
      this.done("操作成功");
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
.manage-bar {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}

.title {
  padding-right: 50px;
}

.list {
  margin: 10px;
}
</style>
