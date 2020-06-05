import { request } from './request.js'

export function getCategory() {
  return request({
    url: '/category/category'
  });
}

export function getItemCateData(maitkey) {
  return request({
    url: '/category/itemcategory',
    params: {
      maitkey
    }
  });
}

export function getItemData(maitkey, page, type) {
  return request({
    url: '/category/itemdata',
    params: {
      maitkey,
      page,
      type
    }
  });
}
