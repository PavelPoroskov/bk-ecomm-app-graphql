const courses = [
  {
    id: "book-06",
    name: "TypeScript Basics",
    description: "TypeScript Basics for beginners",
    price: 299.99,
    discount: false,
    genreId: "gen-01",
  },
  {
    id: "book-07",
    name: "GraphQL Basics",
    description: "GraphQL Basics for beginners",
    price: 299.99,
    discount: false,
    genreId: "gen-01",
  },
  {
    id: "book-08",
    name: "NextJS Basics",
    description: "NextJS Basics for beginners",
    price: 299.99,
    discount: false,
    genreId: "gen-01",
  },
  {
    id: "book-21",
    name: "Hyperion",
    description: "Hyperion Cantos -1",
    price: 199.99,
    discount: false,
    genreId: "gen-02",
  },
  {
    id: "book-22",
    name: "The Fall of Hyperion",
    description: "Hyperion Cantos -2",
    price: 199.99,
    discount: true,
    genreId: "gen-02",
  },
  {
    id: "book-23",
    name: "Endymion",
    description: "Hyperion Cantos -3",
    price: 199.99,
    discount: false,
    genreId: "gen-02",
  },
  {
    id: "book-24",
    name: "The Rise of Endymion",
    description: "Hyperion Cantos -4",
    price: 199.99,
    discount: true,
    genreId: "gen-02",
  },
];

const genres = [
  { id: 'gen-01', name: 'Technical' },
  { id: 'gen-02', name: 'Sci-Fi' }
]

const reviews = [
  {
    id: "rev-01",
    date: "2024-01-01",
    title: "This is bad",
    comment: "when i bought this it broke the computer",
    rating: 1,
    courseId: "book-06",
  },
  {
    id: "rev-02",
    date: "2024-01-01",
    title: "Good book",
    comment: "Good book",
    rating: 4,
    courseId: "book-21",
  },
  {
    id: "rev-03",
    date: "2024-01-01",
    title: "Good book",
    comment: "Good book",
    rating: 5,
    courseId: "book-21",
  },
];

export const db = {
  courses,
  genres,
  reviews,
}