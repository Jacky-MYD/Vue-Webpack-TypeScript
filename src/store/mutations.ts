import { RootStateTypes } from './types'
import { MutationTree } from 'vuex'

const mutations: MutationTree<RootStateTypes> = {
  SET_AUTHOR (state: RootStateTypes, data: string) {
    state.author = data
  }
}

export default mutations
