import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import vacationsReducer from "./VacationsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacations: vacationsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
