import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import VacationWithLikes from "../Models/VacationWithLikesModel";
import Vacation from "../Models/VacationsModel";

interface VacationsSlice {
    vacations: VacationWithLikes[];
}

const initialState: VacationsSlice = {
    vacations: []
}

const vacationsSlice = createSlice({
    name: "vacations",
    initialState,
    reducers: {
        setVacations: (state, action: PayloadAction<VacationWithLikes[]>) => {
            state.vacations = action.payload;
        },

        addVacation: (state, action: PayloadAction<VacationWithLikes>) => {
            state.vacations.push(action.payload);
        },

        updateVacation: (state, action: PayloadAction<VacationWithLikes>) => {
            const index = state.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            state.vacations[index] = action.payload;
        },

        deleteVacation: (state, action: PayloadAction<number>) => {
            const index = state.vacations.findIndex(v => v.vacationId === action.payload);
            state.vacations.splice(index, 1);
        }
    }
});

export const { setVacations, addVacation, updateVacation, deleteVacation } = vacationsSlice.actions;
export default vacationsSlice.reducer;