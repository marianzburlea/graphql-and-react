const express = require('express')
const expressGraphQL = require('express-graphql')

const myApp = express()
const port = 4000

myApp.listen(port, () => {
  console.log(`I'm listening on port ${port}.`)
})
