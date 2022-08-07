import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { MessageType } from "../TypeDefs/Messages";
import { Attendance, Users } from "../../Entities/Users";
import { GuestType } from "../TypeDefs/Guest";

const jwt = require('jsonwebtoken')

export const CREATE_USER = {
    type: MessageType,
    args: {
        username: { type: GraphQLString},
        password: { type: GraphQLString},
    },
    async resolve(parent: any, args: any) {
        const { username, password } = args
        const user = await Users.findOne({ where: {username: username }})
        if (user) {
            return {sucessful: false, message: "Username Not Available"}
        } else {
            await Users.insert({ username, password })
            const user = await Users.findOne({ where: {username: username }})
            if (user) {
                const id = user.id;
                const token = jwt.sign({id}, "secretenv8206", {
                    expiresIn: 86400,
                })
                return {successful: true, message: token}
            }
        }
        
    }
}

export const AUTHENTICATE_USER = {
    type: MessageType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const {username, password} = args
        const user = await Users.findOne({ where: {username: username }})

        if (!user) {
            return {successful: false, message: "Username Does Not Exist"}
        }
        const userPassword = user.password
        if (password === userPassword) {
            const id = user.id;
            const token = jwt.sign({id}, "secretenv8206", {
                expiresIn: 86400,
            })
            return {successful: true, message: token}
        } else {
            return {successful: false, message: "Wrong Password"}
        }
    }
}

export const UPDATE_PASSWORD = {
    type: MessageType,
    args: {
        username: { type: GraphQLString },
        oldPassword: { type: GraphQLString },
        newPassword: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const {username, oldPassword, newPassword} = args
        const user = await Users.findOne({ where: {username: username }})

        if (!user) {
            throw new Error("USERNAME DOESNT EXIST")
        }
        const userPassword = user?.password

        if (oldPassword === userPassword) {
            await Users.update({username: username}, {password: newPassword})

            return {successful: true, message: "PASSWORD UPDATED"}
        } else {
            throw new Error("PASSWORD DO NOT MATCH")
        }

    }
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        accessToken: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
        const token = args.accessToken
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        if (payload.id !== 4) {
            await Attendance.delete({ ownerId: payload.id })
            await Users.delete(payload.id)
        }
        return
    }
}

export const CREATE_GUEST = {
    type: GuestType,
    args: {
        name: { type: GraphQLString },
        accept: { type: GraphQLBoolean },
        attending: { type: GraphQLInt },
        ownerId: { type: GraphQLInt },
    },
    async resolve(parent: any, args: any) {
        const { name, accept, attending, ownerId } = args
        await Attendance.insert({ name, accept, attending, ownerId })
        return args
    }
}

export const DELETE_GUEST = {
    type: MessageType,
    args: {
        id: { type: GraphQLID },
    },
    async resolve(parent: any, args: any) {
        const id = args.id
        await Attendance.delete(id)

        return {successful: true, message: "DELETE WORKED"}
    }
}