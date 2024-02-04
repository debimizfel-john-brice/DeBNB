import axios from "axios";
import { store } from "../Globalstate/Store";
import { addVacation, deleteVacation, setVacations, updateVacation } from "../Globalstate/VacationsSlice";
import VacationWithLikes from "../Models/VacationWithLikesModel";
import Vacation from "../Models/VacationsModel";

const vacations_url = "http://localhost:4000/api/vacations/";
const likes_url = "http://localhost:4000/api/likes/";

export default class VacationsService {
    static async getVacations(): Promise<VacationWithLikes[]> {
        let vacations = store.getState().vacations.vacations.map(v => new VacationWithLikes(v));
        if (!vacations.length) {
            vacations = (await axios.get<VacationWithLikes[]>(vacations_url)).data.map(vacation => new VacationWithLikes(vacation));
            store.dispatch(
                setVacations(
                    vacations.map(
                        vacation => {
                            const { ...vacationPlain } = vacation;
                            return vacationPlain;
                        }
                    )
                )
            );
        }
        return vacations;
    }

    static async getVacation(vacationId: string): Promise<VacationWithLikes> {
        let vacation = store.getState().vacations.vacations.find(vacation => vacation.vacationId === parseInt(vacationId));
        if (!vacation) {
            vacation = new VacationWithLikes((await axios.get<VacationWithLikes>(vacations_url + vacationId)).data);
        }
        return vacation;
    }

    static async addVacation(vacation: Vacation) {
        const formData = new FormData();
        formData.append("destination", vacation.destination);
        formData.append("image", vacation.image[0]); // .image is actually a FileList
        formData.append("description", vacation.description);
        formData.append("start", vacation.start.toString());
        formData.append("end", vacation.end.toString());
        formData.append("price", vacation.price.toString());
        const addedVacation = (await axios.post<VacationWithLikes>(vacations_url, formData)).data;
        store.dispatch(addVacation(addedVacation));
    }

    static async updateVacation(vacation: Vacation) {
        const formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("image", vacation.image[0]); // .image is actually a FileList
        formData.append("start", vacation.start.toString());
        formData.append("end", vacation.end.toString());
        formData.append("price", vacation.price.toString());
        const updatedVacation = (await axios.put<VacationWithLikes>(vacations_url + vacation.vacationId, formData)).data;
        store.dispatch(updateVacation(updatedVacation));
    }

    static async deleteVacation(vacationId: number) {
        await axios.delete<void>(vacations_url + vacationId);
        store.dispatch(deleteVacation(vacationId));
    }

    static async updateLikes(vacationId: number, liked: boolean) {
        const vacation = new VacationWithLikes((await axios.put(likes_url + vacationId, { liked })).data);
        store.dispatch(updateVacation({...vacation}));
    }
}