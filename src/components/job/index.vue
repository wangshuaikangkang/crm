<template>
  <el-table :data="tableData" stripe style="width: 100%" class="myTable">
    <el-table-column
      prop="id"
      label="编号"
      type="index"
      :index="indexMethod"
      width="180"
      align="center"
    ></el-table-column>
    <el-table-column prop="job" label="职务" width="180" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="desc" label="描述" align="center">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.desc }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="power" label="权限" width="600" align="center">
      <template slot-scope="scope" align="left">
        <span style="margin-left: 10px">{{ scope.row.power|fn }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { jobList, delJobList } from "@/api/index.js";
import Vue from "vue";
Vue.filter("fn", function(val) {
  let obj = {
    userhandle: "员工操作权",
    departhandle: "部门操作权",
    jobhandle: "职务操作权",
    departcustomer: "部门全部客户",
    allcustomer: "公司全部客户",
    resetpassword: "重置密码"
  };
  let ary = val.split("|");
  // for (let k in obj) {
  //   ary.forEach((item, index) => {
  //     if (item == k) {
  //       ary[index] = obj[k];
  //     }
  //   });
  // }
  return ary.map(item=>obj[item]).join("|");
});
export default {
  data() {
    return {};
  },
  created() {
    ary = this.jobList.power;
    ary.filter(item => Object.keys(item));
  },
  computed: {
    tableData() {
      return this.$store.state.jobList;
    }
  },
  created() {
    this.$store.dispatch("jobList");
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({ path: "/org/addJob", query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delJobList(row.id).then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.$store.dispatch("jobList");
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    indexMethod(index) {
      return index + 1;
    }
  }
};
</script>
<style lang="less">
.myTable {
  text-align: center;
  height: 100%;
  box-sizing: border-box;
}
</style>