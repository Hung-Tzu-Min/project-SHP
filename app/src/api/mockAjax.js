//【需要對於axios進行二次封裝,加入請求&響應攔截器】
import axios from "axios"

const requests = axios.create({
    baseURL:"/mock",
    timeout:5000,
})

requests.interceptors.request.use((config)=>{
    return config
})

requests.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error("falie"))
})

//對外暴露
export default requests