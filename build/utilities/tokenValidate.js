"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenFromUser = exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader === undefined)
            return res.status(401);
        const token = authorizationHeader.split(' ')[1];
        (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyAuthToken = verifyAuthToken;
const createTokenFromUser = (user) => {
    return (0, jsonwebtoken_1.sign)({ user: user }, process.env.TOKEN_SECRET);
};
exports.createTokenFromUser = createTokenFromUser;
