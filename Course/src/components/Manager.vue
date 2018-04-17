<template>
  <div class="management-page">
    <div class="management-area">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程管理" name="courseManage">
          <div v-if="getAuthority != 2">对不起，您没有权限</div>
          <manage-course v-else></manage-course>
        </el-tab-pane>
        <el-tab-pane label="用户管理" name="authorityManage" >
          <div v-if="getAuthority != 3">对不起，您没有权限</div>
          <manage-user v-else></manage-user>
        </el-tab-pane>
        <el-tab-pane label="课程分类" name="cateManage" >
          <div v-if="getAuthority != 3">对不起，您没有权限</div>
          <managecate v-else></managecate>
        </el-tab-pane>
        <el-tab-pane label="评论管理" name="commentManage" >
          <div v-if="getAuthority != 3">对不起，您没有权限</div>
          <manage-comment v-else></manage-comment>
        </el-tab-pane>
        <el-tab-pane label="统计报表" name="countManage" >
          <div v-if="getAuthority != 4">对不起，您没有权限</div>
          <count-course v-else></count-course>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import manageCourse from "../components/ManageCourse";
import manageUser from "../components/ManageUser";
import manageComment from "../components/ManageComment";
import managecate from "../components/ManageCata";
import countCourse from "../components/CountCourse";
export default {
  name: "manage",
  components: {
    manageCourse,
    manageUser,
    manageComment,
    managecate,
    countCourse
  },
  data() {
    return {
      c: 0,
      activeName: "courseManage"
    };
  },
  created() {
    // 检查用户是否拥有此门课程确定
    console.log("检查权限");
  },
  computed: {
    getAuthority: function() {
      return this.$store.getters.getUser.authority;
    }
  },
  methods: {
    handleClick: function(tab, event) {
      console.log("name");
      console.log(tab.name);
    }
  }
};
</script>
<style scoped>
.management-area {
  padding-top: 50px;
  max-width: 1000px;
  margin: auto;
}
</style>

