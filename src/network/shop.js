import {request} from './request'

export function getCategory(type, pagenum, pagesize) {
  return request({
    url: '/categories',
    method: 'get',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

export function getCateList(type) {
  return request({
    url: 'categories',
    method: 'get',
    params: {
      type
    }
  })
}

export function addCateList(data) {
  return request({
    url: 'categories',
    method: 'post',
    data
  })
}

export function getParamsList(id, only) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: {
      sel: only
    }
  })
}

export function addParams(id, data) {
  return request({
    url: `categories/${id}/attributes`,
    method: 'post',
    data
  })
}


export function editParams(id, name) {
  return request({
    url: `categories/${id}`,
    method: 'put',
    data: {
      cat_name: name
    }
  })
}

export function editSubParams(id, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

export function getGoodsList(params) {
  return request({
    url: 'goods',
    method: 'get',
    params
  })
}
