const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql')
const axios = require('axios')

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

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: {
    id: {
      type: GraphQLString,
    },
    street: {
      type: GraphQLString,
    }
  }
})

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
    addressId: {
      type: AddressType
    }
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
      // resolve(parentValue, args) {
      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/users/${id}`)
          .then(({data}) => {
            console.log(data)
            return data
          })
        // return userList.find(user => user.id == args.id)
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
