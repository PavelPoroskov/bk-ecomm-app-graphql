export const typeDefs = `
  type Query {
    courses(filter: CoursesFilter): [Course!]!
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
  input CoursesFilter {
    discount: Boolean
    avgRating: Int
  }
  type Genre{
    id: ID!
    name: String!
    courses(filter: CoursesFilter): [Course!]!
  }
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }
  type Mutation {
    addGenre(input: AddGenreInput!): Genre!
    deleteGenre(id: ID!): Boolean!

    addCourse(input: AddCourseInput!): Course!
    deleteCourse(id: ID!): Boolean!

    addReview(input: AddReviewInput!): Review!
    deleteReview(id: ID!): Boolean!
  }
  input AddGenreInput {
    name: String!
  }
  input AddCourseInput{
    name: String!
    description: String!
    price: Float!
    discount: Boolean!
    genreId: ID!
  }
  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    courseId: ID!
  }
`;
