import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
  }

  login() {
    console.log("Trying to open login page");
    window.location.href = "http://www.rwbyfanserver.com/login";
  }

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
