import { request } from './request'

export function getRightsList() {
  return request({
    url: 'rights/list',
    method: 'get'
  })
}


export function getRoles() {
  return request({
    url: 'roles',
    method: 'get'
  })
}
