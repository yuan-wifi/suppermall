const state =  {
  searchWord: [],
  hotWord: '',
  isshow: false
}

const getters = {
  searchWordList() {
    return state.searchWord;
  },
  hotWordkey() {
    return state.hotWord;
  },
  showValue() {
    return state.isshow;
  }
}
const mutations = {
  setSearchWord(state, payload) {
    state.searchWord.splice(0);
    state.searchWord.push(...payload);
  },
  setHotWord(state, payload) {
    state.hotWord = payload;
  },
  setIsshow(state, payload) {
    state.isshow = !state.isshow;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
