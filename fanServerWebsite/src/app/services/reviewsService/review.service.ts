import { Injectable } from '@angular/core';
import {Review} from "../../models/Review";
import {RoutingService} from "../RoutingService";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {error} from "util";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: Review[];
  private id = 0;
  private serverPath: string;
  private errorMessage: string;

  constructor(private RoutingService: RoutingService, private httpClient: HttpClient) {
    this.reviews = [];
    this.serverPath = "/reviews"
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
  getReviews (amountReviews: number): Promise<Review[]> {
    return this.httpClient.get<Review[]>(this.serverPath + "/" + amountReviews)
      .toPromise()
      .then((response : any) => {
        let reviewList: Review[] = [];
        console.log(response.data);
        for (let item of response.data) {
          let review: Review = new Review(
            item._userid,
            item._title,
            item._description,
            item._created_at,
            item._stars);
          reviewList.push(review);
        }
        return reviewList;
      }).catch((error: HttpErrorResponse) => {
        this.errorMessage = (error.status == 500) ? "Databaseerror :c" : "Error getting a number of reviews" + error;
        console.log(this.errorMessage);
        return null;
      });
  }
}
