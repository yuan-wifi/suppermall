import {request} from './request.js'

export function getSearchResult() {
  return request({
    url: '/search/searchResult'
  })
}
