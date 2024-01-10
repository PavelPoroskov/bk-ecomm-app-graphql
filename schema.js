export const typeDefs = `
  type Query {
    courses(filter: CoursesFilterInput): [Course!]!
    course(id: ID!): Course
    genres: [Genre!]!
    genre(id: ID!): Genre

    welcome: String
    numOfCourses: Int
    price: Float
    isTrainer: Boolean
  }
  type Course {
    id: ID!
    name: String!
    description: String!
    price: Float!
    discount: Boolean!
    genre: Genre
    reviews: [Review!]!
  }
  input CoursesFilterInput {
    discount: Boolean
    avgRating: Int
  }
  type Genre{
    id: ID!
    name: String!
    courses(filter: CoursesFilterInput): [Course!]!
  }
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
`;
