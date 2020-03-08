import { Component, OnInit } from '@angular/core';
import {UserManagerService} from "../services/userManager/user-manager.service";
import {User} from "../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testUser : User;

  constructor(private umService: UserManagerService) { }

  ngOnInit() {
  }

  testRoute() {
    this.umService.getLoggedinUser()
      .then((user : User) => {
        this.testUser = user;
        console.log(user.username);
      })

  }
}
