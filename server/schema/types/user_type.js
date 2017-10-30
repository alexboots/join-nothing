const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString } 
  })
});

module.exports = UserType
