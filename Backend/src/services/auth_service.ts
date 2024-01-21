import { OkPacket } from "mysql";
import { UnauthorizedError } from "../models/error_status";
import Credentials from "../models/credentials_model.ts";
import dal from "../dal";
import token from "../token";
import User from "../models/user_model";

async function login(credentials: Credentials): Promise<string> {
    credentials.validate();
    const users = await dal.execute("SELECT * FROM users WHERE email = ?", credentials.email);
    if (!users) {
        throw new UnauthorizedError("Username does not exist");
    }
    const user = new User(users[0]);
    if (user.password !== token.hashPassword(credentials.password)) {
        throw new UnauthorizedError("Password is incorrect");
    }
    delete user.password;
    return token.createToken({ user });
}

async function register(user: User): Promise<string> {
    user.validate();
    const users = await dal.execute("SELECT * FROM users WHERE email = ?", user.email);
    if (users.length > 0) {
        throw new UnauthorizedError("Email already exists");
    }
    user.password = token.hashPassword(user.password);
    const result: OkPacket = await dal.execute("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)", user.firstName, user.lastName, user.email, user.password);
    user.userId = result.insertId;
    return token.createToken({ user });
}

export default {
    login,
    register
}