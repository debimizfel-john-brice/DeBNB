import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../models/error_status";
import token from "../token";
import User from "../models/user_model";

function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = new User(token.verifyRequestToken(req).user);
        if (user.role !== "admin") { throw new UnauthorizedError("Not an admin"); }
        next()
    } catch (error) {
        next(error)
    }
}

export default verifyAdmin;