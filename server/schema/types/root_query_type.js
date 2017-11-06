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

        return user
      }
    }
  })
});

module.exports = RootQueryType;

