import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../models/User";
import {error} from "util";

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  infoServerpath: string;
  errorMessage: string;

  constructor(private httpClient: HttpClient) {
    this.infoServerpath = '/info';
  }

  public getLoggedinUser() : Promise<User> {
    return this.httpClient.get<User>(this.infoServerpath)
      .toPromise()
      .then((response : any) => {
        if (!response) return null;
        let user = new User(
          response._id,
          response.username + response.discriminator,
          response.username,
          response.avatar
        );
        return user;
      }).catch((error: HttpErrorResponse) => {
        this.errorMessage = (error.status == 404) ? "No logged in user found!" : "Error getting logged in user data" + error;
        console.log(this.errorMessage);
        return null;
      })
  }
}
