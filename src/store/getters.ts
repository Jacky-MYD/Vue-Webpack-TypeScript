import { RootStateTypes } from './types'
import { GetterTree } from 'vuex'

const getters: GetterTree<RootStateTypes, any> = {
  author: (state: RootStateTypes) => state.author
}

export default getters
