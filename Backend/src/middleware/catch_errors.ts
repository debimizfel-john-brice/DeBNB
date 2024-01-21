import { Request, Response, NextFunction } from "express";

export function catchErrors(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    res.status(status).send(message);
}