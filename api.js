const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')

const myApp = express()
const port = 4000

myApp.use('/graphql', expressGraphQL({
  graphiql: true,
  schema
}))

myApp.listen(port, () => {
  console.log(`I'm listening on port ${port}.`)
})
