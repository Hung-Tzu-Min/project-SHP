//【需要對於axios進行二次封裝,加入請求&響應攔截器】
import axios from "axios"

//在當前模塊中引入store
import store from "@/store"

//1.利用axios對象的方法create,去創建一個axios實例
//2.request就是axios,只不過稍微配置一下
const requests = axios.create({
    //配置路徑
    //基礎路徑,發送請求的時候,路徑當中會出現api
    baseURL:"/api",
    //代表請求超時的時間5秒
    timeout:5000,
})

//請求攔截器:在發送請求之前,請求攔截器可以檢測到,可以在請求發出去之前做一些事情
requests.interceptors.request.use((config)=>{

    if(store.state.Detail.uuid_token){
        //請求頭添加一個字段【userTempId】(先和後台商量取這個字段名)
        config.headers.userTempId = store.state.Detail.uuid_token
    }
    //需要攜帶token帶給服務器
    if(store.state.User.token){
        config.headers.token = store.state.User.token
    }

    //config:配置對象,對象裡面有一個屬性很重要,headers請求頭
    return config
})

//響應攔截器
requests.interceptors.response.use((res)=>{
    //成功的回調函數:服務器響應數據回來以後,響應攔截器可以檢測到,可以做一些事情
    return res.data
},(error)=>{
    //響應失敗的回調函數
    return Promise.reject(new Error("falie"))
})

//對外暴露
export default requests