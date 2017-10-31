const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = require('./user_type')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: { 
      type: UserType,
      resolve: (parentValue, args, req) => {
        console.log('RootQueryType => user');

        const { user, session } = req // will be undefined if user is unathenticated
        console.log('user', user);
        console.log('session', session);
        console.log("\n\n\n");
        return user
      }
    }
  })
});

module.exports = RootQuery;

