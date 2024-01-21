import { Request } from 'express';
import { UnauthorizedError } from './models/error_status';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const SECRET = "1234567890";

function createToken(payload: object, expiresIn: string = "10d"): string {
    return jwt.sign(payload, SECRET, { expiresIn: expiresIn });
}

function verifyRequestToken(request: Request): any {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) throw new UnauthorizedError("Missing token");
    return jwt.verify(token, SECRET);
}

function hashPassword(password: string): string {
    const salt = "Ipsum aute qui ipsum cillum.";
    // ^ To discuss: I should probably use a random salt for each user and iclude it to the db
    const hash = crypto.createHmac("sha512", salt).update(password).digest("hex");
    return hash;
}

export default {
    createToken,
    verifyRequestToken,
    hashPassword
}