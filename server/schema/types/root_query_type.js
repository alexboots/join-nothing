const graphql = require('graphql');
const { GraphQLObjectType } = graphql;

const UserType = require('./user_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: { 
      type: UserType,
      resolve: (parentValue, args, req) => {
        const { user, session } = req // will be undefined if user is unathenticated

        console.log('session', session);
        console.log('user', user);
        console.log('\n\n');

        return user
      }
    }
  })
});

module.exports = RootQueryType;

