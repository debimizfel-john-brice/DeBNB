import Vacation from "./vacations_model";

export default class VacationWithLikes extends Vacation {
    likes: number;
    liked: boolean;

    constructor(vacationWithLikes: { likes: number, liked: 0 | 1, vacationId: number, destination: string, description: string, start: Date, end: Date, price: number, image: string }) {
        super(vacationWithLikes);
        this.likes = vacationWithLikes.likes;
        this.liked = vacationWithLikes.liked === 1 ? true : false;
    }
}