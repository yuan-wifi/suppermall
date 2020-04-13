import {request} from './request.js'
import {getHomedata} from './homeGoodsData/homedata.js'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
/*  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  }) */
  return new Promise(function(reslove,reject){
      reslove(getHomedata(type, page))  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
  })
}
