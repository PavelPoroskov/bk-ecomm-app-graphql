export const Genre = {
  courses: (parent, args, context) => {
    const courses = context.courses;
    const genreId = parent.id;
    
    return courses.filter(item => item.genreId === genreId);
  }
}
