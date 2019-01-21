import actions from './actions.ts'
import { state, mutations } from './mutations.ts'
import getters from './getters.ts'
const store = {
  state,
  getters,
  actions,
  mutations
}
export default store
