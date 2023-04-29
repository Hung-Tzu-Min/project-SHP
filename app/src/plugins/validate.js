//vee-validate插件:表單驗證區
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

import zh_TW from 'vee-validate/dist/locale/zh_TW'

VeeValidate.Validator.localize('zh_TW', {
    messages: {
        ...zh_TW.messages,
        is: (field) => `${field}必須與密碼相同` //修改內置規則的message,讓確認密碼和密碼相同
    },
    attributes: {  //給校驗的field屬性名映射中文名稱
        phone: '手機號',
        code: '驗證碼',
        password: '密碼',
        password1: '確認密碼',
        agree: '協議',
    }
})

//自訂義校驗規則
VeeValidate.Validator.extend('agree', {
    validate: (value) => {
        return value
    },
    getMessage: (field) => field + "必須同意"
})