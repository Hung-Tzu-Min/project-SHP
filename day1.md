## 1.       
        node_modules文件夾:項目依賴文件夾

        public文件夾:一般放置一些靜態資源(圖片),需要注意,放在public文件夾中的靜態資源,webpack進行打包的時候,會原封不動打包到dist文件夾中

        src文件夾(程序員源代碼文件夾)

            assets文件夾:一般也是放置靜態資源(一般放置多個組件共用的靜態資源),需要注意,放置在assets文件夾裡面靜態資源,在webpack打包的時候,webpack會把靜態資源當作一個模塊,打包JS文件裡面

            components文件夾:一般放置的是非路由組件(全局組件)

            App.vue:唯一的根組件,vue當中的組件(.vue)
            main.js:程序入口文件,也是整個程序當中最先執行的文件

        babel.config.js:配置文件(babel相關)

        package.json文件:認為項目"身分證",紀錄項目叫做甚麼、項目當中有哪些依賴、項目怎麼運行

        package-lock.json:緩存性文件

        README.md:說明性文件

## 2.項目的其他配置
    1.項目運行後，讓瀏覽器自動打開
    2.eslint校驗功能關閉
        在vue.config.js文件中，寫入【lintOnSave:false】
    3.src文件夾簡寫方法，配置別名
        在jsconfig.json配置別名@提示【@代表的是src文件夾，這樣將來文件過多，找的時候方便】

## 3.路由的分析
    Vue-router
    前端所謂路由：key跟value兩兩相對
        key:URL(地址欄中的路徑)
        value:相應的路由組件
    注意:項目上中下結構

    作品中的組件結構:
    路由組件:
        Home首頁路由組件、Search路由組件、login登入路由、Refister註冊路由
    非路由組件:
    Header【在首頁、搜索頁出現】，在登入跟註冊沒有
    Footer【在首頁、搜索頁出現】，但在登入頁面沒有

## 4.完成非路由組件Header和Footer業務
    (在項目當中，不再以HTML + CSS為主，主要著重在業務與邏輯)
    在開發項目的時候:
    1.書寫靜態頁面(HTML+CSS)
    2.拆分組件
    3.獲取服務器的數據動態展示
    4.完成相應的動態業務邏輯

    注意1.創建組件的時候,組件結構 + 組件樣式 + 圖片資源
    注意2.項目採用less樣式,瀏覽器不識別less樣式,需要通過less、less-loader進行處理
         (less,把less樣式變為CSS樣式,瀏覽器才可以識別)
         【我的安裝 npm install --save less less-loader@6 (2023.3.1安裝6版)】
    注意3.如果想讓組件識別less樣式,需要在style標籤的身上加上 lang="less"

## 5.路由組件的搭建
    【我的安裝 npm install --save vue-router@3 (2023.3.1安裝3版)】

    -components文件夾:經常放置的非路由組件(共用全局組件)
    -pages|views文件夾:經常放置路由組件

    一、配置路由
        項目當中配置的路由一般放置在router文件夾中

    二、總結
        路由組件與非路由組件的區別?
        1.路由組件一般放置在pages|views文件夾,非路由組件一般放置components文件夾中
        2.路由組件一般需要在router文件夾中進行註冊(使用的即為組件的名子),非路由組件在使用的時候,一般都是以標籤的形式使用
        3.註冊完路由,不管路由組件、還是非路由組件身上都有$route、$router屬性

        $route:一般獲取路由信息【路徑、query、params等等】
        $router:一般進行編成式導航進行路由跳轉【push|replace】

    三、路由的跳轉?
        路由的跳轉有2種形式:
            聲明式導航 router-link ,可以進行路由跳轉
            編成式導航 push|replace ,可以進行路由跳轉

        編程式導航:聲明式導航能做的,編程式導航都能做,但是編程式導航除了可以進行路由跳轉,還可以做一些其他的業務邏輯
    
