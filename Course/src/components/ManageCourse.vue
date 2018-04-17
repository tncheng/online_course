<template>
  <div class="course-all">
    <el-tabs v-model="activecate" @tab-click="choosecate">
      <el-tab-pane v-for="item in cateList" v-bind:key="item.id" :label="item.categoryName" :name="item.name" class="item-content">
        <div class="table-header">
          <div class="table-title">课程</div>
          <div class="table-title" style="text-align: right;">
            <el-button style="width:170px;" icon="el-icon-circle-plus" @click="addCourse" plain></el-button>
            </el-button>
          </div>
        </div>
        <div class="course-list">
          <el-table :data="courseList" style="width: 100%;text-align:left">
            <el-table-column prop="courseName" label="课程名" width="150">
            </el-table-column>
            <el-table-column prop="teacher" label="教师" width="150">
            </el-table-column>
            <el-table-column prop="introduction" label="介绍" width="450">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button @click="checkBar(scope.row)" type="text" size="medium">查看</el-button>
                <el-button @click="editCourse(scope.row)" type="text" size="medium">编辑</el-button>
                <el-button @click="deleteCourse(scope.row)" type="text" size="medium">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="operation-dialog">
      <el-dialog title="新增课程" :visible.sync="addCourseDialog">
        <el-form :model="addCourseForm">
          <el-form-item label="课程名称" label-width="120px">
            <el-input v-model="addCourseForm.name" auto-complete="off" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="课程名称介绍" label-width="120px">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addCourseForm.introduction" auto-complete="off"
              placeholder="请输入课程介绍"></el-input>
          </el-form-item>
          <el-form-item label="授课教师" label-width="120px">
            <el-input v-model="addCourseForm.teacher" auto-complete="off" placeholder="请输入教师名字"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCourseDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCourse">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑课程信息" :visible.sync="editCourseDialog">
        <el-form :model="editCourseForm">
          <el-form-item label="课程名称" label-width="120px">
            <el-input v-model="editCourseForm.name" auto-complete="off" :placeholder="concreateCourse.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程名称介绍" label-width="120px">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editCourseForm.introduction" auto-complete="off" :placeholder="concreateCourse.introduction"
              ></el-input>
          </el-form-item>
          <el-form-item label="授课教师" label-width="120px">
            <el-input v-model="editCourseForm.teacher" auto-complete="off" :placeholder="concreateCourse.teacher"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editCourseDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditCourse">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="删除课程信息" :visible.sync="deleteCourseDialog" width="30%">
        <span style="font-size: 1.5em;color:black;">您将会删除本门课程</span>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteCourseDialog = false">取 消</el-button>
          <el-button type="danger" @click="handleDeleteCourse">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: "manageCourse",
  data() {
    return {
      activeName: "",
      activecate: "",
      addCourseDialog: false,
      addBarDialog: false,
      editCourseDialog: false,
      deleteCourseDialog: false,
      barForm: {
        barName: "",
        afterBarId: 999
      },
      updateForm: {
        barName: "",
        afterBarId: 0
      },
      editForm: {
        barName: "",
        barId: ""
      },
      addCourseForm: {
        name: "",
        introduction: "",
        teacher: "",
        categoryId: ""
      },
      editCourseForm: {
        name: "",
        introduction: "",
        teacher: "",
        courseId: ""
      },
      concreateCourse: {
        courseName: "",
        courseId: "",
        teacher: "",
        introduction: ""
      },
      concreateCourseIda: 0,
      concreateBarId: 0,
      cateList: [
        {
          id: 0,
          categoryName: "计算机",
          name: "com"
        },
        {
          id: 1,
          categoryName: "生活",
          name: "life"
        },
        {
          id: 2,
          categoryName: "其他",
          name: "other"
        }
      ],
      courses: [
        {
          courseName: "python",
          teacher: "hu",
          introduction: "sdfkjshdfkjhaskhdfk"
        }
      ],
      courseList: [],
      fileList: []
    };
  },
  created() {
    this.reqcatelog();
  },
  methods: {
    checkBar: function(row) {
      this.concreateCourse.courseName = row.courseName;
      this.concreateCourse.courseId = row.courseId;
      this.concreateCourse.teacher = row.teacher;
      this.concreateCourse.introduction = row.introduction;
      this.$router.push({
        name: "managebar",
        params: {
          courseId: this.concreateCourse.courseId,
          courseName: this.concreateCourse.courseName
        }
      });
      // this.$router.push({ path: "/management/33333" });
      console.log(row);
    },
    editCourse: function(row) {
      this.concreateCourse.courseName = row.courseName;
      this.concreateCourse.courseId = row.courseId;
      this.concreateCourse.teacher = row.teacher;
      this.concreateCourse.introduction = row.introduction;
      this.editCourseDialog = true;
      console.log(row);
    },
    deleteCourse: function(row) {
      this.concreateCourse.courseName = row.courseName;
      this.concreateCourse.courseId = row.courseId;
      this.concreateCourse.teacher = row.teacher;
      this.concreateCourse.introduction = row.introduction;
      this.concreateCourseId = row.courseId;
      this.deleteCourseDialog = true;
      console.log(row);
    },
    choosecate: function(tab, event) {
      console.log(this.activecate);
      this.reqCourse(this.activecate);
    },
    addCourse: function(courseid) {
      this.addCourseDialog = true;
    },
    handleEditCourse: function() {
      if (
        this.editCourseForm.name === "" ||
        this.editCourseForm.introduction === ""
      ) {
        this.fail("修改课程失败");
      } else {
        this.editCourseForm.courseId = this.concreateCourse.courseId;
        console.log(this.editCourseForm);
        this.postAllData("/courseUpdate?cmd=update", this.editCourseForm);
        this.done("修改课程成功");
        this.reqCourse(this.activecate);
        this.editCourseDialog = false;
      }
    },
    handleAddCourse: function() {
      if (
        this.addCourseForm.courseName === "" ||
        this.addCourseForm.introduction === "" ||
        this.addCourseForm.teacher === ""
      ) {
        this.fail("添加课程失败");
      } else {
        this.addCourseForm.categoryId = this.activecate;
        this.postAllData("/courseUpdate?cmd=save", this.addCourseForm);
        this.done("添加课程成功");
        this.reqCourse(this.activecate);
        this.addCourseDialog = false;
      }
    },
    handleDeleteCourse: function() {
      var tempUrl =
        "/courseUpdate?cmd=delete&courseId=" + this.concreateCourse.courseId;
      console.log(tempUrl);
      this.getAllData(tempUrl);
      this.reqCourse(this.activecate);
      this.done("删除成功");
      // this.courseList.splice(this.concreateCourseIda, 1)
      this.deleteCourseDialog = false;
    },
    reqCourse: function(cateid) {
      var url = "/courseManagement?cmd=" + cateid;
      var self = this;
      this.courseList = [];
      this.$ajax
        .get(url)
        .then(function(response) {
          //  清空数据
          var tempVourseList = [];
          var body = response.data;
          for (var i = 0; i < body.data.length; i++) {
            tempVourseList.push({
              id: i,
              courseName: body.data[i].name,
              teacher: body.data[i].teacher,
              courseId: body.data[i].courseId,
              introduction: body.data[i].introduction
            });
          }
          self.courseList = tempVourseList;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reqcatelog: function() {
      var self = this;
      this.$ajax
        .get("/courseManagement")
        .then(function(response) {
          var body = response.data;
          console.log(body);
          var tempCate = [];
          for (var i = 0; i < body.data.length; i++) {
            tempCate.push({
              id: i,
              categoryName: body.data[i].categoryName,
              name: body.data[i].categoryId
            });
          }
          self.cateList = tempCate;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitUpload: function() {
      this.$refs.upload.submit();
    },
    postAllData: function(url, data) {
      this.$ajax
        .post(url, data)
        .then(function(response) {
          return response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllData: function(url) {
      this.$ajax
        .get(url)
        .then(function(response) {
          return response.data;
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
.course-all {
  margin-left: 5px;
  margin-right: 5px;
  padding: 25px;
}

.item-content {
  background-color: #fff;
}

.table-header {
  font-weight: bold;
  text-align: left;
  line-height: 48px;
  border-bottom: 1px #5a5e66 solid;
}

.table-title {
  width: 48.5%;
  display: inline-block;
}
</style>
