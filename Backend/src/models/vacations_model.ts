import { ValidationError } from "./error_status";
import Joi from "joi";

export default class Vacation {
    vacationId: number;
    destination: string;
    description: string;
    start: Date;
    end: Date;
    price: number;
    image: string;

    constructor(vacation: { vacationId: number, destination: string, description: string, start: Date, end: Date, price: number, image: string }) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.start = vacation.start;
        this.end = vacation.end;
        this.price = vacation.price;
        this.image = vacation.image;
    }

    public validate() {
        const result = Vacation.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public static ValidationSchema = Joi.object({
        vacationId: Joi.number().integer().positive().optional(),
        destination: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(500).required(),
        start: Joi.date().iso().min(Date()).required(),
        end: Joi.date().greater(Joi.ref("start")).required(),
        price: Joi.number().integer().min(1000).max(10000).positive().required(),
        image: Joi.string().required()
    });
}