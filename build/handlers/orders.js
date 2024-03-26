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
exports.orders_routes = void 0;
const orders_1 = require("../models/orders");
const tokenValidate_1 = require("../utilities/tokenValidate");
const store = new orders_1.OrderStore();
const getCurrentOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.userId;
        if (user_id === undefined)
            res.status(400).json({ error: "Params do not have id" });
        const result = yield store.getCurrentOrderByUser(user_id);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const getCompletedOrderByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.userId;
        if (user_id === undefined)
            res.status(400).json({ error: "Params do not have id" });
        const result = yield store.getCompletedOrderByUser(user_id);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
});
const orders_routes = (app) => {
    app.get("/orders/:userId", tokenValidate_1.verifyAuthToken, getCurrentOrderByUser);
    app.get("/completed-orders/:userId", tokenValidate_1.verifyAuthToken, getCompletedOrderByUser);
};
exports.orders_routes = orders_routes;
