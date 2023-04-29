import { reqGedCode } from '@/api'
import { reqUserRegister } from '@/api'
import { reqUserLogin } from '@/api'
import { reqUserInfo } from "@/api"
import { setToken, getToken,removeToken } from "@/utils/token.js"
import { reqLogout } from "@/api"
import { Promise } from 'core-js'

//登入與註冊的模塊
const state = {
    code: '',
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除本地數據
    CLEAR(state){
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    //獲取驗證碼
    async getCode({ commit }, phone) {
        //獲取驗證碼的這個接口,把驗證碼返回,但正常情況下,後台把驗證碼發到用戶手機上
        let result = await reqGedCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        console.log(result)
        //服務器下發的token,是用戶唯一標示符（跟uuid很像）
        //將來經常通過帶token找服務器要用戶信息進行展示
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            //然後持久化存儲token
            setToken(result.data.token) //從外部引入並將token傳過去存儲
            return "ok"
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return "OK"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    async userLogout({commit}) {
        //只是向服務器發起一次請求,通知服務器清除token
        let result = await reqLogout()
        //注意action中不能直接操作state,必須提交到mutations再修改state
        if(result.code == 200){
            commit("CLEAR")
            return "ok"
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {}

export default ({
    state,
    mutations,
    actions,
    getters,
})

