interface LoadingState {
  loading: boolean
  minLoadingTime: number
}

export default {
  namespaced: true,

  state: (): LoadingState => ({
    loading: false,
    minLoadingTime: 800
  }),

  mutations: {
    SET_LOADING(state: LoadingState, value: boolean) {
      state.loading = value
    },
    SET_MIN_LOADING_TIME(state: LoadingState, value: number) {
      state.minLoadingTime = value
    }
  },

  actions: {
    startLoading({ commit }: { commit: any }) {
      commit('SET_LOADING', true)
    },

    async stopLoading({ commit, state }: { commit: any; state: LoadingState }) {
      // Ensure minimum loading time
      await new Promise((resolve) => setTimeout(resolve, state.minLoadingTime))
      commit('SET_LOADING', false)
    },

    setMinLoadingTime({ commit }: { commit: any }, time: number) {
      commit('SET_MIN_LOADING_TIME', time)
    }
  },

  getters: {
    isLoading: (state: LoadingState) => state.loading
  }
}
