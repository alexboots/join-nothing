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
    signupUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) { 
        //                       ^
        // request can also be called 'context' in docs
        // represents request object coming from express
        //  Has details about the incoming request (url request etc)


        const { email, password } = args
        // GraphQL doesn't need to know much about how buisness logic works,
        //  we use it as a nice abstraction from the buisness logic of our app
        return AuthService.signup({ email, password, req })
      }
    },
    logoutUser: {
      type: UserType,
      resolve(parentValue, args, req) { 
        // http://www.passportjs.org/docs/logout
        const { user } = req   // Have to save reference to it so we can return it
        req.logout()            //  as it gets cleared here
        return user
      }
    },
    loginUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) { 
        const { email, password } = args

        return AuthService.login({ email, password, req })
      }
    },
  }
})

module.exports = mutations