//配置路油的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)
//引入路由組件
import routes from './routes'

//引入store
import store from '@/store'

//先把VueRouter原型對象的push,先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重寫push|replace
//第一個參數:告訴原來push方法,你往哪裡跳轉(傳遞哪寫參數)
//第二個參數:成功回調
//第三個參數:失敗的回調


VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call|apply區別
        //相同點,都可以調用函數一次,都可以竄改函數的上下文一次
        //不同點,call與apply傳遞函數:call傳遞參數用逗號隔開,apply方法執行,傳遞數組
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


let router = new VueRouter({
    //配置路由
    routes,
    //滾動行為
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//全局守衛:前置守衛(再路由跳轉之間進行判斷)
router.beforeEach(async (to, from, next) => {
    //to:可以獲取到你要跳轉哪個路由信息
    //from:可以獲取到你從個路由而來的信息
    //next:放行函數  next()【全放行】  next(path)【放行到指定的路由】 

    //當用戶登入了,才會有token,未登入一定沒有
    let token = store.state.User.token
    let name = store.state.User.userInfo.name
    //用戶登入了
    if (token) {
        //如果登入後來想去Login或註冊
        if (to.path.toLowerCase() == "/login" || to.path.toLowerCase() == "/register") {
            //強制跳回Home頁面
            next('/Home')
        } else {
            //判斷,去的不是login【Home|Search|Detail|shopcart】
            //登入了並且有用戶信息,放行
            if (name) {
                next()
            } else {
                //登入了但沒有用戶信息,就派發action到倉庫存儲用戶信息再跳轉
                try {
                    //獲取用戶信息成功
                    await store.dispatch('getUserInfo')
                    //放行
                    next()
                } catch (error) {
                    //假如token過期了,獲取不到用戶信息,重新登入
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登入:不能去交易、支付相關【pay|paysuccess】&個人中心...等頁面
        //未登入時去上面這些路由----要求登入
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登入的時候,點擊想去而沒有去的信息,存儲於地址欄中【路由】
            next('/login?redirect='+toPath)
        } else {
            //去的是
            next()
        }

    }

})

export default router