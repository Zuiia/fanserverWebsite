import {Review} from "../models/Review";

export class ReviewService {
  private reviews: Review[] = [];

  /**
   * adds a new review
   * @param review new review
   */
  addReview (review: Review) {
    this.reviews.push(review);
  }

  /**
   * gets a review by its id
   * @param id given id
   */
  getReview (id: number): Review {
    return this.reviews.find(rev => rev.getId() == id);
  }

  /**
   * updates a specific review by its id
   * @param review new updated version of the Review
   */
  updateReview (review: Review) {
    this.reviews.filter(rev => rev.getId() == review.getId()).push(review);
  }

  /**
   * deletes one specific review
   * @param review the review to be deleted
   */
  deleteReview(review: Review) {
    this.reviews.filter(rev => rev == review);
  }

  /**
   * returns all reviews
   */
  getReviews (): Review[] {
    return this.reviews;
  }
}
