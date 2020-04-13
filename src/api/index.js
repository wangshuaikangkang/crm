import http from './http'
export function judgeLogin(){
    return http.get('/user/login').then(data=>{
      return data.code==0
    })
}

//请求部门列表数据 
export function getDpList(){
    return http.get('/department/list').then()
}
//删除部门列表中的数据
export function delDpList(departmentId){
 return http.get('/department/delete',{
   params:{departmentId}
 })
}
//新增部门接口
export function addList(option){
 return http.post('/department/add',option)
}
//新增用户列表
export function addUserList(option){
  return http.post('/user/add',option)
}
//更新用户接口
export function updateUserList(option){
  return http.post('/user/update',option)
}
//更新部门接口
export function updateDpList(option){
  return http.get('/department/update',option)
}
//获取用户列表接口
export function getUserList(option){
  //option是一个什么样的格式==》{departmentId:0,search:''}
  return http.get('/user/list',{
    params:option
  })
}
//删除用户接口
export function delList(userId){
  return http.get('/user/delete',{
    params:{userId}
  })
}
//获取职位信息
export function getJobList(option){
   return http.get('/job/list',{
     params:option
   })
}
//新增职务列表
export function addJobList(option){
  return http.post('/job/add',option)
}
//删除职务信息
export function delJobList(jobId){
  return http.get('/job/delete',{
    params:{jobId}
  })
}
///job/update
export function upJobData(option){
  return http.post('job/update',option)
}
