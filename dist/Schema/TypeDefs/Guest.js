"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuestType = void 0;
const graphql_1 = require("graphql");
exports.GuestType = new graphql_1.GraphQLObjectType({
    name: "Guest",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        accept: { type: graphql_1.GraphQLBoolean },
        attending: { type: graphql_1.GraphQLInt },
        ownerId: { type: graphql_1.GraphQLInt },
    }),
});
