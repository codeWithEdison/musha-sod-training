import axios from "axios";
const API_URL = 'http://localhost:5000/api' 

// create axios instance 
const api = axios.create({
    baseURL: API_URL,
})

// add a request interceptor  to add token to every request 
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('musha_token');
    if(token){
    config.headers.Authorization = ` Bearer ${token}`
    }
    return config
}, (err)=>{
    return Promise.reject(err)
})
export default api;