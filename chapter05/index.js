const express = require(`express`)
const { ApolloServer } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')
const resolvers = require('./resolvers')
require('dotenv').config()

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')
async function start() {
    let app = express()
    const MONGO_DB = process.env.DB_HOST
    let db

    try {
        const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true })
        db = client.db()
    } catch (error) {
    console.log(`
    
        Mongo DB Host not found!
        please add DB_HOST environment variable to .env file

        exiting...aa
        
    `)
    process.exit(1)
    }

    //const context = { db }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const githubToken = req.headers.authorization
            const currentUser = await db.collection('users').findOne({ githubToken })
            return { db, currentUser }
          }
    })

    await server.start()

    server.applyMiddleware({app})

    app.get(`/`, (req, res) => res.end(`Welcome to the PhotoShare API`))
    app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

    app.listen({ port: 4000}, () => 
        console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
    )
}

start()