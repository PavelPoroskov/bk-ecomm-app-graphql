import { filterCourses } from './filter-logic/filterCourses.js';

export const Genre = {
  courses: (parent, args, context) => {
    const courses = context.db.courses;
    const genreId = parent.id;

    let filteredCourses = courses.filter(item => item.genreId === genreId);

    return filterCourses({
      courses: filteredCourses,
      filter: args?.filter,
      context,
    });
  }
}
