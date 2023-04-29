<template>
  <!--  -->
  <div style="margin-left: 50px;margin-right: 50px;">
    <h1>組件通信高級(**非常重要,面試必備**)</h1>
    <div>
      <router-link to="/exercise/eventtest">event深入</router-link>&nbsp
      <router-link to="/exercise/modeltest">v-model深入</router-link>&nbsp
      <router-link to="/exercise/synctest">屬性修飾符snyc</router-link>&nbsp
      <router-link to="/exercise/attrslistenerstest">$attrs與$listeners</router-link>&nbsp
      <router-link to="/exercise/childrenparenttest">$children與$parent</router-link>&nbsp
      <router-link to="/exercise/sopeslottest">作用域插槽scope-slot</router-link>
    </div >
    <div style="margin-top:50px ;">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exercise",
};
</script>

<style>
</style>