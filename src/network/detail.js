import { getDetailData } from './detailData/detailData.js'
import { recommends } from './detailData/recommends.js'

export function getDetail(iid) {
  return new Promise(function(reslove,reject){
     reslove(getDetailData(iid))  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
  })
}

export function getRecommends() {
  return new Promise(function(reslove, reject) {
    reslove(recommends.data)
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
