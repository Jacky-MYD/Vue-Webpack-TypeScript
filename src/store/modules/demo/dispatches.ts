import store from './index.ts'
import api from './api.ts'
import ajax from '../../ajax.ts'

export const postDemo = (params) => {
  return ajax.post(api.postDemo, params)
}
export const getDemo = (params) => {
  return ajax.get(api.getDemo + params)
}
