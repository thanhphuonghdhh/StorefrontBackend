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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    constructor() {
        this.getCurrentOrderByUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "select users.id as user_id, username, orders.id as order_id, status from orders inner join users on orders.user_id = ($1)";
                const res = yield conn.query(sql, [userId]);
                conn.release();
                return res.rows;
            }
            catch (err) {
                throw new Error(`Cannot get order ${err}`);
            }
        });
        this.getCompletedOrderByUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = "select users.id as user_id, username, orders.id as order_id, status " +
                    "from orders inner join users on orders.user_id = ($1) and orders.status = 'complete'";
                const res = yield conn.query(sql, [userId]);
                conn.release();
                return res.rows;
            }
            catch (err) {
                throw new Error(`Cannot get order ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
