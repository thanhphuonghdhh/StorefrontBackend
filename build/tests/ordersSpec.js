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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const users_1 = require("../models/users");
const tokenValidate_1 = require("../utilities/tokenValidate");
const orders_1 = require("../models/orders");
const req = (0, supertest_1.default)(server_1.default);
const userStore = new users_1.UserStore();
const orderStore = new orders_1.OrderStore();
let token;
const superUser = {
    username: "admin",
    password: "admin",
    firstname: "my",
    lastname: "admin",
};
const createSuperUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userStore.create(superUser);
    token = (0, tokenValidate_1.createTokenFromUser)(res);
});
//Test endpoint
describe("Test Orders endpoint response", () => {
    beforeAll(createSuperUser);
    it("should check response of getCurrentOrderByUser endpoint OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get("/orders/1").set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
    it("should check response of getCurrentOrderByUser endpoint OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req.get("/completed-orders/1").set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
});
//Test DB action
describe("Test Orders database action", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should check getCurrentOrderByUser action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield orderStore.getCurrentOrderByUser("1");
        expect(res).toBeDefined();
    }));
    it("should check getCompletedOrderByUser action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield orderStore.getCompletedOrderByUser("1");
        expect(res).toBeDefined();
    }));
}));
