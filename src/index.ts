import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { schema } from './Schema'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Users, Attendance } from './Entities/Users'

const main = async () => {
    await createConnection({
        type: "mysql",
        database: "heroku_e49a0943d1661ee",
        host: "us-cdbr-east-06.cleardb.net",
        username: "b764a6f2e46cde",
        password: "34943882",
        logging: true,
        synchronize: false,
        entities: [Users, Attendance]
    })


    const app = express()
    app.use(cors({
        origin: "*"
    }))
    app.use(express.json())
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true
    }))

    app.use((req, res, next) => {
        res.append('Access-Control-Allow-Origin', ['*']);
        res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.append('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    
    app.listen(process.env.PORT || 3001, () => {
        console.log("SERVER RUNNING")
    })

}

main().catch((err) => {
    console.log(err)
})