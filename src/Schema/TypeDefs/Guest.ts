import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql";

export const GuestType = new GraphQLObjectType({
    name: "Guest",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        accept: { type: GraphQLBoolean },
        attending: { type: GraphQLInt },
        ownerId: { type: GraphQLInt },
    }),
})