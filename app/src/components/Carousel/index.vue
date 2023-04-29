<template>
  <div class="swiper-container" ref="floor1Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in crslList"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper/bundle";  //在vue2中使用swiper6版，需要如左側這樣引入

export default {
  name: "Carousel",
  props: ["crslList"],
  watch: {
    list:{
      //immediate立即監聽:不管數據有沒有變化,一上來立即監聽一次
      //為什麼正常watch監聽不到list數據? 因為數據是父組件給的,父組件給的就已經是一個對象,數據已經在父組件變化完才丟過來
      immediate:true,
      handler(){
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.floor1Swiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //點擊小球也切換圖片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        })
      }
    }
  },
};
</script>

<style>
</style>