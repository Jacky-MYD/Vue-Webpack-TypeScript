
import ajax from '../../ajax.ts'
import { Demo } from './type'
import Api from './api.ts'
import { Commit, Action, ActionTree } from 'vuex'

// const actions: ActionTree<Demo, any> = {
//   SET_HELLO_WORD_ANSY ({ commit, state: RootStateTypes }, data: string) {
//     console.log(222, data)
//     commit('SET_HELLO_WORD', data)
//   },
//   getBaseDataNew (data) {
//     return ajax.post(Api.getBaseDataNew, data)
//   }
// }
const stateVal: Action<Demo, any> = (context: { commit: Commit }, data: any) => {
  context.commit('SET_HELLO_WORD', data)
}
const actions: ActionTree<Demo, any> = {
  stateVal
}
export default actions
