<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 沒有用戶名:未登入 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 聲明式導航:務必要有to屬性(用於導向該頁面組件) -->
            <router-link to="/login">登入</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
            <router-link to="/exercise">組件通信練習</router-link>
          </p>
          <!-- 有用戶名:登入 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登入</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyWord123"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyWord123: "",
    };
  },
  methods: {
    //搜索按鈕的回調函數:需要search路由進行跳轉
    goSearch() {
      //路由傳遞參數
      //第一種:字符串形式
      //this.$router.push('/Search/'+this.keyWord+"?k="+this.keyWord.toUpperCase())
      //第二種:模板字符串
      //this.$router.push(`/Search/${this.keyWord}?k=${this.keyWord.toUpperCase()}`)
      //第三種:對象
      //this.$router.push({name:"Search",params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})

      /*---------------------------------------------------------------------------*/
      //面試題1:路由傳遞參數(對象寫法)path是否可以結合params參數一起使用?
      //答:路由跳轉傳參的時候,對象的寫法可以是name、path形式,但是需要注意的是,path這種寫法不能與params參數一起使用
      //this.$router.push({path:"/Search",params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})

      //面試題2:如何指定params參數可傳可不傳?
      //答:如果路由要求傳遞params參數,但是你就不傳遞params參數,會發現一件事,URL會有問題
      //如何指定params參數可以傳遞,或者不傳遞,在配置路由的時候,在佔位的後面加上一個問號【params可以傳遞或者不傳遞】
      //this.$router.push({name:"Search",query:{k:this.keyWord.toUpperCase()}})

      //面試題3:params參數可以傳遞也可以不傳遞,但是如果傳遞是空字串,如何解決?
      //使用undefined解決:params參數可以傳遞、不傳遞(空的字符串)
      //this.$router.push({name:"Search",params:{keyWord:''||undefined},query:{k:this.keyWord.toUpperCase()}})

      //面試題4:路由組件能不能傳遞props數據?
      //this.$router.push({name:"Search",params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}})
      /*---------------------------------------------------------------------------*/

      //代表的是如果有query參數也帶過去
      if (this.$route.query) {
                                  //keyword大小寫不能亂寫,不然到時候關鍵的請求參數找不到
        let location = {name: "Search", params: { keyword: this.keyWord123 || undefined }};
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    //退出登入
    logout(){
      //1.需要發請球,通知服務器退出登入【清除一些數據:token】
      //2.清除項目當中的數據【例:userInfo、token】
      try{
        //如果退出成功
        this.$store.dispatch('userLogout')
        //就返回首頁
        this.$router.push('/home')
      }catch(error){

      }
      
      
    }
  },
  mounted(){
    //通過全局事件總線清除搜尋關鍵字
    this.$bus.$on("clear",()=>{
      this.keyWord123 = ""
    })
  },
  computed:{
    //從倉庫取出用戶名信息
    userName(){
      return this.$store.state.User.userInfo.name
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>