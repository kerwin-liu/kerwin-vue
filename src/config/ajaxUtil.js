import axios from 'axios'
import router from '../router/index'

axios.defaults.baseURL = '/kerwin'
axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(({data}) => {
  const code = data.code
  if (code === '200') {
    return data
  } else {
    if (code === '302') {
      alert('登录超时，请重新登录', '提示', {
        confirmButtonText: '确定',
        callback: () => {
        }
      })
    }
    if (code === '500') {
      router.replace('/500')
    }
    return Promise.reject(data)
  }
}, error => {
  console.log(error)
  return Promise.reject({code: '500', msg: '请求超时', data: ''})
})

export default axios
