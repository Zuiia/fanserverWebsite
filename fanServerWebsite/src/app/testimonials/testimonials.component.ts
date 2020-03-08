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
    this.ReviewService.getReviews(6)
      .then ((reviewList: Review[]) => {
        this.reviews = reviewList;
        console.log("Reviews von Route: \n" + this.reviews);
      })
  }

}
