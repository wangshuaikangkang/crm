import axios from 'axios'
import store from '@/store/index.js'
let url=''
if (process.event.NODE_ENV=='develoment}') {
    url='https://www.baidu.com'//开发环境
}else if (process.event.NODE_ENV=='debug') {
    url='https://www.ceshi.com'//测试环境
}else if (process.event.NODE_ENV=='production') {
    url='https://www.production.com'//生产环境
}
   
let http1=axios.create({
    baseURL:url,
    timeout:1000
})

//===>对于axios的请求和响应头的二次封装，通过验证是否存在token验证登录状态
http.interceptors.request.use(
    config=>{
     //==>每次在请求前判断下token是否存在（在vuex当中）
     //==>如果存在，则每次请求都附带着token，让后台根据你的token判断你的登录情况
     //==>还有就是及时你的token存在，也有可能是过期的token，所以在响应拦截器中要做响应的处理
      const token=store.state.token;
      token&&(config.headers.Authorization=token);
      return config;
    },
    error=>{
      return Promise.reject(error);
  }
)
  // 添加请求拦截器
http.interceptors.response.use(
    response=>{
      if (response.status==200) {
         return Promise.resolve(response)
      }else{
          return Promise.reject(response)
      }
    },
    error=>{
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    /* 
                        401:代表未登录；
                        直接跳转到登录页面，并携带当前路径；
                        在登录成功后返回当前页面，这一步需要在登录页面完成
                    */
                    router.replace({
                        path:'/login',
                        qyery:{
                           redirect:router.currentRoute.fullPath 
                        }
                    })
                    break;
            
               case 403:
                   /* 
                            token过期，
                            对用户提示登录过期，
                            清除本地的token，清空vuex中的对象，返回登录页面
                   */
                     Toast({
                         message:'登录过期，请重新登录',
                         duration:1000,//时间
                         forbidClick:true//不可以进行点击
                     })
                     localStorage.removeItem('token')
                     store.commit('loginSuccess',null)
                     //跳转登录页面并且把当前路径穿进去，登录后跳转需要访问的路径
                     setTimeout(() => {
                         router.replace({
                             path:'/login',
                             redirect:router.currentRoute.fullPath
                         })
                     }, 1000);
                break;

                case 404:
                        /* 
                         请求不存在
                        */
                       Toast({
                           message:'您当前的请求不存在',
                           duration:1500,
                           forbidClick:true
                       })
                break;


                //其他错误
                 default:
                     Toast({
                         message:error.response.data.message,
                         duration:1000,
                         forbidClick:true
                     })
            }
        }
    }
);
