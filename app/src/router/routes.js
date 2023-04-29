//import Home from '@/pages/Home'
//import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

//引入Center下的二級路由
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from "@/pages/Center/groupOrder"

//import Exercise from '@/pages/Exercise123/index.vue'

export default (
    [
        {
            path: "/home",
            /*
            下面的 【component:()=>import('@/pages/Home'),】是路由懶加載的寫法,用意為案需
            加載當用戶訪問該頁面時才執行,可節省資源提升效能,然後上面第1行的Home就可不用寫
            */
            component:()=>import('@/pages/Home'), 
            //這個meta用來給Home組件添加一個布林值，之後可以提供給Footer做判斷是否顯示
            meta: { show: true },
        },
        {
            path: "/Search/:keyword?",
            /*
            下面的 【component:()=>import('@/pages/Search'),】是路由懶加載的寫法,用意為案需
            加載當用戶訪問該頁面時才執行,可節省資源提升效能,然後上面第2行的Search就可不用寫
            */
            component:()=>import('@/pages/Search'),
            meta: { show: true },
            name: "Search",
            //路由組件能不能傳遞props數據?
            //第一種:布林值寫法(params)
            //props:true,
            //第二種:對象寫法 (額外的給路由組件傳第一些props)
            //props:{a:1,b:2},
            //第三種:可以將params參數、query參數,通過props傳遞給路由組件
            // props:($route)=>{
            //     return{keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
        {
            path: "/Login",
            component: Login,
            meta: { show: false },
        },
        {
            path: "/Register",
            component: Register,
            meta: { show: false },
        },
        {
            //當點擊商品圖片時,需要跳轉到詳情頁面,所以在路由跳轉時需要帶上產品的ID給詳情頁面
            path: "/Detail/:skuid",
            component: Detail,
            meta: { show: true }
        },
        {
            path: "/AddCartSuccess",
            component: AddCartSuccess,
            meta: { show: true },
            name: "AddCartSuccess"
        },
        {
            path: "/ShopCart",
            component: ShopCart,
            meta: { show: true },
        },
        {
            path: '/trade',
            component: Trade,
            meta: { show: true },
            //路由獨享守衛
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    //去交易頁面,必須是從購物車點下"交易"鈕而來
                    next()
                } else {
                    //意思代表如果不符合條件,從哪個路由來,就直接回到原本的路由
                    next(false)
                }
            },
        },
        {
            path: '/pay',
            component: Pay,
            meta: { show: true },
            beforeEnter:(to, from, next)=>{
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: { show: true },
        },
        {
            path: '/center',
            component: Center,
            meta: { show: true },
            //子路由
            children: [
                { 
                    path: 'myorder', //子路由的路徑要碼寫完整,如要不寫完整就不加"/"
                    component: MyOrder,
                },
                {
                    path: '/center/grouporder',  //子路由的路徑要碼寫完整,如要不寫完整就不加"/"
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'  //預設路徑,一跳轉置center頁面,就顯示center下的myorder頁
                },
            ],
        },
        {
            path:'/exercise',
            component:()=>import('@/pages/Exercise123/index.vue'),
            meta: { show: false },
            children:[
                {
                    path:'/exercise/eventtest',
                    component:()=>import('@/pages/Exercise123/EventTest/EventTest.vue'),
                },
                {
                    path:'/exercise/modeltest',
                    component:()=>import('@/pages/Exercise123/ModelTest/index.vue'),
                },
                {
                    path:'/exercise/synctest',
                    component:()=>import('@/pages/Exercise123/SyncTest/index.vue')
                },
                {
                    path:'/exercise/attrslistenerstest',
                    component:()=>import('@/pages/Exercise123/AttrsListenersTest/index.vue'),
                },
                {
                    path:'/exercise/childrenparenttest',
                    component:()=>import('@/pages/Exercise123/ChildrenParentTest/index.vue'),
                },
                {
                    path:"/exercise/sopeslottest",
                    component:()=>import('@/pages/Exercise123/ScopeSlotTest/index.vue'),
                },
            ]
        },
        //重新導向，在項目跑起來時，預設導覽至首頁
        {
            path: "*",
            redirect: "/Home"
        },
    ]
)
