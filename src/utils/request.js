import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_API
    : 'http://localhost:3000/m-api'

// axios 拦截器
const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, '网络错误')
  },
)

export default axiosInstance
