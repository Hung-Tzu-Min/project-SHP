<template>
  <div>
    <!-- 三級聯動全局組件:因TypeNav已經註冊為全局組件,因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank />
    <Like />
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    
    <Brand/>
  </div>
</template>

<script>
//引入其餘組件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"

import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    //派發action,獲取floor組件的數據
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList: (state) => {
        return state.Home.floorList
      },
    })
  },
};
</script>

<style>
</style>