<template>
  <div>
    <h2>效果一:顯示TODO列表時,已完成的TODO為綠色</h2>
    <!-- 子組件:數據來源於父組件 -->
    <List :todos="todos">
      <!-- 子組件決定不了它的結構與外觀 -->
      <template slot-scope="todo">
        <span :style="{color:todo.todo.isComplete?'green':'red'}">
            <!-- {{ todo.todo.text }} -->
            {{todo}}
        </span>
    </template>
    </List>

    <hr />
    <h2>效果二:顯示TODO列表時,帶序號,TODO的顏色為藍綠搭配</h2>
    <List2 :todos="todos">
        <template slot-scope="{todo,$index}">
        <span :style="{color:todo.isComplete?'blue':'green'}">
            <!-- {{$index}}---{{ todo.text }} -->
            {{todo}}
        </span>
    </template>
    </List2>
  </div>
</template>

<script>
import List from "./List.vue";
import List2 from "./List2.vue"
export default {
  components: { List,List2 },
  data() {
    return {
      todos: [
        { id: 1, text: "AAA", isComplete: false },
        { id: 2, text: "BBB", isComplete: true },
        { id: 3, text: "CCC", isComplete: false },
        { id: 4, text: "DDD", isComplete: false },
      ],
    };
  },
};
</script>

<style>
</style>