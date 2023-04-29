import { reqCartList } from "@/api"
import { reqDeleteCartById } from "@/api"
import { reqUpdateCheckedById } from "@/api"
import { Promise } from "core-js"

//Search模塊的小倉庫
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, value) {
        state.cartList = value
    }
}
const actions = {
    //獲取購物車列表數據
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log(result)
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //刪除購物車某一個產品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //修改購物車某一產品的選中狀態
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "OK"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //刪除全部勾選的產品
    //寫getters|state都可以取得一樣的東西
    deleteAllCheckedCart({ dispatch, getters }) {
        /*context:可以理解為小倉庫,具備commit【提交mutations修改state】、getters【計算屬性】
                  、dispatch【派發action】、state【當前倉庫數據】*/

        let PromiseAll = []
        //獲取購物車中全部的產品(是一個數組)
        getters.cartList.cartInfoList.forEach(item => {
            //判斷哪幾項商品已被勾選
            if (item.isChecked == 1) {
                //調用'deleteCartById'這個action,找到對應的skuId,然後將商品刪除
                let promise = dispatch('deleteCartById', item.skuId)
                PromiseAll.push(promise)
            }
        });
        return Promise.all(PromiseAll)
    },
    //修改全部產品的選中狀態
    //寫getters|state都可以取得一樣的東西
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked})
            promiseAll.push(promise)
        })
        //
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

}

//對外暴露
export default ({
    state,
    mutations,
    actions,
    getters,
})