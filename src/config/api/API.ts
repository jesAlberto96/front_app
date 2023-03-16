import axios from 'axios'

function handleErrorsPOST(data: any){
    if ('errors' in data.meta){
        const errors = Object.values(data.meta.errors);
        const finalErrors: any = [];
        errors.map(function (error: any) {
            error.map(function (e: any) {
                finalErrors.push(e);
            });
        });

        return {
            meta: {
                status: false,
                errors: finalErrors
            }
        }
    }

    return {
        meta: {
            status: false,
            errors: [
                "Ocurrio un error innesperado, por favor vuelva a intentarlo"
            ]
        }
    }
}

function handleErrorsGET(error: any){
    return {
        meta: {
            success: false,
            errors: [
                "Ocurrio un error innesperado, por favor vuelva a intentarlo"
            ]
        }
    }
}

const API = {
    async GET(path: any = ""){
        try{
            const response = await axios.get(path);

            return response.data
        } catch (error: any){
            return handleErrorsGET(error);
        }
    },

    async POST(path: any, data: any){
        try{
            const response = await axios.post(path, data);

            return response.data;
        } catch (error: any){
            return handleErrorsPOST(error.response.data);
        }
    },

    async DELETE(path: any){
        try{
            const response = await axios.delete(path);

            return response.data;
        } catch (error: any){
            return handleErrorsPOST(error.response.data);
        }
    },
}

export { API };