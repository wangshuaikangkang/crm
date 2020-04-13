import http from './http'
//传参数见APP.vue\
// let that=null;
// export function init(_this){
//     that=_this
// }
export function login(option, _this) {
    return http.post('/user/login', option).then(data => {
        if (data.code == 1) {
            //   _this.$message.error('用户名和密码错误')
            _this.$alert('用户名和密码错误', '提示', {
                confirmButtonText: '确定',
                // callback: action => {
                //     this.$message({
                //         type: 'info',
                //         message: `action: ${action}`
                //     });
                // }
            });

        }
        if (data.code==0) {
            localStorage.setItem("POWER",data.power);
        }
        return data //给后边then的参数
    })
}
export function signout(){
    return http.get('/user/signout')
}