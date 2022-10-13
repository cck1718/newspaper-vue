import axios from "axios";



const instance = axios.create({
  baseURL: 'http://localhost:8550',
  timeout: 5000,
})

//请求拦截器
instance.interceptors.request.use(config=>{
  config.headers['token'] = localStorage.getItem('token');
  return config;
})

//响应拦截器
instance.interceptors.response.use(response=>{
  return response;
})

export  default  instance;
