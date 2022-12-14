import { createStore } from "vuex";
import router from '@/router'
import axios from "axios";
export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    barang: [],
    hasilFilter:[],
    supplier :[],
    message:'',
    page: 0,
    username : localStorage.getItem("profile") || "",
  },
  getters: {
    allHasilFilter: (state)=> state.hasilFilter
  },
  mutations: {
    allData(state, data) {
      state.barang = data;
    },
    supplierData(state, data) {
     state.supplier = data;
    },
    MESSAGE(state, message) {
      state.message  = message;
    },
    SEARCHING_DATA (state,query){
      const search = state.barang.filter(searhing=>{
        return  searhing.namaBarang.toLowerCase().includes(query.toLowerCase()) 
      })
      this.state.hasilFilter = search
    }
    
   
  },
  actions: {
    async REGISTER_USER({ commit }, payload) {
      const response = await axios.post(
        "http://159.223.57.121:8090/auth/register",
        payload
      );
      if(response.status ===200){
        commit('MESSAGE',response.data.message)
        setTimeout(() => { 
        router.push("/");
         }, 3000)
      }

    
     
    },
    async LOGIN_USER({ commit }, payload) {
      const { data } = await axios.post(
        "http://159.223.57.121:8090/auth/login",
        payload
      );
     
      if(data.message =="LOGIN SUCCESS"){
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("profile", data?.data?.profileName);
         router.push('/dashboard')
      }
    },
    async GET_DATA({ commit }) {
      console.log(this.state.page)
      const {data} = await axios.get(
        " http://159.223.57.121:8090/barang/find-all",
        {
          headers: {
            Authorization: `Bearer ${this.state.token}`,
          },
          params: {
            page: this.state.page,
            offset: 10,
            limit:15,
            
          },
        }
      );
      console.log(data)
      commit("allData", data?.data);
      
    },
    async GET_DATA_SUPPLIER({ commit }, id){
     const {data} = await axios.get('http://159.223.57.121:8090/supplier/find-all',{
        headers: {
          'Authorization' : 'Bearer ' + this.state.token,    
         },
         params:{
          offset:0,
          limit:15,
          page:this.state.page
         }
      })
      console.log(data)
      commit('supplierData',data.data)
    },
    async CREATE_BARANG ({commit},payload){
     const response = await axios.post('http://159.223.57.121:8090/barang/create',payload,{
      headers:{
        'Authorization' : 'Bearer ' + this.state.token
      }
     })
     console.log(response)
    },
    async DELETE_BARANG({commit,dispatch},payload){
        await axios.delete('http://159.223.57.121:8090/barang/delete/'+payload,{
          headers:{
            'Authorization' : 'Bearer ' + this.state.token,
          }
        })
        dispatch('GET_DATA')
    },
   async UPDATE_BARANG ({commit},{config,params}){
    const response =  await axios.put('http://159.223.57.121:8090/barang/update/'+params,config,{
      headers:{
        'Authorization' : 'Bearer ' + this.state.token
      }
    })
    if(response.status ===200){
      router.push('/dashboard')
    }
   },
   async CREATE_SUPPLIER ({commit},payload){
    const response = await axios.post('http://159.223.57.121:8090/supplier/create',payload,{
     headers:{
       'Authorization' : 'Bearer ' + this.state.token
     }
    })
   
   },
   async DELETE_SUPPLIER({commit,dispatch},payload){
    await axios.delete('http://159.223.57.121:8090/supplier/delete/'+payload,{
      headers:{
        'Authorization' : 'Bearer ' + this.state.token,
      }
    })
    dispatch('GET_DATA_SUPPLIER')
},
async UPDATE_SUPPLIER ({commit},{config,params}){
  await axios.put('http://159.223.57.121:8090/supplier/update/'+params,config,{
    headers:{
      'Authorization' : 'Bearer ' + this.state.token
    }
  })
 },
 
  },
  modules: {},
});
