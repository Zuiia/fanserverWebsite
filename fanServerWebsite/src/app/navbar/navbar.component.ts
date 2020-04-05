import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ViewportScroller } from '@angular/common';
import { LoginServiceService } from '../services/login-service.service';
import {User} from "../models/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private user : User;

  constructor(private router: Router, private viewportScroller: ViewportScroller, private loginService: LoginServiceService) { }

  ngOnInit() {
  }

  login() {
    console.log("Trying to open login page");
    this.loginService.login()
  }

  checkLogin() : boolean {
    console.log("checking if the user is logged in");

    let loggedIn = this.loginService.userStatus();

    if (loggedIn && this.user === undefined) {
      this.loadUser();
    }
    return !loggedIn;
  }

  loadUser() {
    let u = this.loginService.tryGetUser();
    console.log("new user: " + u);
    if (u != null) {
      this.user = u;
    }
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

}
