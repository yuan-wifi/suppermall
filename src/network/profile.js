import { request } from './request.js'

export function getProfileInfo() {
  return request({
    url: '/profile'
  })
}
