"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_routes = void 0;
const users_1 = require("../models/users");
const tokenValidate_1 = require("../utilities/tokenValidate");
const store = new users_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield store.index();
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined)
            res.status(400).json({ error: "Params do not have id" });
        const result = yield store.show(id);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
    };
    try {
        const newUser = yield store.create(user);
        res.json((0, tokenValidate_1.createTokenFromUser)(newUser));
    }
    catch (err) {
        res.status(400);
        // @ts-ignore
        res.json(err + user);
    }
});
const authenUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.authenticate(req.body.username, req.body.password);
        if (user === null)
            return res.status(401);
        res.json((0, tokenValidate_1.createTokenFromUser)(user));
    }
    catch (err) {
        res.status(400);
        res.json({ err });
    }
});
const users_routes = (app) => {
    app.get("/users", tokenValidate_1.verifyAuthToken, index);
    app.get("/user/:id", tokenValidate_1.verifyAuthToken, show);
    app.post("/user", tokenValidate_1.verifyAuthToken, create);
    app.post("/super-user", create); //this endpoint for testing only
    app.post("/authen", authenUser);
};
exports.users_routes = users_routes;
