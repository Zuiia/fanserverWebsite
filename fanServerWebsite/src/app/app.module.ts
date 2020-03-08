import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OAuthModule} from "angular-oauth2-oidc";
import { NavbarComponent } from './navbar/navbar.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import {RoutingService} from "./services/RoutingService";
import {ReviewService} from "./services/ReviewService";
import { TestimonialPageComponent } from './testimonial-page/testimonial-page.component';
import { HomeComponent } from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {URLInterceptor} from "./services/URLInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestimonialsComponent,
    TestimonialPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    OAuthModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    RoutingService,
    ReviewService,
    HttpClientModule,
    AppComponent,
    {provide: HTTP_INTERCEPTORS, useClass: URLInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
