import axios from "axios";
import {CREATE_POST} from "./index";

export function apiGetAuthen(api) {
    try {
        const instance = axios.create({
            baseURL: api,
        });

        instance.interceptors.request.use(config => {
                const token = sessionStorage.getItem('access_token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }
            , error => {
                return Promise.reject(error);
            });

        return instance.get(api);

    } catch (error) {
        console.log(error)
    }
}


