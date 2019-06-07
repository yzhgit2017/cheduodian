import axios from 'axios'
import qs from 'qs'
import store from '../store/index'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://cheduodian.mcbn.cn';
// axios.defaults.baseURL = 'http://nw.cheduodian.com';

axios.interceptors.request.use((config) => {
    // 显示加载中的效果
    store.commit('vehicleList/changeLoadingState',true);
    if(config.data instanceof FormData){

    }else{
        config.data = qs.stringify(config.data)
    }
    config.headers = {
    	'content-type':'application/x-www-form-urlencoded;charset=UTF-8'
    }
    return config
},(error) =>{
    return Promise.reject(error);
});

axios.interceptors.response.use((res) =>{ 
    // 隐藏加载中的效果
    store.commit('vehicleList/changeLoadingState',false);
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetchPost(url,params){
    console.log(params)
	return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export function fetchGet(url,params = {}){
	return new Promise((resolve, reject) => {
        axios.get(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}