import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Review} from "../models/Review";
import {ReviewService} from "../services/reviewsService/review.service";


@Component({
  selector: 'app-testimonial-page',
  templateUrl: './testimonial-page.component.html',
  styleUrls: ['./testimonial-page.component.css']
})
export class TestimonialPageComponent implements OnInit {

  @ViewChild('closeModal', {static: true}) closeModal: ElementRef;

  reviews: Review[];
  cuteAlert = false;
  reviewTitleValue: string;
  reviewDescriptionValue: string;
  isChecked: boolean = false;
  validCB: boolean = true;
  validT: boolean = true;
  validD: boolean = true;

  constructor(private ReviewService: ReviewService) {
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

  saveReview() {
    this.validCB = this.isChecked;
    console.log(this.reviewTitleValue);
    this.validD = (this.reviewDescriptionValue != undefined);
    this.validT = (this.reviewTitleValue != undefined);
    if (this.validCB && this.validD && this.validT) {
      this.publishReview();

    }
  }

  private publishReview() {
    this.launchCuteMessage();
    this.closeModal.nativeElement.click();
  }

  launchCuteMessage() {
    this.cuteAlert = true;
    setTimeout( () => {
      this.cuteAlert = false;
    }, 5000)
  }
}
