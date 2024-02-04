import axios from "axios";
import { store } from "../Globalstate/Store";

class InterceptorService {
    static interceptor(): void {
        axios.interceptors.request.use((request) => {
            const token = store.getState().auth.token;
            if (token) {
                request.headers.Authorization = "Bearer " + token;
            }
            return request;
        });
    }
}

export default InterceptorService;