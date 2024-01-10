import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
  addGenre: (parent, args, { db }) => {
    const newGene = {
      id: uuidv4(),
      name: args.input.name,
    }
    db.genres.push(newGene)
    
    return newGene
  },
  deleteGenre: (parent, { id }, { db }) => {
    db.genres = db.genres.filter(genre => genre.id !== id);
    db.courses = db.courses.map(
      course => (course.genreId === id
        ? {...course, genreId: null}
        : course
      )
    );
    
    return true;
  },
  updateGenre: (parent, { id, input }, { db }) => {
    const index = db.genres.findIndex(genre => genre.id === id);

    if (index === -1) {
      return null
    }

    db.genres[index] = {
      ...db.genres[index],
      ...input,
    };

    return db.genres[index];
  },

  addCourse: (parent, args, { db }) => {
    const {
      name,
      description,
      price,
      discount,
      genreId,
    } = args.input;
    const newCourse = {
      id: uuidv4(),
      name,
      description,
      price,
      discount,
      genreId,
    };
    db.courses.push(newCourse)

    return newCourse
  },
  deleteCourse: (parent, { id }, { db }) => {
    db.courses = db.courses.filter(course => course.id !== id);
    db.reviews = db.reviews.filter(review => review.courseId !== id);

    return true;
  },
  updateCourse: (parent, { id, input }, { db }) => {
    const index = db.courses.findIndex(course => course.id === id);
    
    if (index === -1) {
      return null
    }

    db.courses[index] = {
      ...db.courses[index],
      ...input,
    };

    return db.courses[index];
  },

  addReview: (parent, args, { db }) => {
    const {
      date,
      title,
      comment,
      rating,
      courseId,
    } = args.input;
    const newReview = {
      id: uuidv4(),
      date,
      title,
      comment,
      rating,
      courseId,
    }
    db.reviews.push(newReview)

    return newReview
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter(review => review.id !== id);

    return true;
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex(review => review.id === id);

    if (index === -1) {
      return null
    }
    
    db.reviews[index] = {
      ...db.reviews[index],
      ...input,
    };
    
    return db.reviews[index];
  }
}