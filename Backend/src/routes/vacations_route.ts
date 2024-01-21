import { AuthenticatedRequest } from "../middleware/verify_logged_in";
import express, { NextFunction, Request, Response } from "express";
import Vacation from "../models/vacations_model";
import vacations_service from "../services/vacations_service";
import verifyAdmin from "../middleware/verify_admin";
import { ResourceNotFound } from "../models/error_status";
import { saveImage } from "../services/image_service";
import path from "path";

const router = express.Router();
export default router;

router.get("/api/vacations", async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const vacations = await vacations_service.getVacations(req.user.userId);
        res.json(vacations);
    } catch (error) {
        next(error);
    }
});

router.get("/api/vacations/:id([0-9]+)", async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const vacation = await vacations_service.getVacation(id, req.user.userId);
        if (!vacation) throw new ResourceNotFound(id);
        res.json(vacation);
    } catch (error) {
        next(error);
    }
});

router.post("/api/vacations", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body.image = path.basename(
            await saveImage(req.files?.image instanceof Array ? req.files?.image[0] : req.files?.image)
        );
        const vacation = new Vacation(req.body);
        const result = await vacations_service.addVacation(vacation);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.put("/api/vacations/:id([0-9]+)", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.files?.image) {
            req.body.image = path.basename(
                await saveImage(req.files?.image instanceof Array ? req.files?.image[0] : req.files?.image)
            );
        } else {
            req.body.image = (await vacations_service.getVacation(parseInt(req.params.id))).image;
        }

        const vacation = new Vacation(req.body);
        vacation.vacationId = parseInt(req.params.id);

        const result = await vacations_service.updateVacation(vacation);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.delete("/api/vacations/:id([0-9]+)", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await vacations_service.deleteVacation(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

router.put("/api/likes/:vacationId([0-9]+)", async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const vacation = await vacations_service.updateLikes(req.body.liked, req.user.userId, parseInt(req.params.vacationId));
        res.json(vacation);
    } catch (error) {
        next(error);
    }
});