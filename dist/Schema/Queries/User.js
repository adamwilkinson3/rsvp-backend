"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_ALL_GUESTS = exports.GET_ALL_USERS = void 0;
const graphql_1 = require("graphql");
const User_1 = require("../TypeDefs/User");
const Users_1 = require("../../Entities/Users");
const Guest_1 = require("../TypeDefs/Guest");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
exports.GET_ALL_USERS = {
    type: new graphql_1.GraphQLList(User_1.UserType),
    resolve() {
        return Users_1.Users.find();
    }
};
exports.GET_ALL_GUESTS = {
    type: new graphql_1.GraphQLList(Guest_1.GuestType),
    args: {
        accessToken: { type: graphql_1.GraphQLString }
    },
    resolve(parent, args) {
        const token = args.accessToken;
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if ((0, AuthMiddleware_1.validateToken)(token)) {
            return Users_1.Attendance.find({
                where: {
                    ownerId: payload.id
                }
            });
        }
        else {
            return Error('Access Token Expired');
        }
    }
};
