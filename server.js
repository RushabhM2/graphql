const { graphql, buildSchema } = require('graphql');

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

graphql(schema, '{hello}', root).then((response)=>{
    console.log(response)
})