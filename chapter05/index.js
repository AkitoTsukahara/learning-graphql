const express = require(`express`)
const { ApolloServer } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default
const { isValidNameError } = require('graphql')
const { readFileSync } = require('fs')
const resolvers = require('./resolvers')

var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

async function start() {
    let app = express()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
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