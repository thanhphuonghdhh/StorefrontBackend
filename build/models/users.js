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
exports.UserStore = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
class UserStore {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "select * from users";
                const res = yield conn.query(sql);
                conn.release();
                return res.rows;
            }
            catch (err) {
                throw new Error(`Can not get users ${err}`);
            }
        });
        this.show = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "select * from users where id=($1)";
                const res = yield conn.query(sql, [id]);
                conn.release();
                return res.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get users ${err}`);
            }
        });
        this.create = (u) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (username, password, firstname, lastname) VALUES($1, $2, $3, $4) RETURNING *";
                const hash = bcrypt_1.default.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const result = yield conn.query(sql, [
                    u.username,
                    hash,
                    u.firstname,
                    u.lastname,
                ]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`unable create user (${u.username}): ${err}`);
            }
        });
        this.authenticate = (username, password) => __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = "SELECT username, password FROM users WHERE username=($1)";
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.UserStore = UserStore;
