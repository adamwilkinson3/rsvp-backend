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
const express_graphql_1 = require("express-graphql");
const Schema_1 = require("./Schema");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Users_1 = require("./Entities/Users");
require("dotenv/config");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, typeorm_1.createConnection)({
        type: "mysql",
        database: "heroku_e49a0943d1661ee",
        host: "us-cdbr-east-06.cleardb.net",
        username: process.env.USERNAME_,
        password: process.env.PASSWORD,
        logging: true,
        synchronize: false,
        entities: [Users_1.Users, Users_1.Attendance]
    });
    const corsOptions = {
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200,
    };
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)(corsOptions));
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: Schema_1.schema,
        graphiql: true
    }));
    app.listen(process.env.PORT || 3001, () => {
        console.log("SERVER RUNNING");
    });
});
main().catch((err) => {
    console.log(err);
});
