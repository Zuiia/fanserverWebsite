import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../models/User";
import {error} from "util";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private path : any;
  private loggedIn : boolean = false;
  private user : User;

  constructor(private httpClient: HttpClient) {
    this.path = {
      login : "/login",
      checkLogin : "/info"
    };

    this.checkLogin()
      .then(user => {
        this.user = user;
        this.loggedIn = true;
      })
  }

  public login() {
     this.httpClient.get(this.path.login);
  }

  public checkLogin() : Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (!this.loggedIn) {
        this.httpClient.get(this.path.checkLogin).toPromise()
          .then((response : any) => {
            resolve( new User(response.data.id, response.data.discriminator, response.data.username, "https://cdn.discordapp.com/avatars/" + response.data.id + "/" + response.data.avatar) );
          })
          .catch((error : HttpErrorResponse) => {
            reject("user could not be logged in");
          })
      } else {
        resolve ( this.user )
      }
    });
  }
  public userStatus() : boolean {
    return this.loggedIn
  }

  public tryGetUser() : User | null {
    if (this.user) {
      return this.user
    } else {
      return null
    }
  }
}
