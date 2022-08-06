import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Users, Attendance } from './Entities/Users'

const main = async () => {
    await createConnection({
        type: "mysql",
        database: "rsvp",
        username: "root",
        password: "12qwas!@QWAS",
        logging: true,
        synchronize: false,
        entities: [Users, Attendance]
    })

    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    
    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001")
    })

}

main().catch((err) => {
    console.log(err)
})