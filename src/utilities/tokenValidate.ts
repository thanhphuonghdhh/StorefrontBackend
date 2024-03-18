import { NextFunction, Request, Response } from "express"
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/users";

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader === undefined) return res.status(401);
        const token = authorizationHeader.split(' ')[1]
        verify(token, process.env.TOKEN_SECRET!)

        next()
    } catch (error) {
        res.status(401)
    }
}

export const createTokenFromUser = (user: User) => {
    return sign({ user: user }, process.env.TOKEN_SECRET!);
}