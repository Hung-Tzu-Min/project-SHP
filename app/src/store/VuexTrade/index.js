import { reqAddressInfo } from '@/api'
import { reqOrderInfo } from '@/api'

const state = {
    address: [],
    orderInfo:{},
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETUSERORDER(state,value){
        state.orderInfo = value
    }
}
const actions = {
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    async getUserOrder({ commit }) {
        let result = await reqOrderInfo()
        console.log(result)
        if(result.code == 200){
            commit("GETUSERORDER",result.data)
        }
    }
}
const getters = {}

export default ({
    state,
    mutations,
    actions,
    getters,
})