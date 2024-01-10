import { filterCourses } from './filter-logic/filterCourses.js';

export const Query = {
  courses: (parent, args, context) => {
    return filterCourses({
      courses: context.db.courses,
      filter: args?.filter,
      context,
    });
  },
  course: (parent, args, { db }) => {
    const courses = db.courses;
    const courseId = args.id;
    const course = courses.find(item => item.id === courseId);
    
    return course || null;
    // TODO code "undefined || null" can useful for all resolvers.
  },
  genres: (parent, args, { db }) => db.genres,
  genre: (parent, args, { db }) => {
    const genres = db.genres;
    const catId = args.id;
    const genre = genres.find(item => item.id === catId);
    
    return genre || null;
  },

  welcome: () => {
    return "Hello World from GraphQL"
  },
  numOfCourses: () => {
    return 14;
  },
  price: () => {
    return 1165.78;
  },
  isTrainer: () => {
    return true;
  },
}
