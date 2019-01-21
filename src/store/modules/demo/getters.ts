import { Demo } from './type'
import { GetterTree } from 'vuex'

const getters: GetterTree<Demo, any> = {
  helloWord: (state: Demo) => state.helloWord
}

export default getters
