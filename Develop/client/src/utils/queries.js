import { gql } from "@apollo/client";

export const GET_ME = gql`
query me {
    me {
        __id
        username
        email
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`;