import { request } from './request'

export function loginSys(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
