const { ApolloServer } = require('apollo-server')
const { isValidNameError } = require('graphql')

const typeDefs = `
    enum PhotoCategory {
        SELEIF
        PORTRAIT
        ACTION
        LANDSCAPE
        GRAPHIC
    }

    type Photo {
        id: ID!
        url: String!
        name: String!
        description: String
        category: PhotoCategory!
        postedBy: User!
    }

    type User {
        githubLogin: ID!
        name: String
        avator: String
        postedPhotos: [Photo!]!
    }

    input PostPhotoInput {
        name: String!
        category: PhotoCategory=PORTRAIT
        description: String
    }

    type Query {
        totalPhotos: Int!
        allPhotos: [Photo!]!
    }

    type Mutation {
        postPhoto(input: PostPhotoInput!): Photo!
    }

    mutation newPhoto($input: PostPhotoInput!) {
        postPhoto(input: $input) {
            id
            name
            url
            description
            category
        }
    }

    query listPhotos {
        allPhotos {
            id
            name
            description
        }
    }
`

let _id = 0
let users = [
    { "githubLogin": "mHattrup", "name": "Mike Harttrup" },
    { "githubLogin": "gPlake", "name": "Glen Plake" },
    { "githubLogin": "sSchmidt", "name": "Scot Schmidt" }
]
let photos = [
    {
        "id": "1",
        "name": "Dropping the Heart Chute",
        "description": "The heart chute is one of my favorite chutes",
        "category": "ACTION",
        "githubUser": "gPlake"
    },
    {
        "id": "2",
        "name": "Enjoying the sunshine",
        "category": "SELFIF",
        "githubUser": "sSchmidt"
    },
    {
        "id": "3",
        "name": "Gunbarrel 25",
        "description": "25 laps on gunbarrel today",
        "category": "LANDSCAPE",
        "githubUser": "sSchmidt"
    }
]



const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {

            let newPhoto = {
                id: _id++,
                ...args.input
            }
            photos.push(newPhoto)
            return newPhoto
        }
    },

    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: parent => {
            return users.find(u => u.githubLogin === parent.githubUser)
        }
    },

    User: {
        postedPhotos: parent => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen()
    .then(({url}) => console.log(`GraphQL Service running on ${url}`))