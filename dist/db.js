"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = (0, knex_1.default)({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'hung@6789',
        database: 'koolsoftdb' // Thay đổi thành tên cơ sở dữ liệu của bạn
    }
});
exports.default = db;