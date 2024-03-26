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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("./handlers/users");
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = require("./handlers/products");
const cors_1 = __importDefault(require("cors"));
const orders_1 = require("./handlers/orders");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.send("Welcome to Storefront API");
}));
(0, users_1.users_routes)(app);
(0, products_1.products_routes)(app);
(0, orders_1.orders_routes)(app);
app.listen(3000, () => {
    console.log("starting app on http://localhost:3000");
});
exports.default = app;
