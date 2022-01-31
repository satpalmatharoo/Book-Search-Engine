const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String
        bookId: String!
        image: String
        link: String
        title: String!
  
    }
    type User {
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }
    type Login { 
        user: User
        token: ID!
        
    }
    input BookContent {
        authors: [String]
        description: String
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
        saveBook(book: BookContent!) : User
        deleteBook(bookId:String) : User
        signUp(username: String!, password:String!, email: String!):Login
    }
`;
module.exports = typeDefs;
