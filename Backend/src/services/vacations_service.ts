import { OkPacket } from "mysql";
import { ResourceNotFound } from "../models/error_status";
import dal from "../dal";
import Vacation from "../models/vacations_model";
import VacationWithLikes from "../models/vacations_with_likes_model";

async function getVacations(userId: number = 0): Promise<VacationWithLikes[]> {
    const vacations = await dal.execute(
        `SELECT vacations.*, COUNT(followings.vacation) AS likes,
        SUM(CASE WHEN followings.user = ? THEN 1 ELSE 0 END) as liked FROM vacations
        LEFT JOIN followings ON vacations.vacationId = followings.vacation
        GROUP BY vacations.vacationId
        ORDER BY vacations.start;`,
        userId
    );
    return vacations;
}

async function getVacation(id: number, userId: number = 0): Promise<VacationWithLikes | undefined> {
    const vacations = await dal.execute(
        `SELECT vacations.*, COUNT(followings.vacation) AS likes,
        SUM(CASE WHEN followings.user = ? THEN 1 ELSE 0 END) as liked FROM vacations
        LEFT JOIN followings ON vacations.vacationId = followings.vacation
        WHERE vacationId = ?
        GROUP BY vacations.vacationId`,
        userId,
        id
    );
    return vacations[0];
}

async function addVacation(vacation: Vacation): Promise<VacationWithLikes> {
    vacation.validate();
    const result: OkPacket = await dal.execute("INSERT INTO vacations (vacationId, destination, description, start, end, price, image) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, vacation.image);
    vacation.vacationId = result.insertId;
    return new VacationWithLikes({ ...vacation, likes: 0, liked: 0 });
}

async function updateVacation(vacation: Vacation): Promise<Vacation> {
    vacation.validate();
    const result: OkPacket = await dal.execute("UPDATE vacations SET destination = ?, description = ?, start = ?, end = ?, price = ?, image = ? WHERE vacationId = ?", vacation.destination, vacation.description, vacation.start, vacation.end, vacation.price, vacation.image, vacation.vacationId);
    if (!result.affectedRows) throw new ResourceNotFound(vacation.vacationId);
    return vacation;
}

async function updateLikes(like: boolean, userId: number, vacationId: number): Promise<VacationWithLikes> {
    await dal.execute(like ? "INSERT INTO followings (user, vacation) VALUES (?, ?)" : "DELETE FROM followings WHERE user = ? AND vacation = ?", userId, vacationId);
    return await getVacation(vacationId, userId);
}

async function deleteVacation(id: number): Promise<void> {
    const info = await dal.execute("DELETE FROM vacations WHERE vacationId = ?", id);
    if (!info.affectedRows) throw new ResourceNotFound(id);
}

export default {
    getVacations,
    getVacation,
    addVacation,
    updateVacation,
    deleteVacation,
    updateLikes
}