import { reqGoodsInfo } from "@/api"
import { reqAddOrUpdateShopCart } from "@/api"
import {getUUID} from "@/utils/uuid_token"

//Detail模塊的小倉庫
const state = {
    goodsInfo:{},

    //臨時遊客身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state,value){
        state.goodsInfo = value
    },
    // ADDORUPDATESHOPCART(state,value){

    // }
}
const actions = {
    //獲取產品信息的action
    async getGoodsInfo({commit},skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {  //如果連線成功(200)，就提交數據
            commit("GETGOODSINFO", result.data);
        }
    },
    //將產品添加到購物車中
    async AddOrUpdateShopCart({commit},{skuId, skuNum}){
        //加入購物車返回的結構
        //加入購物車以後(發請求),前台將參數帶給服務器
        //服務器寫入數據成功,並沒有返回其他數據 (只是返回code=200,代表操作成功)
        //因為服務器沒有返回其餘數據,因此不需要三連環(actions、mutations、state)存儲數據
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code == 200){
            return "OK"
        }else{
            //代表加入購物車失敗
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //路徑導航簡化的數據
    categoryView(state){
        return state.goodsInfo.categoryView||{}
    },
    //簡化產品信息的數據
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    //產品售賣屬性的簡化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}


//對外暴露
export default ({
    state,
    mutations,
    actions,
    getters,

})