import Vacation from "./VacationsModel";

export default class VacationWithLikes extends Vacation {
    likes: number;
    liked: boolean;

    constructor(vacationWithLikes: { likes: number, liked: boolean, vacationId: number, destination: string, description: string, start: string, end: string, price: number, image: string }) {
        super(vacationWithLikes);
        this.likes = vacationWithLikes.likes;
        this.liked = vacationWithLikes.liked;
    }
}