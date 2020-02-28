import { Component, OnInit } from '@angular/core';
import {ReviewService} from "../services/ReviewService";
import {RoutingService} from "../services/RoutingService";
import {Review} from "../models/Review";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {

  reviews: Review[] = [];

  constructor(ReviewService: ReviewService, RoutingService: RoutingService) {
    this.reviews = ReviewService.getReviews();
    console.log(this.reviews);
  }

  ngOnInit() {
  }

}
