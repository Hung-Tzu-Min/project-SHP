<template>
  <div >
    <Header></Header>
    <!-- 路由組件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted(){
      //通知Vuex發請求,獲取數據,存儲於倉庫當中
      //寫在App這個最頂層的組件中,是為了做優化,只要網站一運行就會撈到數據,並且只運行一次
      //派發一個action||獲得商品的三級列表的數據
      this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
