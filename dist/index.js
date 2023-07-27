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
const db_1 = __importDefault(require("./db"));
const TABLE_NAME_USER = 'users';
// Ví dụ: Tạo một bảng và chèn dữ liệu
function createTableAndInsertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.default.schema.createTable(TABLE_NAME_USER, table => {
                table.increments('id');
                table.string('name');
                table.string('email');
            });
            yield (0, db_1.default)(TABLE_NAME_USER).insert({ name: 'John Doe', email: 'john@example.com' });
            console.log('Table created and data inserted successfully.');
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            db_1.default.destroy(); // Đóng kết nối với cơ sở dữ liệu
        }
    });
}
// Hàm lấy ra tất cả dữ liệu trong bảng
function getAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allData = yield db_1.default.select("*").from(TABLE_NAME_USER);
            console.log('All data:', allData);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            db_1.default.destroy(); // Đóng kết nối với cơ sở dữ liệu
        }
    });
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // await createTableAndInsertData();
    getAllData();
});
main();
