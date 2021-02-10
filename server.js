const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const app = express();

// use the buildSchema to create schemas for each query
// Inside Query we have the name of the query/mutation endpoint (hello) and the type of return expected
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// Create a resolver function (method) for each Query/Mutation type
const root = {
    hello: () => {
        return 'Hello World';
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