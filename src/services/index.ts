import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './config/index'
const ysRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    responseSuccessFn(res) {
      const { success, message, data } = res.data
      if (success) {
        return data
      }
      //业务请求错误响应
      return Promise.reject(new Error(message))
    }
  }
})

export default ysRequest
