import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_GUESTS, GET_ALL_USERS } from "./Queries/User";
import { AUTHENTICATE_USER, CREATE_GUEST, CREATE_USER, DELETE_GUEST, DELETE_USER } from "./Mutations/User";


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
        getAllGuests: GET_ALL_GUESTS
    },
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        deleteUser: DELETE_USER,
        createGuest: CREATE_GUEST,
        authenticateUser: AUTHENTICATE_USER,
        deleteGuest: DELETE_GUEST,
    }
})


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})