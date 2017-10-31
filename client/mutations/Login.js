import gql from 'graphql-tag'

export default gql`
mutation {
  login(email: "test@email.com", password: "pass") {
    email
  }
}
`
