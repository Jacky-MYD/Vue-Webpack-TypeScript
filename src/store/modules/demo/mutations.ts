import { Demo } from './type'
import { MutationTree } from 'vuex'

const state: Demo = {
  helloWord: 'helloWord'
}
const mutations: MutationTree<Demo> = {
  SET_HELLO_WORD (state: Demo, data: string) {
    state.helloWord = data
  }
}

export { state, mutations }
