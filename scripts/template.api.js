// template.js
module.exports = {
  apiTemplate: apiName => {
    return `import { axios } from '@/utils/request'

/**
 * 查询数据
 * @param parameter
 * @returns {*}
 */
export function seach${apiName} (parameter) {
  return axios({
    url: '/${apiName}/SeachData',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取单个数据
 * @param id
 * @returns {*}
 */
export function get${apiName} (id) {
  return axios({
    url: '/${apiName}/get',
    method: 'get',
    params: { id }
  })
}

/**
 * 添加数据
 * @param parameter
 * @returns {*}
 */
export function add${apiName} (parameter) {
  return axios({
    url: '/${apiName}/Add',
    method: 'post',
    data: parameter
  })
}

/**
 * 更新数据
 * @param parameter
 * @returns {*}
 */
export function updata${apiName} (parameter) {
  return axios({
    url: '/${apiName}/Updata',
    method: 'post',
    data: parameter
  })
}

/**
 *批量删除数据
  * @param id
  * @returns {*}
  */
export function delete${apiName} (idList) {
  return axios({
    url: '/${apiName}/Delete',
    method: 'delete',
    data: idList
  })
}
`
  }
}
