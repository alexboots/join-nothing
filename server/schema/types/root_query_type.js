const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./user_type')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: { 
      type: UserType,
      resolve: (parentValue, args, req) => {
        const { user } = req // will be undefined if user is unathenticated
        console.log('user', user);
        return user
      }
    }
  })
});

module.exports = RootQuery;

