const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const app = express();

// use the buildSchema to create schemas for each query
// Inside Query we have the name of the query/mutation endpoint (hello) and the type of return expected
const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

// There is a resolver for each query schema above
const root = {
    quoteOfTheDay: ()=>{
        return Math.random() < 0.5 ? 'Hello world' : 'other quote'
    },
    random: ()=>{
        return Math.random();
    },
    rollThreeDice: ()=>{
        return [1,2,3].map(_ => 1+Math.floor(Math.random()*6)) // This function returns an array of three numbers between 1 and 6 - representing the score on each die
    }
}

app.use('/graphql', graphqlHTTP({
    schema: schema, // Schema defined above
    rootValue: root, // Root resolver defined above
    graphiql: true // Allowing access in the graphql playground
}))

app.listen(4001, ()=>{
    console.log('Server listening on http://localhost:4001')
})
console.log('Running a GraphQL API server at http://localhost:4001/graphql');