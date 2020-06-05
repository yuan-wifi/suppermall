import {request} from './request.js'

export function getRateData() {
  return request({
     url: '/rate/rateData'
  })
}

export function getRateBaseInfo(){
  return request({
     url: '/rate/rateBaseInfo'
  })
}
