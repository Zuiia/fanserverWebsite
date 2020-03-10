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
  stars: string;
  validCB: boolean = true;
  validT: boolean = true;
  validD: boolean = true;
  validS: boolean = true;

  constructor(private ReviewService: ReviewService) {
  }

  ngOnInit() {
    // get reviews from MongoDB
    this.getReviews();
  }

  saveReview() {
    this.validCB = this.isChecked;
    console.log(this.reviewTitleValue);
    this.validD = (this.reviewDescriptionValue != undefined);
    this.validT = (this.reviewTitleValue != undefined);
    this.validS = (this.stars != undefined);
    console.log(this.stars);
    console.log(Date.now());
    console.log(Date.now().toString());
    if (this.validCB && this.validD && this.validT) {
      this.publishReview();

    }
  }

  private publishReview() {
    let review = new Review(this.reviewTitleValue, this.reviewDescriptionValue, Date.now().toString(), Number(this.stars));
    this.ReviewService.addReview(review);
    this.launchCuteMessage();
    this.closeModal.nativeElement.click();
    // ToDo: reload reviews
  }

  launchCuteMessage() {
    this.cuteAlert = true;
    setTimeout( () => {
      this.cuteAlert = false;
    }, 5000)
  }

  getReviews() {
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
