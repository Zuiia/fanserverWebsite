import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {TestimonialPageComponent} from "./testimonial-page/testimonial-page.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'testimonials', component: TestimonialPageComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
