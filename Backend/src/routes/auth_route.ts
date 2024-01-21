import auth_service from "../services/auth_service";
import Credentials from "../models/credentials_model.ts";
import express, { NextFunction, Request, Response } from "express"
import User from "../models/user_model";

const router = express.Router();
export default router;

router.post("/api/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = new Credentials(req.body);
        const token = await auth_service.login(credentials);
        res.json(token);
    } catch (error) {
        next(error);
    }
});

router.post("/api/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        delete req.body.role;
        const user = new User(req.body);
        const token = await auth_service.register(user);
        res.json(token);
    } catch (error) {
        next(error);
    }
});