## 6.Footer組件顯示與隱藏
    顯示或者隱藏組件: v-if | v-show
    Footer組件:在Home、Search顯示Footer組件
    Footer組件:在Login、Register時隱藏

    一、我們可以根據組件身上的$route獲得當前路由的信息,通過路由路徑判斷Footer顯示與隱藏
    二、配置的路由的時候,可以給路由添加 "路由元信息"【meta】,路由需要配置對象,他的key不能亂寫

## 7.路由傳參
    一、路由跳轉有幾種方式?
        比如:A→B
        聲明式導航:router-link(務必要有to屬性),可以實現路由的跳轉
        編程式導航:利用的是組件實例的 $router.push|replace方法,可以實現路由的跳轉。(可以書寫一些自己的業務)
    
    二、路由傳參,參數有幾種寫法?
        params參數:屬於路徑當中的一部分,需要注意,在配置路由的時候,需要佔位
        query參數:不屬於路徑當中的一部分,類似於ajax中的queryString  /home?k=v&kv= ,不需要佔位

## 8.路由傳參相關面試題 
    1.路由傳遞參數(對象寫法)path是否可以結合params參數一起使用?
      答:路由跳轉傳參的時候,對象的寫法可以是name、path形式,但是需要注意的是,path這種寫法不能與params參數一起使用

    2.如何指定params參數可傳可不傳?
      比如:配置路由的時候,站位了(params參數),但是路由跳轉的時候就不傳遞
           路徑會出現問題,如下
           
           錯誤:http://localhost:8080/#/?k=ASD

           正確:http://localhost:8080/#/Search?k=ASD
           答:如果路由要求傳遞params參數,但是你就不傳遞params參數,會發現一件事,URL會有問題

      如何指定params參數可以傳遞,或者不傳遞,在配置路由的時候,在佔位的後面加上一個問號【params可以傳遞或者不傳遞】
    
    3.params參數可以傳遞也可以不傳遞,但是如果傳遞是空字串,如何解決?
      使用undefined解決:params參數可以傳遞、不傳遞(空的字符串)
      
      例:this.$router.push({name:"Search",params:{keyWord:''||undefined},query:{k:this.keyWord.toUpperCase()}}) 

    4.路由組件能不能傳遞props數據?
      可以,並且有三種寫法
      第一種:布林值寫法(params)
            props:true,

      第二種:對象寫法 (額外的給路由組件傳第一些props)
            props:{a:1,b:2},

      第三種:可以將params參數、query參數,通過props傳遞給路由組件
            props:($route)=>{
                return{keyWord:$route.params.keyWord,k:$route.query.k}
            }

##  額外說明:邊程式路由跳轉到當前路由(參數不變),多次執行會拋出NavigationDuplicated的警告錯誤?
    --路由跳轉有2種形式:聲明式導航、編程式導航
    --聲明式導航沒有這類問題,因為Vue-router底層已經處理了

    一、為什麼編程式導航進行路由跳轉的時候,就會有這種警告錯誤?
        "vue-router":"^3.6.5":最新的vue-router引入promise
    二、通過給push方法傳遞相應的成功、失敗的回調函數,可以捕獲到當前錯誤,可以解決

    三、通過底部的代碼,可以實現解決錯誤
        this.$router.push({name:"Search",params:{keyWord:this.keyWord},query:{k:this.keyWord.toUpperCase()}},()=>{},()=>{}) 
        ※這種寫法:治標不治本,將來在別的組件當中push|replace,編程式導航來式有類似錯誤

