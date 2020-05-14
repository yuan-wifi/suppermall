import { rateData, rateBaseInfo } from './rateData/ratedata.js'

export function getRateData() {
  return new Promise((reslove, reject) => {
    reslove(rateData.data)
  });
}

export function getRateBaseInfo(){
  return new Promise((reslove, reject) => {
    reslove(rateBaseInfo)
  });
}
