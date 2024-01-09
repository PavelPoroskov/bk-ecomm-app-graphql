export const Query = {
  // welcome: () => {
  //   return "Hello World from GraphQL"
  // },
  // numOfCourses: () => {
  //   return 14;
  // },
  // price: () => {
  //   return 1165.78;
  // },
  // isTrainer: () => {
  //   return true;
  // },
  courses: (parent, args, context) => context.courses,
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
  }
}
