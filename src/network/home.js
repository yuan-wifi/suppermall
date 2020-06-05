import {request} from './request.js'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
 return request({
    url: '/home/goodsdata',
    params: {
      type,
      page
    }
  })
}

export function getHomeCategory() {
  return request({
    url: '/home/homeCategory'
  })
}

export function getHomeSearchKey() {
  return request({
    url: '/home/homesearchkey'
  })
}
