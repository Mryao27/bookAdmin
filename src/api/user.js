import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUsers() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/user/saveUser',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: { id }
  })
}

