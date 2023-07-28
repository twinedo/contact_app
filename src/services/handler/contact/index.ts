import { API_MAIN } from "@env"
import { useAxios } from "services/useAxios"
import { IDataContactProps } from "utils/interfaces";

export const GetContactHandler = async () => {
    try {
        const response = await useAxios({
            url: `${API_MAIN}/contact`,
            method: 'get',
        });
        console.log('respon get', response.data);
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const GetContactByIDHandler = async (id: string) => {
    try {
        const response = await useAxios({
            url: `${API_MAIN}/contact/${id}`,
            method: 'get',
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const AddContactHandler = async (data: IDataContactProps) => {
    try {
        const response = await useAxios({
            url: `${API_MAIN}/contact`,
            method: 'post',
            data
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const DeleteContactHandler = async (id: string) => {
    try {
        const response = await useAxios({
            url: `${API_MAIN}/contact/${id}`,
            method: 'delete'
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const UpdateContactHandler = async (id: string, data: IDataContactProps) => {
    try {
        const response = await useAxios({
            url: `${API_MAIN}/contact/${id}`,
            method: 'put',
            data,
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}