import { reqGetSearchInfo } from "@/api"

//Search模塊的小倉庫
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchList = value
    }
}
const actions = {
    //獲取search模塊數據
    async getSearchList({ commit }, params = {}) {
        //當前reqGetSearchInfo這個函數在調用獲取服務器數據的時候,需要至少傳遞一個參數(至少是空對象)
        //params參數:是當用戶派發action的時候,第二個參數傳遞過來的,至少是個空對象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

//在項目當中getters主要的目的是:簡化倉庫中的數據
//可以把我們將來在組件當中需要用的數據簡化一下【將來組件在獲取數據的時候就方便了】
const getters = {
    //下面參數state,是search倉庫中的state,並非大倉庫的state(所以不包含Home)
    //假如網路不好|沒有網路 state.searchList.goodsList應該返回的是undefinde
    //萬一undefinde,那麼計算新屬性的屬性值至少給人家一個空數組
    goodsList(state) {
        return state.searchList.goodsList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    }
}

//對外暴露
export default ({
    state,
    mutations,
    actions,
    getters,
})