export const filterCourses = ({ courses, filter, context }) => {
  const discountFilter = filter?.discount;
  const avgRatingFilter = filter?.avgRating;

  let filteredCourses = courses;

  if (discountFilter) {
    filteredCourses = filteredCourses.filter(course => course.discount);
  }

  if ([1,2,3,4,5].includes(avgRatingFilter)) {
    filteredCourses = filteredCourses.filter(course => {
      let ratingSum = 0;
      let numOfReviews = 0;

      context.db.reviews.forEach((review) => {
        if (review.courseId === course.id) {
          ratingSum += review.rating;
          numOfReviews += 1;
        }
      })
      const avgCourseRating = ratingSum / numOfReviews;

      return avgCourseRating >= avgRatingFilter;        
    });
  }

  return filteredCourses;
}
