//先引入mockjs模塊
//引入Mock時，Mock的M要大寫
import Mock from 'mockjs'

//把JSON數據格式引入近來
//(JSON數據格式根本沒有對外暴露,但是可以引入??)
//注意:webpack默認對外暴露的:圖片、JSON數據格式、
import banner from './banner.json'
import floor from './floor.json'

//mock數據:需要2個參數 1.地址 2.數據
Mock.mock("/mock/banner",{code:200,data:banner}) //模擬首頁大的輪播圖數據
Mock.mock("/mock/floor",{code:200,data:floor})
