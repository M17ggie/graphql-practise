import { gql } from "apollo-server";

const typeDefs = gql`

    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        nationality: Nationality!
        friends: [User]
        favMovies: [Movie]
    }

    type Movie{
        id: ID!
        name: String!
        year: Int!
        isInTheatre: Boolean!
    }

    type Query {
        users: UsersResult
        user(id: Int!): User
        movies: [Movie!]!
        movie(name: String!): Movie
    }

    input CreateUserInput{
        first_name: String!
        last_name: String!
        email: String!
        nationality: Nationality = France
    }

    type Mutation {
        createUser(input: CreateUserInput!): User
        deleteUser(id: Int!): User
    }

    enum Nationality {
        France
        Germany
        Netherlands
        Italy
    }

    type UsersSuccessResult {
        users: [User!]!
    }

    type UsersErrorResult {
        message: String!
    }

    union UsersResult = UsersSuccessResult | UsersErrorResult
`

export default typeDefs