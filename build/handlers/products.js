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
exports.products_routes = void 0;
const products_1 = require("../models/products");
const tokenValidate_1 = require("../utilities/tokenValidate");
const store = new products_1.ProductStore();
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
    const product = {
        name: req.body.name,
        price: req.body.price,
    };
    try {
        const newProduct = yield store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        // @ts-ignore
        res.status(400).json(err + product);
    }
});
const products_routes = (app) => {
    app.get("/products", index);
    app.get("/product/:id", show);
    app.post("/product", tokenValidate_1.verifyAuthToken, create);
};
exports.products_routes = products_routes;
