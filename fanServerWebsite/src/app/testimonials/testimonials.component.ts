import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../services/ReviewService";
import {Review} from "../models/Review";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  reviews: Review[];

  constructor(private ReviewService: ReviewService) {
    this.reviews = ReviewService.getReviews();
    console.log(this.reviews);
  }

  ngOnInit() {
  }

}
