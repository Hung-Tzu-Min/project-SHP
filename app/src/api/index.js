//當前這個模塊:API進行統一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三級連動的
//  /api/product/getBaseCategoryList 是get請求、無參數

//下面是一般暴露
// export const reqCategoryList = () => {
//     //發請求:axios發請求返回結果Promise對象
//     return requests({ url: '/product/getBaseCategoryList', method: 'get' })
// }


const reqCategoryList = () => {
    //發請求:axios發請求返回結果Promise對象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//獲取banner (Home首頁的輪播圖接口)
const reqGetBannerList = () => {
    return mockRequests({ url: '/banner', method: 'get' })
}

//獲取Floor 數據
const reqFloorList = () => {
    return mockRequests({ url: '/floor', method: 'get' })
}

//獲取搜索模塊數據 地址:/api/list/   請求方式:post  參數:需要帶參數
//當前這個函數需不需要接受外部傳遞參數? (需要)
//當前這個接口(獲取搜索模塊的數據),需要給服務器傳遞一個默認參數【至少是一個空對象】
const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//獲取產品詳情信息的數據  地址:/api/item/{ skuId }  請求方式:get 參數:需要帶參數
const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// '/item/`${skuId}`'

//將產品添加到購物車中(獲取更新某一個產品的個數)
//地址 /api/cart/addToCart/{ skuId }/{ skuNum }  請求方式:post
const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })

//購物車列表數據接口
//地址: /api/cart/cartList  method:get
const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//刪除購物產品的接口
//地址: /api/cart/deleteCart/{skuId}  method:DELETE
const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//
//地址 /api/cart/checkCart/{skuId}/{isChecked}  method:get
const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })

//獲取驗證碼
//地址  /api/user/passport/sendCode/{phone}  method:get
const reqGedCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//用戶註冊
//地址  /api/user/passport/register  method:POST
const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' })

//用戶登入
//地址  /api/user/passport/login method:POST
const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//獲取用戶信息【需要帶著用戶的token信息,向服務器索要用戶信息】
//地址  /api/user/passport/auth/getUserInfo  method:get
const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })

//用戶退出
//地址  /api/user/passport/logout  method:get
const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//獲取用戶的地址信息
//地址  /api/user/userAddress/auth/findUserAddressList
const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//獲取商品清單
//地址 /api/order/auth/trade
const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交訂單資訊的接口
//地址  /api/order/auth/submitOrder?tradeNo={tradeNo}  method:POST
const reqSubmiOrder = (tradeNo,data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: 'post' })

//獲取支付信息
//地址 /api/payment/weixin/createNative/{orderId}  method:GET
const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//獲取支付訂單狀態
//地址  /api/payment/weixin/queryPayStatus/{orderId} method:get
const reqPayStatus =(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//獲取個人中心的數據(我的訂單)
//地址 /api/order/auth/{page}/{limit}  method:get
const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})


export { reqCategoryList, reqGetBannerList, reqFloorList, reqGetSearchInfo, reqGoodsInfo, reqAddOrUpdateShopCart, reqCartList, reqDeleteCartById, reqUpdateCheckedById, reqGedCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout, reqAddressInfo, reqOrderInfo, reqSubmiOrder,reqPayInfo,reqPayStatus,reqMyOrderList }