import {reqCategoryList} from "@/api"
import {reqGetBannerList} from '@/api'
import {reqFloorList} from '@/api'

//Home模塊的小倉庫
const state = {
    //state中的數據默認初始值別亂寫,服務器返回對象,服務器返回數組
    categoryList:[],
    //輪播圖的數組
    bannerList:[],
    //
    floorList:[],
}
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    GETBANNERLIST(state, value){
        state.bannerList = value
    },
    GETFLOORLIST(state,value){
        state.floorList = value
    }
}
const actions = {
    //通過API裡面的接口函數調用,向務器發請求,獲取服務器的數據
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if (result.code == 200) {  //如果連線成功(200)，就提交數據
            commit("CATEGORYLIST", result.data);
        }
    },
    //獲取首頁輪播圖的數組
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    },

    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}


//對外暴露
export default ({
    state,
    mutations,
    actions,
    getters,

})