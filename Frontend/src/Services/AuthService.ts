import { login, logout, register } from "../Globalstate/AuthSlice";
import { setVacations } from "../Globalstate/VacationsSlice";
import { store } from "../Globalstate/Store";
import axios from "axios";
import Credentials from "../Models/CredentialsModel";
import User from "../Models/UserModel";

const login_url = "http://localhost:4000/api/login/";
const register_url = "http://localhost:4000/api/register/";

export default class AuthService {
    static async register(user: User) {
        const token = (await axios.post<string>(register_url, user)).data;
        store.dispatch(register(token));
    }

    static async login(credentials: Credentials) {
        const token = (await axios.post<string>(login_url, credentials)).data;
        store.dispatch(login(token));
    }

    static async logout() {
        store.dispatch(logout());
        store.dispatch(setVacations([]));
    }

}