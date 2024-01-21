import { ValidationError } from "./error_status";
import Joi from "joi";

export interface PublicUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "user" | "admin";
}


export default class User implements PublicUser {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "user" | "admin" = "user";

    constructor(user: { userId: number, firstName: string, lastName: string, email: string, password: string, role?: "user" | "admin" }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        if (user.role) {
            this.role = user.role;
        }
    }

    public validate() {
        const result = User.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public static ValidationSchema = Joi.object({
        userId: Joi.number().integer().positive().optional(),
        firstName: Joi.string().min(2).max(20).required(),
        lastName: Joi.string().min(2).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required(),
        role: Joi.string().valid("user", "admin").optional()
    });
}