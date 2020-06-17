import axios from 'axios';

// axios 拦截器
const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_API
  baseURL:'http://localhost:3000'
})

axiosInstance.interceptors.response.use(
  res=> res.data,
  err =>{
    console.log(err,"网络错误")
  }
)


export default axiosInstance