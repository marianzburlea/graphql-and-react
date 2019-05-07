const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
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
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    street: {
      type: GraphQLString,
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: ({ id }, args) => axios
        .get(`http://localhost:3000/addresses/${id}/users`)
        .then(({data}) => data)
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
      type: GraphQLString
    },
    address: {
      type: AddressType,
      resolve({addressId}) {
        return axios
          .get(`http://localhost:3000/addresses/${addressId}`)
          .then(({data}) => data)
      }
    }
  })
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
      resolve(parentValue, { id }) {
        return axios
          .get(`http://localhost:3000/users/${id}`)
          .then(({data}) =>  data)
      }
    },
    address: {
      type: AddressType,
      args: {
        id: {
          type: GraphQLString,
        }
      },
      resolve: (parentValue, { id }) => {
        return axios
          .get(`http://localhost:3000/addresses/${id}`)
          .then(({data}) => data)
      }
    }
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    appendPerson: {
      type: UserType,
      args: {
        firstName: {
          type: new GraphQLNonNull(GraphQLString)
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        addressId: {
          type: GraphQLString
        }
      },
      resolve: (parentValue, { firstName, age }) => axios
        .post(`http://localhost:3000/users`, {
          firstName,
          age
        })
        .then(({data}) => data),
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
