import express, { NextFunction, Request, Response } from "express";
import { createObjectCsvWriter } from "csv-writer";
import vacations_service from "../services/vacations_service";
import fs from "fs";
import verifyAdmin from "../middleware/verify_admin";

const router = express.Router();
export default router;

router.get("/report.csv", verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const path = "report.csv";
        const csvWriter = createObjectCsvWriter({
            path,
            header: [
                { id: "destination", title: "Destination" },
                { id: "followers", title: "Followers" },
            ]
        });
        const vacations = await vacations_service.getVacations();
        const records = vacations.map(v => ({ destination: v.destination, followers: v.likes }));
        await csvWriter.writeRecords(records);
        res.download(path);
    } catch (error) {
        next(error);
    }
});