import { ValidationError } from "./error_status";
import Joi from "joi";

export default class Credentials {
    email: string;
    password: string;

    constructor(credentials: { email: string, password: string }) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    public validate() {
        const result = Credentials.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public static ValidationSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required(),
    });
}