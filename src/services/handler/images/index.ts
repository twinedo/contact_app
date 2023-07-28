import { API_IMAGE } from "@env";
import { useAxios } from "services/useAxios"

export const GetRandomImages = async () => {
    try {
        const response = await useAxios({
            url: `${API_IMAGE}`,
            method: 'get'
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}