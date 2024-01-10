import { filterCourses } from './filter-logic/filterCourses.js';

export const Query = {
  courses: (parent, args, context) => {
    return filterCourses({
      courses: context.courses,
      filter: args?.filter,
      context,
    });
  },
  course: (parent, args, context) => {
    const courses = context.courses;
    const courseId = args.id;
    const course = courses.find(item => item.id === courseId);
    
    return course || null;
  },
  genres: (parent, args, context) => context.genres,
  genre: (parent, args, context) => {
    const genres = context.genres;
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
