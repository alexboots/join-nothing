import gql from 'graphql-tag'

export default gql`
query GetUser {
  user {
    id
    email
  }
}
`