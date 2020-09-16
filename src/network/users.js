import { request} from './request'

export function getUserList(query, pagenum,pagesize) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function getUserState(uid, type) {
  return request({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}

export function getUserRoles() {
  return request({
    url: 'roles',
    method: 'get'
  })
}

export function assignUserRole(id,rid) {
  return request({
    url: `users/${id}/role`,
    method: 'put',
    data: {
      rid: rid
    }
  })
}
