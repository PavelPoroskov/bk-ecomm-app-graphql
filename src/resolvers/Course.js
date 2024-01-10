export const Course = {
  genre: (parent, args, { db }) => {
    const genres = db.genres;
    const genreId = parent.genreId;
    
    return genres.find(item => item.id === genreId);
  },
  reviews: (parent, args, { db }) => {
    const reviews = db.reviews;
    const { id } = parent;
    
    return reviews.filter(item => item.courseId === id);
  }
}
