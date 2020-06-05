import {request} from './request.js'

export function getDetail(iid) {
  return request({
    url: '/detail/detailData',
    params: {
      iid
    }
  })
}

export function getRecommends() {
  return request({
    url: '/detail/recommends'
  })
}

// 商品信息类
export class Goods {
  constructor(itemInfo, priceInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = priceInfo.nowPrice
    this.oldPrice = priceInfo.oldPrice
    this.discount = priceInfo.priceTags
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 店铺信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}
