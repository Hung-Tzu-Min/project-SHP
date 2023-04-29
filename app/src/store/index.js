import Vue from 'vue'
import Vuex from "vuex"
//需要使用插件一次
Vue.use(Vuex)

//引入小倉庫
import Home from "./VuexHome"
import Search from './VuexSearch'
import Detail from './VuexDetail'
import ShopCart from './VuexShopcart'
import User from './VuexUser'
import Trade from './VuexTrade'

//對外暴露
export default new Vuex.Store({
    //實現Vuex倉庫模塊式開發儲存器
    modules: {
        Home,
        Search,
        Detail,
        ShopCart,
        User,
        Trade,
    }
})