import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            path: "http://127.0.0.1:8000",
            loading: 1,
        }
    },
    getters: {
        getPath: (state: any) => state.path,
        getLoading: (state: any) => state.loading,
    },
    mutations: {
        setLoading (state: any, loading: any) {
            state.loading = loading;
        },
    }
})