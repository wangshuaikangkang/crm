<template>
  <el-form ref="form" :model="form" label-width="80px" class="myform" :rules="rules">
    <el-form-item label="部门名称" prop="name">
      <el-input v-model.trim="form.name" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="部门描述" prop="desc">
      <el-input type="textarea" rows="6" v-model="form.desc" style="width:600px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" >立即创建</el-button>
      <el-button @click='$router.back()'>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addList,updateDpList } from "@/api/index.js";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
   created() {
      let id = this.$route.query.id;
    
      let obj = this.$store.state.departmentList.filter(item=>item.id == id)[0];
          
           this.form = obj ? obj : this.form;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(flag => {
        //flag是true  代表刚才的验证规则都通过了
        if (flag) {
            let id=this.$route.query.id;
            this.form.departmentId=id;//更新时后台要的参数
            (id ? updateDpList:addList)(this.form).then(data => {
            if (data.code == 0) {
              //新增成功
              this.$confirm((id?'更新':'添加')+ "成功", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(() => {
                this.$router.push("/org/department");
              }).catch(()=>{});
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.myform {
  height: 100%;
  text-align: left;
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>