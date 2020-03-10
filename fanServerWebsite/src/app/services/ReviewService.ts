import {Review} from "../models/Review";
import {RoutingService} from "./RoutingService";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[];
  private id = 0;

  constructor(private RoutingService: RoutingService) {
    this.reviews = [];
    /* this.reviews.push(new Review("0", "Nice Server", "This is a very nice server. I like it!", new Date(), 4));
    this.reviews.push(new Review("1", "Nice Database", "This server has a nice database. I like it!", new Date(), 3));
    this.reviews.push(new Review("0", "Excellent Serverowner", "Liz is a very friendly and a lovely Owner.", new Date(), 5));
    this.reviews.push(new Review("1", "I love the events", "The different events are very cool. I wish I'd have enough luck to win!", new Date(), 3));
    this.reviews.push(new Review("0", "This sucks", "I hate writing test data....", new Date(), 1));
    this.reviews.push(new Review("0", "I BIMS 1ns Reviw", "B E S C H R E I B U N G", new Date(), 4));
    this.reviews.push(new Review("1", "Brap Brap", "Scrrrrt", new Date(), 5)); */

  }

  /**
   * adds a new review
   * @param review new review
   */
  addReview (review: Review) {
    review.setId(this.id);
    this.id++;
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
    this.reviews.forEach((review) => {
      review.picture = this.RoutingService.getUserPicture(review.userid);
      review.tag = this.RoutingService.getUserTag(review.userid);
      review.username = this.RoutingService.getUserUsername(review.userid);
    });
    return this.reviews;
  }
}
