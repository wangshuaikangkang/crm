        <template>
        <div class="loginBox">
            <h2>CRM客户管理系统</h2>
            <h3>为保护企业的数据安全，请妥善保管密码</h3>
            <div>
            <el-input class="inp" placeholder="请输入内容" prefix-icon="el-icon-user" v-model="name"></el-input>
            <el-input
                class="inp"
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                show-password
                v-model="psw"
            ></el-input>
            <el-button type="primary" @click="login">登录</el-button>
            </div>
            <p>北京珠峰世纪技术培训有限公司 京ICP备09041920号 京公网安备110108400531号</p>
        </div>
        </template>
        <script>
        // @ is an alias to /src
        import { login } from "@/api/login.js";
        import md5 from "md5";
        export default {
        name: "login",
        data() {
            return {
            name: "",
            psw: ""
            };
        },
        methods: {
            login() {
            if (!this.name || !this.psw) {
                this.$message.error("用户名和密码不能为空");
            }
            let obj = { account: this.name, password: md5(this.psw) };
            login(obj, this).then(data => {
                if (data.code == 0) {
                this.$alert("登录成功", "提示", {
                    confirmButtonText: "确定",
                    callback: action => {   
                        // console.log(action);
                        // action是告诉我们点击了那个按钮
                        this.$router.push('/')
                    }
                });
               
                }
            });
            }
        },
        components: {}
        };
        </script>
        <style lang="less">
        .loginBox {
        width: 100%;
        height: 100%;
        background: #eee;
        position: fixed;
        text-align: center;
        top: 0;
        left: 0;
        h2 {
            height: 60px;
            line-height: 60px;
            margin-top: 80px;
        }
        > div {
            width: 300px;
            // height: 200px;
            margin: auto;
            background: #fff;
            box-shadow: 0px 1px 2px 3px rgb(192, 182, 182);
            padding-bottom: 10px;
            padding-top: 20px;
            .inp {
            width: 80%;
            margin: 10px auto;
            }
            .btn {
            width: 80%;
            margin: 20px 0;
            }
        }
        > p {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
        }
        }
        </style>