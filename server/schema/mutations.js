const graphql = require('graphql')

const UserType = require('./types/user_type')
const AuthService = require('../services/auth')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} = graphql;

const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) { 
        //                       ^
        // request can also be called 'context' in docs
        // represents request object coming from express
        //  Has details about the incoming request (url request etc)


        const { username, password } = args
        // GraphQL doesn't need to know much about how buisness logic works,
        //  we use it as a nice abstraction from the buisness logic of our app
        return AuthService.signup({ username, password, req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) { 
        // http://www.passportjs.org/docs/logout
        const { user } = req   // Have to save reference to it so we can return it
        req.logout()            //  as it gets cleared here
        return user
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) { 
        const { username, password } = args

        return AuthService.login({ username, password, req })
      }
    },
  }
})

module.exports = mutations