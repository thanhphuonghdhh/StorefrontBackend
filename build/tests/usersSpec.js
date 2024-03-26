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
const req = (0, supertest_1.default)(server_1.default);
const userStore = new users_1.UserStore();
let token;
const superUser = {
    username: "admin",
    password: "admin",
    firstname: "my",
    lastname: "admin",
};
const user = {
    username: "phuvu",
    password: "2",
    firstname: "phu",
    lastname: "vu",
};
const createSuperUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield userStore.create(superUser);
    token = (0, tokenValidate_1.createTokenFromUser)(res);
});
//Test endpoint
describe("Test Users endpoint response", () => {
    beforeAll(createSuperUser);
    it("should check response of index endpoint OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req
            .get("/users")
            .set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
    it("should check response of show endpoint OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req
            .get("/user/1")
            .set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
    it("should check response of create endpoint OK", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req
            .post("/user")
            .send(user)
            .set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
    it("should check response of authen endpoint fail", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield req
            .post("/authen")
            .send(user)
            .set("authorization", "Bearer " + token);
        expect(response.status).toBe(200);
    }));
});
//Test DB action
describe("Test Users database action", () => __awaiter(void 0, void 0, void 0, function* () {
    it("should check index action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userStore.index();
        expect(res).toBeDefined();
    }));
    it("should check show action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userStore.show("1");
        expect(res).toBeDefined();
    }));
    it("should check create action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userStore.create(user);
        expect(res).toBeDefined();
    }));
    it("should check authen action run", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield userStore.authenticate("admin", "admin");
        expect(res).toBeDefined();
    }));
}));
