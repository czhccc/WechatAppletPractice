import {baseURL, timeOut} from './config'

export default function(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      timeout: timeOut,
      method: options.method || 'GET',
      data: options.data || {},
      success: resolve,
      fail: reject
    })
  })
}