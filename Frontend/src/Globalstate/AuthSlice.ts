import { jwtDecode } from "jwt-decode";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../Models/UserModel";

interface AuthSlice {
    token: string | null;
    user: User | null;
}

const token = localStorage.getItem("token");
const initialState: AuthSlice = {
    token,
    user: token ? (jwtDecode(token) as { user: User }).user : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action: PayloadAction<string>) => {
            const container: { user: User } = jwtDecode(action.payload);
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
            state.user = container.user;
        },

        login: (state, action: PayloadAction<string>) => {
            const container: { user: User } = jwtDecode(action.payload);
            localStorage.setItem('token', action.payload);
            state.token = action.payload;
            state.user = container.user;
        },

        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null;
            state.user = null;
        }
    }
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
