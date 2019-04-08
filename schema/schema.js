const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')

const userList = [
  {
    id: '25',
    firstName: 'Marian',
    age: 37
  },
  {
    id: '03',
    firstName: 'Gratiela',
    age: 31
  }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt
    },
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        return userList.find(user => user.id == args.id)
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
