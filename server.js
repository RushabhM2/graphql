const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphql, buildSchema, isOutputType } = require('graphql');
const app = express();

// use the buildSchema to create schemas for each query
// Inside Query we have the name of the query/mutation endpoint (hello) and the type of return expected
// rollDice is a query that takes in 2 parameters, one is mandatory
const schema = buildSchema(`
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }

    type Query {
        getDie(numSides: Int!): RandomDie
    }
`);

/* 
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        rollDice(numDice: Int!, numSides: Int): [Int]
*/

class RandomDie {
    constructor(numSides) {
        this.numSides = numSides
    }

    rollOnce() {
        return 1+Math.floor(Math.random() * this.numSides)
    }

    roll({numRolls}) {
        let output = [];
        for (let i=0; i<numRolls; i++) {
            output.push(this.rollOnce())
        }
        return output;
    }
}

// There is a resolver for each query schema above
const root = {
    /*quoteOfTheDay: ()=>{
        return Math.random() < 0.5 ? 'Hello world' : 'other quote'
    },
    random: ()=>{
        return Math.random();
    },
    rollThreeDice: ()=>{
        return [1,2,3].map(_ => 1+Math.floor(Math.random()*6)) // This function returns an array of three numbers between 1 and 6 - representing the score on each die
    },
    rollDice: (args)=>{
        // This function returns an array the length of numDice (a number for each die rolled)
        // Each die value will default to 6, unless numSides is specified

        // This function can be written with parameters,
        // We can also destructure the arguments to {numDice, numSides}
        let output = [];
        for (let i=0; i<args.numDice; i++) {
            output.push(1+Math.floor(Math.random()*(args.numSides || 6))) 
        }
        return output;
    },*/
    getDie: ({numSides}) => {
        return new RandomDie(numSides || 6)
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