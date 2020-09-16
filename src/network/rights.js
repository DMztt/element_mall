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

export function postRinghts(roleid,idStr) {
  return request({
    url: `roles/${roleid}/rights`,
    method: 'post',
    data: {
      rids: idStr
    }
  })
}
