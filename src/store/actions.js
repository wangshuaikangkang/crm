import {getDpList,getUserList,getJobList} from '@/api/index.js'

export function changeDpList({commit}){
     getDpList().then(data=>{
         if (data.code==0) {
             commit('changeDpList',{
                 data:data.data
             })
         }
     })
}
export function changeUserList({commit},option={}){
    //调用ajax请求
    getUserList(option).then(data=>{
        if (data.code==0) {
            commit('changeUserList',{
                data:data.data
            })
        }
    })
}
export function jobList({commit},option={}){
    getJobList(option).then(data=>{
        if (data.code==0) {
            commit('jobList',{
                data:data.data
            })
        }
    })
}