## 9.
  1.Home模塊的組件拆分
    --先把靜態頁面完成
    --拆分出靜態組件
    --獲取服務器的數據進行展示
    --動態業務

  2.三級連動組件
    ---由於三級連動,在Home、Search、Detail,把三級連動註冊為全局組件
     好處:只需要註冊一次,就可以在項目任意地方使用

  3.完成其餘組件的拆分
    HTML + CSS + 圖片資源 ----信息【結構、樣式、圖片資源】

  4.POSTMAN測試接口
    --剛剛
    --如果服務器返回的數據code字段200,代表服務器返回數據成功
    --整個項目,接口前綴都有 /api 字樣

  5.axios二次封裝
    
    5.1為什摩需要進行二次封裝axios?
      因為需要 "請求攔截器" & "響應攔截器"
       請求攔截器:可以在發請求之前先處理一些業務
       響應攔截器:當服務器數據返回以後,可以處裡一些事情
    
    5.2在項目當中經常有API文件【axios】
       接口當中:路徑都帶有 /api
       baseURL:"/api"
    
    5.3如果基礎不好,可以參考 git|NPM 關於axios文檔的說明

  6.接口統一管理
    
    6.1跨域問題
       甚麼是跨域:協議、域名、端口號...不同請求,稱之為跨域
       http://localhost:8080/#/Home  ----前端項目的本地服務器

       http://gmall-h5-api.atguigu.cn  ----後台服務器

       JSONP、CROS、代理

  7.nprogress進度條的使用
    【npm install --save nprogress】

     start:進度條開始
     done:進度條結束
     進度條顏色可以修改,從人家的樣式去修改

  8.vuex狀態管理庫
    一、vuex是什麼?
        vuex是官方提供一個插件、狀態管理庫，集中式管理項目中組件共用的數據

        ※並不是全部項目都需要vuex,如果項目很小,就完全不需要Vuex
          反之,項目很大,數據很多,數據維護很費勁,就需要Vuex
        
    二、【npm install --save vuex】
    三、vuex實現模塊式開發
        如果項目大,組件多,接口也很多,數據也多,可以讓Vuex實現模塊式開發

  9.完成TypeNav三級聯動展示數據業務


## 10.
    1.完成一級分類動態添加背景顏色
      第一種:採用樣式完成

      例: .item:hover{
            background:skyblue;
          }
        
      第二種:通過JS完成

    2.通過JS控制二三級商品分類的顯示與隱藏
        最開始時候,是通過css樣式 display:block|none顯示與隱藏二三級商品分類

    3.演示卡頓現象
      正常:事件觸發非常頻繁,而且每一次的觸發,回調函數都要去執行(如果時間很短,而回調函數內部有計算,那麼很可能出現瀏覽器卡頓)
      【節流】:在規定的間隔時間範圍內不會重複觸發回調,只有大於這個時間間隔才會觸發回調,把頻繁觸發變為少量觸發
      【防抖】:前面的所有觸發都被取消,最後一次執行完,在規定的時間之後才會執行回調,也就是說如果連續快速的觸發,也只會執行一次

      簡易說明
      防抖:用戶操作很頻繁,但是只是執行一次
      節流:用戶操作很頻繁,但是把頻繁的操作變為少量操作 (給瀏覽器有充裕的時間解析代碼)

    4.完成三級聯動節流的操作
      使用【lodash】(不用npm安裝,已經有了)

    5.三級聯動組件的路由跳轉與傳遞參數
      
      三級連動 用戶可以點擊的:1級分類、2級分類、3級分類,當用戶點擊時,Home模塊跳轉到Search模塊,
                            以及會把用戶選中的產品(產品名子、產品ID)在路由跳轉時,進行傳遞

      路由跳轉:
        聲明式導航:router-link
        編程式導航:push|replace

        ※使用聲明式導航,可以實現路由的跳轉與傳遞參數,但會出現卡頓現象!
          因為:當router-link收到服務器的數據,會依照收到的數據量,創建組件實例,如果數據量很大(1000+),一瞬間創造這麼多組件會很消耗內存,所以會產生卡頓現象!!

## 11.
  1.開發Search模塊中的TypeNav商品分類菜單 (過渡動畫效果)
  過渡動畫:前提組件|元素務必要有 v-if|v-show 指令才可以進行過渡動畫

  2.現在我們的商品分類三級列表可以進行優化?
  在App根組件當中發送請求【根組件mounted】執行一次

  3.合併params與參數?

  4.開發Home首頁當中





  【swiper下載網址 https://www.swiper.com.cn/download/index.html】
  【npm install --save swiper@6】我目前裝的是6版

                  



  
