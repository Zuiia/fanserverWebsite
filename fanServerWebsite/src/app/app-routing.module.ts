import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {TestimonialsComponent} from "./testimonials/testimonials.component";
import {TestimonialPageComponent} from "./testimonial-page/testimonial-page.component";
import {HomeComponent} from "./home/home.component";
import {RulesPageComponent} from "./rules-page/rules-page.component";
import {FaqPageComponent} from "./faq-page/faq-page.component";
import {PatronPageComponent} from "./patron-page/patron-page.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'testimonials', component: TestimonialPageComponent},
  {path: 'rules', component: RulesPageComponent},
  {path: 'faq', component: FaqPageComponent},
  {path: 'patrons', component: PatronPageComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
