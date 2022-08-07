import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Users, Attendance } from './Entities/Users'
import 'dotenv/config'

const main = async () => {
    await createConnection({
        type: "mysql",
        database: "heroku_e49a0943d1661ee",
        host: "us-cdbr-east-06.cleardb.net",
        username: process.env.USERNAME_,
        password: process.env.PASSWORD,
        logging: true,
        synchronize: false,
        entities: [Users, Attendance]
    })

    const corsOptions ={
        origin: '*', 
        credentials: true,
        optionSuccessStatus: 200,
     }

    const app = express()

    app.use(cors(corsOptions))

    app.use(express.json())

    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))
    
    app.listen(process.env.PORT || 3001, () => {
        console.log("SERVER RUNNING")
    })

}
main().catch((err) => {
    console.log(err)
})