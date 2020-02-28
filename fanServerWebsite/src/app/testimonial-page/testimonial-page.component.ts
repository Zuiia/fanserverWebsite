import { Component, OnInit } from '@angular/core';
import {Review} from "../models/Review";
import {ReviewService} from "../services/ReviewService";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-testimonial-page',
  templateUrl: './testimonial-page.component.html',
  styleUrls: ['./testimonial-page.component.css']
})
export class TestimonialPageComponent implements OnInit {

  reviews: Review[];
  cuteAlert = false;

  constructor(private ReviewService: ReviewService) {
    this.reviews = ReviewService.getReviews();
    console.log(this.reviews);
  }
  ngOnInit() {
  }

  launchCuteMessage() {
    this.cuteAlert = true;
    setTimeout( () => {
      this.cuteAlert = false;
    }, 5000)
  }
}
