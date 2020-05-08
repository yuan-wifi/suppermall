import { categoryData } from './categoryData/categoryData.js'

import { data_3627_category } from './categoryData/3627/data_3627_category.js'
import { data_3627_new } from './categoryData/3627/data_3627_new.js'
import { data_3627_sale } from './categoryData/3627/data_3627_sale.js'
import { data_3627_pop } from './categoryData/3627/data_3627_pop.js'

import { data_582_category } from './categoryData/582/data_582_category.js'
import { data_582_new } from './categoryData/582/data_582_new.js'
import { data_582_sell } from './categoryData/582/data_582_sell.js'
import { data_582_pop } from './categoryData/582/data_582_pop.js'

let data = {
  3627: {
    category: data_3627_category,
    1: {
      'pop': data_3627_pop,
      'sell': data_3627_sale,
      'new': data_3627_new
    }
  },
  582: {
    category: data_582_category,
    1: {
      'pop': data_582_new,
      'sell': data_582_sell,
      'new': data_582_pop
    }
  }
}

export function getCategory() {
  return new Promise(function(reslove,reject){
      reslove(categoryData.data)  //状态由等待变为成功，传的参数作为then函数中成功函数的实参
  })
}

export function getItemCateData(maitkey) {
  return new Promise((reslove, reject) => {
    if(data.hasOwnProperty(maitkey)) {
      reslove(data[parseInt(maitkey)]['category'].data);
    } else {
      reslove({});
    }

  })
}

export function getItemData(maitkey, page, type) {
  return new Promise((reslove, reject) => {
    if(data.hasOwnProperty(parseInt(maitkey))) {
      reslove(data[parseInt(maitkey)][parseInt(page)][type]);
    } else {
      reslove({});
    }
  })
}
