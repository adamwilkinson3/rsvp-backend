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
exports.DELETE_GUEST = exports.CREATE_GUEST = exports.DELETE_USER = exports.UPDATE_PASSWORD = exports.AUTHENTICATE_USER = exports.CREATE_USER = void 0;
const graphql_1 = require("graphql");
const Messages_1 = require("../TypeDefs/Messages");
const Users_1 = require("../../Entities/Users");
const Guest_1 = require("../TypeDefs/Guest");
const jwt = require('jsonwebtoken');
exports.CREATE_USER = {
    type: Messages_1.MessageType,
    args: {
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = args;
            const user = yield Users_1.Users.findOne({ where: { username: username } });
            if (user) {
                return { sucessful: false, message: "Username Not Available" };
            }
            else {
                yield Users_1.Users.insert({ username, password });
                const user = yield Users_1.Users.findOne({ where: { username: username } });
                if (user) {
                    const id = user.id;
                    const token = jwt.sign({ id }, "secretenv8206", {
                        expiresIn: 86400,
                    });
                    return { successful: true, message: token };
                }
            }
        });
    }
};
exports.AUTHENTICATE_USER = {
    type: Messages_1.MessageType,
    args: {
        username: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = args;
            const user = yield Users_1.Users.findOne({ where: { username: username } });
            if (!user) {
                return { successful: false, message: "Username Does Not Exist" };
            }
            const userPassword = user.password;
            if (password === userPassword) {
                const id = user.id;
                const token = jwt.sign({ id }, "secretenv8206", {
                    expiresIn: 86400,
                });
                return { successful: true, message: token };
            }
            else {
                return { successful: false, message: "Wrong Password" };
            }
        });
    }
};
exports.UPDATE_PASSWORD = {
    type: Messages_1.MessageType,
    args: {
        username: { type: graphql_1.GraphQLString },
        oldPassword: { type: graphql_1.GraphQLString },
        newPassword: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, oldPassword, newPassword } = args;
            const user = yield Users_1.Users.findOne({ where: { username: username } });
            if (!user) {
                throw new Error("USERNAME DOESNT EXIST");
            }
            const userPassword = user === null || user === void 0 ? void 0 : user.password;
            if (oldPassword === userPassword) {
                yield Users_1.Users.update({ username: username }, { password: newPassword });
                return { successful: true, message: "PASSWORD UPDATED" };
            }
            else {
                throw new Error("PASSWORD DO NOT MATCH");
            }
        });
    }
};
exports.DELETE_USER = {
    type: Messages_1.MessageType,
    args: {
        accessToken: { type: graphql_1.GraphQLString },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = args.accessToken;
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            if (payload.id !== 1) {
                yield Users_1.Attendance.delete({ ownerId: payload.id });
                yield Users_1.Users.delete(payload.id);
            }
            return;
        });
    }
};
exports.CREATE_GUEST = {
    type: Guest_1.GuestType,
    args: {
        name: { type: graphql_1.GraphQLString },
        accept: { type: graphql_1.GraphQLBoolean },
        attending: { type: graphql_1.GraphQLInt },
        ownerId: { type: graphql_1.GraphQLInt },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, accept, attending, ownerId } = args;
            yield Users_1.Attendance.insert({ name, accept, attending, ownerId });
            return args;
        });
    }
};
exports.DELETE_GUEST = {
    type: Messages_1.MessageType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = args.id;
            yield Users_1.Attendance.delete(id);
            return { successful: true, message: "DELETE WORKED" };
        });
    }
};
