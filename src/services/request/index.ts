import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HYRequestConfig } from './type'

class HYRequest {
  instance: AxiosInstance
  //request 实例 =》 axios 的实例
  //可以针对不同的配置
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    //每个instance实例都添加拦截器
    //全局请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //可以修改配置，或者loading,token
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    //全局响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        return res
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )
    //针对特定的hyRequest 实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailFn
    )
  }

  //封装网络请求的方法
  //T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    //对axios做二次封装，防止axios不更新，到时可以直接在constructor换库

    //单次请求成功的拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单次响应成功的拦截器
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
