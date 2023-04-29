import { v4 as uuidv4 } from 'uuid';

//要生成一個隨機的字串,且每次執行不能發生變化,遊客身份持久存儲
const getUUID = ()=>{
    //先從本地存儲獲取uuid(看一下本地存儲裡面是否已經有uudi)
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果沒有
    if(!uuid_token){
        //就生成一個遊客臨時ID
        uuid_token = uuidv4()
        //並且存儲到本地端
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}

export {getUUID}