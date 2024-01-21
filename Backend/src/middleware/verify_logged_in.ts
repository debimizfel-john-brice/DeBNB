import { NextFunction, Request, Response } from "express";
import { PublicUser } from "../models/user_model";
import token from "../token";

export interface AuthenticatedRequest extends Request {
    user: PublicUser;
}

function verifyLoggedIn(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        req.user = token.verifyRequestToken(req).user;
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyLoggedIn;