import { createStore } from 'vuex'
import config from '@/store/config'
import { API } from '@/config/api/API'

export default createStore({
    actions: {
        async findByPage(context: any, { page }){
            return await API.GET(`${config.getters.getPath}/api/orcid/list?page=${page}`);
        },

        async findOrc(context: any, { orcid }){
            return await API.GET(`${config.getters.getPath}/api/orc/${orcid}`);
        },

        async find(context: any, { orcid }){
            return await API.GET(`${config.getters.getPath}/api/orcid/${orcid}`);
        },

        async create(context: any, payload: any){
            return await API.POST(`${config.getters.getPath}/api/orcid/create/${payload.orcid}`, payload);
        },

        async delete(context: any, { orcid }: any){
            return await API.DELETE(`${config.getters.getPath}/api/orcid/delete/${orcid}`);
        },
    }
})