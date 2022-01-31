const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id:ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Book {
        authors: [String]
        description: String
        bookId: ID!
        image: String
        link: String
        title: String!
  
    }
  
    type Login { 
        user: User
        token: ID!
        
    }
    input BookContent {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
    
    type Query {
        me: User
    }

    
    type Mutation {
        login(email: String!, password: String!) : Login
        saveBook(bookData: BookContent!) : User
        removeBook(bookId:ID!) : User
        addUser(username: String!, email: String!, password:String!):Login
    }
`;
module.exports = typeDefs;
