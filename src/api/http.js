import axios from 'axios'
let url=process.env.NODE_ENV !== 'production'?'':'https://www.zhuhu.com/api'
//根据当前到底是开发环境还是基础环境来决定 及出路径是哪个  开法环境下不需要基础路径
//因为 开发环境下我们就是让请求去localhost：8080  然后node换根据配置的proxy代理
//将请求转接到对应的远程地址： proxy只在开发环境下有用 生产环境下是没用的
const http = axios.create({
    baseURL:url,
    transformRequest(data) {
        console.log(data)
        // lodash
        let str = '';
        for(let k in data){
            str += `${k}=${data[k]}&`
        }
        return str;
    },
    params:{
        t:Math.random()
    },
    timeout:1000
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

  // 添加请求拦截器
http.interceptors.response.use(function (response) {
    // 在发送请求之前做些什么
    return response.data;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
export default http