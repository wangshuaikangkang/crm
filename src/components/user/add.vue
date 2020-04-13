<template>
  <el-form ref="form" :model="form" label-width="80px" class="myform">
    <el-form-item label="姓名">
      <el-input v-model="form.name" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
    </el-form-item>
    <el-form-item label="邮箱" style="width:300px">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" style="width:300px">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="部门">
        <el-select :value="form.departmentId" @change="selectChange" placeholder="请选择部门">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id+''"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="职务">
      <el-select :value="form.jobId" @change="jobChange" placeholder="请选择部门">
        <el-option v-for="item in jobs" :key="item.id" :label="item.name" :value="item.id+''"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自我介绍" style="width:400px">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addUserList,updateUserList} from '@/api/index.js'
export default {
  data() {
    return {
        form: {
          name: "",
          phone: "",
          email: "",
          sex: "",
          departmentId: "",
          jobId: "",
          desc: "",
          department:"",
          job:""
        },
        // id:this.$route.query.id
     
    };
  },
 
  created() {
   
    let id=this.$route.query.id;
    let obj=this.$store.state.userList.filter(item=>item.id==id)[0]
    
    this.form=obj?obj:this.form
    console.log(obj ,111)
  },
  computed: {
    options() {
      return this.$store.state.departmentList;
    },
    jobs() {
      return this.$store.state.jobList;
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$refs.form.validate(flag => {
        //flag是true  代表刚才的验证规则都通过了
        if (flag) {
           let id=this.$route.query.id
            this.form.userId=id;
          (id? updateUserList : addUserList)(this.form).then(data => {
            if (data.code == 0) {
              //新增成功
              this.$confirm((id?'更新':'创建')+"成功", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(() => {
                  this.$router.push("/org/user");
                }).catch(() => {})
            } else {
              this.$message.error("添加失败");
            }
          });
        }
      });
    },
    selectChange(val) {
      this.form.departmentId = val;
    },
    jobChange(val) {
     this.form.jobId = val;
    }
  }
};
</script>

<style lang="less" scoped>
.myform {
  height: 100%;
  text-align: left;
  background: #eee;
  padding: 20px;
  box-sizing: border-box;
}
</style>