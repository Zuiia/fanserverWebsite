import { Component, OnInit } from '@angular/core';
import {Review} from "../models/Review";
import {ReviewService} from "../services/reviewsService/review.service";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  reviews: Review[];

  constructor(private ReviewService: ReviewService) {

    console.log(this.reviews);
  }

  ngOnInit() {
    // get reviews from MongoDB
    this.ReviewService.getReviews(6)
      .then ((reviewList: Review[]) => {
        this.reviews = reviewList;
        // fill with placeholder data
        for (let review of this.reviews) {
          if (review.tag == undefined) {
            review.tag = "Testuser#1337";
          }
          if (review.picture == undefined) {
            review.picture = "https://cdn.discordapp.com/avatars/188968706162819075/a_e5c844bf9997ca0590416fac0b9a237e";
          }
        }
      })
  }

}
