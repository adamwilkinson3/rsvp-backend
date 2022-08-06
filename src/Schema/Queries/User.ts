import { GraphQLList, GraphQLString } from "graphql"
import { UserType } from "../TypeDefs/User"
import { Attendance, Users } from "../../Entities/Users"
import { GuestType } from "../TypeDefs/Guest"
import { validateToken } from "../middlewares/AuthMiddleware"

export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find()
    }
}

export const GET_ALL_GUESTS = {
    type: new GraphQLList(GuestType),
    args: {
        accessToken: { type: GraphQLString }
    },
    resolve(parent: any, args: any) {
        const token = args.accessToken
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if(validateToken(token)) {
            return Attendance.find({
                where: {
                    ownerId: payload.id
                }
            })
        } else {
            return Error('Access Token Expired')
        }
    }
}