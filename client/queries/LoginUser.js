import gql from 'graphql-tag'

export default gql`
mutation {
  loginUser(email: "test@email.com", password: "pass") {
    email
  }
}
`
