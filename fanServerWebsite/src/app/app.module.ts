import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OAuthModule} from "angular-oauth2-oidc";
import { NavbarComponent } from './navbar/navbar.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { RoutingService } from "./services/RoutingService";
import { ReviewService } from "./services/ReviewService";
import { LoginServiceService } from "./services/login-service.service";
import { TestimonialPageComponent } from './testimonial-page/testimonial-page.component';
import { HomeComponent } from './home/home.component';
import { RulesPageComponent } from './rules-page/rules-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { PatronPageComponent } from './patron-page/patron-page.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestimonialsComponent,
    TestimonialPageComponent,
    HomeComponent,
    RulesPageComponent,
    FaqPageComponent,
    PatronPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OAuthModule.forRoot(),
    HttpClientModule
  ],
  providers: [RoutingService, ReviewService, LoginServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
