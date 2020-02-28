import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {TestimonialPageComponent} from "./testimonial-page/testimonial-page.component";


const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'testimonials', component: TestimonialPageComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
