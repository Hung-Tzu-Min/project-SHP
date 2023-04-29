import Vue from 'vue'
import App from './App.vue'

//三級連動組件---全局組件
import TypeNav from "@/components/TypeNav"
//第一個參數:全局組件的名子 第二個參數:哪一個組件
Vue.component(TypeNav.name, TypeNav)

//引入路由
import router from '@/router/index'

//引入Vuex(倉庫)
import store from '@/store'

//引入MockServe.js ----mock數據
import '@/mock/mockServe'

//引入swiper樣式
import 'swiper/swiper-bundle.min.css'

//將輪播圖組件註冊成全局組件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)

//將分頁器組件註冊成全局組件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

//統一接口api文件夾裡面全部請求的函數(統一引入)
import * as API from '@/api'

import { Button, MessageBox } from 'element-ui';
//ElementUI第一種註冊方式:註冊在組件上
Vue.component(Button.name, Button);
//ElementUI第二種註冊方式:掛在原形上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//使用圖片懶加載
import HoshizakiYuna from '@/assets/1.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //默認用的圖片
  loading: HoshizakiYuna,
});

//引入表單校驗插件
import '@/plugins/validate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //註冊路由:底下的寫法Key&valueu一致省略valeu【router用小寫的】
  //註冊路由信息:當這裡書寫router的時候,組件身上都擁有$route、$router屬性
  router,
  //註冊Vuex:組件實例的身上會多一個屬性叫 $store屬性
  store,
  //全局事件總線$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  }
}).$mount('#app')
