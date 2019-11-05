import { axios } from '@/utils/request'

/**
 * 查询用户数据
 * @param parameter
 * @returns {*}
 */
export function getUserById (id) {
  return axios({
    url: '/user/Get',
    method: 'get',
    params: {
      id: id
    }
  })
}

/**
 * 查询用户数据
 * @param parameter
 * @returns {*}
 */
export function getUserListByCode (code) {
  return axios({
    url: '/user/GetList',
    method: 'get',
    params: {
      code: code
    }
  })
}

