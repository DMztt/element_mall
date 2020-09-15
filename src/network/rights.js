import { request } from './request'

export function getRightsList() {
  return request({
    url: 'rights/list',
    method: 'get'
  })
}

export function getRoleList() {
  return request({
    url: 'rights/tree',
    method: 'get'
  })
}
export function getRoles() {
  return request({
    url: 'roles',
    method: 'get'
  })
}
